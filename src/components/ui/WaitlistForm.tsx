"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useCursor } from "../cursor/CursorContext";

export interface WaitlistFormProps {
  variant?: "hero" | "dark";
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export default function WaitlistForm({
  variant = "dark",
  buttonText,
  placeholder,
  className = "",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { setCursorState } = useCursor();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  if (variant === "hero") {
    return (
      <div className={`w-full max-w-md mx-auto ${className}`}>
        {status === "success" ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white py-3.5 px-6 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center justify-center gap-2.5 text-deep-green font-medium text-xs sm:text-sm"
          >
            <div className="w-6 h-6 rounded-full bg-deep-green/15 text-deep-green flex items-center justify-center shrink-0">
              <Check size={15} strokeWidth={2.5} />
            </div>
            <span>Demo list confirmed (prototype only — no data stored).</span>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center w-full"
          >
            <input
              type="email"
              placeholder={placeholder || "example@gmail.com"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              className="flex-1 min-w-0 px-3.5 sm:px-6 py-2.5 sm:py-3 bg-transparent outline-none text-primary placeholder:text-gray-400 text-xs sm:text-sm"
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("normal")}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-deep-green text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:bg-dark-green transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-xs sm:text-sm shrink-0"
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("normal")}
            >
              {status === "loading" ? "Joining..." : buttonText || "Join Waitlist"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-500 text-xs mt-2 text-center">Please enter a valid email address.</p>
        )}
        <p className="text-[11px] text-secondary/70 mt-2 text-center font-sans">
          Interactive demo • No email or personal data is collected on this prototype.
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {status === "success" ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-full py-4 px-6 flex items-center justify-center gap-3 border border-white/20 text-xs sm:text-sm"
        >
          <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center shrink-0">
            <Check size={18} strokeWidth={3} />
          </div>
          <span className="font-medium">Demo waitlist confirmed (prototype demo mode — no data stored).</span>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="email"
            placeholder={placeholder || "Enter your email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            className={`w-full py-4 sm:py-5 pl-5 sm:pl-8 pr-32 sm:pr-40 rounded-full bg-white/10 backdrop-blur-md border ${
              status === "error" ? "border-red-400" : "border-white/20"
            } text-white placeholder:text-green-200 outline-none focus:ring-2 focus:ring-gold transition-all text-sm sm:text-base`}
            onMouseEnter={() => setCursorState("hover")}
            onMouseLeave={() => setCursorState("normal")}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="absolute right-1.5 sm:right-2 top-1.5 sm:top-2 bottom-1.5 sm:bottom-2 bg-white text-deep-green px-4 sm:px-8 rounded-full font-semibold flex items-center gap-1.5 hover:bg-gold hover:text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-xs sm:text-sm"
            onMouseEnter={() => setCursorState("hover")}
            onMouseLeave={() => setCursorState("normal")}
          >
            {status === "loading" ? "Joining..." : buttonText || "Join Fermor"}
            {status !== "loading" && <ArrowRight size={15} />}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-300 text-xs mt-3 text-left pl-6">Please enter a valid email address.</p>
      )}
      <p className="text-[11px] text-green-200/70 mt-3 text-center font-sans">
        Interactive demo • Submissions are simulated locally; no server storage.
      </p>
    </div>
  );
}
