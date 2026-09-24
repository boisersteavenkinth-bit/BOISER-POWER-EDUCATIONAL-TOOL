import { collection, addDoc, doc, updateDoc, getDocs, getDoc, query, where, orderBy, limit, serverTimestamp, getFirestore } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import config from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(config) : getApp();
export const db = getFirestore(app);

export interface KnowledgeRecord {
  id?: string;
  ownerId: string;
  createdBy: string;
  title: string;
  summary: string;
  content: string;
  categoryId?: string;
  recordType: 'reference' | 'lesson_plan' | 'stem_experiment' | 'assessment' | 'policy';
  memoryType: 'permanent' | 'temporary' | 'suggestion' | 'project';
  status: 'draft' | 'verified' | 'archived';
  verificationStatus: 'verified' | 'unverified' | 'pending_review';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  tags: string[];
  createdAt?: any;
  updatedAt?: any;
}

export interface DraftProject {
  id?: string;
  ownerId: string;
  title: string;
  projectType: 'Science PPT' | 'QR Worksheet' | 'Excel Workbook' | 'ILAW Lesson Plan' | 'STEM Prototype';
  description: string;
  subject: string;
  stage: 'Idea' | 'Drafting' | 'Review' | 'Finalized';
  content: any;
  version: number;
  status: 'draft' | 'submitted' | 'archived' | 'completed';
  lastModifiedBy: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface WorksheetRecord {
  id?: string;
  worksheetId: string;
  ownerId: string;
  title: string;
  subject: string;
  gradeLevel: string;
  teacherName: string;
  questions: Array<{ id: number; question: string; options?: string[]; correctAnswer: string; points: number }>;
  answerKey: Record<number, string>;
  qrCodeUrl?: string;
  createdAt?: any;
}

export interface BarcodeRecord {
  id?: string;
  barcodeValue: string;
  format: 'CODE128' | 'CODE39' | 'EAN13' | 'QR';
  itemName: string;
  category: string;
  ownerId: string;
  status: 'Active' | 'Archived' | 'Assigned';
  location?: string;
  createdAt?: any;
}

// Local Storage Fallback Cache Helper
const LOCAL_PROJECTS_KEY = 'bpt_local_draft_projects';
const LOCAL_WORKSHEETS_KEY = 'bpt_local_worksheets';
const LOCAL_BARCODES_KEY = 'bpt_local_barcodes';
const LOCAL_AUDIT_KEY = 'bpt_local_audit_logs';

export const logAuditEvent = async (event: string, userId: string, details: any) => {
  try {
    await addDoc(collection(db, 'auditLogs'), {
      event,
      userId,
      details,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    const logs = JSON.parse(localStorage.getItem(LOCAL_AUDIT_KEY) || '[]');
    logs.unshift({ event, userId, details, timestamp: new Date().toISOString() });
    localStorage.setItem(LOCAL_AUDIT_KEY, JSON.stringify(logs.slice(0, 100)));
  }
};

// 1. Save / Update Draft Project
export const saveDraftProject = async (project: DraftProject): Promise<DraftProject & { id: string }> => {
  const payload = {
    ...project,
    updatedAt: serverTimestamp(),
  };

  try {
    if (project.id && !project.id.startsWith('local_')) {
      const ref = doc(db, 'projects', project.id);
      await updateDoc(ref, payload);
      await logAuditEvent('PROJECT_UPDATED', project.ownerId, { projectId: project.id, title: project.title });
      return { ...project, id: project.id };
    } else {
      const ref = await addDoc(collection(db, 'projects'), {
        ...payload,
        createdAt: serverTimestamp()
      });
      await logAuditEvent('PROJECT_CREATED', project.ownerId, { projectId: ref.id, title: project.title });
      return { ...project, id: ref.id };
    }
  } catch (err) {
    console.warn('Firestore write failed, saving to local offline storage:', err);
    const localProjects: DraftProject[] = JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY) || '[]');
    const id = project.id || `local_${Date.now()}`;
    const updated = { ...project, id, updatedAt: new Date().toISOString() };
    const existingIndex = localProjects.findIndex(p => p.id === id);
    if (existingIndex >= 0) {
      localProjects[existingIndex] = updated;
    } else {
      localProjects.unshift(updated);
    }
    localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(localProjects));
    return updated;
  }
};

