const fs = require("fs");
const path = require("path");
const { truncateLabel, overlap, halfWidth, halfHeight } = require("./label-box");

const repoRoot = path.resolve(__dirname, "..");
const papersDir = path.join(repoRoot, "wiki", "papers");
const publicWritingDir = path.join(repoRoot, "wiki", "public-writing");
const readingsDir = path.join(repoRoot, "wiki", "readings");
const questionsDir = path.join(repoRoot, "wiki", "questions");
const scholarPath = path.join(repoRoot, "raw", "scholar", "google-scholar.json");
const outputPath = path.join(repoRoot, "data.js");

const graphSources = [
  { dir: papersDir, kind: "output", source: "Research Wiki" },
  { dir: publicWritingDir, kind: "output", source: "Public Writing" },
  { dir: readingsDir, kind: "input", source: "WeRead" },
  { dir: questionsDir, kind: "question", source: "Knowledge Questions" }
];

function parseScalar(value) {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  if (/^-?\d+$/.test(value)) {
    return Number(value);
  }

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseFrontmatter(frontmatter) {
  const lines = frontmatter.split(/\r?\n/);
  const result = {};
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const topLevelMatch = line.match(/^([A-Za-z0-9_]+):(?:\s+(.*))?$/);
    if (!topLevelMatch) {
      index += 1;
      continue;
    }

    const key = topLevelMatch[1];
    const inlineValue = topLevelMatch[2];

    if (inlineValue && inlineValue.trim() !== "") {
      result[key] = parseScalar(inlineValue.trim());
      index += 1;
      continue;
    }

    index += 1;
    const childLines = [];

    while (index < lines.length) {
      const childRaw = lines[index];
      if (!childRaw.trim()) {
        index += 1;
        continue;
      }

      if (!childRaw.startsWith("  ")) {
        break;
      }

      childLines.push(childRaw);
      index += 1;
    }

    result[key] = parseBlock(childLines);
  }

  return result;
}

function parseBlock(lines) {
  if (!lines.length) {
    return null;
  }

  if (lines[0].trimStart().startsWith("- ")) {
    const hasObjectItems = lines.some((line) => {
      const trimmed = line.trimStart();
      return trimmed.startsWith("- ") && trimmed.slice(2).trim().includes(":");
    });

    if (!hasObjectItems) {
      return lines
        .filter((line) => line.trimStart().startsWith("- "))
        .map((line) => parseScalar(line.trimStart().slice(2).trim()));
    }

    const items = [];
    let current = null;

    lines.forEach((line) => {
      const trimmed = line.trimStart();

      if (trimmed.startsWith("- ")) {
        const content = trimmed.slice(2).trim();

        if (!content) {
          current = {};
          items.push(current);
          return;
        }

        if (content.includes(":")) {
          current = {};
          items.push(current);
          const splitIndex = content.indexOf(":");
          const itemKey = content.slice(0, splitIndex).trim();
          const itemValue = content.slice(splitIndex + 1).trim();
          current[itemKey] = parseScalar(itemValue);
          return;
        }

        items.push(parseScalar(content));
        current = null;
        return;
      }

      const splitIndex = trimmed.indexOf(":");
      if (current && splitIndex >= 0) {
        const itemKey = trimmed.slice(0, splitIndex).trim();
        const itemValue = trimmed.slice(splitIndex + 1).trim();
        current[itemKey] = parseScalar(itemValue);
      }
    });

    return items;
  }

  const object = {};
  lines.forEach((line) => {
    const trimmed = line.trimStart();
    const splitIndex = trimmed.indexOf(":");
    if (splitIndex < 0) {
      return;
    }

    const itemKey = trimmed.slice(0, splitIndex).trim();
    const itemValue = trimmed.slice(splitIndex + 1).trim();
    object[itemKey] = parseScalar(itemValue);
  });
  return object;
}

function extractSection(body, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = body.match(new RegExp(`## ${escaped}\\s+([\\s\\S]*?)(?:\\n## |\\s*$)`));
  return match ? match[1].trim().replace(/\n+/g, " ") : "";
}

function listMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .sort()
    .map((file) => path.join(dir, file));
}

function parseMarkdownNode(filePath, defaults) {
  const text = fs.readFileSync(filePath, "utf8");
  const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!frontmatterMatch) {
    throw new Error(`Missing frontmatter in ${filePath}`);
  }

  const frontmatter = parseFrontmatter(frontmatterMatch[1]);
  const body = frontmatterMatch[2];
  const kind = frontmatter.kind || defaults.kind;
  const summary =
    extractSection(body, "Summary") ||
    extractSection(body, "Input Signal") ||
    extractSection(body, "Core Question");
  const impact =
    extractSection(body, "Impact") ||
    extractSection(body, "How This Feeds My Work") ||
    extractSection(body, "Why This Question Matters");

  return {
    id: frontmatter.id,
    kind,
    source: frontmatter.source || defaults.source,
    shortTitle: frontmatter.short_title,
    title: frontmatter.title,
    year: frontmatter.year,
    venue: frontmatter.venue,
    type: frontmatter.type,
    status: frontmatter.status,
    authors: Array.isArray(frontmatter.authors) ? frontmatter.authors.join(", ") : "",
    summary,
    impact,
    themes: frontmatter.themes || [],
    methods: frontmatter.methods || [],
    links: frontmatter.links || [],
    connections: frontmatter.connections || [],
    repository: frontmatter.repository || null,
    metrics: frontmatter.metrics || {},
    role: frontmatter.role || null,
    metricLabel: frontmatter.metric_label || null,
    wikiPath: path.relative(repoRoot, filePath),
    position: frontmatter.position || { x: 100, y: 100 },
    color: frontmatter.color || "#157bc0",
    radius: frontmatter.radius || 34
  };
}

function normalizeTitle(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "");
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function shortTitle(value) {
  const clean = String(value || "").replace(/\s+/g, " ").trim();
  const colon = clean.split(":")[0];
  return (colon.length <= 42 ? colon : clean.slice(0, 42)).replace(/\s+$/, "");
}

function inferScholarThemes(article) {
  const text = [article.title, article.venue].join(" ").toLowerCase();
  const themes = new Set();

  if (/disaster|damage|wildfire|flood|resilience|hurricane/.test(text)) {
    themes.add("Disaster Assessment");
  }

  if (/geo|spatial|earth|urban|satellite|street|campus|freight|mobility|location/.test(text)) {
    themes.add("Spatial Intelligence");
  }

  if (/vision|language|multimodal|transformer|clip|model|llm|ai|artificial/.test(text)) {
    themes.add("Multimodal Learning");
  }

  if (/digital twin|twins|simulation/.test(text)) {
    themes.add("Urban Digital Twins");
  }

  if (/covid|healthcare|hospital|public opinion|emotion/.test(text)) {
    themes.add("Public Health AI");
  }

  if (/sustainable|sdg|attitudinal|alignment/.test(text)) {
    themes.add("AI Alignment");
  }

  if (!themes.size) {
    themes.add("Scholar Output");
  }

  return Array.from(themes);
}

function inferScholarConnections(article, existingIds) {
  const text = article.title.toLowerCase();
  const candidates = [];

  if (/geolocator|geo-privacy|location/.test(text)) {
    candidates.push(["geolocator", "is part of the public geo-privacy output lineage"]);
  }
  if (/hyperlocal|damage|disaster|wildfire|flood|hurricane|resilience/.test(text)) {
    candidates.push(["damagearbiter", "feeds the disaster intelligence output layer"]);
  }
  if (/street|satellite|generative/.test(text)) {
    candidates.push(["satellite-to-street", "shares the satellite-to-street geographic evidence thread"]);
  }
  if (/urban|digital twin|mobility|freight|campus/.test(text)) {
    candidates.push(["spatial-intelligence-public-infrastructure", "extends the urban and spatial intelligence question"]);
  }
  if (/covid|healthcare|public opinion|emotion/.test(text)) {
    candidates.push(["human-evidence-disaster-ai", "connects public signals with accountable AI evidence"]);
  }

  return candidates
    .filter(([target]) => existingIds.has(target))
    .slice(0, 2)
    .map(([target, label]) => ({ target, label }));
}

