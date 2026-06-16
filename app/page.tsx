"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// NAV
// ---------------------------------------------------------------------------
function Nav() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-6 bg-white/90 backdrop-blur-md border border-black/[0.06] rounded-full px-5 py-2.5 shadow-sm w-full max-w-2xl">
        {/* Wordmark */}
        <a href="/" className="flex-shrink-0 mr-2">
          <Image
            src="/Wordmark-Black.png"
            alt="Protégé"
            width={90}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </a>

        {/* Center links */}
        <div className="flex items-center gap-6 flex-1 justify-center">
          {["Discover", "For Mentors", "For Mentees"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(" ", "-")}`}
              className="text-sm text-protege-dark/70 hover:text-protege-dark transition-colors whitespace-nowrap"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="#"
            className="text-sm text-protege-dark/70 hover:text-protege-dark transition-colors px-2"
          >
            Log In
          </a>
          <a
            href="#"
            className="text-sm bg-protege-orange text-white rounded-full px-4 py-1.5 hover:bg-protege-orange/90 transition-colors font-medium"
          >
            Sign Up
          </a>
        </div>
      </nav>
    </header>
  );
}

// ---------------------------------------------------------------------------
// HERO — floating cards + parallax
// ---------------------------------------------------------------------------
// x = distance from edge; y = top offset. Varied to break the column pattern.
const leftCards = [
  { color: "#E8D5C4", w: 155, h: 120, rotate: -7,  x:  20,  y:  40,  depth: 1.3 },
  { color: "#C9B99A", w: 190, h: 155, rotate:  3,  x:  95,  y: 170,  depth: 2.5 },
  { color: "#D4C4B0", w: 130, h: 160, rotate: -5,  x:  30,  y: 360,  depth: 1.0 },
  { color: "#F0E6D8", w: 170, h: 110, rotate:  8,  x: 105,  y: 490,  depth: 2.2 },
  { color: "#E0CDB8", w: 145, h: 175, rotate: -2,  x:  45,  y: 650,  depth: 1.7 },
];

const rightCards = [
  { color: "#F0E6D8", w: 140, h: 170, rotate:  6,  x: 100,  y:  55,  depth: 2.0 },
  { color: "#E8D5C4", w: 175, h: 125, rotate: -3,  x:  25,  y: 200,  depth: 1.4 },
  { color: "#D4C4B0", w: 125, h: 155, rotate:  9,  x: 110,  y: 350,  depth: 2.6 },
  { color: "#C9B99A", w: 165, h: 140, rotate: -7,  x:  40,  y: 490,  depth: 1.1 },
  { color: "#E0CDB8", w: 145, h: 120, rotate:  4,  x:  85,  y: 660,  depth: 1.9 },
];

function Hero() {
  const mouse = useRef({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current = {
      x: (e.clientX / window.innerWidth  - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        setOffset({ x: mouse.current.x, y: mouse.current.y });
        rafRef.current = null;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-protege-cream overflow-hidden px-4">
      {/* Left floating cards */}
      <div className="absolute left-0 top-0 h-full w-64 pointer-events-none hidden lg:block">
        {leftCards.map((c, i) => (
          <div
            key={i}
            className="absolute rounded-2xl transition-transform duration-75 ease-out"
            style={{
              backgroundColor: c.color,
              width: c.w,
              height: c.h,
              left: c.x,
              top: c.y,
              rotate: `${c.rotate}deg`,
              transform: `rotate(${c.rotate}deg) translate(${offset.x * c.depth * 15}px, ${offset.y * c.depth * 9}px)`,
            }}
          />
        ))}
      </div>

      {/* Right floating cards */}
      <div className="absolute right-0 top-0 h-full w-64 pointer-events-none hidden lg:block">
        {rightCards.map((c, i) => (
          <div
            key={i}
            className="absolute rounded-2xl transition-transform duration-75 ease-out"
            style={{
              backgroundColor: c.color,
              width: c.w,
              height: c.h,
              right: c.x,
              top: c.y,
              transform: `rotate(${c.rotate}deg) translate(${offset.x * c.depth * -15}px, ${offset.y * c.depth * 9}px)`,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-protege-dark mb-4">
          Find the mentor you
          <br />
          <span style={{ color: "#FF6723" }}>always needed</span>.
        </h1>
        <p className="text-base sm:text-lg text-protege-dark/60 max-w-xl mx-auto mt-6 leading-relaxed">
          Browse real offerings from working creatives in Indianapolis. Short,
          structured sessions built around your actual work.
        </p>
        <div className="flex items-center justify-center gap-4 mt-10 flex-wrap">
          <a
            href="#discover"
            className="bg-protege-orange text-white rounded-full px-8 py-3.5 font-medium hover:bg-protege-orange/90 transition-colors text-sm sm:text-base"
          >
            Find a Mentor
          </a>
          <a
            href="#for-mentors"
            className="border border-protege-dark text-protege-dark rounded-full px-8 py-3.5 font-medium hover:bg-protege-dark hover:text-protege-cream transition-colors text-sm sm:text-base"
          >
            Become a Mentor
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// STATS — roll-up animation
// ---------------------------------------------------------------------------
function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return value;
}

const stats = [
  { number: 83, suffix: "%", label: "of student creatives don't have a mentor" },
  { number: 47, suffix: "%", label: "don't know where to look" },
  { number: 46, suffix: "%", label: "say reaching out feels awkward" },
];

function StatItem({
  number,
  suffix,
  label,
  active,
  index,
}: typeof stats[0] & { active: boolean; index: number }) {
  const val = useCountUp(number, active);
  return (
    <div
      className="flex flex-col items-center gap-3"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 700ms ease-out, transform 700ms ease-out",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <span className="font-black text-7xl sm:text-8xl lg:text-9xl leading-none text-white tabular-nums">
        {val}{suffix}
      </span>
      <span className="text-white/60 text-sm sm:text-base max-w-[200px] text-center leading-snug">
        {label}
      </span>
    </div>
  );
}

function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-visible bg-protege-dark py-24 px-6">
      {/* Circle divider straddling the hero/stats seam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-protege-dark flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-8 text-center">
          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} active={active} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// PILLARS
// ---------------------------------------------------------------------------

// Pillar 1 — Structure
interface Offering {
  initials: string;
  avatarBg: string;
  name: string;
  tag: string;
  title: string;
  format: string;
  duration: string;
  price: string;
  defaultTransform: string;
  hoverTransform: string;
  z: number;
}

const offerings: Offering[] = [
  {
    initials: "AR",
    avatarBg: "#FF6723",
    name: "Alex Rivera",
    tag: "Graphic Design",
    title: "Portfolio Review",
    format: "In-Person · 1-on-1",
    duration: "60 min · 1 session",
    price: "$45",
    defaultTransform: "translate(-50%, -50%) rotate(-4deg)",
    hoverTransform: "translate(calc(-50% - 260px), -50%) rotate(0deg)",
    z: 30,
  },
  {
    initials: "MK",
    avatarBg: "#141412",
    name: "Maya Kim",
    tag: "Brand Identity",
    title: "Brand Identity Crash Course",
    format: "In-Person · 1-on-1",
    duration: "4 weeks · 4 sessions",
    price: "$120",
    defaultTransform: "translate(calc(-50% + 28px), calc(-50% + 24px)) rotate(5deg)",
    hoverTransform: "translate(calc(-50% + 0px), -50%) rotate(0deg)",
    z: 20,
  },
  {
    initials: "JT",
    avatarBg: "#6B6B5E",
    name: "Jordan Tate",
    tag: "Photography",
    title: "Career Direction Call",
    format: "In-Person · 1-on-1",
    duration: "45 min · 1 session",
    price: "$35",
    defaultTransform: "translate(calc(-50% + 60px), calc(-50% + 52px)) rotate(14deg)",
    hoverTransform: "translate(calc(-50% + 260px), -50%) rotate(0deg)",
    z: 10,
  },
];

function OfferingCardStack() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative w-[240px] h-[420px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {offerings.map((o) => (
        <div
          key={o.initials}
          className="absolute top-1/2 left-1/2 w-[240px] bg-white rounded-2xl p-5 flex flex-col"
          style={{
            border: "1px solid rgba(20,20,18,0.10)",
            zIndex: o.z,
            transform: hovered ? o.hoverTransform : o.defaultTransform,
            transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Header: avatar + name + tag */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: o.avatarBg }}
            >
              {o.initials}
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-sm font-medium text-protege-dark truncate">{o.name}</span>
              <span
                className="text-[11px] rounded-full px-2 py-0.5 self-start"
                style={{ color: "#FF6723", backgroundColor: "rgba(255,103,35,0.08)" }}
              >
                {o.tag}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-black text-lg text-protege-dark leading-snug mb-3">
            {o.title}
          </h3>

          {/* Format + duration */}
          <div className="flex flex-col gap-1 text-xs text-protege-dark/50">
            <span>{o.format}</span>
            <span>{o.duration}</span>
          </div>

          {/* Price */}
          <div className="mt-4 pt-4 border-t border-protege-dark/10 flex justify-end">
            <span className="font-black text-protege-orange text-lg">{o.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Pillar 2 — Discovery
interface DisciplineSeed {
  label: string;
  x: number;
  y: number;
  rot: number;
}

// Scattered across a wider (~520px) and taller (~380px) play area.
const DISCIPLINE_SEEDS: DisciplineSeed[] = [
  { label: "Graphic Design",    x: 20,  y: 18,  rot: -4 },
  { label: "Photography",       x: 240, y: 10,  rot:  3 },
  { label: "Filmmaking",        x: 380, y: 30,  rot:  5 },
  { label: "Illustration",      x: 110, y: 74,  rot: -3 },
  { label: "Music Production",  x: 295, y: 78,  rot:  2 },
  { label: "Writing",           x: 18,  y: 126, rot: -5 },
  { label: "Brand Identity",    x: 195, y: 130, rot:  4 },
  { label: "UI/UX Design",      x: 360, y: 118, rot: -2 },
  { label: "Animation",         x: 60,  y: 186, rot:  6 },
  { label: "Editorial",         x: 270, y: 192, rot: -4 },
  { label: "Motion Design",     x: 20,  y: 248, rot:  3 },
  { label: "Portrait",          x: 380, y: 240, rot: -6 },
  { label: "Ceramics",          x: 160, y: 290, rot:  4 },
  { label: "Fashion",           x: 310, y: 308, rot: -3 },
];

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  dragging: boolean;
  slotted: boolean;
}

const FRICTION = 0.94;
const RESTITUTION = 0.65;
const PILL_RESTITUTION = 0.7;
const SLEEP_EPS = 0.05;
const MAX_SPEED = 40;
const DRAG_THRESHOLD = 5;

function DisciplinePanel() {
  // Physics play area ref (below slot bar)
  const playRef = useRef<HTMLDivElement | null>(null);
  // Outer panel ref (for slot position measurement)
  const outerRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const slotRectRef = useRef({ x: 0, y: 0, w: 140, h: 34 });
  const bodiesRef = useRef<Body[]>(
    DISCIPLINE_SEEDS.map((s) => ({
      x: s.x, y: s.y, vx: 0, vy: 0, w: 130, h: 34, rot: s.rot,
      dragging: false, slotted: false,
    }))
  );
  const boundsRef = useRef({ w: 520, h: 380 });
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const reducedRef = useRef(false);
  const dragRef = useRef<{
    id: number;
    pointerId: number;
    offsetX: number;
    offsetY: number;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    lastT: number;
    moved: boolean;
    fromSlot?: boolean;
  } | null>(null);

  const [slottedId, setSlottedId] = useState<number | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  // track slottedId in a ref for use inside callbacks without stale closure
  const slottedIdRef = useRef<number | null>(null);
  useEffect(() => { slottedIdRef.current = slottedId; }, [slottedId]);

  const paint = useCallback((i: number) => {
    const el = pillRefs.current[i];
    const b = bodiesRef.current[i];
    if (el && b) el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
  }, []);

  const startLoop = useCallback(() => {
    if (!runningRef.current) {
      runningRef.current = true;
      const loop = () => {
        const { w: innerW, h: innerH } = boundsRef.current;
        let awake = false;
        const bodies = bodiesRef.current;

        // Integration pass
        bodies.forEach((b, i) => {
          if (b.dragging || b.slotted) { if (b.dragging) awake = true; return; }
          if (b.vx === 0 && b.vy === 0) return;

          b.vx *= FRICTION;
          b.vy *= FRICTION;
          if (Math.abs(b.vx) < SLEEP_EPS) b.vx = 0;
          if (Math.abs(b.vy) < SLEEP_EPS) b.vy = 0;
          b.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, b.vx));
          b.vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, b.vy));

          b.x += b.vx;
          b.y += b.vy;

          const maxX = Math.max(0, innerW - b.w);
          const maxY = Math.max(0, innerH - b.h);
          if (b.x < 0) { b.x = 0; b.vx = -b.vx * RESTITUTION; }
          else if (b.x > maxX) { b.x = maxX; b.vx = -b.vx * RESTITUTION; }
          if (b.y < 0) { b.y = 0; b.vy = -b.vy * RESTITUTION; }
          else if (b.y > maxY) { b.y = maxY; b.vy = -b.vy * RESTITUTION; }

          if (b.vx !== 0 || b.vy !== 0) awake = true;
          paint(i);
        });

        // Pill-to-pill AABB collision (O(n²), n=14 → 91 pairs, trivially cheap)
        for (let i = 0; i < bodies.length; i++) {
          const a = bodies[i];
          if (a.slotted) continue;
          for (let j = i + 1; j < bodies.length; j++) {
            const b = bodies[j];
            if (b.slotted) continue;

            const cax = a.x + a.w / 2, cay = a.y + a.h / 2;
            const cbx = b.x + b.w / 2, cby = b.y + b.h / 2;
            const overlapX = (a.w + b.w) / 2 - Math.abs(cax - cbx);
            const overlapY = (a.h + b.h) / 2 - Math.abs(cay - cby);

            if (overlapX > 0 && overlapY > 0) {
              if (overlapX < overlapY) {
                // separate along X (correct sign: push each pill away from the other)
                const sign = cax < cbx ? 1 : -1;
                const sep = overlapX / 2 + 0.5;
                a.x -= sign * sep;
                b.x += sign * sep;
                // velocity response only when the pills are approaching
                const rvx = b.vx - a.vx;
                if (sign * rvx < 0) {
                  const avg = (a.vx + b.vx) / 2;
                  a.vx = avg - PILL_RESTITUTION * (a.vx - avg);
                  b.vx = avg - PILL_RESTITUTION * (b.vx - avg);
                }
              } else {
                // separate along Y
                const sign = cay < cby ? 1 : -1;
                const sep = overlapY / 2 + 0.5;
                a.y -= sign * sep;
                b.y += sign * sep;
                const rvy = b.vy - a.vy;
                if (sign * rvy < 0) {
                  const avg = (a.vy + b.vy) / 2;
                  a.vy = avg - PILL_RESTITUTION * (a.vy - avg);
                  b.vy = avg - PILL_RESTITUTION * (b.vy - avg);
                }
              }
              awake = true;
              paint(i);
              paint(j);
            }
          }
        }

        if (awake) {
          rafRef.current = requestAnimationFrame(loop);
        } else {
          runningRef.current = false;
          rafRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(loop);
    }
  }, [paint]);

  // Eject the currently slotted pill back into the play area
  const ejectSlotted = useCallback(() => {
    const sid = slottedIdRef.current;
    if (sid === null) return;
    const b = bodiesRef.current[sid];
    b.slotted = false;
    b.vx = (Math.random() - 0.5) * 5;
    b.vy = 2.5;
    // clamp back in-bounds
    const { w: iw, h: ih } = boundsRef.current;
    b.x = Math.max(0, Math.min(b.x, iw - b.w));
    b.y = Math.max(0, Math.min(b.y, ih - b.h));
    setSlottedId(null);
    startLoop();
  }, [startLoop]);

  // Slot a pill (called on drag-drop or click)
  const slotPill = useCallback((i: number) => {
    // eject any existing occupant
    const sid = slottedIdRef.current;
    if (sid !== null && sid !== i) {
      const ejected = bodiesRef.current[sid];
      ejected.slotted = false;
      ejected.vx = (Math.random() - 0.5) * 5;
      ejected.vy = 2.5;
      const { w: iw, h: ih } = boundsRef.current;
      ejected.x = Math.max(0, Math.min(ejected.x, iw - ejected.w));
      ejected.y = Math.max(0, Math.min(ejected.y, ih - ejected.h));
    }
    const b = bodiesRef.current[i];
    b.slotted = true;
    b.vx = 0;
    b.vy = 0;
    b.dragging = false;
    setSlottedId(i);
    startLoop();
  }, [startLoop]);

  // Measure everything on mount + on resize
  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const play = playRef.current;
      const outer = outerRef.current;
      const slot = slotRef.current;
      if (!play) return;
      boundsRef.current = { w: play.clientWidth, h: play.clientHeight };

      // Measure slot position relative to play area
      if (slot && outer) {
        const slotR = slot.getBoundingClientRect();
        const playR = play.getBoundingClientRect();
        slotRectRef.current = {
          x: slotR.left - playR.left,
          y: slotR.top  - playR.top,
          w: slotR.width,
          h: slotR.height,
        };
      }

      pillRefs.current.forEach((el, i) => {
        const b = bodiesRef.current[i];
        if (el && b && !b.slotted) {
          const r = el.getBoundingClientRect();
          b.w = r.width;
          b.h = r.height;
          b.x = Math.max(0, Math.min(b.x, boundsRef.current.w - b.w));
          b.y = Math.max(0, Math.min(b.y, boundsRef.current.h - b.h));
          paint(i);
        }
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (playRef.current) ro.observe(playRef.current);

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
    };
  }, [paint]);

  const handlePointerDown = useCallback(
    (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
      const el = pillRefs.current[i];
      const play = playRef.current;
      const b = bodiesRef.current[i];
      if (!el || !play || !b) return;

      el.setPointerCapture(e.pointerId);
      const playRect = play.getBoundingClientRect();
      const localX = e.clientX - playRect.left;
      const localY = e.clientY - playRect.top;

      b.vx = 0;
      b.vy = 0;
      b.dragging = true;
      dragRef.current = {
        id: i,
        pointerId: e.pointerId,
        offsetX: localX - b.x,
        offsetY: localY - b.y,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        lastT: e.timeStamp,
        moved: false,
      };
      setDraggingId(i);
      startLoop();
    },
    [startLoop]
  );

  // Slot bar pointerdown — pull the slotted pill out into the play area
  const handleSlotPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const sid = slottedIdRef.current;
    if (sid === null) return;
    const b = bodiesRef.current[sid];
    const play = playRef.current;
    const el = pillRefs.current[sid];
    if (!play || !el) return;

    // Place the pill at top-centre of play area
    const playW = boundsRef.current.w;
    b.slotted = false;
    b.x = Math.max(0, playW / 2 - b.w / 2);
    b.y = 4;
    b.vx = 0;
    b.vy = 0;
    b.dragging = true;
    paint(sid);
    setSlottedId(null);

    // Capture on the visible slot chip — the pill el is display:none at this instant.
    e.currentTarget.setPointerCapture(e.pointerId);
    const playRect = play.getBoundingClientRect();
    dragRef.current = {
      id: sid,
      pointerId: e.pointerId,
      offsetX: e.clientX - playRect.left - b.x,
      offsetY: e.clientY - playRect.top  - b.y,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      lastT: e.timeStamp,
      moved: false,
      fromSlot: true,
    };
    setDraggingId(sid);
    startLoop();
  }, [paint, startLoop]);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    const play = playRef.current;
    const b = bodiesRef.current[d.id];
    if (!play || !b) return;

    const playRect = play.getBoundingClientRect();
    const maxX = Math.max(0, boundsRef.current.w - b.w);
    const maxY = Math.max(0, boundsRef.current.h - b.h);
    b.x = Math.max(0, Math.min(e.clientX - playRect.left - d.offsetX, maxX));
    b.y = Math.max(0, Math.min(e.clientY - playRect.top  - d.offsetY, maxY));

    const dt = Math.max(1, e.timeStamp - d.lastT);
    const nvx = ((e.clientX - d.lastX) / dt) * 16;
    const nvy = ((e.clientY - d.lastY) / dt) * 16;
    b.vx = 0.7 * b.vx + 0.3 * nvx;
    b.vy = 0.7 * b.vy + 0.3 * nvy;
    d.lastX = e.clientX;
    d.lastY = e.clientY;
    d.lastT = e.timeStamp;

    if (!d.moved && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > DRAG_THRESHOLD) {
      d.moved = true;
    }
  }, []);

  const handlePointerUp = useCallback((e: PointerEvent) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    const b = bodiesRef.current[d.id];
    dragRef.current = null;
    setDraggingId(null);

    if (!b) return;

    if (!d.moved) {
      if (d.fromSlot) {
        // Clicked the slotted pill → launch it downward out of the slot into the sim
        b.dragging = false;
        b.slotted = false;
        b.vx = (Math.random() - 0.5) * 4;
        b.vy = reducedRef.current ? 4 : 10;
        startLoop();
      } else if (slottedIdRef.current === d.id) {
        ejectSlotted();
      } else {
        b.dragging = false;
        slotPill(d.id);
      }
      return;
    }

    // Drag: check if released over the slot zone
    const sr = slotRectRef.current;
    const pillCX = b.x + b.w / 2;
    // pill is in play-area coords; slot rect is also play-area-local
    // but the slot is physically ABOVE the play area (negative y) — check via raw client coords
    const play = playRef.current;
    const slot = slotRef.current;
    let inSlot = false;
    if (play && slot) {
      const playR = play.getBoundingClientRect();
      const slotR = slot.getBoundingClientRect();
      // use the drag's last client position
      inSlot = (
        e.clientX >= slotR.left - 20 && e.clientX <= slotR.right + 20 &&
        e.clientY >= slotR.top  - 20 && e.clientY <= slotR.bottom + 20
      );
      // fallback: pill centre X overlaps slot horizontally and pill y is near top
      if (!inSlot) {
        const pillClientCX = playR.left + pillCX;
        inSlot = (
          pillClientCX >= slotR.left - 20 && pillClientCX <= slotR.right + 20 &&
          b.y < 40
        );
      }
    } else {
      // fallback using slotRectRef (play-area-local, slot above play)
      inSlot = pillCX > sr.x - 20 && pillCX < sr.x + sr.w + 20 && b.y < 30;
    }

    if (inSlot) {
      slotPill(d.id);
    } else {
      b.dragging = false;
      if (reducedRef.current) { b.vx = 0; b.vy = 0; }
      startLoop();
    }
  }, [ejectSlotted, slotPill, startLoop]);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <div
      ref={outerRef}
      className="relative w-full max-w-2xl rounded-2xl bg-white border border-black/[0.06] shadow-md overflow-hidden select-none"
    >
      {/* Slot bar */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3 bg-black/[0.03] rounded-xl px-5 py-3 shadow-inner">
          <span className="text-sm text-protege-dark/70 whitespace-nowrap">
            I want a mentor in
          </span>
          <div
            ref={slotRef}
            onPointerDown={slottedId !== null ? handleSlotPointerDown : undefined}
            className={`rounded-full border min-w-[140px] h-9 flex items-center justify-center text-sm transition-colors duration-200 select-none ${
              slottedId !== null
                ? "bg-protege-orange border-transparent text-white font-medium cursor-grab active:cursor-grabbing"
                : "border-dashed border-black/25 text-black/30 italic"
            }`}
          >
            {slottedId !== null ? DISCIPLINE_SEEDS[slottedId].label : "drag one here"}
          </div>
        </div>
      </div>

      {/* Play area */}
      <div
        ref={playRef}
        className="relative overflow-hidden mx-4 mb-4 rounded-xl"
        style={{ height: 360 }}
      >
        {DISCIPLINE_SEEDS.map((s, i) => {
          const isSlotted = slottedId === i;
          return (
            <div
              key={s.label}
              ref={(el) => { pillRefs.current[i] = el; }}
              onPointerDown={handlePointerDown(i)}
              className="absolute top-0 left-0 touch-none will-change-transform cursor-grab active:cursor-grabbing"
              style={{
                transform: `translate3d(${s.x}px, ${s.y}px, 0)`,
                zIndex: draggingId === i ? 50 : 10,
                display: isSlotted ? "none" : undefined,
              }}
            >
              <div
                className="rounded-full border px-3.5 py-1.5 text-xs whitespace-nowrap transition-[box-shadow,transform,background-color,color,border-color] duration-150 hover:scale-105 hover:shadow-sm border-black/15 text-protege-dark/60 bg-transparent"
                style={{ transform: `rotate(${s.rot}deg)` }}
              >
                {s.label}
              </div>
            </div>
          );
        })}

        {/* Hint */}
        <span className="absolute bottom-2 right-3 text-[10px] text-black/25 pointer-events-none select-none">
          drag the pills
        </span>
      </div>
    </div>
  );
}

// Pillar 3 — Local
function LocalVisual() {
  return (
    <div className="relative flex items-center justify-center max-w-sm w-full aspect-square">
      <div
        className="absolute inset-0 rounded-3xl"
        style={{ background: "rgba(255,103,35,0.08)" }}
      />
      <div className="relative text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" className="text-protege-orange">
            <path
              d="M9 0C4.03 0 0 4.03 0 9c0 6.75 9 13 9 13s9-6.25 9-13c0-4.97-4.03-9-9-9zm0 12.5A3.5 3.5 0 1 1 9 5.5a3.5 3.5 0 0 1 0 7z"
              fill="currentColor"
            />
          </svg>
          <span className="text-xs text-protege-orange tracking-widest uppercase font-medium">
            Indianapolis
          </span>
        </div>
        <p className="font-black text-5xl sm:text-6xl text-protege-dark leading-none tracking-tight">
          Indy
          <br />
          first.
        </p>
        <p className="text-protege-dark/40 text-sm mt-4 max-w-[180px] mx-auto leading-snug">
          Built for this city.<br />Not the internet.
        </p>
      </div>
    </div>
  );
}

interface PillarProps {
  eyebrow: string;
  headline: string;
  body: string;
  visual: React.ReactNode;
  flip?: boolean;
  id?: string;
}

function Pillar({ eyebrow, headline, body, visual, flip, id }: PillarProps) {
  return (
    <section id={id} className="py-24 px-6 border-t border-protege-dark/10">
      <div
        className={`max-w-6xl mx-auto flex flex-col gap-16 lg:flex-row lg:items-center ${
          flip ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Text */}
        <div className="flex-1 max-w-lg">
          <p className="text-xs tracking-widest text-protege-orange uppercase font-medium mb-4">
            {eyebrow}
          </p>
          <h2 className="font-bold text-4xl sm:text-5xl text-protege-dark leading-tight mb-6">
            {headline}
          </h2>
          <p className="text-protege-dark/60 leading-relaxed text-base sm:text-lg">
            {body}
          </p>
        </div>

        {/* Visual */}
        <div className={`flex-1 flex ${flip ? "lg:justify-start" : "lg:justify-end"}`}>
          {visual}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// MENTOR CTA
// ---------------------------------------------------------------------------
function MentorCTA() {
  const bullets = [
    "You control the scope and price",
    "Everyone here is vetted. Including you.",
    "No open-ended commitments",
  ];
  return (
    <section
      id="for-mentors"
      className="py-24 px-6 bg-protege-cream border-t border-protege-dark/10"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <p className="text-xs tracking-widest text-protege-orange uppercase font-medium mb-4">
            For Mentors
          </p>
          <h2 className="font-bold text-4xl sm:text-5xl text-protege-dark leading-tight mb-6">
            Share what you know.
            <br />
            On your terms.
          </h2>
          <p className="text-protege-dark/60 leading-relaxed text-base sm:text-lg mb-8">
            Post a specific offering. Set your own scope, format, and price. Get
            discovered by young creatives in Indianapolis who are looking for
            exactly what you offer.
          </p>
          <a
            href="#"
            className="inline-block bg-protege-orange text-white rounded-full px-8 py-3.5 font-medium hover:bg-protege-orange/90 transition-colors"
          >
            Apply to Mentor
          </a>
        </div>

        {/* Right */}
        <div className="space-y-5">
          {bullets.map((b) => (
            <div key={b} className="flex items-start gap-4">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-protege-orange/15 flex items-center justify-center">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l2.5 2.5L9 1" stroke="#FF6723" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-protege-dark/70 leading-snug">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------
function Footer() {
  return (
    <footer className="bg-protege-dark px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12">
          {/* Left — brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/Icon-Orange.png"
              alt="Protégé icon"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-white font-bold text-lg tracking-tight">Protégé</span>
          </div>

          {/* Center — links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-center items-start">
            {["Discover", "For Mentors", "For Mentees", "About"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-white/50 text-sm hover:text-white transition-colors"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Right — contact */}
          <div className="flex flex-col gap-1.5 sm:items-end">
            {[
              { label: "@get.protege",       href: "#" },
              { label: "joinprotege.app",    href: "#" },
              { label: "hello@joinprotege.app", href: "mailto:hello@joinprotege.app" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-white/50 text-sm hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-white/30 text-xs text-center">
            © 2026 Protégé. Indianapolis, IN.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Pillar
        id="discover"
        eyebrow="STRUCTURE"
        headline="Know what you're getting."
        body="Every offering on Protégé has a defined scope, set duration, format, and price. Posted by the mentor upfront. No ambiguity. No back-and-forth. You pick what fits and request it."
        visual={<OfferingCardStack />}
      />
      <Pillar
        eyebrow="DISCOVERY"
        headline="Find someone worth learning from."
        body="Every mentor here posted an offering on purpose. Defined scope, set price, open for requests. Browse by discipline, find someone whose work you respect, and reach out without the awkward part."
        visual={<DisciplinePanel />}
        flip
      />
      <Pillar
        eyebrow="LOCAL"
        headline="Indianapolis first."
        body="Every other option is remote, national, or locked behind institutional access. Protégé is built for this city. In-person sessions, mentors embedded in the Indianapolis creative scene, and connections that don't end when the session does."
        visual={<LocalVisual />}
      />
      <MentorCTA />
      <Footer />
    </>
  );
}
