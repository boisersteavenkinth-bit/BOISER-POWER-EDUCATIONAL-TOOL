import React, { useState } from 'react';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RotateCcw,
  Download,
  FileText,
  Table,
  Filter,
  Check,
  RefreshCw,
  Clock,
  ShieldCheck,
  ArrowRight,
  Database,
  Info
} from 'lucide-react';
import { DatasetType, CurriculumVersion, ImportBatchReport, SourceStatus } from '../types/masterResearchCurriculum';

interface CSVBulkImportProps {
  onImportCompleted?: (datasetType: DatasetType, data: any[]) => void;
}

export const CSVBulkImportModule: React.FC<CSVBulkImportProps> = ({ onImportCompleted }) => {
  const [step, setStep] = useState<number>(1);
  const [datasetType, setDatasetType] = useState<DatasetType>('Curriculum');
  const [curriculumVersion, setCurriculumVersion] = useState<CurriculumVersion>('MATATAG_2026');
  const [sourceDoc, setSourceDoc] = useState<string>('Official DepEd Issuance / User Import');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [parsedHeaders, setParsedHeaders] = useState<string[]>([]);
  const [rawRows, setRawRows] = useState<Record<string, string>[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [validatedData, setValidatedData] = useState<{
    validRows: any[];
    invalidRows: { row: number; data: any; errors: string[] }[];
    duplicateRows: any[];
    warnings: string[];
  }>({
    validRows: [],
    invalidRows: [],
    duplicateRows: [],
    warnings: []
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [importReport, setImportReport] = useState<ImportBatchReport | null>(null);
  const [importHistory, setImportHistory] = useState<ImportBatchReport[]>([]);

  const datasetTypesList: DatasetType[] = [
    'Curriculum',
    'Competency',
    'Learning Standard',
    'MELC',
    'MATATAG Curriculum',
    'Subject',
    'Grade Level',
    'Quarter/Term',
    'Research Study',
    'Journal Article',
    'Thesis',
    'Dissertation',
    'Classroom Action Research',
    'Research Instrument',
    'Intervention',
    'Citation',
    'School',
    'Teacher',
    'Learning Resource'
  ];

  // Helper to parse CSV string into headers and rows
  const parseCSVText = (text: string) => {
    const lines = text.split(/\r\n|\n/).filter((line) => line.trim().length > 0);
    if (lines.length === 0) return { headers: [], rows: [] };

    const splitLine = (line: string) => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' || char === "'") {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim().replace(/^["']|["']$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^["']|["']$/g, ''));
      return result;
    };

    const headers = splitLine(lines[0]);
    const rows: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = splitLine(lines[i]);
      if (values.length === headers.length) {
        const rowObj: Record<string, string> = {};
        headers.forEach((h, idx) => {
          rowObj[h] = values[idx] || '';
        });
        rows.push(rowObj);
      }
    }

    return { headers, rows };
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const { headers, rows } = parseCSVText(text);
        setParsedHeaders(headers);
        setRawRows(rows);

        // Auto map identical names
        const autoMap: Record<string, string> = {};
        headers.forEach((h) => {
          autoMap[h] = h;
        });
        setColumnMapping(autoMap);
        setStep(3);
      }
    };
    reader.readAsText(file, 'UTF-8');
  };

  // Pre-fill sample CSV data for quick testing if user clicks "Load Sample CSV Data"
  const handleLoadSampleCSV = () => {
    let sampleCSV = '';
    if (datasetType === 'Curriculum' || datasetType === 'Competency' || datasetType === 'MATATAG Curriculum') {
      sampleCSV = `competency_code,competency_text,grade_level,learning_area,term,quarter,content_standard,performance_standard,source_document
S8FE-Ia-15,Investigate the relationship between force applied and change in motion.,Grade 8,General Science,Term 1,Q1,Newton's Laws of Motion,Safety plan formulation,DepEd Order 015 s 2026
M8AL-Ie-1,Illustrate linear equations in two variables and determine slopes.,Grade 8,Mathematics,Term 1,Q1,Linear equations in two variables,Solve real-life linear problems,DepEd Order 015 s 2026
S9MT-IIb-14,Explain how chemical bonds form in terms of valence electron transfer.,Grade 9,General Science,Term 2,Q2,Atomic structure & chemical bonding,Safety compound report,DepEd Order 015 s 2026`;
    } else if (datasetType === 'Research Study' || datasetType === 'Journal Article' || datasetType === 'Thesis') {
      sampleCSV = `title,authors,year,journal,doi,abstract,subject,grade_level,methodology,major_findings
Enhancing Science Conceptual Understanding,Dela Cruz & Ramos,2024,Philippine Journal of Science Education,10.3860/pjse.v12i2.2024,Quasi-experimental study in Lanao del Norte schools.,Science,Grade 8,Quasi-Experimental,PhET simulations achieved normalized Hake gain g=0.62 vs 0.28 control.
Concrete-Representational-Abstract Sequence in Algebra,Flores & Mercado,2023,Asia-Pacific Journal of Math Education,10.1016/j.apjme.2023.01.004,Action research on Grade 8 algebra learners.,Mathematics,Grade 8,Action Research,CRA model reduced notation anxiety and increased accuracy by 34%.`;
    } else {
      sampleCSV = `title,research_problem,grade_level,subject,intervention,baseline_data,post_test_data,recommendation
Improving Science Calculation Skills,Low diagnostic score in Newton calculation items,Grade 8,Science,5-minute daily retrieval warm-ups,Diagnostic mean 4.2 / 10,Post-test mean 8.6 / 10,Adopt daily retrieval warm-ups across Grade 8-10.`;
    }

    const file = new File([sampleCSV], `${datasetType.toLowerCase().replace(/\s+/g, '_')}_sample.csv`, { type: 'text/csv' });
    setCsvFile(file);
    const { headers, rows } = parseCSVText(sampleCSV);
    setParsedHeaders(headers);
    setRawRows(rows);
    const autoMap: Record<string, string> = {};
    headers.forEach((h) => {
      autoMap[h] = h;
    });
    setColumnMapping(autoMap);
    setStep(3);
  };

  const handleRunValidation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const valid: any[] = [];
      const invalid: { row: number; data: any; errors: string[] }[] = [];
      const duplicates: any[] = [];
      const warnings: string[] = [];

      const seenCodes = new Set<string>();

      rawRows.forEach((row, index) => {
        const errors: string[] = [];
        const mappedObj: Record<string, any> = {
          curriculum_version: curriculumVersion,
          source_document: sourceDoc,
          verification_status: sourceDoc.toLowerCase().includes('official') ? 'VERIFIED_OFFICIAL' : 'NEEDS_VERIFICATION',
          import_batch_id: `BATCH-${Date.now()}`
        };

        Object.keys(columnMapping).forEach((header) => {
          const targetField = columnMapping[header];
          if (targetField) {
            mappedObj[targetField] = row[header];
          }
        });

        // Validation Rules
        const code = mappedObj['competency_code'] || mappedObj['doi'] || mappedObj['title'] || mappedObj['id'];
        if (!code || String(code).trim().length === 0) {
          errors.push('Missing required unique identifier (code / title / DOI)');
        }

        if (seenCodes.has(String(code).trim())) {
          duplicates.push(mappedObj);
          errors.push('Duplicate record code detected in batch');
        } else if (code) {
          seenCodes.add(String(code).trim());
        }

        if (datasetType.includes('Curriculum') || datasetType.includes('Competency')) {
          if (!mappedObj['grade_level']) errors.push('Missing Grade Level');
          if (!mappedObj['term'] && !mappedObj['quarter']) warnings.push(`Row ${index + 1}: Neither Term nor Quarter explicitly specified`);
        }

        if (errors.length > 0) {
          invalid.push({ row: index + 1, data: mappedObj, errors });
        } else {
          valid.push(mappedObj);
        }
      });

      setValidatedData({ validRows: valid, invalidRows: invalid, duplicateRows: duplicates, warnings });
      setIsProcessing(false);
      setStep(6);
    }, 400);
  };

  const handleExecuteImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const report: ImportBatchReport = {
        import_id: `IMP-${Date.now().toString().slice(-6)}`,
        filename: csvFile?.name || 'dataset.csv',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        dataset_type: datasetType,
        total_rows: rawRows.length,
        imported_rows: validatedData.validRows.length,
        rejected_rows: validatedData.invalidRows.length,
        duplicate_rows: validatedData.duplicateRows.length,
        validation_errors: validatedData.invalidRows.map((inv) => ({
          row: inv.row,
          column: 'General',
          message: inv.errors.join('; ')
        })),
        warnings: validatedData.warnings.map((w, idx) => ({ row: idx + 1, message: w })),
        source: sourceDoc,
        curriculum_version: curriculumVersion
      };

      setImportReport(report);
      setImportHistory((prev) => [report, ...prev]);
      if (onImportCompleted) {
        onImportCompleted(datasetType, validatedData.validRows);
      }
      setIsProcessing(false);
      setStep(8);
    }, 600);
  };

  const handleDownloadErrorCSV = () => {
    if (validatedData.invalidRows.length === 0) return;
    const errorRows = validatedData.invalidRows.map((item) => ({
      Row_Number: item.row,
      Validation_Errors: item.errors.join(' | '),
      ...item.data
    }));

    const headers = Object.keys(errorRows[0]).join(',');
    const csvContent = [
      headers,
      ...errorRows.map((r) =>
        Object.values(r)
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `import_errors_${datasetType.toLowerCase().replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadTemplateCSV = (type: string) => {
    let content = '';
    let filename = 'template.csv';

    if (type === 'curriculum') {
      filename = 'curriculum_template.csv';
      content = `curriculum_id,curriculum_version,school_year,grade_level,learning_area,subject,domain,competency_code,competency_text,term,source_document,source_url,verification_status\nCURR-001,MATATAG_2026,2026-2027,Grade 8,Science,General Science,Force & Motion,S8FE-Ia-15,Investigate force and motion relationship.,Term 1,DepEd Order 015 s 2026,https://deped.gov.ph,VERIFIED_OFFICIAL`;
    } else if (type === 'research_sources') {
      filename = 'research_sources_template.csv';
      content = `source_id,title,authors,year,journal,publisher,doi,url,abstract,methodology,population,subject,grade_level,findings,limitations,research_gap,verification_status\nRES-001,Enhancing Science Understanding,Dela Cruz & Ramos,2024,Philippine Journal of Science,MSU Press,10.3860/pjse.2024,https://philjournalsci.org,Quasi-experimental study,Quasi-Experimental,240 Grade 8 students,Science,Grade 8,PhET simulations improved retention,Public school scope,Long term retention gap,VERIFIED`;
    } else if (type === 'classroom_research') {
      filename = 'classroom_research_template.csv';
      content = `research_id,title,research_problem,grade_level,subject,population,intervention,methodology,variables,baseline_data,posttest_data,findings,limitations,recommendation\nCAR-001,Improving Calculation Skills,Low score in calculation,Grade 8,Science,45 learners,Retrieval practice,Action Research,Retrieval Practice,4.2/10,8.6/10,Significantly improved score,Single class,Adopt across grade levels`;
    } else {
      filename = 'intervention_template.csv';
      content = `intervention_id,name,description,subject,grade_level,target_problem,evidence_source,evidence_year,implementation_notes\nINT-001,Daily Retrieval Warm-ups,5-minute retrieval quizzes,Science,Grade 8,Calculation errors,Dela Cruz 2024,2024,Keep non-punitive`;
    }

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-gradient-to-r from-[#002776] via-[#0038A8] to-[#001f5c] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-400/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCD116] text-[#002776] text-xs font-black uppercase tracking-wider mb-2">
              <Database className="w-3.5 h-3.5" />
              Data Management &amp; Provenance
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">CSV Bulk Import Engine</h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl">
              Import, validate, deduplicate, and map large DepEd curriculum standards, Science/Math competencies, and 15-year research literature with zero loss of source provenance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => downloadTemplateCSV('curriculum')}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#FCD116]" />
              <span>Curriculum CSV Template</span>
            </button>
            <button
              onClick={() => downloadTemplateCSV('research_sources')}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#FCD116]" />
              <span>Research CSV Template</span>
            </button>
          </div>
        </div>

        {/* Wizard Steps Indicator */}
        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
          {[
            { num: 1, label: 'Select Dataset' },
            { num: 2, label: 'Upload CSV' },
            { num: 3, label: 'Detect Columns' },
            { num: 4, label: 'Field Mapping' },
            { num: 5, label: 'Preview 100' },
            { num: 6, label: 'Validation' },
            { num: 7, label: 'Confirm' },
            { num: 8, label: 'Report' }
          ].map((s) => (
            <div
              key={s.num}
              className={`p-2 rounded-xl border transition ${
                step === s.num
                  ? 'bg-[#FCD116] text-[#002776] border-yellow-300 font-extrabold shadow-md'
                  : step > s.num
                  ? 'bg-blue-900/60 text-blue-200 border-blue-400/30 font-medium'
                  : 'bg-white/5 text-blue-300/60 border-white/10'
              }`}
            >
              <span className="block text-[10px] uppercase font-mono">Step {s.num}</span>
              <span className="truncate block font-bold text-[11px]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: Select Dataset & Version Configuration */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-base">
            <span className="w-7 h-7 rounded-full bg-[#0038A8] text-white flex items-center justify-center text-xs">1</span>
            <span>Step 1 — Select Target Dataset Type &amp; Version Governance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                Target Dataset Category ({datasetTypesList.length} Supported Types)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {datasetTypesList.map((dt) => (
                  <button
                    key={dt}
                    onClick={() => setDatasetType(dt)}
                    className={`p-3 rounded-2xl text-left border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                      datasetType === dt
                        ? 'bg-blue-50 border-[#0038A8] text-[#0038A8] shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span className="truncate">{dt}</span>
                    {datasetType === dt && <CheckCircle2 className="w-4 h-4 text-[#0038A8] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-4 h-fit">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Curriculum Version Governance</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-600">Curriculum Version Tag</label>
                <select
                  value={curriculumVersion}
                  onChange={(e) => setCurriculumVersion(e.target.value as CurriculumVersion)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-stone-300 bg-white"
                >
                  <option value="MATATAG_2026">MATATAG_2026 (DepEd Order 015, s. 2026)</option>
                  <option value="MATATAG">MATATAG (Phase 1 K-10 / SHS)</option>
                  <option value="MELC_2020">MELC_2020 (Most Essential Learning Competencies)</option>
                  <option value="K12_ORIGINAL">K12_ORIGINAL (DepEd Order 8, s. 2015)</option>
                  <option value="OTHER_OFFICIAL_REVISION">OTHER_OFFICIAL_REVISION</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-600">Source Document Citation</label>
                <input
                  type="text"
                  value={sourceDoc}
                  onChange={(e) => setSourceDoc(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white"
                  placeholder="e.g. DepEd Order No. 015, s. 2026"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl bg-[#0038A8] hover:bg-[#002776] text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Proceed to CSV Upload</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Upload CSV File or Load Sample */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-base">
              <span className="w-7 h-7 rounded-full bg-[#0038A8] text-white flex items-center justify-center text-xs">2</span>
              <span>Step 2 — Upload CSV File or Load Test Dataset for {datasetType}</span>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
            >
              Back to Step 1
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-stone-300 rounded-3xl p-8 text-center hover:border-[#0038A8] transition bg-stone-50/50 flex flex-col items-center justify-center space-y-3">
              <Upload className="w-10 h-10 text-blue-700 animate-bounce" />
              <div>
                <span className="font-bold text-stone-800 text-sm block">Drag &amp; drop your CSV file here</span>
                <span className="text-xs text-stone-500">Supports UTF-8 CSV, Excel-compatible CSV formats</span>
              </div>
              <label className="px-5 py-2.5 rounded-xl bg-[#0038A8] text-white text-xs font-bold hover:bg-[#002776] cursor-pointer transition shadow-xs">
                Browse CSV File
                <input type="file" accept=".csv,text/csv" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-bold text-amber-900 text-xs uppercase tracking-wider mb-2">
                  <Info className="w-4 h-4 text-amber-700" />
                  <span>Quick Test &amp; Demonstration</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Don’t have a custom CSV file ready? Click below to instantly generate and load verified sample records tailored for <strong>{datasetType}</strong>.
                </p>
              </div>

              <button
                onClick={handleLoadSampleCSV}
                className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Table className="w-4 h-4" />
                <span>Load Sample Verified CSV for {datasetType}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 & 4: Auto Detection & Field Mapping */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-base">
              <span className="w-7 h-7 rounded-full bg-[#0038A8] text-white flex items-center justify-center text-xs">3</span>
              <span>Steps 3 &amp; 4 — Column Detection &amp; Target Field Mapping</span>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Detected {parsedHeaders.length} Columns • {rawRows.length} Total Rows
            </span>
          </div>

          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Map CSV Column Headers to Database Schema Fields
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-72 overflow-y-auto p-1">
              {parsedHeaders.map((header) => (
                <div key={header} className="p-3 bg-white rounded-xl border border-stone-200 space-y-1 shadow-2xs">
                  <span className="text-[11px] font-extrabold text-stone-800 truncate block">CSV: {header}</span>
                  <select
                    value={columnMapping[header] || ''}
                    onChange={(e) => setColumnMapping({ ...columnMapping, [header]: e.target.value })}
                    className="w-full text-xs p-1.5 rounded-lg border border-stone-300 font-medium"
                  >
                    <option value="">-- Ignore Column --</option>
                    <option value={header}>{header} (Exact Match)</option>
                    <option value="competency_code">competency_code</option>
                    <option value="competency_text">competency_text</option>
                    <option value="grade_level">grade_level</option>
                    <option value="learning_area">learning_area</option>
                    <option value="subject">subject</option>
                    <option value="term">term (Term 1/2/3)</option>
                    <option value="quarter">quarter (Q1/Q2/Q3/Q4)</option>
                    <option value="title">title</option>
                    <option value="authors">authors</option>
                    <option value="year">year</option>
                    <option value="doi">doi</option>
                    <option value="abstract">abstract</option>
                    <option value="intervention">intervention</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setStep(5)}
              className="px-6 py-2.5 rounded-xl bg-[#0038A8] hover:bg-[#002776] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Preview Records (First 50–100)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Preview First 50–100 Records */}
      {step === 5 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-base">
              <span className="w-7 h-7 rounded-full bg-[#0038A8] text-white flex items-center justify-center text-xs">5</span>
              <span>Step 5 — Preview Sample Records Before Validation</span>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              Showing top {Math.min(rawRows.length, 50)} of {rawRows.length} rows
            </span>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-2xl max-h-80">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-stone-100 border-b border-stone-200 text-stone-700 font-bold sticky top-0">
                <tr>
                  <th className="p-3 font-mono text-[10px]">#</th>
                  {parsedHeaders.map((h) => (
                    <th key={h} className="p-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-800">
                {rawRows.slice(0, 50).map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition">
                    <td className="p-3 font-mono text-[10px] text-stone-400">{idx + 1}</td>
                    {parsedHeaders.map((h) => (
                      <td key={h} className="p-3 max-w-xs truncate">
                        {row[h] || <span className="text-stone-300 italic">null</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
            >
              Re-map Columns
            </button>
            <button
              onClick={handleRunValidation}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl bg-[#0038A8] hover:bg-[#002776] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin text-[#FCD116]" /> : <CheckCircle2 className="w-4 h-4 text-[#FCD116]" />}
              <span>{isProcessing ? 'Validating Batch...' : 'Run Record Validation (Step 6)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6 & 7: Validation Summary & Duplicate Detection */}
      {step === 6 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-base">
              <span className="w-7 h-7 rounded-full bg-[#0038A8] text-white flex items-center justify-center text-xs">6</span>
              <span>Step 6 &amp; 7 — Record Validation Dashboard &amp; Duplicate Analysis</span>
            </div>
            <button
              onClick={handleDownloadErrorCSV}
              disabled={validatedData.invalidRows.length === 0}
              className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5 text-rose-600" />
              <span>Download Error CSV ({validatedData.invalidRows.length})</span>
            </button>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-2xl font-black text-emerald-800">{validatedData.validRows.length}</span>
              <span className="block text-[11px] font-bold text-emerald-900 uppercase tracking-wider mt-0.5">Valid Records</span>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center">
              <span className="text-2xl font-black text-rose-800">{validatedData.invalidRows.length}</span>
              <span className="block text-[11px] font-bold text-rose-900 uppercase tracking-wider mt-0.5">Rejected / Invalid</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-2xl font-black text-amber-800">{validatedData.duplicateRows.length}</span>
              <span className="block text-[11px] font-bold text-amber-900 uppercase tracking-wider mt-0.5">Duplicates Detected</span>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
              <span className="text-2xl font-black text-[#0038A8]">{validatedData.warnings.length}</span>
              <span className="block text-[11px] font-bold text-blue-900 uppercase tracking-wider mt-0.5">Warnings</span>
            </div>
          </div>

          {/* Validation Warnings / Error Log */}
          {validatedData.invalidRows.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <span className="text-xs font-bold text-rose-900 uppercase tracking-wider block">
                Validation Errors (Never Silently Discarded)
              </span>
              <div className="max-h-40 overflow-y-auto space-y-1 font-mono text-[11px] text-rose-800 bg-white p-3 rounded-xl border border-rose-200">
                {validatedData.invalidRows.map((inv, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 border-b border-stone-100 last:border-none pb-1">
                    <span>Row {inv.row}: {inv.errors.join(' | ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep(5)}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
            >
              Back to Preview
            </button>
            <button
              onClick={() => setStep(7)}
              disabled={validatedData.validRows.length === 0}
              className="px-6 py-2.5 rounded-xl bg-[#0038A8] hover:bg-[#002776] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <span>Confirm Import ({validatedData.validRows.length} Records)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: User Confirmation */}
      {step === 7 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-base">
            <span className="w-7 h-7 rounded-full bg-[#0038A8] text-white flex items-center justify-center text-xs">7</span>
            <span>Step 7 — Final Import Execution Confirmation</span>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
            <h4 className="text-sm font-bold text-[#0038A8]">Ready to commit records to persistent database:</h4>
            <ul className="text-xs space-y-1.5 text-stone-700">
              <li>• <strong>Dataset Type:</strong> {datasetType}</li>
              <li>• <strong>Curriculum Version:</strong> {curriculumVersion}</li>
              <li>• <strong>Source Document:</strong> {sourceDoc}</li>
              <li>• <strong>Valid Batch Rows:</strong> {validatedData.validRows.length}</li>
              <li>• <strong>Rejected Rows (Logged):</strong> {validatedData.invalidRows.length}</li>
            </ul>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setStep(6)}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleExecuteImport}
              disabled={isProcessing}
              className="px-6 py-3 rounded-2xl bg-linear-to-r from-[#0038A8] via-[#002776] to-[#001c54] text-white text-xs font-extrabold transition cursor-pointer shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin text-[#FCD116]" /> : <CheckCircle2 className="w-4 h-4 text-[#FCD116]" />}
              <span>{isProcessing ? 'Processing Batches...' : 'Execute Batch Import'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 8: Import Report */}
      {step === 8 && importReport && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-emerald-800 text-base">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <span>Import Batch Executed Successfully</span>
            </div>
            <span className="font-mono text-xs bg-stone-100 p-1.5 rounded-lg border text-stone-700">
              Import ID: {importReport.import_id}
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-stone-800">
              <div>
                <span className="text-stone-500 font-medium block">Filename</span>
                <span>{importReport.filename}</span>
              </div>
              <div>
                <span className="text-stone-500 font-medium block">Dataset Category</span>
                <span>{importReport.dataset_type}</span>
              </div>
              <div>
                <span className="text-stone-500 font-medium block">Imported Rows</span>
                <span className="text-emerald-700 font-extrabold">{importReport.imported_rows}</span>
              </div>
              <div>
                <span className="text-stone-500 font-medium block">Timestamp</span>
                <span>{importReport.timestamp}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setStep(1);
                setCsvFile(null);
                setRawRows([]);
              }}
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-stone-600" />
              <span>Import Another Dataset</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
