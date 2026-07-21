export type LguLevel = 'provincial' | 'municipal' | 'barangay';

export interface LguLocation {
  province: string;
  cityOrMuni?: string;
  barangay?: string;
}

export interface LguInfo {
  id: string;
  name: string;
  level: LguLevel;
  province: string;
  cityOrMuni?: string;
  barangay?: string;
  logoUrl?: string;
  bgBannerUrl?: string;
}

export interface RequiredDocument {
  id: string;
  title: string;
  description?: string;
  mandatory: boolean;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'file' | 'textarea' | 'checkbox';
  placeholder?: string;
  required: boolean;
  options?: string[];
  helpText?: string;
}

export interface LguService {
  id: string;
  code: string; // e.g. 'FSIS', 'RPTAX', 'BPLO'
  title: string; // e.g. 'Fire Safety Inspection System'
  lguId: string;
  lguName: string;
  province: string;
  cityOrMuni?: string;
  barangay?: string;
  category: string;
  description: string;
  processingTime: string;
  fee: string;
  iconBgColor: string;
  iconText: string;
  logoBadge?: string;
  instructions: string[];
  requiredDocs: RequiredDocument[];
  fields: FormField[];
}

export interface ServiceSubmission {
  id: string;
  serviceId: string;
  serviceCode: string;
  serviceTitle: string;
  lguName: string;
  submittedAt: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Action Needed';
  referenceNo: string;
  formData: Record<string, any>;
}
