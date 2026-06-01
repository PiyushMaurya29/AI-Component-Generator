import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const hasGeminiApiKey = Boolean(apiKey);

export const geminiClient = hasGeminiApiKey
  ? new GoogleGenAI({ apiKey })
  : null;
