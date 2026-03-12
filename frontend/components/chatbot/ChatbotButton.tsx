'use client';

import { useState, useRef, useEffect } from 'react';
import { chatbotAPI } from '@/lib/api';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const WELCOME_MSG = "Hello! I’m Emmanuel AI, your intelligent, real-time assistant. I can answer any question on health, education, lifestyle, technology, entertainment, and more. How can I help you today?";

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
        '🏛️ Hospital History', '🏥 Specialty Services', '📞 Emergency 991', '📋 Book Appointment',
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
                content: "I apologize, our digital system is experiencing high traffic. Please call us directly at **+251-111-868-53-85** or **991** for immediate support.",
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
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-blue-900 hover:bg-blue-800 text-white rounded-full shadow-[0_20px_50px_rgba(30,58,138,0.4)] flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
                aria-label="Open AI Assistant"
            >
                <div className="relative">
                    {isOpen ? '✕' : '🤖'}
                    {!isOpen && (
                        <span className="absolute -top-4 -right-4 bg-red-500 text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white animate-bounce">1</span>
                    )}
                </div>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.2)] border border-gray-100 flex flex-col overflow-hidden animate-fade-in-up"
                    style={{ height: '600px' }}>

                    {/* Header */}
                    <div className="bg-blue-900 p-6 flex items-center gap-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl shadow-inner border border-white/10">🤖</div>
                        <div className="flex-1">
                            <div className="font-black text-white text-base tracking-tight">EMSH AI Assistant</div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">Active • Ready to Assist</span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 no-scrollbar">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                <div className={`max-w-[85%] rounded-[1.5rem] px-5 py-3.5 text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-blue-900 text-white rounded-tr-none shadow-lg shadow-blue-900/20'
                                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none whitespace-pre-wrap'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start animate-pulse">
                                <div className="bg-white rounded-[1.5rem] rounded-tl-none px-5 py-4 shadow-sm border border-slate-100">
                                    <div className="flex gap-1.5">
                                        {[0, 1, 2].map(i => (
                                            <span key={i} className="w-2 h-2 bg-blue-200 rounded-full animate-bounce"
                                                style={{ animationDelay: `${i * 0.15}s` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    <div className="px-4 py-3 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar bg-white">
                        {quickReplies.map((reply) => (
                            <button
                                key={reply}
                                onClick={() => sendMessage(reply)}
                                className="flex-shrink-0 text-[11px] bg-slate-50 text-blue-900 px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-all border border-slate-200 font-black uppercase tracking-wider active:scale-95"
                            >
                                {reply}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-slate-100 bg-white flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your question..."
                            className="flex-1 px-5 py-3.5 bg-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 text-slate-800 placeholder:text-slate-400 font-medium"
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
