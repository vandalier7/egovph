'use client';

import React from 'react';
import { LguService } from '@/types/lgu';
import { ChevronRight, ShieldAlert, Building2, Award, Stethoscope, GraduationCap, Pill } from 'lucide-react';

interface ServiceCardProps {
  service: LguService;
  onClick: (service: LguService) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <div
      onClick={() => onClick(service)}
      className="bg-white rounded-[20px] border border-slate-200/90 p-4 mb-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between group active:scale-[0.995]"
    >
      <div className="flex items-center gap-4 min-w-0">
        {/* Emblem / Seal Icon matching screenshot */}
        <div className="relative flex-shrink-0 w-14 h-14 rounded-full bg-slate-50 border border-slate-200/70 flex items-center justify-center shadow-2xs overflow-hidden">
          {/* Detailed Seal Icon Render */}
          {service.code === 'FSIS' ? (
            <div className="w-full h-full bg-red-600 rounded-full flex flex-col items-center justify-center text-white border-2 border-yellow-400 shadow-inner">
              <ShieldAlert className="w-7 h-7 text-yellow-300 stroke-[2.2]" />
            </div>
          ) : service.code === 'LIBRENG TULI' ? (
            <div className="w-full h-full bg-sky-600 rounded-full flex flex-col items-center justify-center text-white border-2 border-sky-300">
              <Stethoscope className="w-6 h-6 text-white stroke-[2.2]" />
            </div>
          ) : service.code === 'SCHOLARSHIP' ? (
            <div className="w-full h-full bg-indigo-700 rounded-full flex flex-col items-center justify-center text-white border-2 border-amber-300">
              <GraduationCap className="w-6 h-6 text-amber-300 stroke-[2.2]" />
            </div>
          ) : service.code === 'LIBRENG GAMOT' ? (
            <div className="w-full h-full bg-rose-600 rounded-full flex flex-col items-center justify-center text-white border-2 border-rose-300">
              <Pill className="w-6 h-6 text-white stroke-[2.2]" />
            </div>
          ) : service.code === 'RPTAX' ? (
            <div className="w-full h-full bg-emerald-700 rounded-full flex flex-col items-center justify-center text-white border-2 border-amber-300">
              <span className="text-xl">🏦</span>
            </div>
          ) : service.code === 'BPLO' ? (
            <div className="w-full h-full bg-blue-700 rounded-full flex flex-col items-center justify-center text-white border-2 border-blue-300">
              <Building2 className="w-6 h-6 text-white stroke-[2.2]" />
            </div>
          ) : service.code === 'BRGY CLEARANCE' ? (
            <div className="w-full h-full bg-amber-600 rounded-full flex flex-col items-center justify-center text-white border-2 border-yellow-200">
              <Award className="w-6 h-6 text-yellow-200 stroke-[2.2]" />
            </div>
          ) : (
            <div className="w-full h-full bg-blue-900 rounded-full flex items-center justify-center text-yellow-400 font-extrabold text-sm border-2 border-yellow-400">
              {service.code.substring(0, 3)}
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-slate-900 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
            {service.code}
          </h3>
          <p className="text-xs font-normal text-slate-500 mt-0.5 leading-snug line-clamp-1">
            {service.title}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
              {service.lguName}
            </span>
          </div>
        </div>
      </div>

      {/* Right Arrow */}
      <div className="pl-2 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
        <ChevronRight className="w-5 h-5 stroke-[2.2]" />
      </div>
    </div>
  );
};
