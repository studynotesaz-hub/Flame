
import React from 'react';
import { SERVICES } from '../constants';
import { playHover } from '../utils/audio';

export const Skills: React.FC = () => {
  return (
    <section id="studio" className="py-40 bg-[#050505] relative border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/3">
            <div className="sticky top-32">
                <span className="block text-[#cd3815] font-mono text-[10px] tracking-[0.3em] mb-6">SERVICES</span>
                <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 leading-[0.85] tracking-tighter">
                THE <br/>STUDIO
                </h2>
                <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
                    World-class sonic infrastructure. From conceptualization to final master, FLAME delivers industry-defining quality.
                </p>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="space-y-0">
              {SERVICES.map((service, index) => (
                <div 
                    key={index} 
                    onMouseEnter={playHover}
                    className="group py-16 border-b border-white/10 hover:border-white transition-colors duration-700 flex flex-col md:flex-row gap-8 md:gap-0 justify-between items-start md:items-center cursor-default"
                >
                  <div className="md:w-1/2 relative">
                    <span className="absolute -left-8 md:-left-12 text-[#cd3815] font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">0{index + 1}</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white/40 group-hover:text-white transition-colors duration-500 ease-out font-display uppercase">
                      {service.title}
                    </h3>
                  </div>
                  
                  <div className="md:w-1/2 md:pl-12">
                    <p className="text-white/50 leading-relaxed text-sm mb-6 group-hover:text-white/80 transition-colors max-w-sm">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map(tag => (
                        <span key={tag} className="text-[9px] text-white/30 border border-white/10 px-2 py-1 uppercase tracking-widest hover:border-[#cd3815] hover:text-[#cd3815] transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
