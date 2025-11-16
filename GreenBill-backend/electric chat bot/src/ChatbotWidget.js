import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import geminiService from './services/geminiService';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hi! I\'m your electricity bill assistant. I can help you understand why your bill might be high and suggest ways to reduce it. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Check API status on component mount
  useEffect(() => {
    const status = geminiService.getApiKeyStatus();
    setApiStatus(status);
  }, []);

  const generateBotResponse = async (userMessage) => {
    try {
      const response = await geminiService.generateResponse(userMessage);
      return {
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error generating response:', error);
      return {
        type: 'bot',
        content: `I apologize, but I'm having trouble processing your request right now. Please try again in a moment. If the problem persists, you can ask me about:

• High electricity bills and how to reduce them
• Energy-saving tips for your home
• Appliance optimization advice
• Smart home solutions
• Solar panel information
• LED lighting benefits

I'm here to help with any electricity-related questions!`,
        timestamp: new Date()
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Add a small delay to show typing indicator
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const botResponse = await generateBotResponse(currentInput);
      setMessages(prev => [...prev, { ...botResponse, id: Date.now() + 1 }]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-electric-blue text-white rounded-full shadow-lg floating-button transition-all duration-300 hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        }`}
        aria-label="Open electricity bill chatbot"
      >
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      </button>

      {/* Chatbot Widget */}
      <div
        className={`fixed bottom-6 right-6 z-50 chatbot-widget ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 h-96 sm:h-[500px] flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-electric-blue to-energy-green text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Electricity Assistant</h3>
                <p className="text-xs opacity-90">
                  {apiStatus?.configured ? 'AI Powered' : 'Basic Mode'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleChatbot}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chatbot"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto chat-scroll p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-electric-blue text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="text-sm whitespace-pre-line">{message.content}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your electricity bill..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-electric-blue text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotWidget;
