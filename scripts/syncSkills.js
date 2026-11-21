#!/usr/bin/env node
"use strict";

const fs = require("fs");

const MANIFEST_URL =
  "https://raw.githubusercontent.com/LaansDole/my-hermes-skills/main/skills.json";
const README_PATH = "README.md";
const START = "<!-- HERMES_SKILLS_START -->";
const END = "<!-- HERMES_SKILLS_END -->";
const REPO_URL = "https://github.com/LaansDole/my-hermes-skills";
const DOCS_URL = "https://laansdole.github.io/my-hermes-skills/";
const SYNC_WORKFLOW_URL = "https://github.com/LaansDole/LaansDole/actions/workflows/sync-skills.yml";
const REPORTS_START = "<!-- HERMES_REPORTS_START -->";
const REPORTS_END = "<!-- HERMES_REPORTS_END -->";
const ANCHOR = "### 🤖 Daily Byte of Humor";

async function fetchManifest(url = MANIFEST_URL) {
  const res = await fetch(url, { headers: { "User-Agent": "syncSkills" } });
  if (!res.ok) throw new Error(`manifest fetch failed: HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data.skills) || data.skills.length === 0) {
    throw new Error("manifest missing non-empty skills array");
  }
  return data;
}

function groupByCategory(skills) {
  const byCat = new Map();
  for (const s of skills) {
    const cat = s.category || "Other";
    if (!byCat.has(cat)) byCat.set(cat, []);
    byCat.get(cat).push(s);
  }
  return [...byCat.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([title, list]) => ({ title, skills: list }));
}

// First sentence (up to the first `. `/`? `/`! ` or end), whitespace-collapsed, capped at `max` on a word boundary.
function firstSentence(text, max) {
  const flat = String(text || "").replace(/\s+/g, " ").trim();
  const m = flat.match(/^.*?[.?!](?= |$)/);
  const s = m ? m[0] : flat;
  if (s.length <= max) return s;
  const cut = s.slice(0, max + 1).lastIndexOf(" ");
  return (cut > 0 ? s.slice(0, cut) : s.slice(0, max)).trimEnd() + "…";
}

// shields.io static badge: '-' and '_' must be doubled in label/message.
function badge(label, message, href) {
  const esc = (t) => encodeURIComponent(String(t).replace(/-/g, "--").replace(/_/g, "__"));
  return `[![${label}](https://img.shields.io/badge/${esc(label)}-${esc(message)}-172B4D?style=flat-square)](${href})`;
}

function renderBlock(data) {
  const sections =
    Array.isArray(data.sections) && data.sections.length
      ? data.sections
      : groupByCategory(data.skills);
  const lines = [
    "### 🤖 Hermes Skills",
    [
      badge("skills", data.skills.length, REPO_URL),
      badge("docs", "my-hermes-skills", DOCS_URL),
      badge("synced", "daily", SYNC_WORKFLOW_URL),
    ].join(" "),
    "",
  ];
  for (const sec of sections) {
    const n = sec.skills.length;
    lines.push("<details>", `<summary><b>${sec.title}</b> · ${n} skill${n === 1 ? "" : "s"}</summary>`, "");
    for (const s of sec.skills) {
      const desc = firstSentence(s.description, 100).replace(/</g, "&lt;").replace(/>/g, "&gt;");
      lines.push(`- [${s.name}](${s.url}) — ${desc}`);
    }
    lines.push("", "</details>", "");
  }
  return lines.join("\n").trim() + "\n";
}

function renderReportsBlock(reports) {
  const lines = [
    "### 📑 Latest Research Reports",
    "",
  ];
  // ponytail: manifest is newest-first per contract; no re-sort.
  for (const r of reports.slice(0, 2)) {
    const title = String(r.title).replace(/[[\]]/g, "\\$&");
    lines.push(`- **${r.date}** · [${title}](${r.url}) — ${firstSentence(r.summary, 140)}`);
  }
  return lines.join("\n").trim() + "\n";
}

function replaceSection(readme, block, start = START, end = END) {
  const startIdx = readme.indexOf(start);
  const endIdx = readme.indexOf(end);
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    throw new Error(
      `markers not found in ${README_PATH} (need ${start} ... ${end}); use --init for first-time setup`
    );
  }
  return (
    readme.slice(0, startIdx + start.length) + "\n" + block + "\n" + readme.slice(endIdx)
  );
}

function initSection(readme, block) {
  if (readme.includes(START) && readme.includes(END)) return readme;
  const idx = readme.indexOf(ANCHOR);
  if (idx === -1) throw new Error(`anchor not found: ${ANCHOR}`);
  const markerBlock = `${START}\n${block}\n${END}`;
  return readme.slice(0, idx) + markerBlock + "\n\n" + readme.slice(idx);
}

// Pure: returns { readme, changed }. Reports block is skipped when the manifest has no reports array.
function syncReadme(readme, data, { init = false } = {}) {
  const hasSkills = readme.includes(START) && readme.includes(END);
  if (!hasSkills && !init) {
    throw new Error(`markers not found in ${README_PATH} (need ${START} ... ${END})`);
  }
  const block = renderBlock(data);
  let next = hasSkills ? replaceSection(readme, block) : initSection(readme, block);

  if (Array.isArray(data.reports)) {
    const reportsBlock = renderReportsBlock(data.reports);
    if (next.includes(REPORTS_START) && next.includes(REPORTS_END)) {
      next = replaceSection(next, reportsBlock, REPORTS_START, REPORTS_END);
    } else {
      const idx = next.indexOf(START);
      next =
        next.slice(0, idx) +
        `${REPORTS_START}\n${reportsBlock}\n${REPORTS_END}\n\n` +
        next.slice(idx);
    }
  }
  return { readme: next, changed: next !== readme };
}

async function main() {
  const init = process.argv.includes("--init");
  const data = await fetchManifest();
  const readme = fs.readFileSync(README_PATH, "utf8");
  const { readme: next, changed } = syncReadme(readme, data, { init });
  if (!changed) {
    console.log("no change");
    return;
  }
  fs.writeFileSync(README_PATH, next);
  console.log("updated Hermes skills and reports sections");
}

if (require.main === module) {
  main().catch((err) => {
    console.error(`syncSkills: ${err.message}`);
    process.exit(1);
  });
}

module.exports = {
  fetchManifest,
  groupByCategory,
  renderBlock,
  badge,
  firstSentence,
  renderReportsBlock,
  replaceSection,
  initSection,
  syncReadme,
  START,
  END,
  REPORTS_START,
  REPORTS_END,
  ANCHOR,
};
