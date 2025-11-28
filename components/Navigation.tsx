
import React, { useState, useEffect } from 'react';
import { FlameLogo } from './FlameLogo';
import { SectionId } from '../types';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playHover, playClick } from '../utils/audio';

interface NavigationProps {
    onOpenWorks: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenWorks }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    playClick();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenWorks = () => {
    playClick();
    setMobileMenuOpen(false);
    onOpenWorks();
  };

  const handleMobileToggle = () => {
    playClick();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${scrolled ? 'py-4 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5' : 'py-6 md:py-8 bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity relative z-50" 
            onClick={() => scrollTo(SectionId.HERO)}
            onMouseEnter={playHover}
          >
            <FlameLogo className="w-8 h-8 text-[#cd3815] md:text-white transition-colors duration-500" />
            <span className="font-display font-bold text-lg text-white md:hidden tracking-wider">FLAME</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-16">
            <button
              onClick={onOpenWorks}
              onMouseEnter={playHover}
              className="text-[11px] font-bold tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase font-display"
            >
              DISCOGRAPHY
            </button>

            <button
              onClick={() => scrollTo(SectionId.STUDIO)}
              onMouseEnter={playHover}
              className="text-[11px] font-bold tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase font-display"
            >
              STUDIO
            </button>
            
            <button 
              onClick={() => scrollTo(SectionId.CONTACT)}
              onMouseEnter={playHover}
              className="px-8 py-3 bg-white text-black text-[10px] font-bold tracking-[0.2em] hover:bg-[#cd3815] hover:text-white transition-all duration-500 clip-path-slant"
              style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)' }}
            >
              INQUIRE
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white relative z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={handleMobileToggle}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#080808] flex flex-col justify-center items-center gap-8 md:hidden"
          >
             <button
              onClick={handleOpenWorks}
              className="text-4xl font-display font-bold text-white hover:text-[#cd3815] transition-colors tracking-tighter"
            >
              ARCHIVES
            </button>

            <button
              onClick={() => scrollTo(SectionId.STUDIO)}
              className="text-4xl font-display font-bold text-white hover:text-[#cd3815] transition-colors tracking-tighter"
            >
              STUDIO
            </button>

            <button
              onClick={() => scrollTo(SectionId.CONTACT)}
              className="text-4xl font-display font-bold text-white hover:text-[#cd3815] transition-colors tracking-tighter"
            >
              CONTACT
            </button>

             <div className="absolute bottom-12 flex flex-col items-center gap-4">
                <FlameLogo className="w-12 h-12 text-[#cd3815]" />
                <div className="text-white/20 text-xs font-mono tracking-widest uppercase">
                    Flame Audio © 2024
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
