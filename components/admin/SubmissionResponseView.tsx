'use client';

import React, { useState } from 'react';
import { ServiceSubmission } from '@/types/lgu';
import {
  FileText,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  X,
  Search,
  User,
  MapPin,
  Calendar,
} from 'lucide-react';

interface SubmissionResponseViewProps {
  submissions: ServiceSubmission[];
  onUpdateStatus: (id: string, newStatus: ServiceSubmission['status']) => void;
}

export const SubmissionResponseView: React.FC<SubmissionResponseViewProps> = ({
  submissions,
  onUpdateStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [activeSubmission, setActiveSubmission] = useState<ServiceSubmission | null>(
    null
  );

  const filtered = submissions.filter((sub) => {
    if (filterStatus !== 'All' && sub.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        sub.referenceNo.toLowerCase().includes(q) ||
        sub.serviceCode.toLowerCase().includes(q) ||
        sub.serviceTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Reference No. or Service..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Pending', 'Under Review', 'Approved', 'Action Needed'].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Submissions Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <FileText className="w-10 h-10 mx-auto mb-2 text-slate-300 stroke-1" />
            <p className="text-xs font-bold text-slate-600">No submissions found</p>
            <p className="text-[11px] text-slate-400 mt-1">
              Citizen responses for your LGU services will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Ref No</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Submitted On</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">
                      {sub.referenceNo}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">
                        {sub.serviceCode}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {sub.serviceTitle}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{sub.submittedAt}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                          sub.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : sub.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setActiveSubmission(sub)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold text-xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Submission Detail Modal */}
      {activeSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase font-mono">
                  {activeSubmission.referenceNo}
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  {activeSubmission.serviceCode} Application Details
                </h3>
              </div>
              <button
                onClick={() => setActiveSubmission(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">LGU Office</span>
                  <span className="font-bold text-slate-800">
                    {activeSubmission.lguName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Submitted At</span>
                  <span className="font-medium text-slate-700">
                    {activeSubmission.submittedAt}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase mb-2">
                  Submitted Form Answers
                </h4>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2 text-xs">
                  {Object.entries(activeSubmission.formData).map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-slate-200/60 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-slate-500 font-medium">{k}:</span>
                      <span className="font-bold text-slate-900">{String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update Actions */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase mb-2">
                  Update Application Status
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      onUpdateStatus(activeSubmission.id, 'Approved');
                      setActiveSubmission({ ...activeSubmission, status: 'Approved' });
                    }}
                    className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer border ${
                      activeSubmission.status === 'Approved'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => {
                      onUpdateStatus(activeSubmission.id, 'Under Review');
                      setActiveSubmission({ ...activeSubmission, status: 'Under Review' });
                    }}
                    className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer border ${
                      activeSubmission.status === 'Under Review'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>In Review</span>
                  </button>

                  <button
                    onClick={() => {
                      onUpdateStatus(activeSubmission.id, 'Action Needed');
                      setActiveSubmission({ ...activeSubmission, status: 'Action Needed' });
                    }}
                    className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer border ${
                      activeSubmission.status === 'Action Needed'
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Action Needed</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
