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

`WEREAD_API_KEY` is a WeRead Agent API key (format: `wrk-...`). Obtain it from your WeRead Agent account settings. Do not commit it to the repository — set it only in your local shell or as a GitHub Actions repository secret.

```bash
export WEREAD_API_KEY=wrk-...
npm run weread:update
npm run build
```

The script writes:

- `raw/weread/public-reading-index.json`
- `wiki/readings/*.md`

Private exports, if ever created, should stay under `raw/weread/private/` or `raw/weread/snapshots/`; both are ignored by git.

## Failure and Rate-Limit Handling

If `npm run weread:update` fails, returns partial data, or is rate-limited:

- Do not commit the incomplete output.
- Keep the previous `raw/weread/public-reading-index.json` and `wiki/readings/` unchanged.
- Retry after a cooldown period (at least one hour for rate limits).
- If the failure is persistent, file an issue with the WeRead Agent project and continue maintaining reading pages manually.

## Pre-Commit Review Checklist

Before committing after a WeRead update, confirm:

- [ ] No raw highlight text appears in any `wiki/readings/` file.
- [ ] No private notes or personal comments are included.
- [ ] No long verbatim excerpts from copyrighted books are present.
- [ ] Every generated reading page has at least one `connections` entry.
- [ ] `raw/weread/public-reading-index.json` contains only metadata fields (title, author, counts, themes).

Run a quick scan for common private-text signals before committing:

```bash
grep -rn "highlight\|private\|personal" wiki/readings/
```

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

After running `npm run weread:update`, review the generated reading pages before committing. Use the pre-commit checklist above before every `git commit`. Add hand-written synthesis when a book deserves a richer public page — especially for books that directly motivated a published paper.
