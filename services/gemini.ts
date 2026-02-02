
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateDogPun() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a short, cute puppy-themed pun for a Valentine's request. No hearts, just dog stuff like bones, paws, or barks.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pun: { type: Type.STRING, description: "A cute dog pun" },
            message: { type: Type.STRING, description: "A sweet short sentence" }
          },
          required: ["pun", "message"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { 
      pun: "You're paw-sitively amazing!", 
      message: "I'd be barking mad not to ask you!" 
    };
  }
}
