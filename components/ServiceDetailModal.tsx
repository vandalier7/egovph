'use client';

import React, { useState } from 'react';
import { LguService, ServiceSubmission } from '@/types/lgu';
import {
  X,
  Clock,
  Coins,
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  Upload,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';

interface ServiceDetailModalProps {
  service: LguService | null;
  onClose: () => void;
  onSubmissionSuccess: (submission: ServiceSubmission) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSubmissionSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'form' | 'success'>('details');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
  const [lastSubmission, setLastSubmission] = useState<ServiceSubmission | null>(null);

  if (!service) return null;

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleFileUpload = (fieldId: string, fileName: string) => {
    setUploadedFiles((prev) => ({ ...prev, [fieldId]: fileName }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refNo = `EGOV-${service.code}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newSubmission: ServiceSubmission = {
      id: `sub-${Date.now()}`,
      serviceId: service.id,
      serviceCode: service.code,
      serviceTitle: service.title,
      lguName: service.lguName,
      submittedAt: new Date().toLocaleString('en-PH', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      status: 'Pending',
      referenceNo: refNo,
      formData: { ...formData, ...uploadedFiles },
    };

    setLastSubmission(newSubmission);
    onSubmissionSuccess(newSubmission);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl h-full sm:h-auto sm:max-h-[90vh] sm:rounded-[24px] shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            {step === 'form' && (
              <button
                onClick={() => setStep('details')}
                className="p-1 -ml-1 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
              </button>
            )}
            <div>
              <span className="text-[11px] font-bold tracking-wider text-blue-600 uppercase">
                {service.lguName}
              </span>
              <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                {service.code}
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              setStep('details');
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* STEP 1: Details & Instructions */}
          {step === 'details' && (
            <>
              {/* Header Info Card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200/70">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-400 uppercase">
                        Processing Time
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {service.processingTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Coins className="w-4 h-4 text-emerald-600 mt-0.5" />
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-400 uppercase">
                        Application Fee
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {service.fee}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions Checklist */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Instructions & Guidelines
                </h4>
                <ol className="space-y-2.5">
                  {service.instructions.map((inst, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center border border-blue-200">
                        {index + 1}
                      </span>
                      <span className="text-xs text-slate-700 leading-normal pt-0.5">
                        {inst}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Required Documents */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Required Documents
                </h4>
                <div className="space-y-2">
                  {service.requiredDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileCheck2 className="w-4 h-4 text-blue-600" />
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">
                            {doc.title}
                          </span>
                          {doc.description && (
                            <span className="text-[11px] text-slate-400 block">
                              {doc.description}
                            </span>
                          )}
                        </div>
                      </div>
                      {doc.mandatory ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600 border border-red-200/60">
                          REQUIRED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-500">
                          OPTIONAL
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* STEP 2: Interactive Form */}
          {step === 'form' && (
            <form id="service-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-3 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-900 leading-snug">
                  Please fill out the official application fields accurately. All submitted information is transmitted directly to {service.lguName}.
                </p>
              </div>

              {service.fields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    {field.label}{' '}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>

                  {field.type === 'text' && (
                    <input
                      type="text"
                      required={field.required}
                      placeholder={field.placeholder}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full bg-white text-slate-900 text-sm font-medium rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-blue-600"
                    />
                  )}

                  {field.type === 'number' && (
                    <input
                      type="number"
                      required={field.required}
                      placeholder={field.placeholder}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full bg-white text-slate-900 text-sm font-medium rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-blue-600"
                    />
                  )}

                  {field.type === 'textarea' && (
                    <textarea
                      rows={3}
                      required={field.required}
                      placeholder={field.placeholder}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full bg-white text-slate-900 text-sm font-medium rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-blue-600"
                    />
                  )}

                  {field.type === 'select' && (
                    <select
                      required={field.required}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full bg-white text-slate-900 text-sm font-medium rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-blue-600 cursor-pointer"
                    >
                      <option value="">Select option...</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.type === 'date' && (
                    <input
                      type="date"
                      required={field.required}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full bg-white text-slate-900 text-sm font-medium rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-blue-600"
                    />
                  )}

                  {field.type === 'file' && (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center bg-slate-50 hover:bg-white transition-colors">
                      <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1.5" />
                      <span className="block text-xs font-semibold text-slate-700">
                        {uploadedFiles[field.id] || 'Click to select or drop file here'}
                      </span>
                      {field.helpText && (
                        <span className="block text-[11px] text-slate-400 mt-1">
                          {field.helpText}
                        </span>
                      )}
                      <input
                        type="file"
                        required={field.required && !uploadedFiles[field.id]}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(field.id, file.name);
                        }}
                        className="hidden"
                        id={`file-${field.id}`}
                      />
                      <label
                        htmlFor={`file-${field.id}`}
                        className="mt-2.5 inline-block px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
                      >
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </form>
          )}

          {/* STEP 3: Submission Success */}
          {step === 'success' && lastSubmission && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-50">
                <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Application Submitted!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your application for {service.code} has been recorded by {service.lguName}.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-xs text-slate-400 font-medium">Reference Number</span>
                  <span className="text-sm font-extrabold text-blue-600 font-mono">
                    {lastSubmission.referenceNo}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1 text-xs">
                  <span className="text-slate-500">Status</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                    {lastSubmission.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Submitted On</span>
                  <span className="font-semibold text-slate-800">{lastSubmission.submittedAt}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 bg-white border-t border-slate-100">
          {step === 'details' && (
            <button
              onClick={() => setStep('form')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>Apply For Service</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {step === 'form' && (
            <button
              type="submit"
              form="service-form"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Submit Official Form</span>
            </button>
          )}

          {step === 'success' && (
            <button
              onClick={() => {
                setStep('details');
                onClose();
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-base font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all cursor-pointer"
            >
              Done & Return to List
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
