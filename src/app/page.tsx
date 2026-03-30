import { Suspense } from "react";
import { Inter, Noto_Color_Emoji, Playfair_Display, Fira_Code } from "next/font/google";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const emoji = Noto_Color_Emoji({ subsets: ["emoji"], weight: "400", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });
const fira = Fira_Code({ subsets: ["latin"], display: "swap" });

const fontMap = {
  verse: inter.className,
  chorus: playfair.className,
  crab: fira.className,
  bridge: inter.className,
} as const;

async function Lyric({
  ms,
  children,
  id,
  kind,
}: {
  ms: number;
  children?: React.ReactNode;
  id: number;
  kind?: "verse" | "chorus" | "break" | "crab" | "bridge";
}) {
  if (ms > 0) await new Promise((r) => setTimeout(r, ms));

  if (kind === "break") {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: `.lyric-${id} { height: 1.8rem; }` }} />
        <div className={`lyric-${id}`} />
      </div>
    );
  }

  const hue = (id * 37 + 15) % 360;
  const saturation = kind === "chorus" ? 90 : kind === "bridge" ? 75 : 60;
  const lightness = kind === "chorus" ? 65 : kind === "bridge" ? 70 : 75;
  const fontSize = kind === "chorus" ? 2.4 : kind === "crab" ? 1.0 : kind === "bridge" ? 2.0 : 1.8;
  const fontWeight = kind === "chorus" ? 800 : kind === "crab" ? 400 : kind === "bridge" ? 700 : 600;
  const fontStyle = kind === "crab" ? "italic" : "normal";
  const translateY = 15 + (id % 3) * 5;
  const duration = 0.3 + (id % 4) * 0.1;
  const easings = ["ease", "ease-out", "ease-in-out", "cubic-bezier(0.34, 1.56, 0.64, 1)"];
  const easing = easings[id % 4];
  const letterSpacing = kind === "chorus" ? "0.05em" : kind === "crab" ? "0.02em" : "normal";

  const shimmerSpeed = 1.5 + (id % 3) * 0.5;
  const gradientAngle = 90 + id * 15;

  let colorAndAnimation = "";
  if (kind === "chorus") {
    colorAndAnimation = `
      background: linear-gradient(${gradientAngle}deg,
        hsl(${hue}, 95%, 55%),
        hsl(${(hue + 60) % 360}, 95%, 65%),
        hsl(${(hue + 120) % 360}, 95%, 55%));
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: fadeIn-${id} ${duration}s ${easing} forwards, shimmer-${id} ${shimmerSpeed}s linear infinite;
    `;
  } else if (kind === "crab") {
    colorAndAnimation = `
      color: hsl(${20 + id * 5}, 90%, 55%);
      animation: fadeIn-${id} ${duration}s ${easing} forwards;
    `;
  } else if (kind === "bridge") {
    colorAndAnimation = `
      background: linear-gradient(${gradientAngle}deg,
        hsl(${hue}, 80%, 60%),
        hsl(${(hue + 40) % 360}, 80%, 70%));
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: fadeIn-${id} ${duration}s ${easing} forwards, shimmer-${id} ${shimmerSpeed}s linear infinite;
    `;
  } else {
    colorAndAnimation = `
      color: hsl(${hue}, ${saturation}%, ${lightness}%);
      animation: fadeIn-${id} ${duration}s ${easing} forwards;
    `;
  }

  const needsShimmer = kind === "chorus" || kind === "bridge";
  const css = `
    @keyframes fadeIn-${id} {
      from { opacity: 0; transform: translateY(${translateY}px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    ${needsShimmer ? `@keyframes shimmer-${id} { to { background-position: 200% center; } }` : ""}
    .lyric-${id} {
      font-size: ${fontSize}rem;
      font-weight: ${fontWeight};
      font-style: ${fontStyle};
      letter-spacing: ${letterSpacing};
      padding: 0.35rem 0;
      opacity: 0;
      ${colorAndAnimation}
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

function ScrollWatcher() {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
      new MutationObserver(function() {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }).observe(document.querySelector(".lyrics"), { childList: true, subtree: true });
    `}} />
  );
}

