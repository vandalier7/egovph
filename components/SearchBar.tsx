'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search services',
}) => {
  return (
    <div className="my-4">
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-base font-medium rounded-[16px] border border-slate-200 py-3.5 pl-4 pr-11 shadow-[0_2px_4px_rgba(0,0,0,0.02)] focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all duration-200"
        />

        {value ? (
          <button
            onClick={() => onChange('')}
            className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        ) : (
          <div className="absolute right-4 pointer-events-none text-slate-800">
            <Search className="w-6 h-6 stroke-[2.2]" />
          </div>
        )}
      </div>
    </div>
  );
};
