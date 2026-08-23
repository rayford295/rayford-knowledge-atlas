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
- Recorded the state of the work in the repository rather than leaving it in a chat log: `docs/ATLAS_BACKLOG.md` now lists uncovered projects, Scholar-only stubs awaiting curated pages, half-connected bridge questions, and two open editorial decisions (BEACON's connection labels, and GeoSteward's public/private disclosure boundary).
- Corrected stale documentation: `CLAUDE.md` Scholar rules now describe the 403 IP block and the three constraints it implies, `docs/OPERATIONS.md` explains why a green Scholar run is not evidence of fresh data, `docs/SUGGESTIONS.md` marks the 2026-06 exponential-backoff fix as superseded, and both READMEs list the curated nodes that actually exist.

## 2026-08-23

- Archived the RAPID camera-ready as `publications/2026-rapid-multi-agent-disaster-damage-assessment.pdf` (12 pages, CC BY 4.0, so the copy is redistributable) and registered it in the publication archive table. RAPID already had a curated node; the PDF was the missing piece.
- Corrected four author names on `wiki/papers/rapid.md` against the camera-ready ACM Reference Format: Kai Zhang to Kaili Zhang, Zheng Tu to Zhengzhong Tu, Heng Li to Hao Li, Zhenlong Li to Zongrong Li. The old names came from the Scholar stub the curated page replaced, and would have contradicted the PDF the page now links.
- Replaced RAPID's arXiv-only citation with the published ACM form and recorded the camera-ready DOI `10.1145/3841645.3843346` in both the page and `raw/publications/publications.json`. As with BEACON, the DOI does not resolve until the SIGSPATIAL '26 proceedings reach the ACM Digital Library in November 2026.
- Fixed the unreadable network graph. The thing that collides is the label box, not the circle: the renderer prints a title and a meta line under each node, so a node's footprint is wider than its circle and hangs below it. Measured that way, the hand-authored map had 143 overlapping label boxes, not the 18 that a circle-only check reports.
- Added `scripts/label-box.js`, one definition of that geometry shared by the layout pass and the verifier so they cannot drift apart, and `relaxPositions()` in `build-map.js`, which treats authored positions as seeds: overlapping nodes push apart, every node keeps being pulled back toward its seed, so thematic quadrants survive while the packing gets solved. `npm run verify` now fails on any overlap.
- Root cause of the worst cluster was `build-map.js` placing Scholar nodes on a hardcoded 52-unit column pitch while their radius grows with citation count (up to 44), so a well-cited neighbour was guaranteed to overlap and the bug got worse every time a paper picked up a citation. Three pairs sat at exactly 52.0 apart. Scholar nodes are now seeded in a single column and placed by the relaxation like everything else.
- Calibrated the label width model by least-squares against the real `getBBox()` width of all 46 rendered labels. The fit caught a missing character class: uppercase and digits are ~13% wider than lowercase, so caps-heavy labels (BEACON, RAPID, COVID) were being underestimated by up to 15% — the dangerous direction, since it reports "no collision" on labels that collide. Model now over-reserves everywhere; 0 of 46 labels underestimated, and a collision check run against browser-measured widths also returns zero.
- Labels longer than the renderer's own 172-unit reservation are now trimmed at a word boundary instead of hard-cut at 42 characters, which is where `Surveying attitudinal alignment between la` came from. Full titles are untouched and still shown in the detail panel. This affected Chinese reading titles as much as Scholar ones, since each CJK glyph is a full em wide.
- Canvas grew from 772x587 to 1480x1165 as a result, which is simply what 46 collision-free label boxes need. The SVG viewBox is fitted from the data, so the page scales to it with no layout change.
