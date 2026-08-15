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

function renderBlock(data) {
  const sections =
    Array.isArray(data.sections) && data.sections.length
      ? data.sections
      : groupByCategory(data.skills);
  const lines = [
    "### 🤖 Hermes Skills",
    `*Auto-synced daily from [my-hermes-skills](${REPO_URL}) · [docs](${DOCS_URL})*`,
    "",
  ];
  for (const sec of sections) {
    lines.push(`**${sec.title}**`);
    for (const s of sec.skills) {
      const desc = (s.description || "").replace(/\s+/g, " ").trim();
      const ver = s.version ? ` (v${s.version})` : "";
      lines.push(`- [${s.name}](${s.url}) — ${desc}${ver}`);
    }
    lines.push("");
  }
  return lines.join("\n").trim() + "\n";
}

function replaceSection(readme, block) {
  const startIdx = readme.indexOf(START);
  const endIdx = readme.indexOf(END);
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    throw new Error(
      `markers not found in ${README_PATH} (need ${START} ... ${END}); use --init for first-time setup`
    );
  }
  return (
    readme.slice(0, startIdx + START.length) + "\n" + block + "\n" + readme.slice(endIdx)
  );
}

function initSection(readme, block) {
  if (readme.includes(START) && readme.includes(END)) return readme;
  const idx = readme.indexOf(ANCHOR);
  if (idx === -1) throw new Error(`anchor not found: ${ANCHOR}`);
  const markerBlock = `${START}\n${block}\n${END}`;
  return readme.slice(0, idx) + markerBlock + "\n\n" + readme.slice(idx);
}

async function main() {
  const init = process.argv.includes("--init");
  const data = await fetchManifest();
  const block = renderBlock(data);
  let readme = fs.readFileSync(README_PATH, "utf8");
  const hasMarkers = readme.includes(START) && readme.includes(END);

  if (init && !hasMarkers) {
    fs.writeFileSync(README_PATH, initSection(readme, block));
    console.log("initialized Hermes skills section");
    return;
  }
  if (!hasMarkers) {
    throw new Error(`markers not found in ${README_PATH} (need ${START} ... ${END})`);
  }
  const next = replaceSection(readme, block);
  if (next === readme) {
    console.log("no change");
    return;
  }
  fs.writeFileSync(README_PATH, next);
  console.log("updated Hermes skills section");
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
  replaceSection,
  initSection,
  START,
  END,
  ANCHOR,
};