function buildScholarNodes(existingNodes) {
  if (!fs.existsSync(scholarPath)) {
    return [];
  }

  const scholar = JSON.parse(fs.readFileSync(scholarPath, "utf8"));
  const articles = Array.isArray(scholar.articles) ? scholar.articles : [];
  const existingTitles = new Set(existingNodes.map((node) => normalizeTitle(node.title)));
  const existingShortTitles = existingNodes
    .map((node) => normalizeTitle(node.shortTitle))
    .filter((value) => value.length >= 8);
  const existingIds = new Set(existingNodes.map((node) => node.id));

  return articles
    .filter((article) => {
      const normalized = normalizeTitle(article.title);
      if (existingTitles.has(normalized)) {
        return false;
      }
      return !existingShortTitles.some((title) => normalized.includes(title));
    })
    .map((article, index) => {
      const themes = inferScholarThemes(article);
      const id = `scholar-${slugify(article.title) || index + 1}`;
      // A seed, not a final position. This used to be a hardcoded 52-unit
      // column pitch while radius grows with citations (up to 44), so any
      // well-cited neighbour was guaranteed to overlap -- a bug that got worse
      // every time a paper picked up citations. Seed them in a single column
      // off to the side and let relaxPositions place them for real.
      const x = 860;
      const y = 120 + index * 150;
      const citations = Number(article.citations || 0);

      return {
        id,
        kind: "output",
        source: "Google Scholar",
        shortTitle: shortTitle(article.title),
        title: article.title,
        year: article.year || "n.d.",
        venue: article.venue || "Google Scholar",
        type: "Scholar Output",
        status: "Indexed",
        authors: article.authors || "",
        summary: "A Google Scholar-indexed research output from Yifan Yang's public profile. It keeps collaborative and non-first-author work visible in the same output layer as the curated paper pages.",
        impact: "This node prevents the atlas from becoming only a first-author publication list. It treats collaborative scholarship as part of the public output trail.",
        themes,
        methods: themes,
        links: [
          {
            label: "Scholar Profile",
            url: scholar.profileUrl || "https://scholar.google.com/citations?user=B-fiSHwAAAAJ"
          }
        ],
        connections: inferScholarConnections(article, existingIds),
        repository: null,
        metrics: { citations },
        role: article.authors && article.authors.trim().startsWith("Y Yang") ? "first-author or lead-position output" : "collaborative output",
        metricLabel: `${citations} citations`,
        wikiPath: null,
        position: { x, y },
        color: "#64c7ff",
        radius: Math.max(24, Math.min(44, 24 + Math.sqrt(citations) * 2.4))
      };
    });
}

function enrichNode(node) {
  const metricLabel = node.metricLabel ||
    (node.kind === "input" && node.metrics?.note_count ? `${node.metrics.note_count} notes` : null) ||
    (node.kind === "output" && node.metrics?.citations !== undefined ? `${node.metrics.citations} citations` : null) ||
    (node.repository ? `${node.repository.commits} commits` : null) ||
    node.source;

  return {
    ...node,
    metricLabel,
    // The full title stays on the node for the detail panel; only the drawn
    // label is trimmed, so nothing is lost, it just stops printing through
    // its neighbour. See label-box.js for the 172-unit budget.
    shortTitle: truncateLabel(node.shortTitle),
    displayKind:
      node.kind === "input" ? "Reading Input" :
      node.kind === "question" ? "Bridge Question" :
      "Research Output"
  };
}

