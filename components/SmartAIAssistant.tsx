'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, ShoppingBag, Check, Mic, MicOff, Volume2, VolumeX, GitBranch, ArrowUpRight, Scale, Zap } from 'lucide-react';
import { Product } from '@/lib/types';
import { processAIChatQuery } from '@/lib/aiAssistant';
import { useCart } from '@/context/CartContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  products?: Product[];
  comparisonProducts?: Product[];
  actionHint?: string;
  promoCode?: string;
  timestamp: string;
}

export function SmartAIAssistant() {
  const { cart, addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_1',
      sender: 'ai',
      text: '👋 **Namaste & Welcome to Aura Smart AI 2.0!**\n\nI am your intelligent AI shopping concierge. Ask me in **English or Hinglish**:\n• *"Sasta 5G mobile dikhao"*\n• *"Compare M3 Laptop vs 4K TV"*\n• *"What is in my cart?"*\n• *"Discount coupon code"*\n\n⭐ *Connected to GitHub: Snehusoni/e-commerce-app*',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Speech Recognition Setup
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser. Please type your query.');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        handleSend(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Text to Speech
  const speakText = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#•]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

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
      const aiResult = await processAIChatQuery(textToSend, cart);
      setTimeout(() => {
        const aiMsg: Message = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: aiResult.message,
          products: aiResult.recommendedProducts,
          comparisonProducts: aiResult.comparisonProducts,
          actionHint: aiResult.suggestedAction,
          promoCode: aiResult.promoCode,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        speakText(aiResult.message);
      }, 600);
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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const quickPrompts = [
    '🔥 Sasta Phone',
    '📱 Top 5G Mobiles',
    '⚡ Laptop vs TV',
    '🛒 View My Cart',
    '🏷️ 25% Discount Code',
    '📦 Track Order',
    '🛡️ Warranty Policy',
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      
      {/* Floating Smart Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 bg-gradient-to-r from-brand-600 via-accent-purple to-accent-pink text-white rounded-full shadow-glow hover:scale-105 transition-all duration-300 flex items-center gap-3 px-5 border border-white/20"
        >
          <div className="relative">
            <Bot className="w-6 h-6 animate-pulse text-amber-300" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-dark-bg animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-dark-bg"></span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1">
              Aura AI Smart 2.0 <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </span>
            <span className="text-[10px] text-gray-200">Hinglish • Voice • Compare</span>
          </div>
        </button>
      )}

      {/* AI Chat Window Container */}
      {isOpen && (
        <div className="w-[370px] sm:w-[420px] h-[550px] bg-dark-card/95 border border-brand-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-slide-up">
          
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-brand-950 via-dark-surface to-accent-purple/30 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-brand-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-white flex items-center gap-1">
                  Aura AI Concierge <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                </h3>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active NLP & Voice Engine
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* GitHub Link Icon */}
              <a
                href="https://github.com/Snehusoni/e-commerce-app"
                target="_blank"
                rel="noreferrer"
                title="View GitHub Repository"
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1 text-[10px]"
              >
                <GitBranch className="w-3.5 h-3.5 text-brand-400" />
              </a>

              {/* Text-to-Speech Toggle */}
              <button
                onClick={() => {
                  setSpeechEnabled(!speechEnabled);
                  if (speechEnabled) window.speechSynthesis?.cancel();
                }}
                className={`p-1.5 rounded-lg transition-colors text-[10px] ${
                  speechEnabled ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-gray-800'
                }`}
                title={speechEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
              >
                {speechEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hinglish & Quick Prompts Pill Bar */}
          <div className="px-3 py-2 bg-dark-surface/60 border-b border-gray-800 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-3 py-1 bg-gray-800/80 hover:bg-brand-600/40 hover:border-brand-500 text-gray-300 text-[11px] font-medium rounded-full border border-gray-700/60 transition-all flex-shrink-0"
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
                  className={`max-w-[90%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-br-none shadow-md'
                      : 'bg-dark-surface border border-gray-800 text-gray-200 rounded-bl-none'
                  }`}
                >
                  {/* Formatted Text rendering */}
                  <div className="whitespace-pre-line font-sans">
                    {msg.text}
                  </div>

                  {/* Promo Code Copy Banner */}
                  {msg.promoCode && (
                    <div className="mt-3 p-2.5 rounded-xl bg-brand-950/80 border border-brand-500/50 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] text-gray-400 font-medium">PROMO CODE</div>
                        <div className="text-sm font-black text-amber-300 tracking-wider font-mono">{msg.promoCode}</div>
                      </div>
                      <button
                        onClick={() => handleCopyCode(msg.promoCode!)}
                        className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-glow"
                      >
                        {copiedCode === msg.promoCode ? <Check className="w-3 h-3 text-emerald-300" /> : <Zap className="w-3 h-3" />}
                        {copiedCode === msg.promoCode ? 'Copied!' : 'Copy & Apply'}
                      </button>
                    </div>
                  )}

                  {/* Product Comparison View */}
                  {msg.comparisonProducts && msg.comparisonProducts.length >= 2 && (
                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gray-800 pt-3">
                      {msg.comparisonProducts.map((p) => (
                        <div key={p._id} className="p-2 bg-dark-card border border-gray-800 rounded-xl flex flex-col justify-between">
                          <img src={p.image} alt={p.name} className="w-full h-16 object-cover rounded-lg mb-1" />
                          <div className="text-[11px] font-bold text-white truncate">{p.name}</div>
                          <div className="text-[10px] text-brand-400 font-extrabold">${p.price.toFixed(2)}</div>
                          <div className="text-[9px] text-emerald-400 font-medium mt-1">⭐ {p.rating} Rating</div>
                          <button
                            onClick={() => handleAddToCart(p)}
                            className="mt-2 w-full py-1 bg-brand-600 text-white rounded text-[10px] font-bold"
                          >
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Standard Recommended Product Cards */}
                  {msg.products && msg.products.length > 0 && !msg.comparisonProducts && (
                    <div className="mt-3 space-y-2">
                      {msg.products.map((prod) => (
                        <div
                          key={prod._id}
                          className="flex items-center gap-3 p-2 rounded-xl bg-dark-card border border-gray-800 hover:border-brand-500/50 transition-colors"
                        >
                          <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-lg object-cover bg-gray-800 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[11px] font-bold text-white truncate">{prod.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-brand-400 font-extrabold">${prod.price.toFixed(2)}</span>
                              {prod.originalPrice && (
                                <span className="text-[9px] text-gray-500 line-through">${prod.originalPrice}</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleAddToCart(prod)}
                            className={`p-2 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
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
                    <p className="mt-2.5 text-[10px] text-gray-400 italic border-t border-gray-800 pt-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      {msg.actionHint}
                    </p>
                  )}
                </div>
                <span className="text-[9px] text-gray-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {/* Listening / Voice Wave UI */}
            {isListening && (
              <div className="flex items-center gap-2 p-3 bg-brand-950/60 border border-brand-500/50 rounded-2xl text-xs text-brand-300 animate-pulse">
                <Mic className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>Listening to your voice... Speak now!</span>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-3 bg-dark-surface rounded-2xl rounded-bl-none text-xs text-gray-400 w-32 border border-gray-800">
                <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-spin" />
                <span>Analyzing NLP...</span>
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
            {/* Mic Voice Input Button */}
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-2.5 rounded-xl border transition-colors ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-500 animate-ping'
                  : 'bg-dark-card border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
              title="Voice Input (Speak to AI)"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask in English/Hinglish (e.g. Sasta mobile...)"
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
