
import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
    { label: "CAREER STREAMS", value: "50B+", sub: "ALL PLATFORMS" },
    { label: "PLATINUM RECORDS", value: "128", sub: "RIAA CERTIFIED" },
    { label: "GRAMMY AWARDS", value: "25", sub: "WINNER" },
    { label: "BILLBOARD #1s", value: "42", sub: "GLOBAL CHARTS" },
];

export const Impact: React.FC = () => {
  return (
    <section className="py-32 bg-[#080808] border-y border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[400px] bg-[#cd3815]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-24 text-center">
            <span className="text-[#cd3815] font-mono text-xs tracking-[0.5em] uppercase block mb-6">World Dominance</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
                THE NUMBERS <br/> <span className="text-white/30">DON'T LIE</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/10 pt-12">
            {STATS.map((stat, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="font-display text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-4 group-hover:from-[#cd3815] group-hover:to-orange-500 transition-all duration-500"
                    >
                        {stat.value}
                    </motion.span>
                    <span className="text-white font-bold tracking-widest text-sm mb-2">{stat.label}</span>
                    <span className="text-white/30 font-mono text-[10px] tracking-[0.2em] uppercase">{stat.sub}</span>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};
