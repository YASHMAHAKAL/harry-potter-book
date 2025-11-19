import React, { useState, useEffect } from 'react';
import { Scroll, Save, Trash2, Feather } from 'lucide-react';

const SpellNotepad: React.FC = () => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('marauder_notes');
    if (saved) setNotes(saved);
  }, []);

  const saveNotes = () => {
    localStorage.setItem('marauder_notes', notes);
  };

  const clearNotes = () => {
    if (window.confirm("Obliviate? (Clear all notes?)")) {
      setNotes('');
      localStorage.removeItem('marauder_notes');
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Scroll Top Graphic (CSS shape) */}
      <div className="h-12 bg-[#e3d5b8] border-b border-[#c7b299] shadow-sm flex items-center justify-between px-6 rounded-t-lg relative z-10">
        <h2 className="font-magic text-2xl text-stone-800 flex items-center gap-3">
          <Scroll size={24} className="text-stone-600" />
          <span className="drop-shadow-sm">Standard Book of Spells</span>
        </h2>
        <div className="flex gap-2">
          <button onClick={saveNotes} className="p-2 text-stone-600 hover:text-green-800 transition-colors" title="Save"><Save size={20}/></button>
          <button onClick={clearNotes} className="p-2 text-stone-600 hover:text-red-800 transition-colors" title="Clear"><Trash2 size={20}/></button>
        </div>
      </div>
      
      <div className="flex-1 relative bg-[#f0e6d2] p-8 overflow-hidden shadow-inner">
         {/* Lines */}
        <div className="absolute inset-0 pointer-events-none" 
             style={{
               backgroundImage: 'linear-gradient(transparent 95%, #a8a29e 95%)',
               backgroundSize: '100% 40px',
               marginTop: '40px'
             }}></div>
        
        {/* Margin Line */}
        <div className="absolute top-0 bottom-0 left-16 w-0.5 bg-red-900/20 pointer-events-none"></div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-full bg-transparent resize-none outline-none font-script text-3xl text-stone-900 leading-[40px] custom-scrollbar placeholder-stone-400/50 pl-12"
          placeholder="Wingardium Leviosa..."
          style={{ lineHeight: '40px' }}
        />
      </div>

      <div className="absolute bottom-8 right-8 opacity-20 pointer-events-none">
        <Feather size={100} className="text-stone-800" />
      </div>
    </div>
  );
};

export default SpellNotepad;