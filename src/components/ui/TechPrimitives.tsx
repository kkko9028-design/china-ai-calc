"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AI_MODELS } from "@/data/models";

/**
 * Full-bleed OLED Dark Tech ambient background:
 * Precision grid + radial fade mask + slow-breathing aurora glows.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Precision grid fading out radially */}
      <div
        className="absolute inset-0 bg-tech-grid opacity-70"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 45%, transparent 100%)",
        }}
      />

      {/* Ambient cyan/emerald top spotlight */}
      <div className="absolute -top-40 left-1/2 h-[480px] w-[860px] -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500/15 via-cyan-500/12 to-indigo-500/15 blur-[110px]" />

      {/* Subtle bottom-right accent glow */}
      <div className="absolute -bottom-48 right-[-10%] h-[420px] w-[420px] rounded-full bg-indigo-600/10 blur-[120px]" />
    </div>
  );
}

/**
 * Mouse-tracking Spotlight Card (Aceternity / Linear aesthetic).
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(16, 185, 129, 0.14)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070d19]/85 backdrop-blur-xl transition-colors duration-300 hover:border-white/[0.16] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(520px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/**
 * Animated Rotating Border Beam Card (Magic UI aesthetic)
 * Highlights the hero savings output card.
 */
export function BorderBeamCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-[1.5px] ${className}`}>
      {/* Rotating conic light beam */}
      <div
        aria-hidden="true"
        className="animate-beam-spin pointer-events-none absolute inset-[-120%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,#10b981_305deg,#22d3ee_335deg,transparent_360deg)] opacity-85"
      />
      <div className="relative z-10 h-full w-full rounded-[14.5px] bg-gradient-to-b from-[#071514] via-[#060d18] to-[#050914] p-6 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}

/**
 * Smooth spring-interpolated USD number ticker for real-time slider feedback.
 */
export function AnimatedUSD({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  const spring = useSpring(value, { stiffness: 120, damping: 22, mass: 0.6 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplay(latest);
    });
  }, [spring]);

  const abs = Math.abs(display);
  const sign = display < -0.005 ? "-" : "";
  const formatted =
    abs >= 1000
      ? `${sign}$${Math.round(abs).toLocaleString("en-US")}`
      : abs >= 10
      ? `${sign}$${abs.toFixed(2)}`
      : `${sign}$${abs.toFixed(3)}`;

  return (
    <span translate="no" className={`notranslate ${className}`}>
      {formatted}
    </span>
  );
}

/**
 * Live-style infinite scrolling ticker strip of Nov 2026 LLM API rates.
 */
export function ModelTickerMarquee() {
  const items = [...AI_MODELS, ...AI_MODELS];

  return (
    <div
      className="relative my-8 overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-3"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="animate-marquee gap-4">
        {items.map((m, i) => (
          <div
            key={`${m.id}-${i}`}
            className="mx-2 flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.07] bg-[#080f1e]/90 px-3.5 py-1.5 text-xs"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                m.origin === "china"
                  ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  : "bg-cyan-400/70"
              }`}
            />
            <span className="font-semibold text-slate-200">{m.name}</span>
            <span className="font-mono text-[11px] text-slate-400">
              ${m.inputPrice.toFixed(2)} / ${m.outputPrice.toFixed(2)}
            </span>
            {m.origin === "china" && (
              <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                CN
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Motion Reveal wrapper for smooth scroll entrance.
 */
export function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.32, delay: delay * 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Interactive animated FAQ Accordion.
 */
export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-2xl border transition-colors ${
              isOpen
                ? "border-emerald-500/35 bg-[#08121b]/90"
                : "border-white/[0.07] bg-[#070d19]/70 hover:border-white/[0.14]"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-semibold text-slate-100">{item.q}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-emerald-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <div className="border-t border-white/[0.06] px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-400">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
