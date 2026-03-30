import { Suspense } from "react";
import {
  Inter, Playfair_Display, Fira_Code, Cormorant_Garamond, Noto_Color_Emoji,
  Abril_Fatface, Bebas_Neue, Cinzel, Dancing_Script, EB_Garamond,
  Josefin_Sans, Lora, Merriweather, Montserrat, Oswald,
  Pacifico, Permanent_Marker, Raleway, Rubik, Space_Grotesk,
  Space_Mono, Unbounded, Archivo_Black, Bitter, Caveat,
  DM_Serif_Display, Instrument_Serif, Outfit, Syne,
} from "next/font/google";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const notoEmoji = Noto_Color_Emoji({ subsets: ["emoji"], weight: "400", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });
const fira = Fira_Code({ subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "600", "700"], display: "swap" });
const abril = Abril_Fatface({ subsets: ["latin"], weight: "400", display: "swap" });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], display: "swap" });
const dancing = Dancing_Script({ subsets: ["latin"], display: "swap" });
const ebGaramond = EB_Garamond({ subsets: ["latin"], display: "swap" });
const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });
const lora = Lora({ subsets: ["latin"], display: "swap" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700", "900"], display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });
const oswald = Oswald({ subsets: ["latin"], display: "swap" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", display: "swap" });
const permanentMarker = Permanent_Marker({ subsets: ["latin"], weight: "400", display: "swap" });
const raleway = Raleway({ subsets: ["latin"], display: "swap" });
const rubik = Rubik({ subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const unbounded = Unbounded({ subsets: ["latin"], display: "swap" });
const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: "400", display: "swap" });
const bitter = Bitter({ subsets: ["latin"], display: "swap" });
const caveat = Caveat({ subsets: ["latin"], display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], display: "swap" });
const syne = Syne({ subsets: ["latin"], display: "swap" });

const verseFonts = [inter, lora, merriweather, raleway, rubik, josefin, ebGaramond, montserrat, bitter, outfit, spaceGrotesk, cormorant, syne].map(f => f.className);
const chorusFonts = [playfair, abril, bebas, cinzel, permanentMarker, oswald, unbounded, archivoBlack, dmSerif, instrumentSerif, syne].map(f => f.className);
const bridgeFonts = [cormorant, dancing, caveat, pacifico, lora, instrumentSerif, ebGaramond, merriweather].map(f => f.className);
const outroFonts = [playfair, abril, cinzel, dmSerif, instrumentSerif, unbounded].map(f => f.className);
const crabFonts = [fira, spaceMono, spaceGrotesk, outfit, rubik].map(f => f.className);
const titleFonts = [playfair, cinzel, abril, unbounded, bebas].map(f => f.className);
const subtitleFonts = [fira, spaceMono, spaceGrotesk].map(f => f.className);

function pickFont(id: number, kind: string): string {
  switch (kind) {
    case "chorus": return chorusFonts[id % chorusFonts.length];
    case "bridge": return bridgeFonts[id % bridgeFonts.length];
    case "outro":  return outroFonts[id % outroFonts.length];
    case "crab":   return crabFonts[id % crabFonts.length];
    case "title":  return titleFonts[id % titleFonts.length];
    case "subtitle": return subtitleFonts[id % subtitleFonts.length];
    default:       return verseFonts[id % verseFonts.length];
  }
}

const versePalette = [[185,55,72],[195,48,68],[170,60,75],[200,45,70],[175,52,74],[190,50,66],[180,58,70],[205,42,72]];
const chorusPalette = [[38,95,62],[45,98,58],[28,92,65],[50,96,60],[35,94,63],[42,97,56]];
const bridgePalette = [[260,40,75],[275,45,72],[250,38,78],[265,42,73]];
const outroPalette = [[38,90,68],[42,85,72],[35,88,65]];

// ─── Deterministic pseudo-random tilt per line ───
function tiltFor(id: number): number {
  const seed = ((id * 2654435761) >>> 0) % 1000;
  return ((seed / 1000) - 0.5) * 2.4; // -1.2 to +1.2 degrees
}

async function Lyric({ ms, children, id, kind }: {
  ms: number; children?: React.ReactNode; id: number;
  kind?: "verse"|"chorus"|"break"|"crab"|"bridge"|"outro"|"title"|"subtitle";
}) {
  if (ms > 0) await new Promise((r) => setTimeout(r, ms));
  if (kind === "break") return <div className="lyric-break" data-kind="break" />;

  const palette = kind === "chorus" ? chorusPalette[id % chorusPalette.length]
    : kind === "outro" ? outroPalette[id % outroPalette.length]
    : kind === "bridge" ? bridgePalette[id % bridgePalette.length]
    : versePalette[id % versePalette.length];
  const [h, s, l] = palette;
  const h2 = (h + 35) % 360;
  const h3 = (h + 70) % 360;
  const tilt = tiltFor(id);

  const entrancesBase = [
    `from{opacity:0;transform:translateY(18px) scale(0.97) rotate(${tilt}deg)}to{opacity:1;transform:translateY(0) scale(1) rotate(${tilt}deg)}`,
    `from{opacity:0;transform:translateX(-15px) rotate(${tilt}deg)}to{opacity:1;transform:translateX(0) rotate(${tilt}deg)}`,
    `from{opacity:0;transform:translateY(12px) rotate(${tilt}deg)}to{opacity:1;transform:translateY(0) rotate(${tilt}deg)}`,
    `from{opacity:0;transform:scale(0.94) rotate(${tilt}deg)}to{opacity:1;transform:scale(1) rotate(${tilt}deg)}`,
  ];
  const entrancesDesktop = [
    `from{opacity:0;transform:translateY(22px) scale(0.95) rotate(${tilt}deg);filter:blur(8px)}to{opacity:1;transform:translateY(0) scale(1) rotate(${tilt}deg);filter:blur(0)}`,
    `from{opacity:0;transform:translateX(-25px) scale(0.98) rotate(${tilt}deg);filter:blur(6px)}to{opacity:1;transform:translateX(0) scale(1) rotate(${tilt}deg);filter:blur(0)}`,
    `from{opacity:0;transform:translateY(15px) rotateX(8deg) rotate(${tilt}deg);filter:blur(5px)}to{opacity:1;transform:translateY(0) rotateX(0) rotate(${tilt}deg);filter:blur(0)}`,
    `from{opacity:0;transform:scale(0.88) rotate(${tilt}deg);filter:blur(12px)}to{opacity:1;transform:scale(1) rotate(${tilt}deg);filter:blur(0)}`,
  ];

  const eBase = entrancesBase[id % entrancesBase.length];
  const eDesk = entrancesDesktop[id % entrancesDesktop.length];
  const dur = kind === "outro" ? 1.2 : kind === "title" ? 1.5 : 0.6 + (id % 3) * 0.12;
  const easing = ["cubic-bezier(0.16,1,0.3,1)","cubic-bezier(0.34,1.56,0.64,1)","cubic-bezier(0.22,1,0.36,1)","cubic-bezier(0.25,0.46,0.45,0.94)"][id % 4];

  let styles = "";
  let extraKeyframes = "";
  let wrapperClass = "";
  const transformOrigin = `transform-origin:${50 + (id % 3 - 1) * 10}% 50%;`;

  if (kind === "title") {
    extraKeyframes = `@keyframes shimmer-${id}{to{background-position:200% center}}`;
    styles = `font-size:clamp(2.5rem,8vw,5rem);font-weight:800;letter-spacing:0.08em;line-height:1.1;padding:0.5rem 0;text-align:center;${transformOrigin}
      background:linear-gradient(90deg,hsl(38,95%,65%),hsl(45,98%,75%),hsl(28,92%,60%),hsl(38,95%,65%));background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      filter:drop-shadow(0 0 30px hsla(38,95%,60%,0.3));animation:fadeIn-${id} ${dur}s ${easing} forwards,shimmer-${id} 4s linear infinite;`;
  } else if (kind === "subtitle") {
    styles = `font-size:0.9rem;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;text-align:center;padding:0.3rem 0;color:hsla(200,40%,55%,0.6);${transformOrigin}animation:fadeIn-${id} ${dur+0.5}s ${easing} forwards;`;
  } else if (kind === "chorus") {
    const shimmerSpeed = 2.5 + (id % 3) * 0.3;
    extraKeyframes = `@keyframes shimmer-${id}{to{background-position:200% center}}@keyframes breathe-${id}{0%,100%{transform:scale(1) rotate(${tilt}deg)}50%{transform:scale(1.02) rotate(${tilt}deg)}}`;
    styles = `font-size:clamp(1.8rem,5vw,2.8rem);font-weight:800;letter-spacing:0.05em;line-height:1.25;padding:0.5rem 0;${transformOrigin}
      background:linear-gradient(90deg,hsl(${h},${s}%,${l}%),hsl(${h2},${s}%,${l+10}%),hsl(${h3},${s}%,${l}%),hsl(${h},${s}%,${l}%));background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      filter:drop-shadow(0 0 20px hsla(${h},${s}%,${l}%,0.3));animation:fadeIn-${id} ${dur}s ${easing} forwards,shimmer-${id} ${shimmerSpeed}s linear infinite,breathe-${id} 3s ease-in-out 0.8s infinite;`;
    wrapperClass = "chorus-line";
  } else if (kind === "outro") {
    extraKeyframes = `@keyframes shimmer-${id}{to{background-position:200% center}}`;
    styles = `font-size:clamp(2rem,6vw,3.2rem);font-weight:800;letter-spacing:0.04em;line-height:1.3;text-align:center;padding:0.8rem 0;${transformOrigin}
      background:linear-gradient(90deg,hsl(${h},${s}%,${l}%),hsl(${h2},${s-5}%,${l+8}%),hsl(${h3},${s}%,${l}%),hsl(${h},${s}%,${l}%));background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      filter:drop-shadow(0 0 35px hsla(${h},${s}%,${l}%,0.25));animation:fadeIn-${id} ${dur}s ${easing} forwards,shimmer-${id} 4s linear infinite;`;
  } else if (kind === "bridge") {
    styles = `font-size:clamp(1.4rem,4vw,2.2rem);font-weight:300;letter-spacing:0.02em;font-style:italic;line-height:1.5;padding:0.5rem 0;${transformOrigin}color:hsl(${h},${s}%,${l}%);text-shadow:0 0 18px hsla(${h},${s}%,${l}%,0.2);animation:fadeIn-${id} ${dur}s ${easing} forwards;`;
  } else if (kind === "crab") {
    styles = `font-size:clamp(0.75rem,2vw,0.95rem);font-weight:400;letter-spacing:0.06em;padding:0.25rem 0;${transformOrigin}color:hsla(15,70%,50%,0.5);animation:fadeIn-${id} ${dur+0.4}s ${easing} forwards;`;
  } else {
    styles = `font-size:clamp(1.3rem,4vw,1.95rem);font-weight:400;letter-spacing:0.01em;line-height:1.45;padding:0.35rem 0;${transformOrigin}color:hsl(${h},${s}%,${l}%);text-shadow:0 0 10px hsla(${h},${s}%,${l}%,0.1);animation:fadeIn-${id} ${dur}s ${easing} forwards;`;
  }

  const css = `@keyframes fadeIn-${id}{${eBase}}@media(hover:hover)and (min-width:768px){@keyframes fadeIn-${id}{${eDesk}}}${extraKeyframes}.lyric-${id}{opacity:0;${styles}}`;
  const fontClass = pickFont(id, kind || "verse");

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className={`lyric-${id} ${fontClass} ${wrapperClass}`} data-kind={kind || "verse"}>{children}</div>
    </div>
  );
}

function StageEffects() {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
(function(){
var W,H;
function lerp(a,b,t){return a+(b-a)*t}

// ═══════════ CANVAS ═══════════
var c=document.createElement('canvas');
c.id='particles';c.style.cssText='position:fixed;inset:0;z-index:0;pointer-events:none;';
document.body.prepend(c);
var ctx=c.getContext('2d');
function resize(){W=c.width=innerWidth;H=c.height=innerHeight}
resize();addEventListener('resize',resize);

// ═══════════ PROGRESS BAR ═══════════
var prog=document.createElement('div');
prog.style.cssText='position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,hsl(200,70%,50%),hsl(38,95%,65%),hsl(260,60%,65%));z-index:100;width:0;transition:width 0.3s ease;';
document.body.appendChild(prog);

// ═══════════ PARTICLES ═══════════
var N=Math.min(80,Math.floor(innerWidth/15));
var particles=[];
for(var i=0;i<N;i++){
  particles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2+0.5,
    vx:(Math.random()-0.5)*0.3,vy:-(Math.random()*0.4+0.1),alpha:Math.random()*0.4+0.1,
    pulse:Math.random()*Math.PI*2,pulseSpeed:Math.random()*0.02+0.005,
    hue:Math.random()<0.6?200+Math.random()*40:Math.random()<0.5?260+Math.random()*30:30+Math.random()*20});
}

// ═══════════ SHOOTING STARS ═══════════
var shootingStars=[];
function spawnShootingStar(){
  shootingStars.push({x:Math.random()*W*0.8,y:Math.random()*H*0.3,
    vx:3+Math.random()*4,vy:1.5+Math.random()*2,life:1,decay:0.008+Math.random()*0.006,
    len:40+Math.random()*60,hue:180+Math.random()*60});
}

// ═══════════ CONFETTI ═══════════
var confetti=[];
function spawnConfetti(cx,cy,count){
  for(var i=0;i<count;i++){
    var angle=Math.random()*Math.PI*2;
    var speed=2+Math.random()*6;
    confetti.push({x:cx,y:cy,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-3,
      r:Math.random()*4+2,hue:Math.random()*360,life:1,decay:0.005+Math.random()*0.008,
      rot:Math.random()*360,rotSpeed:(Math.random()-0.5)*10,
      w:Math.random()*6+3,h:Math.random()*3+1});
  }
}

// ═══════════ CLICK BURSTS ═══════════
var clickBursts=[];
document.addEventListener('click',function(e){
  for(var i=0;i<20;i++){
    var angle=Math.random()*Math.PI*2;
    var speed=1+Math.random()*4;
    clickBursts.push({x:e.clientX,y:e.clientY,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,
      r:Math.random()*3+1,hue:Math.random()*360,life:1,decay:0.015+Math.random()*0.01});
  }
});

// ═══════════ CURSOR SPARKLE TRAIL (desktop) ═══════════
var mouseX=-100,mouseY=-100;
var sparkles=[];
if(matchMedia('(hover:hover)').matches){
  document.addEventListener('mousemove',function(e){
    mouseX=e.clientX;mouseY=e.clientY;
    if(Math.random()>0.3)sparkles.push({x:mouseX+(Math.random()-0.5)*8,y:mouseY+(Math.random()-0.5)*8,
      r:Math.random()*2.5+0.5,life:1,decay:0.02+Math.random()*0.02,
      hue:Math.random()*60+20,vx:(Math.random()-0.5)*0.5,vy:-Math.random()*0.8});
  });
}

// ═══════════ EMOJI RAIN ═══════════
var emojiRain=[];
var emojiChars=['⭐','🌟','💫','✨','🔥','🌠','⚡'];
function spawnEmojiRain(){
  emojiRain.push({x:Math.random()*W,y:-30,vy:0.5+Math.random()*1.5,vx:(Math.random()-0.5)*0.3,
    char:emojiChars[Math.floor(Math.random()*emojiChars.length)],
    size:12+Math.random()*16,alpha:0.6+Math.random()*0.4,rot:Math.random()*360,rotSpeed:(Math.random()-0.5)*2});
}

// ═══════════ COMETS ═══════════
var comets=[];
function spawnComet(){
  var fromLeft=Math.random()>0.5;
  comets.push({x:fromLeft?-50:W+50,y:Math.random()*H*0.4,
    vx:fromLeft?(4+Math.random()*3):-(4+Math.random()*3),vy:0.5+Math.random(),
    life:1,decay:0.003,trail:[],hue:30+Math.random()*30});
}

// ═══════════ EQUALIZER ═══════════
var eqBars=24;
var eqHeights=[];for(var i=0;i<eqBars;i++)eqHeights.push(0);

// ═══════════ SECTION + STATE ═══════════
var currentSection='title';
var prevSection='title';
var targetBg={h:225,s:50,l:3};
var currentBg={h:225,s:50,l:3};
var sectionColors={verse:{h:220,s:50,l:3},chorus:{h:15,s:40,l:5},bridge:{h:260,s:35,l:4},outro:{h:30,s:30,l:3},title:{h:225,s:50,l:3},subtitle:{h:225,s:50,l:3},crab:{h:15,s:20,l:2}};
var totalLyrics=0;var shakeAmount=0;var pageRotation=0;
var titleConfettiFired=false;
var emojiRainActive=false;

// ═══════════ KONAMI CODE ═══════════
var konamiSeq=[38,38,40,40,37,39,37,39,66,65];
var konamiPos=0;
var konamiActive=false;
document.addEventListener('keydown',function(e){
  if(e.keyCode===konamiSeq[konamiPos]){konamiPos++;
    if(konamiPos===konamiSeq.length){konamiActive=true;konamiPos=0;
      document.body.style.transition='filter 1s';document.body.style.filter='hue-rotate(180deg)';
      spawnConfetti(W/2,H/2,200);
      setTimeout(function(){document.body.style.filter='none'},5000);
    }
  }else konamiPos=0;
});

// ═══════════ CRAB WALKER ═══════════
var crabEl=document.createElement('div');
crabEl.textContent='🦀';
crabEl.style.cssText='position:fixed;bottom:12px;left:-50px;font-size:28px;z-index:50;transition:none;pointer-events:none;opacity:0;';
document.body.appendChild(crabEl);
var crabX=-50;var crabActive=false;var crabDir=1;

// ═══════════ MUTATION OBSERVER ═══════════
var obs=new MutationObserver(function(){
  var els=document.querySelectorAll('[data-kind]');
  totalLyrics=els.length;
  if(els.length){
    var last=els[els.length-1];
    var k=last.getAttribute('data-kind');
    if(k&&k!=='break'&&sectionColors[k]){
      prevSection=currentSection;
      currentSection=k;
      targetBg=sectionColors[k];
      // Section transition effects
      if(prevSection!==currentSection){
        if(currentSection==='chorus'){shakeAmount=6;spawnShootingStar();spawnShootingStar();}
        if(prevSection==='chorus'&&currentSection!=='chorus')spawnComet();
        if(currentSection==='bridge')spawnComet();
      }
      // Title confetti
      if(k==='title'&&!titleConfettiFired){titleConfettiFired=true;setTimeout(function(){spawnConfetti(W/2,H*0.3,150)},1200);}
      // Chorus shake
      if(k==='chorus'){shakeAmount=Math.max(shakeAmount,3);}
      // Crab walker during credits
      if(k==='crab'&&!crabActive){crabActive=true;crabEl.style.opacity='1';}
      // Emoji rain during outro
      if(k==='outro'||k==='crab')emojiRainActive=true;
      else emojiRainActive=false;
    }
  }
  // Progress bar
  var expected=112; // approximate total lyric count
  var pct=Math.min(totalLyrics/expected*100,100);
  prog.style.width=pct+'%';
  if(pct>99)prog.style.background='linear-gradient(90deg,hsl(38,95%,65%),hsl(45,98%,75%),hsl(38,95%,65%))';
  // Auto-scroll
  window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});
});
function attachObserver(){var lyr=document.querySelector('.lyrics');if(lyr){obs.observe(lyr,{childList:true,subtree:true});return}setTimeout(attachObserver,50)}
attachObserver();

// ═══════════ SPOTLIGHT + VIGNETTE ═══════════
var spotlight=document.createElement('div');
spotlight.style.cssText='position:fixed;inset:0;z-index:1;pointer-events:none;';
document.body.prepend(spotlight);
var vig=document.createElement('div');
vig.style.cssText='position:fixed;inset:0;z-index:1;pointer-events:none;';
document.body.appendChild(vig);
var vigPulse=0;

// ═══════════ FRAME COUNTER ═══════════
var frameCount=0;
var emojiTimer=0;
var shootingStarTimer=0;

// ═══════════ RENDER LOOP ═══════════
function frame(){
  frameCount++;
  currentBg.h=lerp(currentBg.h,targetBg.h,0.008);
  currentBg.s=lerp(currentBg.s,targetBg.s,0.008);
  currentBg.l=lerp(currentBg.l,targetBg.l,0.008);

  ctx.clearRect(0,0,W,H);

  // Background gradient
  var grad=ctx.createRadialGradient(W*0.3,H*0.4,0,W*0.5,H*0.5,Math.max(W,H));
  grad.addColorStop(0,'hsl('+currentBg.h+','+(currentBg.s+15)+'%,'+(currentBg.l+4)+'%)');
  grad.addColorStop(0.5,'hsl('+(currentBg.h+20)+','+currentBg.s+'%,'+(currentBg.l+1)+'%)');
  grad.addColorStop(1,'hsl('+(currentBg.h-10)+','+(currentBg.s-10)+'%,'+currentBg.l+'%)');
  ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);

  var isChorus=currentSection==='chorus'||currentSection==='outro';

  // ── Particles ──
  for(var i=0;i<particles.length;i++){
    var p=particles[i];p.pulse+=p.pulseSpeed;
    var a=p.alpha+Math.sin(p.pulse)*0.15;
    if(isChorus)a=Math.min(a*1.8,0.8);
    var dh=p.hue;
    if(currentSection==='chorus')dh=lerp(p.hue,40,0.3);
    else if(currentSection==='bridge')dh=lerp(p.hue,270,0.3);
    ctx.beginPath();ctx.arc(p.x,p.y,p.r*(isChorus?1.3:1),0,Math.PI*2);
    ctx.fillStyle='hsla('+Math.round(dh)+',70%,70%,'+a.toFixed(3)+')';ctx.fill();
    if(W>768&&p.r>1){ctx.beginPath();ctx.arc(p.x,p.y,p.r*3,0,Math.PI*2);
      ctx.fillStyle='hsla('+Math.round(dh)+',60%,60%,'+(a*0.15).toFixed(3)+')';ctx.fill();}
    p.x+=p.vx;p.y+=p.vy;
    if(p.y<-10){p.y=H+10;p.x=Math.random()*W}
    if(p.x<-10)p.x=W+10;if(p.x>W+10)p.x=-10;
  }

  // ── Shooting Stars ──
  // ── Shooting Stars ──
  for(var i=shootingStars.length-1;i>=0;i--){
    var ss=shootingStars[i];
    ctx.beginPath();ctx.moveTo(ss.x,ss.y);ctx.lineTo(ss.x-ss.vx*ss.len*ss.life*0.15,ss.y-ss.vy*ss.len*ss.life*0.15);
    ctx.strokeStyle='hsla('+ss.hue+',80%,80%,'+ss.life.toFixed(2)+')';ctx.lineWidth=2*ss.life;ctx.stroke();
    ctx.beginPath();ctx.arc(ss.x,ss.y,2*ss.life,0,Math.PI*2);
    ctx.fillStyle='hsla('+ss.hue+',90%,90%,'+ss.life.toFixed(2)+')';ctx.fill();
    ss.x+=ss.vx;ss.y+=ss.vy;ss.life-=ss.decay;
    if(ss.life<=0)shootingStars.splice(i,1);
  }

  // ── Confetti ──
  for(var i=confetti.length-1;i>=0;i--){
    var cf=confetti[i];
    ctx.save();ctx.translate(cf.x,cf.y);ctx.rotate(cf.rot*Math.PI/180);
    ctx.fillStyle='hsla('+cf.hue+',90%,65%,'+cf.life.toFixed(2)+')';
    ctx.fillRect(-cf.w/2,-cf.h/2,cf.w,cf.h);ctx.restore();
    cf.x+=cf.vx;cf.y+=cf.vy;cf.vy+=0.08;cf.vx*=0.99;cf.rot+=cf.rotSpeed;cf.life-=cf.decay;
    if(cf.life<=0||cf.y>H+20)confetti.splice(i,1);
  }

  // ── Click Bursts ──
  for(var i=clickBursts.length-1;i>=0;i--){
    var cb=clickBursts[i];
    ctx.beginPath();ctx.arc(cb.x,cb.y,cb.r*cb.life,0,Math.PI*2);
    ctx.fillStyle='hsla('+cb.hue+',80%,70%,'+cb.life.toFixed(2)+')';ctx.fill();
    cb.x+=cb.vx;cb.y+=cb.vy;cb.vy+=0.03;cb.life-=cb.decay;
    if(cb.life<=0)clickBursts.splice(i,1);
  }

  // ── Cursor Sparkles ──
  for(var i=sparkles.length-1;i>=0;i--){
    var sp=sparkles[i];
    ctx.beginPath();ctx.arc(sp.x,sp.y,sp.r*sp.life,0,Math.PI*2);
    ctx.fillStyle='hsla('+sp.hue+',90%,75%,'+sp.life.toFixed(2)+')';ctx.fill();
    if(sp.r*sp.life>1){ctx.beginPath();ctx.arc(sp.x,sp.y,sp.r*sp.life*2.5,0,Math.PI*2);
      ctx.fillStyle='hsla('+sp.hue+',80%,65%,'+(sp.life*0.15).toFixed(3)+')';ctx.fill();}
    sp.x+=sp.vx;sp.y+=sp.vy;sp.life-=sp.decay;
    if(sp.life<=0)sparkles.splice(i,1);
  }

  // ── Comets ──
  for(var i=comets.length-1;i>=0;i--){
    var cm=comets[i];
    cm.trail.push({x:cm.x,y:cm.y});if(cm.trail.length>40)cm.trail.shift();
    for(var j=0;j<cm.trail.length;j++){
      var ta=j/cm.trail.length*cm.life;var tr=cm.trail[j];
      ctx.beginPath();ctx.arc(tr.x,tr.y,(j/cm.trail.length)*3*cm.life,0,Math.PI*2);
      ctx.fillStyle='hsla('+cm.hue+',80%,70%,'+(ta*0.4).toFixed(3)+')';ctx.fill();
    }
    ctx.beginPath();ctx.arc(cm.x,cm.y,4*cm.life,0,Math.PI*2);
    ctx.fillStyle='hsla('+cm.hue+',90%,85%,'+cm.life.toFixed(2)+')';ctx.fill();
    ctx.beginPath();ctx.arc(cm.x,cm.y,8*cm.life,0,Math.PI*2);
    ctx.fillStyle='hsla('+cm.hue+',80%,75%,'+(cm.life*0.2).toFixed(3)+')';ctx.fill();
    cm.x+=cm.vx;cm.y+=cm.vy;cm.life-=cm.decay;
    if(cm.life<=0||cm.x<-100||cm.x>W+100)comets.splice(i,1);
  }

  // ── Emoji Rain ──
  if(emojiRainActive){emojiTimer++;if(emojiTimer%8===0)spawnEmojiRain();}
  for(var i=emojiRain.length-1;i>=0;i--){
    var em=emojiRain[i];
    ctx.save();ctx.translate(em.x,em.y);ctx.rotate(em.rot*Math.PI/180);
    ctx.globalAlpha=em.alpha;ctx.font=em.size+'px serif';ctx.textAlign='center';
    ctx.fillText(em.char,0,0);ctx.restore();ctx.globalAlpha=1;
    em.y+=em.vy;em.x+=em.vx;em.rot+=em.rotSpeed;
    if(em.y>H+50)emojiRain.splice(i,1);
  }

  // ── Equalizer ──
  var barW=Math.floor(W/eqBars);
  var maxH=isChorus?50:currentSection==='bridge'?15:25;
  var eqH=currentSection==='crab'?8:maxH;
  for(var i=0;i<eqBars;i++){
    var target=Math.random()*eqH;eqHeights[i]=lerp(eqHeights[i],target,0.15);
    var bh=eqHeights[i];
    var eqHue=lerp(currentBg.h,currentBg.h+60,i/eqBars);
    ctx.fillStyle='hsla('+Math.round(eqHue)+',60%,50%,0.15)';
    ctx.fillRect(i*barW,H-bh,barW-1,bh);
    ctx.fillStyle='hsla('+Math.round(eqHue)+',70%,65%,0.25)';
    ctx.fillRect(i*barW,H-bh,barW-1,2);
  }

  // ── Periodic shooting stars ──
  shootingStarTimer++;
  if(shootingStarTimer>180+Math.random()*120){shootingStarTimer=0;spawnShootingStar();}

  // ── Spotlight ──
  var spotH=currentSection==='chorus'?38:currentSection==='bridge'?260:currentSection==='outro'?35:200;
  var spotA=isChorus?0.08:0.03;
  spotlight.style.background='radial-gradient(ellipse at 50% 85%,hsla('+spotH+',60%,40%,'+spotA+') 0%,transparent 60%)';

  // ── Breathing vignette ──
  vigPulse+=0.008;
  var vigA=0.65+Math.sin(vigPulse)*0.08;
  vig.style.background='radial-gradient(ellipse at center,transparent '+(28+Math.sin(vigPulse)*4)+'%,hsla(225,50%,2%,'+vigA.toFixed(2)+') 100%)';

  // ── Screen shake ──
  if(shakeAmount>0){
    var sx=(Math.random()-0.5)*shakeAmount;var sy=(Math.random()-0.5)*shakeAmount;
    document.body.style.transform='translate('+sx.toFixed(1)+'px,'+sy.toFixed(1)+'px) rotate('+pageRotation.toFixed(4)+'deg)';
    shakeAmount*=0.92;if(shakeAmount<0.3)shakeAmount=0;
  }else{
    document.body.style.transform='rotate('+pageRotation.toFixed(4)+'deg)';
  }

  // ── Imperceptible page rotation ──
  pageRotation+=0.00015; // ~0.5 degrees over the whole song

  // ── Crab walker ──
  if(crabActive){
    crabX+=crabDir*0.6;
    if(crabX>W+30){crabDir=-1;crabEl.style.transform='scaleX(-1)';}
    if(crabX<-30){crabDir=1;crabEl.style.transform='scaleX(1)';}
    crabEl.style.left=crabX+'px';
    crabEl.style.bottom=(12+Math.sin(frameCount*0.05)*3)+'px';
  }

  requestAnimationFrame(frame);
}
frame();
})();
    `}} />
  );
}

const lyrics: [number, string, ("verse"|"chorus"|"break"|"crab"|"bridge"|"outro"|"title"|"subtitle")?][] = [
  [0,"","break"],[500,"","break"],
  [800,"ALL STAR","title"],
  [2500,"react server components karaoke","subtitle"],
  [1500,"streaming from the deep","subtitle"],
  [3000,"","break"],[2000,"","break"],[1500,"","break"],
  // Verse 1
  [500,"Somebody once told me","verse"],
  [2200,"the world is gonna roll me","verse"],
  [2200,"I ain\u0027t the sharpest tool in the shed","verse"],
  [3200,"She was looking kind of dumb","verse"],
  [1800,"with her finger and her thumb","verse"],
  [2200,"In the shape of an \u201CL\u201D on her forehead","verse"],
  [3800,"","break"],
  // Pre-chorus 1
  [500,"Well the years start coming","verse"],
  [1600,"and they don\u0027t stop coming","verse"],
  [2000,"Fed to the rules","verse"],
  [1200,"and I hit the ground running","verse"],
  [2400,"Didn\u0027t make sense not to live for fun","verse"],
  [2800,"Your brain gets smart","verse"],
  [1400,"but your head gets dumb","verse"],
  [2800,"","break"],
  [500,"So much to do, so much to see","verse"],
  [2400,"So what\u0027s wrong with taking the backstreets?","verse"],
  [2800,"You\u0027ll never know if you don\u0027t go","verse"],
  [2500,"You\u0027ll never shine if you don\u0027t glow","verse"],
  [3500,"","break"],
  // Chorus 1
  [800,"HEY NOW","chorus"],
  [1000,"YOU\u0027RE AN ALL STAR","chorus"],
  [1800,"GET YOUR GAME ON, GO PLAY","chorus"],
  [2400,"HEY NOW","chorus"],
  [1000,"YOU\u0027RE A ROCK STAR","chorus"],
  [1800,"GET THE SHOW ON, GET PAID","chorus"],
  [2800,"And all that glitters is gold","chorus"],
  [3000,"Only shooting stars break the mold","chorus"],
  [4000,"","break"],
  // Verse 2
  [800,"It\u0027s a cool place","verse"],
  [1500,"and they say it gets colder","verse"],
  [2400,"You\u0027re bundled up now","verse"],
  [1500,"wait till you get older","verse"],
  [2800,"But the meteor men beg to differ","verse"],
  [2800,"Judging by the hole in the satellite picture","verse"],
  [3500,"","break"],
  [500,"The ice we skate is getting pretty thin","verse"],
  [2800,"The water\u0027s getting warm","verse"],
  [1500,"so you might as well swim","verse"],
  [2800,"My world\u0027s on fire, how about yours?","verse"],
  [2800,"That\u0027s the way I like it","verse"],
  [1800,"and I\u0027ll never get bored","verse"],
  [3500,"","break"],
  // Chorus 2
  [800,"HEY NOW","chorus"],
  [1000,"YOU\u0027RE AN ALL STAR","chorus"],
  [1800,"GET YOUR GAME ON, GO PLAY","chorus"],
  [2400,"HEY NOW","chorus"],
  [1000,"YOU\u0027RE A ROCK STAR","chorus"],
  [1800,"GET THE SHOW ON, GET PAID","chorus"],
  [2800,"And all that glitters is gold","chorus"],
  [3000,"Only shooting stars break the mold","chorus"],
  [4000,"","break"],
  // Bridge
  [2000,"Somebody once asked","bridge"],
  [2800,"could I spare some change for gas?","bridge"],
  [3200,"\u201CI need to get myself away from this place\u201D","bridge"],
  [3800,"I said, \u201CYep, what a concept\u201D","bridge"],
  [3200,"I could use a little fuel myself","bridge"],
  [3000,"And we could all use a little change","bridge"],
  [4500,"","break"],
  // Pre-chorus 3
  [500,"Well the years start coming","verse"],
  [1600,"and they don\u0027t stop coming","verse"],
  [2000,"Fed to the rules","verse"],
  [1200,"and I hit the ground running","verse"],
  [2400,"Didn\u0027t make sense not to live for fun","verse"],
  [2800,"Your brain gets smart","verse"],
  [1400,"but your head gets dumb","verse"],
  [2800,"","break"],
  [500,"So much to do, so much to see","verse"],
  [2400,"So what\u0027s wrong with taking the backstreets?","verse"],
  [2800,"You\u0027ll never know if you don\u0027t go","verse"],
  [2500,"You\u0027ll never shine if you don\u0027t glow","verse"],
  [3500,"","break"],
  // Final Chorus
  [800,"HEY NOW","chorus"],
  [1000,"YOU\u0027RE AN ALL STAR","chorus"],
  [1800,"GET YOUR GAME ON, GO PLAY","chorus"],
  [2400,"HEY NOW","chorus"],
  [1000,"YOU\u0027RE A ROCK STAR","chorus"],
  [1800,"GET THE SHOW ON, GET PAID","chorus"],
  [2800,"And all that glitters is gold","chorus"],
  [3000,"Only shooting stars break the mold","chorus"],
  [5000,"","break"],
  // Outro
  [2500,"And all that glitters is gold","outro"],
  [4500,"Only shooting stars","outro"],
  [3500,"break the mold","outro"],
  [6000,"","break"],
  // Credits
  [2500,"\u{1F980}","crab"],
  [2500,"streamed via react server components","crab"],
  [1800,"~100 async components. ~100 suspense boundaries.","crab"],
  [1800,"each line rendered on the server, streamed to your browser","crab"],
  [1800,"29 google fonts. every line a different typeface.","crab"],
  [2200,"canvas particle system with shooting stars and comets","crab"],
  [2000,"cursor sparkle trail. click anywhere for particle bursts.","crab"],
  [2200,"screen shake on chorus. breathing vignette. emoji rain.","crab"],
  [1800,"a tiny crab walks across the bottom during credits","crab"],
  [2000,"equalizer. confetti cannon. konami code easter egg.","crab"],
  [2200,"the page is slowly rotating. you haven\u0027t noticed yet.","crab"],
  [2500,"next.js 16 on k3s. seven nodes. plainfield, illinois.","crab"],
  [3000,"built by a crab on a rack-mounted server","crab"],
  [2000,"","break"],
  [3000,"this is fine.","crab"],
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
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
        body{min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:4rem 2rem 8rem;overflow-x:hidden;background:hsl(225,50%,3%);transform-origin:50% 50%}
        .lyrics{max-width:800px;width:100%;position:relative;z-index:2}
        .lyric-break{height:2rem}
        .chorus-line{position:relative}
        .chorus-line::before{content:"";position:absolute;left:-2rem;top:50%;transform:translateY(-50%);width:3px;height:70%;background:linear-gradient(to bottom,transparent,hsla(38,90%,60%,0.3),transparent);border-radius:2px}
        @media(max-width:600px){body{padding:2rem 1.2rem 5rem}.lyrics{max-width:100%}.chorus-line::before{left:-0.8rem;width:2px}}
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
