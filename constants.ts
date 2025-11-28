import { Track, Service } from './types';

export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'NOCTURNAL VISIONS',
    artist: 'FLAME ft. VEO',
    duration: '3:42',
    cover: 'https://picsum.photos/seed/flame1/800/800',
    year: '2024'
  },
  {
    id: '2',
    title: 'CHROMATIC ASH',
    artist: 'FLAME',
    duration: '2:55',
    cover: 'https://picsum.photos/seed/flame2/800/800',
    year: '2024'
  },
  {
    id: '3',
    title: 'SYSTEM OVERLOAD',
    artist: 'FLAME (Prod. Mix)',
    duration: '4:10',
    cover: 'https://picsum.photos/seed/flame3/800/800',
    year: '2023'
  }
];

export const SERVICES: Service[] = [
  {
    title: "Music Production",
    description: "Full-scale production from demo to master. Specializing in dark trap, cinematic ambient, and industrial experimental.",
    tags: ["Ableton Live", "Analog Synths", "Sound Design"]
  },
  {
    title: "Mixing & Mastering",
    description: "Industry standard sonic clarity with a unique character. Bringing depth, width, and punch to your records.",
    tags: ["Pro Tools", "Dolby Atmos", "Analog Outboard"]
  },
  {
    title: "Score Composition",
    description: "Bespoke soundscapes for film, gaming, and visual media. Emotionally driven audio architecture.",
    tags: ["Orchestral", "Hybrid", "Foley"]
  }
];