import React from 'react';
import { motion } from 'framer-motion';

const CLIENT_LIST = [
  "HONEY SINGH", "TRAVIS SCOTT", "THE WEEKND", "BAD BUNNY", 
  "SKRILLEX", "DILJIT DOSANJH", "FUTURE", "METRO BOOMIN",
  "DRAKE", "PLAYBOI CARTI", "ROSALÍA", "POST MALONE"
];

export const Clients: React.FC = () => {
  return (
    <div className="w-full py-8 border-y border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden flex items-center relative z-20">
      <div className="flex whitespace-nowrap">
        <motion.div 
          className="flex gap-20 items-center"
          animate={{ x: "-50%" }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 30 
          }}
        >
          {[...CLIENT_LIST, ...CLIENT_LIST].map((client, index) => (
            <div key={index} className="flex items-center gap-20">
              <span className="text-3xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 tracking-tighter uppercase select-none hover:from-white hover:to-white/50 transition-colors duration-500">
                {client}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#cd3815]/50"></span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};