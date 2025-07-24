import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, MicOff, Phone, PhoneOff, BotIcon, User } from 'lucide-react';

const VapiWidget = ({ apiKey, assistantId }) => {
  const [vapi, setVapi] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => {
      setIsConnected(true);
    });

    vapiInstance.on('call-end', () => {
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapiInstance.on('speech-start', () => {
      setIsSpeaking(true);
    });

    vapiInstance.on('speech-end', () => {
      setIsSpeaking(false);
    });

    vapiInstance.on('message', (message) => {
      if (message.type === 'transcript') {
        setTranscript((prev) => [
          ...prev,
          { role: message.role, text: message.transcript },
        ]);
      }
    });

    vapiInstance.on('error', (error) => {
      console.error('Vapi error:', error);
    });

    return () => {
      vapiInstance.stop();
    };
  }, [apiKey]);

  const startCall = () => {
    vapi?.start(assistantId);
  };

  const endCall = () => {
    vapi?.stop();
  };

  if (!isConnected) {
    // Not connected state - show start button centered in the available space
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="relative group">
            <button
              onClick={startCall}
              className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3"
            >
              <div className="relative">
                <Mic className="w-6 h-6 animate-pulse" />
                <div className="absolute -inset-2 bg-white/20 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-lg">Start Voice Chat</span>
              <div className="flex items-center gap-1 ml-2">
                <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1 h-4 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-1 h-5 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
              </div>
            </button>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
          </div>
          <p className="mt-6 text-gray-400 text-sm max-w-sm">
            Click to start a voice conversation with our AI assistant
          </p>
        </div>
      </div>
    );
  }

  // Connected state - show chat interface that matches the text chat layout
  return (
    <>
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 pt-20 space-y-6 scroll-smooth">
        {transcript.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-full flex items-center justify-center">
                {isSpeaking ? (
                  <MicOff className="w-8 h-8 text-emerald-400" />
                ) : (
                  <Mic className="w-8 h-8 text-emerald-400 animate-pulse" />
                )}
              </div>
              <p className="text-gray-400 text-sm">
                Your voice conversation will appear here...
              </p>
            </div>
          </div>
        ) : (
          transcript.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[85%] ${
                msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-green-700 to-blue-700' 
                    : 'bg-gradient-to-br from-emerald-500 to-emerald-700'
                }`}>
                  {msg.role === 'user' ? (
                    <User className="w-5 h-5 text-gray-300" />
                  ) : (
                    <BotIcon className="w-5 h-5 text-black" />
                  )}
                </div>
                <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed bg-white/10 backdrop-blur-sm border border-white/10 text-white">
                  {msg.text}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom controls area */}
      <div className="bg-black/30 backdrop-blur-sm p-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          {/* Voice status indicator */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-3 h-3 rounded-full ${
                isSpeaking 
                  ? 'bg-red-500 shadow-red-500/50' 
                  : 'bg-emerald-500 shadow-emerald-500/50'
              } shadow-lg ${isSpeaking ? 'animate-pulse' : ''}`}></div>
              {isSpeaking && (
                <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isSpeaking ? (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-6 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-4 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-8 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-2 h-6 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-4 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-6 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
                </div>
              )}
              <span className="text-gray-400 text-xs ml-2">
                {isSpeaking ? 'AI is responding...' : 'Speak now...'}
              </span>
            </div>
          </div>

          {/* End call button */}
          <button
            onClick={endCall}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-md shadow-red-600/30"
          >
            <PhoneOff className="w-4 h-4" />
            <span className="text-sm">End Call</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default VapiWidget;