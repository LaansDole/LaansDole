"use strict";

const test = require("node:test");
const assert = require("node:assert");
const {
  renderBlock,
  replaceSection,
  initSection,
  START,
  END,
  ANCHOR,
} = require("./syncSkills.js");

const ALPHA = {
  name: "alpha",
  version: "1.2.0",
  description: "Does alpha things.\nSecond line.",
  category: "Cat A",
  url: "https://github.com/LaansDole/my-hermes-skills/tree/main/skills/alpha",
};
const BETA = {
  name: "beta",
  version: "",
  description: "Beta desc",
  category: "Cat B",
  url: "https://github.com/LaansDole/my-hermes-skills/tree/main/skills/beta",
};

test("renderBlock emits header, badge row, collapsed sections, short desc, no version", () => {
  const out = renderBlock({
    skills: [ALPHA, BETA],
    sections: [
      { title: "Cat A", skills: [ALPHA, BETA] },
      { title: "Cat B", skills: [BETA] },
    ],
  });
  const lines = out.split("\n");
  assert.match(lines[0], /^### Hermes Skills <img src="[^"]+\/powerup\.gif" width="29px">$/);
  assert.equal(
    lines[1],
    "[![skills](https://img.shields.io/badge/skills-2-172B4D?style=flat-square)](https://github.com/LaansDole/my-hermes-skills) " +
      "[![docs](https://img.shields.io/badge/docs-my--hermes--skills-172B4D?style=flat-square)](https://laansdole.github.io/my-hermes-skills/) " +
      "[![synced](https://img.shields.io/badge/synced-daily-172B4D?style=flat-square)](https://github.com/LaansDole/LaansDole/actions/workflows/sync-skills.yml)"
  );
  assert.equal(lines[2], "");
  assert.ok(!out.includes("Auto-synced"));
  assert.ok(
    out.includes(
      "<details>\n<summary><b>Cat A</b> · 2 skills</summary>\n\n" +
        "- [alpha](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/alpha) — Does alpha things.\n" +
        "- [beta](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/beta) — Beta desc\n\n</details>"
    )
  );
  assert.match(out, /<summary><b>Cat B<\/b> · 1 skill<\/summary>/);
  assert.ok(out.indexOf("Cat A") < out.indexOf("Cat B"));
});

test("renderBlock escapes < and > and caps descriptions at 100 chars", () => {
  const long = { ...BETA, description: "word ".repeat(40) + "end." };
  const html = { ...BETA, name: "h", description: "Use <details> & <b> tags > none" };
  const out = renderBlock({ skills: [long, html], sections: [{ title: "X", skills: [long, html] }] });
  assert.match(out, /— Use &lt;details&gt; & &lt;b&gt; tags &gt; none$/m);
  const longLine = out.split("\n").find((l) => l.startsWith("- [beta]"));
  const desc = longLine.split(" — ")[1];
  assert.ok(desc.endsWith("…") && desc.length <= 101, desc);
  assert.ok(!desc.includes("  ") && !/\s…$/.test(desc));
});

test("renderBlock falls back to category grouping when sections missing", () => {
  const out = renderBlock({ skills: [ALPHA, BETA] });
  assert.match(out, /<summary><b>Cat A<\/b> · 1 skill<\/summary>/);
  assert.match(out, /<summary><b>Cat B<\/b> · 1 skill<\/summary>/);
});

const { badge, firstSentence } = require("./syncSkills.js");

test("badge escapes dashes, underscores and spaces for shields.io", () => {
  assert.equal(
    badge("my label", "a-b_c", "https://x"),
    "[![my label](https://img.shields.io/badge/my%20label-a--b__c-172B4D?style=flat-square)](https://x)"
  );
});

test("firstSentence cuts at first sentence boundary and caps on word boundary", () => {
  assert.equal(firstSentence("  One   two. Three? Four", 140), "One two.");
  assert.equal(firstSentence("Why? Because", 140), "Why?");
  assert.equal(firstSentence("v1.2 is out! yes", 140), "v1.2 is out!");
  assert.equal(firstSentence("no boundary here", 140), "no boundary here");
  assert.equal(firstSentence("", 140), "");
  assert.equal(firstSentence("aaa bbb ccc ddd", 10), "aaa bbb…");
});

test("replaceSection swaps marker content and preserves markers", () => {
  const readme = `# Title\n${START}\nOLD\n${END}\nTail`;
  const out = replaceSection(readme, "NEW");
  assert.equal(out, `# Title\n${START}\nNEW\n${END}\nTail`);
});

test("replaceSection throws when markers missing", () => {
  assert.throws(() => replaceSection("no markers", "NEW"), /markers not found/);
});

test("initSection inserts markers before the joke anchor", () => {
  const readme = `Header\n\n${ANCHOR}\njoke`;
  const out = initSection(readme, "BLOCK");
  assert.match(out, new RegExp(`${START}\\nBLOCK\\n${END}\\n\\n${ANCHOR}`));
});

const {
  renderReportsBlock,
  syncReadme,
  REPORTS_START,
  REPORTS_END,
} = require("./syncSkills.js");

const report = (n, extra = {}) => ({
  date: `2026-11-${String(n).padStart(2, "0")}`,
  title: `Report ${n}`,
  slug: `report-${n}`,
  path: `reports/2026-11/report-${n}.md`,
  url: `https://laansdole.github.io/my-hermes-skills/reports/2026-11/report-${n}.html`,
  summary: `Summary ${n}`,
  ...extra,
});
const SIX = [6, 5, 4, 3, 2, 1].map((n) => report(n));

test("renderReportsBlock renders header and max 2 newest-first lines", () => {
  const out = renderReportsBlock(SIX);
  assert.match(out, /^### Latest Research Reports <img src="[^"]+\/PC\.gif" width="29px">\n\n- /);
  assert.ok(!out.includes("Auto-synced"));
  const items = out.split("\n").filter((l) => l.startsWith("- "));
  assert.equal(items.length, 2);
  assert.equal(
    items[0],
    "- **2026-11-06** · [Report 6](https://laansdole.github.io/my-hermes-skills/reports/2026-11/report-6.html) — Summary 6"
  );
  assert.match(items[1], /2026-11-05/);
});

test("renderReportsBlock escapes brackets in titles and collapses summary whitespace", () => {
  const out = renderReportsBlock([
    report(1, { title: "A [b] c", summary: "  line one\n\n  line\ttwo  " }),
  ]);
  assert.match(out, /\[A \\\[b\\\] c\]\(/);
  assert.match(out, /— line one line two$/m);
});

test("renderReportsBlock keeps only the first sentence, capped at 140 chars", () => {
  const out = renderReportsBlock([
    report(1, { summary: "First bit here. Second bit should vanish." }),
    report(2, { summary: "x ".repeat(100) }),
  ]);
  const items = out.split("\n").filter((l) => l.startsWith("- "));
  assert.match(items[0], /— First bit here\.$/);
  const desc = items[1].split(" — ")[1];
  assert.ok(desc.endsWith("…") && desc.length <= 141, desc);
});

const SKILLS_DATA = { skills: [ALPHA], sections: [{ title: "Cat A", skills: [ALPHA] }] };

test("syncReadme inserts reports block directly above skills markers when missing", () => {
  const readme = `# Hi\n\n${START}\nOLD\n${END}\nTail`;
  const { readme: out } = syncReadme(readme, { ...SKILLS_DATA, reports: SIX });
  const rs = out.indexOf(REPORTS_START);
  const re = out.indexOf(REPORTS_END);
  assert.ok(rs > 0 && re > rs);
  assert.equal(out.slice(re + REPORTS_END.length, out.indexOf(START)), "\n\n");
  assert.ok(out.slice(rs, re).includes("Report 6"));
  assert.ok(!out.includes("OLD"));
});

test("syncReadme replaces content between existing reports markers", () => {
  const readme = `${REPORTS_START}\nSTALE\n${REPORTS_END}\n\n${START}\nOLD\n${END}`;
  const { readme: out } = syncReadme(readme, { ...SKILLS_DATA, reports: [report(1)] });
  assert.ok(!out.includes("STALE"));
  assert.equal(out.split(REPORTS_START).length, 2);
  assert.match(out, /Report 1/);
});

test("syncReadme leaves reports untouched but syncs skills when reports array missing", () => {
  const plain = `# Hi\n${START}\nOLD\n${END}`;
  const a = syncReadme(plain, SKILLS_DATA).readme;
  assert.ok(!a.includes(REPORTS_START));
  assert.ok(!a.includes("OLD"));
  const withBlock = `${REPORTS_START}\nKEEP\n${REPORTS_END}\n\n${START}\nOLD\n${END}`;
  const b = syncReadme(withBlock, SKILLS_DATA).readme;
  assert.match(b, /KEEP/);
  assert.ok(!b.includes("OLD"));
});

test("syncReadme is idempotent: second run reports no change", () => {
  const data = { ...SKILLS_DATA, reports: SIX };
  const first = syncReadme(`# Hi\n${START}\nOLD\n${END}`, data);
  assert.equal(first.changed, true);
  const second = syncReadme(first.readme, data);
  assert.equal(second.changed, false);
  assert.equal(second.readme, first.readme);
});

test("syncReadme --init inserts skills before anchor and reports above skills", () => {
  const { readme: out } = syncReadme(`Header\n\n${ANCHOR}\njoke`, { ...SKILLS_DATA, reports: SIX }, { init: true });
  const order = [REPORTS_START, REPORTS_END, START, END, ANCHOR].map((m) => out.indexOf(m));
  assert.deepEqual([...order].sort((x, y) => x - y), order);
  assert.ok(order.every((i) => i >= 0));
});
