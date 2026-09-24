export interface LTMEntry {
  id: string;
  title: string;
  timestamp: string;
  durationSeconds: number;
  audioUrl?: string;
  transcript: string;
  language: string;
  category: 'Lesson Planning' | 'Classroom Observation' | 'Learner Recitation' | 'Faculty Meeting' | 'Pedagogical Reflection';
  term: 'Term 1' | 'Term 2' | 'Term 3';
  week?: number;
  tags: string[];
  actionItems: string[];
  confidenceScore: number;
  whisperModel: string;
  summary: string;
}

const STORAGE_KEY = 'deped_whisper_ltm_entries_v1';

const INITIAL_SEEDED_LTM_ENTRIES: LTMEntry[] = [
  {
    id: 'ltm-seed-001',
    title: 'Grade 11 Rational Functions Mastery Check (ILAW Session)',
    timestamp: '2026-09-18 10:45 AM',
    durationSeconds: 142,
    transcript: 'During today’s collaborative group activity on rational functions in General Mathematics, Section Rizal demonstrated high engagement when applying vertical and horizontal asymptotes to real-life Philippine cellphone data rate plans. About five students needed additional scaffolding on domain restrictions where denominator equals zero. For tomorrow’s session under the ILAW worksheet, we will implement peer tutoring before the 5-item exit formative quiz.',
    language: 'English / Taglish',
    category: 'Classroom Observation',
    term: 'Term 1',
    week: 4,
    tags: ['Grade 11', 'GenMath', 'Rational Functions', 'ILAW Matrix', 'Formative Assessment'],
    actionItems: [
      'Prepare 3 differentiated peer scaffolding flashcards for domain restriction zero denominator',
      'Log mastery rate in DepEd SF9 Trimester Sheet'
    ],
    confidenceScore: 0.98,
    whisperModel: 'whisper-base',
    summary: 'High student engagement applying rational functions to data plans; scaffold needed on domain restrictions for 5 learners.'
  },
  {
    id: 'ltm-seed-002',
    title: 'DO 009 Trimester SF9 Grading Deliberation Notes',
    timestamp: '2026-09-15 03:20 PM',
    durationSeconds: 215,
    transcript: 'Met with Department Head and SHS faculty regarding the transition to the Three-Term School Calendar under DepEd Order No. 009, s. 2026. Verified that each term comprises 67 days, making the total school year exactly 201 days. We clarified that the 20% Formative Quarterly Assessment in our TOS matches the trimester weight, and honor roll qualifications require no grade below 85 in any trimester subject.',
    language: 'English',
    category: 'Faculty Meeting',
    term: 'Term 1',
    week: 3,
    tags: ['DO 009 s 2026', 'Three-Term Calendar', '201 Days', 'Trimester Grading', 'SF9'],
    actionItems: [
      'Distribute the new 3-Term Trimester grading template to all Grade 11 advisers',
      'Verify term end exam schedule for Term 1 Week 14'
    ],
    confidenceScore: 0.99,
    whisperModel: 'whisper-large-v3',
    summary: 'Department agreement on 201-day three-term distribution (67 days/term) and revised SF9 trimester honors criteria.'
  },
  {
    id: 'ltm-seed-003',
    title: 'Grade 12 TechPro Workshop Safety & Equipment Check',
    timestamp: '2026-09-10 09:15 AM',
    durationSeconds: 98,
    transcript: 'Inspected the Automotive and Electrical laboratory workshop for Section Bonifacio. All learners wore compliant PPE including protective goggles and insulated gloves prior to operating circuit simulator boards. Identified two multimeter test leads that require replacement before Term 2 practical assessment.',
    language: 'English',
    category: 'Pedagogical Reflection',
    term: 'Term 1',
    week: 2,
    tags: ['TechPro', 'Grade 12', 'Workshop Safety', 'PPE', 'TVL Track'],
    actionItems: [
      'Requisition two replacement multimeter test leads from school property custodian',
      'Ensure safety rubrics are logged in the practical TOS'
    ],
    confidenceScore: 0.97,
    whisperModel: 'whisper-small',
    summary: 'Complete PPE compliance verified in TechPro workshop; scheduled requisition for 2 multimeter test leads.'
  }
];

export function getLTMEntries(): LTMEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_LTM_ENTRIES));
      return INITIAL_SEEDED_LTM_ENTRIES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load LTM entries from storage:', err);
    return INITIAL_SEEDED_LTM_ENTRIES;
  }
}

export function saveLTMEntries(entries: LTMEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (err) {
    console.error('Failed to save LTM entries to storage:', err);
  }
}

export function addLTMEntry(entry: Omit<LTMEntry, 'id'>): LTMEntry {
  const entries = getLTMEntries();
  const newEntry: LTMEntry = {
    ...entry,
    id: `ltm-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
  };
  const updated = [newEntry, ...entries];
  saveLTMEntries(updated);
  return newEntry;
}

export function deleteLTMEntry(id: string): LTMEntry[] {
  const entries = getLTMEntries();
  const updated = entries.filter((e) => e.id !== id);
  saveLTMEntries(updated);
  return updated;
}

export function exportLTMAsMarkdown(entries: LTMEntry[]): string {
  let md = `# DepEd Teacher Long-Term Memory (LTM) Audio & Transcript Archive\n`;
  md += `Generated: ${new Date().toLocaleString()} | SY 2026–2027 Three-Term K-12 Master\n`;
  md += `Standards: DepEd Order No. 009 & No. 015, s. 2026 | Region X Northern Mindanao\n\n---\n\n`;

  entries.forEach((e, idx) => {
    md += `## ${idx + 1}. ${e.title}\n`;
    md += `- **Date/Time**: ${e.timestamp}\n`;
    md += `- **Category**: ${e.category} | **Term**: ${e.term} (Week ${e.week || 'N/A'})\n`;
    md += `- **Whisper Model**: ${e.whisperModel} | **Confidence**: ${(e.confidenceScore * 100).toFixed(1)}%\n`;
    md += `- **Summary**: ${e.summary}\n\n`;
    md += `### Verbatim Audio Transcript\n> ${e.transcript}\n\n`;
    if (e.actionItems && e.actionItems.length > 0) {
      md += `### Actionable Next Steps\n`;
      e.actionItems.forEach((action) => {
        md += `- [ ] ${action}\n`;
      });
      md += `\n`;
    }
    if (e.tags && e.tags.length > 0) {
      md += `**Tags**: \`${e.tags.join('`, `')}\`\n\n`;
    }
    md += `---\n\n`;
  });

  return md;
}

export function exportLTMAsJSON(entries: LTMEntry[]): string {
  return JSON.stringify(entries, null, 2);
}
