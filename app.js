const LINK_FACTS = [
  { label: "Public name", value: "Claude Code", color: "#f2e8e4" },
  { label: "Internal codename", value: "Tengu", color: "#e84a5f" },
  { label: "What it is", value: "AI coding agent (CLI)", color: "#d4a853" },
  { label: "What it is NOT", value: "A Claude model", color: "#9b7ed9" },
  { label: "Telemetry prefix", value: "tengu_*", color: "#e84a5f" },
  { label: "Install", value: "npm i -g @anthropic-ai/claude-code", color: "#b8a8b0" },
];

const VAULT = [
  {
    id: "intro",
    act: "01",
    title: "Tengu Is Claude Code",
    about: "The internal name Anthropic engineers use for the Claude Code product — and nothing else.",
    files: [
      {
        name: "headline",
        title: "The one sentence",
        about: "Everything on this page follows from this",
        entries: [
          {
            type: "prose",
            text: `TENGU = CLAUDE CODE
──────────────────

Inside Anthropic, the terminal AI coding tool shipped
as Claude Code is nicknamed Tengu. When you install it,
run claude in your repo, or see tengu_ in a config file —
that is all the same product.

Tengu is not:
  · Claude (the chat model)
  · Opus, Sonnet, or Haiku
  · A model tier codename like Capybara or Fennec

Tengu is:
  · The agent harness — prompts, tools, permissions, UI
  · The npm package @anthropic-ai/claude-code
  · The namespace for every internal flag and event`,
          },
          {
            type: "code",
            label: "leaked config.ts documentation (paraphrased)",
            text: `// ~/.claude.json — read on every Claude Code startup
// from src/utils/config.ts (March 2026 source leak)

"Central persistent configuration file for
 Claude Code (internal codename: Tengu)"`,
          },
        ],
      },
      {
        name: "how-we-know",
        title: "How we know",
        about: "Public evidence for the link",
        entries: [
          {
            type: "prose",
            text: `EVIDENCE THE NAMES ARE LINKED
─────────────────────────────

March 31, 2026 — Anthropic accidentally shipped a .map
sourcemap inside a Claude Code npm update. Researchers
decompiled it within hours.

What showed up repeatedly:
  · "Tengu" as the product codename in config docs
  · Hundreds of keys prefixed tengu_ in feature flags
  · tengu_* analytics events in telemetry catalogs
  · undercover.ts — strips "Tengu" from external-repo builds

Boris Cherny (Claude Code engineer) confirmed the leak
was a packaging mistake, not intentional release.

None of this means Anthropic markets the tool as Tengu
to users. You install Claude Code. Engineers say Tengu.`,
          },
        ],
      },
    ],
  },
  {
    id: "claude-code",
    act: "02",
    title: "What Claude Code Actually Is",
    about: "Tengu names the product layer — the agent that runs in your terminal.",
    files: [
      {
        name: "harness",
        title: "The harness, not the brain",
        about: "Tengu wraps whichever Claude model you pick",
        entries: [
          {
            type: "prose",
            text: `WHAT YOU GET WHEN YOU RUN claude
────────────────────────────────

Claude Code (Tengu) is an agentic coding environment:

  · Loads your repo — git branch, recent commits, CLAUDE.md
  · Edits files, runs commands, grep/glob search
  · Asks permission before risky shell operations
  · Spawns subagents that inherit parent context
  · Connects MCP tools, IDE extensions, Chrome pairing
  · Auto-compacts context when the window fills up
  · Exposes 25+ hooks to intercept each lifecycle stage

The model does the reasoning. Tengu is the mountain
path — the harness, prompts, tool definitions, memory
index, terminal UI, and update channel that make a
model act as a coding agent in your project.`,
          },
          {
            type: "code",
            label: "user-facing vs internal",
            text: `YOU SEE                    ENGINEERS SEE
────────────────────────────────────────────
claude                     Tengu (codename)
Claude Code                Tengu
@anthropic-ai/claude-code  Tengu npm package
~/.claude.json             Tengu persistent state
tengu_amber_flint          Tengu feature gate`,
          },
        ],
      },
      {
        name: "inside-the-binary",
        title: "What's inside the Tengu package",
        about: "Same binary, two names depending on who's talking",
        entries: [
          {
            type: "prose",
            text: `ALL OF THIS SHIPS AS "CLAUDE CODE"
──────────────────────────────────

The leaked source showed the Tengu package is far more
than a chat wrapper. Behind tengu_* flags sit systems
users rarely see:

  · KAIROS — proactive background agent loop
  · Anti-distillation decoys in tool schemas
  · Magic Docs — self-updating files on idle
  · 3-layer memory (index → topic files → transcripts)
  · Permission critic — separate model call for safety
  · DRM-style request attestation in Bun's Zig layer

Every one of those subsystems lives in the codebase
whose internal product name is Tengu. When a flag like
tengu_auto_mode_opt_in appears in your config, it is
gating behavior inside Claude Code — not a model.`,
          },
        ],
      },
    ],
  },
  {
    id: "tengu-prefix",
    act: "03",
    title: "The tengu_ Prefix",
    about: "How the codename shows up in real Claude Code installs.",
    files: [
      {
        name: "namespace",
        title: "One product, one namespace",
        about: "Why every flag starts with tengu_",
        entries: [
          {
            type: "prose",
            text: `tengu_ IS A FINGERPRINT FOR CLAUDE CODE
────────────────────────────────────────

Anthropic prefixes the internal product name onto:
  · Statsig / GrowthBook feature gates
  · Dynamic experiment configs
  · Analytics and telemetry event names
  · UI tip variants and onboarding flags

Open ~/.claude.json on a machine with Claude Code and
you may find cached gates like tengu_hawthorn_window.
Scroll leak catalogs or Reddit threads from April 2026
and you'll find hundreds more.

If you see tengu_ in a log, config dump, or network
trace — that traffic came from the Claude Code CLI,
regardless of what Anthropic calls it publicly.`,
          },
          {
            type: "code",
            label: "sample tengu_* keys (from leak catalogs)",
            text: `tengu_amber_flint          → feature gate
tengu_hawthorn_window      → feature gate
tengu_session_counter      → analytics event
tengu_tool_search_mode     → tool routing
tengu_compact_streaming    → context compaction UI
tengu_mcp_elicitation      → MCP integration
tengu_auto_mode_opt_in     → proactive agent UX
tengu_voice_mode_available → voice mode notice
tengu_buddy_companion      → companion creature UI`,
          },
          {
            type: "prose",
            text: `WHAT THE FLAGS ACTUALLY TOGGLE
──────────────────────────────

These are not abstract lore — they control real Claude
Code behavior:

  · Terminal UI — progress bars, todo panels, spinners
  · Model routing — which model runs permission checks
  · Integrations — IDE auto-connect, Chrome extension
  · Agent modes — background tasks, streaming compact
  · Billing surfaces — subscription upsells, usage caps

The codename Tengu is not decorative. It is the
engineering namespace for the entire Claude Code system.`,
          },
        ],
      },
    ],
  },
  {
    id: "undercover",
    act: "04",
    title: "Hiding Tengu in Public",
    about: "Claude Code strips its own codename when working on open source.",
    files: [
      {
        name: "undercover-ts",
        title: "undercover.ts",
        about: "The one-way door between internal and external repos",
        entries: [
          {
            type: "prose",
            text: `WHY YOU WON'T SEE "TENGU" IN YOUR COMMITS
───────────────────────────────────────────

Leaked file: undercover.ts (~90 lines)

When Claude Code detects an external or open-source
repository, undercover mode turns on automatically.

It removes from prompts and outputs:
  · Tengu and other internal codenames
  · Internal Slack channel names
  · The product name "Claude Code" in some contexts

Critical detail: there is no force-off. External mode
is a one-way door — codenames cannot leak into public
GitHub even if an engineer forgets.

So the tool named Tengu is built to never say Tengu
outside Anthropic's walls. The mask has a name on the
inside of the mask.`,
          },
          {
            type: "code",
            label: "undercover behavior",
            text: `external / OSS repo
  → strip Tengu, Capybara, Fennec from prompts
  → agent cannot reference internal channels
  → one-way: no toggle back mid-session

internal Anthropic repo
  → full codename vocabulary available`,
          },
        ],
      },
    ],
  },
  {
    id: "why-named",
    act: "05",
    title: "Why Call Claude Code Tengu?",
    about: "Brief folklore context — only as it explains the engineering nickname.",
    files: [
      {
        name: "folklore-link",
        title: "The yōkai connection",
        about: "Mountain teacher spirit → terminal coding guide",
        entries: [
          {
            type: "prose",
            text: `WHY A TENGU FOR A CODING AGENT?
───────────────────────────────

Anthropic has not published an official naming rationale.
But Tengu (天狗) — Japanese mountain yōkai — maps cleanly
onto what Claude Code does:

YAMABUSHI GUIDE
  Tengu dress as mountain ascetics who lead people through
  dangerous terrain. Claude Code guides you through an
  unfamiliar codebase the same way.

TEACHER ON MOUNT KURAMA
  The daitengu Sōjōbō taught the warrior Yoshitsune by
  doing, not lecturing. The agent teaches by editing your
  actual files and running your actual tests.

FEATHER FAN
  Tengu fans stirred typhoon winds. Small agent actions —
  one file change, one command — can reshape a whole system.

tengu ni naru ("become a tengu")
  Japanese idiom for dangerous pride. Possibly self-aware
  humor from the team that built permission prompts and
  the "is this command safe?" critic loop.

The codename fits the product archetype: a powerful,
slightly uncanny guide you invite into your environment —
not the deity itself, but the spirit that knows the path.`,
          },
          {
            type: "ascii",
            label: "claude_code_as_tengu.ascii",
            art: `  $ claude

      ╭──────────────────────────╮
      │ 天狗 · TENGU              │
      │ public: Claude Code       │
      │ cwd: your_repo/           │
      │ flags: tengu_*            │
      │ model: [your pick]        │
      ╰──────────────────────────╯`,
          },
        ],
      },
    ],
  },
  {
    id: "cheatsheet",
    act: "06",
    title: "Cheat Sheet",
    about: "Quick reference for the Tengu ↔ Claude Code link.",
    files: [
      {
        name: "reference",
        title: "At a glance",
        about: "Pin this mentally",
        entries: [
          {
            type: "prose",
            text: `TENGU ↔ CLAUDE CODE CHEAT SHEET
────────────────────────────────

  Tengu            = Claude Code (internal only)
  Claude           = the AI models (separate codenames)
  tengu_*          = any Claude Code flag or event
  ~/.claude.json   = Tengu persistent state file
  claude CLI       = the user-facing Tengu binary
  undercover.ts    = hides "Tengu" on public repos

WHEN SOMEONE SAYS TENGU, ASK:
  "Do you mean Claude Code the tool?"
  If yes — you're aligned. If they mean a model, they're
  mixing up the harness with the brain.

DISCLAIMER
  Fan-made explainer. Not affiliated with Anthropic.
  Based on folklore research and publicly reported
  analysis of the March 2026 Claude Code source leak.`,
          },
        ],
      },
    ],
  },
];

