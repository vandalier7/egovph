'use client';

import React from 'react';
import { ServiceSubmission } from '@/types/lgu';
import { FileText, Clock, CheckCircle2, AlertCircle, X, ChevronRight } from 'lucide-react';

interface SubmissionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: ServiceSubmission[];
}

export const SubmissionsDrawer: React.FC<SubmissionsDrawerProps> = ({
  isOpen,
  onClose,
  submissions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-extrabold text-slate-900">
              My Submissions ({submissions.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {submissions.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-3 stroke-1 text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">No applications submitted yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Applications you submit for Fire Safety, Property Tax, Business Permits, or Barangay Clearances will appear here.
              </p>
            </div>
          ) : (
            submissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:border-blue-300 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-blue-600 font-mono tracking-wide">
                    {sub.referenceNo}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                    {sub.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {sub.serviceCode} — {sub.serviceTitle}
                </h3>
                <span className="text-xs text-slate-500 block mt-0.5">
                  {sub.lguName}
                </span>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {sub.submittedAt}
                  </span>
                  <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                    View Details
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
