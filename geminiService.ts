import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateBeatConcept = async (mood: string): Promise<any> => {
  if (!apiKey) {
    console.warn("API Key missing");
    return {
      title: "Demo Mode",
      bpm: "140",
      key: "C Minor",
      instruments: ["808", "Synth"],
      description: "API Key not configured. This is a demo response."
    };
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
    throw error;
  }
};