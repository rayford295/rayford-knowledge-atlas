# Atlas Architecture

Rayford Knowledge Atlas is organized around one model:

```text
Reading Input -> Bridge Question -> Research Output
```

## Layers

### Reading Input

`wiki/readings/` records books and reading materials that shape judgment. These nodes come from WeRead metadata and public-safe synthesis, not raw note dumps.

Typical fields:

- `kind: input`
- `source: WeRead`
- `metrics.note_count`
- `themes`
- `connections`

### Bridge Question

`wiki/questions/` records durable questions that translate reading into research framing. These nodes prevent the graph from becoming two disconnected lists.

Typical questions:

- What counts as evidence in disaster AI?
- How should AI systems support human judgment?
- How does a founder turn research into a timing window?

### Research Output

`wiki/papers/` records curated paper and project pages. `raw/publications/` preserves the migrated publication list from the former Publications repository. `raw/scholar/google-scholar.json` adds Scholar-indexed outputs that do not yet have hand-written pages, including collaborative and non-first-author work.

Typical fields for a curated wiki page:

- `kind: output`
- `source: Research Wiki`
- `repository`
- `metrics.citations`
- `themes`
- `connections`

Typical fields for a Scholar-only node (no wiki page yet):

- `kind: output`
- `source: Google Scholar`
- `title`
- `year`
- `venue`
- `authors`
- `metrics.citations`
- `themes` (auto-assigned or empty)
- `connections` (empty until manually curated)

**Deduplication rule:** If a paper already has a `wiki/papers/` page, the build script uses the wiki page and ignores the matching Scholar JSON entry. The wiki page `id` must match the Scholar record's id for deduplication to work correctly.

## Bridge Connection Mechanics

A bridge question node connects the two otherwise separate layers. Its `connections` frontmatter must include at least one entry pointing to a reading input and at least one entry pointing to a research output. Without both sides, the graph breaks into disconnected clusters instead of showing the intellectual trajectory.

Example bridge structure:

```yaml
connections:
  - target: 3-43993718        # reading input node id
    label: motivates
  - target: damagearbiter      # research output node id
    label: answers
```

## Build Pipeline

`scripts/build-map.js` reads:

- `wiki/papers/*.md`
- `wiki/readings/*.md`
- `wiki/questions/*.md`
- `raw/scholar/google-scholar.json`

It writes:

- `data.js`

The browser reads only `data.js`, plus small live snapshots from:

- `raw/scholar/google-scholar.json`
- `raw/weread/public-reading-index.json`
- `raw/publications/publications.json`

`raw/publications/publications.json` is a source record for maintenance and review. The graph sees migrated publications through their curated pages in `wiki/papers/`.

## Automation

- `.github/workflows/update-scholar.yml` refreshes Scholar, rebuilds `data.js`, verifies the graph, and commits changed files.
- `.github/workflows/update-weread.yml` is manual. It refreshes the reading layer only when `WEREAD_API_KEY` is configured as a repository secret.

## Public Boundary

The repository is public. Keep private or copyrighted material out of committed files. The WeRead layer should expose metadata, counts, themes, and Yifan's own synthesis, not raw highlights or private notes. The publication layer should expose citation metadata and public links, not publisher PDFs or private drafts unless public-sharing rights are clear.
