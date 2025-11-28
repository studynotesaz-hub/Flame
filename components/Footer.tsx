
import React from 'react';
import { FlameLogo } from './FlameLogo';
import { Instagram, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { playHover, playClick } from '../utils/audio';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#050505] pt-40 pb-12 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col justify-between items-start mb-32">
             <h2 className="font-display text-[14vw] font-bold text-white leading-[0.8] tracking-tighter mb-12 select-none mix-blend-difference">
               GET IN <span className="text-[#222]">TOUCH</span>
             </h2>
             
             <div className="w-full flex flex-col md:flex-row justify-between items-end pt-12">
                <a 
                    href="mailto:booking@flameaudio.com" 
                    className="group flex flex-col"
                    onMouseEnter={playHover}
                    onClick={playClick}
                >
                   <span className="text-[10px] text-[#cd3815] font-mono tracking-[0.3em] mb-4">BOOKING & INQUIRIES</span>
                   <div className="flex items-center gap-4">
                       <span className="text-3xl md:text-5xl font-bold text-white group-hover:text-[#cd3815] transition-colors tracking-tight">booking@flame.com</span>
                       <ArrowUpRight className="w-8 h-8 text-white group-hover:rotate-45 transition-transform duration-500 group-hover:text-[#cd3815]" />
                   </div>
                </a>

                <div className="flex gap-4 mt-12 md:mt-0">
                    {[
                        { icon: Instagram, href: "#" }, 
                        { icon: Twitter, href: "#" }, 
                        { icon: Mail, href: "#" }
                    ].map((Item, i) => (
                        <a 
                            key={i} 
                            href={Item.href} 
                            onMouseEnter={playHover}
                            onClick={playClick}
                            className="w-14 h-14 bg-white/5 border border-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full"
                        >
                            <Item.icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
             </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
          <div className="flex items-center gap-4">
            <FlameLogo className="w-10 h-10 text-white" />
            <div className="flex flex-col">
                <span className="font-display font-bold tracking-widest text-lg text-white leading-none">FLAME</span>
                <span className="text-[8px] text-white/30 uppercase tracking-[0.4em]">Sonic Architect</span>
            </div>
          </div>
          
          <div className="flex gap-12">
             {['Privacy', 'Legal', 'Credits'].map(link => (
               <a key={link} href="#" className="text-[10px] text-white/30 hover:text-white transition-colors uppercase tracking-[0.2em]">{link}</a>
             ))}
          </div>

          <p className="text-[10px] text-white/20 font-mono tracking-widest">© {currentYear} LOS ANGELES.</p>
        </div>
      </div>
    </footer>
  );
};
