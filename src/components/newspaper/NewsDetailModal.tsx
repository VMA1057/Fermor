"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NewsArticle } from "@/data/newspaperData";
import { X, ExternalLink } from "lucide-react";

interface NewsDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export default function NewsDetailModal({ article, onClose }: NewsDetailModalProps) {
  if (!article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 select-text">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Editorial Newspaper Article Dossier */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#F9F6EE] border-2 border-neutral-900 shadow-2xl text-neutral-900 p-4 sm:p-6 md:p-8 rounded-xs"
        >
          {/* Top Broadview Rule */}
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2 mb-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-neutral-600">
              DISPATCH ARCHIVE · {article.category}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer text-neutral-800"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-neutral-950 uppercase leading-snug mb-3">
            {article.title}
          </h2>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-y border-neutral-300 py-2 mb-5 text-[11px] font-serif text-neutral-600">
            <div>
              <span>Published: <strong>{article.publishedAt}</strong></span>
              <span className="mx-2">·</span>
              <span>By {article.author}</span>
            </div>
            <div className="font-mono text-[10px] text-neutral-500">
              {article.readTime} · {article.edition}
            </div>
          </div>

          {/* Pull Quote / Summary Banner */}
          <div className="bg-[#EFE9DC] border-l-4 border-neutral-900 p-4 mb-6">
            <p className="font-serif italic text-sm text-neutral-800 leading-relaxed">
              &ldquo;{article.summary}&rdquo;
            </p>
          </div>

          {/* Article Body */}
          <div className="space-y-4 text-xs sm:text-sm font-serif leading-relaxed text-neutral-800 mb-8 border-b border-neutral-300 pb-6">
            {article.fullContent.map((paragraph, index) => (
              <p key={index}>
                {index === 0 ? (
                  <>
                    <span className="float-left text-4xl font-serif leading-none pr-2 pt-1 text-neutral-950">
                      {paragraph.charAt(0)}
                    </span>
                    {paragraph.slice(1)}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>

          {/* Verified Source & Read Full Story CTA */}
          <div className="bg-white border border-neutral-300 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                EDITORIAL SOURCE & CITATION
              </span>
              <span className="font-serif text-sm text-neutral-900">
                {article.source}
              </span>
            </div>

            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-950 text-[#F9F6EE] hover:bg-neutral-800 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              <span>Read Full Story</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
