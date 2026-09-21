import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { DatabaseBrowser } from './components/DatabaseBrowser';
import { Grade11ThreeTermBOW } from './components/Grade11ThreeTermBOW';
import { ThreeTermGradingEngine } from './components/ThreeTermGradingEngine';
import { ILAWGenerator } from './components/ILAWGenerator';
import { SHSSplitAnalyzer } from './components/SHSSplitAnalyzer';
import { LessonPlanner } from './components/LessonPlanner';
import { AssessmentBuilder } from './components/AssessmentBuilder';
import { CanvaBridge } from './components/CanvaBridge';
import { TechProDirectory } from './components/TechProDirectory';
import { PolicyDocs } from './components/PolicyDocs';
import { INITIAL_COMPETENCIES } from './data/competencies';
import { CompetencyRecord } from './types';
import { BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'boiser_education_competencies_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('database');
  const [competencies, setCompetencies] = useState<CompetencyRecord[]>(INITIAL_COMPETENCIES);
  const [selectedCompetency, setSelectedCompetency] = useState<CompetencyRecord | null>(null);

  // Load local cache if available, else keep initial verified set
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge to ensure verified initial records are preserved
          const existingIds = new Set(parsed.map((p: any) => p.id));
          const missing = INITIAL_COMPETENCIES.filter((c) => !existingIds.has(c.id));
          setCompetencies([...parsed, ...missing]);
          return;
        }
      }
    } catch (e) {
      console.warn('Could not parse local competency cache', e);
    }
  }, []);

  const verifiedCount = competencies.filter((c) => c.verification_status === 'verified').length;

  const handleSelectForLessonPlan = (comp: CompetencyRecord) => {
    setSelectedCompetency(comp);
    setActiveTab('lesson-planner');
  };

  const handleSelectForAssessment = (comp: CompetencyRecord) => {
    setSelectedCompetency(comp);
    setActiveTab('assessment');
  };

  const handleSelectForCanva = (comp: CompetencyRecord) => {
    setSelectedCompetency(comp);
    setActiveTab('canva-bridge');
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalCompetencies={competencies.length}
        verifiedCount={verifiedCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'database' && (
          <DatabaseBrowser
            competencies={competencies}
            onSelectForLessonPlan={handleSelectForLessonPlan}
            onSelectForAssessment={handleSelectForAssessment}
            onSelectForCanva={handleSelectForCanva}
            onNavigateToGrade11BOW={() => setActiveTab('grade11-bow')}
          />
        )}

        {activeTab === 'grade11-bow' && (
          <Grade11ThreeTermBOW
            onNavigateToILAW={() => setActiveTab('ilaw-generator')}
          />
        )}

        {activeTab === 'three-term-grading' && <ThreeTermGradingEngine />}

        {activeTab === 'ilaw-generator' && <ILAWGenerator />}

        {activeTab === 'shs-split' && <SHSSplitAnalyzer />}

        {activeTab === 'lesson-planner' && (
          <LessonPlanner
            competencies={competencies}
            selectedCompetency={selectedCompetency}
            onSelectCompetency={setSelectedCompetency}
            onSendToCanva={handleSelectForCanva}
          />
        )}

        {activeTab === 'assessment' && (
          <AssessmentBuilder
            competencies={competencies}
            selectedCompetency={selectedCompetency}
          />
        )}

        {activeTab === 'canva-bridge' && (
          <CanvaBridge
            competencies={competencies}
            selectedCompetency={selectedCompetency}
          />
        )}

        {activeTab === 'techpro' && <TechProDirectory />}

        {activeTab === 'policies' && <PolicyDocs />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-700" />
            <span className="font-bold text-stone-800">
              Boiser Powerful Education Tools
            </span>
            <span>•</span>
            <span>2026 Three-Term K–12 Extraction Master</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-500">
            <span>DepEd Order No. 009 & 015, s. 2026</span>
            <span>•</span>
            <span className="font-medium text-emerald-700">Database is Single Source of Truth</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
