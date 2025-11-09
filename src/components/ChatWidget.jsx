import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { getBotResponse } from '../utils/chatResponses';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 1,
        text: 'Hello! I\'m your FDA compliance assistant. I can help you with 510(k) submissions, biocompatibility requirements, substantial equivalence, and more. What would you like to know?',
        sender: 'bot'
      }]);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse,
        sender: 'bot'
      }]);
      setIsLoading(false);
    }, 1000);
  };

  const quickQuestions = [
    'What are the main 510(k) sections?',
    'What is substantial equivalence?',
    'Why do submissions get rejected?',
    'Biocompatibility requirements'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-lg transition-all ${
          isOpen
            ? 'bg-gradient-to-r from-purple-700 to-purple-900'
            : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white mx-auto" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white mx-auto" />
        )}
      </button>

      {/* Chat Container */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animation">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-5 flex justify-between items-center">
            <h5 className="font-bold text-lg">FDA Compliance Assistant</h5>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-purple-700 rounded-full p-1 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p dangerouslySetInnerHTML={{ __html: msg.text }} />
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions - Show only on first message */}
          {messages.length === 1 && (
            <div className="px-4 py-3 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2 font-semibold">Quick Questions:</p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(q);
                      // Auto send after slight delay
                      setTimeout(() => {
                        setInput(q);
                        // Trigger send
                        const userMsg = { id: messages.length + 1, text: q, sender: 'user' };
                        setMessages(prev => [...prev, userMsg]);
                        setInput('');
                        setIsLoading(true);
                        setTimeout(() => {
                          const botResp = getBotResponse(q);
                          setMessages(prev => [...prev, {
                            id: prev.length + 1,
                            text: botResp,
                            sender: 'bot'
                          }]);
                          setIsLoading(false);
                        }, 1000);
                      }, 100);
                    }}
                    className="w-full text-left text-xs bg-gray-100 hover:bg-gray-200 p-2 rounded transition text-gray-700"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a question..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-purple-600"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full p-2 hover:scale-110 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