function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatProse(text) {
  const blocks = text.split(/\n\n+/);
  let html = '<div class="prose">';

  for (const block of blocks) {
    const lines = block.split("\n");
    let i = 0;

    if (lines[i + 1] && /^[─═\-]+$/.test(lines[i + 1].trim())) {
      html += `<h3>${esc(lines[i])}</h3>`;
      i += 2;
    }

    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) {
        i++;
        continue;
      }

      if (/^  /.test(line)) {
        html += "<ul>";
        while (i < lines.length && /^  /.test(lines[i])) {
          const item = lines[i].trim().replace(/^·\s*/, "");
          html += `<li>${esc(item)}</li>`;
          i++;
        }
        html += "</ul>";
        continue;
      }

      if (
        /^[A-Z0-9][A-Z0-9\s()'\/—·:?]+$/.test(line.trim()) &&
        line.length < 72 &&
        i + 1 < lines.length &&
        /^  /.test(lines[i + 1])
      ) {
        html += `<h3>${esc(line)}</h3><ul>`;
        i++;
        while (i < lines.length && /^  /.test(lines[i])) {
          html += `<li>${esc(lines[i].trim())}</li>`;
          i++;
        }
        html += "</ul>";
        continue;
      }

      html += `<p>${esc(line)}</p>`;
      i++;
    }
  }

  html += "</div>";
  return html;
}

