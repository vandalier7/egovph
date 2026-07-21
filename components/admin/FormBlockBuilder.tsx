'use client';

import React, { useState } from 'react';
import { FormField, LguService } from '@/types/lgu';
import {
  Plus,
  Trash2,
  Type,
  Hash,
  ListFilter,
  Calendar,
  Upload,
  AlignLeft,
  Save,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  X,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

interface FormBlockBuilderProps {
  service: LguService;
  onSaveService: (updatedService: LguService) => void;
}

export const FormBlockBuilder: React.FC<FormBlockBuilderProps> = ({
  service,
  onSaveService,
}) => {
  const [fields, setFields] = useState<FormField[]>(service.fields || []);
  const [instructions, setInstructions] = useState<string[]>(
    service.instructions || []
  );
  const [newInstruction, setNewInstruction] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  // Field Management
  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `fld-${Date.now()}`,
      label: `New ${type.toUpperCase()} Field`,
      type: type,
      required: true,
      placeholder: `Enter ${type}...`,
      options: type === 'select' ? ['Option 1', 'Option 2'] : undefined,
    };
    setFields([...fields, newField]);
    setIsAddMenuOpen(false);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(
      fields.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  // Reordering Logic with Up/Down buttons
  const moveFieldUp = (index: number) => {
    if (index <= 0) return;
    const updated = [...fields];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setFields(updated);
  };

  const moveFieldDown = (index: number) => {
    if (index >= fields.length - 1) return;
    const updated = [...fields];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setFields(updated);
  };

  // Instruction Management
  const addInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions([...instructions, newInstruction.trim()]);
      setNewInstruction('');
    }
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updated: LguService = {
      ...service,
      fields,
      instructions,
    };
    onSaveService(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-5 w-full max-w-full overflow-x-hidden">
      {/* Top Save Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs w-full">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase text-blue-600 tracking-wide block">
            Form Edit View (Draft State)
          </span>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
            {service.code} — {service.title}
          </h3>
        </div>

        <button
          onClick={handleSave}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer flex-shrink-0"
        >
          {saveSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Instructions Builder */}
      <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 w-full">
        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
          1. Edit Service Instructions & Guidelines
        </h4>
        <div className="space-y-2">
          {instructions.map((inst, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 gap-2"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="truncate">{inst}</span>
              </div>
              <button
                onClick={() => removeInstruction(idx)}
                className="text-slate-400 hover:text-red-600 p-1 cursor-pointer flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <input
            type="text"
            value={newInstruction}
            onChange={(e) => setNewInstruction(e.target.value)}
            placeholder="Add new instruction step..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 min-w-0"
          />
          <button
            onClick={addInstruction}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Step</span>
          </button>
        </div>
      </div>

      {/* Block-Based Form Fields Builder */}
      <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 w-full">
        <div className="flex items-center justify-between">
          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
            2. Dynamic Form Fields ({fields.length} Blocks)
          </h4>
          <span className="text-[11px] font-semibold text-slate-400">
            Block-Based Builder
          </span>
        </div>

        {/* Existing Form Fields List */}
        <div className="space-y-3 w-full">
          {fields.map((fld, index) => (
            <div
              key={fld.id}
              className="border border-slate-200 rounded-2xl p-3 sm:p-4 bg-white shadow-2xs hover:border-slate-300 transition-all space-y-3 w-full overflow-hidden"
            >
              {/* Card Control Header */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                {/* Left: Reorder Arrows & Type Badge */}
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  {/* Up / Down Reorder Buttons */}
                  <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg flex-shrink-0">
                    <button
                      onClick={() => moveFieldUp(index)}
                      disabled={index === 0}
                      className="p-1 rounded text-slate-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                    <button
                      onClick={() => moveFieldDown(index)}
                      disabled={index === fields.length - 1}
                      className="p-1 rounded text-slate-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 border border-blue-200/60 flex-shrink-0">
                    {fld.type}
                  </span>
                </div>

                {/* Right: Required Checkbox & Delete Trash Icon (ALWAYS ON SCREEN) */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <label className="flex items-center gap-1 text-xs font-bold text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={fld.required}
                      onChange={(e) =>
                        updateField(fld.id, { required: e.target.checked })
                      }
                      className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                    />
                    <span>Required</span>
                  </label>

                  <button
                    onClick={() => removeField(fld.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                    title="Delete block"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Field Label Editable Input */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  Field Label
                </label>
                <input
                  type="text"
                  value={fld.label}
                  onChange={(e) =>
                    updateField(fld.id, { label: e.target.value })
                  }
                  className="w-full text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Placeholder configuration */}
              {fld.type !== 'file' && fld.type !== 'date' && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Placeholder Text
                  </label>
                  <input
                    type="text"
                    value={fld.placeholder || ''}
                    onChange={(e) =>
                      updateField(fld.id, { placeholder: e.target.value })
                    }
                    placeholder="Enter placeholder..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              )}

              {/* Dropdown Options configuration */}
              {fld.type === 'select' && (
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-400">
                    Dropdown Options (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={fld.options?.join(', ') || ''}
                    onChange={(e) =>
                      updateField(fld.id, {
                        options: e.target.value.split(',').map((s) => s.trim()),
                      })
                    }
                    placeholder="Option 1, Option 2, Option 3"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Expandable + Add Field Button at the Bottom */}
        <div className="pt-2">
          {!isAddMenuOpen ? (
            <button
              onClick={() => setIsAddMenuOpen(true)}
              className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/60 hover:bg-blue-50/40 text-blue-600 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-4 h-4 stroke-[3]" />
              </div>
              <span>Add Field Block</span>
            </button>
          ) : (
            <div className="bg-slate-50 rounded-2xl border border-blue-200 p-3.5 sm:p-4 shadow-sm space-y-3 animate-in fade-in duration-200 w-full">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Select Field Block Type to Add:
                </span>
                <button
                  onClick={() => setIsAddMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => addField('text')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all cursor-pointer shadow-2xs"
                >
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                    <Type className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-slate-900 truncate">
                      Text Input
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">Single line</span>
                  </div>
                </button>

                <button
                  onClick={() => addField('number')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all cursor-pointer shadow-2xs"
                >
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
                    <Hash className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-slate-900 truncate">
                      Number
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">Numeric value</span>
                  </div>
                </button>

                <button
                  onClick={() => addField('select')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all cursor-pointer shadow-2xs"
                >
                  <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 flex-shrink-0">
                    <ListFilter className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-slate-900 truncate">
                      Dropdown Select
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">Options list</span>
                  </div>
                </button>

                <button
                  onClick={() => addField('textarea')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all cursor-pointer shadow-2xs"
                >
                  <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 flex-shrink-0">
                    <AlignLeft className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-slate-900 truncate">
                      Textarea
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">Paragraph</span>
                  </div>
                </button>

                <button
                  onClick={() => addField('date')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all cursor-pointer shadow-2xs"
                >
                  <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600 flex-shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-slate-900 truncate">
                      Date Picker
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">Calendar</span>
                  </div>
                </button>

                <button
                  onClick={() => addField('file')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all cursor-pointer shadow-2xs"
                >
                  <div className="p-1.5 rounded-lg bg-red-50 text-red-600 flex-shrink-0">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-slate-900 truncate">
                      File Upload
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">PDF / Image</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
