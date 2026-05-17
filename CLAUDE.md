# Research Map Schema

## Purpose

This repository is a bilingual research knowledge graph for Yifan Yang's first-authored research outputs, including papers, book chapters, datasets, and code-backed GeoAI workflows. The public website should stay consistent with the markdown knowledge base and GitHub repository metadata.

## Core Structure

- `raw/` stores source records and immutable input notes.
- `raw/scholar/google-scholar.json` stores the latest public Google Scholar snapshot.
- `raw/weread/public-reading-index.json` stores public-safe WeRead metadata.
- `wiki/` stores agent-maintained markdown pages.
- `wiki/papers/` stores curated research output pages (compiled into `data.js`).
- `wiki/readings/` stores public-safe reading input pages (compiled into `data.js`).
- `wiki/questions/` stores bridge question pages (compiled into `data.js`).
- `wiki/index.md` is the catalog of knowledge pages.
- `wiki/log.md` is an append-only update log.
- `scripts/build-map.js` compiles **all four sources** (`wiki/papers/`, `wiki/readings/`, `wiki/questions/`, `raw/scholar/google-scholar.json`) into `data.js`.
- `outputs/` stores generated reports and future exports.
- `docs/FORK_GUIDE.md` and `docs/FORK_GUIDE.zh-CN.md` explain how others can fork the project.
- `wiki/papers/_template.md` is a reusable research-output template.

## Scholar Snapshot Rules

- The Google Scholar profile URL is `https://scholar.google.com/citations?user=B-fiSHwAAAAJ`.
- `scripts/fetch-scholar.js` should update only public profile metadata and article rows.
- If Google Scholar rate-limits or returns incomplete data, keep the previous snapshot.
- `.github/workflows/update-scholar.yml` runs the refresh weekly and commits only real data changes.

## Page Rules

Every research output page in `wiki/papers/` must include YAML frontmatter with:

- `id`
- `short_title`
- `title`
- `year`
- `venue`
- `type`
- `status`
- `authors`
- `themes`
- `methods`
- `links`
- `connections`
- `repository`
- `position`
- `color`
- `radius`

Files in any `wiki/` subdirectory that begin with `_` are templates or internal scaffolds. They must not be compiled into `data.js`.

The `repository` object should include:

- `name`
- `url`
- `preview`
- `language`
- `stars`
- `forks`
- `commits`

Every research output page should also include enough narrative detail to support future project pages:

- `One-Sentence Takeaway`
- `Research Problem`
- `Core Question`
- `Summary`
- `Method Snapshot`
- `Data and Study Area`
- `Key Contributions`
- `How This Connects to My Other Work`
- `Impact`
- `Keywords`
- `Public Links`
- `Citation`
- `Chinese Summary`

## Reading Input Page Rules

Every reading input page in `wiki/readings/` must include YAML frontmatter with:

- `id` — matches the WeRead book id (e.g. `1-23303928`)
- `kind: input`
- `source: WeRead`
- `title`
- `author`
- `themes`
- `metrics.note_count`
- `connections` — at least one connection to a bridge question or research output

Do not include raw highlights, private thoughts, or long copyrighted excerpts. Only public-safe metadata, note counts, and Yifan's own synthesis scaffold belong in committed reading pages.

## Bridge Question Page Rules

Every bridge question page in `wiki/questions/` must include YAML frontmatter with:

- `id`
- `kind: question`
- `source: Knowledge Questions`
- `title` — the question as a full sentence
- `themes`
- `connections` — at least one connection to a reading input AND at least one connection to a research output

Bridge questions are the connective tissue of the graph. A question page with connections only to outputs (or only to inputs) defeats its purpose.

## Connection Label Vocabulary

Use these labels consistently when writing `connections` entries. Labels should describe the intellectual relationship, not just cite adjacency.

| Label | When to use |
|---|---|
| `extends` | This node builds directly on the other's method or framing |
| `uses the same dataset as` | Shared empirical data |
| `shares method lineage with` | Related methodology without sharing data |
| `contrasts with` | Deliberate methodological or conceptual contrast |
| `opens a new branch from` | The other node was the branching point for a new research direction |
| `motivates` | Reading or question that directly motivated the output |
| `answers` | Question node that a paper or reading attempts to answer |
| `precedes` | Chronological predecessor in a research arc |
| `informs` | Loose intellectual influence, not direct method transfer |

## Position and Radius Rules

`position.x` and `position.y` place the node in the graph canvas (typical range: 0–900 for x, 0–700 for y). When adding a new node:

- Check existing positions in other pages to avoid overlapping nodes.
- Place thematically related nodes near each other (same quadrant).
- Leave at least 80 units of separation between any two node centers.

`radius` controls node visual size (default: `28`). Use these as a guide:

| Radius | Meaning |
|---|---|
| 34–40 | High-impact curated output (first-author journal or conference paper) |
| 28–33 | Standard output or question |
| 20–27 | Reading input or Scholar-only node |

## Workflow

### Ingest

1. Add or update a raw source file in `raw/`.
2. Create or revise the corresponding page in `wiki/papers/`, `wiki/readings/`, or `wiki/questions/`.
3. Update concept pages or comparison pages if the new paper changes the broader narrative.
4. Update `wiki/index.md`.
5. Append a dated entry to `wiki/log.md` using the format:

```
## YYYY-MM-DD

- Short description of what changed and why.
```

### Build

1. Run `npm run build`.
2. Run the integrity check (see Operations Runbook) and confirm zero broken links.
3. Verify that the node count in `data.js` matches expectations (papers + readings + questions + Scholar).

### Lint

Check for:

- missing required frontmatter fields
- missing links in paper pages
- inconsistent themes or methods across related nodes
- orphan nodes with no graph connections
- outdated summaries after publication status changes
- duplicated concepts across wiki pages
- reading pages with connections that target non-existent node ids
