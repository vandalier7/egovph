'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { P, Y, W, SF, SF2, TXT, MT, BR } from '@/lib/theme'
import { SERVICES } from '@/lib/data'
import { StatusBar, BackBtn } from '@/components/shared/UIComponents'
import FormRenderer from '@/components/forms/FormRenderer'

export default function CitizenFormPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const service = SERVICES.find((s) => s.id === Number(id))

  if (!service) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          padding: '48px 20px',
          textAlign: 'center',
          color: MT,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: SF,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: 24,
          }}
        >
          🔍
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.6 }}>
          Service not found. It may have been removed or the link is incorrect.
        </p>
      </div>
    )
  }

  function submitApplication(data: Record<number, any>) {
    // console.log({
    //   serviceId: service.id,
    //   answers: data,
    // })
    alert('Submitted!')
  }

  return (
    <div style={{ flex: 1, background: W, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(150deg, ${P} 0%, #0030AE 100%)`,
          padding: '16px 20px 20px',
          flexShrink: 0,
        }}
      >
        <StatusBar />
        <BackBtn onBack={() => router.back()} />
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.09em',
            color: Y,
            textTransform: 'uppercase',
            margin: '0 0 4px',
          }}
        >
          Application
        </p>
        <h1
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: W,
            lineHeight: 1.3,
            margin: '0 0 6px',
          }}
        >
          {service.name}
        </h1>
        <p
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.70)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {service.description}
        </p>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Summary card */}
        <div style={{ padding: '16px 16px 0' }}>
          <div
            style={{
              background: W,
              border: `1.5px solid ${BR}`,
              borderRadius: 12,
              padding: '14px 16px',
              marginBottom: 4,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: service.requirements?.length ? 10 : 0 }}>
              <div>
                <p style={{ fontSize: 10, color: MT, margin: '0 0 3px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Processing Time
                </p>
                <p style={{ fontSize: 13, color: TXT, fontWeight: 600, margin: 0 }}>
                  {service.processing}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 10, color: MT, margin: '0 0 3px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Fee
                </p>
                <p style={{ fontSize: 13, color: TXT, fontWeight: 600, margin: 0 }}>
                  {service.fee}
                </p>
              </div>
            </div>

            {service.requirements?.length > 0 && (
              <div style={{ borderTop: `1px solid ${BR}`, paddingTop: 10 }}>
                <p style={{ fontSize: 10, color: MT, margin: '0 0 6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Requirements
                </p>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {service.requirements.map((req, i) => (
                    <li key={i} style={{ fontSize: 12, color: TXT, lineHeight: 1.7 }}>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <FormRenderer blocks={service.formBlocks} onSubmit={submitApplication} />
      </div>
    </div>
  )
}