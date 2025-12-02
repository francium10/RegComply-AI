// src/components/ChatWidget.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User, Minimize2 } from 'lucide-react';
import { sendChatMessage } from '../services/api';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 1,
        text: "Hello! I'm your FDA compliance assistant. I can help you with 510(k) submissions, biocompatibility requirements, substantial equivalence, and more. What would you like to know?",
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await sendChatMessage(messageText);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    await sendMessage(input);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'What are the main 510(k) sections?',
    'What is substantial equivalence?',
    'Why do submissions get rejected?',
    'Biocompatibility requirements'
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={handleClose}
        />
      )}

      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        {/* Floating Action Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl transition-all duration-300 transform ${
            isOpen
              ? 'bg-gradient-to-r from-purple-700 to-indigo-800 rotate-0'
              : 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:scale-110 hover:shadow-purple-500/50'
          }`}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
            <X className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
          
          {/* Online indicator */}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
          )}
        </button>

        {/* Chat Container - FIXED MOBILE */}
        <div className={`transition-all duration-300 ease-out ${
          isOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        } ${
          isMinimized 
            ? 'absolute bottom-20 right-0 w-72 h-14' 
            : 'fixed md:absolute inset-0 md:inset-auto md:bottom-20 md:right-0 md:w-[420px] md:h-[600px] md:max-h-[80vh] bottom-0 left-0 right-0 top-0'
        } z-50`}>
          <div className={`bg-white shadow-2xl flex flex-col overflow-hidden h-full safe-area-bottom ${
            isMinimized ? 'rounded-xl' : 'md:rounded-2xl'
          }`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white p-4 md:p-5 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-purple-600 rounded-full" />
                </div>
                <div>
                  <h5 className="font-bold text-base md:text-lg">FDA Compliance Assistant</h5>
                  <p className="text-purple-200 text-xs">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hidden md:flex w-8 h-8 items-center justify-center hover:bg-white/20 rounded-lg transition"
                  aria-label="Minimize"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-4 space-y-4 scroll-smooth">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-end space-x-2 animate-fade-in ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                    >
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-br from-purple-500 to-indigo-600' 
                          : 'bg-gradient-to-br from-gray-100 to-gray-200'
                      }`}>
                        {msg.sender === 'user' 
                          ? <User className="w-4 h-4 text-white" />
                          : <Bot className="w-4 h-4 text-purple-600" />
                        }
                      </div>
                      
                      {/* Message bubble */}
                      <div className={`max-w-[75%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-md'
                              : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md'
                          }`}
                        >
                          <div 
                            className="whitespace-pre-wrap break-words" 
                            dangerouslySetInnerHTML={{ __html: msg.text }} 
                          />
                        </div>
                        <p className={`text-[10px] text-gray-400 mt-1 px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isLoading && (
                    <div className="flex items-end space-x-2 animate-fade-in">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex space-x-1.5">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length === 1 && (
                  <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-indigo-50 border-t border-purple-100">
                    <p className="text-xs font-semibold text-purple-700 mb-2 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Quick Questions</span>
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendMessage(q)}
                          className="text-left text-xs bg-white hover:bg-purple-100 p-2.5 rounded-xl transition-all duration-200 text-gray-700 border border-purple-100 hover:border-purple-300 hover:shadow-sm line-clamp-2"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-3 md:p-4 bg-white border-t border-gray-100 flex-shrink-0 safe-area-bottom">
                  <div className="flex items-center space-x-2 bg-gray-50 rounded-xl p-1.5">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask a question..."
                      className="flex-1 bg-transparent px-3 py-2.5 text-sm focus:outline-none placeholder-gray-400"
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isLoading || !input.trim()}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                        input.trim() && !isLoading
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:scale-105'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .safe-area-bottom {
          padding-bottom: max(1rem, env(safe-area-inset-bottom));
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}