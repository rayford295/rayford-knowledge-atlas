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

Scholar blocks GitHub's datacenter IPs with a 403 most weeks: only 2 of the 8 runs
between 2026-06-29 and 2026-08-17 got through, which froze the snapshot for 19 days
while every run still reported success. Three rules follow from that, and they are
easy to undo by accident:

- **Do not retry a 403 inside one job.** The block is per-IP, so every retry from
  the same process hits the same wall. Only 429/503 are worth backing off on.
  Retrying across jobs is what works, because each Actions job gets a fresh runner
  IP. That is what the 6-hourly catch-up schedule is for; it is gated on snapshot
  age, so a healthy week still makes exactly one request.
- **Do not rebuild or commit when the snapshot did not change.** `npm run build`
  rewrites `generatedAt` and every HTML cache-bust hash on each invocation, so an
  unconditional rebuild after a failed fetch commits a timestamp and nothing else.
- **Keep the failure visible.** `scripts/scholar-freshness.js` reports snapshot age;
  the primary weekly run fails once the snapshot passes 14 days, and `papers.html`
  stamps the snapshot date under the citation count. A silent fallback plus a green
  check is how the original 19-day freeze went unnoticed.

When the catch-up loop cannot get through, run `npm run scholar:update` locally.
A residential IP is normally not blocked.

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

| Label                        | When to use                                                         |
| ---------------------------- | ------------------------------------------------------------------- |
| `extends`                    | This node builds directly on the other's method or framing          |
| `uses the same dataset as`   | Shared empirical data                                               |
| `shares method lineage with` | Related methodology without sharing data                            |
| `contrasts with`             | Deliberate methodological or conceptual contrast                    |
| `opens a new branch from`    | The other node was the branching point for a new research direction |
| `motivates`                  | Reading or question that directly motivated the output              |
| `answers`                    | Question node that a paper or reading attempts to answer            |
| `precedes`                   | Chronological predecessor in a research arc                         |
| `informs`                    | Loose intellectual influence, not direct method transfer            |

## Position and Radius Rules

`position.x` and `position.y` are **seeds, not final coordinates** (usable range: 0–900 for x, 0–700 for y). `scripts/build-map.js` runs `relaxPositions()` after loading the wiki: it pushes overlapping nodes apart and keeps pulling each one back toward its seed, so a seed decides which neighbourhood a node lands in, not its exact pixel. The coordinates in `data.js` are that relaxed output, which is why they run past 900/700.

When adding a new node:

- Place thematically related nodes near each other (same quadrant). That intent survives relaxation and is the only thing a seed needs to get right.
- Do **not** try to hand-solve overlaps. That is what the relaxation is for. At 46 nodes the hand-authored map had 143 overlapping label boxes, because nobody can pack 46 boxes by hand in YAML.

What actually collides is the **label box**, not the circle: the renderer draws the title at `radius + 25` and the meta line at `radius + 42`, both centred, so a node's footprint is wider than its circle and hangs below it. Two nodes 70 units apart can have clear air between the circles and still print text through each other. `scripts/label-box.js` owns that geometry and is shared by the layout pass and the verifier so the two cannot disagree about what "overlapping" means. Its character widths were least-squares fitted against real `getBBox()` measurements and carry an 8% safety factor — if you touch the label font size or weight in `styles.css`, re-fit them, and keep the model pessimistic. Under-reserving puts text back on top of text; over-reserving only costs whitespace.

`npm run verify` fails on any label-box overlap, so a regression here cannot ship quietly.

`radius` controls node visual size (default: `28`). Use these as a guide:

| Radius | Meaning                                                               |
| ------ | --------------------------------------------------------------------- |
| 34–40  | High-impact curated output (first-author journal or conference paper) |
| 28–33  | Standard output or question                                           |
| 20–27  | Reading input or Scholar-only node                                    |

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
