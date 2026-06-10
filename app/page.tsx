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
const leftCards = [
  { color: "#E8D5C4", w: 140, h: 160, rotate: -6,  x: -60,  y: 60,  depth: 1.4 },
  { color: "#D4C4B0", w: 120, h: 140, rotate:  4,  x: -20,  y: 220, depth: 0.8 },
  { color: "#C9B99A", w: 160, h: 110, rotate: -3,  x: -80,  y: 370, depth: 1.8 },
  { color: "#F0E6D8", w: 130, h: 150, rotate:  7,  x: -30,  y: 510, depth: 1.0 },
  { color: "#E0CDB8", w: 110, h: 130, rotate: -5,  x: -70,  y: 660, depth: 1.3 },
];

const rightCards = [
  { color: "#D4C4B0", w: 150, h: 130, rotate:  5,  x:  40,  y: 80,  depth: 1.2 },
  { color: "#F0E6D8", w: 120, h: 155, rotate: -4,  x:  10,  y: 240, depth: 0.9 },
  { color: "#E8D5C4", w: 145, h: 120, rotate:  8,  x:  60,  y: 390, depth: 1.6 },
  { color: "#C9B99A", w: 115, h: 145, rotate: -6,  x:  20,  y: 540, depth: 1.1 },
  { color: "#E0CDB8", w: 135, h: 115, rotate:  3,  x:  50,  y: 680, depth: 1.5 },
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
              transform: `rotate(${c.rotate}deg) translate(${offset.x * c.depth * 10}px, ${offset.y * c.depth * 6}px)`,
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
              transform: `rotate(${c.rotate}deg) translate(${offset.x * c.depth * -10}px, ${offset.y * c.depth * 6}px)`,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-protege-dark mb-4">
          Find the mentor you
          <br />
          always needed.
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
function useCountUp(target: number, active: boolean, duration = 1400) {
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

function StatItem({ number, suffix, label, active }: typeof stats[0] & { active: boolean }) {
  const val = useCountUp(number, active);
  return (
    <div className="flex flex-col items-center gap-3">
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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-protege-dark py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-8 text-center">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} active={active} />
          ))}
        </div>
        <p className="text-center text-white/30 text-xs mt-16 tracking-wide">
          Survey of 102 student creatives, Westfield, IN — 2026
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// PILLARS
// ---------------------------------------------------------------------------

// Pillar 1 — Structure
function OfferingCard() {
  const fields = [
    { label: "Discipline", value: "———" },
    { label: "Format",     value: "———" },
    { label: "Duration",   value: "———" },
    { label: "Price",      value: "———" },
    { label: "Scope",      value: "———————————" },
  ];
  return (
    <div className="bg-protege-cream border border-protege-dark/10 rounded-2xl p-8 max-w-sm w-full shadow-sm">
      <div className="text-xs tracking-widest text-protege-dark/40 uppercase mb-5 font-medium">
        Offering Template
      </div>
      <div className="space-y-4">
        {fields.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <span className="text-xs text-protege-dark/50 uppercase tracking-wider w-20 flex-shrink-0">
              {label}
            </span>
            <div className="h-px flex-1 bg-protege-dark/10" />
            <span className="text-sm text-protege-dark/25 font-medium">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-protege-dark/10">
        <div className="h-8 rounded-full bg-protege-orange/15 flex items-center justify-center">
          <span className="text-xs text-protege-orange font-medium">Submit Request</span>
        </div>
      </div>
    </div>
  );
}

// Pillar 2 — Discovery
function BrowseUI() {
  const tags = ["Graphic Design", "Photography", "Filmmaking", "Illustration", "Music Production"];
  return (
    <div className="max-w-sm w-full">
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((t, i) => (
          <span
            key={t}
            className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
              i === 0
                ? "bg-protege-dark text-protege-cream border-protege-dark"
                : "border-protege-dark/20 text-protege-dark/60 hover:border-protege-dark/50"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-xl border border-protege-dark/10 bg-protege-cream/60 flex items-center justify-center"
          >
            <span className="text-[10px] text-protege-dark/25 text-center px-2">
              mentors<br />appear here
            </span>
          </div>
        ))}
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
        visual={<OfferingCard />}
      />
      <Pillar
        eyebrow="DISCOVERY"
        headline="Find someone worth learning from."
        body="Every mentor here posted an offering on purpose. Defined scope, set price, open for requests. Browse by discipline, find someone whose work you respect, and reach out without the awkward part."
        visual={<BrowseUI />}
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
