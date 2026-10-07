"use client";

import React, { useState, useRef, useCallback, useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import NewspaperBroadsheet from "./NewspaperBroadsheet";
import ZoomControls from "./ZoomControls";
import NewspaperHoverCard from "./NewspaperHoverCard";
import NewsDetailModal from "./NewsDetailModal";
import StockDetailModal from "./StockDetailModal";
import SchemeDetailModal from "./SchemeDetailModal";
import SectorDetailModal from "./SectorDetailModal";
import { useCursor } from "../cursor/CursorContext";
import {
  Stock,
  NewsArticle,
  FinancialScheme,
  SectorWatchItem,
} from "@/data/newspaperData";
import { Compass, Move, ArrowRight } from "lucide-react";

// Extended zoom range: supports zooming out to 40% and in to 300%
const ZOOM_STEPS = [40, 50, 60, 75, 85, 100, 125, 150, 200, 250, 300];
const DEFAULT_ZOOM_INDEX = 5; // 100%

export default function FinancialNewspaper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursorState } = useCursor();

  // Zoom and Pan states
  const [zoomIndex, setZoomIndex] = useState(DEFAULT_ZOOM_INDEX);
  const currentZoom = ZOOM_STEPS[zoomIndex];

  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Modals state
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<FinancialScheme | null>(null);
  const [selectedSector, setSelectedSector] = useState<SectorWatchItem | null>(null);

  // Hover preview state
  const [hoveredStock, setHoveredStock] = useState<Stock | null>(null);
  const [hoveredArticle, setHoveredArticle] = useState<NewsArticle | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // 3D Perspective Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 28, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Dampen 3D tilt when zoomed in so reading is clear; enable slight tilt when zoomed out
  const maxTilt = currentZoom > 100 ? 2 : currentZoom < 100 ? 5 : 7;
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Touch detection via useSyncExternalStore
  const isTouchDevice = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const media = window.matchMedia("(pointer: coarse)");
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia("(pointer: coarse)").matches,
    () => false
  );

  // Mouse move handler for 3D tilt and hover cards
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (isTouchDevice || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX.set(normX);
      mouseY.set(normY);
    },
    [isTouchDevice, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setMousePos(null);
    setHoveredStock(null);
    setHoveredArticle(null);
  }, [mouseX, mouseY]);

  // Zoom handlers: Zoom In / Zoom Out with smooth clamp
  const handleZoomIn = () => {
    setZoomIndex((prev) => Math.min(prev + 1, ZOOM_STEPS.length - 1));
  };

  const handleZoomOut = () => {
    setZoomIndex((prev) => {
      const next = Math.max(prev - 1, 0);
      if (next <= DEFAULT_ZOOM_INDEX) {
        // Softly re-center pan when returning to overview
        setPan((currentPan) => ({
          x: currentPan.x * 0.5,
          y: currentPan.y * 0.5,
        }));
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomIndex(DEFAULT_ZOOM_INDEX);
    setPan({ x: 0, y: 0 });
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleFitZoom = () => {
    if (typeof window === "undefined" || !containerRef.current) {
      setZoomIndex(3); // 75%
      return;
    }
    const containerWidth = containerRef.current.clientWidth - 48;
    const ratio = Math.min(1, containerWidth / 1340) * 100;
    
    // Find closest step
    let closestIndex = 0;
    let minDiff = 999;
    ZOOM_STEPS.forEach((step, idx) => {
      const diff = Math.abs(step - ratio);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    setZoomIndex(closestIndex);
    setPan({ x: 0, y: 0 });
  };

  const handleDoubleClick = () => {
    if (currentZoom <= 100) {
      setZoomIndex(7); // zoom in to 150%
    } else {
      handleResetZoom();
    }
  };

  // Wheel zoom handler: Ctrl + wheel or direct wheel when focused
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          handleZoomIn();
        } else if (e.deltaY > 0) {
          handleZoomOut();
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Drag / Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (currentZoom < 100 && pan.x === 0 && pan.y === 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest("[data-clickable]")) {
      return;
    }

    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handlePanMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const maxBound = Math.max(100, Math.abs(currentZoom / 100 - 1) * 600);
    const newX = Math.max(-maxBound, Math.min(maxBound, dragStartRef.current.panX + dx));
    const newY = Math.max(-maxBound, Math.min(maxBound, dragStartRef.current.panY + dy));

    setPan({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="gazette"
      ref={containerRef}
      onMouseMove={(e) => {
        handleMouseMove(e);
        if (isDragging) handlePanMove(e);
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`relative min-h-screen py-16 px-4 sm:px-6 md:px-10 bg-[#161412] text-[#FAF7EE] overflow-hidden flex flex-col items-center justify-center select-none ${
        currentZoom > 100 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 25%, rgba(200, 160, 90, 0.08), transparent 75%),
          radial-gradient(#26221E 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 36px 36px",
      }}
    >
      <div id="market" className="absolute top-0 pointer-events-none" />
      {/* Editorial Desk Lighting Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_160px_rgba(0,0,0,0.85)] z-20" />

      {/* Floating Header Desk Ribbon */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 z-30">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xs bg-[#24201C] border border-[#3E3832] text-[#D8CFBC] shrink-0 mt-0.5 sm:mt-0">
            <Compass size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B8944A]">
                THE GAZETTE · MARKET INTELLIGENCE
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl tracking-wide text-[#F2ECE1]">
              Understand the news that moves your money.
            </h2>
            <p className="text-xs font-mono text-[#A89F8D] mt-0.5">
              Interactive Broadsheet · Zoom Out to 40% · Zoom In to 300% · Click any article or stock
            </p>
          </div>
        </div>

        {/* Process Flow Ribbon: NEWS -> MARKET MOVEMENT -> FINANCIAL DECISION */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#201D19] border border-[#3A332B] rounded-xs text-[10px] font-mono tracking-wider uppercase text-[#D8CFBC]">
            <span className="text-emerald-400 font-semibold">NEWS</span>
            <ArrowRight size={11} className="text-[#8A8070]" />
            <span className="text-[#E5C158] font-semibold">MARKET MOVEMENT</span>
            <ArrowRight size={11} className="text-[#8A8070]" />
            <span className="text-white font-semibold">FINANCIAL DECISION</span>
          </div>

          {/* Pan Helper Badge when Zoomed */}
          {currentZoom > 100 && (
            <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#26221E] border border-[#4A4239] text-[#DCD4C4] text-[10px] font-mono rounded-xs animate-pulse">
              <Move size={12} />
              <span>Drag to Pan</span>
            </div>
          )}
        </div>
      </div>

      {/* 3D Broadsheet Viewport Container */}
      <div
        className="w-full max-w-7xl relative z-10 flex items-center justify-center"
        style={{ perspective: "1300px" }}
        onDoubleClick={handleDoubleClick}
      >
        <motion.div
          style={{
            rotateX: isTouchDevice ? 0 : rotateX,
            rotateY: isTouchDevice ? 0 : rotateY,
            scale: currentZoom / 100,
            x: pan.x,
            y: pan.y,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", damping: 30, stiffness: 240 }}
          className="w-full origin-center transition-transform will-change-transform"
        >
          <NewspaperBroadsheet
            onStockClick={(stock) => setSelectedStock(stock)}
            onStockHover={(stock) => {
              setHoveredStock(stock);
              setHoveredArticle(null);
              if (stock) setCursorState("financial");
              else setCursorState("normal");
            }}
            onArticleClick={(article) => setSelectedArticle(article)}
            onArticleHover={(article) => {
              setHoveredArticle(article);
              setHoveredStock(null);
              if (article) setCursorState("hover");
              else setCursorState("normal");
            }}
            onSchemeClick={(scheme) => setSelectedScheme(scheme)}
            onSectorClick={(sector) => setSelectedSector(sector)}
            onIndexClick={(index) => {
              setSelectedStock({
                symbol: index.symbol,
                name: index.name,
                price: index.value,
                change: index.change,
                changePercent: index.changePercent,
                volume: "18.2M",
                marketCap: "₹182.4T",
                dayHigh: index.high,
                dayLow: index.low,
                high52: index.high * 1.05,
                low52: index.low * 0.88,
                peRatio: 22.4,
                dividendYield: 1.2,
                sector: "Broad Sovereign Benchmark",
                description: `Official weighted market capitalisation index representing top tier sovereign corporations on Indian bourses.`,
                historicalPoints: [index.low, index.low + 40, index.value - 20, index.value + 30, index.value],
                relatedNews: ["Institutional liquidity supports broad market valuation"],
              });
            }}
            onMarketClick={(market) => {
              setSelectedStock({
                symbol: market.name,
                name: `${market.name} Benchmark (${market.region})`,
                price: market.value,
                change: market.value * (market.changePercent / 100),
                changePercent: market.changePercent,
                volume: "3.4B",
                marketCap: "Global Tier",
                dayHigh: market.value * 1.01,
                dayLow: market.value * 0.99,
                high52: market.value * 1.12,
                low52: market.value * 0.85,
                peRatio: 24.8,
                dividendYield: 1.6,
                sector: `Global Equities (${market.currency})`,
                description: `International benchmark tracking sovereign and multinational enterprise performance in ${market.region}.`,
                historicalPoints: [market.value * 0.98, market.value * 0.99, market.value * 1.005, market.value],
                relatedNews: ["Global macroeconomic sentiment reflects currency stabilization"],
              });
            }}
          />
        </motion.div>
      </div>

      {/* Floating Zoom Controls with Zoom Out & Fit Options */}
      <div className="fixed bottom-8 right-8 z-50">
        <ZoomControls
          zoom={currentZoom}
          minZoom={ZOOM_STEPS[0]}
          maxZoom={ZOOM_STEPS[ZOOM_STEPS.length - 1]}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          onFitZoom={handleFitZoom}
        />
      </div>

      {/* Floating Mouseover Tooltip Card */}
      <NewspaperHoverCard
        hoveredStock={hoveredStock}
        hoveredArticle={hoveredArticle}
        position={mousePos}
      />

      {/* Modals */}
      <NewsDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
      <StockDetailModal
        stock={selectedStock}
        onClose={() => setSelectedStock(null)}
      />
      <SchemeDetailModal
        scheme={selectedScheme}
        onClose={() => setSelectedScheme(null)}
      />
      <SectorDetailModal
        sector={selectedSector}
        onClose={() => setSelectedSector(null)}
      />
    </section>
  );
}
