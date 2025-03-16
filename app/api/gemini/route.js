import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/lib/data";

const google = createGoogleGenerativeAI({
    model: "gemini-1.5-pro", // Use latest supported model
    apiVersion: "v1", // Ensure correct API version
    apiKey: process.env.GOOGLE_API_KEY || "",
});


export const runtime = "edge"; // Use Edge runtime

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).slice(2, 15);

// Build the prompt for Google Generative AI
const buildGoogleGenAIPrompt = (messages = []) => [
    {
        id: generateId(),
        role: "user",
        content: initialMessage.content,
    },
    ...messages.map((message) => ({
        id: message.id || generateId(),
        role: message.role,
        content: message.content,
    })),
];

// POST handler for the API route
export async function POST(request) {
    try {
        const { messages } = await request.json();

        // Stream the response from Google Generative AI
        const stream = await streamText({
            model: google("gemini-1.5-pro"),
            messages: buildGoogleGenAIPrompt(messages),
            temperature: 0.7,
        });

        // Return the stream as a response
        return new Response(stream.toAIStream(), {
            headers: { "Content-Type": "text/plain" }, // Use text/plain for streaming
        });

    } catch (error) {
        console.error("Error in POST handler:", error); // Log the error for debugging
        return new Response(JSON.stringify({ error: error.message || "Failed to process request" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}