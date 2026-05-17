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
wiki/readings/
```

Do not commit raw highlights or private note text.

## Verify Graph Integrity

```bash
npm run verify
```

If `npm run verify` is not wired in `package.json`, run the check inline:

```bash
node -e "
const fs = require('fs');
const text = fs.readFileSync('data.js', 'utf8')
  .replace(/^window\.researchMapData = /, '')
  .replace(/;\s*$/, '');
const data = JSON.parse(text);
const ids = new Set(data.nodes.map(n => n.id));
const broken = data.nodes.flatMap(n =>
  (n.connections || []).filter(c => !ids.has(c.target)).map(c => n.id + '->' + c.target)
);
console.log({ nodes: data.nodes.length, counts: data.counts, broken });
if (broken.length) process.exit(1);
"
```

This exits with code 1 and prints every broken `source->target` pair if any connection targets a node id that does not exist.

## Local Browser QA

```bash
python3 -m http.server 8899
```

Open:

```text
http://127.0.0.1:8899/
```

Check:

- title says `Rayford Knowledge Atlas`;
- sidebar counts show outputs, inputs, questions, and themes;
- `Network`, `Timeline`, and `Flow` all render;
- search finds a reading node such as `李小龙`;
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
