import { GoogleGenAI } from "@google/genai";
import { House } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const talkToTomRiddle = async (
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  userMessage: string
): Promise<string> => {
  if (!apiKey) return "The ink fades... (API Key missing)";

  try {
    const model = "gemini-2.5-flash";
    
    const systemInstruction = `
      You are playing the role of Tom Marvolo Riddle (young Voldemort) preserved in his diary.
      You are charming, intelligent, manipulative, and slightly sinister, but polite.
      You are curious about the user and the magical world.
      Keep responses relatively short, as if writing in a diary with fading ink.
      Do not break character.
    `;

    // Reformat history for the API
    const chatHistory = history.map(h => ({
      role: h.role,
      parts: h.parts,
    }));

    const chat = ai.chats.create({
      model,
      history: chatHistory,
      config: {
        systemInstruction,
        temperature: 0.9,
      }
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The pages refuse to absorb your ink... (Error)";
  }
};

export const generateMagicalStory = async (
  prompt: string,
  house: House
): Promise<string> => {
  if (!apiKey) return "The quill is dry. (API Key missing)";

  try {
    const systemInstruction = `
      You are a master storyteller in the Harry Potter universe.
      Write a short, immersive story (approx 300 words) based on the user's prompt.
      The tone should be whimsical, mysterious, and magical.
      Use Markdown formatting for emphasis.
      Tailor the tone slightly to the user's house: ${house} (e.g., brave for Gryffindor, ambitious for Slytherin).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 1.0,
      }
    });

    return response.text || "A story could not be divined.";
  } catch (error) {
    console.error("Gemini Story Error:", error);
    return "The Divination crystal is cloudy... (Error)";
  }
};
