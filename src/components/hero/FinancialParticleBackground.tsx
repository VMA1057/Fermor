"use client";

import React, { useMemo, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";

interface FinancialParticleBackgroundProps {
  isProfit: boolean;
  profitPercent: number; // e.g. +180 or -15
  className?: string;
}

interface ParticleConfig {
  id: number;
  type: "symbol" | "note" | "sparkle" | "arrow";
  left: number; // 0 to 100%
  delay: number;
  duration: number;
  driftX: number;
  rotate: number;
  scale: number;
  opacity: number;
}

export default function FinancialParticleBackground({
  isProfit,
  profitPercent,
  className = "",
}: FinancialParticleBackgroundProps) {
  const reducedMotion = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  // Determine particle density based on profit magnitude
  const particleCount = useMemo(() => {
    if (!isProfit) return 14; // Loss state particles flowing to bank
    const absP = Math.abs(profitPercent);
    if (absP < 2) return 10;
    if (absP < 5) return 18;
    if (absP < 15) return 26;
    return 34; // Strong but elegant
  }, [isProfit, profitPercent]);

  // Precompute stable particle properties
  const profitParticles: ParticleConfig[] = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => {
      const types: ParticleConfig["type"][] = [
        "symbol",
        "symbol",
        "note",
        "sparkle",
        "arrow",
      ];
      return {
        id: i,
        type: types[i % types.length],
        left: 5 + ((i * 2.7) % 90),
        delay: (i * 0.28) % 4.5,
        duration: 4.5 + ((i * 0.35) % 2.5),
        driftX: ((i % 5) - 2) * 14,
        rotate: ((i % 7) - 3) * 15,
        scale: 0.75 + ((i % 4) * 0.12),
        opacity: 0.18 + ((i % 3) * 0.12),
      };
    });
  }, []);

  // Loss state particles originating from graph center and traveling to bank vault
  const lossParticles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      startX: 25 + ((i * 5) % 50), // around graph area
      startY: 28 + ((i * 4) % 35),
      delay: i * 0.35,
      duration: 2.8 + ((i % 3) * 0.4),
      scale: 0.7 + ((i % 3) * 0.15),
      opacity: 0.35 + ((i % 3) * 0.15),
    }));
  }, []);

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0 select-none ${className}`}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        {isProfit ? (
          /* ========================================================= */
          /* PROFIT STATE: MONEY SHOWER                                 */
          /* ========================================================= */
          <motion.div
            key="profit-shower"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            {/* Subtle ambient green radial glow at bottom */}
            <div className="absolute -bottom-16 inset-x-0 h-40 bg-gradient-to-t from-emerald-500/[0.07] via-emerald-500/[0.02] to-transparent pointer-events-none" />

            {/* Falling Money Particles */}
            {profitParticles.slice(0, particleCount).map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  y: "-10%",
                  x: 0,
                  opacity: 0,
                  rotate: -p.rotate,
                }}
                animate={{
                  y: ["-5%", "40%", "85%", "95%"],
                  x: [0, p.driftX * 0.5, p.driftX, p.driftX * 1.2],
                  rotate: [-p.rotate, p.rotate * 0.5, p.rotate, p.rotate * 1.2],
                  opacity: [0, p.opacity, p.opacity, 0], // Settle and fade near bottom
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.4, 0.85, 1],
                }}
                style={{
                  left: `${p.left}%`,
                  willChange: "transform, opacity",
                }}
                className="absolute top-0 flex items-center justify-center text-[#0F6B4F]"
              >
                {p.type === "symbol" && (
                  <span
                    className="font-serif text-xs tabular-nums text-emerald-800"
                    style={{ fontSize: `${12 * p.scale}px` }}
                  >
                    ₹
                  </span>
                )}

                {p.type === "note" && (
                  <div
                    className="w-5 h-3 border border-emerald-700/30 bg-emerald-50/40 rounded-[2px] flex items-center justify-center shadow-xs"
                    style={{ transform: `scale(${p.scale})` }}
                  >
                    <span className="text-[7px] font-mono font-bold text-emerald-800 leading-none">
                      ₹
                    </span>
                  </div>
                )}

                {p.type === "arrow" && (
                  <ArrowUpRight
                    size={11 * p.scale}
                    className="text-emerald-700/70"
                  />
                )}

                {p.type === "sparkle" && (
                  <Sparkles
                    size={10 * p.scale}
                    className="text-emerald-600/60"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* ========================================================= */
          /* LOSS STATE: MONEY RETURNING TO BANK                       */
          /* ========================================================= */
          <motion.div
            key="loss-bank"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            {/* Subtle ambient warm rose hue at bottom */}
            <div className="absolute -bottom-16 inset-x-0 h-40 bg-gradient-to-t from-rose-500/[0.06] via-rose-500/[0.02] to-transparent pointer-events-none" />

            {/* Refined Minimalist Bank / Vault Destination Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute right-6 top-8 sm:top-10 flex flex-col items-center gap-1 p-2.5 rounded-xl bg-neutral-100/90 border border-neutral-200/90 shadow-sm text-neutral-700"
            >
              <div className="w-8 h-8 rounded-lg bg-neutral-200/60 flex items-center justify-center text-neutral-700">
                <Landmark size={17} />
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider font-semibold text-neutral-500">
                VAULT
              </span>
            </motion.div>

            {/* Particles traveling from wealth area toward the bank */}
            {lossParticles.map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  left: `${p.startX}%`,
                  top: `${p.startY}%`,
                  opacity: 0,
                  scale: p.scale,
                }}
                animate={{
                  left: [`${p.startX}%`, `${p.startX + 20}%`, "88%"],
                  top: [`${p.startY}%`, `${p.startY - 5}%`, "18%"],
                  opacity: [0, p.opacity, 0], // fades as it enters the bank
                  scale: [p.scale, p.scale * 0.9, p.scale * 0.5],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1],
                  times: [0, 0.4, 1],
                }}
                style={{ willChange: "transform, opacity" }}
                className="absolute flex items-center gap-0.5 text-neutral-500"
              >
                <span className="font-serif text-xs text-neutral-600">
                  ₹
                </span>
                <ArrowDownRight size={10} className="text-rose-700/70" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
