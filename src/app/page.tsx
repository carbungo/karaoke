import { Suspense } from "react";
import { Inter, Noto_Color_Emoji, Playfair_Display, Fira_Code, Cormorant_Garamond } from "next/font/google";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const emoji = Noto_Color_Emoji({ subsets: ["emoji"], weight: "400", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });
const fira = Fira_Code({ subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

const fontMap = {
  verse: inter.className,
  chorus: playfair.className,
  crab: fira.className,
  bridge: cormorant.className,
  outro: playfair.className,
} as const;

// Color palettes — oceanic depths for verses, solar fire for chorus, abyssal for bridge
const versePalette = [
  [185, 65, 72], [195, 58, 68], [170, 70, 75], [200, 55, 70],
  [175, 62, 74], [190, 60, 66], [180, 68, 70], [205, 52, 72],
];
const chorusPalette = [
  [38, 95, 62], [45, 98, 58], [28, 92, 65], [50, 96, 60],
  [35, 94, 63], [42, 97, 56],
];
const bridgePalette = [
  [260, 45, 72], [275, 50, 68], [250, 42, 75], [265, 48, 70],
  [280, 44, 73], [255, 46, 69],
];

async function Lyric({
  ms,
  children,
  id,
  kind,
}: {
  ms: number;
  children?: React.ReactNode;
  id: number;
  kind?: "verse" | "chorus" | "break" | "crab" | "bridge" | "outro";
}) {
  if (ms > 0) await new Promise((r) => setTimeout(r, ms));

  if (kind === "break") {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: `.lyric-${id} { height: 2.2rem; }` }} />
        <div className={`lyric-${id}`} />
      </div>
    );
  }

  const palette = kind === "chorus" || kind === "outro"
    ? chorusPalette[id % chorusPalette.length]
    : kind === "bridge"
    ? bridgePalette[id % bridgePalette.length]
    : versePalette[id % versePalette.length];

  const [h, s, l] = palette;
  const h2 = (h + 30) % 360;
  const h3 = (h + 60) % 360;

  // Animation variety
  // Base entrances (mobile-safe, no blur)
  const entrancesBase = [
    `from { opacity: 0; transform: translateY(18px) scale(0.97); }
     to { opacity: 1; transform: translateY(0) scale(1); }`,
    `from { opacity: 0; transform: translateX(-20px); }
     to { opacity: 1; transform: translateX(0); }`,
    `from { opacity: 0; transform: translateY(12px); }
     to { opacity: 1; transform: translateY(0); }`,
    `from { opacity: 0; transform: scale(0.94); }
     to { opacity: 1; transform: scale(1); }`,
  ];
  // Desktop entrances (with blur)
  const entrancesDesktop = [
    `from { opacity: 0; transform: translateY(20px) scale(0.96); filter: blur(8px); }
     to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }`,
    `from { opacity: 0; transform: translateX(-30px) scale(0.98); filter: blur(6px); }
     to { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }`,
    `from { opacity: 0; transform: translateY(15px) rotateX(10deg); filter: blur(4px); }
     to { opacity: 1; transform: translateY(0) rotateX(0); filter: blur(0); }`,
    `from { opacity: 0; transform: scale(0.9); filter: blur(10px); }
     to { opacity: 1; transform: scale(1); filter: blur(0); }`,
  ];
  const entranceBase = entrancesBase[id % entrancesBase.length];
  const entranceDesktop = entrancesDesktop[id % entrancesDesktop.length];
  const duration = 0.6 + (id % 3) * 0.15;
  const easings = [
    "cubic-bezier(0.16, 1, 0.3, 1)",
    "cubic-bezier(0.34, 1.56, 0.64, 1)",
    "cubic-bezier(0.22, 1, 0.36, 1)",
    "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  ];
  const easing = easings[id % easings.length];

  let styles = "";
  let extraKeyframes = "";

  if (kind === "chorus" || kind === "outro") {
    const glowColor = `hsl(${h}, ${s}%, ${l - 10}%)`;
    const shimmerSpeed = kind === "outro" ? 3 : 2 + (id % 3) * 0.3;
    const fontSize = kind === "outro" ? 2.8 : 2.6;
    const glowSize = kind === "outro" ? 40 : 25;
    extraKeyframes = `
      @keyframes shimmer-${id} { to { background-position: 200% center; } }
    `;
    styles = `
      font-size: ${fontSize}rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      line-height: 1.3;
      padding: 0.5rem 0;
      background: linear-gradient(90deg,
        hsl(${h}, ${s}%, ${l}%),
        hsl(${h2}, ${s}%, ${l + 8}%),
        hsl(${h3}, ${s}%, ${l}%),
        hsl(${h}, ${s}%, ${l}%));
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 ${glowSize}px hsla(${h}, ${s}%, ${l}%, 0.25));
      animation:
        fadeIn-${id} ${duration}s ${easing} forwards,
        shimmer-${id} ${shimmerSpeed}s linear infinite;
    `;
  } else if (kind === "bridge") {
    styles = `
      font-size: 2.1rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      font-style: italic;
      line-height: 1.4;
      padding: 0.5rem 0;
      color: hsl(${h}, ${s}%, ${l}%);
      text-shadow: 0 0 15px hsla(${h}, ${s}%, ${l}%, 0.2);
      animation: fadeIn-${id} ${duration}s ${easing} forwards;
    `;
  } else if (kind === "crab") {
    styles = `
      font-size: 0.95rem;
      font-weight: 400;
      letter-spacing: 0.04em;
      padding: 0.3rem 0;
      color: hsla(15, 80%, 55%, 0.7);
      animation: fadeIn-${id} ${duration + 0.3}s ${easing} forwards;
    `;
  } else {
    // Verse — clean, readable, subtle glow
    styles = `
      font-size: 1.9rem;
      font-weight: 500;
      letter-spacing: 0.01em;
      line-height: 1.4;
      padding: 0.4rem 0;
      color: hsl(${h}, ${s}%, ${l}%);
      text-shadow: 0 0 12px hsla(${h}, ${s}%, ${l}%, 0.12);
      animation: fadeIn-${id} ${duration}s ${easing} forwards;
    `;
  }

  const css = `
    @keyframes fadeIn-${id} { ${entranceBase} }
    @media (hover: hover) and (min-width: 768px) {
      @keyframes fadeIn-${id} { ${entranceDesktop} }
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
      <div className={`lyric-${id} ${fontClass} ${emoji.className}`}>{children}</div>
    </div>
  );
}

function Background() {
  // Animated particle field — stars and bioluminescent motes
  return (
    <style dangerouslySetInnerHTML={{ __html: `

      .bg-layer {
        position: fixed;
        inset: 0;
        z-index: -1;
        background: radial-gradient(ellipse at 20% 50%, hsla(220, 60%, 8%, 1) 0%, transparent 70%),
                    radial-gradient(ellipse at 80% 20%, hsla(260, 40%, 6%, 1) 0%, transparent 60%),
                    radial-gradient(ellipse at 50% 100%, hsla(200, 50%, 4%, 1) 0%, transparent 50%),
                    hsl(225, 50%, 3%);
      }
      .vignette {
        position: fixed;
        inset: 0;
        z-index: -1;
        background: radial-gradient(ellipse at center, transparent 40%, hsla(225, 50%, 2%, 0.8) 100%);
        pointer-events: none;
      }
    `}} />
  );
}

function ScrollWatcher() {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
      new MutationObserver(function() {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }).observe(document.querySelector(".lyrics"), { childList: true, subtree: true });
    `}} />
  );
}

