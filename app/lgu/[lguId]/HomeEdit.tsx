import { useState } from 'react'
import { P, W, SF, SF2, TXT, MT, BR, OK, ER } from '@/lib/theme'
import type { LGU, Service } from '@/lib/types'

interface LGUProgramEditProps {
  lgu: LGU
  services: Service[]
  onGoToFormEdit: (service: Service) => void
}

export default function LGUProgramEdit({
  lgu,
  services,
  onGoToFormEdit,
}: LGUProgramEditProps) {
  const [name, setName] = useState(lgu.programName)

  const [desc, setDesc] = useState(lgu.description)

  const [svcs, setSvcs] = useState(
    services.map((s) => ({
      ...s,
      enabled: true,
    }))
  )
  const [saved, setSaved] = useState(false)

  return (
    <div style={{ flex: 1, background: SF2, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: P, padding: '16px 20px 14px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.60)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              LGU Admin · {lgu.lguName}
            </p>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: W, margin: '3px 0 0' }}>Program Editor</h2>
          </div>
          <span style={{ background: '#FEF3C7', color: '#B45309', fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Draft
          </span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {/* Program Info Card */}
        <div style={{ background: W, borderRadius: 12, padding: 16, marginBottom: 12, border: `1.5px solid ${BR}` }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: MT, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 14px' }}>Program Information</p>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: TXT, display: 'block', marginBottom: 6 }}>
              Program Name <span style={{ color: ER }}>*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${BR}`, borderRadius: 8, fontSize: 13, color: TXT, outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: TXT, display: 'block', marginBottom: 6 }}>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${BR}`, borderRadius: 8, fontSize: 13, color: TXT, outline: 'none', resize: 'none' }}
            />
          </div>
        </div>

        {/* Services Card */}
        <div style={{ background: W, borderRadius: 12, padding: 16, marginBottom: 12, border: `1.5px solid ${BR}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: MT, textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>Services ({svcs.length})</p>
            <button style={{ fontSize: 12, fontWeight: 700, color: P, background: SF, border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer' }}>+ Add Service</button>
          </div>
          {svcs.map((svc, i) => (
            <div key={svc.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < svcs.length - 1 ? `1px solid ${BR}` : 'none' }}>
              <input
                type="checkbox"
                checked={svc.enabled}
                onChange={() => setSvcs((p) => p.map((s, j) => (j === i ? { ...s, enabled: !s.enabled } : s)))}
                style={{ width: 16, height: 16, accentColor: P, cursor: 'pointer' }}
              />
              <span style={{ flex: 1, fontSize: 13, fontWeight: svc.enabled ? 600 : 400, color: svc.enabled ? TXT : MT }}>{svc.name}</span>
              <button
                onClick={() => onGoToFormEdit(svc)}
                style={{ fontSize: 11, color: P, background: SF, border: 'none', borderRadius: 6, padding: '4px 9px', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}
              >
                Edit Form
              </button>
            </div>
          ))}
        </div>

        {/* Review Notes */}
        <div style={{ background: W, borderRadius: 12, padding: 16, marginBottom: 14, border: `1.5px solid ${BR}` }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: MT, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 12px' }}>Publication Checklist</p>
          {[
            { label: 'Program name and description set', done: name.length > 0 && desc.length > 0 },
            { label: 'At least one service enabled', done: svcs.some((s) => s.enabled) },
            { label: 'All service forms configured', done: false },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: i < 2 ? 8 : 0 }}>
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: item.done ? '#D1FAE5' : SF2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  color: item.done ? OK : '#CBCED4',
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {item.done ? '✓' : '○'}
              </span>
              <span style={{ fontSize: 12, color: item.done ? TXT : MT }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => {
              setSaved(true)
              setTimeout(() => setSaved(false), 2000)
            }}
            style={{ flex: 1, padding: '12px', background: W, border: `1.5px solid ${BR}`, borderRadius: 10, color: saved ? OK : MT, fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'color 0.2s' }}
          >
            {saved ? '✓ Saved' : 'Save Draft'}
          </button>
          <button style={{ flex: 2, padding: '12px', background: P, border: 'none', borderRadius: 10, color: W, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            Submit for Review →
          </button>
        </div>
      </div>
    </div>
  )
}