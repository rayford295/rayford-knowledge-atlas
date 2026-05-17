const fs = require("fs");
const https = require("https");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const outputDir = path.join(repoRoot, "raw", "weread");
const readingsDir = path.join(repoRoot, "wiki", "readings");
const publicIndexPath = path.join(outputDir, "public-reading-index.json");
const gatewayUrl = "https://i.weread.qq.com/api/agent/gateway";
const skillVersion = "1.0.3";

function gateway(payload) {
  const key = process.env.WEREAD_API_KEY;
  if (!key) {
    throw new Error("WEREAD_API_KEY is not set");
  }

  const body = JSON.stringify({ ...payload, skill_version: skillVersion });

  return new Promise((resolve, reject) => {
    const request = https.request(
      gatewayUrl,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body)
        }
      },
      (response) => {
        let text = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          text += chunk;
        });
        response.on("end", () => {
          let json;
          try {
            json = JSON.parse(text);
          } catch (error) {
            reject(new Error(`WeRead returned non-JSON response: ${text.slice(0, 120)}`));
            return;
          }

          if (json.upgrade_info) {
            reject(new Error(`WeRead skill requires upgrade: ${json.upgrade_info.message || "no message"}`));
            return;
          }

          if (response.statusCode < 200 || response.statusCode >= 300 || json.errcode) {
            reject(new Error(`WeRead API error ${response.statusCode}: ${json.errmsg || json.errcode}`));
            return;
          }

          resolve(json);
        });
      }
    );

    request.setTimeout(20000, () => {
      request.destroy(new Error("WeRead request timed out"));
    });
    request.on("error", reject);
    request.write(body);
    request.end();
  });
}

async function fetchAllNotebooks() {
  const books = [];
  let lastSort = null;

  for (let page = 0; page < 20; page += 1) {
    const payload = { api_name: "/user/notebooks", count: 100 };
    if (lastSort !== null) {
      payload.lastSort = lastSort;
    }

    const data = await gateway(payload);
    const pageBooks = data.books || [];
    books.push(...pageBooks);

    if (!data.hasMore || !pageBooks.length) {
      return {
        totalBookCount: data.totalBookCount,
        totalNoteCount: data.totalNoteCount,
        books
      };
    }

    lastSort = pageBooks[pageBooks.length - 1].sort;
  }

  return { totalBookCount: books.length, totalNoteCount: null, books };
}