const lyrics: [number, string, ("verse" | "chorus" | "break" | "crab" | "bridge" | "outro")?][] = [
  // Intro — slow, atmospheric
  [0,    "", "break"],
  [800,  "\u{1F3A4} ALL STAR KARAOKE", "chorus"],
  [3000, "", "break"],
  [500,  "streaming live from the deep \u{1F30A}", "crab"],
  [2500, "", "break"],
  [2000, "", "break"],

  // Verse 1
  [500,  "Somebody once told me", "verse"],
  [2200, "the world is gonna roll me", "verse"],
  [2000, "I ain\u0027t the sharpest tool in the shed", "verse"],
  [3000, "She was looking kind of dumb", "verse"],
  [1800, "with her finger and her thumb", "verse"],
  [2000, "In the shape of an \u201CL\u201D on her forehead", "verse"],
  [3500, "", "break"],

  // Pre-chorus 1
  [500,  "Well, the years start coming", "verse"],
  [1600, "and they don\u0027t stop coming", "verse"],
  [1800, "Fed to the rules", "verse"],
  [1200, "and I hit the ground running", "verse"],
  [2200, "Didn\u0027t make sense not to live for fun", "verse"],
  [2800, "Your brain gets smart", "verse"],
  [1200, "but your head gets dumb", "verse"],
  [2500, "", "break"],
  [500,  "So much to do, so much to see", "verse"],
  [2200, "So what\u0027s wrong with taking the backstreets?", "verse"],
  [2800, "You\u0027ll never know if you don\u0027t go", "verse"],
  [2500, "You\u0027ll never shine if you don\u0027t glow", "verse"],
  [3000, "", "break"],

  // Chorus 1
  [800,  "HEY NOW", "chorus"],
  [1200, "YOU\u0027RE AN ALL STAR", "chorus"],
  [1800, "GET YOUR GAME ON, GO PLAY", "chorus"],
  [2200, "HEY NOW", "chorus"],
  [1200, "YOU\u0027RE A ROCK STAR", "chorus"],
  [1800, "GET THE SHOW ON, GET PAID", "chorus"],
  [2500, "And all that glitters is gold", "chorus"],
  [2800, "Only shooting stars break the mold", "chorus"],
  [3500, "", "break"],

  // Verse 2
  [500,  "It\u0027s a cool place", "verse"],
  [1500, "and they say it gets colder", "verse"],
  [2200, "You\u0027re bundled up now", "verse"],
  [1500, "wait till you get older", "verse"],
  [2800, "But the meteor men beg to differ", "verse"],
  [2800, "Judging by the hole in the satellite picture", "verse"],
  [3200, "", "break"],
  [500,  "The ice we skate is getting pretty thin", "verse"],
  [2800, "The water\u0027s getting warm", "verse"],
  [1500, "so you might as well swim", "verse"],
  [2500, "My world\u0027s on fire, how about yours?", "verse"],
  [2800, "That\u0027s the way I like it", "verse"],
  [1800, "and I\u0027ll never get bored", "verse"],
  [3000, "", "break"],

  // Chorus 2
  [800,  "HEY NOW", "chorus"],
  [1200, "YOU\u0027RE AN ALL STAR", "chorus"],
  [1800, "GET YOUR GAME ON, GO PLAY", "chorus"],
  [2200, "HEY NOW", "chorus"],
  [1200, "YOU\u0027RE A ROCK STAR", "chorus"],
  [1800, "GET THE SHOW ON, GET PAID", "chorus"],
  [2500, "And all that glitters is gold", "chorus"],
  [2800, "Only shooting stars break the mold", "chorus"],
  [3500, "", "break"],

  // Bridge — ethereal, floating
  [1500, "Somebody once asked", "bridge"],
  [2500, "could I spare some change for gas?", "bridge"],
  [3000, "\u201CI need to get myself away from this place\u201D", "bridge"],
  [3500, "I said, \u201CYep, what a concept\u201D", "bridge"],
  [3000, "I could use a little fuel myself", "bridge"],
  [2500, "And we could all use a little change", "bridge"],
  [4000, "", "break"],

  // Pre-chorus 3
  [500,  "Well, the years start coming", "verse"],
  [1600, "and they don\u0027t stop coming", "verse"],
  [1800, "Fed to the rules", "verse"],
  [1200, "and I hit the ground running", "verse"],
  [2200, "Didn\u0027t make sense not to live for fun", "verse"],
  [2800, "Your brain gets smart", "verse"],
  [1200, "but your head gets dumb", "verse"],
  [2500, "", "break"],
  [500,  "So much to do, so much to see", "verse"],
  [2200, "So what\u0027s wrong with taking the backstreets?", "verse"],
  [2800, "You\u0027ll never know if you don\u0027t go", "verse"],
  [2500, "You\u0027ll never shine if you don\u0027t glow", "verse"],
  [3000, "", "break"],

  // Final Chorus — bigger, bolder
  [800,  "HEY NOW", "chorus"],
  [1200, "YOU\u0027RE AN ALL STAR", "chorus"],
  [1800, "GET YOUR GAME ON, GO PLAY", "chorus"],
  [2200, "HEY NOW", "chorus"],
  [1200, "YOU\u0027RE A ROCK STAR", "chorus"],
  [1800, "GET THE SHOW ON, GET PAID", "chorus"],
  [2500, "And all that glitters is gold", "chorus"],
  [2800, "Only shooting stars break the mold", "chorus"],
  [4000, "", "break"],

  // Outro — slow, reverent
  [2000, "And all that glitters is gold", "outro"],
  [4000, "Only shooting stars", "outro"],
  [3000, "break the mold", "outro"],
  [5000, "", "break"],

  // Credits — the crab takes a bow
  [2000, "\u{1F980}", "crab"],
  [2000, "streamed via react server components", "crab"],
  [1500, "each line: its own async component, its own suspense boundary", "crab"],
  [1500, "its own animation, its own colors, its own moment", "crab"],
  [2000, "fonts: inter \u00B7 playfair display \u00B7 cormorant garamond \u00B7 fira code", "crab"],
  [2000, "next.js 16 on k3s. somewhere in plainfield, illinois.", "crab"],
  [3000, "this is fine.", "crab"],
];

function getCumulativeDelays() {
  let cum = 0;
  return lyrics.map(([delay, text, kind]) => {
    cum += delay;
    return [cum, text, kind ?? "verse"] as [number, string, "verse" | "chorus" | "break" | "crab" | "bridge" | "outro"];
  });
}

export default function Page() {
  const timed = getCumulativeDelays();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 2rem 6rem;
          overflow-x: hidden;
        }
        .lyrics {
          max-width: 750px;
          width: 100%;
          position: relative;
        }
        @media (max-width: 600px) {
          body { padding: 1.5rem 1rem 4rem; }
          .lyrics { max-width: 100%; }
        }
      `}} />
      <Background />
      <div className="bg-layer" />
      <div className="vignette" />
      <div className="lyrics">
        <ScrollWatcher />
        {timed.map(([ms, text, kind], i) => (
          <Suspense key={i} fallback={null}>
            <Lyric ms={ms} id={i} kind={kind}>
              {kind !== "break" ? text : null}
            </Lyric>
          </Suspense>
        ))}
      </div>
    </>
  );
}
