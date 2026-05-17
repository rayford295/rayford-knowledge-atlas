# Publications Migration

The former `rayford295/Publications` repository has been consolidated into Rayford Knowledge Atlas.

## What Moved

- The legacy README publication list was preserved as a source record in `raw/publications/legacy-publications-readme.md`.
- Publication metadata was normalized into `raw/publications/publications.json`.
- Each high-signal publication from the legacy list now has or reuses a curated output page under `wiki/papers/`.
- The Obsidian entry point is `wiki/maps/publication-map.md`.
- The browser graph is rebuilt through `data.js`, so these records appear in the research output layer.

## Public Boundary

The legacy repository was private and contained PDF files. Rayford Knowledge Atlas is public. For that reason, the migration records PDF filenames, sizes, and checksums in `raw/publications/legacy-file-manifest.json`, but it does not publish the PDFs themselves.

This keeps the atlas useful as a public knowledge system while avoiding accidental redistribution of publisher PDFs, private drafts, or files whose public-sharing rights have not been checked.

## Local Backup

Before deleting the legacy repository, keep a local archive containing:

- a Git bundle of the original repository history;
- a working-tree copy of the original files.

The public repository should be treated as the canonical knowledge atlas. The local archive is only for recovery and rights review.

## Follow-Up Rule

When a publication has a known public DOI, official landing page, arXiv page, project page, or accepted author manuscript, add that link to the corresponding `wiki/papers/` page. Do not add full-text PDFs to the public repository unless the sharing status is clear.
