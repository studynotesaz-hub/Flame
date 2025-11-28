
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SmoothScroll } from './components/SmoothScroll';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Impact } from './components/Impact';
import { Skills } from './components/Skills';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { WorksOverlay } from './components/WorksOverlay';
import { AudioControl } from './components/AudioControl';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [worksOpen, setWorksOpen] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {worksOpen && <WorksOverlay isOpen={worksOpen} onClose={() => setWorksOpen(false)} />}
      </AnimatePresence>

      {!loading && (
        <SmoothScroll>
          <CustomCursor />
          <AudioControl />
          <main className="bg-[#050505] min-h-screen text-white md:cursor-none selection:bg-[#cd3815] selection:text-white relative z-10">
            <Navigation onOpenWorks={() => setWorksOpen(true)} />
            <Hero onOpenWorks={() => setWorksOpen(true)} />
            <Impact />
            <Skills />
            <Footer />
          </main>
        </SmoothScroll>
      )}
    </>
  );
};

export default App;
