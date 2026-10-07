"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { breakingNewsTicker } from "@/data/newspaperData";
import { ChevronRight } from "lucide-react";

interface BreakingNewsProps {
  onArticleClick: (articleId?: string) => void;
}

export default function BreakingNews({ onArticleClick }: BreakingNewsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % breakingNewsTicker.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#EFE9DC] border-y border-neutral-800 py-1.5 px-3 mb-4 flex items-center justify-between text-xs font-serif overflow-hidden select-none">
      <div className="flex items-center gap-3 overflow-hidden flex-1 mr-2">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-neutral-900 text-[#FAF7EE] text-[10px] font-mono font-bold uppercase tracking-wider shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span>BREAKING WIRE</span>
        </div>

        <div className="relative h-5 overflow-hidden flex-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => onArticleClick("lead-rally-liquidity")}
              className="font-serif text-neutral-900 tracking-wide truncate cursor-pointer hover:underline text-[12px] md:text-[13px]"
            >
              {breakingNewsTicker[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onArticleClick("lead-rally-liquidity")}
        className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 hover:text-neutral-950 inline-flex items-center gap-1 shrink-0 cursor-pointer"
      >
        <span className="hidden sm:inline">FULL WIRE</span>
        <ChevronRight size={13} />
      </button>
    </div>
  );
}
