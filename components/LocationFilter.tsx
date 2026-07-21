'use client';

import React from 'react';
import { PHILIPPINES_LOCATIONS } from '@/lib/lgu-data';
import { MapPin, ChevronDown, FilterX } from 'lucide-react';

interface LocationFilterProps {
  selectedProvince: string;
  selectedCity: string;
  selectedBarangay: string;
  onProvinceChange: (prov: string) => void;
  onCityChange: (city: string) => void;
  onBarangayChange: (brgy: string) => void;
  onReset: () => void;
}

export const LocationFilter: React.FC<LocationFilterProps> = ({
  selectedProvince,
  selectedCity,
  selectedBarangay,
  onProvinceChange,
  onCityChange,
  onBarangayChange,
  onReset,
}) => {
  // Find current province cities
  const provinceObj = PHILIPPINES_LOCATIONS.provinces.find(
    (p) => p.name === selectedProvince
  );
  const cities = provinceObj ? provinceObj.cities : [];

  // Find current city barangays
  const cityObj = cities.find((c) => c.name === selectedCity);
  const barangays = cityObj ? cityObj.barangays : [];

  const isFiltered = selectedProvince || selectedCity || selectedBarangay;

  return (
    <div className="bg-slate-50/80 rounded-[18px] border border-slate-200/80 p-4 mb-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 tracking-wide uppercase">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>Filter LGU Jurisdiction</span>
        </div>
        {isFiltered && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <FilterX className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Province Select */}
        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1 pl-1">
            PROVINCE
          </label>
          <div className="relative">
            <select
              value={selectedProvince}
              onChange={(e) => {
                onProvinceChange(e.target.value);
                onCityChange('');
                onBarangayChange('');
              }}
              className="w-full bg-white text-slate-900 text-sm font-medium rounded-xl border border-slate-200 py-2.5 pl-3 pr-8 appearance-none focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              <option value="">All Provinces</option>
              {PHILIPPINES_LOCATIONS.provinces.map((prov) => (
                <option key={prov.name} value={prov.name}>
                  {prov.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* City/Municipality Select */}
        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1 pl-1">
            CITY / MUNICIPALITY
          </label>
          <div className="relative">
            <select
              value={selectedCity}
              disabled={!selectedProvince}
              onChange={(e) => {
                onCityChange(e.target.value);
                onBarangayChange('');
              }}
              className="w-full bg-white text-slate-900 text-sm font-medium rounded-xl border border-slate-200 py-2.5 pl-3 pr-8 appearance-none focus:outline-none focus:border-blue-600 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed cursor-pointer"
            >
              <option value="">All Cities / Municipalities</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Barangay Select */}
        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1 pl-1">
            BARANGAY
          </label>
          <div className="relative">
            <select
              value={selectedBarangay}
              disabled={!selectedCity}
              onChange={(e) => onBarangayChange(e.target.value)}
              className="w-full bg-white text-slate-900 text-sm font-medium rounded-xl border border-slate-200 py-2.5 pl-3 pr-8 appearance-none focus:outline-none focus:border-blue-600 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed cursor-pointer"
            >
              <option value="">All Barangays</option>
              {barangays.map((brgy) => (
                <option key={brgy} value={brgy}>
                  {brgy}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
