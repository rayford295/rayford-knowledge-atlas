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
3. [`scripts/build-citation-map.py`](../../scripts/build-citation-map.py) aggregates the CSV by
   affiliation and writes [`data.js`](./data.js), which the page reads.

## Refreshing

```bash
pip install citation-map               # once; needs Chrome for Scholar CAPTCHAs
python3 scripts/build-citation-map.py --fetch   # scrape + rebuild (attended, local)
python3 scripts/build-citation-map.py           # rebuild data.js from the edited CSV only
```

Run the fetch from a residential connection. Google Scholar blocks datacenter IPs (see the Scholar
notes in `CLAUDE.md`), so this step is deliberately not in GitHub Actions. A CAPTCHA may open in a
Chrome window; solve it there and leave the window open until the run ends. Intermediate caches live
in `raw/scholar/citation-map-cache/`, which is ignored by git.

## Known limits

- Only citing authors with a Scholar profile and a self-reported affiliation get a pin. Authors
  without one are counted in the hero totals and listed in `data.js` under `unresolved`.
- Affiliations are current profile affiliations, not the affiliation on the citing paper.
- Geocoding is approximate. A pin in the wrong place means Nominatim matched a different campus or
  city; correct the row in the CSV.

## Technical notes

- Rendered with [D3](https://d3js.org/) (Natural Earth projection, zoomable) and
  [TopoJSON](https://github.com/topojson/topojson-client) over the
  [`world-atlas`](https://github.com/topojson/world-atlas) 110m countries topology.
- The globe view uses [Globe.GL](https://github.com/vasturiano/globe.gl) 2.46.1, loaded only when
  selected, with the same pins, arcs, and labels.
- Styling reuses the site theme (`../../styles.css`) and the shared starfield background.
