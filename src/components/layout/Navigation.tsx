"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCursor } from "../cursor/CursorContext";

const navLinks = [
  { name: "Gazette", href: "#gazette" },
  { name: "Market", href: "#market" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Act", href: "#act" },
  { name: "Ask", href: "#ask" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setCursorState } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? "bg-background/80 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-2xl font-serif tracking-tight"
          onMouseEnter={() => setCursorState("hover")}
          onMouseLeave={() => setCursorState("normal")}
        >
          FERMOR
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-primary hover:text-deep-green transition-colors"
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("normal")}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <Link
            href="#waitlist"
            className="hidden md:inline-flex px-5 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-deep-green transition-colors"
            onMouseEnter={() => setCursorState("hover")}
            onMouseLeave={() => setCursorState("normal")}
          >
            Join Waitlist
          </Link>
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-primary hover:text-deep-green focus-visible:outline-2 focus-visible:outline-deep-green cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-background border-t border-light-border px-6 py-6 flex flex-col gap-5 text-lg">
          {navLinks.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              onClick={() => setOpen(false)}
            >
              {l.name}
            </Link>
          ))}

          <Link
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="bg-primary text-white rounded-full px-5 py-3 text-center text-base"
          >
            Join Waitlist
          </Link>
        </nav>
      )}
    </motion.header>
  );
}
