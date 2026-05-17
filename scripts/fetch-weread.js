const fs = require("fs");
const https = require("https");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const outputDir = path.join(repoRoot, "raw", "weread");
const readingsDir = path.join(repoRoot, "wiki", "readings");
const publicIndexPath = path.join(outputDir, "public-reading-index.json");
const intelligencePath = path.join(outputDir, "reading-intelligence.json");
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

function timestampToDate(timestamp) {
  const value = Number(timestamp || 0);
  if (!value) {
    return null;
  }

  return new Date(value * 1000).toISOString().slice(0, 10);
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

function themeRoute(theme) {
  const routes = {
    "AI Futures": {
      question: "ai-systems-human-judgment",
      label: "AI systems and human judgment",
      move: "Use the path workflow to turn AI biography and future-risk reading into a research agenda."
    },
    "Human-AI Judgment": {
      question: "ai-systems-human-judgment",
      label: "AI systems and human judgment",
      move: "Use the alchemy workflow to extract judgment principles from the marked AI books."
    },
    "Institutions Under Stress": {
      question: "human-evidence-disaster-ai",
      label: "Evidence under institutional pressure",
      move: "Connect the institutional novels and histories to disaster-evidence papers."
    },
    "Evidence and Power": {
      question: "human-evidence-disaster-ai",
      label: "Evidence under institutional pressure",
      move: "Ask how evidence changes when organizations, incentives, and power distort it."
    },
    "Biography and Judgment": {
      question: "biography-research-judgment",
      label: "Biography as judgment training",
      move: "Turn biography notes into a reusable taste and timing map."
    },
    "Founder Judgment": {
      question: "founder-window-research-output",
      label: "Founder judgment and timing",
      move: "Convert founder reading into research-to-product questions."
    },
    "Narrative and Public Voice": {
      question: "biography-research-judgment",
      label: "Public voice and lived judgment",
      move: "Use the review workflow to turn narrative reading into public writing."
    }
  };

  return routes[theme] || null;
}

function toShelfRecord(item) {
  return {
    bookId: String(item.bookId || ""),
    title: sanitizeScalar(item.title || "Untitled"),
    author: sanitizeScalar(item.author || ""),
    category: sanitizeScalar(item.category || ""),
    finishReading: Boolean(item.finishReading),
    readUpdateTime: Number(item.readUpdateTime || item.updateTime || 0),
    readUpdateDate: timestampToDate(item.readUpdateTime || item.updateTime)
  };
}

function compactReading(reading, extra = {}) {
  return {
    bookId: reading.bookId,
    title: reading.title,
    shortTitle: reading.shortTitle,
    author: reading.author,
    readingProgress: reading.readingProgress,
    totalNoteCount: reading.totalNoteCount,
    underlineCount: reading.lineCount,
    bookmarkCount: reading.bookmarkCount,
    thoughtCount: reading.reviewCount,
    lastActiveDate: timestampToDate(reading.lastReadTime),
    wereadUrl: `weread://reading?bId=${reading.bookId}`,
    ...extra
  };
}

function publicReadingRecord(reading) {
  const { lastReadTime, ...record } = reading;
  if (lastReadTime) {
    record.lastReadDate = timestampToDate(lastReadTime);
  }
  return record;
}

function buildReadingIntelligence({ readings, shelf, annual, notebooks }) {
  const shelfBooks = (shelf.books || []).map(toShelfRecord).filter((book) => book.bookId);
  const shelfById = new Map(shelfBooks.map((book) => [book.bookId, book]));
  const notebookById = new Map(readings.map((reading) => [reading.bookId, reading]));
  const deepReads = readings
    .filter((reading) => reading.totalNoteCount >= 20)
    .sort((a, b) => b.totalNoteCount - a.totalNoteCount);
  const trueReads = readings.filter((reading) => shelfById.has(reading.bookId) && reading.totalNoteCount >= 5);
  const hiddenDeepReads = readings
    .filter((reading) => !shelfById.has(reading.bookId) && reading.totalNoteCount >= 10)
    .sort((a, b) => b.totalNoteCount - a.totalNoteCount);
  const shelfOnly = shelfBooks
    .filter((book) => !notebookById.has(book.bookId))
    .sort((a, b) => b.readUpdateTime - a.readUpdateTime);

  const activeMap = new Map();
  shelfBooks.forEach((book) => {
    activeMap.set(book.bookId, {
      bookId: book.bookId,
      title: book.title,
      author: book.author,
      readingProgress: book.finishReading ? 100 : null,
      totalNoteCount: notebookById.get(book.bookId)?.totalNoteCount || 0,
      lastActiveTime: book.readUpdateTime,
      lastActiveDate: book.readUpdateDate,
      inShelf: true,
      hasNotes: notebookById.has(book.bookId),
      wereadUrl: `weread://reading?bId=${book.bookId}`
    });
  });
  readings.forEach((reading) => {
    const existing = activeMap.get(reading.bookId);
    const lastActiveTime = Math.max(existing?.lastActiveTime || 0, reading.lastReadTime || 0);
    activeMap.set(reading.bookId, {
      bookId: reading.bookId,
      title: reading.title,
      author: reading.author,
      readingProgress: reading.readingProgress,
      totalNoteCount: reading.totalNoteCount,
      lastActiveTime,
      lastActiveDate: timestampToDate(lastActiveTime),
      inShelf: shelfById.has(reading.bookId),
      hasNotes: true,
      wereadUrl: `weread://reading?bId=${reading.bookId}`
    });
  });

  const activeNow = Array.from(activeMap.values())
    .filter((book) => book.lastActiveTime)
    .sort((a, b) => b.lastActiveTime - a.lastActiveTime)
    .slice(0, 10)
    .map(({ lastActiveTime, ...book }) => book);

  const themeStats = new Map();
  readings.forEach((reading) => {
    inferReadingThemes(reading)
      .filter((theme) => theme !== "Reading Input")
      .forEach((theme) => {
        const route = themeRoute(theme);
        const current = themeStats.get(theme) || {
          theme,
          label: route?.label || theme,
          question: route?.question || null,
          noteCount: 0,
          bookCount: 0,
          anchorBooks: [],
          suggestedMove: route?.move || "Use this theme as a candidate reading-to-output bridge."
        };
        current.noteCount += reading.totalNoteCount;
        current.bookCount += 1;
        if (current.anchorBooks.length < 3) {
          current.anchorBooks.push({
            title: reading.shortTitle,
            notes: reading.totalNoteCount
          });
        }
        themeStats.set(theme, current);
      });
  });

  const bridgeThemes = Array.from(themeStats.values())
    .sort((a, b) => b.noteCount - a.noteCount)
    .slice(0, 8);

  const depthBands = {
    heavy: readings.filter((reading) => reading.totalNoteCount >= 20).length,
    committed: readings.filter((reading) => reading.totalNoteCount >= 10 && reading.totalNoteCount < 20).length,
    light: readings.filter((reading) => reading.totalNoteCount >= 3 && reading.totalNoteCount < 10).length,
    skim: readings.filter((reading) => reading.totalNoteCount > 0 && reading.totalNoteCount < 3).length
  };

  const topDeepRead = deepReads[0];
  const topTheme = bridgeThemes[0];
  const advisorMoves = [
    topDeepRead ? {
      workflow: "alchemy",
      title: `Turn ${topDeepRead.shortTitle} into a reusable synthesis note`,
      evidence: `${topDeepRead.totalNoteCount} public-safe note signals make it the strongest candidate for note alchemy.`
    } : null,
    topTheme ? {
      workflow: "path",
      title: `Build a learning path around ${topTheme.label}`,
      evidence: `${topTheme.bookCount} books and ${topTheme.noteCount} notes point to this as a real reading line.`
    } : null,
    {
      workflow: "review",
      title: "Create a year-to-date reading review",
      evidence: `${annual.readDays || 0} reading days and ${secondsToText(annual.totalReadTime)} of WeRead time are enough for a public-safe review.`
    },
    hiddenDeepReads.length ? {
      workflow: "advisor",
      title: "Promote hidden deep reads into the visible atlas",
      evidence: `${hiddenDeepReads.length} note-heavy books appear in notebooks but not in the current shelf view.`
    } : {
      workflow: "advisor",
      title: "Use recent active books to choose the next reading branch",
      evidence: "Recent activity is a better signal than a static shelf when no topic is specified."
    }
  ].filter(Boolean);

  return {
    source: "huashu-weread-advisor public-safe intelligence layer",
    generatedAt: new Date().toISOString(),
    privacy: "No raw highlights, private comments, or long excerpts are committed. This file stores metadata-level signals for reading strategy.",
    method: {
      skill: "huashu-weread-advisor",
      inputs: ["shelf/sync", "user/notebooks", "readdata/detail"],
      principle: "Cross the shelf with notebooks: shelf shows intention, notebooks show what was actually read deeply."
    },
    totals: {
      shelfBookCount: shelfBooks.length,
      notebookBookCount: readings.length,
      notebookNoteCount: notebooks.totalNoteCount || readings.reduce((sum, reading) => sum + reading.totalNoteCount, 0),
      trueReadCount: trueReads.length,
      hiddenDeepReadCount: hiddenDeepReads.length,
      shelfOnlyCount: shelfOnly.length,
      yearlyReadDays: annual.readDays || 0,
      yearlyReadTime: secondsToText(annual.totalReadTime),
      depthBands
    },
    lenses: {
      deepReads: deepReads.slice(0, 12).map((reading) => compactReading(reading, {
        inShelf: shelfById.has(reading.bookId),
        signal: reading.totalNoteCount >= 20 ? "heavy read" : "committed read"
      })),
      activeNow,
      hiddenDeepReads: hiddenDeepReads.slice(0, 10).map((reading) => compactReading(reading, {
        signal: "notebook-only deep read"
      })),
      shelfOnly: shelfOnly.slice(0, 10).map((book) => ({
        bookId: book.bookId,
        title: book.title,
        author: book.author,
        category: book.category,
        lastActiveDate: book.readUpdateDate,
        wereadUrl: `weread://reading?bId=${book.bookId}`,
        signal: "on shelf, no public note signal yet"
      }))
    },
    bridgeThemes,
    advisorMoves
  };
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
    totalNoteCount,
    lastReadTime: Number(item.sort || item.readUpdateTime || 0)
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
    readings: publicReadings.map(publicReadingRecord)
  };

  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(readingsDir, { recursive: true });
  fs.writeFileSync(publicIndexPath, JSON.stringify(publicIndex, null, 2) + "\n", "utf8");
  fs.writeFileSync(
    intelligencePath,
    JSON.stringify(buildReadingIntelligence({ readings, shelf, annual, notebooks }), null, 2) + "\n",
    "utf8"
  );

  fs
    .readdirSync(readingsDir)
    .filter((file) => /^\d+-.*\.md$/.test(file))
    .forEach((file) => fs.unlinkSync(path.join(readingsDir, file)));

  publicReadings.forEach((reading, index) => {
    const filePath = path.join(readingsDir, `${index + 1}-${reading.bookId}.md`);
    fs.writeFileSync(filePath, markdownForReading(reading, index), "utf8");
  });

  console.log(`Wrote ${publicReadings.length} public-safe reading nodes`);
  console.log(`Notebook books: ${publicIndex.totals.notebookBookCount}; notes: ${publicIndex.totals.notebookNoteCount}`);
  console.log("Wrote public-safe reading intelligence");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
