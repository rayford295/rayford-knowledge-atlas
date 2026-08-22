# Research Wiki Log

## 2026-04-25

- Initialized the `raw + wiki + schema` project structure.
- Added paper pages for current first-authored publications and preprints.
- Added concept pages and a build pipeline from markdown to `data.js`.
- Added the ArcGIS Text SAM tree segmentation book chapter and companion GitHub workflow as a new graph node.

## 2026-07-02

- Fixed the `.guide-panel span` badge selector that turned card labels on rooms, advisor, and next-stop cards into overlapping amber circles; card eyebrows now render as uppercase kickers.
- Fixed the travel-map layout blowout (globe.gl first paint at window width inflated the page) and the fork-guide mobile overflow caused by the unbreakable `git clone` line in `<pre>`.
- Added fit-to-content camera to the atlas graph: the viewBox now follows the visible constellation with a smooth zoom, so trails, Flow, and tall Timeline stacks fill the stage instead of clipping or huddling in a corner.
- Moved Featured Trails below the graph and tightened hero spacing so the constellation is visible on the first screen; mobile nav collapsed to one swipeable row.
- Rebuilt README quick-access lists as tables, added badges and a directory tree; moved `SUGGESTIONS.md` into `docs/`.

## 2026-07-12

- Added Urbana-Champaign (UIUC), Illinois to the travel map: new globe point, Illinois state card, and updated counters (18/50 states, 27 cities).
- Added life-journey milestones to the travel map: Xi'an (hometown), Haikou (B.S.), Los Angeles (M.S.), College Station (Ph.D.) shown as sky-blue points with animated arcs tracing the journey; counters now 30 cities / 3 countries.
- Added Gainesville and Tampa (Florida) and Irvine (California) to the travel map; city counter now 33 across page and READMEs.

## 2026-08-22

- Added the BEACON paper node (`wiki/papers/beacon.md`), accepted at SIGSPATIAL '26: tri-modal contrastive alignment of AlphaEarth embeddings with POI text and hourly visitation, keeping the deployed representation image-only.
- Archived the published PDF as `publications/2026-beacon-tri-modal-contrastive-alphaearth.pdf` and registered the record in `raw/publications/publications.json`, the publication map, the research output map, and the wiki index.
- Promoted RAPID from an auto-generated Scholar stub to a curated node (`wiki/papers/rapid.md`): four-agent zero-shot disaster damage pipeline, accepted at ACM SIGSPATIAL 2026 for oral presentation, with RAPIDMap accepted at CaGIS 2026. The curated page absorbs the Scholar duplicate, so Scholar-only records drop from 6 to 5.
- Added `wiki/papers/geosteward.md` (accountable GeoAI risk analyst and Steward Harness, OASIS @ SIGSPATIAL 2026 Track A) and `wiki/papers/vgi-spatial-bias.md` (OSM spatial bias detected and corrected against LiDAR and NAIP, I-GUIDE Summer School 2026).
- Fixed the Scholar refresh: Google 403s GitHub's datacenter IPs most weeks, and the silent fallback made every failed run look successful. Retries now happen across jobs instead of inside one, and papers.html stamps the snapshot date under the citation count.
