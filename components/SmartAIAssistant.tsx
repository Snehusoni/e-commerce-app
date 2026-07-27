'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { Product } from '@/lib/types';
import { processAIChatQuery } from '@/lib/aiAssistant';
import { useCart } from '@/context/CartContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  products?: Product[];
  actionHint?: string;
  timestamp: string;
}

export function SmartAIAssistant() {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_1',
      sender: 'ai',
      text: '👋 Hi! I am Aura AI, your smart shopping assistant. What are you looking for today? You can ask me for product advice or budget recommendations!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsTyping(true);

    try {
      // Simulate smart AI processing latency
      const aiResult = await processAIChatQuery(textToSend);
      setTimeout(() => {
        const aiMsg: Message = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: aiResult.message,
          products: aiResult.recommendedProducts,
          actionHint: aiResult.suggestedAction,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      }, 700);
    } catch (e) {
      setIsTyping(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product._id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product._id]: false }));
    }, 2000);
  };

  const quickPrompts = [
    '📱 Top 5G Mobiles',
    '💻 Pro M3 Laptops',
    '📺 4K OLED Smart TVs',
    '❄️ Smart French Fridges',
    '💨 5-Star Split ACs',
    '🏷️ Discount Promo Code',
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 bg-gradient-to-r from-brand-600 via-accent-purple to-accent-pink text-white rounded-full shadow-glow hover:scale-105 transition-all duration-300 flex items-center gap-3 px-5 border border-white/20"
        >
          <div className="relative">
            <Bot className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-dark-bg"></span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1">
              Aura AI <Sparkles className="w-3 h-3 text-amber-300" />
            </span>
            <span className="text-[10px] text-gray-200">Smart Shopping Concierge</span>
          </div>
        </button>
      )}

      {/* AI Chat Window Container */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-dark-card border border-brand-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-slide-up">
          
          {/* Chat Window Header */}
          <div className="p-4 bg-gradient-to-r from-brand-950 via-dark-surface to-accent-purple/20 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-brand-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1">
                  Aura AI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Active & Ready to Help
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Horizontal Bar */}
          <div className="px-3 py-2 bg-dark-surface/40 border-b border-gray-800/60 overflow-x-auto flex gap-2 no-scrollbar">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-3 py-1 bg-gray-800 hover:bg-brand-600/30 hover:border-brand-500 text-gray-300 text-[11px] font-medium rounded-full border border-gray-700 transition-all flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-br-none shadow-md'
                      : 'bg-dark-surface border border-gray-800 text-gray-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Render Recommended Product Cards inside AI response */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.products.map((prod) => (
                        <div
                          key={prod._id}
                          className="flex items-center gap-3 p-2 rounded-xl bg-dark-card border border-gray-800 hover:border-brand-500/50 transition-colors"
                        >
                          <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-lg object-cover bg-gray-800" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[11px] font-bold text-white truncate">{prod.name}</h4>
                            <div className="text-[10px] text-brand-400 font-extrabold">${prod.price.toFixed(2)}</div>
                          </div>
                          <button
                            onClick={() => handleAddToCart(prod)}
                            className={`p-2 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
                              addedIds[prod._id]
                                ? 'bg-emerald-600 text-white'
                                : 'bg-brand-600 hover:bg-brand-500 text-white'
                            }`}
                          >
                            {addedIds[prod._id] ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.actionHint && (
                    <p className="mt-2 text-[10px] text-gray-400 italic border-t border-gray-700/50 pt-1">
                      {msg.actionHint}
                    </p>
                  )}
                </div>
                <span className="text-[9px] text-gray-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 bg-dark-surface rounded-2xl rounded-bl-none text-xs text-gray-400 w-28 border border-gray-800">
                <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-spin" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-gray-800 bg-dark-bg flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Aura AI for recommendations..."
              className="flex-1 bg-dark-card border border-gray-800 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl disabled:opacity-40 transition-colors shadow-glow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
