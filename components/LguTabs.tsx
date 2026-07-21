'use client';

import React from 'react';

export type LguTab = 'your_lgu' | 'other_lgus';

interface LguTabsProps {
  activeTab: LguTab;
  onTabChange: (tab: LguTab) => void;
  userJurisdictionText?: string;
}

export const LguTabs: React.FC<LguTabsProps> = ({
  activeTab,
  onTabChange,
  userJurisdictionText = 'City of Calamba, Laguna',
}) => {
  return (
    <div className="pt-5 pb-2">
      {/* Title & Subtitle section */}
      <div className="px-1 mb-5">
        <h2 className="text-[22px] font-extrabold text-slate-900 tracking-tight leading-snug">
          Local Government Portals
        </h2>
        <p className="text-sm font-normal text-slate-400 mt-1 leading-relaxed">
          Your one-stop-shop services for Local Government.
        </p>
      </div>

      {/* Tabs Row */}
      <div className="relative flex border-b border-slate-100">
        {/* Your LGU Tab */}
        <button
          onClick={() => onTabChange('your_lgu')}
          className={`flex-1 py-3 text-center text-base font-bold transition-colors cursor-pointer relative ${
            activeTab === 'your_lgu'
              ? 'text-blue-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Your LGU</span>
          {activeTab === 'your_lgu' && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-full transition-all duration-300" />
          )}
        </button>

        {/* Other LGUs Tab */}
        <button
          onClick={() => onTabChange('other_lgus')}
          className={`flex-1 py-3 text-center text-base font-bold transition-colors cursor-pointer relative ${
            activeTab === 'other_lgus'
              ? 'text-blue-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Other LGUs</span>
          {activeTab === 'other_lgus' && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-full transition-all duration-300" />
          )}
        </button>
      </div>
    </div>
  );
};
