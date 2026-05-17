# Fork Guide: Build Your Own Knowledge Atlas

This repository can be forked into a personal input-output atlas for another scholar, lab, course, or project. The goal is simple: connect reading inputs, bridge questions, research outputs, and Scholar metadata in one public knowledge graph.

## 1. Fork and Rename

1. Open [Rayford Knowledge Atlas](https://github.com/rayford295/rayford-knowledge-atlas).
2. Click `Fork`.
3. Rename the fork to your preferred project name, for example `YourName-Knowledge-Atlas`.
4. In GitHub repository settings, enable GitHub Pages from the `main` branch root.

Your site will usually be available at:

```text
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/
```

## 2. Replace Identity and Links

Update these files first:

- `README.md` and `README.zh-CN.md` — change all personal links, Scholar URL, and homepage URL.
- `package.json` — update `name`, `description`, and `homepage`.
- `index.html` — update the `<title>` tag, the `.hero-title` heading, the Scholar profile link in the sidebar, and your homepage link in the header.
- `raw/scholar/google-scholar.json` — replace with an empty `{"nodes": []}` until you run `npm run scholar:update`.
- `scripts/fetch-scholar.js` — replace the `userId` constant with your own Scholar user id.
- `.github/workflows/update-scholar.yml` — no changes needed unless you rename the default branch.

Replace all occurrences of `rayford295`, `Rayford`, `Yifan Yang`, `B-fiSHwAAAAJ`, and `rayford295.github.io` with your own identifiers.

## 3. Add Your Research Outputs

Use the template at:

```text
wiki/papers/_template.md
```

Copy it to a new file such as:

```text
wiki/papers/my-first-paper.md
```

Then fill in all required frontmatter fields. See `CLAUDE.md` for the full field list and position/radius sizing guidelines.

For `color`, pick a hex value that groups related outputs visually. A consistent palette suggestion:

| Field type | Example color |
|---|---|
| GeoAI / spatial | `#d7a13b` (gold) |
| Disaster / safety | `#c0392b` (red) |
| Multimodal / vision | `#2980b9` (blue) |
| Reading input | `#27ae60` (green) |
| Bridge question | `#8e44ad` (purple) |

Files that start with `_` are ignored by the build script, so `_template.md` will not appear as a graph node.

## 4. Add Reading Inputs and Bridge Questions

Use these templates when you want the graph to show what shaped the work, not only what came out of it:

```text
wiki/readings/_template.md
wiki/questions/_template.md
```

Reading pages should stay public-safe. Do not publish raw highlights, private notes, or long copyrighted excerpts. Use metadata, note counts, themes, and your own synthesis.

## 5. Connect the Graph

Every node should connect to at least one other node. Use relationship labels such as:

- `extends`
- `uses the same dataset as`
- `shares method lineage with`
- `contrasts with`
- `opens a new branch from`

Good graph connections explain your intellectual trajectory, not just citation relationships.

## 6. Build Locally

Run:

```bash
npm run build
```

This reads `wiki/papers/*.md`, `wiki/readings/*.md`, `wiki/questions/*.md`, and the Scholar snapshot, then generates `data.js`.

## 7. Add Google Scholar

Find your Google Scholar user id from your profile URL:

```text
https://scholar.google.com/citations?user=YOUR_ID
```

Update the user id in:

- `scripts/fetch-scholar.js`
- `raw/scholar/google-scholar.json`
- `.github/workflows/update-scholar.yml`
- `index.html`
- `README.md`

Then run:

```bash
npm run scholar:update
```

## 8. Add WeRead Inputs (Optional)

Skip this step if you do not use WeRead or do not have a WeRead Agent API key. The graph works without a reading layer — you can add reading inputs by hand using `wiki/readings/_template.md` instead.

If you do have a WeRead API key:

```bash
export WEREAD_API_KEY=wrk-...
npm run weread:update
npm run build
```

Review every generated reading page before committing. Confirm no raw highlights or private text were included.

## 9. Publish

Commit and push:

```bash
git add .
git commit -m "Customize my knowledge atlas"
git push
```

GitHub Pages will deploy the site. The weekly Scholar workflow will run automatically if Actions are enabled.

## Suggested Customization Checklist

- [ ] Replace all personal links in `README.md`, `index.html`, and `package.json`.
- [ ] Replace the Scholar user id in `scripts/fetch-scholar.js` and run `npm run scholar:update`.
- [ ] Replace or delete the six example paper pages in `wiki/papers/`.
- [ ] Replace or remove the generated reading pages in `wiki/readings/`.
- [ ] Add at least two bridge questions in `wiki/questions/` that connect your reading inputs to your outputs.
- [ ] Replace raw source records in `raw/papers/`.
- [ ] Update theme and method tags to match your research domain.
- [ ] Update graph positions so nodes do not overlap (see `CLAUDE.md` for spacing rules).
- [ ] Update colors to match your field or identity (see color table above).
- [ ] Run `npm run build` and confirm zero broken links.
- [ ] Open the GitHub Pages site and test search, filters, and node inspector clicks.
- [ ] Test on a narrow viewport to confirm mobile layout does not break.
