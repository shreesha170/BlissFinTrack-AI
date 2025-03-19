import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { initialMessage } from "@/lib/data";

const openai = createOpenAI({
    model: "gpt-4-turbo", // Choose the latest supported model
    apiKey: process.env.OPENAI_API_KEY || "", // Use OpenAI API Key
});

export const runtime = "edge"; // Use Edge runtime for fast responses

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).slice(2, 15);

// Build the prompt for OpenAI
const buildOpenAIPrompt = (messages = []) => [
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

        // Stream the response from OpenAI
        const stream = await streamText({
            model: openai("gpt-4-turbo"),
            messages: buildOpenAIPrompt(messages),
            temperature: 0.7,
        });

        // Return the stream as a response
        return new Response(stream.toAIStream(), {
            headers: { "Content-Type": "text/plain" }, // Use text/plain for streaming
        });

    } catch (error) {
        console.error("Error in POST handler:", error); // Log errors for debugging
        return new Response(JSON.stringify({ error: error.message || "Failed to process request" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
