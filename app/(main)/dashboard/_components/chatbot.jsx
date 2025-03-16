"use client";
import { useState } from "react";

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;
        setLoading(true);

        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await fetch("/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();

            if (data.reply) {
                setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
            }
        } catch (error) {
            console.error("Chatbot error:", error);
        }

        setInput("");
        setLoading(false);
    };

    return (
        <div className="flex flex-col max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white">
            <div className="h-64 overflow-y-auto mb-2 border p-2 rounded-lg">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 my-1 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                />
                <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded-lg" disabled={loading}>
                    {loading ? "Thinking..." : "Send"}
                </button>
            </div>
        </div>
    );
}
