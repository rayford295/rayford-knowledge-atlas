// Reports how old the committed Google Scholar snapshot is.
//
// Why this exists: `fetch-scholar.js` deliberately never fails. When Scholar
// blocks the runner it keeps the previous snapshot and exits 0, which is the
// right call for a build step but means a broken refresh looks identical to a
// healthy one. That is how the snapshot silently sat at 2026-08-03 for weeks
// while the weekly workflow reported success every Monday.
//
// This script turns snapshot age into something the workflow can branch on:
//
//   --stale-after N   exit 0 and report stale=true/false, so a catch-up run can
//                     skip immediately when the snapshot is already fresh.
//   --fail-after N    exit 1 when the snapshot is older than N days, so a
//                     genuinely stuck refresh finally shows up as a red run
//                     instead of hiding behind a green check.
//
// Both flags write `stale`, `ageDays`, and `fetchedAt` to $GITHUB_OUTPUT when
// running under Actions, and always print a human-readable line.

const fs = require("fs");
const path = require("path");

const snapshotPath = path.join(__dirname, "..", "raw", "scholar", "google-scholar.json");
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function readFlag(name) {
  const index = process.argv.indexOf(name);
  if (index === -1 || index === process.argv.length - 1) {
    return null;
  }
  const value = Number(process.argv[index + 1]);
  return Number.isFinite(value) ? value : null;
}

function readSnapshotAge() {
  if (!fs.existsSync(snapshotPath)) {
    return { fetchedAt: null, ageDays: Infinity, reason: "no snapshot file" };
  }

  let snapshot;
  try {
    snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  } catch (error) {
    return { fetchedAt: null, ageDays: Infinity, reason: `unreadable snapshot (${error.message})` };
  }

  const fetchedAt = snapshot.fetchedAt;
  const parsed = fetchedAt ? Date.parse(fetchedAt) : NaN;
  if (!Number.isFinite(parsed)) {
    return { fetchedAt: fetchedAt || null, ageDays: Infinity, reason: "snapshot has no usable fetchedAt" };
  }

  return {
    fetchedAt,
    ageDays: (Date.now() - parsed) / MS_PER_DAY,
    reason: snapshot.status === "ok" ? null : `snapshot status is ${snapshot.status}`
  };
}

function emit(outputs) {
  const file = process.env.GITHUB_OUTPUT;
  if (!file) {
    return;
  }
  const lines = Object.entries(outputs).map(([key, value]) => `${key}=${value}`);
  fs.appendFileSync(file, lines.join("\n") + "\n", "utf8");
}

function describe(ageDays) {
  return Number.isFinite(ageDays) ? `${ageDays.toFixed(1)} days old` : "missing or unreadable";
}

const staleAfter = readFlag("--stale-after");
const failAfter = readFlag("--fail-after");
const { fetchedAt, ageDays, reason } = readSnapshotAge();

const threshold = staleAfter ?? failAfter ?? 7;
const stale = ageDays > threshold;

emit({
  stale: String(stale),
  ageDays: Number.isFinite(ageDays) ? ageDays.toFixed(2) : "",
  fetchedAt: fetchedAt || ""
});

const suffix = reason ? ` (${reason})` : "";
console.log(`Scholar snapshot fetched ${fetchedAt || "never"} - ${describe(ageDays)}${suffix}`);

if (failAfter !== null && ageDays > failAfter) {
  console.error(
    `Scholar snapshot is ${describe(ageDays)}, past the ${failAfter}-day limit. ` +
      `The catch-up schedule has not managed to get past Scholar's IP block. ` +
      `Rerun "Update Google Scholar Snapshot" manually, or refresh the snapshot from a non-datacenter network with "npm run scholar:update".`
  );
  process.exit(1);
}

if (staleAfter !== null) {
  console.log(stale ? `Snapshot is stale (> ${staleAfter} days); a refresh attempt is due.` : `Snapshot is fresh (<= ${staleAfter} days); skipping this catch-up run.`);
}
