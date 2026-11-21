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

test("renderBlock emits header, sections, bullets, flattened desc, version", () => {
  const out = renderBlock({
    skills: [ALPHA, BETA],
    sections: [
      { title: "Cat A", skills: [ALPHA] },
      { title: "Cat B", skills: [BETA] },
    ],
  });
  assert.match(out, /### 🤖 Hermes Skills/);
  assert.match(out, /\*\*Cat A\*\*/);
  assert.match(out, /\*\*Cat B\*\*/);
  assert.match(
    out,
    /\[alpha\]\(https:\/\/github\.com\/LaansDole\/my-hermes-skills\/tree\/main\/skills\/alpha\) — Does alpha things\. Second line\. \(v1\.2\.0\)/
  );
  assert.match(out, /\[beta\]\([^)]+\) — Beta desc$/m);
});

test("renderBlock falls back to category grouping when sections missing", () => {
  const out = renderBlock({ skills: [ALPHA, BETA] });
  assert.match(out, /\*\*Cat A\*\*/);
  assert.match(out, /\*\*Cat B\*\*/);
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

test("renderReportsBlock renders header and max 5 newest-first lines", () => {
  const out = renderReportsBlock(SIX);
  assert.match(out, /^### 📑 Latest Research Reports\n/);
  assert.match(
    out,
    /\*Auto-synced daily from \[my-hermes-skills reports\]\(https:\/\/laansdole\.github\.io\/my-hermes-skills\/reports\.html\)\*/
  );
  const items = out.split("\n").filter((l) => l.startsWith("- "));
  assert.equal(items.length, 5);
  assert.equal(
    items[0],
    "- **2026-11-06** · [Report 6](https://laansdole.github.io/my-hermes-skills/reports/2026-11/report-6.html) — Summary 6"
  );
  assert.match(items[4], /2026-11-02/);
});

test("renderReportsBlock escapes brackets in titles and collapses summary whitespace", () => {
  const out = renderReportsBlock([
    report(1, { title: "A [b] c", summary: "  line one\n\n  line\ttwo  " }),
  ]);
  assert.match(out, /\[A \\\[b\\\] c\]\(/);
  assert.match(out, /— line one line two$/m);
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
