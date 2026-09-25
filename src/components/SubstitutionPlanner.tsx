import React, { useState, useRef } from 'react';
import { Printer, Edit3, Save, X, Eye, FileText, Download, Share2, Maximize, UserPlus } from 'lucide-react';
import { exportSubstitutionToDocx } from '../utils/substitutionDocxExporter';
import { useAuth } from '../context/AuthContext';

export const SubstitutionPlanner: React.FC = () => {
  const { userRegistry, addSubstitutionPlan } = useAuth();
  const [subject, setSubject] = useState('');
  const [section, setSection] = useState('');
  const [substituteEmail, setSubstituteEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPosted, setIsPosted] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setIsPosted(false);
    try {
      const response = await fetch('/api/generate-substitution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, section, notes }),
      });
      const data = await response.json();
      setGeneratedPlan(data.data);
      setEditedPlan(data.data);
    } catch (error) {
      console.error('Failed to generate substitution plan', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadWord = async () => {
    await exportSubstitutionToDocx({
      subject,
      section,
      content: editedPlan,
      date: new Date().toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })
    });
  };

  const handlePostToPortals = () => {
    if (!substituteEmail) {
      alert('Please select a substitute teacher first.');
      return;
    }
    
    addSubstitutionPlan({
      subject,
      section,
      substituteTeacherEmail: substituteEmail,
      date: new Date().toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }),
      startTime: '7:30 AM',
      content: editedPlan
    });
    
    setIsPosted(true);
    setTimeout(() => setIsPosted(false), 3000);
  };

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
    setIsFullScreen(false);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Configuration Header */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
        <h2 className="text-lg font-bold text-blue-900">Clarification: Substitution Start Time</h2>
        <p className="text-blue-700">Please note that all substitution schedules strictly start at 7:30 AM.</p>
      </div>

      {/* Input Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">Generate Substitution Plan</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Subject</label>
            <input 
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              placeholder="e.g., Mathematics" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Section</label>
            <input 
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={section} 
              onChange={(e) => setSection(e.target.value)} 
              placeholder="e.g., Grade 11-A" 
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
              <UserPlus className="w-3.5 h-3.5" /> Assign Substitute Teacher
            </label>
            <select 
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={substituteEmail}
              onChange={(e) => setSubstituteEmail(e.target.value)}
            >
              <option value="">-- Select Teacher --</option>
              {userRegistry.map(u => (
                <option key={u.email} value={u.email}>{u.name} ({u.email})</option>
              ))}
              <option value="teacher.rox@deped.gov.ph">SHS Teacher Account (Mock)</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">Notes/Instructions</label>
          <textarea 
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32"
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            placeholder="Enter details for the substitute teacher..." 
          />
        </div>
        <button 
          className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-50"
          onClick={handleGenerate} 
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Substitution Plan'}
        </button>
      </div>

      {/* Inline Preview/Action */}
      {generatedPlan && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h4 className="text-lg font-bold text-gray-800">Substitution Plan Generated</h4>
            <div className="flex items-center gap-2">
              <button 
                onClick={togglePreview}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all"
              >
                <Eye className="w-4 h-4" /> Full Preview
              </button>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all"
              >
                <Printer className="w-4 h-4" /> Quick Print
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 font-serif text-gray-800 whitespace-pre-wrap max-h-64 overflow-y-auto">
            {editedPlan}
          </div>
        </div>
      )}

      {/* FULL SCREEN MODAL PREVIEW */}
      {isPreviewOpen && (
        <div className={`fixed inset-0 z-50 flex flex-col bg-white overflow-hidden animate-in fade-in zoom-in duration-200 no-print ${isFullScreen ? 'p-0' : ''}`}>
          {/* Modal Header */}
          <div className={`flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 ${isFullScreen ? 'hidden' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Substitute Preview Modal</h2>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Print-Ready View</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleFullScreen}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-black text-white font-bold rounded-lg shadow-md transition-all"
              >
                <Maximize className="w-4 h-4" /> Full Screen
              </button>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                  isEditing ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm'
                }`}
              >
                {isEditing ? <><Save className="w-4 h-4" /> Finish Editing</> : <><Edit3 className="w-4 h-4" /> Edit/Adjust Mode</>}
              </button>
              <button 
                onClick={handlePostToPortals}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold shadow-md transition-all ${
                  isPosted ? 'bg-emerald-500 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                <Share2 className="w-4 h-4" /> {isPosted ? 'Posted to Portals!' : 'Post to Portals'}
              </button>
              <button 
                onClick={handleDownloadWord}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md transition-all"
              >
                <Download className="w-4 h-4" /> Word (.docx)
              </button>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all"
              >
                <Printer className="w-4 h-4" /> Print Form
              </button>
              <button 
                onClick={togglePreview}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all ml-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Full Screen Close Button */}
          {isFullScreen && (
            <button 
              onClick={toggleFullScreen}
              className="fixed top-4 right-4 z-[60] p-2 bg-black/50 text-white rounded-full hover:bg-black transition-all no-print"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          {/* Modal Content / Document View */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-10 bg-gray-100">
            <div className={`max-w-4xl mx-auto bg-white shadow-2xl p-8 sm:p-16 min-h-[1056px] border border-gray-300 print:shadow-none print:border-none print:p-0 print:m-0 ${isFullScreen ? 'my-0 shadow-none border-none w-full max-w-none' : ''}`}>
              {isEditing ? (
                <div className="space-y-4 h-full">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
                    <span className="text-sm font-bold text-emerald-600 flex items-center gap-2 uppercase tracking-tight">
                      <Edit3 className="w-3.5 h-3.5" /> Editing Active Document
                    </span>
                    <span className="text-[10px] text-gray-400">Manual adjustments will be saved for this session</span>
                  </div>
                  <textarea 
                    className="w-full h-[900px] p-4 text-gray-800 font-serif leading-relaxed text-lg outline-none resize-none bg-emerald-50/30 border border-emerald-100 rounded-lg focus:ring-1 focus:ring-emerald-200"
                    value={editedPlan}
                    onChange={(e) => setEditedPlan(e.target.value)}
                  />
                </div>
              ) : (
                <div className="prose prose-sm max-w-none font-serif text-gray-900 leading-relaxed print:text-black">
                  <div className="border-b-4 border-double border-gray-900 pb-4 mb-8 text-center uppercase">
                    <h1 className="text-3xl font-black m-0 p-0">Substitution Report & Plan</h1>
                    <p className="text-sm font-bold mt-1">LNNCHS — Faculty Department</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                    <div>
                      <p className="border-b border-gray-400 py-1"><span className="font-bold">Subject:</span> {subject || 'N/A'}</p>
                      <p className="border-b border-gray-400 py-1"><span className="font-bold">Section:</span> {section || 'N/A'}</p>
                      <p className="border-b border-gray-400 py-1"><span className="font-bold">Substitute:</span> {userRegistry.find(u => u.email === substituteEmail)?.name || substituteEmail || 'TBD'}</p>
                    </div>
                    <div>
                      <p className="border-b border-gray-400 py-1"><span className="font-bold">Start Time:</span> 7:30 AM (Strict)</p>
                      <p className="border-b border-gray-400 py-1"><span className="font-bold">Date:</span> {new Date().toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="whitespace-pre-wrap text-lg">
                    {editedPlan}
                  </div>

                  <div className="mt-16 grid grid-cols-2 gap-16 pt-8 border-t border-gray-200">
                    <div className="text-center">
                      <div className="border-b border-gray-900 mb-1"></div>
                      <p className="text-[10px] font-bold uppercase">Substitute Teacher</p>
                    </div>
                    <div className="text-center">
                      <div className="border-b border-gray-900 mb-1"></div>
                      <p className="text-[10px] font-bold uppercase">Assigned Faculty Member</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Print-Only View */}
      <div className="hidden print:block print:fixed print:inset-0 print:z-[100] print:bg-white print:p-0">
        <div className="font-serif text-black leading-relaxed p-0">
          <div className="border-b-4 border-double border-black pb-4 mb-8 text-center uppercase">
            <h1 className="text-3xl font-black m-0 p-0">Substitution Report & Plan</h1>
            <p className="text-sm font-bold mt-1">LNNCHS — Faculty Department</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
            <div>
              <p className="border-b border-black py-1"><span className="font-bold">Subject:</span> {subject || 'N/A'}</p>
              <p className="border-b border-black py-1"><span className="font-bold">Section:</span> {section || 'N/A'}</p>
            </div>
            <div>
              <p className="border-b border-black py-1"><span className="font-bold">Start Time:</span> 7:30 AM (Strict)</p>
              <p className="border-b border-black py-1"><span className="font-bold">Date:</span> {new Date().toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          <div className="whitespace-pre-wrap text-lg">
            {editedPlan}
          </div>

          <div className="mt-16 grid grid-cols-2 gap-16 pt-8">
            <div className="text-center">
              <div className="border-b border-black mb-1 h-12"></div>
              <p className="text-[10px] font-bold uppercase">Substitute Teacher Signature</p>
            </div>
            <div className="text-center">
              <div className="border-b border-black mb-1 h-12"></div>
              <p className="text-[10px] font-bold uppercase">Assigned Faculty Member</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .no-print {
            display: none !important;
          }
          .print-only, .print-only * {
            visibility: visible;
          }
          .print\\:block {
            display: block !important;
            visibility: visible !important;
          }
          .print\\:block * {
            visibility: visible !important;
          }
        }
      `}</style>
    </div>
  );
};
