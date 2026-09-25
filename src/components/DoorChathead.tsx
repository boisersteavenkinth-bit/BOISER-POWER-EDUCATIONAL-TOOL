import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Minus, 
  Maximize2, 
  Users,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DoorChathead: React.FC = () => {
  const { currentUser, chatMessages, sendChatMessage } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendChatMessage(messageInput);
    setMessageInput('');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 border-4 border-white animate-bounce-slow"
        title="Open Door Chat"
      >
        <MessageSquare className="w-6 h-6" />
        {chatMessages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
            {chatMessages.length > 9 ? '9+' : chatMessages.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className={`fixed z-40 bottom-6 right-6 bg-white shadow-2xl border-2 border-blue-600 flex flex-col transition-all ${isMinimized ? 'w-64 h-14 rounded-2xl' : 'w-80 h-96 rounded-3xl overflow-hidden'}`}>
      
      {/* Header */}
      <div className="bg-blue-600 p-3 text-white flex items-center justify-between cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase leading-none">Door Chat</div>
            <div className="text-[9px] font-bold text-blue-200">Active Residents</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="p-1 hover:bg-white/20 rounded-md transition">
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-1 hover:bg-white/20 rounded-md transition">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
            <div className="text-center mb-2">
              <span className="px-3 py-1 bg-white border border-stone-200 rounded-full text-[9px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-1 w-fit mx-auto">
                <Sparkles className="w-3 h-3" /> Secure End-to-End Encryption
              </span>
            </div>
            
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.senderEmail === currentUser.email ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[9px] font-black text-stone-500 uppercase">{msg.senderName}</span>
                  <span className="text-[8px] text-stone-400">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className={`px-3 py-2 rounded-2xl text-[11px] font-medium max-w-[85%] shadow-sm ${msg.senderEmail === currentUser.email ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'}`}>
                  {msg.message}
                </div>
              </div>
            ))}
            {chatMessages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-stone-400">
                <MessageSquare className="w-8 h-8 mb-2" />
                <p className="text-[10px] font-bold">No messages yet. Start the conversation!</p>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 bg-stone-100 border-none rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-blue-600 transition outline-hidden"
            />
            <button 
              type="submit"
              disabled={!messageInput.trim()}
              className={`p-2 rounded-xl transition ${!messageInput.trim() ? 'bg-stone-100 text-stone-400' : 'bg-blue-600 text-white shadow-lg active:scale-95'}`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};
