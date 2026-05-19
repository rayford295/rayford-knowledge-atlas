# Rayford Knowledge Atlas — Improvement Suggestions

> Generated 2026-05-19. These notes cover visual design, content structure, technical health, and future directions for `rayford295/rayford-knowledge-atlas`.

---

## 1. Visual Design

### 1.1 Color Palette — "Midnight Amber" (applied)

The previous palette (deep green-black `#060e0a` + neon aqua `#36f1c7` + gold `#ffd46a`) read as a generic hacker terminal. The replacement palette creates a scholarly, archival atmosphere more fitting for a research knowledge atlas:

| Token | Value | Role |
|---|---|---|
| `--void` | `#05040d` | Deepest background |
| `--deep` | `#0b0919` | Body background |
| `--amber` | `#f2aa40` | Primary accent (warm, intellectual) |
| `--sage` | `#5ac89a` | Secondary accent (growth, ecology) |
| `--violet` | `#a892e8` | Tertiary accent (theory, abstraction) |
| `--coral` | `#f07060` | Warning / highlight |
| `--ink` | `#ede9ff` | Body text |
| `--muted` | `#8878b5` | Subdued text |

The indigo-black background with warm amber accents evokes candlelight over manuscripts — appropriate for a research record. Neon aqua has been retired; all legacy `--aqua` references alias to `--sage`.

### 1.2 Starfield Colors (applied)

Starfield tints updated from teal-dominant (`"186, 255, 232"`) to lavender-dominant (`"190, 170, 255"`) with amber accent stars (`"242, 170, 64"`). This aligns the ambient background animation with the new palette and prevents the old aqua from bleeding through.

### 1.3 Typography — Suggestions

- **Consider a heavier weight for the brand mark text.** `Fraunces` at 600 weight reads beautifully for the logo; bump to 700 for stronger identity punch.
- **Tighten the manifesto line-height.** Currently `1.75` — academic prose benefits from `1.6` to feel denser and more considered.
- **Add `font-variant-numeric: oldstyle-nums`** to year and citation figures. Fraunces supports this and gives publication years a classic typographic feel.

### 1.4 Graph Stage

- **Add a very subtle noise texture overlay** (`opacity: 0.025`, SVG filter or CSS `backdrop-filter`) to the graph canvas background to give it the feel of aged paper under starlight.
- **Increase link opacity on hover from `0.45` to `0.65`** so the graph feels more responsive when exploring connections.
- **Consider varying link stroke-dasharray by connection type** (e.g., `extends` = solid, `informs` = dashed, `motivates` = dotted) for richer visual grammar without adding color complexity.

---

## 2. Content Structure

### 2.1 Graph Node Positions

Several nodes cluster tightly in the 400–600 x, 300–500 y quadrant. Before adding new nodes, audit existing `position` values in `wiki/papers/` and redistribute to use the full 0–900 × 0–700 canvas. Overpopulated quadrants make the force simulation fight itself.

### 2.2 Bridge Questions

The `wiki/questions/` directory is the connective tissue of the graph but is likely sparse relative to the paper count. For every paper, consider asking: *"What open question does this paper leave unanswered?"* Each such question becomes a bridge node that links the completed work to future directions.

### 2.3 Reading Layer Connections

Ensure every `wiki/readings/` entry has at least one connection to a `wiki/questions/` node. Readings that connect only to papers skip the intellectual bridge step and weaken the graph's explanatory power.

### 2.4 Chinese Summary Quality

Each paper page includes a `Chinese Summary` section. Consider expanding these to 3–4 sentences (currently often 1–2). A more substantive Chinese summary makes the atlas genuinely bilingual rather than tokenistically so.

---

## 3. Technical Health

### 3.1 Cache-Busting Query String

`index.html` loads `./styles.css?v=2026051708`. This manual version string will go stale. Options:

- Use a build step that injects a content hash automatically (`npm run build` with a simple hash script).
- Or accept manual bumps but add a pre-commit hook reminder.

### 3.2 `data.js` Integrity Check

`scripts/build-map.js` compiles all four sources into `data.js`. Add a post-build assertion that:

1. Every node `id` is unique.
2. Every `connections[].target` references an existing node `id`.
3. No node has `position.x` or `position.y` outside `[0, 900]` / `[0, 700]`.

A simple Node script running these checks as `npm run lint` would catch broken links before they reach the live site.

### 3.3 `fetch-scholar.js` Rate Limit Handling

The weekly GitHub Action fetches Google Scholar data. Add exponential backoff (3 retries, 2-4-8 s delays) before falling back to the previous snapshot. Current behavior on rate-limit is silent failure.

### 3.4 Accessibility

- All SVG graph nodes should carry `role="button"` and `aria-label` with the paper short title.
- The starfield canvas should have `aria-hidden="true"` to avoid screen-reader confusion.
- Ensure the inspector panel has sufficient color contrast ratio (≥ 4.5:1) under the new amber accent — run a WCAG audit after deploying.

---

## 4. Performance

### 4.1 Google Fonts Loading

Currently two font families are loaded in `<head>` as separate `<link>` tags. Combine into a single request using the `family=` multi-param syntax:

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Manrope:wght@300..700&display=swap" rel="stylesheet">
```

Also add `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` before the stylesheet link.

### 4.2 `data.js` Size

As the atlas grows, `data.js` will become large. Consider lazy-loading node narrative bodies (the `## Summary`, `## Method Snapshot`, etc.) only when the inspector panel opens, keeping the initial graph payload lean.

### 4.3 Force Simulation Termination

The D3-style force simulation should call `simulation.stop()` after the graph stabilizes (alpha < 0.01). Leaving it running indefinitely burns CPU in background tabs. Add a check after the alpha threshold is reached.

---

## 5. Content — New Pages to Add

Based on the existing wiki structure, the following types of pages would strengthen the atlas:

| Page Type | Priority | Rationale |
|---|---|---|
| FireBridge assessment paper | High | Current active project; adding a placeholder node now lets you track connections as the paper develops |
| Methodological comparison page | Medium | Side-by-side comparison of GeoAI methods used across papers (e.g., CNN vs. Transformer approaches) |
| Thematic concept pages | Medium | Pages for recurring themes like "remote sensing × disaster response" that aggregate multiple papers |
| Future directions question | High | A bridge question for each major open problem signals research trajectory to readers |
| Collaborator node type | Low | Consider whether co-author nodes (without personal details) would enrich the connection graph |

---

## 6. Repository Hygiene

- **Add a `CONTRIBUTING.md`** or extend `docs/FORK_GUIDE.md` with guidance on what constitutes a valid reading page vs. a paper page.
- **Pin npm dependencies** in `package.json` with exact versions (`"build-map": "1.0.0"`) to prevent silent breakage from upstream updates.
- **Add `.github/ISSUE_TEMPLATE/`** with a "new paper" template that mirrors the required frontmatter fields from `CLAUDE.md` — makes it easy to file a stub issue before writing the full page.
- **Tag releases** (e.g., `v2026-Q2`) so the Scholar snapshot can be correlated with a repo state snapshot for reproducibility.

---

*These suggestions are a starting point. Priorities should be adjusted based on what matters most for the primary audience of this atlas.*
