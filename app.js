const CODENAMES = {
  tengu: {
    public: "Claude Code",
    internal: "Tengu",
    type: "product",
    color: "#ff4466",
    note: "terminal coding agent · npm @anthropic-ai/claude-code",
  },
  capybara: {
    public: "Mythos tier",
    internal: "Capybara",
    type: "model",
    color: "#b366ff",
    note: "1M context · fast mode · v8 in leaked source",
  },
  fennec: {
    public: "Opus-class",
    internal: "Fennec",
    type: "model",
    color: "#ffb000",
    note: "speculated Opus 4.6 in leak analysis",
  },
  numbat: {
    public: "unannounced",
    internal: "Numbat",
    type: "model",
    color: "#33ff88",
    note: "launch-window comment in leaked source",
  },
  karasu: {
    public: "crow-tengu",
    internal: "Karasu-Tengu",
    type: "folklore",
    color: "#8b5cf6",
    note: "小天狗 · bird-like mountain spirits",
  },
};

const VAULT = [
  {
    id: "00_briefing",
    act: "BRIEFING",
    scene: 0,
    title: "Start Here",
    about: "What this vault is and how to read the seven scenes.",
    path: "/internal/00_briefing",
    files: [
      {
        name: "README.txt",
        title: "Vault guide",
        about: "The one-minute version before the deep dive",
        kind: "text",
        entries: [
          {
            type: "prose",
            text: `TENGU_VAULT — INTERNAL CODENAME ARCHIVE
════════════════════════════════════════

WHAT YOU'RE READING
  A fan-made scroll explainer. Not official Anthropic.
  Folklore meets leaked engineering nomenclature.

THE HEADLINE
  Tengu = Claude Code. The terminal AI coding tool.
  NOT a model name. NOT Claude itself. The product.

THE EVIDENCE
  Leaked / decompiled Claude Code source (March 2026)
  references "Tengu" as the internal codename. Every
  feature flag, telemetry event, and experiment key in
  the CLI is prefixed tengu_ — hundreds of them.

  ~/.claude.json docs in the leak literally say:
  "central persistent configuration for Claude Code
  (internal codename: Tengu)."

THIS VAULT COVERS
  I   What Claude Code is under the hood name
  II  Anthropic's animal codename family
  III Japanese tengu folklore (the actual yōkai)
  IV  tengu_* flags, gates, and telemetry
  V   undercover.ts — codename suppression
  VI  Why a mountain bird-goblin for a coding agent
  VII ASCII shrine gallery

DISCLAIMER
  Folklore sections are cultural history. Leak sections
  summarize publicly reported reverse-engineering work.
  Anthropic has not officially branded Claude Code as
  Tengu — this is internal engineering nomenclature.`,
          },
        ],
      },
      {
        name: "acts.txt",
        title: "Scene map",
        about: "All seven sections on one page",
        kind: "text",
        entries: [
          {
            type: "prose",
            text: `RECORDING INDEX
─────────────────
  0  BRIEFING      ← you are here
  I  01_product    Tengu = Claude Code (the tool)
 II  02_codenames  Capybara, Fennec, Numbat…
III  03_folklore   The yōkai behind the name
 IV  04_internals  tengu_* prefix everywhere
  V  05_undercover Stripping codenames for OSS
 VI  06_parallel   Why the metaphor works
VII  07_gallery    ASCII tengu · loop resets

NEXT: ACT I — The Product`,
          },
        ],
      },
    ],
  },
  {
    id: "01_product",
    act: "ACT I",
    scene: 1,
    title: "The Product",
    about: "Tengu is Claude Code — Anthropic's terminal-based AI coding agent.",
    path: "/internal/01_product",
    files: [
      {
        name: "what_is_tengu.txt",
        title: "Definition",
        about: "Product, not model",
        kind: "text",
        entries: [
          { type: "system", text: "ACT I — identifying the entity" },
          {
            type: "prose",
            text: `TENGU ≠ A MODEL
────────────────

When engineers at Anthropic say "Tengu," they mean
Claude Code — the CLI tool you install via npm:

  npm install -g @anthropic-ai/claude-code
  claude

It is an agent harness: system prompts, tool use,
permission checks, MCP servers, subagents, hooks,
memory layers, and the terminal UI that wraps
whatever Claude model you've selected.

Models have their own codenames (Capybara/Mythos,
Fennec, Numbat). Tengu is the scaffolding around
them — the yamabushi guide, not the mountain.`,
          },
          {
            type: "code",
            label: "leak_reference.txt",
            text: `// from leaked config documentation (paraphrased)
// ~/.claude.json — read on every startup

"Central persistent configuration file for
 Claude Code (internal codename: Tengu)"

Source types: GlobalConfig, ProjectConfig
File: src/utils/config.ts`,
          },
        ],
      },
      {
        name: "what_claude_code_does.txt",
        title: "Capabilities",
        about: "What the Tengu harness actually runs",
        kind: "text",
        entries: [
          {
            type: "prose",
            text: `WHAT CLAUDE CODE (TENGU) DOES
──────────────────────────────

  · Reads your repo — git state, CLAUDE.md, file tree
  · Edits files, runs shell commands, greps, globs
  · Spawns forked subagents with inherited context
  · 25+ lifecycle hooks you can intercept
  · MCP tool integrations (browser, APIs, custom)
  · Permission prompts — "is this command safe?"
  · Auto-compact when context overflows
  · Voice mode, IDE bridge, Chrome extension pairing

The leaked source revealed far more behind flags:
KAIROS proactive mode, anti-distillation decoys,
DRM attestation in Bun's Zig HTTP layer, Magic Docs
that self-update on idle, and 44+ hidden experiments.

All of that ships inside the binary/npm package
nicknamed Tengu internally.`,
          },
        ],
      },
    ],
  },
  {
    id: "02_codenames",
    act: "ACT II",
    scene: 2,
    title: "The Menagerie",
    about: "Anthropic names models after animals and creatures. Tengu is the tool in that zoo.",
    path: "/internal/02_codenames",
    files: [
      {
        name: "pattern.txt",
        title: "Naming pattern",
        about: "Creatures, not SKUs",
        kind: "text",
        entries: [
          { type: "system", text: "ACT II — internal taxonomy" },
          {
            type: "prose",
            text: `ANTHROPIC'S CREATURE CODENAMES
──────────────────────────────

Anthropic engineers don't call unreleased models
"Model vNext" in source. They use animal and
mythical-creature names — a private vocabulary
that leaked when a .map sourcemap shipped in a
Claude Code npm update (March 31, 2026).

CONFIRMED / REPORTED IN LEAKS:
  Capybara  → Mythos tier (also called Mythos)
  Fennec    → widely speculated as Opus 4.6
  Numbat    → upcoming model, launch comment in src

THE TOOL IS DIFFERENT:
  Tengu     → Claude Code (the agent product)

Tengu sits beside the animal model names but
isn't one of them. It's the mountain shrine where
all the creatures are summoned to work.`,
          },
          {
            type: "code",
            label: "codename_table.tsv",
            text: `PUBLIC NAME        INTERNAL      KIND
─────────────────────────────────────────
Claude Code        Tengu         product/agent
Mythos tier        Capybara      model family
(likely Opus 4.6)  Fennec        model
(unannounced)      Numbat        model`,
          },
        ],
      },
    ],
  },
  {
    id: "03_folklore",
    act: "ACT III",
    scene: 3,
    title: "The Yōkai",
    about: "Tengu in Japanese folklore — bird-goblin warriors of the mountain.",
    path: "/internal/03_folklore",
    files: [
      {
        name: "origins.txt",
        title: "Origins",
        about: "Heavenly dog → mountain spirit",
        kind: "text",
        entries: [
          { type: "system", text: "ACT III — folklore transmission" },
          {
            type: "prose",
            text: `WHAT IS A TENGU? (天狗)
──────────────────────

Japanese: "heavenly dog" (天 dog + 狗 dog)
Pronounced: TEN-goo

A type of yōkai (supernatural being) and sometimes
kami (spirit) in Shinto belief. Neither fully god
nor fully monster — liminal, like good internal tools.

EARLIEST RECORDS (720 CE, Nihon Shoki):
  A shooting star called "celestial dog" — thunderous,
  famine follows. Buddhist priests later mapped the
  term onto mountain spirits.

CHINESE ROOT:
  Borrowed from tiāngǒu (天狗) — a fierce comet-demon.
  Japan transformed it into something uniquely its own.`,
          },
        ],
      },
      {
        name: "forms_and_ranks.txt",
        title: "Forms & ranks",
        about: "Daitengu, kotengu, the long nose",
        kind: "text",
        entries: [
          {
            type: "prose",
            text: `TWO KINDS OF TENGU
──────────────────

DAITENGU (大天狗) — "greater tengu"
  Humanoid mountain lords. Red face. Impossibly long
  nose (hanataka-tengu). Wear yamabushi ascetic robes
  and a small black cap (tokin). Carry a feather fan
  (hauchiwa) that can summon hurricane winds.

  Famous daitengu: Sōjōbō of Mount Kurama — the tengu
  who taught the samurai Minamoto no Yoshitsune sword
  and strategy. A teacher spirit.

KOTENGU (小天狗) — "lesser tengu"
  Karasu-tengu (烏天狗) — crow tengu. More bird than
  man. Wings, beak, claws. Mischievous, not regal.

THE LONG NOSE:
  Appears in art from the 14th century — possibly a
  humanization of a bird's beak. Linked to Sarutahiko
  Ōkami, a Shinto monkey/sun deity with a seven-hand-
  span nose. The nose became the iconic tengu silhouette.`,
          },
          {
            type: "ascii",
            label: "daitengu_silhouette.ascii",
            art: `            ╱╲
           ╱  ╲     ← tokin cap
          │ ◉  │
          │  │   │  ← the nose (legendary)
          │ ╲  ╱ │
         ╱│════│╲   ← yamabushi robes
        ╱ │ ╱╲ │ ╲
       ╱  │╱  ╲│  ╲
          ╱    ╲
         ╱ 扇  ╲    ← hauchiwa fan`,
          },
        ],
      },
      {
        name: "evolution.txt",
        title: "From demon to teacher",
        about: "Buddhist enemy → mountain protector",
        kind: "text",
        entries: [
          {
            type: "prose",
            text: `HOW TENGU CHANGED OVER CENTURIES
────────────────────────────────

12th–13th c. BUDDHIST VILLAINS
  Tengu mislead monks, kidnap priests, drop them on
  mountaintops, possess women, rob temples. Ghosts of
  arrogant priests who fell into the "tengu realm"
  (天狗道 tengudō).

VANITY WARNING
  Japanese idiom: tengu ni naru ("become a tengu")
  = someone swollen with pride. Hubris incarnate.

17th c. SOFTENING
  Tengu become protectors of mountains and forests.
  Associated with Shugendō — ascetic mountain practice.
  Yamabushi (mountain priests) and tengu share dress.

MODERN
  Tengu masks at festivals. Soccer team mascots.
  Kurama-Dera temple still sells tengu omamori charms.
  And now: a codename in a San Francisco terminal tool.`,
          },
        ],
      },
    ],
  },
  {
    id: "04_internals",
    act: "ACT IV",
    scene: 4,
    title: "tengu_* Internals",
    about: "Every flag, gate, and telemetry event in Claude Code carries the prefix.",
    path: "/internal/04_internals",
    files: [
      {
        name: "prefix_explainer.txt",
        title: "The prefix",
        about: "Why everything is tengu_something",
        kind: "text",
        entries: [
          { type: "system", text: "ACT IV — parsing ~/.claude.json internals" },
          {
            type: "prose",
            text: `THE tengu_ PREFIX
──────────────────

Inside Claude Code's codebase, the internal product
name "Tengu" prefixes:

  · Feature gates (Statsig / GrowthBook experiments)
  · Dynamic config keys
  · Analytics / telemetry event names
  · Tip variant IDs
  · UI experiment flags

If you open ~/.claude.json on a machine with Claude
Code installed, you may see cached gate values whose
keys start with tengu_. Reddit threads and gists from
the March 2026 leak catalogued hundreds of them.

This is standard eng hygiene: one namespace so event
dashboards don't collide with other Anthropic products.
The product codename becomes the telemetry namespace.`,
          },
          {
            type: "code",
            label: "sample_flags.txt",
            text: `# representative tengu_* keys (from leak catalogs)
# not exhaustive — hundreds exist

tengu_amber_flint          # feature gate
tengu_hawthorn_window      # feature gate
tengu_3p_cookies_default   # browser / Chrome integration
tengu_session_counter      # analytics event
tengu_tool_search_mode     # tool routing experiment
tengu_compact_streaming    # context compaction UI
tengu_mcp_elicitation      # MCP server prompts
tengu_auto_mode_opt_in     # proactive agent UX
tengu_voice_mode_available # voice feature notice
tengu_buddy_companion      # companion creature system`,
          },
          {
            type: "prose",
            text: `WHAT THEY CONTROL (CATEGORIES)
──────────────────────────────

  UI experiments — terminal progress bars, todo
  panels, spinner trees, copy-on-select behavior

  Model routing — which model handles permission
  checks, compaction, subagent forks

  Integrations — MCP, Chrome extension, IDE auto-
  connect, tmux vs iTerm2 split panes

  Billing upsells — subscription notices, Sonnet-1M
  welcome flows, overage credit grants

  Agent modes — background tasks, KAIROS proactive
  loop, anti-distillation fake tool injection

Seeing tengu_ in a network log or config dump is a
fingerprint: this traffic came from Claude Code.`,
          },
        ],
      },
    ],
  },
  {
    id: "05_undercover",
    act: "ACT V",
    scene: 5,
    title: "Undercover Mode",
    about: "How Anthropic strips codenames before Claude Code touches external repos.",
    path: "/internal/05_undercover",
    files: [
      {
        name: "undercover.ts",
        title: "One-way door",
        about: "No Tengu in open source",
        kind: "text",
        entries: [
          { type: "system", text: "ACT V — undercover.ts · ~90 lines in leak" },
          {
            type: "prose",
            text: `UNDERCOVER MODE
───────────────

Leaked file: undercover.ts

When Claude Code runs against external / open-source
repositories, undercover mode activates automatically.

WHAT GETS STRIPPED:
  · Internal codenames (Tengu, Capybara, Fennec…)
  · Internal Slack channel references
  · The name "Claude Code" itself in some contexts

CRITICAL DESIGN: NO FORCE-OFF
  Undercover is a one-way door. Once you're in
  external-repo mode, codenames cannot leak back
  into commits, comments, or generated text.

WHY:
  Product security. Internal names were never meant
  for public GitHub. Automatic suppression beats
  hoping engineers remember to self-censor.

IRONIC RESULT:
  The tool built to hide "Tengu" is itself named
  Tengu. The mask has a name written on the inside.`,
          },
          {
            type: "code",
            label: "undercover_behavior.txt",
            text: `external repo detected
  → strip internal codenames from prompts
  → agent cannot say "Claude Code" or "Tengu"
  → cannot reference Anthropic internal channels
  → one-way: no toggle back mid-session

internal / Anthropic repos
  → full codename vocabulary available`,
          },
        ],
      },
    ],
  },
  {
    id: "06_parallel",
    act: "ACT VI",
    scene: 6,
    title: "Why Tengu",
    about: "The folklore ↔ coding-agent parallel Anthropic probably intended.",
    path: "/internal/06_parallel",
    files: [
      {
        name: "mapping.txt",
        title: "The mapping",
        about: "Mountain teacher → terminal teacher",
        kind: "text",
        entries: [
          { type: "system", text: "ACT VI — pattern matching" },
          {
            type: "prose",
            text: `WHY A TENGU FOR A CODING AGENT?
────────────────────────────────

Anthropic hasn't published an official statement on
the naming choice. But the parallels are almost
too clean:

YAMABUSHI GUIDE
  Tengu appear as mountain ascetics (yamabushi) —
  priests who mastered dangerous terrain. Claude Code
  guides devs through unfamiliar codebases, prod
  incidents, and refactors. Same archetype: the
  expert who walks beside you on the cliff path.

TEACHER OF YOSHITSUNE
  Sōjōbō trained Japan's greatest warrior on Mount
  Kurama. The agent teaches through doing — edits,
  explains, demonstrates patterns in your actual repo.

THE FEATHER FAN (羽団扇)
  Stirred typhoon winds. The coding agent stirs
  file trees, test suites, deploy pipelines — small
  gestures with outsized effects on your system.

LONG NOSE / FAR SIGHT
  Tengu see trouble coming. The agent reads linter
  output, git blame, type errors before you scroll
  there. Probabilistic foresight, mythologized.

PRIDE WARNING (tengu ni naru)
  Folklore tengu are vain. Engineers joke about AI
  overconfidence. The name might be self-aware humor
  from the team that built permission prompts and
  the "critic" safety side-query.

MYSTERIOUS VIBE
  Tengu are cool, obscure, slightly threatening,
  deeply Japanese — fits Anthropic's taste for
  mythic names over corporate acronyms.`,
          },
        ],
      },
    ],
  },
  {
    id: "07_gallery",
    act: "ACT VII",
    scene: 7,
    title: "Shrine Gallery",
    about: "ASCII artifacts · then the vault loops.",
    path: "/internal/07_gallery",
    files: [
      {
        name: "gallery.log",
        title: "Render queue",
        about: "Three sketches · loop",
        kind: "text",
        entries: [
          { type: "system", text: "ACT VII — rendering shrine assets" },
          {
            type: "ascii",
            label: "kurama_shrine.ascii",
            art: `     ╔═══════════════════════════════╗
     ║  ⛩  MOUNT KURAMA · 鞍馬山      ║
     ║  where Sōjōbō taught Yoshitsune ║
     ║  now: where Tengu teaches git    ║
     ╚═══════════════════════════════╝`,
          },
          {
            type: "ascii",
            label: "claude_code_invocation.ascii",
            art: `  $ npm i -g @anthropic-ai/claude-code
  $ claude

      ╭──────────────────────╮
      │ 天狗 · TENGU ONLINE   │
      │ cwd: your_repo/       │
      │ model: [selected]     │
      │ flags: tengu_* × N    │
      ╰──────────────────────╯`,
          },
          {
            type: "ascii",
            label: "tengu_ni_naru.ascii",
            art: `   ┌─────────────────────────┐
   │  WARNING: tengu ni naru   │
   │  天狗になる · pride event   │
   │  confidence > evidence    │
   │  >> run tests <<          │
   └─────────────────────────┘`,
          },
          { type: "system", text: "REWIND → ACT I / The Product" },
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
  if (entry.type === "system") {
    if (entry.text.startsWith("REWIND")) return "";
    return `<div class="callout">${esc(entry.text)}</div>`;
  }
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
      <figcaption>${esc(entry.label || "shrine.ascii")}</figcaption>
    </figure>`;
  }
  return "";
}

function renderArticle(file, folder) {
  const asciiEntries = file.entries.filter((e) => e.type === "ascii");
  const otherEntries = file.entries.filter((e) => e.type !== "ascii");
  const isGallery = folder.id === "07_gallery" && asciiEntries.length > 1;

  let body = otherEntries.map((e) => renderEntry(e)).join("");

  if (asciiEntries.length) {
    if (isGallery) {
      body += `<div class="gallery-grid">${asciiEntries.map((e) => renderEntry(e)).join("")}</div>`;
    } else {
      body += asciiEntries.map((e) => renderEntry(e)).join("");
    }
  }

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
    (f) =>
      `<a href="#${f.id}"><span class="toc-act">${esc(f.act || "")}</span>${esc(f.title)}</a>`
  ).join("")}`;
}

function renderCodenames() {
  document.getElementById("codename-cards").innerHTML = Object.values(CODENAMES)
    .map(
      (e) => `<div class="codename-card">
        <div class="name" style="color:${e.color}">${esc(e.internal)}</div>
        <div class="public">${esc(e.public)}</div>
        <div class="note">${esc(e.type)} · ${esc(e.note)}</div>
      </div>`
    )
    .join("");
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
renderCodenames();
initTocObserver();
