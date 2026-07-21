'use client'

import { useState } from 'react'
import { P, Y, W, SF, SF2, TXT, MT, BR, NU } from '@/lib/theme'
import type { LGU } from '@/lib/types'
import { MY_LGUS, PROVINCES, CITIES, BRGYS } from '@/lib/data'
import { LevelBadge, StatusBar } from '@/components/shared/UIComponents'

export function ProgramCard({ lgu, onPress, dimmed = false }: { lgu: LGU; onPress: () => void; dimmed?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onPress}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        background: W,
        border: `1.5px solid ${hovered ? P : BR}`,
        borderRadius: 12,
        padding: '14px 16px',
        marginBottom: 11,
        textAlign: 'left',
        cursor: 'pointer',
        display: 'block',
        position: 'relative',
        boxShadow: hovered ? '0 6px 20px rgba(0,64,231,0.12)' : 'none',
        transition: 'all 0.18s',
      }}
    >
      {lgu.isNew && (
        <span style={{ position: 'absolute', top: 12, right: 12, background: Y, color: TXT, fontSize: 8, fontWeight: 800, padding: '2px 7px', borderRadius: 4, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
          NEW
        </span>
      )}
      <div style={{ marginBottom: 7 }}>
        <LevelBadge level={lgu.level} />
      </div>
      <p style={{ fontSize: 10, color: MT, margin: '0 0 3px' }}>{lgu.lguName}</p>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: dimmed ? MT : TXT, lineHeight: 1.35, margin: '0 0 10px' }}>{lgu.programName}</h3>
      <span style={{ fontSize: 12, color: P, fontWeight: 600 }}>{lgu.services} available services →</span>
    </button>
  )
}

export default function CitizenHome({ onSelectProgram }: { onSelectProgram: (id: number) => void }) {
  const [tab, setTab] = useState<'yours' | 'other'>('yours')
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [brgy, setBrgy] = useState('')

const otherResults = province
  ? MY_LGUS.filter((program) => {
      // Must belong to selected province
      if (program.province !== province) return false

      // Province only
      if (!city) {
        return program.level === 'Provincial'
      }

      // Province + City
      if (!brgy) {
        return (
          program.level === 'Provincial' ||
          (
            program.level === 'City/Municipal' &&
            program.city === city
          )
        )
      }

      // Province + City + Barangay
      return (
        program.level === 'Provincial' ||
        (
          program.level === 'City/Municipal' &&
          program.city === city
        ) ||
        (
          program.level === 'Barangay' &&
          program.city === city &&
          program.barangay === brgy
        )
      )
    })
  : []

    const myResults = MY_LGUS.filter((program) => {
    return (
        program.province === 'Metro Manila' &&
        (
        program.city === 'Caloocan' ||
        program.level === 'Provincial'
        )
    )
    })

  return (
    <div style={{ flex: 1, background: W, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(150deg, ${P} 0%, #0030AE 100%)`, padding: '16px 20px 0', flexShrink: 0 }}>
        <StatusBar />
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', color: Y, textTransform: 'uppercase', margin: '0 0 4px' }}>eGovPH</p>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: W, lineHeight: 1.2, margin: '0 0 4px' }}>
          Local Government
          <br />
          Services
        </h1>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.70)', margin: '0 0 16px', lineHeight: 1.5 }}>Access programs and services from your LGUs</p>
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.18)' }}>
          {(['yours', 'other'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: '10px 0',
                background: 'none',
                border: 'none',
                color: W,
                fontWeight: tab === t ? 700 : 400,
                fontSize: 13,
                cursor: 'pointer',
                opacity: tab === t ? 1 : 0.6,
                borderBottom: tab === t ? `3px solid ${Y}` : '3px solid transparent',
                transition: 'all 0.18s',
              }}
            >
              {t === 'yours' ? 'Your LGUs' : 'Other LGUs'}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
        {tab === 'yours' ? (
          <>
            <p style={{ fontSize: 11, color: MT, marginBottom: 14 }}>
              Based on your location: <strong style={{ color: TXT }}>Brgy. 176, Caloocan, Metro Manila</strong>
            </p>
            {myResults.map((lgu: LGU) => (
            <ProgramCard 
                key={lgu.id} 
                lgu={lgu} 
                onPress={() => onSelectProgram(lgu.id)} 
            />
            ))}
          </>
        ) : (
          <>
            {/* Dropdowns */}
            {[
              { label: 'Province', value: province, options: PROVINCES, onChange: (v: string) => { setProvince(v); setCity(''); setBrgy('') }, disabled: false },
              { label: 'City / Municipality', value: city, options: province ? CITIES[province] ?? [] : [], onChange: (v: string) => { setCity(v); setBrgy('') }, disabled: !province },
              { label: 'Barangay', value: brgy, options: city ? BRGYS[city] ?? [] : [], onChange: (v: string) => setBrgy(v), disabled: !city },
            ].map((dd) => (
              <div key={dd.label} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 10, fontWeight: 700, color: MT, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 5 }}>{dd.label}</label>
                <select
                  value={dd.value}
                  onChange={(e) => dd.onChange(e.target.value)}
                  disabled={dd.disabled}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1.5px solid ${dd.disabled ? NU : BR}`,
                    borderRadius: 8,
                    fontSize: 13,
                    color: dd.value ? TXT : MT,
                    background: dd.disabled ? SF2 : W,
                    outline: 'none',
                    cursor: dd.disabled ? 'not-allowed' : 'pointer',
                    appearance: 'none',
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\'%3E%3Cpath d=\'M0 0l5 6 5-6z\' fill=\'%2364748B\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                  }}
                >
                  <option value="">Select {dd.label.toLowerCase()}…</option>
                  {dd.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}

            {province && (
              <>
                <p style={{ fontSize: 11, color: MT, margin: '4px 0 12px' }}>
                  Results for: <strong style={{ color: TXT }}>{[province, city, brgy].filter(Boolean).join(' › ')}</strong>
                </p>
                {otherResults.map((lgu) => (
                  <ProgramCard key={lgu.id} lgu={lgu} onPress={() => onSelectProgram(lgu.id)} dimmed />
                ))}
              </>
            )}

            {!province && (
              <div style={{ textAlign: 'center', padding: '48px 20px 0', color: MT }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: SF, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 24 }}>🗺</div>
                <p style={{ fontSize: 13, lineHeight: 1.6 }}>Select a province above to browse LGU programs in that area.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}