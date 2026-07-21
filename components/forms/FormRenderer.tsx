'use client'

import { useState } from 'react'
import { P, Y, W, SF, SF2, TXT, MT, BR, NU, ER } from '@/lib/theme'
import type { FormBlock } from '@/lib/types'

export default function FormRenderer({
  blocks,
  onSubmit,
}: {
  blocks: FormBlock[]
  onSubmit: (data: Record<number, any>) => void
}) {
  const [values, setValues] = useState<Record<number, any>>({})
  const [hovered, setHovered] = useState<number | null>(null)
  const [focused, setFocused] = useState<number | null>(null)

  function updateValue(id: number, value: any) {
    setValues((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  function cardStyle(id: number) {
    const active = focused === id || hovered === id
    return {
      width: '100%',
      background: W,
      border: `1.5px solid ${active ? P : BR}`,
      borderRadius: 12,
      padding: '14px 16px',
      marginBottom: 11,
      position: 'relative' as const,
      boxShadow: active ? '0 6px 20px rgba(0,64,231,0.12)' : 'none',
      transition: 'all 0.18s',
      boxSizing: 'border-box' as const,
    }
  }

  const inputStyle = {
    width: '100%',
    background: W,
    border: 'none',
    borderRadius: 8,
    padding: '10px 0 0',
    fontSize: 13,
    color: TXT,
    outline: 'none',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
  }

  const labelStyle = {
    fontSize: 10,
    fontWeight: 700,
    color: MT,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    margin: 0,
    display: 'block',
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(values)
      }}
      style={{
        background: SF2,
        padding: 16,
        minHeight: '100%',
      }}
    >
      {blocks.map((block) => {
        switch (block.type) {
          case 'instruction':
            return (
              <div
                key={block.id}
                style={{
                  background: SF,
                  border: `1.5px solid ${P}22`,
                  borderRadius: 12,
                  padding: '14px 16px',
                  marginBottom: 11,
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: TXT,
                }}
              >
                <span style={{ fontSize: 14, lineHeight: 1.4 }}>ℹ️</span>
                <span>{block.content}</span>
              </div>
            )

          case 'text':
            return (
              <div
                key={block.id}
                onMouseEnter={() => setHovered(block.id)}
                onMouseLeave={() => setHovered(null)}
                style={cardStyle(block.id)}
              >
                {block.required && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: `${ER}14`,
                      color: ER,
                      fontSize: 8,
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: 4,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Required
                  </span>
                )}
                <p style={{ ...labelStyle, marginBottom: 2 }}>{block.label}</p>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder={block.placeholder}
                  value={values[block.id] ?? ''}
                  onFocus={() => setFocused(block.id)}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => updateValue(block.id, e.target.value)}
                />
              </div>
            )

          case 'date':
            return (
              <div
                key={block.id}
                onMouseEnter={() => setHovered(block.id)}
                onMouseLeave={() => setHovered(null)}
                style={cardStyle(block.id)}
              >
                {block.required && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: `${ER}14`,
                      color: ER,
                      fontSize: 8,
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: 4,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Required
                  </span>
                )}
                <p style={{ ...labelStyle, marginBottom: 2 }}>{block.label}</p>
                <input
                  style={inputStyle}
                  type="date"
                  value={values[block.id] ?? ''}
                  onFocus={() => setFocused(block.id)}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => updateValue(block.id, e.target.value)}
                />
              </div>
            )

          case 'select':
            return (
              <div
                key={block.id}
                onMouseEnter={() => setHovered(block.id)}
                onMouseLeave={() => setHovered(null)}
                style={cardStyle(block.id)}
              >
                <p style={{ ...labelStyle, marginBottom: 6 }}>
                  {block.label}
                  {block.required && <span style={{ color: ER }}>{' '}*</span>}
                </p>
                <select
                  value={values[block.id] ?? ''}
                  onFocus={() => setFocused(block.id)}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => updateValue(block.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 30px 10px 0',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 13,
                    color: values[block.id] ? TXT : MT,
                    background: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2364748B'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center',
                  }}
                >
                  <option value="">Select {block.label}</option>
                  {block.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            )

          case 'file':
            return (
              <div
                key={block.id}
                onMouseEnter={() => setHovered(block.id)}
                onMouseLeave={() => setHovered(null)}
                style={cardStyle(block.id)}
              >
                <p style={{ ...labelStyle, marginBottom: 8 }}>
                  {block.label}
                  {block.required && <span style={{ color: ER }}>{' '}*</span>}
                </p>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: `1.5px dashed ${NU}`,
                    borderRadius: 8,
                    padding: '10px 12px',
                    fontSize: 12,
                    color: MT,
                    cursor: 'pointer',
                    background: SF2,
                  }}
                >
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '75%',
                    }}
                  >
                    {values[block.id]?.name ?? 'Choose a file...'}
                  </span>
                  <span
                    style={{
                      background: P,
                      color: W,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '5px 10px',
                      borderRadius: 6,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Browse
                  </span>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onFocus={() => setFocused(block.id)}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => updateValue(block.id, e.target.files?.[0])}
                  />
                </label>
              </div>
            )

          case 'checkbox':
            return (
              <div
                key={block.id}
                onMouseEnter={() => setHovered(block.id)}
                onMouseLeave={() => setHovered(null)}
                style={cardStyle(block.id)}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    color: TXT,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <span
                    onClick={() => updateValue(block.id, !values[block.id])}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      border: `1.5px solid ${values[block.id] ? P : BR}`,
                      background: values[block.id] ? P : W,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 120ms ease',
                    }}
                  >
                    {values[block.id] && (
                      <span style={{ color: W, fontSize: 11, fontWeight: 900 }}>✓</span>
                    )}
                  </span>
                  {block.label}
                </label>
              </div>
            )

          default:
            return null
        }
      })}

      <button
        type="submit"
        style={{
          width: '100%',
          background: P,
          color: W,
          border: 'none',
          borderRadius: 10,
          padding: '13px',
          fontSize: 14,
          fontWeight: 800,
          cursor: 'pointer',
          marginTop: 6,
          boxShadow: `0 4px 12px ${P}33`,
        }}
      >
        Submit Application
      </button>
    </form>
  )
}