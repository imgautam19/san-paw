import { GoogleGenAI, Type } from "@google/genai";

function getApiKey() {
  // Vite exposes env vars only through import.meta.env and only if prefixed with VITE_
  return import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
}

export async function generateDogPun() {
  const apiKey = getApiKey();

  // If key is missing, don’t crash the app — return a fallback.
  if (!apiKey) {
    console.warn("Missing VITE_GEMINI_API_KEY. Returning fallback message.");
    return {
      pun: "You're paw-sitively amazing!",
      message: "I'd be barking mad not to ask you!",
    };
  }

  try {
    // Create client only when needed (prevents crashes on import)
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents:
        "Generate a short, cute puppy-themed pun for a Valentine's request. No hearts, just dog stuff like bones, paws, or barks.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pun: { type: Type.STRING },
            message: { type: Type.STRING },
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
