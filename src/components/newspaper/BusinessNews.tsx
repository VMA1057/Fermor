"use client";

import React from "react";
import { businessArticles, NewsArticle } from "@/data/newspaperData";
import { ArrowUpRight } from "lucide-react";

interface BusinessNewsProps {
  onArticleClick: (article: NewsArticle) => void;
  onArticleHover?: (article: NewsArticle | null) => void;
}

export default function BusinessNews({ onArticleClick, onArticleHover }: BusinessNewsProps) {
  return (
    <div className="border border-neutral-900 bg-[#FAF7EE] p-4 mb-4 select-none">
      <div className="border-b-2 border-neutral-900 pb-1.5 mb-3 flex items-center justify-between">
        <h3 className="font-serif font-black text-sm tracking-wider uppercase text-neutral-900">
          BUSINESS & CORPORATE DISPATCHES
        </h3>
        <span className="text-[10px] font-mono text-neutral-500 uppercase">
          DOMESTIC & GLOBAL INDUSTRY
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-neutral-300">
        {businessArticles.map((article, idx) => (
          <article
            key={article.id}
            onClick={() => onArticleClick(article)}
            onMouseEnter={() => onArticleHover?.(article)}
            onMouseLeave={() => onArticleHover?.(null)}
            className={`cursor-pointer group flex flex-col justify-between hover:bg-white p-2 transition-all ${
              idx > 0 ? "pt-3 md:pt-0 md:pl-4" : ""
            }`}
          >
            <div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 font-bold block mb-1">
                {article.category}
              </span>
              <h4 className="font-serif text-sm text-neutral-950 uppercase leading-snug mb-2 group-hover:underline">
                {article.title}
              </h4>
              <p className="text-xs font-serif leading-relaxed text-neutral-700 line-clamp-3 mb-3">
                {article.summary}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>{article.source}</span>
              <span className="text-neutral-900 group-hover:text-emerald-900 font-semibold inline-flex items-center">
                REPORT <ArrowUpRight size={10} className="ml-0.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
