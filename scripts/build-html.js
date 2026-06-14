const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const repoRoot = path.resolve(__dirname, "..");

// Canonical top-level page links shared across every main page. These are the
// part of the nav that was previously hand-copied into each HTML file. Adding
// or renaming a top-level page now means editing this list once.
const CORE_LINKS = [
  { key: "index", href: "./index.html", label: "Atlas" },
  { key: "readings", href: "./readings.html", label: "Readings" },
  { key: "advisor", href: "./advisor.html", label: "Advisor" },
  { key: "papers", href: "./papers.html", label: "Papers" },
  { key: "rooms", href: "./rooms.html", label: "Rooms" },
  { key: "map", href: "./map/", label: "Map" }
];

// Pages that carry <!-- NAV:START --> / <!-- NAV:END --> markers. Page-specific
// tail links (e.g. "Reading Vault", "Return to Graph") live outside the markers
// and are intentionally left untouched.
const NAV_FILES = ["index.html", "readings.html", "advisor.html", "papers.html", "rooms.html"];

// Every HTML file gets a single unified cache-bust stamp so a stylesheet or
// script change can never be served stale on one page while fresh on another.
const HTML_FILES = NAV_FILES.concat(["fork.html"]);

const NAV_START = "<!-- NAV:START -->";
const NAV_END = "<!-- NAV:END -->";

function pageKey(file) {
  return path.basename(file, ".html");
}

function renderNav(currentKey) {
  return CORE_LINKS.map((link) => {
    const current = link.key === currentKey ? ' aria-current="page"' : "";
    return `        <a href="${link.href}"${current}>${link.label}</a>`;
  }).join("\n");
}

// Stamp = short hash of the assets the pages load. data.js carries a
// non-deterministic generatedAt timestamp, so we strip it before hashing;
// otherwise the stamp would churn on every build and defeat browser caching.
function computeStamp() {
  const hash = crypto.createHash("sha256");
  ["styles.css", "script.js"].forEach((name) => {
    const assetPath = path.join(repoRoot, name);
    if (fs.existsSync(assetPath)) {
      hash.update(fs.readFileSync(assetPath));
    }
  });

  const dataPath = path.join(repoRoot, "data.js");
  if (fs.existsSync(dataPath)) {
    const dataText = fs.readFileSync(dataPath, "utf8").replace(/"generatedAt":\s*"[^"]*",?\n?/, "");
    hash.update(dataText);
  }

  return hash.digest("hex").slice(0, 10);
}

function injectNav(content, currentKey) {
  const startIdx = content.indexOf(NAV_START);
  const endIdx = content.indexOf(NAV_END);
  if (startIdx === -1 || endIdx === -1) {
    return content;
  }

  const before = content.slice(0, startIdx + NAV_START.length);
  const after = content.slice(endIdx);
  return `${before}\n${renderNav(currentKey)}\n        ${after}`;
}

function stampVersions(content, stamp) {
  return content.replace(/\?v=[0-9a-zA-Z]+/g, `?v=${stamp}`);
}

function main() {
  const stamp = computeStamp();
  let navUpdated = 0;
  let stampUpdated = 0;

  HTML_FILES.forEach((file) => {
    const filePath = path.join(repoRoot, file);
    if (!fs.existsSync(filePath)) {
      return;
    }

    const original = fs.readFileSync(filePath, "utf8");
    let content = original;

    if (NAV_FILES.includes(file)) {
      const injected = injectNav(content, pageKey(file));
      if (injected !== content) {
        navUpdated += 1;
      }
      content = injected;
    }

    const stamped = stampVersions(content, stamp);
    if (stamped !== content) {
      stampUpdated += 1;
    }
    content = stamped;

    if (content !== original) {
      fs.writeFileSync(filePath, content, "utf8");
    }
  });

  console.log(
    `build-html: stamp=${stamp}, nav rebuilt in ${navUpdated} file(s), version stamped in ${stampUpdated} file(s)`
  );
}

main();
