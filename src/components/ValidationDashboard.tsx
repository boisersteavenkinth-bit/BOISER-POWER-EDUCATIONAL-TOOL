import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Focus,
  Zap,
  ChevronDown,
  ChevronUp,
  ListChecks,
  Info,
  Calendar,
  BookOpen,
  Target,
  UserCheck,
  Clock
} from 'lucide-react';

export interface ValidationCheck {
  id: string;
  label: string;
  category: 'dates' | 'subjects' | 'competencies' | 'metadata' | 'procedures';
  isValid: boolean;
  isRequired: boolean;
  currentValue: string;
  errorMessage: string;
  elementId: string;
}

export interface ValidationDashboardProps {
  checks: ValidationCheck[];
  onFocusField: (elementId: string) => void;
  onRepairDefaults: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const ValidationDashboard: React.FC<ValidationDashboardProps> = ({
  checks,
  onFocusField,
  onRepairDefaults,
  isExpanded = true,
  onToggleExpand
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dates' | 'subjects' | 'competencies' | 'metadata' | 'procedures'>('all');

  const validCount = checks.filter(c => c.isValid).length;
  const totalCount = checks.length;
  const missingChecks = checks.filter(c => !c.isValid);
  const percentage = Math.round((validCount / totalCount) * 100);

  const filteredChecks = checks.filter(c => {
    if (activeFilter === 'all') return true;
    return c.category === activeFilter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dates':
        return <Calendar className="w-3.5 h-3.5 text-blue-600" />;
      case 'subjects':
        return <BookOpen className="w-3.5 h-3.5 text-purple-600" />;
      case 'competencies':
        return <Target className="w-3.5 h-3.5 text-amber-600" />;
      case 'metadata':
        return <UserCheck className="w-3.5 h-3.5 text-indigo-600" />;
      case 'procedures':
        return <Clock className="w-3.5 h-3.5 text-teal-600" />;
      default:
        return <ListChecks className="w-3.5 h-3.5 text-stone-600" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden transition-all duration-300 no-print">
      {/* Header Bar */}
      <div className="bg-linear-to-r from-slate-900 via-[#002776] to-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl flex items-center justify-center ${percentage === 100 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30' : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'}`}>
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-white">
                DepEd Quality Assurance &amp; Validation Dashboard
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1 ${
                percentage === 100
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'bg-amber-400 text-slate-950 shadow-xs'
              }`}>
                {percentage === 100 ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-slate-950" />
                    100% Quality Assured
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3 h-3 text-slate-950" />
                    {missingChecks.length} Missing Required Field{missingChecks.length > 1 ? 's' : ''}
                  </>
                )}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Verifies DepEd Order No. 3, s. 2026 required fields (Dates, Subject, Competencies, Teacher, Procedures)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {missingChecks.length > 0 && (
            <button
              onClick={onRepairDefaults}
              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Automatically fill missing fields with standard DepEd Region X exemplar content"
            >
              <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
              <span className="hidden sm:inline">Auto-Fill Missing</span>
            </button>
          )}

          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title={isExpanded ? 'Collapse Validation Dashboard' : 'Expand Validation Dashboard'}
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Health Meter & Score Bar */}
      <div className="p-4 sm:p-5 bg-stone-50/80 border-b border-stone-200/80 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-stone-800">
            <span>Validation Score:</span>
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-extrabold ${
              percentage === 100 ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              {validCount} / {totalCount} Checks Passed ({percentage}%)
            </span>
          </div>

          <div className="text-[11px] text-stone-600 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Click any missing check item below to highlight &amp; jump directly to that input field.</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden p-0.5 border border-stone-300/60">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage === 100
                ? 'bg-linear-to-r from-emerald-500 to-teal-500'
                : percentage >= 70
                ? 'bg-linear-to-r from-amber-500 to-yellow-400'
                : 'bg-linear-to-r from-red-500 to-amber-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Main Checklist Body */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="font-bold text-stone-500 text-[11px] uppercase tracking-wider mr-1">Filter:</span>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                activeFilter === 'all'
                  ? 'bg-[#002776] text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <span>All Checks ({checks.length})</span>
            </button>
            <button
              onClick={() => setActiveFilter('dates')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                activeFilter === 'dates'
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>Dates</span>
            </button>
            <button
              onClick={() => setActiveFilter('subjects')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                activeFilter === 'subjects'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>Subject</span>
            </button>
            <button
              onClick={() => setActiveFilter('competencies')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                activeFilter === 'competencies'
                  ? 'bg-amber-700 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Target className="w-3 h-3" />
              <span>Competencies</span>
            </button>
            <button
              onClick={() => setActiveFilter('metadata')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                activeFilter === 'metadata'
                  ? 'bg-indigo-700 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <UserCheck className="w-3 h-3" />
              <span>Metadata</span>
            </button>
            <button
              onClick={() => setActiveFilter('procedures')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                activeFilter === 'procedures'
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>Procedures</span>
            </button>
          </div>

          {/* Grid of Validation Checks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredChecks.map((item) => (
              <div
                key={item.id}
                onClick={() => onFocusField(item.elementId)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 group ${
                  item.isValid
                    ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50'
                    : 'bg-amber-50/70 border-amber-300 hover:border-amber-500 hover:bg-amber-100/80 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${
                    item.isValid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-200 text-amber-900 animate-pulse'
                  }`}>
                    {item.isValid ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-stone-900 group-hover:text-blue-900">
                        {item.label}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-stone-200/80 text-[10px] font-semibold text-stone-700 capitalize flex items-center gap-1">
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                    </div>

                    <p className={`text-[11px] leading-snug line-clamp-2 ${
                      item.isValid ? 'text-stone-600 font-medium' : 'text-amber-900 font-bold'
                    }`}>
                      {item.isValid ? (
                        <>✓ <span className="text-stone-800">{item.currentValue}</span></>
                      ) : (
                        item.errorMessage
                      )}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  {item.isValid ? (
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-extrabold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Valid
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onFocusField(item.elementId);
                      }}
                      className="text-[11px] text-white bg-amber-600 hover:bg-amber-700 px-2.5 py-1 rounded-xl font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <Focus className="w-3 h-3" />
                      <span>Fix Now</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Repair Summary */}
          {missingChecks.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex flex-wrap items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>{missingChecks.length} field{missingChecks.length > 1 ? 's' : ''} require attention:</strong> {missingChecks.map(c => c.label.split('(')[0].trim()).join(', ')}
                </span>
              </div>
              <button
                type="button"
                onClick={onRepairDefaults}
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-white" />
                <span>Auto-Fill Missing Fields</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
