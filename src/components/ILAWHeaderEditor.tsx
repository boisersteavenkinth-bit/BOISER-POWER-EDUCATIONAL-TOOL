import React, { useState, useEffect } from 'react';
import {
  Building2,
  GraduationCap,
  Users,
  BookOpen,
  UserCheck,
  Calendar,
  Sparkles,
  Save,
  RotateCcw,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Check,
  ShieldCheck,
  Sliders,
  FileText
} from 'lucide-react';
import { ILAWHeaderInfo, ILAWCustomField } from '../types/ilawDO3';

interface ILAWHeaderEditorProps {
  header: ILAWHeaderInfo;
  onChange: (updatedHeader: ILAWHeaderInfo) => void;
  onSaveTemplate?: (templateName: string) => void;
}

export const LNNCHS_DEFAULT_HEADER: ILAWHeaderInfo = {
  lesson: 'Understanding and Strengthening the Self',
  learningArea: 'Life and Career Skills',
  teacher: 'STEAVEN KINTH D. BOISER',
  contentEvaluator: 'Divina Grace M. Reyes, EdD (Content Evaluator)',
  languageEvaluator: 'Mark Anthony B. Santos, PhD (Language Evaluator)',
  formatEvaluator: 'LNNCHS SHS Quality Assurance Panel (Format Evaluator)',
  school: 'Lanao del Norte National Comprehensive High School',
  division: 'Division of Lanao del Norte',
  region: 'Region X - Northern Mindanao',
  gradeLevelAndSection: 'Grade 11 - Einstein / Rizal (Academic & TechPro)',
  gradeBand: '11-12',
  term: 1,
  bowWeek: 'Week 1',
  inclusiveTeachingDates: 'Jun 16–19, 2026',
  numberOfSessions: 4,
  references: [
    'Erik Erikson’s Stages of Psychosocial Development (McLeod, 2025)',
    'DepEd Strengthened SHS Curriculum Framework (DO No. 015, s. 2026)',
    'CDC Youth Violence Prevention Risk and Protective Factors (CDC, 2024)'
  ],
  declarationOfAIUse: 'AI assistance (BOISER Generator) utilized for drafting initial lesson scaffolding compliant with DepEd DO 3, s. 2026 Annex A guidelines.',
  address: 'Barangay Santo Niño, Tubod, Lanao del Norte',
  telephone: '(063) 223-1452',
  email: 'lnnchs.shs@deped.gov.ph',
  website: 'https://depedlanaodelnorte.gov.ph/lnnchs',
  templateType: 'LNNCHS_STANDARD',
  customFields: []
};

