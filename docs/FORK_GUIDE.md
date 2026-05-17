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

- `README.md`
- `README.zh-CN.md`
- `package.json`
- `index.html`
- `raw/scholar/google-scholar.json`
- `scripts/fetch-scholar.js`
- `.github/workflows/update-scholar.yml`

Replace Rayford/Yifan links with your own website, GitHub profile, Google Scholar profile, and repository name.

## 3. Add Your Research Outputs

Use the template at:

```text
wiki/papers/_template.md
```

Copy it to a new file such as:

```text
wiki/papers/my-first-paper.md
```

Then fill in:

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

## 8. Add WeRead Inputs

Set a local WeRead API key if you want to generate reading input nodes:

```bash
export WEREAD_API_KEY=wrk-...
npm run weread:update
npm run build
```

Review generated reading pages before committing.

## 9. Publish

Commit and push:

```bash
git add .
git commit -m "Customize my knowledge atlas"
git push
```

GitHub Pages will deploy the site. The weekly Scholar workflow will run automatically if Actions are enabled.

## Suggested Customization Checklist

- Replace all personal links.
- Replace paper pages.
- Replace or remove generated reading pages.
- Add bridge questions that make inputs and outputs meet.
- Replace raw source records.
- Update theme and method tags.
- Update graph positions so nodes do not overlap.
- Update colors to match your field or identity.
- Check `data.js` after running `npm run build`.
- Open the GitHub Pages site and test search, filters, and node clicks.
