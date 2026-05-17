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
node - <<'NODE'
const fs = require("fs");
const text = fs.readFileSync("data.js", "utf8")
  .replace(/^window\.researchMapData = /, "")
  .replace(/;\s*$/, "");
const data = JSON.parse(text);
const ids = new Set(data.nodes.map((node) => node.id));
const broken = [];
for (const node of data.nodes) {
  for (const connection of node.connections || []) {
    if (!ids.has(connection.target)) {
      broken.push(`${node.id}->${connection.target}`);
    }
  }
}
console.log({ nodes: data.nodes.length, counts: data.counts, broken });
if (broken.length) process.exit(1);
NODE
```

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

Then verify:

```bash
curl -sS -L -H 'Cache-Control: no-cache' \
  'https://rayford295.github.io/rayford-knowledge-atlas/?v=latest' |
  rg 'Rayford Knowledge Atlas|Inputs Become Outputs'
```
