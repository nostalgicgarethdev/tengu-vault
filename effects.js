/**
 * TENGU_VAULT FX
 * flow-field · matrix rain · parallax · glitch · bursts · cursor trail
 */
(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "fx-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const matrixCanvas = document.getElementById("matrix-canvas");
  const mctx = matrixCanvas?.getContext("2d");

  const ringHost = document.createElement("div");
  ringHost.className = "ring-field";
  ringHost.setAttribute("aria-hidden", "true");
  document.body.prepend(ringHost);

  const ctx = canvas.getContext("2d");
  const shell = document.getElementById("shell");
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");
  const hexField = document.getElementById("hex-field");

  let w = 0;
  let h = 0;
  let dpr = 1;
  let t = 0;
  let mx = 0.5;
  let my = 0.5;
  let smoothMx = 0.5;
  let smoothMy = 0.5;

  const PARTICLE_COUNT = 2400;
  const particles = [];
  const bursts = [];
  const matrixCols = [];
  const HEX_CHARS = "01█░▒▓TENGUCODE_CAPYFENN";

  // ── Flow field particles ──────────────────────────────────────
  function flowAngle(x, y, time) {
    const n1 = Math.sin(x * 0.003 + time * 0.0004) + Math.cos(y * 0.0025 - time * 0.0003);
    const n2 = Math.sin((x + y) * 0.0018 + time * 0.0002) * 1.4;
    const n3 = Math.cos(x * 0.0012 - y * 0.0016 + time * 0.00035);
    return (n1 + n2 + n3) * Math.PI;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (matrixCanvas && mctx) {
      matrixCanvas.width = w * dpr;
      matrixCanvas.height = h * dpr;
      matrixCanvas.style.width = `${w}px`;
      matrixCanvas.style.height = `${h}px`;
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initMatrix();
    }
  }

  function seedParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: 0.35 + Math.random() * 0.85,
        hue: Math.random() < 0.55 ? 350 : 42,
        bright: 0.35 + Math.random() * 0.65,
      });
    }
  }

  // ── Matrix rain (edges) ─────────────────────────────────────
  function initMatrix() {
    matrixCols.length = 0;
    const colW = 14;
    const cols = Math.ceil(w / colW);
    for (let i = 0; i < cols; i++) {
      const edge = i < cols * 0.15 || i > cols * 0.85;
      if (!edge && Math.random() > 0.25) continue;
      matrixCols.push({
        x: i * colW,
        y: Math.random() * h,
        speed: 1.2 + Math.random() * 2.5,
        chars: Array.from({ length: 12 }, () => HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]),
      });
    }
  }

  function drawMatrix() {
    if (!mctx) return;
    mctx.fillStyle = "rgba(10, 10, 6, 0.08)";
    mctx.fillRect(0, 0, w, h);
    mctx.font = "11px IBM Plex Mono, monospace";
    for (const col of matrixCols) {
      col.y += col.speed + mid * 2;
      if (col.y > h + 120) col.y = -120;
      for (let i = 0; i < col.chars.length; i++) {
        const yy = col.y - i * 14;
        if (yy < -20 || yy > h + 20) continue;
        const alpha = Math.max(0, 0.55 - i * 0.045) * (0.4 + bass * 0.5);
        mctx.fillStyle = i === 0 ? `rgba(255,68,102,${alpha + 0.2})` : `rgba(138,46,66,${alpha})`;
        if (Math.random() < 0.02) col.chars[i] = HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
        mctx.fillText(col.chars[i], col.x, yy);
      }
    }
  }

  // ── Floating hex debris ───────────────────────────────────────
  function spawnHexDebris(n = 6) {
    if (!hexField) return;
    for (let i = 0; i < n; i++) {
      const el = document.createElement("span");
      el.className = "hex-debris";
      el.textContent = Math.random().toString(16).slice(2, 10).toUpperCase();
      el.style.left = `${10 + Math.random() * 80}%`;
      el.style.top = `${10 + Math.random() * 80}%`;
      el.style.animationDuration = `${3 + Math.random() * 4}s`;
      hexField.appendChild(el);
      setTimeout(() => el.remove(), 7000);
    }
  }

  // ── Particle bursts ───────────────────────────────────────────
  function spawnBurst(intensity = 0.5, x = w / 2, y = h * 0.48) {
    const count = Math.floor(20 + intensity * 40);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6 * intensity;
      bursts.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        hue: Math.random() < 0.5 ? 350 : 42,
      });
    }
  }

  function drawBursts() {
    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i];
      b.x += b.vx;
      b.y += b.vy;
      b.life -= 0.028;
      if (b.life <= 0) {
        bursts.splice(i, 1);
        continue;
      }
      ctx.globalCompositeOperation = "lighter";
      ctx.beginPath();
      ctx.shadowBlur = 14;
      ctx.shadowColor = b.hue > 100 ? "#ff4466" : "#c9b458";
      ctx.fillStyle = `hsla(${b.hue}, 100%, 60%, ${b.life * 0.8})`;
      ctx.arc(b.x, b.y, 1.5 + b.life * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

  // ── Audio hum ─────────────────────────────────────────────────
  let audioCtx = null;
  let analyser = null;
  let audioOn = false;
  let bass = 0;
  let mid = 0;
  let high = 0;
  let pulseBoost = 0;

  function startAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    const buf = analyser.frequencyBinCount;
    const data = new Uint8Array(buf);

    const osc1 = audioCtx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 52;
    const osc2 = audioCtx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.value = 104;
    const noise = audioCtx.createBufferSource();
    const nb = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
    const arr = nb.getChannelData(0);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() * 2 - 1) * 0.04;
    noise.buffer = nb;
    noise.loop = true;
    const gain = audioCtx.createGain();
    gain.gain.value = 0.045;
    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.12;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    osc1.connect(gain);
    osc2.connect(gain);
    noise.connect(gain);
    gain.connect(analyser);
    analyser.connect(audioCtx.destination);
    osc1.start();
    osc2.start();
    noise.start();
    lfo.start();
    audioOn = true;

    (function readAudio() {
      if (!audioOn) return;
      analyser.getByteFrequencyData(data);
      let b = 0, m = 0, hi = 0;
      for (let i = 0; i < buf; i++) {
        if (i < 8) b += data[i];
        else if (i < 32) m += data[i];
        else hi += data[i];
      }
      bass = b / (8 * 255);
      mid = m / (24 * 255);
      high = hi / ((buf - 32) * 255);
      requestAnimationFrame(readAudio);
    })();
  }

  function stopAudio() {
    audioOn = false;
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
      analyser = null;
    }
    bass = mid = high = 0;
  }

  function buildRings() {
    ringHost.innerHTML = Array.from({ length: 7 }, (_, i) =>
      `<div class="pulse-ring" style="--i:${i}"><span class="ring-core"></span></div>`
    ).join("");
  }

  function drawParticles() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(10, 10, 6, 0.1)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";

    for (const p of particles) {
      const angle = flowAngle(p.x, p.y, t);
      const pull = (smoothMx - 0.5) * 0.15;
      p.x += Math.cos(angle + pull) * p.speed;
      p.y += Math.sin(angle) * p.speed;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const flicker = 0.55 + Math.sin(t * 0.01 + p.x * 0.02) * 0.25;
      const alpha = p.bright * flicker * (0.55 + bass * 0.45 + pulseBoost * 0.3);
      ctx.beginPath();
      ctx.shadowBlur = 10 + high * 18 + pulseBoost * 12;
      ctx.shadowColor = p.hue > 100 ? "rgba(255,68,102,0.9)" : "rgba(201,180,88,0.85)";
      ctx.fillStyle = `hsla(${p.hue}, 90%, ${p.hue > 100 ? 62 : 58}%, ${alpha})`;
      ctx.arc(p.x, p.y, 1.1 + mid * 1.8 + pulseBoost * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    drawBursts();
    ctx.globalCompositeOperation = "source-over";
  }

  function updateParallax() {
    smoothMx += (mx - smoothMx) * 0.06;
    smoothMy += (my - smoothMy) * 0.06;
    document.documentElement.style.setProperty("--mx", String(smoothMx));
    document.documentElement.style.setProperty("--my", String(smoothMy));

    ringHost.style.left = `${50 + (smoothMx - 0.5) * 8}%`;
    ringHost.style.top = `${48 + (smoothMy - 0.5) * 6}%`;

    if (cursorDot && cursorRing) {
      const cx = mx * w;
      const cy = my * h;
      cursorDot.style.transform = `translate(${cx}px, ${cy}px)`;
      cursorRing.style.transform = `translate(${cx}px, ${cy}px) scale(${1 + bass * 0.4 + pulseBoost * 0.3})`;
    }
  }

  function updateRingDOM() {
    const energy = 0.35 + bass * 0.9 + mid * 0.4 + pulseBoost * 0.6;
    const scale = 1 + bass * 0.22 + pulseBoost * 0.15;
    const opacity = 0.12 + mid * 0.35 + pulseBoost * 0.25;
    ringHost.style.setProperty("--ring-energy", String(energy));
    ringHost.style.setProperty("--ring-scale", String(scale));
    ringHost.style.setProperty("--ring-opacity", String(Math.min(opacity, 0.85)));
    pulseBoost *= 0.91;
  }

  function glitchSurge(heavy = false) {
    document.body.classList.add(heavy ? "glitch-heavy" : "glitch-surge");
    document.body.classList.add("chromatic-on");
    clearTimeout(window._glitchT);
    window._glitchT = setTimeout(() => {
      document.body.classList.remove("glitch-surge", "glitch-heavy", "chromatic-on");
    }, heavy ? 420 : 220);
  }

  function tick() {
    t++;
    if (t % 2 === 0) drawParticles();
    if (t % 3 === 0) drawMatrix();
    updateParallax();
    updateRingDOM();

    if (t % 400 === 0) glitchSurge(false);
    if (t % 900 === 0) spawnHexDebris(4);

    requestAnimationFrame(tick);
  }

  window.TenguFX = {
    pulse(amount = 0.5) {
      pulseBoost = Math.min(1, pulseBoost + amount);
      document.body.classList.add("bloom-hit");
      spawnBurst(amount, w * (0.35 + smoothMx * 0.3), h * (0.4 + smoothMy * 0.15));
      if (amount > 0.6) glitchSurge(true);
      else if (amount > 0.35) glitchSurge(false);
      if (amount > 0.5) spawnHexDebris(3);
      clearTimeout(window._bloomT);
      window._bloomT = setTimeout(() => document.body.classList.remove("bloom-hit"), 320);
    },
    toggleAudio() {
      if (audioOn) {
        stopAudio();
        return false;
      }
      startAudio();
      if (audioCtx?.state === "suspended") audioCtx.resume();
      return true;
    },
    isAudioOn: () => audioOn,
  };

  resize();
  seedParticles();
  buildRings();
  spawnHexDebris(8);

  window.addEventListener("resize", () => {
    resize();
    seedParticles();
  });

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX / w;
    my = e.clientY / h;
  });

  document.addEventListener("click", (e) => {
    spawnBurst(0.35, e.clientX, e.clientY);
    window.TenguFX.pulse(0.2);
  });

  const soundBtn = document.getElementById("sound-btn");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      const on = window.TenguFX.toggleAudio();
      soundBtn.textContent = on ? "[WIND:ON]" : "[WIND:OFF]";
      soundBtn.classList.toggle("active", on);
    });
  }

  if (shell) shell.classList.add("parallax-ready");
  requestAnimationFrame(tick);
})();