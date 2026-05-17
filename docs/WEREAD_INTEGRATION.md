# WeRead Integration

This repository treats WeRead as an input layer, not as a public note dump.

## Purpose

The reading graph answers one question: which books, biographies, essays, and technical readings shape the questions behind the research outputs?

Papers and Scholar records are outputs. WeRead books are inputs. `wiki/questions/` provides the bridge between them.

## Public-Safe Boundary

This is a public GitHub repository, so the WeRead integration commits only:

- book title and author;
- reading progress;
- note, underline, bookmark, and thought counts;
- public-safe themes;
- Yifan's own synthesis scaffold;
- graph connections to questions and outputs.

It does not commit raw highlights, private thoughts, comments, or long copyrighted excerpts.

## Local Setup

Set the WeRead Agent API key in your shell:

```bash
export WEREAD_API_KEY=wrk-...
```

Then run:

```bash
npm run weread:update
npm run build
```

The script writes:

- `raw/weread/public-reading-index.json`
- `wiki/readings/*.md`

Private exports, if ever created, should stay under `raw/weread/private/` or `raw/weread/snapshots/`; both are ignored by git.

## Graph Meaning

Use this relation:

```text
Reading Input -> Bridge Question -> Research Output
```

Examples:

- AI books -> `How should AI systems support human judgment?` -> GeoLocator, DamageArbiter, Satellite-to-Street.
- biographies -> `How do biographies train research judgment?` -> founder judgment and research taste.
- institutional novels -> `What counts as evidence in disaster AI?` -> disaster assessment papers.

## Updating the Public Layer

After running `npm run weread:update`, review the generated reading pages before committing. Add hand-written synthesis when a book deserves a richer public page.
