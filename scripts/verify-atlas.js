const fs = require("fs");
const path = require("path");
const { overlaps, overlap, halfWidth } = require("./label-box");

const repoRoot = path.resolve(__dirname, "..");
const dataPath = path.join(repoRoot, "data.js");
const wikiRoot = path.join(repoRoot, "wiki");

function fail(message, details = []) {
  console.error(`FAIL: ${message}`);
  details.forEach((detail) => console.error(`  - ${detail}`));
}

function readAtlasData() {
  const text = fs.readFileSync(dataPath, "utf8")
    .replace(/^window\.researchMapData = /, "")
    .replace(/;\s*$/, "");

  return JSON.parse(text);
}

function listMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => path.join(dir, file));
}

function verifyFrontmatterPresence(files) {
  const missing = files.filter((file) => {
    const text = fs.readFileSync(file, "utf8");
    return !text.startsWith("---\n");
  });

  return missing.map((file) => path.relative(repoRoot, file));
}

function verifyData(data) {
  const errors = [];
  const warnings = [];
  const nodes = Array.isArray(data.nodes) ? data.nodes : [];
  const ids = nodes.map((node) => node.id);
  const idSet = new Set(ids);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

  if (!nodes.length) {
    errors.push("data.js contains zero nodes");
  }

  if (duplicates.length) {
    errors.push(`duplicate node ids: ${Array.from(new Set(duplicates)).join(", ")}`);
  }

  const validKinds = new Set(["input", "question", "output"]);

  nodes.forEach((node) => {
    const label = `${node.id || "<missing-id>"} (${node.title || "untitled"})`;

    if (!node.id) {
      errors.push(`missing id on node ${label}`);
    }

    if (!validKinds.has(node.kind)) {
      errors.push(`invalid kind on ${label}: ${node.kind}`);
    }

    if (!node.title) {
      errors.push(`missing title on ${label}`);
    }

    if (!node.shortTitle) {
      errors.push(`missing shortTitle on ${label}`);
    }

    if (!node.year) {
      errors.push(`missing year on ${label}`);
    }

    if (!Array.isArray(node.themes) || !node.themes.length) {
      warnings.push(`node has no themes: ${label}`);
    }

    // Coordinates in data.js are relaxation output, not the authored seeds, so
    // there is no fixed canvas to bound them against -- the canvas is whatever
    // size 46 collision-free label boxes need. The size is reported in the
    // summary instead, where a sudden jump is visible.
    const position = node.position || {};
    if (!Number.isFinite(position.x) || !Number.isFinite(position.y)) {
      errors.push(`missing or non-numeric position on ${label}`);
    }

    if (!Array.isArray(node.connections)) {
      errors.push(`connections must be an array on ${label}`);
      return;
    }

    node.connections.forEach((connection) => {
      if (!connection.target) {
        errors.push(`connection missing target on ${label}`);
        return;
      }

      if (!idSet.has(connection.target)) {
        errors.push(`broken connection ${node.id} -> ${connection.target}`);
      }
    });

    if (node.kind === "question") {
      const targetKinds = new Set(
        node.connections
          .map((connection) => nodes.find((candidate) => candidate.id === connection.target))
          .filter(Boolean)
          .map((candidate) => candidate.kind)
      );

      if (!targetKinds.has("input")) {
        warnings.push(`question has no input-side connection: ${label}`);
      }

      if (!targetKinds.has("output")) {
        warnings.push(`question has no output-side connection: ${label}`);
      }
    }
  });

  // A node's drawn footprint is its label box, not its circle -- see
  // label-box.js. Two nodes whose boxes intersect print text through each
  // other, which is the failure mode that made the graph unreadable, so this
  // is an error rather than a warning: it must not be able to come back.
  const collisions = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      if (!a.position || !b.position || !Number.isFinite(a.radius) || !Number.isFinite(b.radius)) {
        continue;
      }
      if (overlaps(a, b)) {
        const gap = overlap(a, b);
        collisions.push({
          pair: `${a.shortTitle || a.id} <-> ${b.shortTitle || b.id}`,
          bite: Math.round(Math.min(gap.x, gap.y))
        });
      }
    }
  }

  if (collisions.length) {
    collisions.sort((left, right) => right.bite - left.bite);
    errors.push(`${collisions.length} node label boxes overlap`);
    collisions.slice(0, 8).forEach((collision) => {
      errors.push(`  overlapping by ${collision.bite}: ${collision.pair}`);
    });
  }

  // Labels wider than the renderer's own reservation get clipped out of the
  // fitted viewBox (script.js uses labelHalf = 86).
  nodes.forEach((node) => {
    if (!Number.isFinite(node.radius)) {
      return;
    }
    const over = Math.round(halfWidth(node) - Math.max(node.radius, 86));
    if (over > 0) {
      warnings.push(`label wider than the 86-unit reservation by ${over}: ${node.shortTitle}`);
    }
  });

  const counted = nodes.reduce((accumulator, node) => {
    accumulator[node.kind] = (accumulator[node.kind] || 0) + 1;
    return accumulator;
  }, {});

  ["input", "question", "output"].forEach((kind) => {
    const declared = data.counts?.[kind] || 0;
    const actual = counted[kind] || 0;
    if (declared !== actual) {
      errors.push(`count mismatch for ${kind}: data.counts says ${declared}, actual nodes ${actual}`);
    }
  });

  const placed = nodes.filter((node) => Number.isFinite(node.position?.x));
  const canvas = placed.length
    ? {
        width: Math.round(Math.max(...placed.map((n) => n.position.x)) - Math.min(...placed.map((n) => n.position.x))),
        height: Math.round(Math.max(...placed.map((n) => n.position.y)) - Math.min(...placed.map((n) => n.position.y)))
      }
    : null;

  return { errors, warnings, nodeCount: nodes.length, counted, canvas, labelCollisions: collisions.length };
}

function main() {
  const data = readAtlasData();
  const markdownFiles = [
    ...listMarkdownFiles(path.join(wikiRoot, "papers")),
    ...listMarkdownFiles(path.join(wikiRoot, "public-writing")),
    ...listMarkdownFiles(path.join(wikiRoot, "readings")),
    ...listMarkdownFiles(path.join(wikiRoot, "questions"))
  ];

  const missingFrontmatter = verifyFrontmatterPresence(markdownFiles);
  const { errors, warnings, nodeCount, counted, canvas, labelCollisions } = verifyData(data);

  if (missingFrontmatter.length) {
    errors.push(`missing frontmatter in: ${missingFrontmatter.join(", ")}`);
  }

  console.log("Atlas verification summary");
  console.log(JSON.stringify({ nodeCount, counted, markdownFiles: markdownFiles.length, canvas, labelCollisions }, null, 2));

  if (warnings.length) {
    console.warn("Warnings:");
    warnings.forEach((warning) => console.warn(`- ${warning}`));
  }

  if (errors.length) {
    fail("Atlas verification failed", errors);
    process.exit(1);
  }

  console.log("PASS: atlas structure looks consistent");
}

main();