function renderEntry(entry) {
  if (entry.type === "system") return "";
  if (entry.type === "prose") return formatProse(entry.text);
  if (entry.type === "code") {
    return `<div class="code-panel">
      <span class="code-label">${esc(entry.label || "dump.txt")}</span>
      <pre>${esc(entry.text)}</pre>
    </div>`;
  }
  if (entry.type === "ascii") {
    return `<figure class="figure">
      <pre>${esc(entry.art)}</pre>
      <figcaption>${esc(entry.label || "diagram.ascii")}</figcaption>
    </figure>`;
  }
  return "";
}

function renderArticle(file, folder) {
  const body = file.entries.map((e) => renderEntry(e)).join("");
  return `<article class="article" id="${folder.id}-${file.name.replace(/\./g, "-")}">
    <h3 class="article-title">${esc(file.title)}</h3>
    <p class="article-about">${esc(file.about)}</p>
    ${body}
  </article>`;
}

function renderSection(folder) {
  return `<section class="section" id="${folder.id}">
    <header class="section-header">
      <p class="section-act">${esc(folder.act || "")}</p>
      <h2 class="section-title">${esc(folder.title)}</h2>
      <p class="section-about">${esc(folder.about)}</p>
    </header>
    ${folder.files.map((f) => renderArticle(f, folder)).join("")}
  </section>`;
}

function renderToc() {
  const toc = document.getElementById("toc");
  toc.innerHTML = `<h2>Sections</h2>${VAULT.map(
    (f) => `<a href="#${f.id}">${esc(f.title)}</a>`
  ).join("")}`;
}

function renderLinkFacts() {
  document.getElementById("link-facts").innerHTML = LINK_FACTS.map(
    (f) => `<div class="link-fact">
      <span class="link-label">${esc(f.label)}</span>
      <span class="link-value" style="color:${f.color}">${esc(f.value)}</span>
    </div>`
  ).join("");
}

function initTocObserver() {
  const links = [...document.querySelectorAll(".toc a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`)
          );
        }
      });
    },
    { rootMargin: "-15% 0px -60% 0px", threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
}

document.getElementById("content").innerHTML = VAULT.map(renderSection).join("");
renderToc();
renderLinkFacts();
initTocObserver();