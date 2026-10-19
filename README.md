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
- [auditing-worktrees](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/productivity/auditing-worktrees) — Use when asked for the status of worktrees, which worktree branches are ready to review, pushed, merged or shipped, which worktrees are stale, idle or purgeable, or for a periodic worktree audit across one or several repos (v1.0.0)
- [hermes-deepseek-cache](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/productivity/hermes-deepseek-cache) — Use when running Hermes Agent with a DeepSeek-family model (deepseek, or deepseek-v4-flash/pro via an aggregator like opencode-go) and want to see, graph, or reset DeepSeek's prefix-cache hit rate, diagnose cache misses, or confirm the deepseek_cache.enabled config — OR when you want to port/apply the deepseek_cache.py module (DeepSeek prefix-cache telemetry, /cache-stats /cache-graph /cache-reset, prefix-break diagnostics, stable tool ordering, cache-friendly compaction) into a Hermes source tree. Covers use + integration. (v1.1.0)
- [i-have-adhd](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/productivity/i-have-adhd) — Shape output for a reader with ADHD: lead with the next action, number multi-step work, restate state across turns, suppress tangents, give specific time estimates, make wins visible. Invoke with /i-have-adhd; stays on until "stop adhd mode".
- [memory-ui](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/productivity/memory-ui) — Launch the Mnemosyne browser UI to inspect stored memory.
- [oh-my-ghostty](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/productivity/oh-my-ghostty) — Use when setting up or refreshing the oh-my-ghostty terminal stack on macOS - Ghostty config, fastfetch on new-terminal startup, and bat/eza/zoxide aliases for zsh. (v1.0.0)
- [tldr](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/productivity/tldr) — Use when the user says tldr / TL;DR or asks for a before/after summary. (v1.1.0)
- [writing-reports](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/productivity/writing-reports) — Use when the user asks for a report, research write-up, benchmark/model/tool comparison, or any 'give me the report' request. (v1.0.0)

**Coding Agents**
- [oh-my-pi](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/oh-my-pi) — Troubleshoot/operate the Oh-My-Pi (omp) coding agent.

**Slack**
- [slack-mention-watch](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/slack/slack-mention-watch) — Use when the user asks about Slack pings, mentions, notifications or what they missed, or wants @mention alerts or a triaged mention digest while away. Read-only. (v2.2.0)
- [slack-scan](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/slack/slack-scan) — Summarize today's Slack channel activity on demand (bot-member channels). NOT for pings/mentions -- use slack-mention-watch. (v1.0.0)

**ilearning-autoadvance**
- [ilearning-autoadvance](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/ilearning-autoadvance) — Autonomously advance HCL iLearning / SAP SuccessFactors compliance courses (Articulate Storyline SCORM, Ethena GoEthena, or direct-HTML SVG players) via raw CDP on port 9222. Resumes paused audio, clicks interactive slide topics/cards, answers quizzes, navigates to the next slide. (v5.0.0)

**superpowers**
- [superpowers-using-superpowers](https://github.com/LaansDole/my-hermes-skills/tree/main/skills/superpowers/superpowers-using-superpowers) — Use when starting any conversation - establishes how to find and use skills, requiring skill loading (skill_view) before ANY response including clarifying questions (v1.0.0)

<!-- HERMES_SKILLS_END -->

### 🤖 Daily Byte of Humor

<h3><strong>Why do Java programmers hate communism?</strong></h3><h4><i>They don't want to live in a classless society.</i></h4>