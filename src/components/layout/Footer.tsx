"use client";

import Link from "next/link";
import { useCursor } from "../cursor/CursorContext";

export default function Footer() {
  const { setCursorState } = useCursor();
  
  return (
    <footer className="bg-dark-section text-white pt-24 pb-12 mt-32 rounded-t-[40px] px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-serif mb-6 text-background">FERMOR</h2>
            <p className="text-xl text-gray-400 font-light max-w-md">
              Understand your money. Plan your future. Build your wealth.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-6">Product</h3>
            <ul className="space-y-4">
              {[
                { name: 'Gazette', href: '#gazette' },
                { name: 'Market', href: '#market' },
                { name: 'Portfolio', href: '#portfolio' },
                { name: 'Act', href: '#act' },
                { name: 'Ask', href: '#ask' },
                { name: 'Calculators', href: '#calculators' },
                { name: 'Waitlist', href: '#waitlist' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-gold transition-colors"
                    onMouseEnter={() => setCursorState("hover")}
                    onMouseLeave={() => setCursorState("normal")}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-6">Legal</h3>
            <ul className="space-y-4">
              {[
                { name: 'Disclaimer', href: '#disclaimer' },
                { name: 'Join Waitlist', href: '#waitlist' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-gold transition-colors"
                    onMouseEnter={() => setCursorState("hover")}
                    onMouseLeave={() => setCursorState("normal")}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Fermor. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs text-center md:text-right max-w-2xl">
            Fermor is a financial technology platform. This platform is for educational and informational purposes only and does not constitute financial advice. Investing involves risk, including possible loss of principal.
          </p>
        </div>
      </div>
    </footer>
  );
}
