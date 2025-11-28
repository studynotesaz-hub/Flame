import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TRACKS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export const Works: React.FC = () => {
  return (
    <section id="work" className="bg-[#050505] relative pt-32 pb-32">
      <div className="container mx-auto px-6 md:px-12 mb-20">
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-12"
        >
          <div>
            <span className="text-[#cd3815] font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Selected Works</span>
            <h2 className="font-display text-5xl md:text-8xl font-bold text-white leading-[0.85] tracking-tight">
              SONIC <br /> <span className="text-white/20">ARCHIVES</span>
            </h2>
          </div>
          <div className="hidden md:block">
              <p className="text-white/40 text-sm font-mono tracking-widest max-w-xs text-right">
                  A COLLECTION OF PLATINUM RECORDS AND EXPERIMENTAL SOUNDSCAPES
              </p>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col gap-32">
        {TRACKS.map((track, index) => (
          <WorkItem key={track.id} track={track} index={index} />
        ))}
      </div>
    </section>
  );
};

const WorkItem: React.FC<{ track: any, index: number }> = ({ track, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    const isEven = index % 2 === 0;

    return (
        <div ref={ref} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center group`}>
            {/* Image Container */}
            <div className="w-full md:w-3/5 h-[60vh] md:h-[80vh] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out">
                <motion.div style={{ scale }} className="w-full h-full">
                    <img 
                        src={track.cover} 
                        alt={track.title} 
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-[#cd3815]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
                
                {/* Floating Index */}
                <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10 overflow-hidden">
                    <span className="block text-6xl md:text-9xl font-display font-bold text-white/10 group-hover:text-white transition-colors duration-700 leading-none">
                        0{index + 1}
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <motion.div 
                style={{ y, opacity }} 
                className="w-full md:w-2/5 flex flex-col justify-center z-10"
            >
                <div className="flex items-center gap-4 mb-6">
                    <span className="h-[1px] w-12 bg-[#cd3815]" />
                    <span className="text-[#cd3815] font-mono text-xs tracking-widest">{track.year}</span>
                </div>
                
                <h3 className="text-4xl md:text-7xl font-display font-bold text-white mb-4 leading-[0.9] uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-500">
                    {track.title}
                </h3>
                
                <p className="text-white/40 font-mono text-sm tracking-widest uppercase mb-8">
                    {track.artist}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                    {['PRODUCER', 'MIX', 'MASTER'].map((tag, i) => (
                        <span key={i} className="px-3 py-1 border border-white/10 rounded-full text-[10px] text-white/50 uppercase tracking-wider hover:border-[#cd3815] hover:text-[#cd3815] transition-colors cursor-default">
                            {tag}
                        </span>
                    ))}
                </div>

                <button className="flex items-center gap-4 group/btn w-max">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:border-white transition-all duration-500">
                        <ArrowUpRight className="w-5 h-5 text-white group-hover/btn:text-black transition-colors" />
                    </div>
                    <span className="text-xs font-bold tracking-[0.2em] text-white group-hover/btn:translate-x-2 transition-transform duration-500">LISTEN NOW</span>
                </button>
            </motion.div>
        </div>
    );
};