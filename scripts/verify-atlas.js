const fs = require("fs");
const path = require("path");

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

  return { errors, warnings, nodeCount: nodes.length, counted };
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
  const { errors, warnings, nodeCount, counted } = verifyData(data);

  if (missingFrontmatter.length) {
    errors.push(`missing frontmatter in: ${missingFrontmatter.join(", ")}`);
  }

  console.log("Atlas verification summary");
  console.log(JSON.stringify({ nodeCount, counted, markdownFiles: markdownFiles.length }, null, 2));

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
