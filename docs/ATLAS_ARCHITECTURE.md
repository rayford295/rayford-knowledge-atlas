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

`wiki/papers/` records curated paper and project pages. `raw/scholar/google-scholar.json` adds Scholar-indexed outputs that do not yet have hand-written pages, including collaborative and non-first-author work.

Typical fields:

- `kind: output`
- `source: Research Wiki` or `Google Scholar`
- `repository`
- `metrics.citations`
- `themes`
- `connections`

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

## Automation

- `.github/workflows/update-scholar.yml` refreshes Scholar, rebuilds `data.js`, verifies the graph, and commits changed files.
- `.github/workflows/update-weread.yml` is manual. It refreshes the reading layer only when `WEREAD_API_KEY` is configured as a repository secret.

## Public Boundary

The repository is public. Keep private or copyrighted material out of committed files. The WeRead layer should expose metadata, counts, themes, and Yifan's own synthesis, not raw highlights or private notes.
