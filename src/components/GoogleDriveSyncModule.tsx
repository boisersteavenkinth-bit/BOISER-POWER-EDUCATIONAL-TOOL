import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  Cloud,
  HardDrive,
  Upload,
  FolderPlus,
  RefreshCw,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FileText,
  FileSpreadsheet,
  Layers,
  Sparkles,
  Search,
  ShieldCheck,
  Folder,
  Download,
  Database,
  ArrowRight,
  LogOut,
  UserCheck,
  Calendar,
  Award,
  BookOpen,
  X,
  FileCheck
} from 'lucide-react';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken
} from '../lib/googleAuth';
import {
  uploadTextFileToDrive,
  uploadBlobToDrive,
  getOrCreateFolder,
  listDriveFiles,
  deleteDriveFile,
  shareDriveFileWithEmail,
  getDriveStorageInfo,
  DriveFileItem
} from '../services/googleDriveService';
import { LNNCHS_20_SECTIONS_PER_GRADE } from '../data/lnnchsCompleteSectionsDirectory';
import {
  LNNCHS_SHS_TEACHER_LOADINGS,
  LNNCHS_SIGNATORIES,
  LNNCHS_G12_INTERVENTIONS,
  LNNCHS_LIFE_CAREER_TOS,
  LIFE_CAREER_EXAM_ANSWER_KEY
} from '../data/lnnchsOfficialSHSSchedulesAndExams';

