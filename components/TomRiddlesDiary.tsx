
import React, { useState, useRef, useEffect } from 'react';
import { DiaryEntry } from '../types';
import { talkToTomRiddle } from '../services/geminiService';
import { Send, Eraser, Loader2, Sparkles } from 'lucide-react';

interface TomRiddlesDiaryProps {
  className?: string;
}

const TomRiddlesDiary: React.FC<TomRiddlesDiaryProps> = ({ className }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [entries]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userEntry: DiaryEntry = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: Date.now(),
    };

    setEntries(prev => [...prev, userEntry]);
    setInputValue('');
    setIsLoading(true);

    const history = entries.map(e => ({
      role: e.sender === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: e.text }]
    }));

    const response = await talkToTomRiddle(history, userEntry.text);

    const riddlesEntry: DiaryEntry = {
      id: (Date.now() + 1).toString(),
      sender: 'riddle',
      text: response,
      timestamp: Date.now(),
    };

    setEntries(prev => [...prev, riddlesEntry]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearDiary = () => {
    setEntries([]);
  };

  return (
    <div className={`flex flex-col h-full w-full relative bg-transparent ${className}`}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 px-8 flex justify-between items-center z-20 border-b border-stone-500/20 bg-[#f0e6d2]/50 backdrop-blur-sm">
        <h2 className="font-magic text-2xl text-stone-800 opacity-80 tracking-widest">T.M. Riddle</h2>
        <button 
          onClick={clearDiary}
          className="p-2 text-stone-600 hover:text-red-800 transition-colors hover:bg-stone-400/20 rounded-full"
          title="Incendio (Burn Pages)"
        >
          <Eraser size={20} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 pt-24 font-hand text-2xl leading-loose text-stone-800 space-y-10 custom-scrollbar scroll-smooth relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")'}}></div>
        
        {entries.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-40 select-none">
            <Sparkles className="mb-4 w-12 h-12" />
            <p className="text-center italic font-book">The pages are hungry for secrets...</p>
          </div>
        )}
        {entries.map((entry) => (
          <div 
            key={entry.id} 
            className={`relative transition-all duration-1000 ease-in-out max-w-3xl mx-auto ${
              entry.sender === 'riddle' ? 'animate-ink-absorb' : 'animate-ink-dry'
            }`}
            style={{
               textAlign: entry.sender === 'riddle' ? 'left' : 'right',
               fontFamily: entry.sender === 'riddle' ? "'Crimson Text', serif" : "'MedievalSharp', cursive",
               fontWeight: entry.sender === 'riddle' ? '600' : 'normal',
               fontStyle: entry.sender === 'riddle' ? 'italic' : 'normal',
               color: entry.sender === 'riddle' ? '#000' : '#292524',
               transformOrigin: entry.sender === 'riddle' ? 'left' : 'right',
            }}
          >
            <p>{entry.text}</p>
          </div>
        ))}
        {isLoading && (
          <div className="text-stone-600 italic animate-pulse text-left font-book text-xl flex items-center gap-3 max-w-3xl mx-auto">
            <Loader2 className="animate-spin text-stone-400" size={20} />
            The ink seeps into the page...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-[#e8dac0] border-t border-[#8b5e3c]/30 relative z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="relative max-w-4xl mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Dip your quill..."
            className="w-full bg-transparent border-b-2 border-stone-400 focus:border-stone-800 outline-none py-3 pl-4 pr-12 font-hand text-xl text-stone-900 placeholder-stone-500/40 transition-colors"
            disabled={isLoading}
            autoFocus
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 top-2 text-stone-600 hover:text-stone-900 disabled:opacity-30 transition-colors hover:scale-110 transform"
          >
            <Send size={24} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes inkAbsorb {
          0% { opacity: 0; filter: blur(8px); transform: scale(0.98); }
          40% { opacity: 0.6; filter: blur(3px); }
          100% { opacity: 1; filter: blur(0); transform: scale(1); }
        }
        @keyframes inkDry {
          0% { color: #4a4a4a; transform: translateY(5px); opacity: 0; }
          100% { color: #292524; transform: translateY(0); opacity: 1; }
        }
        .animate-ink-absorb { animation: inkAbsorb 2.5s ease-out forwards; }
        .animate-ink-dry { animation: inkDry 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default TomRiddlesDiary;
