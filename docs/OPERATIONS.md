# Operations Runbook

Use this runbook when updating Rayford Knowledge Atlas.

## Refresh Scholar

```bash
npm run scholar:update
npm run build
```

Check:

```bash
node --check scripts/fetch-scholar.js
node --check scripts/build-map.js
git diff --check
```

## Refresh WeRead

Local refresh requires:

```bash
export WEREAD_API_KEY=wrk-...
```

Then run:

```bash
npm run weread:update
npm run build
```

Before committing, inspect generated files under:

```text
raw/weread/public-reading-index.json
raw/weread/reading-intelligence.json
wiki/readings/
```

Do not commit raw highlights or private note text.

## Merge Publication Records

Publication records belong in:

```text
wiki/papers/
raw/publications/
wiki/maps/publication-map.md
```

Use `docs/PUBLICATIONS_MIGRATION.md` as the boundary rule. The atlas is public, so do not commit legacy PDFs unless their public-sharing rights are clear.

## Add Public Writing

Public writing records belong in:

```text
wiki/public-writing/
raw/public-writing/
assets/public-writing/
wiki/maps/public-writing-map.md
```

Use `raw/public-writing/` for full backup copies and `wiki/public-writing/` for curated atlas nodes with frontmatter. Run `npm run build` after adding or editing public-writing nodes.

When the source `awesome-autonomous-geoai` philosophy files change, refresh the mirrored backups with:

```bash
npm run public-writing:sync
npm run build
npm run verify
```

This same sync also runs weekly through `.github/workflows/update-public-writing.yml`.

## Verify Graph Integrity

```bash
npm run verify
```

This runs `scripts/verify-atlas.js`, which checks:

- `data.js` is parseable;
- node ids are unique;
- `data.counts` matches actual node totals;
- every connection target exists;
- each node has the core public fields expected by the atlas;
- question nodes still bridge toward both inputs and outputs when possible;
- every compiled markdown page still has frontmatter.

Use this before every commit that touches `wiki/`, `data.js`, or homepage graph behavior.

## Local Browser QA

```bash
python3 -m http.server 8899
```

Open:

```text
http://127.0.0.1:8899/
http://127.0.0.1:8899/readings.html
http://127.0.0.1:8899/advisor.html
http://127.0.0.1:8899/papers.html
```

Check:

- title says `Rayford Knowledge Atlas`;
- homepage exposes separate `Readings`, `Advisor`, and `Papers` navigation;
- sidebar counts show outputs, inputs, questions, and themes;
- `Network`, `Timeline`, and `Flow` all render;
- search finds a reading node such as `李小龙`;
- search finds a migrated publication node such as `Agentic Urban Digital Twins`;
- search finds a public-writing node such as `Research Philosophy` or `Letter for Dr. Zou`;
- `readings.html` shows reading metrics and top WeRead signals;
- `advisor.html` shows shelf books, notebook books, true reads, hidden deep reads, bridge themes, and workflow queue;
- `papers.html` shows output metrics, filters, and publication cards;
- selecting Inputs, Questions, and Outputs changes both the graph and inspector;
- mobile width does not overlap text or controls.

## Publish

```bash
git add .
git commit -m "Your message"
git push
```

Then verify the live site contains expected text:

```bash
# Using ripgrep (rg):
curl -sS -L -H 'Cache-Control: no-cache' \
  'https://rayford295.github.io/rayford-knowledge-atlas/?v=latest' |
  rg 'Rayford Knowledge Atlas|Inputs Become Outputs'

# Or with standard grep:
curl -sS -L -H 'Cache-Control: no-cache' \
  'https://rayford295.github.io/rayford-knowledge-atlas/?v=latest' |
  grep -E 'Rayford Knowledge Atlas|Inputs Become Outputs'
```

## Check GitHub Actions Status

After pushing, confirm the automated workflows ran without error:

```bash
gh run list --repo rayford295/rayford-knowledge-atlas --limit 5
```

For a failing run, get the full log:

```bash
gh run view <run-id> --log-failed
```

## Rollback

If a push breaks the live site, revert the last commit and force-push:

```bash
git revert HEAD --no-edit
git push
```

Do not use `git push --force` on `main`. A revert commit preserves history and is safer for a public repository.
