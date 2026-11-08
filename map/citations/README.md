# Citation Map

A world map of the institutions whose researchers cite Yifan Yang's papers, built from the public
[Google Scholar profile](https://scholar.google.com/citations?user=B-fiSHwAAAAJ). The live page is
[`index.html`](./index.html), served at
`https://rayford295.github.io/rayford-knowledge-atlas/map/citations/` and linked from the travel map
as **Citation Map**.

Each amber pin is one institution; its size follows the number of citing authors there. Click a pin
(or an institution card) to list the citing authors and which papers they cite. The **Follow One
Paper** selector dims every pin that does not cite the chosen paper. The **3D Globe** view draws an
arc from Texas A&M University to every citing institution.

## How the data is made

1. [CitationMap](https://github.com/ChenLiu-1996/CitationMap) (Chen Liu, 2024) walks the "Cited by"
   pages of every publication on the Scholar profile, opens each citing author's Scholar profile to
   read their affiliation, and geocodes the affiliation with Nominatim.
2. Its CSV lands in [`raw/scholar/citation-map.csv`](../../raw/scholar/citation-map.csv), one row per
   (citing author, citing paper, cited paper). That CSV is the editable source of truth: fix a wrong
   coordinate or country there and rebuild.
3. [`scripts/build-citation-map.py`](../../scripts/build-citation-map.py) cleans the CSV and writes
   [`data.js`](./data.js), which the page reads. CitationMap's aggressive mode emits several
   strings per author ("Ph.D. Student", "Texas A&M University", "Ph.D. Student, Texas A&M
   University", plus the halves of every "and"), so the script keeps one institution per author:
   it drops titles and department fragments, prefers the full name over an "and"-split piece, and
   merges "Department of X, University Y" onto "University Y".
4. Two small committed files patch what automation gets wrong:
   - [`raw/scholar/citation-map-overrides.json`](../../raw/scholar/citation-map-overrides.json):
     `aliases` (rename, e.g. `UCLA` → the full name), `locations` (replace a bad Nominatim
     geocode), `drop` (strings that are never an institution).
   - [`raw/scholar/citation-map-geocode.json`](../../raw/scholar/citation-map-geocode.json): the
     cache filled by `--geocode` for names CitationMap could not place (Nominatim first, Wikidata
     as fallback). Delete an entry to retry it.

## Refreshing

```bash
pip install citation-map               # once; needs Chrome for Scholar CAPTCHAs
python3 scripts/build-citation-map.py --fetch   # scrape + rebuild (attended, local)
python3 scripts/build-citation-map.py           # rebuild data.js from the edited CSV only
python3 scripts/build-citation-map.py --geocode # also look up coordinates still missing
```

Run the fetch from a residential connection. Google Scholar blocks datacenter IPs (see the Scholar
notes in `CLAUDE.md`), so this step is deliberately not in GitHub Actions. A CAPTCHA may open in a
Chrome window; solve it there and leave the window open until the run ends. Intermediate caches live
in `raw/scholar/citation-map-cache/`, which is ignored by git.

## Known limits

- Only citing authors with a Scholar profile and a self-reported affiliation get a pin. Authors
  without one are counted in the hero totals and listed in `data.js` under `unresolved`.
- Affiliations are current profile affiliations, not the affiliation on the citing paper.
- Geocoding is approximate. A pin in the wrong place means Nominatim or Wikidata matched a
  different campus or city; add the institution to `locations` in the overrides file.

## Technical notes

- Rendered with [D3](https://d3js.org/) (Natural Earth projection, zoomable) and
  [TopoJSON](https://github.com/topojson/topojson-client) over the
  [`world-atlas`](https://github.com/topojson/world-atlas) 110m countries topology.
- The globe view uses [Globe.GL](https://github.com/vasturiano/globe.gl) 2.46.1, loaded only when
  selected, with the same pins, arcs, and labels.
- Styling reuses the site theme (`../../styles.css`) and the shared starfield background.
