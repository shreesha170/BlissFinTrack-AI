import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listAvailableModels() {
  try {
    const response = await genAI.listModels();
    console.log("Available Models:", response);
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listAvailableModels();
