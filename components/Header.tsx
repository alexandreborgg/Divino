
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center justify-center pt-8 pb-4 bg-transparent">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-[#d4a373] rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 className="text-3xl font-cinzel font-bold text-[#604439] tracking-widest animate-glow">
          Diálogo Divino
        </h1>
      </div>
      <p className="mt-2 text-[#a98467] font-serif-biblical italic text-sm text-center px-4">
        "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei." — Mateus 11:28
      </p>
    </header>
  );
};

export default Header;
