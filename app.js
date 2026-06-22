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
  A fan-made terminal explainer. Not official Anthropic.
  Built in the style of recovered internal docs.

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
        about: "Seven folders · auto-play order",
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

const terminal = document.getElementById("terminal");
const fileTree = document.getElementById("file-tree");
const entityList = document.getElementById("entity-list");
const truthBody = document.getElementById("truth-body");
const speedBtn = document.getElementById("speed-btn");
const cmdLine = document.getElementById("cmd-line");
const cwdEl = document.getElementById("cwd");
const openFileEl = document.getElementById("open-file");

let speed = 1;
let folderIdx = 0;
let fileIdx = 0;
let entryIdx = 0;
let flagCount = 0;
let asciiCount = 0;
let typingTimer = null;

function pad(n) {
  return String(n).padStart(2, "0");
}

function timestamp() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function randomHex(len) {
  const chars = "0123456789abcdef";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * 16)];
  return out;
}

function initSidebar() {
  Object.entries(CODENAMES).forEach(([key, e]) => {
    const li = document.createElement("li");
    li.className = `entity ${key}`;
    li.innerHTML = `
      <span class="alias" style="color:${e.color}">${e.internal}</span>
      <span class="claim">${e.public}</span>
      <span class="true-id">${e.type} · ${e.note}</span>
    `;
    entityList.appendChild(li);

    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${e.public}</td><td>${e.internal}</td><td>${e.type}</td>`;
    truthBody.appendChild(tr);
  });
}

function buildFileTree() {
  fileTree.innerHTML = "";

  VAULT.forEach((folder, fi) => {
    const block = document.createElement("div");
    block.className = "tree-folder";
    block.innerHTML = `
      <div class="tree-folder-name" data-folder="${fi}">
        📁 ${folder.id}
        <span class="folder-label">${folder.act ? `${folder.act} · ` : ""}${folder.title}</span>
      </div>
      <div class="folder-about">${folder.about}</div>`;

    const files = document.createElement("div");
    files.className = "tree-files";
    folder.files.forEach((file, fii) => {
      const el = document.createElement("span");
      el.className = "tree-file";
      el.dataset.folder = fi;
      el.dataset.file = fii;
      el.innerHTML = `${file.name} <span class="file-label">— ${file.title}</span>`;
      files.appendChild(el);
      files.appendChild(document.createElement("br"));
    });
    block.appendChild(files);
    fileTree.appendChild(block);
  });

  fileTree.querySelectorAll(".tree-folder-name").forEach((el) => {
    el.addEventListener("click", () => openFolder(Number(el.dataset.folder)));
  });
  fileTree.querySelectorAll(".tree-file").forEach((el) => {
    el.addEventListener("click", () => openFile(Number(el.dataset.folder), Number(el.dataset.file)));
  });
}

function setActiveTree(folderI, fileI) {
  fileTree.querySelectorAll(".tree-folder-name, .tree-file").forEach((n) => n.classList.remove("active"));
  const folderEl = fileTree.querySelector(`.tree-folder-name[data-folder="${folderI}"]`);
  if (folderEl) folderEl.classList.add("active");
  if (fileI !== undefined) {
    const fileEl = fileTree.querySelector(`.tree-file[data-folder="${folderI}"][data-file="${fileI}"]`);
    if (fileEl) fileEl.classList.add("active");
  }
}

function updateUI() {
  const folder = VAULT[folderIdx];
  const file = folder?.files[fileIdx];
  const sceneTotal = VAULT.filter((f) => f.scene > 0).length;
  const sceneProgress = folder?.scene > 0 ? folder.scene : 0;
  const lorePct = Math.min(100, 20 + folderIdx * 12);

  document.getElementById("bar-lore").style.width = `${lorePct}%`;
  document.getElementById("val-lore").textContent = `${lorePct}%`;
  document.getElementById("bar-flags").style.width = `${Math.min(100, flagCount * 8)}%`;
  document.getElementById("val-flags").textContent = String(flagCount);
  document.getElementById("bar-ascii").style.width = `${Math.min(100, asciiCount * 25)}%`;
  document.getElementById("val-ascii").textContent = String(asciiCount);
  document.getElementById("bar-section").style.width = `${(sceneProgress / sceneTotal) * 100}%`;
  document.getElementById("val-section").textContent = folder?.act || "—";
  document.getElementById("checksum").textContent = `SHA256: ${randomHex(8)}…${randomHex(4)}`;

  if (folder && file) {
    cwdEl.textContent = folder.path;
    cmdLine.textContent = `cat ${folder.path}/${file.name}`;
    openFileEl.innerHTML = `
      <span class="file-path">${folder.act ? `${folder.act} · ` : ""}${folder.title} → ${file.title}</span>
      <span class="file-meta">${folder.about}</span>
      <span class="file-meta">${file.about}</span>
    `;
    setActiveTree(folderIdx, fileIdx);
  }
}

function appendLine(html, className = "line") {
  const div = document.createElement("div");
  div.className = className;
  div.innerHTML = html;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
  return div;
}

function createEntryLine(entry) {
  const div = document.createElement("div");
  div.className = "line";

  if (entry.type === "system") {
    div.classList.add("system");
    div.innerHTML = `<span class="ts">[${timestamp()}]</span><span class="text">// ${entry.text}</span>`;
    return { el: div, mode: "instant" };
  }

  if (entry.type === "prose") {
    div.classList.add("prose");
    div.innerHTML = `<span class="text"></span>`;
    return { el: div, mode: "type", text: entry.text };
  }

  if (entry.type === "code") {
    div.classList.add("code-block");
    flagCount += (entry.text.match(/tengu_/g) || []).length || 3;
    updateUI();
    div.innerHTML = `
      <span class="code-label">${entry.label || "dump.txt"}</span>
      <pre class="code-art"></pre>`;
    return { el: div, mode: "code", text: entry.text };
  }

  if (entry.type === "ascii") {
    div.classList.add("ascii");
    div.innerHTML = `
      <div class="ascii-wrap drawing" data-label="${entry.label || "shrine.ascii"}">
        <pre class="ascii-art"></pre>
      </div>`;
    return { el: div, mode: "ascii", art: entry.art };
  }

  return { el: div, mode: "instant" };
}

function typeText(el, text, idx, done) {
  const span = el.querySelector(".text");
  if (!span || idx >= text.length) {
    done();
    return;
  }
  span.textContent += text[idx];
  const ch = text[idx];
  let delay = 22;
  if (ch === "\n") delay = 36;
  else if (ch === "·" || ch === "—") delay = 120;
  else if (ch === " ") delay = 12;
  typingTimer = setTimeout(() => typeText(el, text, idx + 1, done), (delay + Math.random() * 10) / speed);
}

function typeCode(el, text, idx, done) {
  const pre = el.querySelector(".code-art");
  if (!pre || idx >= text.length) {
    pre?.classList.add("done");
    done();
    return;
  }
  pre.textContent += text[idx];
  const ch = text[idx];
  let delay = 6;
  if (ch === "\n") delay = 28;
  typingTimer = setTimeout(() => typeCode(el, text, idx + 1, done), (delay + Math.random() * 6) / speed);
}

function typeAscii(el, art, lineIdx, charIdx, done) {
  const pre = el.querySelector(".ascii-art");
  const wrap = el.querySelector(".ascii-wrap");
  const lines = art.split("\n");

  if (lineIdx >= lines.length) {
    wrap.classList.remove("drawing");
    pre.classList.add("done");
    asciiCount++;
    updateUI();
    done();
    return;
  }

  const line = lines[lineIdx];
  if (charIdx < line.length) {
    const current = pre.textContent.split("\n");
    current[lineIdx] = (current[lineIdx] ?? "") + line[charIdx];
    pre.textContent = current.join("\n");
    typingTimer = setTimeout(() => typeAscii(el, art, lineIdx, charIdx + 1, done), (8 + Math.random() * 10) / speed);
    return;
  }

  pre.textContent = lines.slice(0, lineIdx + 1).join("\n");
  typingTimer = setTimeout(() => typeAscii(el, art, lineIdx + 1, 0, done), (70 + Math.random() * 50) / speed);
}

function showFileHeader(folder, file) {
  const act = folder.act ? `<span style="color:var(--term-amber)">${folder.act}</span> · ` : "";
  appendLine(`<span class="text">${act}<strong>${folder.title}</strong> — ${file.title}</span>`, "line file-header");
  appendLine(`<span class="text" style="opacity:.6">${folder.about}</span>`, "line file-header");
  appendLine(`<span class="text" style="opacity:.45;font-size:10px">${file.about}</span>`, "line file-header");
}

function playEntry(done) {
  const folder = VAULT[folderIdx];
  const file = folder.files[fileIdx];
  const entry = file.entries[entryIdx];

  if (!entry) {
    entryIdx = 0;
    fileIdx++;
    if (fileIdx >= folder.files.length) {
      fileIdx = 0;
      folderIdx++;
      if (folderIdx >= VAULT.length) {
        folderIdx = 1;
        flagCount = 0;
        asciiCount = 0;
        appendLine(`<span class="text">// looping back to ACT I...</span>`, "line system");
        typingTimer = setTimeout(() => openFolder(1), 1400 / speed);
        return;
      }
      openFolder(folderIdx);
      return;
    }
    openFile(folderIdx, fileIdx);
    return;
  }

  updateUI();
  const { el, mode, text, art } = createEntryLine(entry);
  terminal.appendChild(el);
  terminal.scrollTop = terminal.scrollHeight;

  if (window.TenguFX) {
    if (entry.type === "code") window.TenguFX.pulse(0.55);
    else if (entry.type === "ascii") window.TenguFX.pulse(0.65);
    else if (entry.type === "system") window.TenguFX.pulse(0.2);
    else window.TenguFX.pulse(0.12);
  }

  const gap = entry.type === "code" ? 350 : entry.type === "ascii" ? 500 : 400;

  const next = () => {
    entryIdx++;
    typingTimer = setTimeout(() => playEntry(done), (gap + Math.random() * 200) / speed);
  };

  if (mode === "instant") {
    setTimeout(next, (350 + Math.random() * 150) / speed);
    return;
  }
  if (mode === "ascii") {
    typeAscii(el, art, 0, 0, () => setTimeout(next, (500 + Math.random() * 200) / speed));
    return;
  }
  if (mode === "code") {
    typeCode(el, text, 0, () => setTimeout(next, (400 + Math.random() * 200) / speed));
    return;
  }
  typeText(el, text, 0, next);
}

function openFolder(fi) {
  folderIdx = fi;
  fileIdx = 0;
  entryIdx = 0;
  terminal.innerHTML = "";
  const folder = VAULT[folderIdx];
  appendLine(`<span class="text">$ cd ${folder.path}</span>`, "line cmd");
  const act = folder.act ? `<span style="color:var(--term-amber)">${folder.act}</span> · ` : "";
  appendLine(`<span class="text">${act}<strong>${folder.title}</strong></span>`, "line system");
  appendLine(`<span class="text" style="opacity:.65">${folder.about}</span>`, "line system");
  folder.files.forEach((f) => {
    appendLine(`<span class="text">  📄 ${f.name} — ${f.title}</span>`, "line system");
  });
  updateUI();
  typingTimer = setTimeout(() => openFile(folderIdx, 0), 800 / speed);
}

function openFile(fi, fii) {
  folderIdx = fi;
  fileIdx = fii;
  entryIdx = 0;
  terminal.innerHTML = "";
  const folder = VAULT[folderIdx];
  const file = folder.files[fileIdx];
  showFileHeader(folder, file);
  updateUI();
  playEntry(() => {});
}

speedBtn.addEventListener("click", () => {
  const speeds = [1, 2, 4];
  speed = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
  speedBtn.textContent = `[${speed}x]`;
});

document.getElementById("session-id").textContent = `SES-${randomHex(6).toUpperCase()}`;
initSidebar();
buildFileTree();
updateUI();
setInterval(() => {
  document.getElementById("clock").textContent = timestamp();
}, 1000);

openFolder(0);