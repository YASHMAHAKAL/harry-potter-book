
import React, { useEffect, useState } from 'react';
import { House } from '../types';

interface LivingPortraitProps {
  house: House;
  isWaving: boolean;
  isTwirling: boolean;
}

const LivingPortrait: React.FC<LivingPortraitProps> = ({ house, isWaving, isTwirling }) => {
  const [blink, setBlink] = useState(false);
  const [breathe, setBreathe] = useState(false);
  const [lookDirection, setLookDirection] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 4000 + Math.random() * 2000);

    const breatheInterval = setInterval(() => {
      setBreathe(prev => !prev);
    }, 3000);

    const lookInterval = setInterval(() => {
      setLookDirection({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 4
      });
    }, 5000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(breatheInterval);
      clearInterval(lookInterval);
    };
  }, []);

  // Character Configuration
  const getCharacterConfig = (h: House) => {
    switch(h) {
      case House.SLYTHERIN: // Draco
        return { skin: '#f3e5dc', hair: '#e8e8c0', hairStyle: 'slicked', glasses: false, eyeColor: '#a4aab5' };
      case House.RAVENCLAW: // Luna
        return { skin: '#ffeae0', hair: '#f3e5ab', hairStyle: 'long', glasses: false, eyeColor: '#a5c4e0' };
      case House.HUFFLEPUFF: // Cedric
        return { skin: '#e8cda0', hair: '#5c4033', hairStyle: 'neat', glasses: false, eyeColor: '#6b5c53' };
      default: // Harry
        return { skin: '#eacbb5', hair: '#1a1a1a', hairStyle: 'messy', glasses: true, eyeColor: '#2d5a38' };
    }
  };

  const config = getCharacterConfig(house);

  // Frame styles based on house
  const frameColors = {
    [House.GRYFFINDOR]: 'border-yellow-700 bg-red-950',
    [House.SLYTHERIN]: 'border-stone-400 bg-green-950',
    [House.RAVENCLAW]: 'border-yellow-600 bg-blue-950',
    [House.HUFFLEPUFF]: 'border-yellow-800 bg-yellow-950',
  };

  const robeGradient = {
    [House.GRYFFINDOR]: 'from-red-950 via-red-900 to-black',
    [House.SLYTHERIN]: 'from-green-950 via-green-900 to-black',
    [House.RAVENCLAW]: 'from-blue-950 via-blue-900 to-black',
    [House.HUFFLEPUFF]: 'from-yellow-900 via-yellow-800 to-black',
  };

  const tieColors = {
    [House.GRYFFINDOR]: ['bg-[#740001]', 'bg-[#eeba30]'], // Accurate Scarlet & Gold
    [House.SLYTHERIN]: ['bg-[#1a472a]', 'bg-[#aaaaaa]'],  // Green & Silver
    [House.RAVENCLAW]: ['bg-[#0e1a40]', 'bg-[#946b2d]'], // Blue & Bronze
    [House.HUFFLEPUFF]: ['bg-[#ecb939]', 'bg-[#000000]'], // Yellow & Black
  };

  return (
    // Reduced width from w-72 to w-60 to fit sidebar properly
    <div className="relative w-60 h-80 group select-none perspective-1000 mx-auto">
      {/* Ornate Frame */}
      <div className={`absolute inset-0 border-[16px] rounded-lg shadow-2xl overflow-hidden bg-[#1a1a1a]
        ${frameColors[house].split(' ')[0]} 
        outline outline-2 outline-offset-[-8px] outline-black/40
        transform transition-transform duration-700`}
        style={{
          borderImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png") 30 round',
          boxShadow: 'inset 0 0 40px #000, 5px 10px 20px rgba(0,0,0,0.6)'
        }}
      >
        {/* Painting Background */}
        <div className={`absolute inset-0 opacity-30 mix-blend-multiply ${frameColors[house].split(' ')[1]}`}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')] opacity-30 mix-blend-overlay pointer-events-none z-0"></div>
        
        {/* Vigenette - adjusted z-index to be behind character or subtle */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10 pointer-events-none"></div>

        {/* Character Group - Centered and Scaled to fit */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-64 flex flex-col items-center z-20 origin-bottom scale-90"
             style={{ 
               transform: `translateY(${breathe ? '-1px' : '0px'}) translateX(calc(-50% + ${lookDirection.x / 3}px)) scale(0.9)`,
               left: '50%',
               transition: 'transform 3s ease-in-out'
             }}>
          
          {/* Head Container */}
          <div className="relative z-30 w-28 h-36" 
               style={{ 
                 transform: `rotateY(${lookDirection.x}deg) rotateX(${lookDirection.y}deg)`,
                 transition: 'transform 1s ease-out',
                 transformStyle: 'preserve-3d'
               }}>
            
            {/* Back Hair */}
            {config.hairStyle === 'long' && (
               <div className="absolute top-4 -left-4 w-36 h-40 rounded-full" style={{ backgroundColor: config.hair, filter: 'brightness(0.8)' }}></div>
            )}

            {/* Face Shape - improved realism */}
            <div className="absolute inset-0 rounded-[42%] bg-gradient-to-b from-[var(--skin)] via-[var(--skin)] to-[var(--skin-dark)] shadow-lg overflow-hidden"
                 style={{ 
                   '--skin': config.skin, 
                   '--skin-dark': '#bcaaa4',
                   boxShadow: 'inset -2px -2px 10px rgba(0,0,0,0.3)' 
                 } as React.CSSProperties}>
              
              {/* Subtle Shadows */}
              <div className="absolute top-1/2 left-2 w-4 h-12 bg-black/5 blur-md rounded-full"></div>
              <div className="absolute top-1/2 right-2 w-4 h-12 bg-black/5 blur-md rounded-full"></div>
            </div>

            {/* Eyes */}
            <div className="absolute top-14 left-4 w-7 h-3.5 bg-white/80 rounded-[100%] overflow-hidden shadow-inner opacity-90">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border border-black/20`}
                   style={{ backgroundColor: config.eyeColor, transform: `translate(${lookDirection.x / 2}px, ${lookDirection.y}px)` }}>
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-80"></div>
              </div>
              <div className={`absolute inset-0 bg-[#f3d8c6] transition-all duration-100 ease-out ${blink ? 'h-full' : 'h-0'}`} style={{backgroundColor: config.skin}}></div>
            </div>

            <div className="absolute top-14 right-4 w-7 h-3.5 bg-white/80 rounded-[100%] overflow-hidden shadow-inner opacity-90">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border border-black/20`}
                   style={{ backgroundColor: config.eyeColor, transform: `translate(${lookDirection.x / 2}px, ${lookDirection.y}px)` }}>
                   <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-80"></div>
              </div>
              <div className={`absolute inset-0 bg-[#f3d8c6] transition-all duration-100 ease-out ${blink ? 'h-full' : 'h-0'}`} style={{backgroundColor: config.skin}}></div>
            </div>

            {/* Glasses */}
            {config.glasses && (
              <>
                <div className="absolute top-12 left-2.5 w-10 h-10 border-2 border-stone-900 rounded-full opacity-80 shadow-sm"></div>
                <div className="absolute top-12 right-2.5 w-10 h-10 border-2 border-stone-900 rounded-full opacity-80 shadow-sm"></div>
                <div className="absolute top-16 left-[2.5rem] w-2 h-0.5 bg-stone-900"></div>
                {/* Scar */}
                <div className="absolute top-8 left-16 w-3 h-5 border-l border-red-800/40 rotate-12 opacity-60"></div>
              </>
            )}

            {/* Nose */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-3 h-6 bg-black/10 rounded-full blur-[2px]"></div>

            {/* Mouth */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-2 border-b border-red-900/20 rounded-full transition-all duration-500
              ${isWaving || isTwirling ? 'h-3 w-8 border-b-2 border-red-900/30 bg-black/5' : ''}
            `}></div>

            {/* Hair Front */}
            <div className="absolute top-[-8px] inset-x-[-8px] h-20 z-10 pointer-events-none mix-blend-normal">
               {config.hairStyle === 'messy' && (
                 <>
                   <div className="absolute top-0 left-4 w-10 h-10 rounded-full shadow-md" style={{backgroundColor: config.hair}}></div>
                   <div className="absolute top-2 right-4 w-12 h-12 rounded-full shadow-md" style={{backgroundColor: config.hair}}></div>
                   <div className="absolute top-0 left-10 w-14 h-10 rounded-full shadow-md" style={{backgroundColor: config.hair}}></div>
                   <div className="absolute top-6 left-2 w-3 h-6 rounded-full rotate-12" style={{backgroundColor: config.hair}}></div>
                 </>
               )}
               {config.hairStyle === 'slicked' && (
                 <div className="w-full h-full bg-transparent border-t-[25px] rounded-t-[35px] shadow-inner opacity-90" style={{borderColor: config.hair}}></div>
               )}
               {config.hairStyle === 'neat' && (
                 <div className="absolute top-0 inset-x-3 h-14 rounded-t-[2.5rem] shadow-md" style={{backgroundColor: config.hair}}></div>
               )}
               {config.hairStyle === 'long' && (
                 <div className="absolute top-0 inset-x-4 h-14 rounded-t-[2.5rem] shadow-md" style={{backgroundColor: config.hair}}></div>
               )}
            </div>
          </div>

          {/* Neck */}
          <div className="w-10 h-6 -mt-3 z-20 relative shadow-inner" style={{backgroundColor: config.skin}}></div>

          {/* Body / Robes */}
          <div className={`relative -mt-2 w-40 h-40 rounded-t-[2.5rem] bg-gradient-to-b ${robeGradient[house]} shadow-2xl flex justify-center z-20`}>
             
             {/* Robe Opening */}
             <div className="w-12 h-full bg-[#0a0a0a] flex justify-center pt-1 shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
               {/* Shirt */}
               <div className="w-10 h-20 bg-gray-100 relative top-0 clip-path-shirt shadow-inner">
                  {/* Tie */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-5 h-16 flex flex-col items-center">
                     <div className="w-full h-full flex flex-col overflow-hidden rounded-b-sm shadow-sm">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className={`w-full h-2.5 ${i % 2 === 0 ? tieColors[house][0] : tieColors[house][1]} -rotate-45 scale-150`}></div>
                        ))}
                     </div>
                     <div className={`absolute top-[-3px] w-6 h-4 ${tieColors[house][0]} rounded-sm shadow-md z-10`}></div>
                  </div>
               </div>
             </div>
             
             {/* House Crest Mockup */}
             <div className="absolute top-10 left-6 w-6 h-8 bg-black/40 rounded-b-lg border border-white/5 opacity-50 blur-[0.5px]"></div>

             {/* Arm (Wand Hand) */}
             <div className={`absolute top-5 -right-4 w-10 h-28 bg-gradient-to-b ${robeGradient[house]} rounded-full origin-top transition-transform duration-700 ease-in-out z-30
                ${isWaving ? 'animate-wave' : ''}
                ${isTwirling ? 'animate-twirl-arm' : ''}
                ${!isWaving && !isTwirling ? 'rotate-[-10deg]' : ''}
             `}>
               <div className="absolute bottom-[-4px] left-1.5 w-6 h-6 rounded-full border border-black/20" style={{backgroundColor: config.skin}}></div>
               {/* Wand */}
               <div className={`absolute bottom-2 left-4 w-1 h-28 bg-[#3e2723] origin-bottom shadow-sm rounded-t-full
                  ${isWaving ? 'animate-wand-swish' : ''}
                  ${isTwirling ? 'animate-wand-twirl' : ''}
               `}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.9)] opacity-0 animate-pulse-glow"></div>
               </div>
             </div>

             {/* Other Arm */}
             <div className="absolute top-5 -left-4 w-10 h-28 bg-gradient-to-b from-black to-transparent rounded-full rotate-[10deg] opacity-90"></div>
          </div>
        </div>
        
        {/* Oil Paint Texture Overlay - On top of everything */}
        <div className="absolute inset-0 mix-blend-overlay pointer-events-none opacity-20 z-40" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/oil.png")'}}></div>
        <div className="absolute inset-0 mix-blend-multiply pointer-events-none opacity-10 bg-[#4a3b2a] z-50"></div>
        
        {/* Nameplate */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-gradient-to-r from-[#2a1b0e] via-[#5c4033] to-[#2a1b0e] border border-[#8b6c48] rounded shadow-lg flex items-center justify-center z-[60]">
           <span className="font-magic text-[#e8dcc5] text-[10px] tracking-[0.2em] uppercase drop-shadow-md">
             {config.hairStyle === 'messy' ? 'Potter' : 
              config.hairStyle === 'slicked' ? 'Malfoy' :
              config.hairStyle === 'long' ? 'Lovegood' : 'Diggory'}
           </span>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(-50deg); }
        }
        @keyframes wand-swish {
           0%, 100% { transform: rotate(0deg); }
           50% { transform: rotate(-40deg); }
        }
        @keyframes twirl-arm {
          0% { transform: rotate(-10deg); }
          100% { transform: rotate(-10deg); }
        }
        @keyframes wand-twirl {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-wave { animation: wave 2s infinite ease-in-out; }
        .animate-wand-swish { animation: wand-swish 2s infinite ease-in-out; }
        .animate-twirl-arm { animation: twirl-arm 1s linear; }
        .animate-wand-twirl { animation: wand-twirl 1s linear infinite; }
        .clip-path-shirt { clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%); }
      `}</style>
    </div>
  );
};

export default LivingPortrait;
