/*
  FASTAPI BACKEND REFERENCE (/api/chat)
  =====================================
  from fastapi import FastAPI, Request
  from fastapi.middleware.cors import CORSMiddleware
  import httpx
  import os

  app = FastAPI()
  app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_headers=["*"], allow_methods=["*"])

  @app.post("/api/chat")
  async def anthropic_proxy(request: Request):
      payload = await request.json()
      async with httpx.AsyncClient() as client:
          response = await client.post(
              "https://api.anthropic.com/v1/messages",
              headers={
                  "x-api-key": os.getenv("ANTHROPIC_API_KEY"),
                  "anthropic-version": "2023-06-01",
                  "content-type": "application/json"
              },
              json=payload,
              timeout=30.0
          )
      return response.json()
*/

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import FloatingObject from '../components/ui/FloatingObject';
import MagneticButton from '../components/ui/MagneticButton';

export default function AiChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm the REVA Student Council AI. How can I help you regarding campus events, clubs, or navigating university life today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // In production, point to your FastAPI backend: '/api/chat'
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 500,
          system: "You are the REVA Student Council AI. Help students with events, clubs, complaints, council info, campus life. Be friendly, concise. If asked about specific events or clubs, mention names from REVA RSC (like REVAMP, TechSprint, Devbraze, Dopamine, etc).",
          messages: messages.concat(userMessage).filter(m => m.role !== 'system').map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        // Fallback for demo without backend
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "Oops! My backend connection is currently asleep. But as the RSC AI, I'd normally tell you all about REVAMP happening soon or how to join the Devbraze club!" 
          }]);
          setIsLoading(false);
        }, 1500);
        return;
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content[0].text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Network error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "What events are coming?",
    "Tell me about Tech clubs",
    "How to raise a complaint?",
    "Who is in the council?"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="max-h-screen h-screen pt-20 flex flex-col md:flex-row overflow-hidden"
    >
      {/* Sidebar */}
      <div className="w-full md:w-80 bg-[#0B0F1A] border-r border-white/5 p-6 flex flex-col pt-10">
        <FloatingObject floatY={10} duration={3} className="text-4xl text-center mb-6">
          <Sparkles className="text-[#FFD700] mx-auto w-12 h-12" />
        </FloatingObject>
        <h2 className="font-outfit font-black text-2xl text-white text-center mb-2">RSC AI Assistant</h2>
        <p className="text-white/40 text-center text-sm mb-10 leading-relaxed border-b border-white/5 pb-10">
          Powered by Claude Sonnet. Ask anything about navigating REVA University.
        </p>

        <div className="space-y-3 mt-auto hidden md:block">
          <div className="text-white/30 text-xs font-bold uppercase tracking-widest pl-2 mb-4">Suggested Topics</div>
          {suggestions.map(s => (
            <button 
              key={s} 
              onClick={() => { setInput(s); handleSend(); }}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-sm transition-colors"
            >
              • {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#111827] relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col space-y-6 max-w-4xl mx-auto w-full">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'glass-card border-[#D62828]/30 bg-[#D62828]/10 text-white'}`}>
                  {m.role === 'user' ? <User size={18} /> : <img src="/RevaStudentCouncil.png" alt="RSC" className="w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-gradient-to-br from-[#D62828] to-[#991515] text-white rounded-tr-sm' : 'glass-card text-white/90 rounded-tl-sm'}`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full glass-card border-[#D62828]/30 bg-[#D62828]/10 flex items-center justify-center text-white">
                <img src="/RevaStudentCouncil.png" alt="RSC" className="w-5 h-5 opacity-50" />
              </div>
              <div className="glass-card p-4 rounded-2xl rounded-tl-sm w-20 flex items-center justify-center gap-1">
                <motion.div className="w-2 h-2 bg-white/40 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                <motion.div className="w-2 h-2 bg-white/40 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                <motion.div className="w-2 h-2 bg-white/40 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 md:p-6 bg-[#0B0F1A] border-t border-white/5 relative z-10 w-full">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-4">
            <input 
              type="text" 
              value={input} 
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about clubs, events, or council matters..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#D62828] transition-colors"
            />
            <MagneticButton type="submit" className="btn-primary w-14 h-14 !p-0 rounded-2xl flex-shrink-0" disabled={!input.trim() || isLoading}>
              <Send size={20} className={isLoading ? 'opacity-50' : ''} />
            </MagneticButton>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
