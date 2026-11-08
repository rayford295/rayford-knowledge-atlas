#!/usr/bin/env python3
"""Build the citation world map data for map/citations/.

Two steps, run together or separately:

  python3 scripts/build-citation-map.py --fetch   # run CitationMap, write raw/scholar/citation-map.csv
  python3 scripts/build-citation-map.py           # convert the CSV into map/citations/data.js
  python3 scripts/build-citation-map.py --geocode # also fill coordinates CitationMap left blank

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
OVERRIDES_PATH = os.path.join(REPO_ROOT, "raw", "scholar", "citation-map-overrides.json")
NO_AUTHOR = "N/A"
NOT_FOUND = {"N/A", "No_author_found", "Unknown affiliation", ""}

# CitationMap's aggressive mode splits a profile's affiliation line on commas
# and conjunctions, so one author yields several candidate strings such as
# "Ph.D. Student", "Texas A&M University" and "Ph.D. Student, Texas A&M University".
# The rules below pick one institution per author and drop bare fragments.
INSTITUTION_WORDS = (
    "universit", "institut", "college", "school", "academy", "polytech", "politec",
    "laborator", " lab", "hospital", "clinic", "center", "centre", "foundation",
    "agency", "ministry", "bureau", "observatory", "museum", "corporation", "company",
    "inc.", "ltd", "llc", "gmbh", "research", "csiro", "inria", "nasa", "noaa", "usgs",
    "cnrs", "eth ", "mit", "iit", "nus", "ntu", "ucl", "google", "microsoft", "meta",
    "amazon", "ibm", "nvidia", "esri", "tencent", "alibaba", "baidu", "huawei",
)
TITLE_WORDS = (
    "professor", "student", "researcher", "lecturer", "engineer", "scientist",
    "postdoc", "post-doc", "fellow", "ph.d", "phd", "candidate", "director", "head of",
    "assistant", "associate", "dean", "chair", "faculty of", "department of", "dept",
    "msc", "m.sc", "bsc", "b.sc", "graduate", "undergraduate", "intern", "analyst",
    "manager", "developer", "founder", "ceo", "cto", "consultant", "scholar", "visiting",
    "emeritus", "adjunct", "instructor", "teacher", "doctoral", "master", "bachelor",
    "principal", "senior", "junior", "staff", "member", "leader", "coordinator",
)
# "School of Electrical", "College of Engineering": a unit, not an institution, when
# it opens the name. (Imperial College London, London School of Economics are fine.)
UNIT_PREFIXES = ("school of", "college of", "faculty of", "department of", "dept of",
                 "division of", "institute of", "center for", "centre for", "lab of",
                 "laboratory of", "graduate school", "office of")
GEOCODE_CACHE_PATH = os.path.join(REPO_ROOT, "raw", "scholar", "citation-map-geocode.json")
FRAGMENT_WORDS = {
    "technology", "engineering", "science", "sciences", "computer science", "geography",
    "mathematics", "physics", "chemistry", "biology", "statistics", "economics",
    "management", "business", "medicine", "research", "innovation", "information",
    "systems", "design", "architecture", "planning", "environment", "geomatics",
    "remote sensing", "gis", "ai", "data science", "cis", "ece", "cse", "it",
}
COUNTRY_ALIASES = {
    "USA": "United States",
    "U.S.A.": "United States",
    "US": "United States",
    "UK": "United Kingdom",
    "Hong Kong": "China",
    "Macau": "China",
    "Türkiye": "Turkey",
    "Czech Republic": "Czechia",
    "Korea": "South Korea",
    "Republic of Korea": "South Korea",
    "Viet Nam": "Vietnam",
    "Russian Federation": "Russia",
}


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
            row["country"] = COUNTRY_ALIASES.get(row["country"], row["country"])
            rows.append(row)
    for row in rows:
        for key in ("city", "state", "country"):
            if row[key]:
                PLACE_NAMES.add(_norm(row[key]))
    PLACE_NAMES.update(_norm(c) for c in COUNTRY_ALIASES)
    PLACE_NAMES.update(_norm(c) for c in COUNTRY_ALIASES.values())
    return rows


def load_overrides():
    if not os.path.isfile(OVERRIDES_PATH):
        return {"aliases": {}, "locations": {}, "drop": []}
    with open(OVERRIDES_PATH, encoding="utf-8") as handle:
        data = json.load(handle)
    return {
        "aliases": data.get("aliases", {}),
        "locations": data.get("locations", {}),
        "drop": set(data.get("drop", [])),
    }


OVERRIDES = load_overrides()


def _norm(text):
    return " ".join(text.lower().replace(".", "").split())


def _has(text, words):
    low = " " + _norm(text) + " "
    return any(w in low for w in words)


PLACE_NAMES = set()  # every city/state/country string in the CSV, filled by read_rows()


def _looks_like_institution(name, row):
    """A bare department word or a bare place name is not an institution."""
    norm = _norm(name)
    if norm in PLACE_NAMES:
        return False
    if name in OVERRIDES["drop"] or norm in FRAGMENT_WORDS or len(norm) < 3:
        return False
    # "Technology (HKUST)", "Technology of China": the tail of an "and"-split name.
    if norm.split(" ")[0] in FRAGMENT_WORDS and not _has(name, INSTITUTION_WORDS):
        return False
    # "School of", "Department of" and other dangling phrases.
    if norm.split(" ")[-1] in {"of", "and", "for", "the", "&", "at", "in", "de", "di"}:
        return False
    if norm.startswith(UNIT_PREFIXES) and not any(
        w in norm for w in ("universit", "polytech", "politec", "academy", "hospital")
    ):
        return False
    if row and norm in {_norm(row["city"]), _norm(row["state"]), _norm(row["country"])}:
        return False
    return True


def _split_candidates(text):
    """Break 'Ph.D. Student, Texas A&M University' into its comma/at/pipe segments."""
    parts = [text]
    for sep in (",", "|", ";", " at ", " @ ", " - ", "–", "/"):  # never "and": CitationMap did that already
        parts = [p.strip() for chunk in parts for p in chunk.split(sep) if p.strip()]
    return parts


def _score(name, row):
    """Lower is better: no title words, has an institution word, then shorter."""
    titled = _has(name, TITLE_WORDS)
    inst = _has(name, INSTITUTION_WORDS)
    fragment = not _looks_like_institution(name, row)
    located = bool(row and is_num(row["lat"]) and is_num(row["lng"]))
    return (fragment, titled, not inst, not located, len(name))


def choose_affiliation(author_rows):
    """Collapse one author's CitationMap rows into (institution name, geocoded row).

    Returns (None, None) when nothing usable survives.
    """
    by_name = OrderedDict()
    for row in author_rows:
        if row["affiliation"] in NOT_FOUND:
            continue
        by_name.setdefault(row["affiliation"], row)
    if not by_name:
        return None, None

    # Candidates: every raw variant plus every segment of every variant. A segment
    # inherits the geocode of the shortest variant that contains it.
    candidates = OrderedDict()
    for name, row in by_name.items():
        candidates.setdefault(name, row)
        for seg in _split_candidates(name):
            if seg not in candidates:
                carriers = [r for n, r in by_name.items() if seg in n and is_num(r["lat"])]
                carriers.sort(key=lambda r: len(r["affiliation"]))
                candidates[seg] = carriers[0] if carriers else None

    # CitationMap also splits on "and", leaving "University of Electronic Science"
    # beside the full "University of Electronic Science and Technology of China".
    # Prefer the full name whenever a title-free single-segment candidate contains it.
    wholes = [n for n in candidates if not _has(n, TITLE_WORDS) and len(_split_candidates(n)) == 1]
    nested = {
        n for n in candidates
        if any(o != n and _norm(n) in _norm(o) and len(_norm(o)) > len(_norm(n)) for o in wholes)
    }
    pool = [(n, r) for n, r in candidates.items() if n not in nested] or list(candidates.items())
    ranked = sorted(pool, key=lambda kv: _score(kv[0], kv[1]))
    name, row = ranked[0]
    if not _looks_like_institution(name, row) or _has(name, TITLE_WORDS):
        return None, None
    if row is None or not (is_num(row["lat"]) and is_num(row["lng"])):
        return name, None
    return name, row


def load_geocode_cache():
    if not os.path.isfile(GEOCODE_CACHE_PATH):
        return {}
    with open(GEOCODE_CACHE_PATH, encoding="utf-8") as handle:
        return json.load(handle)


def geocode_missing(names):
    """Ask Nominatim once for every chosen affiliation that has no coordinates yet.

    Results (hits and misses) are cached in raw/scholar/citation-map-geocode.json so a
    rebuild never repeats a query; delete an entry there to retry it. Nominatim asks for
    at most one request per second, hence the sleep.
    """
    import re
    import time
    import urllib.parse
    import urllib.request

    def fetch(url):
        request = urllib.request.Request(url, headers={"User-Agent": "rayford-knowledge-atlas citation map (github.com/rayford295)"})
        with urllib.request.urlopen(request, timeout=20) as response:
            return json.load(response)

    cache = load_geocode_cache()
    todo = [n for n in names if n not in cache]
    if not todo:
        return cache
    print("geocoding %d affiliations with Nominatim" % len(todo))
    for index, name in enumerate(todo, 1):
        query = re.sub(r"\s*\([^)]*\)\s*", " ", name).strip() or name
        url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode(
            {"q": query, "format": "jsonv2", "limit": 1, "addressdetails": 1, "accept-language": "en"}
        )
        try:
            hits = fetch(url)
        except Exception as error:  # network hiccup: leave uncached so the next run retries
            print("  ! %s: %s" % (name, error))
            time.sleep(1.1)
            continue
        if hits:
            hit = hits[0]
            cache[name] = _place(hit["lat"], hit["lon"], hit.get("address", {}))
            source = "nominatim"
        else:
            # Nominatim indexes addresses, not organisations, so long institution
            # names often miss. Wikidata knows most universities by name; take its
            # coordinate (P625) and let Nominatim name the place around it.
            time.sleep(1.1)
            place = _wikidata_place(query, fetch)
            if place == "error":  # rate limit or network: wait, retry once, else leave uncached
                time.sleep(45)
                place = _wikidata_place(query, fetch)
            if place == "error":
                continue
            cache[name] = place
            source = "wikidata"
        print("  %3d/%d %s -> %s" % (index, len(todo), name, "miss" if cache[name] is None else source + " · " + cache[name]["country"]))
        _save_geocode_cache(cache)
        time.sleep(1.1)
    _save_geocode_cache(cache)
    return cache


def _save_geocode_cache(cache):
    with open(GEOCODE_CACHE_PATH, "w", encoding="utf-8") as handle:
        json.dump(cache, handle, ensure_ascii=False, indent=2, sort_keys=True)
        handle.write("\n")


def _place(lat, lng, address):
    return {
        "lat": round(float(lat), 4),
        "lng": round(float(lng), 4),
        "city": address.get("city") or address.get("town") or address.get("village") or address.get("county") or "",
        "state": address.get("state", ""),
        "country": COUNTRY_ALIASES.get(address.get("country", ""), address.get("country", "")),
    }


def _wikidata_place(query, fetch):
    """Coordinate of the first Wikidata entity matching the name, named via Nominatim reverse."""
    import time
    import urllib.parse

    try:
        search = fetch("https://www.wikidata.org/w/api.php?" + urllib.parse.urlencode(
            {"action": "wbsearchentities", "search": query, "language": "en", "limit": 3, "format": "json"}))
        for item in search.get("search", []):
            entity = fetch("https://www.wikidata.org/w/api.php?" + urllib.parse.urlencode(
                {"action": "wbgetentities", "ids": item["id"], "props": "claims", "format": "json"}))
            claims = entity["entities"][item["id"]].get("claims", {})
            coords = claims.get("P625")
            if not coords:
                continue
            value = coords[0]["mainsnak"]["datavalue"]["value"]
            time.sleep(2.2)
            reverse = fetch("https://nominatim.openstreetmap.org/reverse?" + urllib.parse.urlencode(
                {"lat": value["latitude"], "lon": value["longitude"], "format": "jsonv2", "zoom": 10, "accept-language": "en"}))
            return _place(value["latitude"], value["longitude"], reverse.get("address", {}))
    except Exception as error:
        print("  ! wikidata %s: %s" % (query, error))
        return "error"
    return None


def _strip_acronym(name):
    """Drop a trailing "(TCD)" / "(Ryerson University)" / "(Deemed to be University)" but
    keep a campus such as "(Guangzhou)"."""
    import re

    match = re.search(r"\s*[\(（]([^()（）]*)[\)）]\s*$", name)
    if not match:
        return name.strip()
    inner = match.group(1).strip()
    acronym = inner.replace(".", "").replace("-", "").replace(" ", "").isupper() and len(inner) <= 12
    if acronym or _has(inner, ("universit", "deemed", "formerly", "ex ")):
        base = name[: match.start()].strip()
        if base and _has(base, INSTITUTION_WORDS):
            return base
    return name.strip()


def canonical_name(name, known):
    """Map 'Department of Geography, National University of Singapore' onto the
    known institution it contains, so both land on one pin."""
    segments = {_norm(seg) for seg in _split_candidates(name)}
    norm = _norm(name)
    best = None
    for other in known:
        o = _norm(other)
        if o != norm and o in segments and (best is None or len(o) > len(_norm(best))):
            best = other
    return best or name


def consolidate(rows, geocode=False):
    """One row per (author, cited paper) with a single cleaned affiliation."""
    by_author = OrderedDict()
    for row in rows:
        by_author.setdefault(row["author"], []).append(row)

    chosen = {}
    for author, author_rows in by_author.items():
        chosen[author] = choose_affiliation(author_rows)

    # Names that stand alone as institutions become merge targets for longer names.
    known = sorted({name for name, row in chosen.values() if name and _has(name, INSTITUTION_WORDS)}, key=len)
    aliases = OVERRIDES["aliases"]
    name_map = {}
    for name, _ in chosen.values():
        if name:
            canon = canonical_name(name, known)
            canon = aliases.get(canon, aliases.get(name, canon))
            stripped = _strip_acronym(canon)
            name_map[name] = aliases.get(stripped, stripped)

    # "Texas A&M university" and "Texas A&M University" are one place: fold spellings that
    # differ only in case/punctuation onto the most common one.
    spellings = {}
    for canon in name_map.values():
        spellings.setdefault(_norm(canon), []).append(canon)
    preferred = {key: max(set(names), key=names.count) for key, names in spellings.items()}
    name_map = {name: preferred[_norm(canon)] for name, canon in name_map.items()}

    # Share one geocode per canonical name (the most common coordinates win).
    coords = {}
    for name, row in chosen.values():
        if name and row:
            coords.setdefault(name_map[name], []).append(row)
    for canon, cands in coords.items():
        counts = {}
        for r in cands:
            key = (round(float(r["lat"]), 2), round(float(r["lng"]), 2))
            counts[key] = counts.get(key, 0) + 1
        best_key = max(counts, key=counts.get)
        coords[canon] = next(r for r in cands if (round(float(r["lat"]), 2), round(float(r["lng"]), 2)) == best_key)

    # Names CitationMap could not geocode: use the committed cache, extend it on --geocode.
    missing = sorted({c for c in name_map.values() if c not in coords})
    cache = geocode_missing(missing) if geocode else load_geocode_cache()
    for canon in missing:
        if cache.get(canon):
            coords[canon] = dict(cache[canon])

    for canon, fix in OVERRIDES["locations"].items():
        coords[canon] = {"lat": fix["lat"], "lng": fix["lng"], "city": fix.get("city", ""),
                         "state": fix.get("state", ""), "country": fix.get("country", "")}

    out = []
    for author, author_rows in by_author.items():
        name, _ = chosen[author]
        canon = name_map.get(name) if name else None
        geo = coords.get(canon) if canon else None
        seen = set()
        for row in author_rows:
            key = (row["cited"], row["citing"])
            if key in seen:
                continue
            seen.add(key)
            new = dict(row)
            if canon and geo:
                new.update(affiliation=canon, lat=geo["lat"], lng=geo["lng"], city=geo["city"],
                           state=geo["state"], country=geo["country"])
            else:
                new.update(affiliation=canon or NO_AUTHOR, lat="", lng="")
            out.append(new)
    return out


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
    parser.add_argument("--geocode", action="store_true", help="query Nominatim for affiliations still lacking coordinates")
    args = parser.parse_args()
    if args.fetch:
        fetch(args.num_processes)
    if not os.path.isfile(CSV_PATH):
        sys.exit("missing %s; run with --fetch first" % os.path.relpath(CSV_PATH, REPO_ROOT))
    data = build(consolidate(read_rows(), geocode=args.geocode))
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
