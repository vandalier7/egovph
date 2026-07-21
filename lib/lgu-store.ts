import { LguService } from '@/types/lgu';
import { MOCK_SERVICES } from './lgu-data';

const STORAGE_KEY = 'egov_lgu_services_v2';

export function getStoredServices(): LguService[] {
  if (typeof window === 'undefined') return MOCK_SERVICES;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const stored: LguService[] = JSON.parse(data);
      // Merge any default mock services that aren't in stored memory yet
      const missing = MOCK_SERVICES.filter(
        (mock) => !stored.some((s) => s.id === mock.id)
      );
      if (missing.length > 0) {
        const merged = [...stored, ...missing];
        saveStoredServices(merged);
        return merged;
      }
      return stored;
    }
  } catch (e) {
    console.error('Failed to load services from storage', e);
  }
  return MOCK_SERVICES;
}

export function saveStoredServices(services: LguService[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    window.dispatchEvent(new Event('egov_services_updated'));
  } catch (e) {
    console.error('Failed to save services to storage', e);
  }
}

export function saveSingleService(updated: LguService): LguService[] {
  const current = getStoredServices();
  const index = current.findIndex((s) => s.id === updated.id);
  let next: LguService[];
  if (index >= 0) {
    next = current.map((s) => (s.id === updated.id ? updated : s));
  } else {
    next = [...current, updated];
  }
  saveStoredServices(next);
  return next;
}
