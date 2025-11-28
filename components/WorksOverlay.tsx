
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TRACKS } from '../constants';
import { ArrowUpRight, X, Disc } from 'lucide-react';
import { playHover, playClick, playSuccess } from '../utils/audio';

interface WorksOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorksOverlay: React.FC<WorksOverlayProps> = ({ isOpen, onClose }) => {
  
  useEffect(() => {
    if (isOpen) playSuccess();
  }, [isOpen]);

  const handleClose = () => {
    playClick();
    onClose();
  };

  return (
    <motion.div
      initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
      animate={{ clipPath: isOpen ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
      exit={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-[#111] overflow-y-auto overscroll-contain"
    >
      <div className="min-h-screen relative bg-[#111] text-white">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Sticky Header */}
        <div className="sticky top-0 left-0 right-0 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 bg-[#111]/90 backdrop-blur-xl border-b border-white/10">
            <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-[#cd3815] rounded-full animate-pulse" />
                <span className="font-mono text-xs tracking-[0.2em] text-white/60">SECURE DATABASE // LEVEL 5 ACCESS</span>
            </div>
            <button 
                onClick={handleClose}
                onMouseEnter={playHover}
                className="group flex items-center gap-3 px-6 py-2 bg-white/5 hover:bg-white rounded-full transition-all duration-300"
            >
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase group-hover:text-black transition-colors">Close Archive</span>
                <X className="w-4 h-4 group-hover:text-black transition-colors" />
            </button>
        </div>

        <div className="container mx-auto px-6 md:px-12 py-20 pb-40">
           
           <div className="mb-24 relative">
             <h1 className="font-display text-[12vw] leading-[0.8] font-bold text-white/5 absolute top-0 left-0 -translate-y-1/2 pointer-events-none select-none">
                CATALOG
             </h1>
             <div className="relative z-10 pt-10">
                <span className="text-[#cd3815] font-mono text-sm tracking-[0.4em] block mb-4">DISCOGRAPHY</span>
                <h2 className="font-display text-5xl md:text-7xl font-bold text-white">MASTER TAPES</h2>
             </div>
           </div>

           <div className="grid grid-cols-1 gap-0">
             {TRACKS.map((track, index) => (
               <div 
                key={track.id} 
                className="group relative border-t border-white/10 py-16 hover:bg-white/5 transition-all duration-500"
                onMouseEnter={playHover}
               >
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                      
                      {/* Album Art with Vinyl Effect */}
                      <div className="w-full md:w-1/3 aspect-square max-w-[300px] relative">
                          <div className="absolute inset-0 bg-black rounded-full transform translate-x-12 translate-y-0 opacity-0 group-hover:translate-x-24 group-hover:opacity-100 transition-all duration-700 ease-out flex items-center justify-center">
                             <Disc className="w-24 h-24 text-white/20 animate-spin-slow" />
                          </div>
                          <img 
                              src={track.cover} 
                              alt={track.title} 
                              className="w-full h-full object-cover relative z-10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                          />
                      </div>

                      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                          <div className="flex items-center gap-6 mb-4">
                             <span className="font-display text-4xl text-white/10 group-hover:text-[#cd3815] transition-colors duration-500">
                                0{index + 1}
                             </span>
                             <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] text-white/60 tracking-widest uppercase group-hover:border-[#cd3815] group-hover:text-[#cd3815] transition-colors">
                                {track.year}
                             </span>
                          </div>

                          <h3 className="text-4xl md:text-7xl font-display font-bold text-white mb-2 leading-none uppercase group-hover:tracking-wide transition-all duration-500">
                              {track.title}
                          </h3>
                          <p className="text-xl text-white/40 font-light tracking-wide mb-8">{track.artist}</p>

                          <div className="flex gap-4">
                              <button 
                                onClick={playClick}
                                className="px-8 py-3 bg-white text-black font-bold tracking-[0.2em] text-xs hover:bg-[#cd3815] hover:text-white transition-colors duration-300"
                              >
                                  PLAY TRACK
                              </button>
                              <button 
                                onClick={playClick}
                                className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                              >
                                  <ArrowUpRight className="w-5 h-5" />
                              </button>
                          </div>
                      </div>

                  </div>
               </div>
             ))}
           </div>
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-between items-end pointer-events-none z-40 bg-gradient-to-t from-[#111] to-transparent h-32">
             <span className="text-white/10 font-display text-9xl font-bold opacity-20 hidden md:block">FLAME</span>
             <p className="text-white/30 font-mono text-[10px] tracking-widest p-4">CONFIDENTIAL // DO NOT DISTRIBUTE</p>
        </div>
      </div>
    </motion.div>
  );
};
