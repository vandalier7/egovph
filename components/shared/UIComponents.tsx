'use client'

import { P, W, OK, ER, MT } from '@/lib/theme'
import type { LGULevel, SubmissionStatus } from '@/lib/types'

const LEVEL_STYLES: Record<LGULevel, { bg: string; color: string }> = {
  Barangay: { bg: '#EFF3FC', color: P },
  'City/Municipal': { bg: '#FEF3C7', color: '#B45309' },
  Provincial: { bg: '#D1FAE5', color: OK },
}

export function LevelBadge({ level }: { level: LGULevel }) {
  const s = LEVEL_STYLES[level] ?? LEVEL_STYLES.Barangay
  return (
    <span
      style={{
        display: 'inline-block',
        background: s.bg,
        color: s.color,
        fontSize: 9,
        fontWeight: 800,
        padding: '3px 8px',
        borderRadius: 5,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
    >
      {level}
    </span>
  )
}

// Decorative mobile status bar shown at the top of every phone-frame screen.
export function StatusBar() {
  return <></>
  (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: W,
        fontSize: 12,
        fontWeight: 600,
        marginBottom: 10,
      }}
    >
      <span>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span>📶</span>
        <span>📡</span>
        <span>🔋</span>
      </div>
    </div>
  )
}

export function BackBtn({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      aria-label="Go back"
      style={{
        background: 'rgba(255,255,255,0.16)',
        border: 'none',
        borderRadius: 8,
        width: 30,
        height: 30,
        color: W,
        fontSize: 15,
        cursor: 'pointer',
        marginBottom: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      ←
    </button>
  )
}

const STATUS_STYLES: Record<SubmissionStatus, { bg: string; color: string; label: string }> = {
  pending: { bg: '#FEF3C7', color: '#B45309', label: 'Pending' },
  approved: { bg: '#D1FAE5', color: OK, label: 'Approved' },
  rejected: { bg: '#FEE2E2', color: ER, label: 'Rejected' },
}

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status as SubmissionStatus] ?? STATUS_STYLES.pending
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 10,
        fontWeight: 800,
        padding: '4px 9px',
        borderRadius: 6,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
      }}
    >
      {s.label}
    </span>
  )
}

// Add to your ui comps file

export function FieldWrapper({
  label,
  required,
  children,
}: {
  label?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 6 }}>
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: 10,
            fontWeight: 700,
            color: MT,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 6,
          }}
        >
          {label}
          {required && <span style={{ color: ER }}>{' '}*</span>}
        </label>
      )}
      {children}
    </div>
  )
}