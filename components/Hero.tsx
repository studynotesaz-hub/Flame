
import React from 'react';
import { motion } from 'framer-motion';
import { AbstractScene } from './AbstractScene';
import { Clients } from './Clients';
import { playHover, playClick } from '../utils/audio';

interface HeroProps {
    onOpenWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWorks }) => {
  const handleOpen = () => {
    playClick();
    onOpenWorks();
  };

  return (
    <section id="hero" className="relative h-screen w-full flex flex-col justify-between overflow-hidden">
      <AbstractScene />
      
      {/* Heavy vignette for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)] z-0 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-grow flex flex-col justify-center mt-20">
        <div className="flex flex-col items-center md:items-start relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center gap-4 mb-6 md:mb-10 overflow-hidden"
          >
            <div className="h-[2px] w-8 md:w-16 bg-[#cd3815]"></div>
            <span className="text-white/60 font-mono text-[9px] md:text-[11px] tracking-[0.4em] uppercase">
              The Undisputed King of Sound
            </span>
          </motion.div>

          <div className="relative mix-blend-difference overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="font-display text-[18vw] leading-[0.8] font-bold tracking-tighter text-white select-none"
            >
              FLAME
            </motion.h1>
          </div>

          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-[400px] h-[1px] bg-gradient-to-r from-[#cd3815] via-white/20 to-transparent mt-8 mb-8 origin-left"
          />

          <div className="overflow-hidden mb-12">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-white/60 text-sm md:text-2xl max-w-2xl font-light leading-relaxed tracking-wide text-center md:text-left"
            >
              Crafting the soundscape of a generation. <br/>
              <span className="text-white font-medium">50 Billion Streams. 25 Grammys. 1 Icon.</span>
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={handleOpen}
            onMouseEnter={playHover}
            className="group relative px-10 py-5 bg-white overflow-hidden cursor-pointer"
          >
             <span className="relative z-10 text-black font-bold tracking-[0.2em] text-xs group-hover:text-white transition-colors duration-500">
                OPEN ARCHIVES
             </span>
             <div className="absolute inset-0 bg-[#cd3815] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </motion.button>
        </div>
      </div>

      <Clients />
    </section>
  );
};
