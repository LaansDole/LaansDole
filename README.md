<div align="center">
    <img style="" src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=25&pause=1000&center=true&vCenter=true&random=true&width=435&lines=Hello%2C+World!;I+am+Do+Le+Long+An;LLM+Researcher" alt="Typing SVG" />
</div>
<div class="sketchfab-embed-wrapper" align="center">
    <div style="text-align: center;">
        <a href="https://laansdole.github.io/LaansDole/">
            <img src="https://img.shields.io/badge/Portfolio-172B4D?style=for-the-badge&logo=Opsgenie&logoColor=white" alt="Portfolio Badge"/>
        </a>
    </div>
    <div>
        <picture align="center">
            <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/LaansDole/LaansDole/snake-svg/github-contribution-grid-snake-dark.svg">
            <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/LaansDole/LaansDole/snake-svg/github-contribution-grid-snake.svg">
            <img alt="github contribution grid snake animation" src="https://raw.githubusercontent.com/LaansDole/LaansDole/snake-svg/github-contribution-grid-snake.svg">
        </picture>
    </div>
</div>

### My main focus <img src="https://github.com/TheDudeThatCode/TheDudeThatCode/blob/master/Assets/Developer.gif" width="29px">
* Current research work (hopefully PhD): [Muti-agent Simulation](https://github.com/LaansDole/multi-agent-simulation), [MedVoice](https://github.com/medvoice-research/medvoice-service).
* Open source contributor: [OpenBMB/ChatDev 2.0](https://github.com/OpenBMB/ChatDev), [HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything).

<!-- HERMES_SKILLS_START -->
### 🤖 Hermes Skills
*Auto-synced daily from [my-hermes-skills](https://github.com/LaansDole/my-hermes-skills) · [docs](https://laansdole.github.io/my-hermes-skills/)*

**Research**
- [covidence-full-text-retrieval](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/covidence-full-text-retrieval) — Autonomously retrieve full-text PDFs for references in the full-text review stage of a Covidence systematic review, in the user's Chrome session via CDP. Looks up open-access copies via Unpaywall, Semantic Scholar, and arXiv, with an optional NotebookLM-assisted last-resort web search, then uploads any PDF it finds through Covidence's "Upload full text" action. References with no locatable full text get a note logged for manual follow-up. Never casts an Include/Exclude decision -- that stays manual. (v1.2.0)
- [covidence-full-text-review](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/covidence-full-text-retrieval/covidence-full-text-review) — Review full-text papers in a Covidence systematic review. Mode 1 (websearch_queue): walks the Covidence queue, web-searches each title, opens the first result in the papers-access browser profile, reads the full text, and reports verdicts in chat (no Covidence writes). Mode 2 (secondary_reviewer): receives a URL from the user, reads the paper, returns a structured Include/Exclude verdict with rationale, and optionally casts the vote in Covidence when a ref_id is supplied. (v2.0.0)
- [covidence-screening](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/covidence-screening) — Autonomously screen references at the title & abstract stage of a Covidence systematic review in the user's Chrome session via CDP. Votes Yes/Maybe/No per the user's PICO criteria, writes a one-line rationale for Maybe votes, and runs unattended after an approve-first-N onboarding phase. (v1.0.0)
- [sci-hub-access](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/sci-hub-access) — Use when a paywalled DOI's full text is needed and no open-access copy exists — retrieving PDFs via Sci-Hub mirrors, and joining/using Sci-Net (sci-net.xyz) for post-2022 papers. Covers mirror discovery, direct PDF fetch, Turnstile gate, and the Sci-Net invite-code API. (v1.1.0)

**Productivity**
- [hermes-deepseek-cache](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/productivity/hermes-deepseek-cache) — Use when running Hermes Agent with a DeepSeek-family model (deepseek, or deepseek-v4-flash/pro via an aggregator like opencode-go) and want to see, graph, or reset DeepSeek's prefix-cache hit rate, diagnose cache misses, or confirm the deepseek_cache.enabled config — OR when you want to port/apply the deepseek_cache.py module (DeepSeek prefix-cache telemetry, /cache-stats /cache-graph /cache-reset, prefix-break diagnostics, stable tool ordering, cache-friendly compaction) into a Hermes source tree. Covers use + integration. (v1.1.0)
- [i-have-adhd](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/productivity/i-have-adhd) — Shape output for a reader with ADHD: lead with the next action, number multi-step work, restate state across turns, suppress tangents, give specific time estimates, make wins visible. Invoke with /i-have-adhd; stays on until "stop adhd mode".
- [memory-ui](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/productivity/memory-ui) — Launch the Mnemosyne browser UI to inspect stored memory.
- [pbcopy-word-delivery](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/productivity/pbcopy-word-delivery) — Deliver structured text content (verdicts, reports, summaries) directly to the macOS clipboard via pbcopy so the user can Cmd+V into Word without Warp terminal soft-wrap artifacts. (v1.0.0)
- [session-handoff](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/productivity/session-handoff) — Use when ending or pausing a session, switching between sessions, or asked to save/compress session state with TODOs - compresses the current session into a handoff file, updates a task index, and creates Apple Reminders for follow-up. Also used by the daily reminder cron in review mode to pick up leftover tasks. (v1.2.0)
- [tldr](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/productivity/tldr) — Use when the user asks for a TL;DR or before/after summary. (v1.0.0)

**Coding Agents**
- [oh-my-pi](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/oh-my-pi) — Troubleshoot/operate the Oh-My-Pi (omp) coding agent.

**Slack**
- [slack-scan](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/slack-scan) — Summarize today's Slack activity on demand -- one channel or every channel/DM the bot is in. (v1.0.0)

**ilearning-autoadvance**
- [ilearning-autoadvance](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/ilearning-autoadvance) — Autonomously advance HCL iLearning / SAP SuccessFactors compliance courses (Articulate Storyline SCORM, Ethena GoEthena, or direct-HTML SVG players) via raw CDP on port 9222. Resumes paused audio, clicks interactive slide topics/cards, answers quizzes, navigates to the next slide. (v5.0.0)

**superpowers**
- [superpowers-brainstorming](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-brainstorming) — You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation. (v1.0.0)
- [superpowers-dispatching-parallel-agents](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-dispatching-parallel-agents) — Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies (v1.0.0)
- [superpowers-executing-plans](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-executing-plans) — Use when you have a written implementation plan to execute in a separate session with review checkpoints (v1.0.0)
- [superpowers-finishing-a-development-branch](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-finishing-a-development-branch) — Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work by presenting structured options for merge, PR, or cleanup (v1.0.0)
- [superpowers-receiving-code-review](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-receiving-code-review) — Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires technical rigor and verification, not performative agreement or blind implementation (v1.0.0)
- [superpowers-requesting-code-review](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-requesting-code-review) — Use when completing tasks, implementing major features, or before merging to verify work meets requirements (v1.0.0)
- [superpowers-slash-commands](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-slash-commands) — Index and invocation guide for the Superpowers skills. Use when the user asks for a Superpowers skill by name or wants to know which skills exist. (v1.0.0)
- [superpowers-subagent-driven-development](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-subagent-driven-development) — Use when executing implementation plans with independent tasks in the current session (v1.0.0)
- [superpowers-systematic-debugging](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-systematic-debugging) — Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes (v1.0.0)
- [superpowers-test-driven-development](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-test-driven-development) — Use when implementing any feature or bugfix, before writing implementation code (v1.0.0)
- [superpowers-using-git-worktrees](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-using-git-worktrees) — Use when starting feature work that needs isolation from current workspace or before executing implementation plans - creates isolated git worktrees with smart directory selection and safety verification (v1.0.0)
- [superpowers-using-superpowers](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-using-superpowers) — Use when starting any conversation - establishes how to find and use skills, requiring skill loading (skill_view) before ANY response including clarifying questions (v1.0.0)
- [superpowers-verification-before-completion](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-verification-before-completion) — Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming output before making any success claims; evidence before assertions always (v1.0.0)
- [superpowers-writing-plans](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-writing-plans) — Use when you have a spec or requirements for a multi-step task, before touching code (v1.0.0)
- [superpowers-writing-skills](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-writing-skills) — Use when creating new skills, editing existing skills, or verifying skills work before deployment (v1.0.0)

<!-- HERMES_SKILLS_END -->

### 🤖 Daily Byte of Humor

<h3><strong>Why did the banana go see a doctor?</strong></h3><h4><i>Because it wasn't peeling well.</i></h4>