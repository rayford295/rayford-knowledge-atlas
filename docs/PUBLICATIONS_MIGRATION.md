# Publications Migration

The former `rayford295/Publications` repository has been consolidated into Rayford Knowledge Atlas.

## What Moved

- The legacy README publication list was preserved as a source record in `raw/publications/legacy-publications-readme.md`.
- Publication metadata was normalized into `raw/publications/publications.json`.
- Each high-signal publication from the legacy list now has or reuses a curated output page under `wiki/papers/`.
- Public PDF copies provided from the desktop `出版物` folder were added to `publications/`, with filenames starting by year.
- The Obsidian entry point is `wiki/maps/publication-map.md`.
- The browser graph is rebuilt through `data.js`, so these records appear in the research output layer.

## Public PDF Archive

The legacy repository was private and contained PDF files. Rayford Knowledge Atlas is public, so PDF files are now published only for the papers explicitly provided for the public archive.

The public archive lives in `publications/`. Each corresponding `wiki/papers/` page includes a `PDF` link so the paper output page can surface the files directly.

## Local Backup

Before deleting the legacy repository, keep a local archive containing:

- a Git bundle of the original repository history;
- a working-tree copy of the original files.

The public repository should be treated as the canonical knowledge atlas. The local archive is only for recovery and rights review.

## Follow-Up Rule

When a publication has a known public DOI, official landing page, arXiv page, project page, accepted author manuscript, or public PDF, add that link to the corresponding `wiki/papers/` page.
