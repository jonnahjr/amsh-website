'use client';

import { useState, useRef, useEffect } from 'react';
import { chatbotAPI } from '@/lib/api';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const WELCOME_MSG = "👋 Hello! I'm the AMSH Hospital AI Assistant. I can help you with information about our services, departments, appointments, CPD programs, research, and more. How can I assist you today?";

export default function ChatbotButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: WELCOME_MSG, timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    useEffect(scrollToBottom, [messages]);

    const quickReplies = [
        '🏥 Services offered', '📞 Contact info',
        '📚 CPD courses', '🚨 Emergency care', '🔬 Research',
    ];

    const sendMessage = async (text?: string) => {
        const userMessage = text || input.trim();
        if (!userMessage || loading) return;

        const newUserMsg: Message = { role: 'user', content: userMessage, timestamp: new Date() };
        setMessages(prev => [...prev, newUserMsg]);
        setInput('');
        setLoading(true);

        try {
            const history = messages.slice(-10).map(m => ({ role: m.role, content: m.content }));
            const res = await chatbotAPI.sendMessage(userMessage, history);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: res.data.reply,
                timestamp: new Date()
            }]);
        } catch {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I apologize for the inconvenience. Please call us directly at **+251-111-868-53-85** or **991** for emergencies.",
                timestamp: new Date()
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-blue-900 hover:bg-blue-800 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Open AI Assistant"
            >
                {isOpen ? '✕' : '🤖'}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade-in-up"
                    style={{ height: '520px' }}>

                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
                        <div className="flex-1">
                            <div className="font-bold text-white text-sm">AMSH AI Assistant</div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-400" />
                                <span className="text-blue-200 text-xs">Online • Powered by AI</span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'assistant' && (
                                    <div className="w-7 h-7 rounded-full bg-blue-900 flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0">🤖</div>
                                )}
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === 'user'
                                    ? 'bg-blue-900 text-white rounded-tr-sm'
                                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="w-7 h-7 rounded-full bg-blue-900 flex items-center justify-center text-sm mr-2">🤖</div>
                                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map(i => (
                                            <span key={i} className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
                                                style={{ animationDelay: `${i * 0.15}s` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    <div className="px-3 py-2 border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-none">
                        {quickReplies.map((reply) => (
                            <button
                                key={reply}
                                onClick={() => sendMessage(reply)}
                                className="flex-shrink-0 text-xs bg-blue-50 text-blue-900 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors border border-blue-100 font-medium"
                            >
                                {reply}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Ask me anything..."
                            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-800"
                        />
                        <button
                            onClick={() => sendMessage()}
                            disabled={!input.trim() || loading}
                            className="w-10 h-10 bg-blue-900 hover:bg-blue-800 text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-40"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