export const GoogleDriveSyncModule: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(true);

  // Drive state
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [storageQuota, setStorageQuota] = useState<{ limit?: string; usage?: string }>({});

  // Confirmation Modal state for destructive delete
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // New folder dialog
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Selected item to upload
  const [activeTab, setActiveTab] = useState<'backup_hub' | 'drive_explorer' | 'quick_exports'>('backup_hub');

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        setNeedsAuth(false);
        loadDriveFiles();
        loadStorage();
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setStatusMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        setNeedsAuth(false);
        setStatusMessage({ type: 'success', text: `Welcome, ${result.user.displayName || 'Educator'}! Google Drive is ready.` });
        loadDriveFiles();
        loadStorage();
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Google Drive authentication failed. Please retry.' });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
      setNeedsAuth(true);
      setFiles([]);
      setStatusMessage({ type: 'info', text: 'Signed out of Google Drive.' });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const loadDriveFiles = async () => {
    setIsLoadingFiles(true);
    try {
      const driveFiles = await listDriveFiles({ pageSize: 50 });
      setFiles(driveFiles);
    } catch (err: any) {
      console.error('Failed to load Drive files:', err);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const loadStorage = async () => {
    try {
      const info = await getDriveStorageInfo();
      setStorageQuota(info);
    } catch (e) {
      console.error('Storage info error:', e);
    }
  };

  // 🌟 COMPLETE APP BACKUP TO GOOGLE DRIVE (STARTING FROM SCRATCH)
  const handleFullAppBackupToDrive = async () => {
    setIsBackingUp(true);
    setStatusMessage(null);
    setBackupProgress('Initializing Google Drive root workspace...');

    try {
      // 1. Create / Retrieve Main Root Folder
      const rootFolderId = await getOrCreateFolder('LNNCHS Multi-Sync Educational Suite (SY 2026-2027)');

      // 2. Create subfolders
      setBackupProgress('Creating structured department folders in Drive...');
      const dirFolderId = await getOrCreateFolder('01_Master_120_Sections_Directory', rootFolderId);
      const facultyFolderId = await getOrCreateFolder('02_SHS_Faculty_Loading_and_Class_Programs', rootFolderId);
      const examsFolderId = await getOrCreateFolder('03_Standardized_Examinations_and_TOS', rootFolderId);
      const curriculumFolderId = await getOrCreateFolder('04_DepEd_Three_Term_Curriculum_BOW', rootFolderId);

      // 3. Upload 120-Section Master Directory
      setBackupProgress('Uploading LNNCHS Master 120-Sections Directory & Advisers JSON...');
      await uploadTextFileToDrive({
        fileName: 'LNNCHS_120_Sections_Master_Directory_SY2026-2027.json',
        content: JSON.stringify(LNNCHS_20_SECTIONS_PER_GRADE, null, 2),
        mimeType: 'application/json',
        folderId: dirFolderId,
        description: 'Complete LNNCHS 120-Section master database with 5,400 learners and official advisers.'
      });

      // 4. Upload SHS Teacher Loading & Class Programs
      setBackupProgress('Uploading Senior High School 49-Faculty Loading Matrix...');
      const shsData = {
        signatories: LNNCHS_SIGNATORIES,
        facultyLoading: LNNCHS_SHS_TEACHER_LOADINGS,
        rotationalInterventions: LNNCHS_G12_INTERVENTIONS,
        generatedAt: new Date().toISOString(),
        institution: 'Lanao del Norte National Comprehensive High School (School ID: 304005)'
      };
      await uploadTextFileToDrive({
        fileName: 'LNNCHS_SHS_49_Faculty_Loading_and_Interventions.json',
        content: JSON.stringify(shsData, null, 2),
        mimeType: 'application/json',
        folderId: facultyFolderId,
        description: 'SHS faculty workloads, regular/ALS periods, and Grade 12 Rotational SII schedules.'
      });

      // 5. Upload Examinations & TOS
      setBackupProgress('Uploading Life & Career Skills Exam, TOS & Official Answer Key...');
      const examData = {
        examTitle: 'Term 1 Examination in Life and Career Skills (Grade 11)',
        preparedBy: 'Mary Els E. Markines',
        tableOfSpecifications: LNNCHS_LIFE_CAREER_TOS,
        answerKey: LIFE_CAREER_EXAM_ANSWER_KEY,
        ruteExamInfo: 'Regional Unified Term Exam (RUTE) - 60 Items Pag-aaral ng Kasaysayan at Lipunang Pilipino',
        exportedAt: new Date().toISOString()
      };
      await uploadTextFileToDrive({
        fileName: 'LNNCHS_Term1_LifeCareer_Exam_TOS_AnswerKey.json',
        content: JSON.stringify(examData, null, 2),
        mimeType: 'application/json',
        folderId: examsFolderId,
        description: 'Standardized 60-item assessment suite, TOS, and 100% complete scoring key.'
      });

      // 6. Master App State & Configuration Backup
      setBackupProgress('Packaging complete Full-App Master Snapshot (Scratch to Live)...');
      const masterAppSnapshot = {
        appMetadata: {
          name: 'DepEd Grade 11 Three-Term BOW & ILAW Plan Multi-Sync App',
          schoolName: 'Lanao del Norte National Comprehensive High School',
          schoolId: '304005',
          division: 'Lanao del Norte',
          region: 'Region X - Northern Mindanao',
          schoolYear: '2026-2027',
          backupTimestamp: new Date().toISOString(),
          primaryAccountEmail: user?.email || 'boisersteavenkinth@gmail.com',
          collaboratorAccountEmail: 'operativecreative@gmail.com',
          primaryLead: 'Steaven Kinth D. Boiser',
          authorizedGoogleAccounts: [
            'boisersteavenkinth@gmail.com',
            'operativecreative@gmail.com'
          ]
        },
        sectionsDirectory: LNNCHS_20_SECTIONS_PER_GRADE,
        shsFacultyLoading: LNNCHS_SHS_TEACHER_LOADINGS,
        signatories: LNNCHS_SIGNATORIES,
        interventions: LNNCHS_G12_INTERVENTIONS,
        examinations: examData,
        curriculumPolicy: 'DO 3, s. 2026 (Three-Term Calendar) & DO 10/12 s. 2020'
      };

      await uploadTextFileToDrive({
        fileName: `LNNCHS_Complete_System_Master_Backup_${new Date().toISOString().split('T')[0]}.json`,
        content: JSON.stringify(masterAppSnapshot, null, 2),
        mimeType: 'application/json',
        folderId: rootFolderId,
        description: 'Full system restore snapshot created directly from app scratch data. Authorized for boisersteavenkinth@gmail.com and operativecreative@gmail.com.'
      });

      // Attempt to share root folder with operativecreative@gmail.com if not already shared
      try {
        await shareDriveFileWithEmail(rootFolderId, 'operativecreative@gmail.com', 'writer');
      } catch (shareErr) {
        console.log('Folder shared or permissions already active:', shareErr);
      }

      setStatusMessage({
        type: 'success',
        text: '🎉 Full App Snapshot successfully saved to your Google Drive & shared with operativecreative@gmail.com!'
      });
      loadDriveFiles();
    } catch (err: any) {
      console.error('Backup error:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to complete full Google Drive backup.'
      });
    } finally {
      setIsBackingUp(false);
      setBackupProgress('');
    }
  };

  // Explicitly share a file with operativecreative@gmail.com
  const handleShareWithOperativeCreative = async (fileId: string, fileName: string) => {
    try {
      await shareDriveFileWithEmail(fileId, 'operativecreative@gmail.com', 'writer');
      setStatusMessage({
        type: 'success',
        text: `✅ Successfully shared "${fileName}" with operativecreative@gmail.com (Writer access)!`
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || `Failed to share "${fileName}" with operativecreative@gmail.com.`
      });
    }
  };

  // Quick Export Individual Files
  const handleQuickSaveToDrive = async (type: string, title: string) => {
    setIsBackingUp(true);
    setStatusMessage(null);
    setBackupProgress(`Saving ${title} to Google Drive...`);

    try {
      const rootFolderId = await getOrCreateFolder('LNNCHS Multi-Sync Educational Suite (SY 2026-2027)');
      let content = '';
      let fileName = '';

      if (type === 'directory') {
        fileName = 'LNNCHS_120_Sections_Adviser_Directory.json';
        content = JSON.stringify(LNNCHS_20_SECTIONS_PER_GRADE, null, 2);
      } else if (type === 'loading') {
        fileName = 'LNNCHS_SHS_Teacher_Loading_Summary.json';
        content = JSON.stringify({ faculty: LNNCHS_SHS_TEACHER_LOADINGS, signatories: LNNCHS_SIGNATORIES }, null, 2);
      } else if (type === 'tos_exam') {
        fileName = 'LNNCHS_Life_and_Career_Skills_Exam_and_TOS.json';
        content = JSON.stringify({ tos: LNNCHS_LIFE_CAREER_TOS, answerKey: LIFE_CAREER_EXAM_ANSWER_KEY }, null, 2);
      } else if (type === 'interventions') {
        fileName = 'LNNCHS_G12_Rotational_SII_Schedules.json';
        content = JSON.stringify(LNNCHS_G12_INTERVENTIONS, null, 2);
      }

      await uploadTextFileToDrive({
        fileName,
        content,
        folderId: rootFolderId,
        description: `Exported ${title} from LNNCHS Educational Suite`
      });

      setStatusMessage({
        type: 'success',
        text: `✅ ${title} saved to your Google Drive successfully!`
      });
      loadDriveFiles();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || `Failed to save ${title} to Google Drive.`
      });
    } finally {
      setIsBackingUp(false);
      setBackupProgress('');
    }
  };

  // Confirm delete handler (Mandatory Destructive Operation Prompt)
  const confirmDeleteFile = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(fileToDelete.id);
      setStatusMessage({ type: 'success', text: `Deleted "${fileToDelete.name}" from Google Drive.` });
      setFileToDelete(null);
      loadDriveFiles();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete file from Google Drive.' });
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredFiles = files.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-500/30">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
              <Cloud className="w-3.5 h-3.5 animate-pulse" />
              Google Drive Cloud Sync &amp; Backup Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Save Application &amp; School Files to Google Drive
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
              Seamlessly back up your entire LNNCHS Educational Suite starting from scratch: Master 120-Section LIS Directory, SHS Faculty Loading, 60-Item Exams, TOS, Grade 11-12 BOW, and School Forms directly into your Google Drive.
            </p>
          </div>

          {/* Auth State Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col items-start sm:items-end justify-center gap-3">
            {needsAuth ? (
              <div className="space-y-2">
                <p className="text-xs text-emerald-200">Connect your Google Account to enable Cloud Sync:</p>
                {/* Official Google Material Sign-In Button */}
                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="flex items-center gap-3 px-5 py-2.5 bg-white text-slate-800 hover:bg-slate-50 active:bg-slate-100 font-semibold text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  {isLoggingIn ? 'Connecting to Drive...' : 'Sign in with Google'}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5 justify-end">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {user?.displayName || 'Educator'}
                  </p>
                  <p className="text-[11px] text-emerald-200 truncate max-w-[200px]">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sign out of Google"
                  className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/30 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-emerald-800/50 pt-4">
          <button
            onClick={() => setActiveTab('backup_hub')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'backup_hub'
                ? 'bg-white text-emerald-950 shadow-md font-black'
                : 'bg-emerald-950/60 hover:bg-emerald-800/50 text-emerald-100'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            1-Click Full App Backup
          </button>
          <button
            onClick={() => setActiveTab('quick_exports')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'quick_exports'
                ? 'bg-white text-emerald-950 shadow-md font-black'
                : 'bg-emerald-950/60 hover:bg-emerald-800/50 text-emerald-100'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Individual School Artifacts
          </button>
          <button
            onClick={() => {
              setActiveTab('drive_explorer');
              if (!needsAuth) loadDriveFiles();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'drive_explorer'
                ? 'bg-white text-emerald-950 shadow-md font-black'
                : 'bg-emerald-950/60 hover:bg-emerald-800/50 text-emerald-100'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            Google Drive Explorer ({files.length})
          </button>
        </div>
      </div>

      {/* Status Notifications */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs sm:text-sm animate-fadeIn ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : statusMessage.type === 'error'
              ? 'bg-red-50 text-red-900 border-red-200'
              : 'bg-blue-50 text-blue-900 border-blue-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
            {statusMessage.type === 'error' && <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />}
            {statusMessage.type === 'info' && <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TAB 1: 1-CLICK FULL APP BACKUP */}
      {activeTab === 'backup_hub' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Action Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider">
                Full System Synchronization
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Save &amp; Backup Entire App to Google Drive
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This process creates a dedicated root folder in your personal Google Drive and uploads every component of the LNNCHS application starting from scratch:
              </p>
            </div>

            {/* Structured Contents to be Synced */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <div className="p-2 bg-blue-100 text-blue-800 rounded-xl">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">120-Section Master LIS Directory</h4>
                  <p className="text-[11px] text-slate-500">All 120 sections (G7-G12), 5,400 learners, and assigned advisers.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-800 rounded-xl">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">SHS 49-Faculty Loading</h4>
                  <p className="text-[11px] text-slate-500">Summary of loads, ALS periods, advisory credits, and signatories.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">60-Item Exams &amp; Answer Keys</h4>
                  <p className="text-[11px] text-slate-500">RUTE Kasaysayan exam, Life &amp; Career TOS &amp; full 60-item scoring key.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">DepEd Three-Term BOW &amp; ILAW</h4>
                  <p className="text-[11px] text-slate-500">DO 3, s. 2026 Budget of Work matrices and 4-Day ILAW lesson structures.</p>
                </div>
              </div>
            </div>

            {/* Backup Action Button */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              {needsAuth ? (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <p className="text-xs text-amber-900 font-medium">Please sign in with your Google account above to enable Drive synchronization.</p>
                  </div>
                  <button
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer"
                  >
                    Connect Drive
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleFullAppBackupToDrive}
                  disabled={isBackingUp}
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-700 hover:to-cyan-800 text-white font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                >
                  {isBackingUp ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>{backupProgress || 'Saving App to Google Drive...'}</span>
                    </>
                  ) : (
                    <>
                      <Cloud className="w-5 h-5" />
                      <span>SAVE ENTIRE APP TO MY GOOGLE DRIVE (START FROM SCRATCH)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Quick Info & Verification Card */}
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4 border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                DepEd Cloud Verification
              </div>
              <h3 className="font-bold text-sm text-white">LNNCHS Multi-Sync Standards</h3>
              <ul className="text-xs text-slate-300 space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Dedicated Directory:</strong> Files are neatly arranged inside <code>LNNCHS Multi-Sync Educational Suite</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Zero Loss Guarantee:</strong> All 120 sections and 49 teacher schedules are JSON-structured for instantaneous restore.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Secure Bearer Auth:</strong> Direct client-side Google OAuth 2.0 with minimal privilege scopes.</span>
                </li>
              </ul>
            </div>

            {/* Authorized Google Accounts & Collaborator Sync */}
            <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white space-y-3.5 border border-blue-500/30">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  Authorized Google Accounts
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/30">
                  2 Accounts Active
                </span>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">Steaven Kinth Boiser</p>
                    <p className="text-[11px] text-blue-200 truncate">boisersteavenkinth@gmail.com</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 shrink-0">
                    Primary Owner
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">Operative Creative</p>
                    <p className="text-[11px] text-blue-200 truncate">operativecreative@gmail.com</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30 shrink-0">
                    Co-Admin
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                Backups created automatically authorize and grant collaborator access to <code>operativecreative@gmail.com</code>.
              </p>
            </div>

            {/* Recent Uploaded Files */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Drive Cloud Files</h4>
                <button
                  onClick={loadDriveFiles}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  title="Refresh"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {files.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No Drive files uploaded yet. Click the button to create your first backup.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {files.slice(0, 5).map(f => (
                    <div key={f.id} className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-2">
                      <span className="truncate font-medium text-slate-800">{f.name}</span>
                      {f.webViewLink && (
                        <a
                          href={f.webViewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 p-1 flex-shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INDIVIDUAL ARTIFACTS EXPORT */}
      {activeTab === 'quick_exports' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">120 Sections Master Directory</h3>
              <p className="text-xs text-slate-500 mt-1">Complete Grade 7 to Grade 12 section lists with adviser names &amp; room assignments.</p>
            </div>
            <button
              onClick={() => handleQuickSaveToDrive('directory', '120 Sections Master Directory')}
              disabled={isBackingUp || needsAuth}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              Save to Drive
            </button>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">SHS 49-Faculty Loading</h3>
              <p className="text-xs text-slate-500 mt-1">Summary of teaching loads, ALS assignments, and administrative approvals.</p>
            </div>
            <button
              onClick={() => handleQuickSaveToDrive('loading', 'SHS Faculty Loading Matrix')}
              disabled={isBackingUp || needsAuth}
              className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              Save to Drive
            </button>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Life &amp; Career Exam + Answer Key</h3>
              <p className="text-xs text-slate-500 mt-1">60-Item Table of Specifications and complete Answer Key (Items 1-60).</p>
            </div>
            <button
              onClick={() => handleQuickSaveToDrive('tos_exam', 'Life & Career Skills Exam & TOS')}
              disabled={isBackingUp || needsAuth}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              Save to Drive
            </button>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Grade 12 Rotational SII Schedule</h3>
              <p className="text-xs text-slate-500 mt-1">Remediation &amp; mastery timetable across English, Science, and Mathematics.</p>
            </div>
            <button
              onClick={() => handleQuickSaveToDrive('interventions', 'Grade 12 Rotational SII Schedule')}
              disabled={isBackingUp || needsAuth}
              className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              Save to Drive
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: GOOGLE DRIVE FILE EXPLORER */}
      {activeTab === 'drive_explorer' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Google Drive Storage &amp; Files
              </h2>
              <p className="text-xs text-slate-500">
                Browse, open, manage, or delete files stored in your Google Drive.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search Drive files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-64"
                />
              </div>

              <button
                onClick={loadDriveFiles}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                title="Refresh file list"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingFiles ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Files List Table */}
          {needsAuth ? (
            <div className="text-center py-12 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <Cloud className="w-12 h-12 text-slate-400 mx-auto" />
              <p className="text-xs text-slate-600 font-medium">Please sign in with Google to view your Drive files.</p>
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Sign in to Drive
              </button>
            </div>
          ) : isLoadingFiles ? (
            <div className="text-center py-12 space-y-3">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-medium">Loading files from Google Drive...</p>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="text-center py-12 space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <Folder className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-xs text-slate-600 font-bold">No files found matching your search.</p>
              <p className="text-[11px] text-slate-400">Upload an app backup or quick artifact to see it here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                    <th className="pb-3 pl-2">File Name</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Last Modified</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 pl-2 font-medium text-slate-900 flex items-center gap-2">
                        {file.mimeType.includes('folder') ? (
                          <Folder className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        ) : (
                          <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        )}
                        <span className="truncate max-w-xs sm:max-w-md">{file.name}</span>
                      </td>
                      <td className="py-3 text-slate-500 font-mono text-[11px]">
                        {file.mimeType.replace('application/', '').replace('vnd.google-apps.', '')}
                      </td>
                      <td className="py-3 text-slate-500">
                        {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : '—'}
                      </td>
                      <td className="py-3 text-right pr-2 space-x-2">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-[11px] font-bold transition"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Open
                          </a>
                        )}
                        <button
                          onClick={() => setFileToDelete(file)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-[11px] font-bold transition cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MANDATORY USER CONFIRMATION MODAL FOR DESTRUCTIVE DELETE */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-5 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-black text-slate-900">Confirm File Deletion</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to permanently delete <span className="font-bold text-slate-900 font-mono">"{fileToDelete.name}"</span> from your Google Drive? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteFile}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
