"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Country, countries } from "@/data/countries";
import CountryPanel from "../globe/CountryPanel";
import WaitlistForm from "../ui/WaitlistForm";

const FinancialGlobe = dynamic(() => import("../globe/FinancialGlobe"), { 
  ssr: false,
  loading: () => <div className="w-full h-full" />
});

export default function Hero() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Mobile quick selection
  const mobileCountries = countries.filter(c => 
    ['in', 'us', 'uk', 'jp', 'ae'].includes(c.id)
  );

  return (
    <section className="relative min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 flex flex-col justify-center overflow-hidden bg-[#F7F7F2]">
      {/* Desktop 3D Globe Background */}
      <div className="hidden md:flex absolute inset-0 top-10 items-center justify-center z-0 opacity-60">
        <FinancialGlobe 
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry} 
        />
      </div>

      {/* Mobile Lightweight Ambient Fallback (Zero WebGL overhead, zero layout shift) */}
      <div className="md:hidden absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-40">
        <div className="w-72 h-72 rounded-full border border-deep-green/15 bg-gradient-to-b from-deep-green/[0.04] via-transparent to-gold/[0.04]" />
      </div>

      <AnimatePresence>
        {selectedCountry && (
          <CountryPanel 
            country={selectedCountry} 
            onClose={() => setSelectedCountry(null)} 
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10 flex flex-col items-center pointer-events-none mt-6 sm:mt-10">
        <motion.h1 
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] tracking-tight text-primary leading-[1.15] sm:leading-[1.1] text-center mb-5 sm:mb-6 font-serif break-words"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Understand your money.<br/>
          Plan it. <span className="text-deep-green">Act on it.</span>
        </motion.h1>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-secondary mb-8 sm:mb-10 text-center max-w-2xl leading-relaxed px-2 font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Model real scenarios, see how today&apos;s financial choices shape your future, and make confident wealth decisions with clarity.
        </motion.p>
        
        <motion.div 
          className="pointer-events-auto w-full max-w-md mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <WaitlistForm variant="hero" />
        </motion.div>
      </div>

      <div className="flex-grow"></div>

      {/* Mobile selectors */}
      <div className="md:hidden relative z-20 w-full px-5 overflow-x-auto pb-4 mt-6 no-scrollbar pointer-events-auto">
        <div className="flex gap-2.5 w-max mx-auto">
          {mobileCountries.map(country => (
            <button
              key={country.id}
              type="button"
              onClick={() => setSelectedCountry(country)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors border cursor-pointer focus-visible:outline-2 focus-visible:outline-deep-green ${
                selectedCountry?.id === country.id
                  ? "bg-deep-green text-white border-deep-green shadow-xs"
                  : "bg-white text-primary border-gray-200 hover:border-deep-green"
              }`}
            >
              {country.name} · {country.code}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
