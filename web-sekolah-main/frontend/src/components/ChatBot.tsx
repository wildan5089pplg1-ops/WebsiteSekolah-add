'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Configuration (matching chat-widget.js)
  const cfg = {
    proxyUrl: process.env.NEXT_PUBLIC_CHATBOT_API_URL || "", // Replace with actual proxy URL if needed
    schoolName: "SMK PRESTASI PRIMA",
    accentColor: "#f97316", // Using Tailwind's orange-500
    greeting: "SAYA PRESMA",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: cfg.greeting }]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text) return;

    setInputValue('');
    const newMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      if (!cfg.proxyUrl) {
        // Mock response if no proxyUrl is configured
        setTimeout(() => {
          setMessages((prev) => [...prev, { role: 'assistant', content: "Maaf, sistem AI sedang dalam pengembangan. Proxy URL belum dikonfigurasi." }]);
          setIsTyping(false);
        }, 1000);
        return;
      }

      const res = await fetch(cfg.proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setMessages((prev) => [...prev, { role: 'assistant', content: "Maaf terjadi sebuah kesalahan,Tolong coba lagi nanti" }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || "Sorry, I didn't catch that." }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: "Maaf terjadi sebuah kesalahan,Tolong periksa koneksi internet anda" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat Bot Launcher */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-5 bottom-5 z-[999999] w-[58px] h-[58px] bg-orange-500 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.2)] flex items-center justify-center hover:scale-110 transition-transform duration-150 border-none outline-none"
        aria-label="Open chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122 107" width="26" height="26">
          <path d="M15.67 0.06C20.78 0.06 25.89 0.06 31 0.06C37.17 9.37 43.33 18.69 49.5 28C57.26 26.45 64.75 26.45 72.5 28C78.67 18.69 84.83 9.37 91 0.06C96.11 0.06 101.22 0.06 106.33 0.06C98.67 10.54 91 21.02 83.33 31.5C84.78 32.68 86.74 33.27 88.32 34.18C91.25 35.86 93.93 38.19 96.66 40.18C104.56 45.95 113.28 60 115.94 69.23C117.83 75.77 119.65 82.2 120.94 88.9C121.22 90.37 120.53 94.7 121.94 95.33C121.94 99.19 121.93 103.06 121.92 106.92C81.31 106.92 40.69 106.92 0.08 106.92C0.07 103.06 0.06 99.19 0.06 95.33C1.41 94.73 0.78 90.35 1.06 88.9C2.4 81.94 3.86 74.89 6.4 68.23C10.15 58.37 16.55 46.6 25.34 40.18C27.53 38.59 29.67 36.52 32.01 35.18C34.09 33.98 36.77 33.04 38.67 31.5C31 21.02 23.33 10.54 15.67 0.06ZM31.04 61C31.02 65.94 31.01 70.89 31 75.83C35.83 75.89 40.67 75.94 45.5 76C45.87 74.17 45.93 61.61 45.01 61.06C40.35 61.04 35.69 61.02 31.04 61ZM76.99 61.06C76.07 61.61 76.13 74.17 76.5 76C81.28 76 86.06 76 90.83 76C90.88 71 90.92 66 90.96 61C86.31 61.02 81.65 61.04 76.99 61.06Z" fill="#ffffff" fillRule="evenodd" stroke="#ffffff" strokeWidth="0.25" strokeLinejoin="round"/>
          <path d="M45.01 61.06C40.35 61.04 35.69 61.02 31.04 61C35.69 61.02 40.35 61.04 45.01 61.06ZM90.96 61C86.31 61.02 81.65 61.04 76.99 61.06C81.65 61.04 86.31 61.02 90.96 61Z" fill="#c7c7c7" fillRule="evenodd" stroke="#c7c7c7" strokeWidth="0.25" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed right-5 bottom-[90px] z-[999999] w-[340px] max-w-[calc(100vw-40px)] h-[460px] max-h-[calc(100vh-140px)] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.22)] flex flex-col font-sans animate-in slide-in-from-bottom-4 fade-in duration-200">
          
          {/* Header */}
          <div className="bg-orange-500 text-white px-4 py-3.5 font-semibold text-[15px] flex items-center justify-between">
            <span>{cfg.schoolName}</span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white text-xl leading-none opacity-85 hover:opacity-100 transition-opacity outline-none"
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 bg-[#f7f8fa] dark:bg-slate-950 flex flex-col gap-2.5">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`max-w-[82%] px-3 py-2.5 rounded-xl text-[14px] leading-[1.4] whitespace-pre-wrap shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-orange-500 text-white self-end rounded-br-sm' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-[#e6e8eb] dark:border-slate-700 self-start rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
            ))}
            
            {isTyping && (
              <div className="max-w-[82%] px-3 py-2.5 rounded-xl text-[14px] leading-[1.4] bg-white dark:bg-slate-800 text-slate-500 italic border border-[#e6e8eb] dark:border-slate-700 self-start rounded-bl-sm shadow-sm">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Row */}
          <div className="flex gap-2 p-2.5 border-t border-[#e6e8eb] dark:border-slate-800 bg-white dark:bg-slate-900">
            <input 
              type="text" 
              placeholder="Ketik pertanyaan..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isTyping) handleSendMessage();
              }}
              disabled={isTyping}
              className="flex-1 border border-[#d7dade] dark:border-slate-700 bg-white dark:bg-slate-800 rounded-full px-3.5 py-2 text-[14px] outline-none focus:border-orange-500 dark:focus:border-orange-500 dark:text-white transition-colors"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isTyping || !inputValue.trim()}
              className="bg-orange-500 text-white border-none rounded-full w-9 h-9 cursor-pointer flex items-center justify-center shrink-0 disabled:opacity-50 transition-opacity"
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13"/>
                <path d="M22 2 15 22l-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>

        </div>
      )}
    </>
  );
}
