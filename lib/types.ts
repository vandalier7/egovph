export type LGULevel = 'Barangay' | 'City/Municipal' | 'Provincial'

// A published LGU Program, as it appears in the citizen-facing tabs.
export interface LGU {
  id: number
  level: 'Barangay' | 'City/Municipal' | 'Provincial'

  province: string
  city?: string
  barangay?: string

  lguName: string
  programName: string
  description: string
  services: number
  isNew?: boolean
}

export interface Service {
  id: number
  lguId: number

  name: string
  description: string
  requirements: string[]
  processing: string
  fee: string

  formBlocks: FormBlock[]
}


export type FormBlockType =
  | 'instruction'
  | 'text'
  | 'number'
  | 'date'
  | 'file'
  | 'select'
  | 'checkbox'


export interface FormBlock {
  id: number
  type: FormBlockType

  label?: string
  placeholder?: string

  required?: boolean

  options?: string[]

  accept?: string // for files

  content?: string // instructions
}

// A single block in the LGU Form Builder (instructions or a field).
export interface FormBlock {
  id: number
  type: FormBlockType // 'instruction' | 'text' | 'textarea' | 'date' | 'file' | 'select' | 'checkbox'
  label?: string
  content?: string // used when type === 'instruction'
  required?: boolean
  placeholder?: string
}

// A field type available in the "Add Field" panel of the Form Builder.
export interface BlockTypeDef {
  type: FormBlockType
  label: string
  icon: string
}

export type SubmissionStatus = 'pending' | 'approved' | 'rejected'

// A citizen's submitted application, as seen by LGU staff.
export interface SubmissionResponse {
  id: string
  name: string
  date: string
  service: string
  status: SubmissionStatus
}