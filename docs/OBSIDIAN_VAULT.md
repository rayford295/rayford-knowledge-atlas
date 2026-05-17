# Obsidian Vault Guide

Rayford Knowledge Atlas can be opened directly as an Obsidian vault.

## Why Obsidian Fits This Project

Obsidian is useful here because it treats knowledge as local Markdown files with links, backlinks, graph views, and publishable notes. That matches this repository's goal: reading inputs, bridge questions, and research outputs should live as durable files, not as a temporary dashboard.

## Open the Vault

1. Open Obsidian.
2. Choose `Open folder as vault`.
3. Select the repository folder.
4. Start from:

```text
wiki/index.md
wiki/maps/input-output-map.md
wiki/maps/reading-input-map.md
wiki/maps/research-output-map.md
wiki/maps/question-map.md
```

## Vault Conventions

Use wiki links for human navigation:

```text
[[wiki/maps/input-output-map]]
[[wiki/questions/human-evidence-disaster-ai]]
[[wiki/papers/damagearbiter]]
[[wiki/readings/1-23303928]]
```

Use frontmatter for the public graph build:

```yaml
kind: input | question | output
source: WeRead | Knowledge Questions | Research Wiki | Google Scholar
themes:
  - Human-AI Judgment
connections:
  - target: damagearbiter
    label: explains how this note connects to the output layer
```

The browser graph reads frontmatter. Obsidian reads links and backlinks. Both should point to the same knowledge structure.

## Daily Workflow

1. Capture a reading or idea in `wiki/readings/` or `wiki/questions/`.
2. Add `themes` and `connections` in frontmatter.
3. Add Obsidian-style links in the body.
4. Run `npm run build`.
5. Publish when the graph still has no broken links.

## Privacy Rule

This vault is also a public GitHub repository. Keep private notes, raw WeRead exports, long copyrighted excerpts, and unfinished sensitive material outside committed files.
