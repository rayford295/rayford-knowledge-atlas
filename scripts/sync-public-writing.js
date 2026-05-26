const fs = require("fs/promises");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const sources = [
  {
    label: "Research Philosophy",
    url: "https://raw.githubusercontent.com/rayford295/awesome-autonomous-geoai/main/RESEARCH_PHILOSOPHY.md",
    output: path.join(repoRoot, "raw", "public-writing", "RESEARCH_PHILOSOPHY.md")
  },
  {
    label: "Research Philosophy Summary (ZH)",
    url: "https://raw.githubusercontent.com/rayford295/awesome-autonomous-geoai/main/RESEARCH_PHILOSOPHY_SUMMARY_ZH.md",
    output: path.join(repoRoot, "raw", "public-writing", "RESEARCH_PHILOSOPHY_SUMMARY_ZH.md")
  }
];

async function fetchText(source) {
  const response = await fetch(source.url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${source.label}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function main() {
  await fs.mkdir(path.join(repoRoot, "raw", "public-writing"), { recursive: true });

  for (const source of sources) {
    const text = await fetchText(source);
    await fs.writeFile(source.output, text, "utf8");
    console.log(`Synced ${source.label} -> ${path.relative(repoRoot, source.output)} (${text.length} chars)`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
