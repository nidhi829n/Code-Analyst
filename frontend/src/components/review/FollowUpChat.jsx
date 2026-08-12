import { useState } from "react";
import apiClient from "../../services/apiClient";
import { API_URL } from "../../config/api";

function FollowUpChat({ code, language, review }) {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!question.trim()) return;

        const userMessage = {
            role: "user",
            content: question
        };
        
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setQuestion(""); 
        setLoading(true);

        try {
            const response = await apiClient.post(
                `${API_URL}/api/v1/chat`,
                {
                    code,
                    language,
                    review,
                    messages: updatedMessages,
                    question
                }
            );

            const aiMessage = {
                role: "assistant",
                content: response.data.data
            };

            setMessages([...updatedMessages, aiMessage]);

        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 bg-[#18181b] border border-zinc-800/80 rounded-xl p-6 text-zinc-100 shadow-2xl">
            {/* Header matching the style of the app */}
            <div className="flex items-center gap-2 mb-6 border-b border-zinc-800 pb-3">
                <span className="text-xl">💬</span>
                <h2 className="text-base font-medium tracking-wide text-zinc-200">AI Follow-up Chat</h2>
            </div>

            {/* Chat Messages Area */}
            <div className="space-y-4 mb-6 max-h-[450px] overflow-y-auto pr-1">
                {messages.length === 0 && (
                    <div className="text-center py-8 text-zinc-400 text-sm border border-dashed border-zinc-800 rounded-lg">
                        Ask a follow-up question about this review.
                    </div>
                )}

                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`p-4 rounded-xl max-w-[85%] whitespace-pre-wrap shadow-md antialiased ${
                                message.role === "user"
                                    ? "bg-blue-600 text-white text-base font-normal rounded-br-xs"
                                    : "bg-[#27272a] text-zinc-100 border border-zinc-700/60 text-base font-normal leading-relaxed rounded-bl-xs"
                            }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-[#27272a] border border-zinc-700/60 p-3 rounded-xl text-zinc-300 text-base font-normal animate-pulse flex items-center gap-2">
                            <span>🤖</span> AI is thinking...
                        </div>
                    </div>
                )}
            </div>

            {/* Input & Send Action Bar */}
            <div className="relative mt-2">
                <textarea
                    value={question}
                    disabled={loading}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder="Ask a follow-up question about this review... (Press Enter to send)"
                    className="w-full bg-[#121214] border border-zinc-800 rounded-xl p-4 pr-24 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none h-24 text-base font-normal transition-all shadow-inner"
                />

                <div className="absolute right-3 bottom-4">
                    <button
                        onClick={handleSend}
                        disabled={loading || !question.trim()}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg transition-all text-xs tracking-wide shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                        {loading ? "Sending..." : "Send ➔"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FollowUpChat;