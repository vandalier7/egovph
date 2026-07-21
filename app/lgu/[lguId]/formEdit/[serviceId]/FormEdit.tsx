'use client'

import { useState } from 'react'

import {
  P,
  Y,
  W,
  SF,
  SF2,
  TXT,
  MT,
  BR,
  ER,
  NU,
} from '@/lib/theme'

import type {
  FormBlock,
  FormBlockType,
  LGU,
  Service,
} from '@/lib/types'

import { BLOCK_TYPES } from '@/lib/data'
import { BackBtn } from '@/components/shared/UIComponents'
import { updateServiceFormBlocks } from '@/lib/store'
import FormRenderer from '@/components/forms/FormRenderer'

export default function LGUFormEdit({
  lgu,
  service,
  blocks: initialBlocks,
  onBack,
}: {
  lgu: LGU
  service: Service
  blocks: FormBlock[]
  onBack: () => void
}) {
  const [blocks, setBlocks] = useState<FormBlock[]>(initialBlocks)
  const [preview, setPreview] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [saved, setSaved] = useState(false)

  const addBlock = (type: FormBlockType) => {
    if (type === 'instruction') return

    const bt = BLOCK_TYPES.find((b) => b.type === type)
    if (!bt) return

    setBlocks((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        label: `${bt.label} field`,
        required: false,
        placeholder: '',
      },
    ])
  }

  const remove = (id: number) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id))
  }

  const update = (id: number, patch: Partial<FormBlock>) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...patch } : b))
    )
  }

  const moveByOffset = (id: number, offset: number) => {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id)
      const target = index + offset

      if (index === -1 || target < 0 || target >= prev.length) {
        return prev
      }

      const copy = [...prev]
      const [moved] = copy.splice(index, 1)
      copy.splice(target, 0, moved)

      return copy
    })
  }

  const handleSave = () => {
    updateServiceFormBlocks(service.id, blocks)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div
      style={{
        flex: 1,
        background: SF2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          background: P,
          padding: '16px 20px 14px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
          }}
        >
          <BackBtn onBack={onBack} />

          <div style={{ flex: 1 }} />

          <button
            onClick={() => setPreview((p) => !p)}
            style={{
              background: preview ? Y : 'rgba(255,255,255,0.18)',
              border: 'none',
              borderRadius: 8,
              padding: '6px 12px',
              color: preview ? TXT : W,
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {preview ? '✏ Edit' : '◻ Preview'}
          </button>

          <button
            onClick={handleSave}
            style={{
              background: Y,
              border: 'none',
              borderRadius: 8,
              padding: '6px 12px',
              color: TXT,
              fontSize: 11,
              fontWeight: 800,
              cursor: 'pointer',
              minWidth: 56,
            }}
          >
            {saved ? '✓ Saved' : 'Save'}
          </button>
        </div>

        <h2
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: W,
            margin: 0,
          }}
        >
          {service.name}
        </h2>

        <p
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.60)',
            margin: '2px 0 0',
          }}
        >
          {lgu.lguName}
          {' · '}
          Form Builder
          {' · '}
          {blocks.filter((b) => b.type !== 'instruction').length}
          {' fields'}
        </p>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: preview ? 0 : 16,
          position: 'relative',
        }}
      >
        {!preview ? (
          <>
            {blocks.map((block, i) => (
              <div
                key={block.id}
                style={{
                  background: W,
                  border: `1.5px solid ${BR}`,
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 10,
                  }}
                >
                  <button
                    onClick={() => moveByOffset(block.id, -1)}
                    disabled={i === 0}
                    style={{
                      border: 'none',
                      background: SF2,
                      color: i === 0 ? NU : TXT,
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      fontSize: 13,
                      cursor: i === 0 ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    ↑
                  </button>

                  <button
                    onClick={() => moveByOffset(block.id, 1)}
                    disabled={i === blocks.length - 1}
                    style={{
                      border: 'none',
                      background: SF2,
                      color: i === blocks.length - 1 ? NU : TXT,
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      fontSize: 13,
                      cursor:
                        i === blocks.length - 1 ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    ↓
                  </button>

                  <span
                    style={{
                      background: SF,
                      color: P,
                      padding: '3px 8px',
                      borderRadius: 5,
                      fontSize: 9,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      marginLeft: 4,
                    }}
                  >
                    {block.type}
                  </span>

                  <div style={{ flex: 1 }} />

                  {block.type !== 'instruction' && (
                    <button
                      onClick={() => remove(block.id)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: ER,
                        fontSize: 18,
                        cursor: 'pointer',
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>

                {block.type === 'instruction' ? (
                  <textarea
                    value={block.content ?? ''}
                    onChange={(e) => update(block.id, { content: e.target.value })}
                    rows={3}
                    placeholder="Instruction text"
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      border: `1px solid ${BR}`,
                      borderRadius: 8,
                      color: TXT,
                      fontSize: 13,
                      outline: 'none',
                      resize: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                    }}
                  />
                ) : (
                  <>
                    <input
                      value={block.label ?? ''}
                      onChange={(e) => update(block.id, { label: e.target.value })}
                      placeholder="Field label"
                      style={{
                        width: '100%',
                        padding: '9px 10px',
                        border: `1px solid ${BR}`,
                        borderRadius: 8,
                        color: TXT,
                        fontSize: 13,
                        outline: 'none',
                        marginBottom: 10,
                        boxSizing: 'border-box',
                      }}
                    />

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        flexWrap: 'wrap',
                      }}
                    >
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          color: MT,
                          fontSize: 11,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={block.required ?? false}
                          onChange={(e) =>
                            update(block.id, { required: e.target.checked })
                          }
                          style={{ accentColor: P }}
                        />
                        Required
                      </label>

                      {block.type === 'text' && (
                        <input
                          value={block.placeholder ?? ''}
                          onChange={(e) =>
                            update(block.id, { placeholder: e.target.value })
                          }
                          placeholder="Placeholder"
                          style={{
                            flex: 1,
                            minWidth: 120,
                            padding: '7px 10px',
                            border: `1px solid ${BR}`,
                            borderRadius: 7,
                            fontSize: 11,
                            outline: 'none',
                            boxSizing: 'border-box',
                          }}
                        />
                      )}

                      {block.type === 'select' && (
                        <input
                          value={block.options?.join(', ') ?? ''}
                          onChange={(e) =>
                            update(block.id, {
                              options: e.target.value
                                .split(',')
                                .map((o) => o.trim())
                                .filter(Boolean),
                            })
                          }
                          placeholder="Options, comma-separated"
                          style={{
                            flex: 1,
                            minWidth: 120,
                            padding: '7px 10px',
                            border: `1px solid ${BR}`,
                            borderRadius: 7,
                            fontSize: 11,
                            outline: 'none',
                            boxSizing: 'border-box',
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}

            {blocks.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '48px 20px',
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
                  📝
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.6 }}>
                  No fields yet. Tap the + button to add your first field.
                </p>
              </div>
            )}

            {/* Floating Add Button */}
            <div
              style={{
                position: 'sticky',
                bottom: 20,
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 20,
              }}
            >
              <div style={{ position: 'relative' }}>
                {addOpen && (
                  <div
  style={{
    position: 'absolute',
    bottom: 64,
    right: 0,
    background: W,
    border: `1px solid ${BR}`,
    borderRadius: 12,
    padding: 8,
    width: 180,
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    opacity: addOpen ? 1 : 0,
    transform: addOpen
      ? 'translateY(0) scale(1)'
      : 'translateY(12px) scale(0.95)',
    pointerEvents: addOpen ? 'auto' : 'none',
    transition:
      'opacity 0.18s ease, transform 0.18s ease',
    transformOrigin: 'bottom right',
    zIndex: 20,
  }}
>
  {BLOCK_TYPES
    .filter((b) => b.type !== 'instruction')
    .map((bt) => (
      <button
        key={bt.type}
        onClick={() => {
          addBlock(bt.type as FormBlockType)
          setAddOpen(false)
        }}
        style={{
          width: '100%',
          padding: '10px',
          border: 'none',
          background: 'transparent',
          textAlign: 'left',
          color: TXT,
          fontSize: 12,
          cursor: 'pointer',
          borderRadius: 8,
        }}
      >
        {bt.icon} {bt.label}
      </button>
    ))}
</div>
                )}

                <button
                  onClick={() => setAddOpen((v) => !v)}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: '50%',
                    border: 'none',
                    background: P,
                    color: W,
                    fontSize: 28,
                    fontWeight: 300,
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(0,56,168,0.35)',
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </>
        ) : (
          <FormRenderer blocks={blocks} onSubmit={() => {}} />
        )}
      </div>
    </div>
  )
}