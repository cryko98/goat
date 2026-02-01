import { GoogleGenAI } from "@google/genai";
import { MemeStyle } from "../types";
import { SED_LOGO_URL } from "../constants";

// Az API kulcsot a vite.config.ts injektálja be a build folyamat során.
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
  const logoBase64 = await imageUrlToBase64(SED_LOGO_URL);
  
  let styleInstruction = "";
  if (style === 'realistic') styleInstruction = "Photorealistic, high-detail cinematic shot.";
  if (style === 'cartoon') styleInstruction = "Vibrant 2D cartoon illustration, thick lines.";
  if (style === 'gta') styleInstruction = "Grand Theft Auto V art style, cell shaded, iconic loading screen look.";

  const finalPrompt = `
    Using the attached image as the reference for the character, create a new image for this scene: ${prompt}.
    The character from the logo must be the main subject. 
    The character should look unimpressed, smug, and superior. 
    ${styleInstruction}
  `;

  // Fontos: A képgeneráláshoz a gemini-2.5-flash-image modellt kell használni!
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
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
  // Végigmegyünk a válasz részein, hogy megtaláljuk az inlineData-t (képet)
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
  }

  if (!imageUrl) {
    console.error("No image data in response:", response);
    throw new Error("The character refused to be drawn. (No image part in response)");
  }
  
  return imageUrl;
}

export const RANDOM_PROMPTS = [
  "Smoking Eagle Dog watching dogecoin charts and laughing",
  "Smoking Eagle Dog sitting on a throne of golden hay looking bored",
  "Smoking Eagle Dog as a wall street trader with multiple monitors",
  "Smoking Eagle Dog in a spacesuit floating near the moon",
  "Smoking Eagle Dog at a high-stakes poker table with sunglasses",
  "Smoking Eagle Dog as a rockstar on stage with a guitar",
  "Smoking Eagle Dog in a tuxedo on a private jet",
  "Smoking Eagle Dog coding at a laptop with 'Solana' stickers"
];