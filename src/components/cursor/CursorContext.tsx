"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type CursorState = "normal" | "hover" | "financial" | "globe" | "country" | "growth" | "decline";

interface CursorContextType {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>("normal");
  const [cursorText, setCursorText] = useState<string>("");

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState, cursorText, setCursorText }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
