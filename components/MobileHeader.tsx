'use client';

import React from 'react';
import { ChevronLeft, Plus } from 'lucide-react';

interface MobileHeaderProps {
  onBackClick?: () => void;
  title?: string;
  onCreateProgramClick?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onBackClick,
  title = 'LGU',
  onCreateProgramClick,
}) => {
  return (
    <header className="bg-white sticky top-0 z-30 border-b border-slate-100/80 backdrop-blur-md bg-white/95">
      {/* Main Top Navigation Bar */}
      <div className="relative flex items-center justify-center px-4 py-3 min-h-[48px]">
        {/* Back Button */}
        <button
          onClick={onBackClick}
          className="absolute left-4 p-1 -ml-1 text-slate-900 hover:text-blue-600 transition-colors rounded-full active:bg-slate-100 cursor-pointer"
          aria-label="Back"
        >
          <ChevronLeft className="w-7 h-7 stroke-[2.2]" />
        </button>

        {/* Center Title */}
        <h1 className="text-lg font-bold text-slate-900 tracking-wide font-sans">
          {title}
        </h1>

        {/* Create New Program Button */}
        {onCreateProgramClick && (
          <button
            onClick={onCreateProgramClick}
            className="absolute right-4 flex items-center gap-1 px-2.5 py-1.5 -mr-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors rounded-full active:bg-blue-100 cursor-pointer text-xs font-bold"
            aria-label="Create New Program"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden xs:inline">New Program</span>
          </button>
        )}
      </div>
    </header>
  );
};