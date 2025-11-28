
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { audioState, playSwitch } from '../utils/audio';

export const AudioControl: React.FC = () => {
    // Start unmuted visually because we force unlock at start
    const [muted, setMuted] = useState(false);

    const toggleAudio = () => {
        audioState.isMuted = !audioState.isMuted;
        setMuted(audioState.isMuted);
        if (!audioState.isMuted) playSwitch();
    };

    return (
        <button 
            onClick={toggleAudio}
            className="fixed bottom-12 right-12 z-40 hidden md:flex items-center gap-4 group mix-blend-difference cursor-pointer"
        >
            <span className={`text-[10px] font-bold tracking-[0.2em] text-white transition-opacity duration-300 ${!muted ? 'opacity-100' : 'opacity-50'}`}>
                {!muted ? 'SOUND ON' : 'SOUND OFF'}
            </span>
            <div className="flex gap-[2px] items-end h-4">
                {[1, 2, 3, 4].map((bar) => (
                    <motion.div
                        key={bar}
                        animate={{
                            height: !muted ? [4, 16, 8, 12, 4] : 2,
                            opacity: !muted ? 1 : 0.3
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: bar * 0.1,
                        }}
                        className="w-[2px] bg-white"
                    />
                ))}
            </div>
        </button>
    );
};
