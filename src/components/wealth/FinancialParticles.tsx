"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";

interface FinancialParticlesProps {
  isProfit: boolean;
  isDownturn: boolean;
  profitPercent: number;
  reducedMotion?: boolean;
}

export default function FinancialParticles({
  isProfit,
  isDownturn,
  reducedMotion = false,
}: FinancialParticlesProps) {
  // Profit shower: around 8-12 gentle particles
  const profitParticles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: 8 + ((i * 7.5) % 84),
      delay: (i * 0.45) % 4.0,
      duration: 5.5 + ((i % 3) * 0.8),
      driftX: ((i % 5) - 2) * 12,
      rotate: ((i % 7) - 3) * 12,
      scale: 0.75 + ((i % 3) * 0.15),
      opacity: 0.16 + ((i % 3) * 0.12),
      isArrow: i % 4 === 0,
      isSparkle: i % 5 === 0,
    }));
  }, []);

  // Downturn state particles: flowing toward the vault
  const downturnParticles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      startX: 20 + ((i * 6) % 55),
      startY: 25 + ((i * 5) % 40),
      delay: i * 0.38,
      duration: 3.0 + ((i % 3) * 0.5),
      scale: 0.7 + ((i % 3) * 0.15),
      opacity: 0.35 + ((i % 3) * 0.15),
    }));
  }, []);

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0 select-none">
        <div
          className={`absolute inset-0 opacity-40 transition-opacity duration-500 ${
            !isDownturn && isProfit
              ? "bg-[radial-gradient(ellipse_at_top_right,rgba(15,107,79,0.08),transparent_70%)]"
              : "bg-[radial-gradient(ellipse_at_top_right,rgba(225,29,72,0.06),transparent_70%)]"
          }`}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0 select-none">
      {/* Mobile static subtle ambient glow (Zero animation overhead) */}
      <div
        className={`md:hidden absolute inset-0 opacity-40 transition-opacity duration-500 ${
          !isDownturn && isProfit
            ? "bg-[radial-gradient(ellipse_at_top_right,rgba(15,107,79,0.08),transparent_70%)]"
            : "bg-[radial-gradient(ellipse_at_top_right,rgba(225,29,72,0.06),transparent_70%)]"
        }`}
      />

      {/* Desktop Rich Particles (md and up) */}
      <div className="hidden md:block absolute inset-0">
      <AnimatePresence mode="wait">
        {!isDownturn && isProfit ? (
          /* Profit Money Shower */
          <motion.div
            key="profit-particles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Subtle ambient green warmth at bottom */}
            <div className="absolute -bottom-10 inset-x-0 h-32 bg-gradient-to-t from-emerald-500/[0.05] via-emerald-500/[0.01] to-transparent" />

            {profitParticles.map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  y: "-8%",
                  x: 0,
                  opacity: 0,
                  rotate: -p.rotate,
                }}
                animate={{
                  y: ["-4%", "40%", "85%", "95%"],
                  x: [0, p.driftX * 0.5, p.driftX, p.driftX * 1.2],
                  rotate: [-p.rotate, p.rotate * 0.4, p.rotate, p.rotate * 1.2],
                  opacity: [0, p.opacity, p.opacity, 0],
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
                {p.isSparkle ? (
                  <Sparkles size={10 * p.scale} className="text-emerald-600/50" />
                ) : p.isArrow ? (
                  <ArrowUpRight size={11 * p.scale} className="text-emerald-700/60" />
                ) : (
                  <span
                    className="font-serif text-xs tabular-nums text-emerald-800"
                    style={{ fontSize: `${12 * p.scale}px` }}
                  >
                    ₹
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Downturn / Capital Returning to Vault */
          <motion.div
            key="downturn-particles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Subtle ambient rose tone */}
            <div className="absolute -bottom-10 inset-x-0 h-32 bg-gradient-to-t from-rose-500/[0.05] via-rose-500/[0.01] to-transparent" />

            {/* Minimalist Safe Vault Destination */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="absolute right-6 top-8 sm:top-10 flex flex-col items-center gap-1 p-2.5 rounded-2xl bg-neutral-100/90 border border-neutral-200/90 shadow-sm text-neutral-700 z-10"
            >
              <div className="w-8 h-8 rounded-xl bg-neutral-200/70 flex items-center justify-center text-neutral-800">
                <Landmark size={17} />
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider font-semibold text-neutral-500">
                VAULT
              </span>
            </motion.div>

            {/* Particles traveling to the vault */}
            {downturnParticles.map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  left: `${p.startX}%`,
                  top: `${p.startY}%`,
                  opacity: 0,
                  scale: p.scale,
                }}
                animate={{
                  left: [`${p.startX}%`, `${p.startX + 25}%`, "88%"],
                  top: [`${p.startY}%`, `${p.startY - 4}%`, "18%"],
                  opacity: [0, p.opacity, 0],
                  scale: [p.scale, p.scale * 0.9, p.scale * 0.45],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1],
                  times: [0, 0.45, 1],
                }}
                style={{ willChange: "transform, opacity" }}
                className="absolute flex items-center gap-0.5 text-neutral-500"
              >
                <span className="font-serif text-xs text-neutral-600">₹</span>
                <ArrowDownRight size={10} className="text-rose-700/60" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
