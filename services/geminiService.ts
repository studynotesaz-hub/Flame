import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBeatConcept = async (mood: string): Promise<any> => {
  // Graceful fallback if no API key is set
  if (!process.env.API_KEY) {
    console.warn("API Key missing. Returning demo data.");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                title: "NOCTURNAL DEMO",
                bpm: "140",
                key: "C Minor",
                genre: "Dark Trap",
                vibe: "Aggressive",
                instruments: ["808", "Distorted Synth", "Choir"],
                productionNotes: "This is a simulated response because the API Key is not configured."
              });
        }, 1000);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a detailed music production concept for a track with the mood: "${mood}". 
      Return a JSON object with: 
      - title (creative track title)
      - genre
      - bpm (number)
      - key (musical key)
      - vibe (2-3 words)
      - instruments (array of strings)
      - productionNotes (short paragraph)`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            genre: { type: Type.STRING },
            bpm: { type: Type.STRING },
            key: { type: Type.STRING },
            vibe: { type: Type.STRING },
            instruments: { type: Type.ARRAY, items: { type: Type.STRING } },
            productionNotes: { type: Type.STRING }
          }
        }
      }
    });

    if (response.text) {
        return JSON.parse(response.text);
    }
    throw new Error("No text response");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return safe fallback on error
    return {
        title: "SYSTEM ERROR",
        bpm: "000",
        key: "N/A",
        genre: "Error",
        vibe: "Glitch",
        instruments: ["N/A"],
        productionNotes: "The AI service is currently unavailable. Please check configuration."
    };
  }
};