#!/usr/bin/env python3
"""Build the citation world map data for map/citations/.

Two steps, run together or separately:

  python3 scripts/build-citation-map.py --fetch   # run CitationMap, write raw/scholar/citation-map.csv
  python3 scripts/build-citation-map.py           # convert the CSV into map/citations/data.js

The fetch step needs `pip install citation-map` (ChenLiu-1996/CitationMap) and a
Chrome window for Google Scholar CAPTCHAs, so it is a local, human-attended step.
Run it from a residential IP: Scholar blocks datacenter IPs (see CLAUDE.md).

The CSV is the editable source of truth. CitationMap geocodes affiliations with
Nominatim and gets a few wrong; fix the latitude/longitude/country columns by hand
and rerun the convert step. Rows whose affiliation could not be resolved stay in
the CSV with empty coordinates and are counted but not pinned.
"""

import argparse
import csv
import json
import math
import os
import subprocess
import sys
from collections import OrderedDict
from datetime import datetime, timezone

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHOLAR_ID = "B-fiSHwAAAAJ"
CSV_PATH = os.path.join(REPO_ROOT, "raw", "scholar", "citation-map.csv")
OUT_PATH = os.path.join(REPO_ROOT, "map", "citations", "data.js")
CACHE_DIR = os.path.join(REPO_ROOT, "raw", "scholar", "citation-map-cache")
NO_AUTHOR = "N/A"


def fetch(num_processes):
    """Run CitationMap and keep only its CSV (its HTML is not used)."""
    os.makedirs(CACHE_DIR, exist_ok=True)
    html_tmp = os.path.join(CACHE_DIR, "citation_map.html")
    code = (
        "from citation_map import generate_citation_map\n"
        "generate_citation_map(%r, output_path=%r, csv_output_path=%r, "
        "cache_folder=%r, num_processes=%d, print_citing_affiliations=False)\n"
        % (SCHOLAR_ID, html_tmp, CSV_PATH, CACHE_DIR, num_processes)
    )
    subprocess.run([sys.executable, "-c", code], check=True, cwd=CACHE_DIR)


def is_num(value):
    try:
        return math.isfinite(float(value))
    except (TypeError, ValueError):
        return False


def clean(value):
    value = (value or "").strip()
    return "" if value.lower() in ("", "nan", "none") else value


def read_rows():
    with open(CSV_PATH, newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        rows = []
        for raw in reader:
            row = {
                "author": clean(raw.get("citing author name")),
                "citing": clean(raw.get("citing paper title")),
                "cited": clean(raw.get("cited paper title")),
                "affiliation": clean(raw.get("affiliation")),
                "lat": raw.get("latitude"),
                "lng": raw.get("longitude"),
                "city": clean(raw.get("city")),
                "state": clean(raw.get("state")),
                "country": clean(raw.get("country")),
            }
            if not row["author"] or row["author"] == NO_AUTHOR:
                continue
            rows.append(row)
    return rows


def build(rows):
    """Aggregate citation rows by affiliation (one pin per institution)."""
    pins = OrderedDict()
    unresolved = OrderedDict()
    cited_papers = OrderedDict()
    for row in rows:
        cited_papers.setdefault(row["cited"], set()).add(row["author"])
        if row["affiliation"] == NO_AUTHOR or not row["affiliation"]:
            unresolved.setdefault(row["author"], set()).add(row["cited"])
            continue
        if not (is_num(row["lat"]) and is_num(row["lng"])):
            unresolved.setdefault(row["author"], set()).add(row["cited"])
            continue
        pin = pins.setdefault(
            row["affiliation"],
            {
                "affiliation": row["affiliation"],
                "lat": round(float(row["lat"]), 4),
                "lng": round(float(row["lng"]), 4),
                "city": row["city"],
                "state": row["state"],
                "country": row["country"],
                "authors": OrderedDict(),
            },
        )
        entry = pin["authors"].setdefault(row["author"], {"name": row["author"], "cited": [], "citing": []})
        if row["cited"] not in entry["cited"]:
            entry["cited"].append(row["cited"])
        if row["citing"] and row["citing"] not in entry["citing"]:
            entry["citing"].append(row["citing"])

    pin_list = []
    for pin in pins.values():
        pin["authors"] = list(pin["authors"].values())
        pin["count"] = len(pin["authors"])
        pin_list.append(pin)
    pin_list.sort(key=lambda p: (-p["count"], p["affiliation"]))

    countries = OrderedDict()
    for pin in pin_list:
        name = pin["country"] or "Unknown"
        bucket = countries.setdefault(name, {"country": name, "authors": 0, "affiliations": 0})
        bucket["authors"] += pin["count"]
        bucket["affiliations"] += 1
    country_list = sorted(countries.values(), key=lambda c: (-c["authors"], c["country"]))

    paper_list = sorted(
        ({"title": title, "authors": len(names)} for title, names in cited_papers.items()),
        key=lambda p: (-p["authors"], p["title"]),
    )

    all_authors = {row["author"] for row in rows}
    pinned_authors = {a["name"] for pin in pin_list for a in pin["authors"]}
    return {
        "scholarId": SCHOLAR_ID,
        "profileUrl": "https://scholar.google.com/citations?user=" + SCHOLAR_ID,
        "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "source": "CitationMap (ChenLiu-1996/CitationMap) over Google Scholar public profiles",
        "totals": {
            "citingAuthors": len(all_authors),
            "pinnedAuthors": len(pinned_authors),
            "unresolvedAuthors": len(all_authors - pinned_authors),
            "affiliations": len(pin_list),
            "countries": len([c for c in country_list if c["country"] != "Unknown"]),
            "citedPapers": len(paper_list),
        },
        "pins": pin_list,
        "countries": country_list,
        "papers": paper_list,
        "unresolved": [{"name": name, "cited": sorted(cited)} for name, cited in unresolved.items()],
    }


def write(data):
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as handle:
        handle.write("// Generated by scripts/build-citation-map.py from raw/scholar/citation-map.csv.\n")
        handle.write("// Do not edit by hand: fix the CSV and rerun the script.\n")
        handle.write("window.CITATION_MAP = ")
        json.dump(data, handle, ensure_ascii=False, indent=2)
        handle.write(";\n")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--fetch", action="store_true", help="run CitationMap before converting")
    parser.add_argument("--num-processes", type=int, default=4, help="CitationMap affiliation workers")
    args = parser.parse_args()
    if args.fetch:
        fetch(args.num_processes)
    if not os.path.isfile(CSV_PATH):
        sys.exit("missing %s; run with --fetch first" % os.path.relpath(CSV_PATH, REPO_ROOT))
    data = build(read_rows())
    write(data)
    totals = data["totals"]
    print(
        "citation map: %d citing authors (%d pinned, %d unresolved), %d affiliations, %d countries, %d cited papers -> %s"
        % (
            totals["citingAuthors"],
            totals["pinnedAuthors"],
            totals["unresolvedAuthors"],
            totals["affiliations"],
            totals["countries"],
            totals["citedPapers"],
            os.path.relpath(OUT_PATH, REPO_ROOT),
        )
    )


if __name__ == "__main__":
    main()
