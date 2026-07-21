'use client'

import { useRouter } from 'next/navigation'
import { P, W, SF2, TXT, MT, BR, OK } from '@/lib/theme'
import type { LGU } from '@/lib/types'
import { SERVICES } from '@/lib/data'
import { LevelBadge, StatusBar, BackBtn } from '@/components/shared/UIComponents'

export default function CitizenProgram({
  program,
}: {
  program: LGU
}) {
  const router = useRouter()

  const onBack = () => {
    router.back()
  }

  const onSelectService = (id: number) => {
    router.push(`/client/services/${id}`)
  }

  return (
    <div style={{ flex: 1, background: SF2, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: `linear-gradient(150deg, ${P} 0%, #0030AE 100%)`, padding: '16px 20px 22px', flexShrink: 0 }}>
        <StatusBar />
        <BackBtn onBack={onBack} />

        <div style={{ marginBottom: 6 }}>
          <LevelBadge level={program.level} />
        </div>

        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', margin: '6px 0 2px' }}>
          {program.lguName}
        </p>

        <h1 style={{ fontSize: 19, fontWeight: 800, color: W, lineHeight: 1.3, margin: '0 0 8px' }}>
          {program.programName}
        </h1>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)', lineHeight: 1.55, margin: 0 }}>
          {program.description}
        </p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {/* <p style={{ fontSize: 10, fontWeight: 700, color: MT, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 12px' }}>
          Available Services ({SERVICES.length})
        </p> */}

        {SERVICES
          .filter((svc) => svc.lguId === program.id)
          .map((svc) => (
          <div
            key={svc.id}
            style={{
              background: W,
              border: `1.5px solid ${BR}`,
              borderRadius: 12,
              padding: '14px 16px',
              marginBottom: 10,
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 700, color: TXT, margin: '0 0 6px' }}>
              {svc.name}
            </h3>

            <p style={{ fontSize: 12, color: MT, lineHeight: 1.55, margin: '0 0 10px' }}>
              {svc.description}
            </p>

            <div style={{ display: 'flex', gap: 20, marginBottom: 12 }}>
              <div>
                <span style={{ fontSize: 9, fontWeight: 700, color: MT }}>
                  Processing
                </span>
                <p style={{ fontSize: 12, fontWeight: 600, color: TXT }}>
                  {svc.processing}
                </p>
              </div>

              <div>
                <span style={{ fontSize: 9, fontWeight: 700, color: MT }}>
                  Fee
                </span>
                <p style={{ fontSize: 12, fontWeight: 700, color: OK }}>
                  {svc.fee}
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectService(svc.id)}
              style={{
                width: '100%',
                padding: '10px',
                background: P,
                border: 'none',
                borderRadius: 8,
                color: W,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}