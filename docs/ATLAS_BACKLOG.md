# Atlas Backlog

What the atlas does not yet cover, and why. Keep this file honest: the point is
that a gap recorded here is a decision, while a gap that lives only in someone's
head is an accident waiting to be rediscovered months later.

Last reviewed: 2026-08-22.

## How coverage drifts

The curated layer is hand-written, so it does not track the work by itself. The
Scholar layer partly compensates -- `scripts/build-map.js` turns Scholar articles
without a matching page into auto-generated stubs -- but only for work that is
already indexed by Google Scholar. Projects that live as a repository, a
submission in progress, or an unpublished preprint are invisible to both layers
until someone writes the page.

That is how RAPID sat in the graph as a bare Scholar stub for months while being
accepted at SIGSPATIAL 2026, and how three active project lines had no node at
all as of 2026-08-22.

Writing a curated page for a title that already exists as a Scholar stub is not
duplication: `buildScholarNodes` drops any article whose normalized title matches
an existing markdown node, so the curated page replaces the stub in place.

## Missing curated pages

Work with material on hand but no node page yet. Ordered by how much of the
material already exists in public form.

| Project                  | Source                                      | Why it is not written yet                                                                                                                                                                                                                             |
| ------------------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PrepStreet               | `rayford295/PrepStreet` (private)           | Preparedness-oriented street-view damage scenario generation from hurricane forecasts. Too early; no public artifact to link.                                                                                                                         |
| CrossViewGate            | `rayford295/CrossViewGate` (private)        | Visibility-conditioned reliability gating for cross-view damage assessment. Needs a scoping call first: this may be the same research line as the existing `firebridge` node, in which case it should extend that page rather than open a second one. |
| Geothermal awareness     | `rayford295/geothermal-awareness` (private) | DOE task on geothermal perception and acceptance. Outside the disaster and GeoAI clusters, so it also needs a theme and a graph position that do not pretend it belongs to them.                                                                      |
| Drone compression on HPC | `rayford295/drone-compression-hpc` (public) | Systems work rather than a research output; may belong in a repository layer instead of `wiki/papers/`.                                                                                                                                               |

## Scholar-only records without curated pages

These appear in the graph as auto-generated stubs. They carry a title, a year,
and a Scholar link, but no research problem, method, or connections.

| Record                                                          | Note                                                                                                                                                     |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Earth Embeddings Reveal Diverse Urban Signals from Space        | Same AlphaEarth line as [`beacon`](../wiki/papers/beacon.md). When written, the two should connect.                                                      |
| GIScholarBench: Benchmarking LLM Overconfidence in GIS Research | Fits the Responsible GeoAI thread alongside [`responsible-geoai`](../wiki/papers/responsible-geoai.md) and [`geosteward`](../wiki/papers/geosteward.md). |
| Seeing Green from Indoors in 3D                                 | Built environment and vegetation; nearest existing neighbour is [`heat-stress-digital-twins`](../wiki/papers/heat-stress-digital-twins.md).              |
| Predicting Healthcare System Visitation Flow                    | Mobility and accessibility; overlaps the behavioural view in [`beacon`](../wiki/papers/beacon.md).                                                       |
| Surveying attitudinal alignment between LLMs and humans         | 2024 collaborative output.                                                                                                                               |

## Known graph-integrity gaps

`npm run verify` passes but emits warnings that are real, not noise:

- `biography-research-judgment` has neither an input-side nor an output-side
  connection. A bridge question connected to nothing defeats its purpose.
- `ai-systems-human-judgment`, `founder-window-research-output`,
  `human-evidence-disaster-ai`, and `spatial-intelligence-public-infrastructure`
  each reach outputs but no reading input. They are half-bridges.
- Two nodes sit 27 units apart (`reading-3300146170` and
  `biography-research-judgment`), well inside the 80-unit minimum in
  `CLAUDE.md`. Node positions are only checked by eye today; `verify-atlas.js`
  warns on out-of-canvas positions but not on collisions.

## Open decisions

- **BEACON connections.** The four `connections` entries on
  [`beacon`](../wiki/papers/beacon.md) were inferred from the paper, not from
  the actual collaboration history. If BEACON branched off earlier AlphaEarth
  work, `opens a new branch from` would describe the relationship better than
  the current `shares method lineage with`.
- **GeoSteward disclosure boundary.** The repository is private while its Pages
  site is public. The node page links the public site and describes the
  enforcement design, but deliberately omits the unfinished-hardening notes from
  the private README. Publishing a system's known weak points on a public
  website is a decision to make deliberately, not by copy-paste.
