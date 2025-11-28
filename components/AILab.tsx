import React, { useState } from 'react';
import { generateBeatConcept } from '../services/geminiService';
import { Sparkles, Loader2, Music2, Sliders } from 'lucide-react';

export const AILab: React.FC = () => {
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [concept, setConcept] = useState<any>(null);

  const handleGenerate = async () => {
    if (!mood.trim()) return;
    setLoading(true);
    setConcept(null);
    try {
      const data = await generateBeatConcept(mood);
      setConcept(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-lab" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold tracking-widest text-white/80">GEMINI AI POWERED</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              CREATIVE <span className="text-orange-500">LAB</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Stuck in a loop? Collaborate with FLAME's trained AI model to generate unique production concepts, chord progressions, and sonic palettes.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            {/* Input Section */}
            <div className="relative z-10">
               <div className="flex flex-col md:flex-row gap-4 mb-8">
                 <input
                   type="text"
                   value={mood}
                   onChange={(e) => setMood(e.target.value)}
                   placeholder="Describe a vibe (e.g. 'Cyberpunk chase in rain', 'Melancholic piano intro')..."
                   className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-orange-500/50 transition-colors placeholder:text-white/20"
                   onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                 />
                 <button
                   onClick={handleGenerate}
                   disabled={loading || !mood}
                   className="bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
                 >
                   {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "GENERATE"}
                 </button>
               </div>
            </div>

            {/* Results Section */}
            {concept && (
              <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-1">Project Title</h3>
                      <p className="text-3xl font-display font-bold text-white">{concept.title}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <span className="block text-[10px] text-white/40 uppercase tracking-wider mb-1">BPM</span>
                        <span className="text-xl font-mono text-white">{concept.bpm}</span>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <span className="block text-[10px] text-white/40 uppercase tracking-wider mb-1">Key</span>
                        <span className="text-xl font-mono text-white">{concept.key}</span>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <span className="block text-[10px] text-white/40 uppercase tracking-wider mb-1">Genre</span>
                        <span className="text-sm font-bold text-white truncate">{concept.genre}</span>
                      </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2 mb-4">
                        <Music2 className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">Instruments</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                         {concept.instruments?.map((inst: string, i: number) => (
                           <span key={i} className="px-2 py-1 bg-black/40 text-white/60 text-xs rounded border border-white/5">{inst}</span>
                         ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 p-8 rounded-xl border border-white/5 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                       <Sliders className="w-4 h-4 text-orange-500" />
                       <span className="text-xs font-bold uppercase tracking-widest text-white/80">Production Notes</span>
                    </div>
                    <p className="text-white/70 leading-relaxed font-light italic">
                      "{concept.productionNotes}"
                    </p>
                    
                    <div className="mt-auto pt-8 border-t border-white/5">
                      <p className="text-xs text-white/30 font-mono">
                        Generated by FLAME x GEMINI Neural Engine
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};