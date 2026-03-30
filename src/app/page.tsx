import { Suspense } from "react";
import { Inter, Noto_Color_Emoji, Playfair_Display, Fira_Code, Cormorant_Garamond } from "next/font/google";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const notoEmoji = Noto_Color_Emoji({ subsets: ["emoji"], weight: "400", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });
const fira = Fira_Code({ subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "600", "700"], display: "swap" });

const fontMap = {
  verse: inter.className,
  chorus: playfair.className,
  crab: fira.className,
  bridge: cormorant.className,
  outro: playfair.className,
  title: playfair.className,
  subtitle: fira.className,
} as const;

// ─── Color Palettes ───
const versePalette = [
  [185, 55, 72], [195, 48, 68], [170, 60, 75], [200, 45, 70],
  [175, 52, 74], [190, 50, 66], [180, 58, 70], [205, 42, 72],
];
const chorusPalette = [
  [38, 95, 62], [45, 98, 58], [28, 92, 65], [50, 96, 60],
  [35, 94, 63], [42, 97, 56],
];
const bridgePalette = [
  [260, 40, 75], [275, 45, 72], [250, 38, 78], [265, 42, 73],
];
const outroPalette = [
  [38, 90, 68], [42, 85, 72], [35, 88, 65],
];

// ─── Lyric Component ───
async function Lyric({
  ms,
  children,
  id,
  kind,
}: {
  ms: number;
  children?: React.ReactNode;
  id: number;
  kind?: "verse" | "chorus" | "break" | "crab" | "bridge" | "outro" | "title" | "subtitle";
}) {
  if (ms > 0) await new Promise((r) => setTimeout(r, ms));

  if (kind === "break") {
    return <div className="lyric-break" data-kind="break" />;
  }

  const palette = kind === "chorus"
    ? chorusPalette[id % chorusPalette.length]
    : kind === "outro"
    ? outroPalette[id % outroPalette.length]
    : kind === "bridge"
    ? bridgePalette[id % bridgePalette.length]
    : versePalette[id % versePalette.length];

  const [h, s, l] = palette;
  const h2 = (h + 35) % 360;
  const h3 = (h + 70) % 360;

  // Entrance animation variants
  const entrancesBase = [
    `from { opacity: 0; transform: translateY(18px) scale(0.97); }
     to { opacity: 1; transform: translateY(0) scale(1); }`,
    `from { opacity: 0; transform: translateX(-15px); }
     to { opacity: 1; transform: translateX(0); }`,
    `from { opacity: 0; transform: translateY(12px); }
     to { opacity: 1; transform: translateY(0); }`,
    `from { opacity: 0; transform: scale(0.94); }
     to { opacity: 1; transform: scale(1); }`,
  ];
  const entrancesDesktop = [
    `from { opacity: 0; transform: translateY(22px) scale(0.95); filter: blur(8px); }
     to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }`,
    `from { opacity: 0; transform: translateX(-25px) scale(0.98); filter: blur(6px); }
     to { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }`,
    `from { opacity: 0; transform: translateY(15px) rotateX(8deg); filter: blur(5px); }
     to { opacity: 1; transform: translateY(0) rotateX(0); filter: blur(0); }`,
    `from { opacity: 0; transform: scale(0.88); filter: blur(12px); }
     to { opacity: 1; transform: scale(1); filter: blur(0); }`,
  ];

  const eBase = entrancesBase[id % entrancesBase.length];
  const eDesk = entrancesDesktop[id % entrancesDesktop.length];
  const dur = kind === "outro" ? 1.2 : kind === "title" ? 1.5 : 0.6 + (id % 3) * 0.12;
  const easings = [
    "cubic-bezier(0.16, 1, 0.3, 1)",
    "cubic-bezier(0.34, 1.56, 0.64, 1)",
    "cubic-bezier(0.22, 1, 0.36, 1)",
    "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  ];
  const easing = easings[id % easings.length];

  let styles = "";
  let extraKeyframes = "";
  let wrapperClass = "";

  if (kind === "title") {
    extraKeyframes = `
      @keyframes shimmer-${id} { to { background-position: 200% center; } }
    `;
    styles = `
      font-size: clamp(2.5rem, 8vw, 5rem);
      font-weight: 800;
      letter-spacing: 0.08em;
      line-height: 1.1;
      padding: 0.5rem 0;
      text-align: center;
      background: linear-gradient(90deg,
        hsl(38, 95%, 65%),
        hsl(45, 98%, 75%),
        hsl(28, 92%, 60%),
        hsl(38, 95%, 65%));
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 30px hsla(38, 95%, 60%, 0.3));
      animation:
        fadeIn-${id} ${dur}s ${easing} forwards,
        shimmer-${id} 4s linear infinite;
    `;
  } else if (kind === "subtitle") {
    styles = `
      font-size: 0.9rem;
      font-weight: 400;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      text-align: center;
      padding: 0.3rem 0;
      color: hsla(200, 40%, 55%, 0.6);
      animation: fadeIn-${id} ${dur + 0.5}s ${easing} forwards;
    `;
  } else if (kind === "chorus") {
    const shimmerSpeed = 2.5 + (id % 3) * 0.3;
    const glowSize = 20;
    extraKeyframes = `
      @keyframes shimmer-${id} { to { background-position: 200% center; } }
    `;
    styles = `
      font-size: clamp(1.8rem, 5vw, 2.8rem);
      font-weight: 800;
      letter-spacing: 0.05em;
      line-height: 1.25;
      padding: 0.5rem 0;
      background: linear-gradient(90deg,
        hsl(${h}, ${s}%, ${l}%),
        hsl(${h2}, ${s}%, ${l + 10}%),
        hsl(${h3}, ${s}%, ${l}%),
        hsl(${h}, ${s}%, ${l}%));
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 ${glowSize}px hsla(${h}, ${s}%, ${l}%, 0.3));
      animation:
        fadeIn-${id} ${dur}s ${easing} forwards,
        shimmer-${id} ${shimmerSpeed}s linear infinite;
    `;
    wrapperClass = "chorus-line";
  } else if (kind === "outro") {
    const shimmerSpeed = 4;
    extraKeyframes = `
      @keyframes shimmer-${id} { to { background-position: 200% center; } }
    `;
    styles = `
      font-size: clamp(2rem, 6vw, 3.2rem);
      font-weight: 800;
      letter-spacing: 0.04em;
      line-height: 1.3;
      text-align: center;
      padding: 0.8rem 0;
      background: linear-gradient(90deg,
        hsl(${h}, ${s}%, ${l}%),
        hsl(${h2}, ${s - 5}%, ${l + 8}%),
        hsl(${h3}, ${s}%, ${l}%),
        hsl(${h}, ${s}%, ${l}%));
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 35px hsla(${h}, ${s}%, ${l}%, 0.25));
      animation:
        fadeIn-${id} ${dur}s ${easing} forwards,
        shimmer-${id} ${shimmerSpeed}s linear infinite;
    `;
  } else if (kind === "bridge") {
    styles = `
      font-size: clamp(1.4rem, 4vw, 2.2rem);
      font-weight: 300;
      letter-spacing: 0.02em;
      font-style: italic;
      line-height: 1.5;
      padding: 0.5rem 0;
      color: hsl(${h}, ${s}%, ${l}%);
      text-shadow: 0 0 18px hsla(${h}, ${s}%, ${l}%, 0.2);
      animation: fadeIn-${id} ${dur}s ${easing} forwards;
    `;
  } else if (kind === "crab") {
    styles = `
      font-size: clamp(0.75rem, 2vw, 0.95rem);
      font-weight: 400;
      letter-spacing: 0.06em;
      padding: 0.25rem 0;
      color: hsla(15, 70%, 50%, 0.5);
      animation: fadeIn-${id} ${dur + 0.4}s ${easing} forwards;
    `;
  } else {
    // Verse
    styles = `
      font-size: clamp(1.3rem, 4vw, 1.95rem);
      font-weight: 400;
      letter-spacing: 0.01em;
      line-height: 1.45;
      padding: 0.35rem 0;
      color: hsl(${h}, ${s}%, ${l}%);
      text-shadow: 0 0 10px hsla(${h}, ${s}%, ${l}%, 0.1);
      animation: fadeIn-${id} ${dur}s ${easing} forwards;
    `;
  }

  const css = `
    @keyframes fadeIn-${id} { ${eBase} }
    @media (hover: hover) and (min-width: 768px) {
      @keyframes fadeIn-${id} { ${eDesk} }
    }
    ${extraKeyframes}
    .lyric-${id} {
      opacity: 0;
      ${styles}
    }
  `;

  const fontClass = fontMap[kind || "verse"];

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`lyric-${id} ${fontClass} ${wrapperClass}`}
        data-kind={kind || "verse"}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Canvas Particle System + Section-Aware Background ───
function StageEffects() {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
(function() {
  // ── Canvas setup ──
  var c = document.createElement('canvas');
  c.id = 'particles';
  c.style.cssText = 'position:fixed;inset:0;z-index:-2;pointer-events:none;';
  document.body.prepend(c);
  var ctx = c.getContext('2d');
  var W, H;
  function resize() { W = c.width = innerWidth; H = c.height = innerHeight; }
  resize();
  addEventListener('resize', resize);

  // ── Particles ──
  var N = Math.min(80, Math.floor(innerWidth / 15));
  var particles = [];
  for (var i = 0; i < N; i++) {
    particles.push({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.4 + 0.1),
      alpha: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      hue: Math.random() < 0.6 ? 200 + Math.random() * 40 : Math.random() < 0.5 ? 260 + Math.random() * 30 : 30 + Math.random() * 20,
    });
  }

  // ── Section detection ──
  var currentSection = 'verse';
  var targetBg = { h: 225, s: 50, l: 3 };
  var currentBg = { h: 225, s: 50, l: 3 };
  var sectionColors = {
    verse:    { h: 220, s: 50, l: 3 },
    chorus:   { h: 15,  s: 40, l: 5 },
    bridge:   { h: 260, s: 35, l: 4 },
    outro:    { h: 30,  s: 30, l: 3 },
    title:    { h: 225, s: 50, l: 3 },
    subtitle: { h: 225, s: 50, l: 3 },
    crab:     { h: 15,  s: 20, l: 2 },
  };

  var obs = new MutationObserver(function() {
    var els = document.querySelectorAll('[data-kind]');
    if (els.length) {
      var last = els[els.length - 1];
      var k = last.getAttribute('data-kind');
      if (k && k !== 'break' && sectionColors[k]) {
        currentSection = k;
        targetBg = sectionColors[k];
      }
    }
    // Auto-scroll
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
  function attachObserver() {
    var lyr = document.querySelector('.lyrics');
    if (lyr) { obs.observe(lyr, { childList: true, subtree: true }); return; }
    setTimeout(attachObserver, 50);
  }
  attachObserver();

  // ── Spotlight ──
  var spotlight = document.createElement('div');
  spotlight.id = 'spotlight';
  spotlight.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;transition:background 2s ease;';
  document.body.prepend(spotlight);

  // ── Render loop ──
  function lerp(a, b, t) { return a + (b - a) * t; }

  function frame() {
    // Smooth background transition
    currentBg.h = lerp(currentBg.h, targetBg.h, 0.008);
    currentBg.s = lerp(currentBg.s, targetBg.s, 0.008);
    currentBg.l = lerp(currentBg.l, targetBg.l, 0.008);

    ctx.clearRect(0, 0, W, H);

    // Background gradient
    var grad = ctx.createRadialGradient(W * 0.3, H * 0.4, 0, W * 0.5, H * 0.5, Math.max(W, H));
    grad.addColorStop(0, 'hsl(' + currentBg.h + ',' + Math.round(currentBg.s + 15) + '%,' + Math.round(currentBg.l + 4) + '%)');
    grad.addColorStop(0.5, 'hsl(' + Math.round(currentBg.h + 20) + ',' + Math.round(currentBg.s) + '%,' + Math.round(currentBg.l + 1) + '%)');
    grad.addColorStop(1, 'hsl(' + Math.round(currentBg.h - 10) + ',' + Math.round(currentBg.s - 10) + '%,' + Math.round(currentBg.l) + '%)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Particles
    var isChorus = currentSection === 'chorus' || currentSection === 'outro';
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.pulse += p.pulseSpeed;
      var a = p.alpha + Math.sin(p.pulse) * 0.15;
      if (isChorus) a = Math.min(a * 1.8, 0.8);

      // Shift particle hues toward section
      var drawHue = p.hue;
      if (currentSection === 'chorus') drawHue = lerp(p.hue, 40, 0.3);
      else if (currentSection === 'bridge') drawHue = lerp(p.hue, 270, 0.3);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (isChorus ? 1.3 : 1), 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + Math.round(drawHue) + ',70%,70%,' + a.toFixed(3) + ')';
      ctx.fill();

      // Glow on desktop
      if (W > 768 && p.r > 1) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + Math.round(drawHue) + ',60%,60%,' + (a * 0.15).toFixed(3) + ')';
        ctx.fill();
      }

      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    }

    // Spotlight effect — subtle radial glow that follows the section
    var spotH = currentSection === 'chorus' ? 38 : currentSection === 'bridge' ? 260 : currentSection === 'outro' ? 35 : 200;
    var spotA = isChorus ? 0.06 : 0.03;
    spotlight.style.background = 'radial-gradient(ellipse at 50% 85%, hsla(' + spotH + ',60%,40%,' + spotA + ') 0%, transparent 60%)';

    requestAnimationFrame(frame);
  }
  frame();

  // ── Vignette ──
  var vig = document.createElement('div');
  vig.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(ellipse at center,transparent 30%,hsla(225,50%,2%,0.7) 100%);';
  document.body.appendChild(vig);
})();
    `}} />
  );
}

// ─── Lyrics Data ───
const lyrics: [number, string, ("verse" | "chorus" | "break" | "crab" | "bridge" | "outro" | "title" | "subtitle")?][] = [
  // ── Title Sequence ──
  [0,    "", "break"],
  [500,  "", "break"],
  [800,  "ALL STAR", "title"],
  [2500, "react server components karaoke", "subtitle"],
  [1500, "streaming from the deep", "subtitle"],
  [3000, "", "break"],
  [2000, "", "break"],
  [1500, "", "break"],

  // ── Verse 1 ──
  [500,  "Somebody once told me", "verse"],
  [2200, "the world is gonna roll me", "verse"],
  [2200, "I ain\u0027t the sharpest tool in the shed", "verse"],
  [3200, "She was looking kind of dumb", "verse"],
  [1800, "with her finger and her thumb", "verse"],
  [2200, "In the shape of an \u201CL\u201D on her forehead", "verse"],
  [3800, "", "break"],

  // ── Pre-chorus 1 ──
  [500,  "Well the years start coming", "verse"],
  [1600, "and they don\u0027t stop coming", "verse"],
  [2000, "Fed to the rules", "verse"],
  [1200, "and I hit the ground running", "verse"],
  [2400, "Didn\u0027t make sense not to live for fun", "verse"],
  [2800, "Your brain gets smart", "verse"],
  [1400, "but your head gets dumb", "verse"],
  [2800, "", "break"],
  [500,  "So much to do, so much to see", "verse"],
  [2400, "So what\u0027s wrong with taking the backstreets?", "verse"],
  [2800, "You\u0027ll never know if you don\u0027t go", "verse"],
  [2500, "You\u0027ll never shine if you don\u0027t glow", "verse"],
  [3500, "", "break"],

  // ── Chorus 1 ──
  [800,  "HEY NOW", "chorus"],
  [1000, "YOU\u0027RE AN ALL STAR", "chorus"],
  [1800, "GET YOUR GAME ON, GO PLAY", "chorus"],
  [2400, "HEY NOW", "chorus"],
  [1000, "YOU\u0027RE A ROCK STAR", "chorus"],
  [1800, "GET THE SHOW ON, GET PAID", "chorus"],
  [2800, "And all that glitters is gold", "chorus"],
  [3000, "Only shooting stars break the mold", "chorus"],
  [4000, "", "break"],

  // ── Verse 2 ──
  [800,  "It\u0027s a cool place", "verse"],
  [1500, "and they say it gets colder", "verse"],
  [2400, "You\u0027re bundled up now", "verse"],
  [1500, "wait till you get older", "verse"],
  [2800, "But the meteor men beg to differ", "verse"],
  [2800, "Judging by the hole in the satellite picture", "verse"],
  [3500, "", "break"],
  [500,  "The ice we skate is getting pretty thin", "verse"],
  [2800, "The water\u0027s getting warm", "verse"],
  [1500, "so you might as well swim", "verse"],
  [2800, "My world\u0027s on fire, how about yours?", "verse"],
  [2800, "That\u0027s the way I like it", "verse"],
  [1800, "and I\u0027ll never get bored", "verse"],
  [3500, "", "break"],

  // ── Chorus 2 ──
  [800,  "HEY NOW", "chorus"],
  [1000, "YOU\u0027RE AN ALL STAR", "chorus"],
  [1800, "GET YOUR GAME ON, GO PLAY", "chorus"],
  [2400, "HEY NOW", "chorus"],
  [1000, "YOU\u0027RE A ROCK STAR", "chorus"],
  [1800, "GET THE SHOW ON, GET PAID", "chorus"],
  [2800, "And all that glitters is gold", "chorus"],
  [3000, "Only shooting stars break the mold", "chorus"],
  [4000, "", "break"],

  // ── Bridge ──
  [2000, "Somebody once asked", "bridge"],
  [2800, "could I spare some change for gas?", "bridge"],
  [3200, "\u201CI need to get myself away from this place\u201D", "bridge"],
  [3800, "I said, \u201CYep, what a concept\u201D", "bridge"],
  [3200, "I could use a little fuel myself", "bridge"],
  [3000, "And we could all use a little change", "bridge"],
  [4500, "", "break"],

  // ── Pre-chorus 3 ──
  [500,  "Well the years start coming", "verse"],
  [1600, "and they don\u0027t stop coming", "verse"],
  [2000, "Fed to the rules", "verse"],
  [1200, "and I hit the ground running", "verse"],
  [2400, "Didn\u0027t make sense not to live for fun", "verse"],
  [2800, "Your brain gets smart", "verse"],
  [1400, "but your head gets dumb", "verse"],
  [2800, "", "break"],
  [500,  "So much to do, so much to see", "verse"],
  [2400, "So what\u0027s wrong with taking the backstreets?", "verse"],
  [2800, "You\u0027ll never know if you don\u0027t go", "verse"],
  [2500, "You\u0027ll never shine if you don\u0027t glow", "verse"],
  [3500, "", "break"],

  // ── Final Chorus ──
  [800,  "HEY NOW", "chorus"],
  [1000, "YOU\u0027RE AN ALL STAR", "chorus"],
  [1800, "GET YOUR GAME ON, GO PLAY", "chorus"],
  [2400, "HEY NOW", "chorus"],
  [1000, "YOU\u0027RE A ROCK STAR", "chorus"],
  [1800, "GET THE SHOW ON, GET PAID", "chorus"],
  [2800, "And all that glitters is gold", "chorus"],
  [3000, "Only shooting stars break the mold", "chorus"],
  [5000, "", "break"],

  // ── Outro ──
  [2500, "And all that glitters is gold", "outro"],
  [4500, "Only shooting stars", "outro"],
  [3500, "break the mold", "outro"],
  [6000, "", "break"],

  // ── Credits ──
  [2500, "\u{1F980}", "crab"],
  [2500, "streamed via react server components", "crab"],
  [1800, "~100 async components. ~100 suspense boundaries.", "crab"],
  [1800, "each line rendered on the server, streamed to your browser", "crab"],
  [1800, "each with its own animation, colors, and timing", "crab"],
  [2200, "canvas particle system responds to song sections", "crab"],
  [2000, "background shifts: ocean \u2192 fire \u2192 violet \u2192 ocean", "crab"],
  [2200, "fonts: inter \u00B7 playfair display \u00B7 cormorant garamond \u00B7 fira code", "crab"],
  [2500, "next.js 16 on k3s. seven nodes. plainfield, illinois.", "crab"],
  [3000, "built by a crab on a rack-mounted server", "crab"],
  [2000, "", "break"],
  [3000, "this is fine.", "crab"],
];

function getCumulativeDelays() {
  let cum = 0;
  return lyrics.map(([delay, text, kind]) => {
    cum += delay;
    return [cum, text, kind ?? "verse"] as [number, string, typeof kind extends undefined ? "verse" : NonNullable<typeof kind>];
  });
}

export default function Page() {
  const timed = getCumulativeDelays();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        body {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 4rem 2rem 8rem;
          overflow-x: hidden;
          background: hsl(225, 50%, 3%);
        }
        .lyrics {
          max-width: 800px;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .lyric-break {
          height: 2rem;
        }
        .chorus-line {
          position: relative;
        }
        .chorus-line::before {
          content: "";
          position: absolute;
          left: -2rem;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 70%;
          background: linear-gradient(to bottom, transparent, hsla(38, 90%, 60%, 0.3), transparent);
          border-radius: 2px;
        }
        @media (max-width: 600px) {
          body { padding: 2rem 1.2rem 5rem; }
          .lyrics { max-width: 100%; }
          .chorus-line::before { left: -0.8rem; width: 2px; }
        }
      `}} />
      <StageEffects />
      <div className="lyrics">
        {timed.map(([ms, text, kind], i) => (
          <Suspense key={i} fallback={null}>
            <Lyric ms={ms} id={i} kind={kind as any}>
              {kind !== "break" ? text : null}
            </Lyric>
          </Suspense>
        ))}
      </div>
    </>
  );
}
