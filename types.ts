export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  year: string;
}

export interface Service {
  title: string;
  description: string;
  tags: string[];
}

export interface BeatConcept {
  genre: string;
  bpm: string;
  key: string;
  vibe: string;
  instruments: string[];
}

export enum SectionId {
  HERO = 'hero',
  WORK = 'work',
  STUDIO = 'studio',
  CONTACT = 'contact'
}