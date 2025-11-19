
import React, { useState } from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { House } from './types';
import { HOUSE_THEMES } from './constants';
import LivingPortrait from './components/LivingPortrait';
import TomRiddlesDiary from './components/TomRiddlesDiary';
import StoryTeller from './components/StoryTeller';
import SpellNotepad from './components/SpellNotepad';
import Navigation from './components/Navigation';

const Layout: React.FC<{ children: React.ReactNode, house: House, setHouse: (h: House) => void }> = ({ children, house, setHouse }) => {
  const [characterAction, setCharacterAction] = useState<{wave: boolean, twirl: boolean}>({ wave: false, twirl: false });
  const theme = HOUSE_THEMES[house];

  const handleCharacterInteract = (action: 'wave' | 'twirl') => {
    setCharacterAction(prev => ({ ...prev, [action]: true }));
    setTimeout(() => {
      setCharacterAction(prev => ({ ...prev, [action]: false }));
    }, 2000);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} transition-colors duration-1000 flex items-center justify-center p-2 md:p-8 overflow-hidden relative`}>
      
      {/* Magical Particles Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
         {[...Array(30)].map((_, i) => (
           <div 
            key={i}
            className="absolute bg-white rounded-full opacity-10 animate-float-slow"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 15 + 10 + 's',
              animationDelay: Math.random() * 5 + 's',
              boxShadow: '0 0 10px white'
            }}
           />
         ))}
      </div>

      {/* Main Book/Container */}
      <div className="relative w-full max-w-6xl h-[90vh] bg-[#1a120b] rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col md:flex-row overflow-hidden border-[8px] border-[#2c1e16] z-10">
        
        {/* Left Sidebar (Navigation & Portrait) */}
        <div className="w-full md:w-80 bg-[#15100d] flex flex-col border-b-8 md:border-b-0 md:border-r-8 border-[#3e2b1f] relative z-20 shadow-2xl shrink-0">
          
          {/* Portrait Container */}
          <div className="p-4 flex flex-col items-center bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] border-b-4 border-[#3e2b1f] shadow-xl relative shrink-0">
             <div className="absolute inset-0 bg-black/40"></div>
             <div className="relative z-10 mb-2">
                <LivingPortrait 
                  house={house} 
                  isWaving={characterAction.wave} 
                  isTwirling={characterAction.twirl} 
                />
             </div>
             
             {/* Interaction Buttons */}
             <div className="flex gap-2 w-full max-w-[240px] justify-center relative z-10 mb-2">
               <button onClick={() => handleCharacterInteract('wave')} className="flex-1 py-1.5 bg-[#3e2b1f] text-[#dcd0c0] border border-[#5c4033] rounded font-magic text-xs uppercase tracking-widest hover:bg-[#5c4033] transition-colors shadow-lg">Wave</button>
               <button onClick={() => handleCharacterInteract('twirl')} className="flex-1 py-1.5 bg-[#3e2b1f] text-[#dcd0c0] border border-[#5c4033] rounded font-magic text-xs uppercase tracking-widest hover:bg-[#5c4033] transition-colors shadow-lg">Twirl</button>
             </div>

             {/* House Toggles */}
             <div className="flex justify-center gap-3 mt-2 relative z-10">
               {Object.values(House).map((h) => (
                 <button
                   key={h}
                   onClick={() => setHouse(h)}
                   className={`text-lg transition-all duration-300 ${house === h ? 'scale-125 opacity-100 drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]' : 'opacity-30 grayscale hover:opacity-70'}`}
                   title={h}
                 >
                   {HOUSE_THEMES[h].crest}
                 </button>
               ))}
             </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto bg-[#2c1e16] relative">
            <Navigation />
          </div>
        </div>

        {/* Right Content Area (The Pages) */}
        <div className="flex-1 bg-parchment relative flex flex-col overflow-hidden">
           {/* Decorative Page Corners */}
           <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#dcd0c0] to-transparent opacity-30 pointer-events-none z-0"></div>
           <div className="absolute inset-0 shadow-[inset_20px_0_50px_rgba(0,0,0,0.15)] pointer-events-none z-30"></div>

           {/* Router Outlet */}
           <div className="flex-1 relative z-10 h-full w-full overflow-hidden">
              {children}
           </div>
        </div>

      </div>
    </div>
  );
};

const HomePage = () => (
  <div className="h-full flex flex-col items-center justify-center p-8 md:p-16 text-center space-y-8 relative overflow-hidden animate-fade-in">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] opacity-15 pointer-events-none mix-blend-multiply"></div>
    
    <div className="relative z-10">
      <h1 className="font-magic text-5xl md:text-7xl text-[#3e2b1f] mb-6 drop-shadow-sm tracking-tighter">The Marauder's<br/>Compendium</h1>
      <div className="h-1 w-32 bg-[#8b5e3c] mx-auto mb-6"></div>
      <p className="font-book text-2xl text-[#5c4033] italic max-w-2xl mx-auto leading-relaxed">
        "Messrs Moony, Wormtail, Padfoot, and Prongs are proud to present this magical aide."
      </p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentHouse, setCurrentHouse] = useState<House>(House.GRYFFINDOR);

  // Use MemoryRouter to avoid specific sandbox browser security errors with blob URLs
  return (
    <MemoryRouter>
      <Layout house={currentHouse} setHouse={setCurrentHouse}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diary" element={<TomRiddlesDiary className="h-full" />} />
          <Route path="/spells" element={<SpellNotepad />} />
          <Route path="/stories" element={<StoryTeller house={currentHouse} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </MemoryRouter>
  );
};

export default App;