function secondsToText(seconds) {
  const value = Number(seconds || 0);
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

function sanitizeScalar(value) {
  return String(value || "")
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function frontmatterValue(value) {
  return sanitizeScalar(value).replace(/"/g, '\\"');
}

function inferReadingThemes(reading) {
  const text = [reading.title, reading.author].join(" ");
  const themes = new Set(["Reading Input"]);

  if (/AI|人工智能|2049|未来|哈萨比斯|谷歌AI|生成式/.test(text)) {
    themes.add("AI Futures");
    themes.add("Human-AI Judgment");
  }

  if (/团长|战争|军旅|1984|美丽新世界|白色巨塔|组织|权力/.test(text)) {
    themes.add("Institutions Under Stress");
    themes.add("Evidence and Power");
  }

  if (/传|自传|李小龙|成龙|李嘉诚|文在寅|朴槿惠|蒂尔|哈萨比斯|施一公/.test(text)) {
    themes.add("Biography and Judgment");
  }

  if (/投资|商业|创业|工作4小时|段永平|李嘉诚|蒂尔|马斯克/.test(text)) {
    themes.add("Founder Judgment");
  }

  if (/笑场|冷场|十三邀|文学|小说|散文|白痴/.test(text)) {
    themes.add("Narrative and Public Voice");
  }

  return Array.from(themes);
}

function inferConnections(themes) {
  const connections = new Map();
  const add = (target, label) => connections.set(target, { target, label });

  if (themes.includes("AI Futures") || themes.includes("Human-AI Judgment")) {
    add("ai-systems-human-judgment", "feeds the question of how AI systems should support human judgment");
    add("geolocator", "sharpens the public stakes of spatial AI and inference");
  }

  if (themes.includes("Institutions Under Stress") || themes.includes("Evidence and Power")) {
    add("human-evidence-disaster-ai", "keeps technical evidence tied to human institutions under pressure");
    add("damagearbiter", "adds a social and institutional reading layer to disaster assessment");
  }

  if (themes.includes("Biography and Judgment")) {
    add("biography-research-judgment", "turns life histories into research judgment training data");
  }

  if (themes.includes("Founder Judgment")) {
    add("founder-window-research-output", "connects founder judgment with research-to-product translation");
  }

  if (connections.size === 0) {
    add("human-evidence-disaster-ai", "keeps the reading input connected to the output graph");
  }

  return Array.from(connections.values()).slice(0, 4);
}

function readingColor(themes, index) {
  if (themes.includes("AI Futures")) {
    return "#a88cff";
  }
  if (themes.includes("Institutions Under Stress")) {
    return "#ff6e4d";
  }
  if (themes.includes("Founder Judgment")) {
    return "#ffd46a";
  }
  if (themes.includes("Biography and Judgment")) {
    return "#9ad66d";
  }
  return ["#36f1c7", "#64c7ff", "#f08bd6"][index % 3];
}

function readingPosition(index) {
  const columns = [
    { x: 120, y: 115 },
    { x: 230, y: 210 },
    { x: 130, y: 330 },
    { x: 255, y: 455 }
  ];
  const base = columns[index % columns.length];
  return {
    x: base.x + Math.floor(index / columns.length) * 72,
    y: base.y + (Math.floor(index / columns.length) % 2) * 18
  };
}

function markdownForReading(reading, index) {
  const themes = inferReadingThemes(reading);
  const connections = inferConnections(themes);
  const color = readingColor(themes, index);
  const position = readingPosition(index);
  const status = reading.readingProgress >= 100 ? "Read" : "Reading";
  const radius = Math.max(28, Math.min(52, 28 + Math.sqrt(reading.totalNoteCount || 1) * 0.55));
  const thoughtWord = reading.reviewCount === 1 ? "thought or review" : "thoughts or reviews";

  return `---
id: reading-${reading.bookId}
short_title: "${frontmatterValue(reading.shortTitle)}"
title: "${frontmatterValue(reading.title)}"
year: 2026
venue: WeRead
type: Reading Input
status: ${status}
kind: input
source: WeRead
authors:
  - "${frontmatterValue(reading.author || "Unknown")}"
themes:
${themes.map((theme) => `  - ${theme}`).join("\n")}
methods:
  - Close Reading
  - Note Synthesis
  - Cross-Source Interpretation
links:
  - label: Open in WeRead
    url: weread://reading?bId=${reading.bookId}
connections:
${connections.map((connection) => `  - target: ${connection.target}\n    label: ${connection.label}`).join("\n")}
metrics:
  note_count: ${reading.totalNoteCount}
  underline_count: ${reading.lineCount}
  bookmark_count: ${reading.bookmarkCount}
  thought_count: ${reading.reviewCount}
  reading_progress: ${reading.readingProgress}
metric_label: "${reading.totalNoteCount} notes"
position:
  x: ${position.x}
  y: ${position.y}
color: "${color}"
radius: ${Math.round(radius)}
---

## Summary

This reading node records a high-signal WeRead book from Yifan Yang's reading system. It keeps the book visible as an input to research taste, founder judgment, public writing, and GeoAI system design without publishing raw copyrighted highlights.

## Input Signal

The public-safe signal is metadata-level: ${reading.totalNoteCount} total notes, including ${reading.lineCount} underlines, ${reading.bookmarkCount} bookmarks, and ${reading.reviewCount} ${thoughtWord}. The reading progress is ${reading.readingProgress}%.

## How This Feeds My Work

This book belongs in the input layer because it helps explain the intellectual pressure behind the output layer. It can feed research framing, public writing, founder narrative, and the long questions that connect technical GeoAI work with human judgment.

## Privacy and Copyright Boundary

Raw highlights and private notes stay outside the public repository. This page publishes only bibliographic metadata, note counts, themes, and Yifan's own synthesis scaffold.
`;
}

function toReadingRecord(item) {
  const book = item.book || {};
  const title = sanitizeScalar(book.title || item.title || "Untitled");
  const author = sanitizeScalar(book.author || item.author || "");
  const totalNoteCount = Number(item.reviewCount || 0) + Number(item.noteCount || 0) + Number(item.bookmarkCount || 0);

  return {
    bookId: String(item.bookId || book.bookId || ""),
    title,
    shortTitle: title.length > 18 ? `${title.slice(0, 18)}...` : title,
    author,
    readingProgress: Number(item.readingProgress || 0),
    markedStatus: Number(item.markedStatus || 0),
    reviewCount: Number(item.reviewCount || 0),
    lineCount: Number(item.noteCount || 0),
    bookmarkCount: Number(item.bookmarkCount || 0),
    totalNoteCount
  };
}

async function main() {
  const [notebooks, shelf, annual] = await Promise.all([
    fetchAllNotebooks(),
    gateway({ api_name: "/shelf/sync" }),
    gateway({ api_name: "/readdata/detail", mode: "annually" })
  ]);

  const readings = notebooks.books
    .map(toReadingRecord)
    .filter((reading) => reading.bookId && reading.totalNoteCount > 0)
    .sort((a, b) => b.totalNoteCount - a.totalNoteCount);

  const publicReadings = readings.slice(0, 12);
  const publicIndex = {
    source: "WeRead public-safe reading index",
    generatedAt: new Date().toISOString(),
    privacy: "No raw highlights or private note text are committed. This file keeps metadata, counts, themes, and graph links only.",
    totals: {
      notebookBookCount: notebooks.totalBookCount || readings.length,
      notebookNoteCount: notebooks.totalNoteCount || readings.reduce((sum, item) => sum + item.totalNoteCount, 0),
      shelfVisibleCount: (shelf.books || []).length + (shelf.albums || []).length + (shelf.mp ? 1 : 0),
      shelfBookCount: (shelf.books || []).length,
      shelfAlbumCount: (shelf.albums || []).length,
      yearlyReadDays: annual.readDays || 0,
      yearlyReadTime: secondsToText(annual.totalReadTime)
    },
    readings: publicReadings
  };

  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(readingsDir, { recursive: true });
  fs.writeFileSync(publicIndexPath, JSON.stringify(publicIndex, null, 2) + "\n", "utf8");

  publicReadings.forEach((reading, index) => {
    const filePath = path.join(readingsDir, `${index + 1}-${reading.bookId}.md`);
    fs.writeFileSync(filePath, markdownForReading(reading, index), "utf8");
  });

  console.log(`Wrote ${publicReadings.length} public-safe reading nodes`);
  console.log(`Notebook books: ${publicIndex.totals.notebookBookCount}; notes: ${publicIndex.totals.notebookNoteCount}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
