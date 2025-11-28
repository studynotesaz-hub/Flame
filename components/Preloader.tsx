
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { playSuccess, initAudio, playClick } from '../utils/audio';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const duration = 1500; 
    const interval = 15;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setReady(true);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    // Unlock Audio Context on user gesture
    initAudio();
    playClick();
    setTimeout(() => {
        playSuccess();
        onComplete();
    }, 200);
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col justify-between p-8 md:p-12 cursor-default"
    >
      <div className="flex justify-between items-start">
        <span className="text-white/40 font-mono text-xs tracking-widest">FLAME AUDIO®</span>
        <span className="text-white/40 font-mono text-xs tracking-widest">EST. 2024</span>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
         {!ready ? (
             <div className="flex flex-col items-center w-full">
                 <h1 className="font-display text-6xl md:text-9xl font-bold text-white tracking-tighter mb-8 tabular-nums">
                    {Math.round(count)}%
                 </h1>
                 <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
                    <motion.div 
                        className="absolute top-0 left-0 h-full bg-[#cd3815]"
                        style={{ width: `${count}%` }}
                    />
                 </div>
             </div>
         ) : (
             <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleEnter}
                className="group relative px-12 py-6 bg-white overflow-hidden"
             >
                <div className="absolute inset-0 bg-[#cd3815] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 font-display font-bold text-xl md:text-2xl text-black group-hover:text-white tracking-widest uppercase transition-colors duration-500">
                    Enter Experience
                </span>
             </motion.button>
         )}
      </div>

      <div className="flex justify-between items-end h-12">
        <div className="flex flex-col gap-2">
            <span className="text-[#cd3815] font-mono text-[10px] tracking-[0.2em] uppercase animate-pulse">
                {ready ? "SYSTEM READY" : "SYSTEM INITIALIZING"}
            </span>
            <span className="text-white/20 font-mono text-[10px] tracking-widest">
                {ready ? "WAITING FOR USER INPUT" : "LOADING ASSETS"}
            </span>
        </div>
      </div>
    </motion.div>
  );
};
