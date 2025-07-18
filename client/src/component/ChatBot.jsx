import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: input,
      isBot: false
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Sure, I’ll help you with that!",
          isBot: true
        }
      ]);
    }, 1000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 border-l border-gray-800">
      {/* Header */}
      <div className="bg-black border-b border-gray-800 p-3 flex items-center gap-3">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="text-green-400 font-medium text-sm">AI Assistant</h2>
          <p className="text-gray-500 text-xs">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[75%] ${
              message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                message.isBot ? 'bg-green-500' : 'bg-gray-600'
              }`}>
                {message.isBot ? (
                  <Bot className="w-3 h-3 text-black" />
                ) : (
                  <User className="w-3 h-3 text-white" />
                )}
              </div>
              <div className={`px-3 py-2 rounded-lg text-sm ${
                message.isBot 
                  ? 'bg-green-500 text-black' 
                  : 'bg-gray-700 text-white'
              }`}>
                {message.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-black border-t border-gray-800 p-3">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 px-3 py-2 rounded-md"
          >
            <Send className="w-4 h-4 text-black" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;

