
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, ScrollText, PenTool, Map as MapIcon, GraduationCap } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Marauder\'s Map', icon: MapIcon },
    { path: '/diary', label: 'The Diary', icon: Book },
    { path: '/spells', label: 'Spell Book', icon: ScrollText },
    { path: '/stories', label: 'Story Teller', icon: PenTool },
  ];

  return (
    <nav className="w-full h-full flex flex-col relative z-20">
      {/* Map Texture Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/gplay.png")'}}></div>

      <div className="p-4 border-b border-[#4a3728] flex flex-col items-center bg-[#231710]/50">
         <GraduationCap className="w-8 h-8 text-[#8b5e3c] mb-1" />
         <h1 className="font-magic text-lg text-[#dcd0c0] text-center leading-tight">
           Hogwarts<br/><span className="text-xs text-[#8b5e3c] tracking-widest uppercase">Navigation</span>
         </h1>
      </div>

      <div className="flex-1 py-4 px-3 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative group flex items-center gap-3 px-4 py-3 rounded font-magic transition-all duration-300 overflow-hidden cursor-pointer
                ${active 
                  ? 'bg-[#3e2b1f] text-[#f0e6d2] shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] border border-[#5c4033]' 
                  : 'text-[#8b5e3c] hover:bg-[#36251c] hover:text-[#bcaaa4]'}
              `}
            >
              <item.icon size={18} className={`relative z-10 transition-transform duration-300 ${active ? 'scale-110 text-yellow-600' : ''}`} />
              <span className="relative z-10 tracking-wide text-sm md:text-base">{item.label}</span>
              
              {/* Footsteps animation for active link */}
              {active && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-40 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-[#dcd0c0] rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-[#dcd0c0] rounded-full animate-pulse delay-75"></div>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-[#4a3728] bg-[#1f150f]">
        <p className="text-center font-hand text-[#5c4033] text-xs italic opacity-80">
          "I solemnly swear that I am up to no good."
        </p>
      </div>
    </nav>
  );
};

export default Navigation;
