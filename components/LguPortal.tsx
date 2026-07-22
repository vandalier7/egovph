'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MobileHeader } from './MobileHeader';
import { LguTabs, LguTab } from './LguTabs';
import { SearchBar } from './SearchBar';
import { LocationFilter } from './LocationFilter';
import { ServiceCard } from './ServiceCard';
import { ServiceDetailModal } from './ServiceDetailModal';
import { SubmissionsDrawer } from './SubmissionsDrawer';
import { MOCK_USER_JURISDICTION } from '@/lib/lgu-data';
import { getStoredServices } from '@/lib/lgu-store';
import { LguService, ServiceSubmission } from '@/types/lgu';
import { FileText } from 'lucide-react';

export default function LguPortal() {
  const [servicesList, setServicesList] = useState<LguService[]>([]);
  const [activeTab, setActiveTab] = useState<LguTab>('your_lgu');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');

  const [selectedService, setSelectedService] = useState<LguService | null>(null);
  const [submissions, setSubmissions] = useState<ServiceSubmission[]>([]);
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);

  // Load and listen for real-time service updates from LGU Admin builder
  useEffect(() => {
    const syncServices = () => {
      setServicesList(getStoredServices());
    };
    syncServices();

    window.addEventListener('egov_services_updated', syncServices);
    window.addEventListener('storage', syncServices);
    return () => {
      window.removeEventListener('egov_services_updated', syncServices);
      window.removeEventListener('storage', syncServices);
    };
  }, []);

  // Filter logic
  const filteredServices = useMemo(() => {
    return servicesList.filter((srv) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = srv.title.toLowerCase().includes(q);
        const matchesCode = srv.code.toLowerCase().includes(q);
        const matchesLgu = srv.lguName.toLowerCase().includes(q);
        const matchesDesc = srv.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCode && !matchesLgu && !matchesDesc) {
          return false;
        }
      }

      // 2. Tab Filter
      if (activeTab === 'your_lgu') {
        const isUserProvince = srv.province === MOCK_USER_JURISDICTION.province;
        const isUserCity = srv.cityOrMuni === MOCK_USER_JURISDICTION.cityOrMuni;
        return isUserProvince && isUserCity;
      } else {
        // "Other LGUs" Location Filter Dropdowns
        if (selectedProvince && srv.province !== selectedProvince) {
          return false;
        }
        if (selectedCity && srv.cityOrMuni !== selectedCity) {
          return false;
        }
        if (selectedBarangay && srv.barangay !== selectedBarangay) {
          return false;
        }
        return true;
      }
    });
  }, [servicesList, activeTab, searchQuery, selectedProvince, selectedCity, selectedBarangay]);

  const handleResetLocationFilter = () => {
    setSelectedProvince('');
    setSelectedCity('');
    setSelectedBarangay('');
  };

  const handleSubmissionSuccess = (newSub: ServiceSubmission) => {
    setSubmissions((prev) => [newSub, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start antialiased font-sans sm:py-6 sm:px-4 select-none">
      {/* Mobile Device Frame Container (Desktop view centered, mobile view full-width) */}
      <div className="w-full max-w-[430px] bg-white min-h-[92vh] sm:rounded-[36px] sm:shadow-2xl border-0 sm:border sm:border-slate-200/80 flex flex-col overflow-hidden relative">
        {/* Header */}
        <MobileHeader
          title="LGU"
          onBackClick={() => alert('Navigating back to main eGovPH dashboard')}
          onCreateProgramClick={() => {
            // TODO: wire this up
          }}
        />

        {/* Scrollable Content Container */}
        <main className="flex-1 px-5 pb-8 overflow-y-auto">
          {/* Title & Subtitle + Tab Switcher */}
          <LguTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            userJurisdictionText={`${MOCK_USER_JURISDICTION.cityOrMuni}, ${MOCK_USER_JURISDICTION.province}`}
          />

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search services"
          />

          {/* Location Filter (only on "Other LGUs" tab) */}
          {activeTab === 'other_lgus' && (
            <LocationFilter
              selectedProvince={selectedProvince}
              selectedCity={selectedCity}
              selectedBarangay={selectedBarangay}
              onProvinceChange={setSelectedProvince}
              onCityChange={setSelectedCity}
              onBarangayChange={setSelectedBarangay}
              onReset={handleResetLocationFilter}
            />
          )}

          {/* Section Header: List of Services */}
          <div className="flex items-center justify-between mt-5 mb-3 px-0.5">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              List of Services
            </h3>
            {submissions.length > 0 && (
              <button
                onClick={() => setIsSubmissionsOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>My Applications ({submissions.length})</span>
              </button>
            )}
          </div>

          {/* Services List */}
          {filteredServices.length === 0 ? (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[20px] p-8 text-center my-4">
              <p className="text-sm font-semibold text-slate-600">No services found</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for another keyword or clearing location filters.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onClick={setSelectedService}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Service Detail / Form Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSubmissionSuccess={handleSubmissionSuccess}
      />

      {/* Submissions Drawer */}
      <SubmissionsDrawer
        isOpen={isSubmissionsOpen}
        onClose={() => setIsSubmissionsOpen(false)}
        submissions={submissions}
      />
    </div>
  );
}