import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, User, MessageSquareText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Chathead: React.FC = () => {
  const { chatMessages, sendChatMessage, currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isOpen]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendChatMessage(message);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] no-print">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-[450px] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#092B62] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/10 rounded-xl">
                <MessageSquareText className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-sm font-black">Adviser Community Chat</h3>
                <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Live Inside The Doors</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50"
          >
            {chatMessages.map((msg) => {
              const isMe = msg.senderEmail === currentUser.email;
              return (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    {!isMe && <span className="text-[9px] font-black text-[#092B62]">{msg.senderName}</span>}
                    <span className="text-[8px] text-stone-400 font-mono">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium shadow-sm ${
                    isMe 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              );
            })}
            {chatMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-40">
                <MessageCircle className="w-12 h-12 mb-2" />
                <p className="text-xs font-bold">No messages yet. Start a conversation with other advisers!</p>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-stone-100 flex items-center gap-2">
            <input 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-stone-100 border-none rounded-xl px-4 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-[#092B62] text-white rounded-xl hover:bg-blue-900 transition shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-[#092B62]'
        }`}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-7 h-7 text-white" />
            {/* Unread dot simulation */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>
          </div>
        )}
      </button>
    </div>
  );
};
