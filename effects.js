/**
 * TENGU_VAULT — ambient mountain mist FX
 */
(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "fx-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const matrixCanvas = document.getElementById("matrix-canvas");
  const mctx = matrixCanvas?.getContext("2d");
  const ctx = canvas.getContext("2d");

  let w = 0;
  let h = 0;
  let dpr = 1;
  let t = 0;
  let mx = 0.5;
  let my = 0.5;
  let smoothMx = 0.5;
  let smoothMy = 0.5;

  const PARTICLE_COUNT = 1200;
  const particles = [];
  const HEX_CHARS = "天狗TENGUCODE_";

  function flowAngle(x, y, time) {
    const n1 = Math.sin(x * 0.002 + time * 0.0003) + Math.cos(y * 0.002 - time * 0.00025);
    const n2 = Math.sin((x + y) * 0.0014 + time * 0.00015) * 1.2;
    return (n1 + n2) * Math.PI;
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
        speed: 0.2 + Math.random() * 0.5,
        hue: Math.random() < 0.5 ? 350 : 42,
        bright: 0.25 + Math.random() * 0.45,
      });
    }
  }

  const matrixCols = [];

  function initMatrix() {
    matrixCols.length = 0;
    const colW = 16;
    const cols = Math.ceil(w / colW);
    for (let i = 0; i < cols; i++) {
      if (i > cols * 0.12 && i < cols * 0.88 && Math.random() > 0.12) continue;
      matrixCols.push({
        x: i * colW,
        y: Math.random() * h,
        speed: 0.6 + Math.random() * 1.2,
        chars: Array.from({ length: 8 }, () => HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]),
      });
    }
  }

  function drawMatrix() {
    if (!mctx) return;
    mctx.fillStyle = "rgba(12, 10, 16, 0.06)";
    mctx.fillRect(0, 0, w, h);
    mctx.font = "12px Outfit, sans-serif";
    for (const col of matrixCols) {
      col.y += col.speed;
      if (col.y > h + 80) col.y = -80;
      for (let i = 0; i < col.chars.length; i++) {
        const yy = col.y - i * 16;
        if (yy < -10 || yy > h + 10) continue;
        const alpha = Math.max(0, 0.35 - i * 0.04);
        mctx.fillStyle = i === 0 ? `rgba(232,74,95,${alpha + 0.15})` : `rgba(155,126,217,${alpha * 0.7})`;
        if (Math.random() < 0.015) col.chars[i] = HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
        mctx.fillText(col.chars[i], col.x, yy);
      }
    }
  }

  let audioCtx = null;
  let audioOn = false;
  let bass = 0;

  function startAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 88;
    const noise = audioCtx.createBufferSource();
    const nb = audioCtx.createBuffer(1, audioCtx.sampleRate, audioCtx.sampleRate);
    const arr = nb.getChannelData(0);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() * 2 - 1) * 0.025;
    noise.buffer = nb;
    noise.loop = true;
    const gain = audioCtx.createGain();
    gain.gain.value = 0.03;
    osc.connect(gain);
    noise.connect(gain);
    gain.connect(analyser);
    analyser.connect(audioCtx.destination);
    osc.start();
    noise.start();
    audioOn = true;

    (function read() {
      if (!audioOn) return;
      analyser.getByteFrequencyData(data);
      let b = 0;
      for (let i = 0; i < 6; i++) b += data[i];
      bass = b / (6 * 255);
      requestAnimationFrame(read);
    })();
  }

  function stopAudio() {
    audioOn = false;
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
    }
    bass = 0;
  }

  function drawParticles() {
    ctx.fillStyle = "rgba(12, 10, 16, 0.08)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";

    for (const p of particles) {
      const angle = flowAngle(p.x, p.y, t);
      p.x += Math.cos(angle) * p.speed;
      p.y += Math.sin(angle) * p.speed - 0.15;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const alpha = p.bright * (0.4 + bass * 0.3);
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 70%, 58%, ${alpha})`;
      ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  }

  function tick() {
    t++;
    smoothMx += (mx - smoothMx) * 0.04;
    smoothMy += (my - smoothMy) * 0.04;
    if (t % 2 === 0) drawParticles();
    if (t % 4 === 0) drawMatrix();
    requestAnimationFrame(tick);
  }

  window.TenguFX = {
    pulse() {},
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
  window.addEventListener("resize", () => {
    resize();
    seedParticles();
  });
  window.addEventListener("mousemove", (e) => {
    mx = e.clientX / w;
    my = e.clientY / h;
  });

  const soundBtn = document.getElementById("sound-btn");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      const on = window.TenguFX.toggleAudio();
      soundBtn.textContent = on ? "Wind on" : "Wind off";
      soundBtn.classList.toggle("active", on);
    });
  }

  requestAnimationFrame(tick);
})();