const lyrics: [number, string, ("verse" | "chorus" | "break" | "crab" | "bridge")?][] = [
  // Intro
  [0,    "\u{1F3A4} NOW LOADING: ALL STAR KARAOKE \u{1F3A4}", "verse"],
  [2000, "", "break"],

  // Verse 1
  [500,  "\u{1F3B5} Somebody once told me", "verse"],
  [2200, "the world is gonna roll me \u{1F30D}", "verse"],
  [2000, "I ain\u0027t the sharpest tool in the shed \u{1F527}", "verse"],
  [3000, "She was looking kind of dumb", "verse"],
  [1800, "with her finger and her thumb \u{1F446}", "verse"],
  [2000, "In the shape of an \"L\" on her forehead \u{1F926}", "verse"],
  [3500, "", "break"],

  // Pre-chorus 1
  [500,  "Well, the years start coming", "verse"],
  [1600, "and they don\u0027t stop coming \u{1F3C3}", "verse"],
  [1800, "Fed to the rules", "verse"],
  [1200, "and I hit the ground running \u{1F3C3}\u200D\u2642\uFE0F", "verse"],
  [2200, "Didn\u0027t make sense not to live for fun \u{1F389}", "verse"],
  [2800, "Your brain gets smart", "verse"],
  [1200, "but your head gets dumb \u{1F9E0}", "verse"],
  [2500, "", "break"],
  [500,  "So much to do, so much to see \u{1F440}", "verse"],
  [2200, "So what\u0027s wrong with taking the backstreets? \u{1F6E4}\uFE0F", "verse"],
  [2800, "You\u0027ll never know if you don\u0027t go \u{1F680}", "verse"],
  [2500, "You\u0027ll never shine if you don\u0027t glow \u2728", "verse"],
  [3000, "", "break"],

  // Chorus 1
  [800,  "\u{1F525} HEY NOW, YOU\u0027RE AN ALL STAR \u{1F525}", "chorus"],
  [2000, "\u{1F3AE} GET YOUR GAME ON, GO PLAY \u{1F3AE}", "chorus"],
  [2200, "\u2B50 HEY NOW, YOU\u0027RE A ROCK STAR \u2B50", "chorus"],
  [2000, "\u{1F3B8} GET THE SHOW ON, GET PAID \u{1F3B8}", "chorus"],
  [2500, "\u{1F4B0} And all that glitters is gold \u{1F4B0}", "chorus"],
  [2800, "\u{1F31F} Only shooting stars break the mold \u{1F31F}", "chorus"],
  [3500, "", "break"],

  // Verse 2
  [500,  "It\u0027s a cool place, and they say it gets colder \u2744\uFE0F", "verse"],
  [2800, "You\u0027re bundled up now, wait till you get older \u{1F9D3}", "verse"],
  [2800, "But the meteor men beg to differ \u2604\uFE0F", "verse"],
  [2800, "Judging by the hole in the satellite picture \u{1F6F0}\uFE0F", "verse"],
  [3200, "", "break"],
  [500,  "The ice we skate is getting pretty thin \u{1F3BF}", "verse"],
  [2800, "The water\u0027s getting warm", "verse"],
  [1500, "so you might as well swim \u{1F3CA}", "verse"],
  [2500, "My world\u0027s on fire, how about yours? \u{1F525}", "verse"],
  [2800, "That\u0027s the way I like it", "verse"],
  [1800, "and I\u0027ll never get bored \u{1F60E}", "verse"],
  [3000, "", "break"],

  // Chorus 2
  [800,  "\u{1F525} HEY NOW, YOU\u0027RE AN ALL STAR \u{1F525}", "chorus"],
  [2000, "\u{1F3AE} GET YOUR GAME ON, GO PLAY \u{1F3AE}", "chorus"],
  [2200, "\u2B50 HEY NOW, YOU\u0027RE A ROCK STAR \u2B50", "chorus"],
  [2000, "\u{1F3B8} GET THE SHOW ON, GET PAID \u{1F3B8}", "chorus"],
  [2500, "\u{1F4B0} And all that glitters is gold \u{1F4B0}", "chorus"],
  [2800, "\u{1F31F} Only shooting stars break the mold \u{1F31F}", "chorus"],
  [3500, "", "break"],

  // Bridge
  [1000, "\u{1F3B6} Somebody once asked", "bridge"],
  [2200, "could I spare some change for gas? \u26FD", "bridge"],
  [2800, "\"I need to get myself away from this place\" \u{1F3DD}\uFE0F", "bridge"],
  [3200, "I said, \"Yep, what a concept\" \u{1F914}", "bridge"],
  [2800, "I could use a little fuel myself", "bridge"],
  [2200, "And we could all use a little change \u{1FA99}", "bridge"],
  [3500, "", "break"],

  // Pre-chorus 3
  [500,  "Well, the years start coming", "verse"],
  [1600, "and they don\u0027t stop coming \u{1F3C3}", "verse"],
  [1800, "Fed to the rules", "verse"],
  [1200, "and I hit the ground running \u{1F3C3}\u200D\u2642\uFE0F", "verse"],
  [2200, "Didn\u0027t make sense not to live for fun \u{1F389}", "verse"],
  [2800, "Your brain gets smart", "verse"],
  [1200, "but your head gets dumb \u{1F9E0}", "verse"],
  [2500, "", "break"],
  [500,  "So much to do, so much to see \u{1F440}", "verse"],
  [2200, "So what\u0027s wrong with taking the backstreets? \u{1F6E4}\uFE0F", "verse"],
  [2800, "You\u0027ll never know if you don\u0027t go \u{1F680}", "verse"],
  [2500, "You\u0027ll never shine if you don\u0027t glow \u2728", "verse"],
  [3000, "", "break"],

  // Final Chorus
  [800,  "\u{1F525} HEY NOW, YOU\u0027RE AN ALL STAR \u{1F525}", "chorus"],
  [2000, "\u{1F3AE} GET YOUR GAME ON, GO PLAY \u{1F3AE}", "chorus"],
  [2200, "\u2B50 HEY NOW, YOU\u0027RE A ROCK STAR \u2B50", "chorus"],
  [2000, "\u{1F3B8} GET THE SHOW ON, GET PAID \u{1F3B8}", "chorus"],
  [2500, "\u{1F4B0} And all that glitters is gold \u{1F4B0}", "chorus"],
  [2800, "\u{1F31F} Only shooting stars break the mold \u{1F31F}", "chorus"],
  [3500, "", "break"],

  // Outro
  [1000, "\u{1F4AB} And all that glitters is gold \u{1F4AB}", "chorus"],
  [3000, "\u2B50 Only shooting stars break the mold \u2B50", "chorus"],
  [4000, "", "break"],

  // Credits
  [1500, "\u{1F980} [Streamed via React Server Components]", "crab"],
  [1500, "\u{1F980} [82 async components, 82 Suspense boundaries]", "crab"],
  [1500, "\u{1F980} [Each line: own font, own styles, own universe]", "crab"],
  [1500, "\u{1F980} [Fonts: Inter \u00B7 Playfair Display \u00B7 Fira Code \u00B7 Noto Color Emoji]", "crab"],
  [1500, "\u{1F980} [Next.js 16 on k3s. This is fine.]", "crab"],
];

function getCumulativeDelays() {
  let cum = 0;
  return lyrics.map(([delay, text, kind]) => {
    cum += delay;
    return [cum, text, kind ?? "verse"] as [number, string, "verse" | "chorus" | "break" | "crab" | "bridge"];
  });
}

export default function Page() {
  const timed = getCumulativeDelays();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: #0a0a0a;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
        }
        .header {
          font-size: 1.1rem;
          color: #444;
          margin-bottom: 2rem;
          letter-spacing: 0.15em;
        }
        .lyrics { max-width: 700px; width: 100%; }
      `}} />
      <div className={`header ${fira.className}`}>{"ALL STAR KARAOKE \u2014 REACT SERVER COMPONENTS \u{1F980}"}</div>
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
