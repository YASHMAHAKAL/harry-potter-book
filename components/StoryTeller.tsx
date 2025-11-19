import React, { useState } from 'react';
import { House } from '../types';
import { generateMagicalStory } from '../services/geminiService';
import { Feather, BookOpen, Sparkles, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface StoryTellerProps {
  house: House;
}

const StoryTeller: React.FC<StoryTellerProps> = ({ house }) => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setStory('');
    
    const magicalTale = await generateMagicalStory(prompt, house);
    
    setStory(magicalTale);
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col h-full relative bg-[#fdf6e3]">
      {/* Book Header */}
      <div className="bg-[#3e2b1f] p-6 shadow-lg relative z-10 flex flex-col items-center border-b-4 border-[#8b5e3c]">
        <h2 className="font-magic text-3xl text-[#f0e6d2] tracking-widest mb-4 flex items-center gap-3">
          <BookOpen /> The Tales of Beedle the Bard
        </h2>
        
        <div className="w-full max-w-2xl relative">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What tale shall I weave? (e.g. The Goblin's Secret)"
            className="w-full bg-[#2a1b0e] border border-[#5c4033] rounded-full px-6 py-3 font-book text-lg text-[#dcd0c0] placeholder-[#8b5e3c] focus:ring-2 focus:ring-yellow-600 outline-none shadow-inner"
          />
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className={`
              absolute right-1 top-1 bottom-1 px-6 rounded-full font-magic text-[#2a1b0e] transition-all flex items-center gap-2
              ${isGenerating ? 'bg-[#5c4033] cursor-not-allowed' : 'bg-[#dcd0c0] hover:bg-white hover:scale-105 shadow-md'}
            `}
          >
            {isGenerating ? <Sparkles className="animate-spin" size={18} /> : <Feather size={18} />}
            {isGenerating ? 'Weaving...' : 'Inscribe'}
          </button>
        </div>
      </div>

      {/* Story Page */}
      <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar relative">
        <div className="max-w-3xl mx-auto bg-white shadow-[0_0_30px_rgba(0,0,0,0.1)] p-12 min-h-full relative">
           {/* Paper Texture */}
           <div className="absolute inset-0 opacity-50 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/rough-cloth-light.png')]"></div>
           
           {!story && !isGenerating && (
             <div className="h-full flex flex-col items-center justify-center opacity-30 mt-20">
                <BookOpen size={80} className="mb-4 text-[#3e2b1f]" />
                <p className="font-magic text-2xl text-[#3e2b1f] text-center">The pages lie still...</p>
             </div>
           )}

           {isGenerating && (
             <div className="h-full flex flex-col items-center justify-center mt-20 space-y-6">
                <div className="relative w-24 h-24">
                   <div className="absolute inset-0 border-4 border-[#8b5e3c] rounded-full animate-spin border-t-transparent"></div>
                   <Sparkles className="absolute inset-0 m-auto text-yellow-600 animate-pulse" size={32} />
                </div>
                <p className="font-magic text-xl text-[#3e2b1f] animate-pulse">Consulting the archives...</p>
             </div>
           )}

           {story && (
             <div className="prose prose-stone prose-lg max-w-none font-book text-[#2a1b0e] leading-loose animate-fade-in relative z-10">
                <div className="text-center mb-8">
                   <span className="font-magic text-4xl block mb-2 text-[#8b5e3c] border-b-2 border-[#8b5e3c] inline-block px-8 pb-2">
                     Chapter One
                   </span>
                </div>
                <div className="first-letter:text-7xl first-letter:font-magic first-letter:float-left first-letter:mr-4 first-letter:mt-[-10px] first-letter:text-[#8b5e3c]">
                  <ReactMarkdown>{story}</ReactMarkdown>
                </div>
                <div className="mt-12 text-center opacity-50">
                  <p className="font-magic text-sm">~ Fin ~</p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default StoryTeller;