export const ILAWHeaderEditor: React.FC<ILAWHeaderEditorProps> = ({
  header,
  onChange,
  onSaveTemplate
}) => {
  const [localHeader, setLocalHeader] = useState<ILAWHeaderInfo>(header || LNNCHS_DEFAULT_HEADER);
  const [templatePreset, setTemplatePreset] = useState<string>('LNNCHS_STANDARD');
  const [isLnnchsDefaultEnabled, setIsLnnchsDefaultEnabled] = useState<boolean>(
    (header?.school || '').includes('Lanao del Norte National Comprehensive High School') ||
    (header?.school || '').includes('LNNCHS')
  );
  const [newCustomLabel, setNewCustomLabel] = useState('');
  const [newCustomValue, setNewCustomValue] = useState('');
  const [newRefText, setNewRefText] = useState('');
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    if (header) {
      setLocalHeader(header);
      setIsLnnchsDefaultEnabled(
        (header.school || '').includes('Lanao del Norte National Comprehensive High School') ||
        (header.school || '').includes('LNNCHS')
      );
    }
  }, [header]);

  const updateField = <K extends keyof ILAWHeaderInfo>(field: K, value: ILAWHeaderInfo[K]) => {
    const updated = { ...localHeader, [field]: value };
    setLocalHeader(updated);
    onChange(updated);
  };

  const handleToggleLnnchsDefault = (enable: boolean) => {
    setIsLnnchsDefaultEnabled(enable);
    if (enable) {
      const updated: ILAWHeaderInfo = {
        ...localHeader,
        school: 'Lanao del Norte National Comprehensive High School',
        address: 'Barangay Santo Niño, Tubod, Lanao del Norte',
        division: 'Division of Lanao del Norte',
        region: 'Region X - Northern Mindanao',
        telephone: '(063) 223-1452',
        email: 'lnnchs.shs@deped.gov.ph',
        website: 'https://depedlanaodelnorte.gov.ph/lnnchs',
        formatEvaluator: localHeader.formatEvaluator || 'LNNCHS SHS Quality Assurance Panel (Format Evaluator)',
        templateType: 'LNNCHS_STANDARD'
      };
      setLocalHeader(updated);
      setTemplatePreset('LNNCHS_STANDARD');
      onChange(updated);
      setSavedMessage('✓ "LNNCHS Default" header & footer template activated!');
      setTimeout(() => setSavedMessage(null), 3000);
    } else {
      const updated: ILAWHeaderInfo = {
        ...localHeader,
        templateType: 'CUSTOM'
      };
      setLocalHeader(updated);
      setTemplatePreset('CUSTOM');
      onChange(updated);
    }
  };

  const handlePresetSelect = (preset: 'LNNCHS_STANDARD' | 'CUSTOM' | 'DEPED_OFFICIAL' | 'SCHOOL_HEADER') => {
    setTemplatePreset(preset);
    let updated = { ...localHeader, templateType: preset };
    if (preset === 'LNNCHS_STANDARD') {
      updated = {
        ...updated,
        school: 'LNNCHS (Lanao del Norte National Comprehensive High School)',
        division: 'Division of Lanao del Norte',
        region: 'Region X - Northern Mindanao',
        address: 'Barangay Santo Niño, Tubod, Lanao del Norte'
      };
    } else if (preset === 'DEPED_OFFICIAL') {
      updated = {
        ...updated,
        school: 'DepEd Regional Exemplar School',
        division: 'Schools Division Office',
        region: 'Region X - Northern Mindanao'
      };
    }
    setLocalHeader(updated);
    onChange(updated);
  };

  const handleAddCustomField = () => {
    if (!newCustomLabel.trim()) return;
    const currentFields = localHeader.customFields || [];
    const newField: ILAWCustomField = {
      id: `custom-${Date.now()}`,
      label: newCustomLabel.trim(),
      value: newCustomValue.trim()
    };
    const updatedFields = [...currentFields, newField];
    updateField('customFields', updatedFields);
    setNewCustomLabel('');
    setNewCustomValue('');
  };

  const handleRemoveCustomField = (id: string) => {
    const currentFields = localHeader.customFields || [];
    const updatedFields = currentFields.filter((f) => f.id !== id);
    updateField('customFields', updatedFields);
  };

  const handleAddReference = () => {
    if (!newRefText.trim()) return;
    const currentRefs = localHeader.references || [];
    updateField('references', [...currentRefs, newRefText.trim()]);
    setNewRefText('');
  };

  const handleRemoveReference = (index: number) => {
    const currentRefs = localHeader.references || [];
    updateField('references', currentRefs.filter((_, i) => i !== index));
  };

  const handleSaveAsTemplate = () => {
    try {
      const templateData = JSON.stringify(localHeader);
      localStorage.setItem('my_ilaw_header_template', templateData);
      if (onSaveTemplate) onSaveTemplate('My ILAW Template');
      setSavedMessage('✓ "My ILAW Template" saved to browser storage successfully!');
      setTimeout(() => setSavedMessage(null), 3500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoadSavedTemplate = () => {
    try {
      const stored = localStorage.getItem('my_ilaw_header_template');
      if (stored) {
        const parsed = JSON.parse(stored) as ILAWHeaderInfo;
        setLocalHeader(parsed);
        onChange(parsed);
        setSavedMessage('✓ Loaded "My ILAW Template" from browser storage!');
        setTimeout(() => setSavedMessage(null), 3500);
      } else {
        alert('No saved ILAW header template found in browser storage.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 text-stone-900 font-sans">
      {/* Header Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full bg-[#002776] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FCD116]" />
              LNNCHS Standard Template Engine
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              100% Fully Editable Header
            </span>
          </div>
          <h3 className="text-xl font-bold font-serif text-[#002776]">
            EDIT ILAW HEADER &amp; INFORMATION TABLE
          </h3>
          <p className="text-xs text-stone-600">
            Customize official DepEd &amp; LNNCHS header details, evaluators, references, logos, and session parameters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSavedTemplate}
            className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-stone-300"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-600" />
            <span>Load Template</span>
          </button>
          <button
            type="button"
            onClick={handleSaveAsTemplate}
            className="px-4 py-2 rounded-xl bg-[#002776] hover:bg-blue-900 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#FCD116]" />
            <span>Save as Template</span>
          </button>
        </div>
      </div>

      {/* LNNCHS Default Template Toggle Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#002776] to-[#001D58] text-white shadow-sm flex flex-wrap items-center justify-between gap-4 border border-[#0038A8]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FCD116] text-[#002776] flex items-center justify-center font-bold font-serif text-lg shrink-0 shadow-2xs">
            L
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-white">LNNCHS Standard Template (Default)</h4>
              <span className="px-2 py-0.5 rounded-full bg-[#FCD116] text-[#002776] text-[10px] font-black uppercase tracking-wider">
                Official DepEd DO 3
              </span>
            </div>
            <p className="text-xs text-blue-100 mt-0.5">
              Auto-populates <strong className="text-amber-300 font-semibold">Lanao del Norte National Comprehensive High School</strong>, school address, and official logos while keeping every field 100% editable.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-blue-950/60 backdrop-blur-xs p-2 rounded-xl border border-blue-400/30">
          <span className="text-xs font-bold text-blue-100">
            {isLnnchsDefaultEnabled ? 'LNNCHS Default: ON' : 'LNNCHS Default: OFF'}
          </span>
          <button
            type="button"
            onClick={() => handleToggleLnnchsDefault(!isLnnchsDefaultEnabled)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
              isLnnchsDefaultEnabled ? 'bg-[#FCD116]' : 'bg-stone-600'
            }`}
            role="switch"
            aria-checked={isLnnchsDefaultEnabled}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                isLnnchsDefaultEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {savedMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Preset Selector Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
          Header Template Preset Options
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => handlePresetSelect('LNNCHS_STANDARD')}
            className={`p-3 rounded-2xl border text-xs font-bold transition text-left cursor-pointer flex items-center justify-between ${
              templatePreset === 'LNNCHS_STANDARD'
                ? 'bg-[#002776] text-white border-[#002776] shadow-xs'
                : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div>
              <span className="block font-bold">LNNCHS Standard</span>
              <span className="text-[10px] font-normal opacity-80 block">Default LNNCHS Header</span>
            </div>
            {templatePreset === 'LNNCHS_STANDARD' && <Check className="w-4 h-4 text-[#FCD116]" />}
          </button>

          <button
            type="button"
            onClick={() => handlePresetSelect('CUSTOM')}
            className={`p-3 rounded-2xl border text-xs font-bold transition text-left cursor-pointer flex items-center justify-between ${
              templatePreset === 'CUSTOM'
                ? 'bg-[#002776] text-white border-[#002776] shadow-xs'
                : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div>
              <span className="block font-bold">Custom Header</span>
              <span className="text-[10px] font-normal opacity-80 block">Fully User-Defined</span>
            </div>
            {templatePreset === 'CUSTOM' && <Check className="w-4 h-4 text-[#FCD116]" />}
          </button>

          <button
            type="button"
            onClick={() => handlePresetSelect('DEPED_OFFICIAL')}
            className={`p-3 rounded-2xl border text-xs font-bold transition text-left cursor-pointer flex items-center justify-between ${
              templatePreset === 'DEPED_OFFICIAL'
                ? 'bg-[#002776] text-white border-[#002776] shadow-xs'
                : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div>
              <span className="block font-bold">DepEd Header</span>
              <span className="text-[10px] font-normal opacity-80 block">Generic Region X</span>
            </div>
            {templatePreset === 'DEPED_OFFICIAL' && <Check className="w-4 h-4 text-[#FCD116]" />}
          </button>

          <button
            type="button"
            onClick={() => handlePresetSelect('SCHOOL_HEADER')}
            className={`p-3 rounded-2xl border text-xs font-bold transition text-left cursor-pointer flex items-center justify-between ${
              templatePreset === 'SCHOOL_HEADER'
                ? 'bg-[#002776] text-white border-[#002776] shadow-xs'
                : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div>
              <span className="block font-bold">School Header</span>
              <span className="text-[10px] font-normal opacity-80 block">Institutional Format</span>
            </div>
            {templatePreset === 'SCHOOL_HEADER' && <Check className="w-4 h-4 text-[#FCD116]" />}
          </button>
        </div>
      </div>

      {/* Main Grid: Form Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Left Column: School & Region Metadata */}
        <div className="space-y-4 bg-stone-50 p-5 rounded-3xl border border-stone-200">
          <span className="font-bold text-[#002776] uppercase tracking-wider block border-b border-stone-200 pb-2 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-[#002776]" />
            1. Institutional &amp; Location Header
          </span>

          <div>
            <label className="text-stone-700 font-semibold block mb-1">🏛️ Region</label>
            <input
              type="text"
              value={localHeader.region}
              onChange={(e) => updateField('region', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
              placeholder="e.g. Region X - Northern Mindanao"
            />
          </div>

          <div>
            <label className="text-stone-700 font-semibold block mb-1">🏫 Schools Division</label>
            <input
              type="text"
              value={localHeader.division}
              onChange={(e) => updateField('division', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
              placeholder="e.g. Division of Lanao del Norte"
            />
          </div>

          <div>
            <label className="text-stone-700 font-semibold block mb-1">🏫 School Name</label>
            <input
              type="text"
              value={localHeader.school}
              onChange={(e) => updateField('school', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-bold text-[#002776]"
              placeholder="e.g. LNNCHS (Lanao del Norte National Comprehensive High School)"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-stone-700 font-semibold block mb-1">School Address</label>
              <input
                type="text"
                value={localHeader.address || ''}
                onChange={(e) => updateField('address', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
                placeholder="Address"
              />
            </div>
            <div>
              <label className="text-stone-700 font-semibold block mb-1">Telephone / Contact</label>
              <input
                type="text"
                value={localHeader.telephone || ''}
                onChange={(e) => updateField('telephone', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
                placeholder="Tel No."
              />
            </div>
          </div>
        </div>

        {/* Right Column: Lesson & Personnel Details */}
        <div className="space-y-4 bg-stone-50 p-5 rounded-3xl border border-stone-200">
          <span className="font-bold text-[#002776] uppercase tracking-wider block border-b border-stone-200 pb-2 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-[#002776]" />
            2. Lesson &amp; Developer Details
          </span>

          <div>
            <label className="text-stone-700 font-semibold block mb-1">📖 Lesson / Title</label>
            <input
              type="text"
              value={localHeader.lesson}
              onChange={(e) => updateField('lesson', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-bold text-stone-900"
              placeholder="e.g. Understanding and Strengthening the Self"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-stone-700 font-semibold block mb-1">📚 Learning Area/s</label>
              <input
                type="text"
                value={localHeader.learningArea}
                onChange={(e) => updateField('learningArea', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
                placeholder="e.g. Life and Career Skills"
              />
            </div>
            <div>
              <label className="text-stone-700 font-semibold block mb-1">🎓 Grade &amp; Section</label>
              <input
                type="text"
                value={localHeader.gradeLevelAndSection}
                onChange={(e) => updateField('gradeLevelAndSection', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
                placeholder="e.g. Grade 11 - Einstein"
              />
            </div>
          </div>

          <div>
            <label className="text-stone-700 font-semibold block mb-1">👨‍🏫 Teacher-Developer/s</label>
            <input
              type="text"
              value={localHeader.teacher}
              onChange={(e) => updateField('teacher', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-bold text-[#002776]"
              placeholder="e.g. STEAVEN KINTH D. BOISER"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-stone-700 font-semibold block mb-1">📅 Number of Sessions</label>
              <select
                value={localHeader.numberOfSessions}
                onChange={(e) => updateField('numberOfSessions', Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-bold text-stone-900"
              >
                <option value={1}>1 Session</option>
                <option value={2}>2 Sessions</option>
                <option value={3}>3 Sessions</option>
                <option value={4}>4 Sessions (Standard)</option>
                <option value={5}>5 Sessions</option>
                <option value={6}>6 Sessions</option>
              </select>
            </div>
            <div>
              <label className="text-stone-700 font-semibold block mb-1">Inclusive Dates</label>
              <input
                type="text"
                value={localHeader.inclusiveTeachingDates}
                onChange={(e) => updateField('inclusiveTeachingDates', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
                placeholder="e.g. Jun 16–19, 2026"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Evaluators Panel */}
      <div className="space-y-3 bg-blue-50/50 p-5 rounded-3xl border border-blue-200 text-xs">
        <span className="font-bold text-[#002776] uppercase tracking-wider block flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-[#002776]" />
          3. Quality Assurance &amp; Evaluator Team
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-stone-700 font-semibold block mb-1">Content Evaluator</label>
            <input
              type="text"
              value={localHeader.contentEvaluator}
              onChange={(e) => updateField('contentEvaluator', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
              placeholder="Content Evaluator"
            />
          </div>
          <div>
            <label className="text-stone-700 font-semibold block mb-1">Language Evaluator</label>
            <input
              type="text"
              value={localHeader.languageEvaluator}
              onChange={(e) => updateField('languageEvaluator', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
              placeholder="Language Evaluator"
            />
          </div>
          <div>
            <label className="text-stone-700 font-semibold block mb-1">Social Content &amp; Format Evaluator</label>
            <input
              type="text"
              value={localHeader.formatEvaluator}
              onChange={(e) => updateField('formatEvaluator', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
              placeholder="Format Evaluator"
            />
          </div>
        </div>
      </div>

      {/* References & AI Declaration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* References */}
        <div className="space-y-3 bg-stone-50 p-5 rounded-3xl border border-stone-200">
          <span className="font-bold text-stone-800 uppercase tracking-wider block flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-stone-700" />
            4. References &amp; Learning Sources
          </span>

          <div className="space-y-2">
            {localHeader.references.map((ref, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-white rounded-xl border border-stone-200 text-xs">
                <span className="text-stone-800 truncate font-mono">{ref}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveReference(idx)}
                  className="text-stone-400 hover:text-red-600 p-1 rounded-lg transition"
                  title="Remove reference"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newRefText}
              onChange={(e) => setNewRefText(e.target.value)}
              placeholder="Add book, website, or toolkit reference..."
              className="flex-1 p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
            />
            <button
              type="button"
              onClick={handleAddReference}
              className="px-3 py-2 rounded-xl bg-[#002776] text-white text-xs font-bold hover:bg-blue-900 transition flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* AI Use Declaration */}
        <div className="space-y-3 bg-stone-50 p-5 rounded-3xl border border-stone-200">
          <span className="font-bold text-stone-800 uppercase tracking-wider block flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            5. Declaration of AI Use (DO 3, s. 2026 Annex A)
          </span>

          <textarea
            rows={4}
            value={localHeader.declarationOfAIUse}
            onChange={(e) => updateField('declarationOfAIUse', e.target.value)}
            className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium text-xs text-stone-800"
            placeholder="Describe AI assistance transparency..."
          />
        </div>
      </div>

      {/* Custom Editable Header Fields */}
      <div className="space-y-3 bg-amber-50/50 p-5 rounded-3xl border border-amber-200 text-xs">
        <span className="font-bold text-amber-900 uppercase tracking-wider block flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-amber-700" />
          6. Additional Custom Information Fields (User-Defined)
        </span>

        {localHeader.customFields && localHeader.customFields.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {localHeader.customFields.map((cf) => (
              <div key={cf.id} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-amber-200">
                <div>
                  <span className="font-bold text-stone-800 block">{cf.label}:</span>
                  <span className="text-stone-600">{cf.value || '(Blank)'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCustomField(cf.id)}
                  className="text-stone-400 hover:text-red-600 p-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
          <input
            type="text"
            value={newCustomLabel}
            onChange={(e) => setNewCustomLabel(e.target.value)}
            placeholder="Field Label (e.g. Co-Developer)"
            className="p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
          />
          <input
            type="text"
            value={newCustomValue}
            onChange={(e) => setNewCustomValue(e.target.value)}
            placeholder="Field Value (e.g. Maria Clara)"
            className="p-2.5 rounded-xl border border-stone-300 bg-white font-medium"
          />
          <button
            type="button"
            onClick={handleAddCustomField}
            className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition flex items-center justify-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Field</span>
          </button>
        </div>
      </div>
    </div>
  );
};
