const fs = require("fs");
const https = require("https");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const outputPath = path.join(repoRoot, "raw", "scholar", "google-scholar.json");
const profileUrl = "https://scholar.google.com/citations?user=B-fiSHwAAAAJ&hl=en";

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: {
          "User-Agent": "Rayford-Knowledge-Atlas/1.0 (+https://rayford295.github.io/GeoGraph/)",
          "Accept-Language": "en-US,en;q=0.9"
        }
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          if (response.statusCode < 200 || response.statusCode >= 300) {
            reject(new Error(`Google Scholar returned HTTP ${response.statusCode}`));
            return;
          }
          resolve(body);
        });
      }
    );

    request.setTimeout(15000, () => {
      request.destroy(new Error("Google Scholar request timed out"));
    });
    request.on("error", reject);
  });
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripTags(value) {
  return decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\uFFFD/g, "").replace(/\s+/g, " ").trim());
}

function numberFrom(value) {
  const match = String(value || "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function textById(html, id) {
  const pattern = new RegExp(`<[^>]+id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`);
  const match = html.match(pattern);
  return match ? stripTags(match[1]) : "";
}

function parseMetrics(html) {
  const rows = Array.from(html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)).map((match) => stripTags(match[1]));
  const metricRows = {};

  rows.forEach((row) => {
    const normalized = row.replace(/\s+/g, " ").trim();
    ["Citations", "h-index", "i10-index"].forEach((label) => {
      if (normalized.startsWith(label)) {
        const values = normalized.slice(label.length).trim().match(/\d+/g) || [];
        metricRows[label] = values.map(Number);
      }
    });
  });

  return {
    citations: {
      all: metricRows.Citations?.[0] || 0,
      since2019: metricRows.Citations?.[1] || 0
    },
    hIndex: {
      all: metricRows["h-index"]?.[0] || 0,
      since2019: metricRows["h-index"]?.[1] || 0
    },
    i10Index: {
      all: metricRows["i10-index"]?.[0] || 0,
      since2019: metricRows["i10-index"]?.[1] || 0
    }
  };
}

function parseInterests(html) {
  return Array.from(html.matchAll(/<a[^>]*class=["'][^"']*gsc_prf_inta[^"']*["'][^>]*>([\s\S]*?)<\/a>/g))
    .map((match) => stripTags(match[1]))
    .filter(Boolean);
}

function parseHomepage(html) {
  const homepageMatch = html.match(/href=["']([^"']+)["'][^>]*>Homepage<\/a>/);
  if (!homepageMatch) {
    return "https://rayford295.github.io/";
  }

  const value = decodeHtml(homepageMatch[1]);
  if (value.startsWith("http")) {
    return value;
  }

  return "https://scholar.google.com" + value;
}

function parseArticles(html) {
  return Array.from(html.matchAll(/<tr class=["']gsc_a_tr["'][^>]*>([\s\S]*?)<\/tr>/g))
    .slice(0, 20)
    .map((match) => {
      const row = match[1];
      const title = stripTags((row.match(/class=["']gsc_a_at["'][^>]*>([\s\S]*?)<\/a>/) || [])[1] || "");
      const details = Array.from(row.matchAll(/class=["']gs_gray["'][^>]*>([\s\S]*?)<\/div>/g)).map((item) => stripTags(item[1]));
      const citationCell = row.match(/class=["']gsc_a_ac[^"']*["'][^>]*>([\s\S]*?)<\/a>/);
      const yearCell = row.match(/class=["']gsc_a_y[^"']*["'][^>]*>([\s\S]*?)<\/span>/);

      return {
        title,
        authors: details[0] || "",
        venue: details[1] || "",
        citations: numberFrom(citationCell ? citationCell[1] : ""),
        year: numberFrom(yearCell ? yearCell[1] : "")
      };
    })
    .filter((article) => article.title);
}

function readPrevious() {
  if (!fs.existsSync(outputPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(outputPath, "utf8"));
}

function writeSnapshot(snapshot) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2) + "\n", "utf8");
}

function keepPreviousWithError(error) {
  const previous = readPrevious();
  if (!previous) {
    throw error;
  }

  console.warn(`Google Scholar refresh kept previous snapshot: ${error.message}`);
}

function comparableSnapshot(snapshot) {
  const copy = JSON.parse(JSON.stringify(snapshot));
  delete copy.fetchedAt;
  return copy;
}

async function main() {
  try {
    const html = await fetchText(profileUrl);
    const metrics = parseMetrics(html);
    const articles = parseArticles(html);

    if (!metrics.citations.all || !articles.length) {
      throw new Error("Google Scholar response did not include complete public profile data");
    }

    const snapshot = {
      source: "Google Scholar public profile",
      profileUrl: "https://scholar.google.com/citations?user=B-fiSHwAAAAJ",
      userId: "B-fiSHwAAAAJ",
      name: textById(html, "gsc_prf_in") || "Yifan Yang",
      affiliation: stripTags((html.match(/class=["']gsc_prf_il["'][^>]*>([\s\S]*?)<\/div>/) || [])[1] || "Ph.D. Student, Texas A&M University"),
      verifiedEmail: "tamu.edu",
      homepage: parseHomepage(html),
      interests: parseInterests(html),
      metrics,
      articles,
      status: "ok",
      fetchedAt: new Date().toISOString()
    };

    const previous = readPrevious();
    if (
      previous &&
      previous.status === "ok" &&
      JSON.stringify(comparableSnapshot(previous)) === JSON.stringify(comparableSnapshot(snapshot))
    ) {
      console.log("Google Scholar snapshot unchanged");
      return;
    }

    writeSnapshot(snapshot);
    console.log(`Updated Google Scholar snapshot: ${snapshot.metrics.citations.all} citations`);
  } catch (error) {
    keepPreviousWithError(error);
  }
}

main();