// Authored positions in wiki/ are seeds: they say which quadrant a node
// belongs to and what it clusters with, which is real information worth
// keeping. What they cannot do is stay collision-free as the graph grows --
// at 46 nodes the authored map had 143 overlapping label boxes, and no human
// is going to solve a 46-body packing problem by hand in YAML.
//
// So: push overlapping pairs apart, keep pulling everything back toward its
// seed, and let the two forces settle. Deterministic (fixed order, no
// randomness) so the same wiki always builds the same map.
function relaxPositions(nodes) {
  const placeable = nodes.filter((node) => node.position && Number.isFinite(node.radius));
  const seeds = new Map(placeable.map((node) => [node.id, { ...node.position }]));
  const ordered = [...placeable].sort((left, right) => (left.id < right.id ? -1 : 1));
  const PAD = 18;          // air beyond "just touching", so labels are not kissing
  const SEED_PULL = 0.012; // gentle enough that separation wins locally
  const SETTLE = 900;

  const separate = (pullToSeed) => {
    let moved = 0;

    for (let i = 0; i < ordered.length; i += 1) {
      for (let j = i + 1; j < ordered.length; j += 1) {
        const a = ordered[i];
        const b = ordered[j];
        const gap = overlap(a, b);

        // overlap() reports intrusion: positive means the boxes bite into each
        // other, negative means clear air. A pair is done once it has at least
        // PAD of air on one axis, so the test is <= -PAD, not <= PAD. Using
        // +PAD here would declare a 12-unit overlap acceptable while the
        // verifier demands zero, and the two would never agree.
        if (gap.x <= -PAD || gap.y <= -PAD) {
          continue;
        }

        // Resolve along whichever axis needs the least travel.
        const pushX = gap.x + PAD;
        const pushY = gap.y + PAD;
        const axis = pushX <= pushY ? "x" : "y";
        const distance = (axis === "x" ? pushX : pushY) / 2;
        const direction = a.position[axis] <= b.position[axis] ? -1 : 1;

        a.position[axis] += direction * distance;
        b.position[axis] -= direction * distance;
        moved += distance * 2;
      }
    }

    if (pullToSeed) {
      ordered.forEach((node) => {
        const seed = seeds.get(node.id);
        node.position.x += (seed.x - node.position.x) * SEED_PULL;
        node.position.y += (seed.y - node.position.y) * SEED_PULL;
      });
    }

    return moved;
  };

  // Phase one: settle with the seed spring, so clusters stay put.
  for (let step = 0; step < SETTLE; step += 1) {
    if (separate(true) === 0) {
      break;
    }
  }

  // Phase two: drop the spring and finish the job. The spring can hold a pair
  // just inside the overlap threshold forever, and a build that still ships
  // overlaps is the bug we are fixing.
  for (let step = 0; step < SETTLE; step += 1) {
    if (separate(false) === 0) {
      break;
    }
  }

  // Snap to whole units and shift back to a positive origin, so committed
  // coordinates stay readable in diffs and comparable to authored seeds.
  const minX = Math.min(...placeable.map((node) => node.position.x - halfWidth(node)));
  const minY = Math.min(...placeable.map((node) => node.position.y - halfHeight(node)));

  placeable.forEach((node) => {
    node.position.x = Math.round(node.position.x - minX + 40);
    node.position.y = Math.round(node.position.y - minY + 40);
  });

  return nodes;
}

function buildData() {
  const markdownNodes = graphSources.flatMap((source) => {
    return listMarkdownFiles(source.dir).map((filePath) => parseMarkdownNode(filePath, source));
  });
  const scholarNodes = buildScholarNodes(markdownNodes);
  // Truncate labels before relaxing: the label width sets the footprint the
  // layout has to pack, so trimming first is what keeps the map compact.
  const nodes = relaxPositions(markdownNodes.concat(scholarNodes).map(enrichNode));
  const themes = Array.from(
    new Set(
      nodes.flatMap((node) => node.themes)
    )
  ).sort();
  const sources = Array.from(new Set(nodes.map((node) => node.source))).sort();
  const counts = nodes.reduce((result, node) => {
    result[node.kind] = (result[node.kind] || 0) + 1;
    return result;
  }, {});

  const payload = {
    generatedAt: new Date().toISOString(),
    themes: ["All"].concat(themes),
    sources,
    counts,
    nodes
  };

  const output = `window.researchMapData = ${JSON.stringify(payload, null, 2)};\n`;
  fs.writeFileSync(outputPath, output, "utf8");
}

buildData();
