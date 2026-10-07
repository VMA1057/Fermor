"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Country } from "@/data/countries";
import { convertCurrency, exchangeRates, fetchLiveExchangeRates } from "@/data/currencies";
import { countryMarkets } from "@/data/markets";
import { countryNews } from "@/data/financialNews";
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";

interface CountryPanelProps {
  country: Country;
  onClose: () => void;
}

export default function CountryPanel({ country, onClose }: CountryPanelProps) {
  const [inrAmount, setInrAmount] = useState<number>(100000);
  const [currentRates, setCurrentRates] = useState<Record<string, number>>(exchangeRates);

  useEffect(() => {
    let isMounted = true;
    fetchLiveExchangeRates()
      .then((rates) => {
        if (isMounted) setCurrentRates(rates);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const convertedAmount = convertCurrency(inrAmount, "INR", country.code, currentRates);
  const markets = countryMarkets[country.name] || [];
  const news = countryNews[country.name] || [];

  return (
    <motion.div
      className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-background/95 backdrop-blur-xl border-l border-light-border shadow-2xl z-[70] overflow-y-auto"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <div className="p-5 sm:p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-serif text-primary uppercase tracking-wide">{country.name}</h2>
            <p className="text-secondary">{country.currency} · {country.symbol}</p>
          </div>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-3 rounded-full hover:bg-gray-200/80 active:scale-95 transition-all cursor-pointer relative z-20 text-primary"
            aria-label="Close panel"
          >
            <X size={26} />
          </button>
        </div>

        <div className="mb-12 bg-white rounded-2xl p-6 border border-light-border shadow-sm">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Currency Conversion</h3>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="text-secondary font-medium">YOUR MONEY (INR)</span>
              <div className="flex items-center">
                <span className="text-gray-400 mr-1">₹</span>
                <input 
                  type="number" 
                  value={inrAmount}
                  onChange={(e) => setInrAmount(Number(e.target.value) || 0)}
                  className="w-28 text-right font-medium text-lg bg-transparent border-none focus:ring-0 p-0 text-primary tabular-nums outline-none"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-deep-green font-medium flex items-center gap-2">
                <span className="text-lg">{country.symbol}</span> {country.code}
              </span>
              <span className="text-2xl font-semibold text-deep-green tabular-nums">
                {new Intl.NumberFormat(country.locale, { maximumFractionDigits: 2 }).format(convertedAmount)}
              </span>
            </div>

            <p className="text-[11px] text-secondary mt-1">Rates are indicative · Benchmark reference</p>
          </div>
        </div>

        {markets.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Markets</h3>
            <div className="grid grid-cols-2 gap-4">
              {markets.map((market) => (
                <div key={market.id} className="bg-white rounded-xl p-4 border border-light-border">
                  <p className="text-sm text-secondary font-medium mb-1">{market.name}</p>
                  <p className="text-xl text-primary font-semibold tabular-nums mb-2">{market.value}</p>
                  <div className={`flex items-center text-sm font-medium ${market.isPositive ? 'text-deep-green' : 'text-red-500'}`}>
                    {market.isPositive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                    {market.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {news.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Latest Finance News</h3>
            <div className="space-y-4">
              {news.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className="group cursor-pointer"
                >
                  <p className="font-medium text-primary leading-snug group-hover:text-deep-green transition-colors mb-2">
                    {item.title}
                  </p>
                  <div className="flex items-center text-xs text-secondary gap-2">
                    <span className="font-medium">{item.source}</span>
                    <span>·</span>
                    <span>{item.time}</span>
                  </div>
                  {index < news.length - 1 && <hr className="mt-4 border-light-border" />}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
