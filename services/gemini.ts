import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: apiKey || "",
});

export async function generateDogPun() {
  try {
    if (!apiKey) {
      throw new Error("Missing VITE_GEMINI_API_KEY");
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents:
        "Generate a short, cute puppy-themed pun for a Valentine's request. No hearts, just dog stuff like bones, paws, or barks.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pun: { type: Type.STRING, description: "A cute dog pun" },
            message: { type: Type.STRING, description: "A sweet short sentence" },
          },
          required: ["pun", "message"],
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      pun: "You're paw-sitively amazing!",
      message: "I'd be barking mad not to ask you!",
    };
  }
}
