"use client";

import { motion } from "framer-motion";
import WaitlistForm from "./WaitlistForm";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="py-32 px-6 md:px-12 bg-deep-green text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] rounded-full border border-white/10 opacity-20"></div>
        <div className="absolute -top-[10%] -right-[5%] w-[50%] h-[120%] rounded-full border border-white/10 opacity-20"></div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready to understand your money better?
        </motion.h2>
        
        <motion.p 
          className="text-xl text-green-100 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Be the first to experience Fermor when public access opens.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <WaitlistForm variant="dark" />
        </motion.div>
      </div>
    </section>
  );
}
