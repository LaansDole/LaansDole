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
