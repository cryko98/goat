
import { GoogleGenAI } from "@google/genai";
import { MemeStyle } from "../types";
import { GOAT_LOGO_URL } from "../constants";

// Strictly follow the SDK initialization guidelines.
// process.env.API_KEY is bridged via vite.config.ts
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function imageUrlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generateGoatMeme(prompt: string, style: MemeStyle): Promise<string> {
  const logoBase64 = await imageUrlToBase64(GOAT_LOGO_URL);
  
  let styleInstruction = "";
  if (style === 'realistic') styleInstruction = "Ensure the image is photorealistic, cinematic, and gritty.";
  if (style === 'cartoon') styleInstruction = "Ensure the image is in a vibrant, high-quality 2D cartoon style with bold colors.";
  if (style === 'gta') styleInstruction = "Ensure the image is in the iconic Grand Theft Auto loading screen art style.";

  // Adding the "Unimpressed" personality instruction to the prompt
  const finalPrompt = `
    Using the provided image as the reference for the goat character, generate an image for: ${prompt}.
    The goat MUST look slightly unimpressed, bored, or smugly superior (Gork-style personality).
    ${styleInstruction}
    If the prompt mentions 'goat', always use the character from the reference image.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            data: logoBase64,
            mimeType: 'image/png'
          }
        },
        {
          text: finalPrompt
        }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  let imageUrl = "";
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  if (!imageUrl) throw new Error("The AI was too bored to generate an image. Try again.");
  return imageUrl;
}

export const RANDOM_PROMPTS = [
  "goat watching human charts and sighing",
  "goat sitting on a pile of gold looking bored",
  "goat as a billionaire who doesn't care about your portfolio",
  "goat reading the newspaper in a limousine",
  "goat at a fancy dinner party judging everyone's fashion",
  "goat wearing a tuxedo in a penthouse suite",
  "goat as the CEO of Earth, taking a nap",
  "goat surfing on a sea of dogecoins with a straight face"
];
