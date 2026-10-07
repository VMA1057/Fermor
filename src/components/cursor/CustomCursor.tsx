"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "./CursorContext";
import { ArrowUpRight, ArrowDownRight, Globe } from "lucide-react";

export default function CustomCursor() {
  const { cursorState, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  const isTouchDevice = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const touchQuery = window.matchMedia("(pointer: coarse)");
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      touchQuery.addEventListener("change", callback);
      motionQuery.addEventListener("change", callback);
      return () => {
        touchQuery.removeEventListener("change", callback);
        motionQuery.removeEventListener("change", callback);
      };
    },
    () => window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  if (isTouchDevice) return null;

  // Variants based on cursor state
  const variants = {
    normal: { width: 32, height: 32, backgroundColor: "transparent" },
    hover: { width: 44, height: 44, backgroundColor: "transparent" },
    financial: { width: 44, height: 44, backgroundColor: "transparent" },
    globe: { width: 40, height: 40, backgroundColor: "transparent" },
    country: { width: "auto", height: 32, backgroundColor: "transparent", paddingLeft: 12, paddingRight: 12 },
    growth: { width: 36, height: 36, backgroundColor: "transparent" },
    decline: { width: 36, height: 36, backgroundColor: "transparent" },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center text-deep-green rounded-full overflow-hidden whitespace-nowrap"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
      variants={variants}
      animate={cursorState}
      initial="normal"
      transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
    >
      <motion.div
        className="flex items-center justify-center gap-1 font-medium text-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        key={cursorState + cursorText}
      >
        {cursorState === "normal" && <ArrowUpRight size={16} strokeWidth={2.5} />}
        {cursorState === "hover" && <ArrowUpRight size={20} strokeWidth={2.5} />}
        {cursorState === "financial" && (
          <ArrowUpRight size={24} strokeWidth={2.5} />
        )}
        {cursorState === "globe" && <Globe size={18} strokeWidth={2} />}
        {cursorState === "country" && (
          <span className="font-sans font-medium tracking-wide text-xs">
            + {cursorText}
          </span>
        )}
        {cursorState === "growth" && <ArrowUpRight size={24} strokeWidth={2.5} className="text-deep-green" />}
        {cursorState === "decline" && <ArrowDownRight size={24} strokeWidth={2.5} className="text-red-500" />}
      </motion.div>
    </motion.div>
  );
}
