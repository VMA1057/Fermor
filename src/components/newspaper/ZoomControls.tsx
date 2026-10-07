"use client";

import React from "react";
import { Plus, Minus, RotateCcw, Maximize2 } from "lucide-react";

interface ZoomControlsProps {
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onFitZoom?: () => void;
}

export default function ZoomControls({
  zoom,
  minZoom = 40,
  maxZoom = 300,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onFitZoom,
}: ZoomControlsProps) {
  const canZoomIn = zoom < maxZoom;
  const canZoomOut = zoom > minZoom;

  return (
    <div className="flex flex-col items-center gap-1.5 bg-[#FAF7EE]/95 border-2 border-neutral-900 shadow-2xl p-2 rounded-xs select-none backdrop-blur-md">
      {/* Plus and Minus Row */}
      <div className="flex items-center gap-1.5 text-neutral-900">
        <button
          type="button"
          onClick={onZoomOut}
          disabled={!canZoomOut}
          className="p-1.5 hover:bg-neutral-200/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 rounded-xs cursor-pointer border border-neutral-300 bg-white"
          title="Zoom Out (Ctrl + Scroll Down)"
          aria-label="Zoom out"
        >
          <Minus size={16} />
        </button>

        <span className="font-mono text-xs font-bold px-2.5 py-1 min-w-[58px] text-center text-neutral-950 tabular-nums border border-neutral-300 bg-white shadow-xs">
          {zoom}%
        </span>

        <button
          type="button"
          onClick={onZoomIn}
          disabled={!canZoomIn}
          className="p-1.5 hover:bg-neutral-200/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 rounded-xs cursor-pointer border border-neutral-300 bg-white"
          title="Zoom In (Ctrl + Scroll Up)"
          aria-label="Zoom in"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Action Buttons Row: Fit to Screen & 100% Reset */}
      <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-neutral-300/80 text-[10px] font-mono">
        {onFitZoom && (
          <button
            type="button"
            onClick={onFitZoom}
            className="flex-1 flex items-center justify-center gap-1 py-1 px-1.5 hover:bg-neutral-200/80 text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer rounded-xs"
            title="Fit broadsheet to screen view"
            aria-label="Fit view"
          >
            <Maximize2 size={11} />
            <span>FIT</span>
          </button>
        )}

        <button
          type="button"
          onClick={onResetZoom}
          className="flex-1 flex items-center justify-center gap-1 py-1 px-1.5 hover:bg-neutral-200/80 text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer rounded-xs"
          title="Reset to 100%"
          aria-label="Reset zoom"
        >
          <RotateCcw size={11} />
          <span>100%</span>
        </button>
      </div>
    </div>
  );
}