export const fetchDraftProjects = async (ownerId: string): Promise<DraftProject[]> => {
  try {
    const q = query(collection(db, 'projects'), where('ownerId', '==', ownerId), orderBy('updatedAt', 'desc'), limit(50));
    const snapshot = await getDocs(q);
    const remoteProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DraftProject));
    if (remoteProjects.length > 0) return remoteProjects;
  } catch (err) {
    console.warn('Could not fetch projects from Firestore, falling back to local storage:', err);
  }
  const localProjects: DraftProject[] = JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY) || '[]');
  return localProjects;
};

// 2. Worksheets Management
export const saveWorksheet = async (worksheet: WorksheetRecord): Promise<WorksheetRecord & { id: string }> => {
  try {
    const ref = await addDoc(collection(db, 'worksheets'), {
      ...worksheet,
      createdAt: serverTimestamp()
    });
    await logAuditEvent('WORKSHEET_CREATED', worksheet.ownerId, { worksheetId: worksheet.worksheetId, title: worksheet.title });
    return { ...worksheet, id: ref.id };
  } catch (err) {
    const localWorksheets: WorksheetRecord[] = JSON.parse(localStorage.getItem(LOCAL_WORKSHEETS_KEY) || '[]');
    const id = `local_ws_${Date.now()}`;
    const newWs = { ...worksheet, id };
    localWorksheets.unshift(newWs);
    localStorage.setItem(LOCAL_WORKSHEETS_KEY, JSON.stringify(localWorksheets));
    return newWs;
  }
};

export const fetchWorksheetById = async (worksheetId: string): Promise<WorksheetRecord | null> => {
  try {
    const q = query(collection(db, 'worksheets'), where('worksheetId', '==', worksheetId), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as WorksheetRecord;
    }
  } catch (err) {
    console.warn('Failed to query Firestore for worksheet:', err);
  }
  const localWorksheets: WorksheetRecord[] = JSON.parse(localStorage.getItem(LOCAL_WORKSHEETS_KEY) || '[]');
  return localWorksheets.find(w => w.worksheetId === worksheetId) || null;
};

// 3. Barcode Records
export const saveBarcodeRecord = async (barcode: BarcodeRecord): Promise<BarcodeRecord & { id: string }> => {
  try {
    const ref = await addDoc(collection(db, 'barcodeRecords'), {
      ...barcode,
      createdAt: serverTimestamp()
    });
    return { ...barcode, id: ref.id };
  } catch (err) {
    const local = JSON.parse(localStorage.getItem(LOCAL_BARCODES_KEY) || '[]');
    const id = `local_bc_${Date.now()}`;
    const newBc = { ...barcode, id };
    local.unshift(newBc);
    localStorage.setItem(LOCAL_BARCODES_KEY, JSON.stringify(local));
    return newBc;
  }
};

export const fetchBarcodeRecords = async (ownerId: string): Promise<BarcodeRecord[]> => {
  try {
    const q = query(collection(db, 'barcodeRecords'), where('ownerId', '==', ownerId), limit(50));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as BarcodeRecord));
    }
  } catch (err) {
    console.warn('Fallback local barcodes');
  }
  return JSON.parse(localStorage.getItem(LOCAL_BARCODES_KEY) || '[]');
};

export const dataVaultService = {
  saveProject: async (proj: { title: string; category: string; tags: string[]; content: string; subject?: string; gradeLevel?: string; isPinned?: boolean }) => {
    return saveDraftProject({
      ownerId: 'MASTER_STEAVEN_BOISER',
      title: proj.title,
      projectType: 'ILAW Lesson Plan',
      description: `LRMDS Curriculum Resource: ${proj.subject || ''} ${proj.gradeLevel || ''}`,
      subject: proj.subject || 'General Education',
      stage: 'Finalized',
      content: proj.content,
      version: 1,
      status: 'completed',
      lastModifiedBy: 'STEAVEN KINTH D. BOISER'
    });
  },
  saveDraftProject,
  fetchDraftProjects,
  saveWorksheet,
  fetchWorksheetById,
  saveBarcodeRecord,
  fetchBarcodeRecords,
  logAuditEvent
};
