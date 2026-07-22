'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_LGUS } from '@/lib/lgu-data';
import { getStoredServices, saveSingleService } from '@/lib/lgu-store';
import { LguService, ServiceSubmission } from '@/types/lgu';
import { FormBlockBuilder } from './FormBlockBuilder';
import { SubmissionResponseView } from './SubmissionResponseView';
import {
  FileEdit,
  Inbox,
  Send,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';

interface LguAdminPortalProps {
  lguId: string;
}

export default function LguAdminPortal({ lguId }: LguAdminPortalProps) {
  // Find LGU info or default to Calamba
  const lgu =
    MOCK_LGUS.find(
      (l) => l.id === lguId || l.id === `lgu-${lguId}` || lguId === '1'
    ) || MOCK_LGUS[0];

  // Services list initialized from store
  const [services, setServices] = useState<LguService[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  useEffect(() => {
    const loaded = getStoredServices();
    const lguServices = loaded.filter(
      (s) => s.lguId === lgu.id || lguId === '1' || s.lguId === 'lgu-calamba'
    );
    setServices(lguServices);
    if (lguServices.length > 0 && !selectedServiceId) {
      setSelectedServiceId(lguServices[0].id);
    }
  }, [lgu.id, lguId, selectedServiceId]);

  const selectedService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  const [activeTab, setActiveTab] = useState<'programs' | 'submissions'>('programs');

  // Program Package Status
  const [programStatus, setProgramStatus] = useState<
    'draft' | 'under_review' | 'approved'
  >('draft');

  // Mock initial submissions
  const [submissions, setSubmissions] = useState<ServiceSubmission[]>([
    {
      id: 'sub-1',
      serviceId: services[0]?.id || 'srv-fsis',
      serviceCode: 'FSIS',
      serviceTitle: 'Fire Safety Inspection System',
      lguName: lgu.name,
      submittedAt: '2026-07-21 14:30',
      status: 'Pending',
      referenceNo: 'EGOV-FSIS-882194',
      formData: {
        'Establishment Name': 'Calamba Commercial Center',
        'Total Floor Area': '250 sq. m.',
        Address: 'Brgy. Real, Calamba City, Laguna',
        'Inspection Date': '2026-07-28',
      },
    },
    {
      id: 'sub-2',
      serviceId: 'srv-rptax',
      serviceCode: 'RPTAX',
      serviceTitle: 'Real Property Tax Clearance',
      lguName: lgu.name,
      submittedAt: '2026-07-20 09:15',
      status: 'Approved',
      referenceNo: 'EGOV-RPTAX-104928',
      formData: {
        'Tax Declaration No': 'TDN-01-CAL-9923',
        Owner: 'Juan Dela Cruz',
        Location: 'Brgy. Real',
      },
    },
  ]);

  // Submissions scoped to the currently selected service
  const filteredSubmissions = submissions.filter(
    (sub) => sub.serviceId === selectedService?.id
  );

  const handleSaveService = (updated: LguService) => {
    // Persist to store (triggers real-time sync with Citizen View)
    const allUpdated = saveSingleService(updated);
    const lguServices = allUpdated.filter(
      (s) => s.lguId === lgu.id || lguId === '1' || s.lguId === 'lgu-calamba'
    );
    setServices(lguServices);
  };

  const handleUpdateSubmissionStatus = (
    id: string,
    newStatus: ServiceSubmission['status']
  ) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased pb-12 w-full max-w-full overflow-x-hidden">
      {/* Top Header Navbar */}
      <header className="bg-white border-b border-slate-200 text-slate-900 sticky top-0 z-30 shadow-2xs w-full">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          {/* LGU Title & Back */}
          <div className="flex items-center gap-2.5 min-w-0">
            <Link
              href="/"
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer flex-shrink-0"
              title="Return to Citizen Portal"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs sm:text-sm flex-shrink-0">
                LGU
              </div>
              <div className="min-w-0">
                <h1 className="text-xs sm:text-sm font-extrabold tracking-tight leading-tight text-slate-900 truncate">
                  {lgu.name} Admin Portal
                </h1>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block truncate">
                  {lgu.province} • {lgu.level.toUpperCase()} LGU
                </span>
              </div>
            </div>
          </div>

          {/* Package Action Button (Pushed to the right) */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            {programStatus === 'draft' && (
              <button
                onClick={() => setProgramStatus('under_review')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit</span>
              </button>
            )}

            {programStatus === 'under_review' && (
              <button
                onClick={() => setProgramStatus('approved')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Publish Package</span>
              </button>
            )}

            {programStatus === 'approved' && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>LIVE</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 space-y-4 sm:space-y-6 w-full max-w-full overflow-x-hidden">
        {/* Service Selection Dropdown (topmost widget) */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs w-full">
          <label
            htmlFor="service-select"
            className="block text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-2"
          >
            Service
          </label>
          <div className="relative">
            <select
              id="service-select"
              value={selectedService?.id || ''}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-9 py-2.5 text-sm font-bold text-slate-900 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 cursor-pointer transition-colors"
            >
              {services.map((srv) => (
                <option key={srv.id} value={srv.id}>
                  {srv.code} — {srv.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-1 border border-slate-200 shadow-2xs flex items-center gap-1 w-full">
          <button
            onClick={() => setActiveTab('programs')}
            className={`flex-1 py-2.5 px-2 sm:px-4 rounded-xl text-[11px] sm:text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'programs'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Form Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex-1 py-2.5 px-2 sm:px-4 rounded-xl text-[11px] sm:text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'submissions'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Responses ({filteredSubmissions.length})</span>
          </button>
        </div>

        {/* TAB 1: Program & Form Builder */}
        {activeTab === 'programs' && (
          <div className="w-full min-w-0">
            {selectedService ? (
              <FormBlockBuilder
                key={selectedService.id}
                service={selectedService}
                onSaveService={handleSaveService}
              />
            ) : (
              <div className="bg-white p-8 rounded-2xl text-center text-slate-400">
                Loading service builder...
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Submissions Response View (filtered to selected service) */}
        {activeTab === 'submissions' && (
          <SubmissionResponseView
            submissions={filteredSubmissions}
            onUpdateStatus={handleUpdateSubmissionStatus}
          />
        )}
      </main>
    </div>
  );
}