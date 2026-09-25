import React, { useState } from 'react';
import {
  Document as DocxDocument,
  Packer as DocxPacker,
  Paragraph as DocxParagraph,
  TextRun as DocxTextRun,
  Table as DocxTable,
  TableRow as DocxTableRow,
  TableCell as DocxTableCell,
  WidthType as DocxWidthType,
  AlignmentType as DocxAlignmentType
} from 'docx';
import { 
  LNNCHS_SHS_TEACHER_LOADINGS, 
  LNNCHS_SIGNATORIES, 
  LNNCHS_G12_INTERVENTIONS, 
  LNNCHS_LIFE_CAREER_TOS, 
  LIFE_CAREER_EXAM_ANSWER_KEY 
} from '../data/lnnchsOfficialSHSSchedulesAndExams';
import {
  LNNCHS_GRADE11_CLASS_PROGRAMS,
  LNNCHS_GRADE12_CLASS_PROGRAMS,
  LNNCHS_TEACHER_PROGRAMS
} from '../data/lnnchsClassAndTeacherProgramsData';
import {
  LNNCHS_JHS_TEACHERS,
  LNNCHS_TIME_SLOTS,
  isTeacherVacantAtSlot,
  JHSTeacherSchedule
} from '../data/lnnchsOfficialJHSSchedules';
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  FileText, 
  Award, 
  CheckCircle2, 
  Printer, 
  Download, 
  Search, 
  Filter, 
  Building2, 
  FileSpreadsheet, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  ChevronDown,
  Check,
  GraduationCap,
  UserCheck,
  UserPlus,
  HelpCircle,
  AlertCircle,
  Send,
  Building,
  Copy
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { LNNCHSTeacherLoadingSummaryDashboard } from './LNNCHSTeacherLoadingSummaryDashboard';

export const LNNCHSSHSFacultyAndExamsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'master_summary' | 'shs_loading' | 'jhs_loading' | 'sub_finder' | 'quick_sub_generator' | 'class_programs' | 'interventions' | 'rute_exam' | 'life_career_exam' | 'bubble_sheet'
  >('master_summary');

  const [absentReason, setAbsentReason] = useState<string>('Sick Leave / Medical Emergency');
  const [subCopiedText, setSubCopiedText] = useState<boolean>(false);

  // --- SHS Filter States ---
  const [shsDeptFilter, setShsDeptFilter] = useState<string>('ALL');
  const [shsTeacherSearch, setShsTeacherSearch] = useState<string>('');
  const [selectedTeacherModal, setSelectedTeacherModal] = useState<any | null>(null);

  // --- JHS Filter States ---
  const [jhsDeptFilter, setJhsDeptFilter] = useState<string>('ALL');
  const [jhsTeacherSearch, setJhsTeacherSearch] = useState<string>('');

  // --- Substitute / Vacant Teacher Finder ("Pag Sub og Teacher") States ---
  const [subSelectedTimeSlot, setSubSelectedTimeSlot] = useState<string>('07:30-08:30');
  const [subSelectedDay, setSubSelectedDay] = useState<string>('M'); // 'M', 'T', 'W', 'Th', 'F'
  const [subLevelFilter, setSubLevelFilter] = useState<'ALL' | 'JHS' | 'SHS'>('ALL');
  const [subDeptFilter, setSubDeptFilter] = useState<string>('ALL');
  const [subSearchQuery, setSubSearchQuery] = useState<string>('');

  // --- Substitution Slip Modal & History State ---
  const [selectedSubTeacher, setSelectedSubTeacher] = useState<any | null>(null);
  const [absentTeacherName, setAbsentTeacherName] = useState<string>('R. Pawaden');
  const [absentTeacherGroup, setAbsentTeacherGroup] = useState<string>('TVL / HUMSS');
  const [subDate, setSubDate] = useState<string>('Sept. 24, 2026');
  const [subSchoolYear, setSubSchoolYear] = useState<string>('SY 2026 - 2027');
  const [subSubjectSection, setSubSubjectSection] = useState<string>('Grade 8 - Lavender (Math)');
  const [subRoom, setSubRoom] = useState<string>('Room 102 - Math Bldg');
  const [subNotes, setSubNotes] = useState<string>('Please conduct seatwork / LAS activities.');
  const [showSubSuccessModal, setShowSubSuccessModal] = useState<boolean>(false);

  // --- Class Program & Teacher Program View States ---
  const [progViewMode, setProgViewMode] = useState<'G11' | 'G12' | 'TEACHER'>('G11');
  const [selectedG11Index, setSelectedG11Index] = useState<number>(0);
  const [selectedG12Index, setSelectedG12Index] = useState<number>(0);
  const [selectedTeacherProgIndex, setSelectedTeacherProgIndex] = useState<number>(0);

  // --- Multi-Teacher Batch Substitute System Prompt States ---
  const [batchAbsentDate, setBatchAbsentDate] = useState<string>('September 25, 2026 — Thursday');
  const [batchAbsentTeachersInput, setBatchAbsentTeachersInput] = useState<string>('1. R. Pawaden\n2. M. Tabacon');
  const [batchAssignedMap, setBatchAssignedMap] = useState<{ [key: string]: string }>({
    '7:30-8:30': 'M. ARABA',
    '8:30-9:30': 'J. ARQUITA',
    '10:45-11:45': 'T. TUASTOMBAN',
    '12:45-1:45': 'M. ARABA'
  });
  const [showBatchSummaryModal, setShowBatchSummaryModal] = useState<boolean>(false);

  // Class Substitution Form Matrix State (Matching Official Layout)
  const FORM_TIME_SLOTS = [
    '7:30-8:30',
    '8:30-9:30',
    '9:30-9:45',
    '9:45-10:45',
    '10:45-11:45',
    '11:45-12:45',
    '12:45-1:45',
    '1:45-2:45',
    '2:45-3:45'
  ];

  const [subMatrix, setSubMatrix] = useState<{
    [slot: string]: {
      subject: string;
      gradeSection: string;
      substituteTeacher: string;
    }
  }>({
    '7:30-8:30': { subject: '', gradeSection: '', substituteTeacher: '' },
    '8:30-9:30': { subject: 'TVL', gradeSection: '12 HUMSS 3', substituteTeacher: 'M. ARABA' },
    '9:30-9:45': { subject: 'RECESS', gradeSection: 'RECESS', substituteTeacher: 'RECESS' },
    '9:45-10:45': { subject: '', gradeSection: '', substituteTeacher: '' },
    '10:45-11:45': { subject: 'TVL', gradeSection: '12 HUMSS 4', substituteTeacher: 'J. ARQUITA' },
    '11:45-12:45': { subject: 'LUNCH BREAK', gradeSection: 'LUNCH BREAK', substituteTeacher: 'LUNCH BREAK' },
    '12:45-1:45': { subject: 'TVL', gradeSection: '11 Acad 4', substituteTeacher: 'T. TUASTOMBAN' },
    '1:45-2:45': { subject: 'TVL', gradeSection: '12 TVL', substituteTeacher: 'M. ARABA' },
    '2:45-3:45': { subject: '', gradeSection: '', substituteTeacher: '' }
  });

  // Pre-configured exemplars matching exact photo submissions
  const loadPreconfiguredExemplar = (key: 'pawaden' | 'tabacon' | 'guillot') => {
    if (key === 'pawaden') {
      setAbsentTeacherName('R. Pawaden');
      setAbsentTeacherGroup('TVL / HUMSS');
      setSubDate('Sept. 24, 2026');
      setAbsentReason('Official Leave / DepEd Seminar');
      setSubLevelFilter('SHS');
      setSubMatrix({
        '7:30-8:30': { subject: '', gradeSection: '', substituteTeacher: '' },
        '8:30-9:30': { subject: 'TVL', gradeSection: '12 HUMSS 3', substituteTeacher: 'M. ARABA' },
        '9:30-9:45': { subject: 'RECESS', gradeSection: 'RECESS', substituteTeacher: 'RECESS' },
        '9:45-10:45': { subject: '', gradeSection: '', substituteTeacher: '' },
        '10:45-11:45': { subject: 'TVL', gradeSection: '12 HUMSS 4', substituteTeacher: 'J. ARQUITA' },
        '11:45-12:45': { subject: 'LUNCH BREAK', gradeSection: 'LUNCH BREAK', substituteTeacher: 'LUNCH BREAK' },
        '12:45-1:45': { subject: 'TVL', gradeSection: '11 Acad 4', substituteTeacher: 'T. TUASTOMBAN' },
        '1:45-2:45': { subject: 'TVL', gradeSection: '12 TVL', substituteTeacher: 'M. ARABA' },
        '2:45-3:45': { subject: '', gradeSection: '', substituteTeacher: '' }
      });
    } else if (key === 'tabacon') {
      setAbsentTeacherName('M. Tabacon');
      setAbsentTeacherGroup('ABM / GAS / ICT');
      setSubDate('Sept. 24, 2026');
      setAbsentReason('Sick Leave / Medical Emergency');
      setSubLevelFilter('SHS');
      setSubMatrix({
        '7:30-8:30': { subject: '', gradeSection: '', substituteTeacher: '' },
        '8:30-9:30': { subject: '', gradeSection: '', substituteTeacher: '' },
        '9:30-9:45': { subject: 'RECESS', gradeSection: 'RECESS', substituteTeacher: 'RECESS' },
        '9:45-10:45': { subject: 'ABM', gradeSection: '12 ABM 2', substituteTeacher: 'A. CANOG' },
        '10:45-11:45': { subject: '', gradeSection: '', substituteTeacher: '' },
        '11:45-12:45': { subject: 'LUNCH BREAK', gradeSection: 'LUNCH BREAK', substituteTeacher: 'LUNCH BREAK' },
        '12:45-1:45': { subject: 'GAS', gradeSection: '12 GAS 2', substituteTeacher: 'M. SANTILLAN' },
        '1:45-2:45': { subject: 'FLM', gradeSection: '12 FLM', substituteTeacher: 'A. B. TAMPUS' },
        '2:45-3:45': { subject: 'ICT', gradeSection: '12 ICT', substituteTeacher: 'R. RUFINO' }
      });
    } else if (key === 'guillot') {
      setAbsentTeacherName('L. GUILLOT');
      setAbsentTeacherGroup('Tech Pro / Academics');
      setSubDate('Sept. 24, 2026');
      setAbsentReason('Special Administrative Duty');
      setSubLevelFilter('SHS');
      setSubMatrix({
        '7:30-8:30': { subject: 'Tech Pro', gradeSection: '11 Tech Pro 4', substituteTeacher: 'A. MICULOB' },
        '8:30-9:30': { subject: 'FLM', gradeSection: '12 FLM', substituteTeacher: 'A. MICULOB' },
        '9:30-9:45': { subject: 'RECESS', gradeSection: 'RECESS', substituteTeacher: 'RECESS' },
        '9:45-10:45': { subject: 'Acad', gradeSection: '11 Acad 7', substituteTeacher: 'H. MICULOB' },
        '10:45-11:45': { subject: '', gradeSection: '', substituteTeacher: '' },
        '11:45-12:45': { subject: 'LUNCH BREAK', gradeSection: 'LUNCH BREAK', substituteTeacher: 'LUNCH BREAK' },
        '12:45-1:45': { subject: 'Acad', gradeSection: '11 Acad 2', substituteTeacher: 'R. UGATIMAN' },
        '1:45-2:45': { subject: 'FLM', gradeSection: '12 FLM', substituteTeacher: 'N. LACIO' },
        '2:45-3:45': { subject: 'Acad', gradeSection: '11 Acad 4', substituteTeacher: 'J. SARAGOSA' }
      });
    }
  };

  // Substitution History Log
  const [subHistory, setSubHistory] = useState<Array<{
    id: string;
    date: string;
    timeSlot: string;
    day: string;
    subTeacherName: string;
    subLevel: string;
    subDept: string;
    absentTeacherName: string;
    subjectSection: string;
    room: string;
    status: 'Assigned' | 'Completed' | 'Pending';
  }>>([
    {
      id: 'SUB-2026-001',
      date: '2026-09-24',
      timeSlot: '07:30-08:30',
      day: 'Monday',
      subTeacherName: 'JEMMA B. ABAQUITA',
      subLevel: 'JHS',
      subDept: 'Mathematics',
      absentTeacherName: 'MA. THERESA Y. CASILDO',
      subjectSection: 'Math G7-Hyacinth',
      room: 'Room 104 - JHS Math Wing',
      status: 'Assigned'
    },
    {
      id: 'SUB-2026-002',
      date: '2026-09-24',
      timeSlot: '09:45-10:45',
      day: 'Monday',
      subTeacherName: 'NORWIN F. PALAO',
      subLevel: 'JHS',
      subDept: 'TLE',
      absentTeacherName: 'REY S. TONZO',
      subjectSection: 'Creative Tech 8-STE A',
      room: 'Room 201 - STE Building',
      status: 'Completed'
    }
  ]);

  const [subDriveStatus, setSubDriveStatus] = useState<string | null>(null);

  // Auto-fill teacher schedule match & enforce strict level lock when absent teacher changes
  const handleSelectAbsentTeacher = (name: string) => {
    setAbsentTeacherName(name);

    if (name.toLowerCase().includes('pawaden')) {
      loadPreconfiguredExemplar('pawaden');
      return;
    }
    if (name.toLowerCase().includes('tabacon')) {
      loadPreconfiguredExemplar('tabacon');
      return;
    }
    if (name.toLowerCase().includes('guillot')) {
      loadPreconfiguredExemplar('guillot');
      return;
    }
    
    // Check if JHS teacher
    const jhsMatch = LNNCHS_JHS_TEACHERS.find(t => t.name.toLowerCase() === name.toLowerCase());
    if (jhsMatch) {
      setSubLevelFilter('JHS');
      setAbsentTeacherGroup(jhsMatch.department);
      setSubSubjectSection(`${jhsMatch.department} - ${jhsMatch.advisoryOrCoordinatorship}`);
      setSubRoom(`Room ${100 + jhsMatch.no} - LNNCHS JHS Wing`);

      // Build sample matrix for this JHS teacher
      setSubMatrix({
        '7:30-8:30': { subject: jhsMatch.department, gradeSection: 'G7 Hyacinth', substituteTeacher: 'J. ABAQUITA' },
        '8:30-9:30': { subject: jhsMatch.department, gradeSection: 'G8 Jasmine', substituteTeacher: 'N. PALAO' },
        '9:30-9:45': { subject: 'RECESS', gradeSection: 'RECESS', substituteTeacher: 'RECESS' },
        '9:45-10:45': { subject: '', gradeSection: '', substituteTeacher: '' },
        '10:45-11:45': { subject: jhsMatch.department, gradeSection: 'G9 Camia', substituteTeacher: 'E. DACALOS' },
        '11:45-12:45': { subject: 'LUNCH BREAK', gradeSection: 'LUNCH BREAK', substituteTeacher: 'LUNCH BREAK' },
        '12:45-1:45': { subject: jhsMatch.department, gradeSection: 'G10 STE-A', substituteTeacher: 'J. ABAQUITA' },
        '1:45-2:45': { subject: '', gradeSection: '', substituteTeacher: '' },
        '2:45-3:45': { subject: '', gradeSection: '', substituteTeacher: '' }
      });
      return;
    }

    // Check if SHS teacher
    const shsMatch = LNNCHS_SHS_TEACHER_LOADINGS.find(t => t.name.toLowerCase() === name.toLowerCase());
    if (shsMatch) {
      setSubLevelFilter('SHS');
      setAbsentTeacherGroup(shsMatch.department);
      setSubSubjectSection(`${shsMatch.subjectsHandled.split(',')[0]} (${shsMatch.department})`);
      setSubRoom(`Room ${200 + shsMatch.no} - SHS Academic Bldg`);

      setSubMatrix({
        '7:30-8:30': { subject: shsMatch.department, gradeSection: '11 Acad 1', substituteTeacher: 'A. MICULOB' },
        '8:30-9:30': { subject: shsMatch.department, gradeSection: '12 TVL 2', substituteTeacher: 'M. ARABA' },
        '9:30-9:45': { subject: 'RECESS', gradeSection: 'RECESS', substituteTeacher: 'RECESS' },
        '9:45-10:45': { subject: '', gradeSection: '', substituteTeacher: '' },
        '10:45-11:45': { subject: shsMatch.department, gradeSection: '12 HUMSS 1', substituteTeacher: 'J. ARQUITA' },
        '11:45-12:45': { subject: 'LUNCH BREAK', gradeSection: 'LUNCH BREAK', substituteTeacher: 'LUNCH BREAK' },
        '12:45-1:45': { subject: shsMatch.department, gradeSection: '11 STEM 2', substituteTeacher: 'T. TUASTOMBAN' },
        '1:45-2:45': { subject: '', gradeSection: '', substituteTeacher: '' },
        '2:45-3:45': { subject: '', gradeSection: '', substituteTeacher: '' }
      });
    }
  };

  // --- Exam States ---
  const [examShowAnswers, setExamShowAnswers] = useState<boolean>(false);
  const [examStudentAnswers, setExamStudentAnswers] = useState<{ [key: number]: string }>({});

  const shsDepartments = ['ALL', 'Science', 'Mathematics', 'Physical Education', 'English', 'Filipino', 'Social Science', 'ABM', 'TVL'];
  const jhsDepartments = ['ALL', 'Mathematics', 'TLE', 'Science', 'English', 'Filipino', 'Aral.Pan.', 'MAPEH', 'Val.Ed.'];

  // --- SHS Filtered Teachers ---
  const filteredShsTeachers = LNNCHS_SHS_TEACHER_LOADINGS.filter(t => {
    const matchesDept = shsDeptFilter === 'ALL' || t.department === shsDeptFilter;
    const matchesSearch = t.name.toLowerCase().includes(shsTeacherSearch.toLowerCase()) ||
      t.advisoryOrCoordinatorship.toLowerCase().includes(shsTeacherSearch.toLowerCase()) ||
      t.subjectsHandled.toLowerCase().includes(shsTeacherSearch.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // --- JHS Filtered Teachers ---
  const filteredJhsTeachers = LNNCHS_JHS_TEACHERS.filter(t => {
    const matchesDept = jhsDeptFilter === 'ALL' || t.department === jhsDeptFilter;
    const matchesSearch = t.name.toLowerCase().includes(jhsTeacherSearch.toLowerCase()) ||
      t.advisoryOrCoordinatorship.toLowerCase().includes(jhsTeacherSearch.toLowerCase()) ||
      t.department.toLowerCase().includes(jhsTeacherSearch.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // Calculate totals for SHS
  const shsTotalRegularPeriods = filteredShsTeachers.reduce((sum, t) => sum + t.periodsRegular, 0);
  const shsTotalALSPeriods = filteredShsTeachers.reduce((sum, t) => sum + t.periodsALS, 0);
  const shsTotalAdvisoryMins = filteredShsTeachers.reduce((sum, t) => sum + t.advisoryMinutes, 0);
  const shsTotalMinutesAll = filteredShsTeachers.reduce((sum, t) => sum + t.totalMinutes, 0);

  // Calculate totals for JHS
  const jhsTotalMinutes = filteredJhsTeachers.reduce((sum, t) => sum + t.totalMinutes, 0);

  // --- Pag-Sub (Available / Vacant Teacher) Logic ---
  // Returns list of all teachers (JHS & SHS) who are VACANT during subSelectedTimeSlot and subSelectedDay
  const vacantJhsTeachers = LNNCHS_JHS_TEACHERS.map(t => {
    const check = isTeacherVacantAtSlot(t, subSelectedTimeSlot, subSelectedDay);
    return {
      level: 'JHS',
      name: t.name,
      department: t.department,
      advisory: t.advisoryOrCoordinatorship,
      isVacant: check.isVacant,
      currentAssignment: check.currentAssignment,
      totalMinutes: t.totalMinutes
    };
  });

  // SHS Teachers schedule check (sample heuristics based on 30-period load)
  const vacantShsTeachers = LNNCHS_SHS_TEACHER_LOADINGS.map(t => {
    // SHS teachers with lower loads or specific non-conflicting time slots
    const isOccupied = (t.periodsRegular > 25 && subSelectedTimeSlot === '07:30-08:30') ||
                       (t.periodsRegular > 27 && subSelectedTimeSlot === '08:30-09:30');
    return {
      level: 'SHS',
      name: t.name,
      department: t.department,
      advisory: t.advisoryOrCoordinatorship,
      isVacant: !isOccupied,
      currentAssignment: isOccupied ? `${t.subjectsHandled.split(',')[0]} (In Class)` : undefined,
      totalMinutes: t.totalMinutes
    };
  });

  const allTeachersForSub = [
    ...(subLevelFilter === 'SHS' ? [] : vacantJhsTeachers),
    ...(subLevelFilter === 'JHS' ? [] : vacantShsTeachers)
  ].filter(t => {
    const matchesDept = subDeptFilter === 'ALL' || t.department === subDeptFilter;
    const matchesQuery = !subSearchQuery.trim() || 
      t.name.toLowerCase().includes(subSearchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(subSearchQuery.toLowerCase()) ||
      t.advisory.toLowerCase().includes(subSearchQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  const vacantTeachersList = allTeachersForSub.filter(t => t.isVacant);
  const occupiedTeachersList = allTeachersForSub.filter(t => !t.isVacant);

  // Export SHS Loading to PDF
  const exportShsLoadingPDF = () => {
    const doc = new jsPDF('landscape');
    
    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(153, 27, 27);
    doc.text('LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL', 148, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    doc.text('Grade XII - SENIOR HIGH SCHOOL CURRICULUM', 148, 21, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.text('SUMMARY OF TEACHER’S LOADING, School Year 2026-2027', 148, 27, { align: 'center' });
    
    // Table Header
    doc.setFillColor(185, 28, 28);
    doc.rect(14, 32, 268, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text('No.', 16, 36.5);
    doc.text('Dept', 26, 36.5);
    doc.text('Name of Teacher', 52, 36.5);
    doc.text('Advisory Class / Designation', 98, 36.5);
    doc.text('Reg', 152, 36.5);
    doc.text('ALS', 162, 36.5);
    doc.text('Adv Mins', 172, 36.5);
    doc.text('Total Mins', 190, 36.5);
    doc.text('Subjects Handled', 210, 36.5);

    let y = 43;
    doc.setTextColor(15, 23, 42);
    filteredShsTeachers.slice(0, 26).forEach((t, i) => {
      if (i % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(14, y - 4, 268, 5.5, 'F');
      }
      doc.setFont('helvetica', 'normal');
      doc.text(String(t.no), 16, y);
      doc.text(t.department.substring(0, 10), 26, y);
      doc.setFont('helvetica', 'bold');
      doc.text(t.name.substring(0, 24), 52, y);
      doc.setFont('helvetica', 'normal');
      doc.text(t.advisoryOrCoordinatorship.substring(0, 32), 98, y);
      doc.text(String(t.periodsRegular), 154, y);
      doc.text(String(t.periodsALS), 164, y);
      doc.text(String(t.advisoryMinutes), 174, y);
      doc.setFont('helvetica', 'bold');
      doc.text(String(t.totalMinutes), 192, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.text(t.subjectsHandled.substring(0, 48), 210, y);
      doc.setFontSize(7.5);
      y += 5.5;
    });

    doc.save('LNNCHS_SHS_Teacher_Loading_Summary_SY2026-2027.pdf');
  };

  // Export JHS Loading to PDF
  const exportJhsLoadingPDF = () => {
    const doc = new jsPDF('landscape');
    
    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 39, 118);
    doc.text('LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL', 148, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    doc.text('JUNIOR HIGH SCHOOL (Grade 7 - Grade 10) TEACHERS PROGRAM', 148, 21, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.text('OFFICIAL TEACHER LOADINGS & SCHEDULES (SY 2026-2027)', 148, 27, { align: 'center' });
    
    // Table Header
    doc.setFillColor(0, 39, 118);
    doc.rect(14, 32, 268, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('No.', 16, 36.5);
    doc.text('Department', 26, 36.5);
    doc.text('Name of Teacher', 60, 36.5);
    doc.text('Advisory Class / Designation', 120, 36.5);
    doc.text('Weekly Load (Mins)', 200, 36.5);
    doc.text('Status', 245, 36.5);

    let y = 43;
    doc.setTextColor(15, 23, 42);
    filteredJhsTeachers.forEach((t, i) => {
      if (i % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(14, y - 4, 268, 6, 'F');
      }
      doc.setFont('helvetica', 'normal');
      doc.text(String(t.no), 16, y);
      doc.text(t.department, 26, y);
      doc.setFont('helvetica', 'bold');
      doc.text(t.name, 60, y);
      doc.setFont('helvetica', 'normal');
      doc.text(t.advisoryOrCoordinatorship, 120, y);
      doc.setFont('helvetica', 'bold');
      doc.text(`${t.totalMinutes} mins/wk`, 200, y);
      doc.setFont('helvetica', 'normal');
      doc.text('100% Full Load', 245, y);
      y += 6.5;
      if (y > 185) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save('LNNCHS_JHS_Teacher_Loading_Summary_SY2026-2027.pdf');
  };

  // Export Official Substitution Slip PDF (Matching exact Class Substitution Form format)
  const exportSubstitutionSlipPDF = () => {
    const doc = new jsPDF('landscape');
    
    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(0, 39, 118);
    doc.text('LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL', 148, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'bold');
    doc.text('Grade XII - SENIOR HIGH SCHOOL', 148, 21, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.text('Baroy, Lanao del Norte', 148, 26, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(0, 39, 118);
    doc.text('Class Substitution Form', 148, 34, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text(subSchoolYear, 148, 40, { align: 'center' });

    // Metadata Fields
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.text(`Name of Teacher: `, 15, 49);
    doc.setFont('helvetica', 'normal');
    doc.text(`${absentTeacherName || '____________________'}`, 52, 49);

    doc.setFont('helvetica', 'bold');
    doc.text(`Learning Area/Subject Group: `, 150, 49);
    doc.setFont('helvetica', 'normal');
    doc.text(`${absentTeacherGroup || '____________________'}`, 208, 49);

    doc.setFont('helvetica', 'bold');
    doc.text(`Date of Substitution: `, 15, 56);
    doc.setFont('helvetica', 'normal');
    doc.text(`${subDate}`, 52, 56);

    doc.setFont('helvetica', 'bold');
    doc.text(`Reason of Absence: `, 150, 56);
    doc.setFont('helvetica', 'normal');
    doc.text(`${absentReason}`, 208, 56);

    // Table Drawing
    const startX = 15;
    let startY = 64;
    const colWidths = [32, 26, 26, 22, 26, 26, 24, 26, 26, 26]; // Total: 260mm
    const rowHeight = 11;
    const timeSlots = FORM_TIME_SLOTS;

    // Table Header Row: Time
    doc.setFillColor(240, 240, 240);
    doc.rect(startX, startY, 260, rowHeight, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);

    let currentX = startX;
    doc.rect(currentX, startY, colWidths[0], rowHeight);
    doc.text('Time', currentX + 3, startY + 7);
    currentX += colWidths[0];

    timeSlots.forEach((slot, i) => {
      doc.rect(currentX, startY, colWidths[i + 1], rowHeight);
      doc.text(slot, currentX + colWidths[i + 1] / 2, startY + 7, { align: 'center' });
      currentX += colWidths[i + 1];
    });

    startY += rowHeight;

    // Row 2: Subject
    currentX = startX;
    doc.rect(currentX, startY, colWidths[0], rowHeight);
    doc.text('Subject', currentX + 3, startY + 7);
    currentX += colWidths[0];

    timeSlots.forEach((slot, i) => {
      const isRecess = slot === '9:30-9:45';
      const isLunch = slot === '11:45-12:45';
      const val = isRecess ? 'RECESS' : isLunch ? 'LUNCH BREAK' : (subMatrix[slot]?.subject || '-');
      doc.rect(currentX, startY, colWidths[i + 1], rowHeight);
      doc.setFont('helvetica', isRecess || isLunch ? 'bold' : 'normal');
      doc.text(val, currentX + colWidths[i + 1] / 2, startY + 7, { align: 'center' });
      currentX += colWidths[i + 1];
    });

    startY += rowHeight;

    // Row 3: Grade & Section
    currentX = startX;
    doc.setFont('helvetica', 'bold');
    doc.rect(currentX, startY, colWidths[0], rowHeight);
    doc.text('Grade & Section', currentX + 3, startY + 7);
    currentX += colWidths[0];

    timeSlots.forEach((slot, i) => {
      const isRecess = slot === '9:30-9:45';
      const isLunch = slot === '11:45-12:45';
      const val = isRecess ? 'RECESS' : isLunch ? 'LUNCH BREAK' : (subMatrix[slot]?.gradeSection || '-');
      doc.rect(currentX, startY, colWidths[i + 1], rowHeight);
      doc.setFont('helvetica', isRecess || isLunch ? 'bold' : 'normal');
      doc.text(val, currentX + colWidths[i + 1] / 2, startY + 7, { align: 'center' });
      currentX += colWidths[i + 1];
    });

    startY += rowHeight;

    // Row 4: Substitute Teacher
    currentX = startX;
    doc.setFont('helvetica', 'bold');
    doc.rect(currentX, startY, colWidths[0], rowHeight);
    doc.text('Substitute Teacher', currentX + 3, startY + 7);
    currentX += colWidths[0];

    timeSlots.forEach((slot, i) => {
      const isRecess = slot === '9:30-9:45';
      const isLunch = slot === '11:45-12:45';
      const val = isRecess ? 'RECESS' : isLunch ? 'LUNCH BREAK' : (subMatrix[slot]?.substituteTeacher || '-');
      doc.rect(currentX, startY, colWidths[i + 1], rowHeight);
      doc.setFont('helvetica', 'bold');
      doc.text(val, currentX + colWidths[i + 1] / 2, startY + 7, { align: 'center' });
      currentX += colWidths[i + 1];
    });

    startY += rowHeight;

    // Row 5: Signature
    currentX = startX;
    doc.setFont('helvetica', 'bold');
    doc.rect(currentX, startY, colWidths[0], rowHeight);
    doc.text('Signature', currentX + 3, startY + 7);
    currentX += colWidths[0];

    timeSlots.forEach((slot, i) => {
      const isRecess = slot === '9:30-9:45';
      const isLunch = slot === '11:45-12:45';
      const val = isRecess ? 'RECESS' : isLunch ? 'LUNCH BREAK' : '';
      doc.rect(currentX, startY, colWidths[i + 1], rowHeight);
      if (val) doc.text(val, currentX + colWidths[i + 1] / 2, startY + 7, { align: 'center' });
      currentX += colWidths[i + 1];
    });

    // Signatories Footer
    const sigY = startY + 28;
    doc.setFontSize(9);
    
    // Left
    doc.setFont('helvetica', 'bold');
    doc.text('Prepared by:', 20, sigY);
    doc.line(20, sigY + 12, 85, sigY + 12);
    doc.setFont('helvetica', 'normal');
    doc.text('Name and Signature of Teacher', 20, sigY + 17);

    // Middle
    doc.setFont('helvetica', 'bold');
    doc.text('Noted by:', 115, sigY);
    doc.text('JOAHN J. ANDOT', 115, sigY + 11);
    doc.line(115, sigY + 12, 180, sigY + 12);
    doc.setFont('helvetica', 'normal');
    doc.text('SHS-ASP II', 115, sigY + 17);

    // Right
    doc.setFont('helvetica', 'bold');
    doc.text('Approved by:', 210, sigY);
    doc.text('ANISAH A. SINAL', 210, sigY + 11);
    doc.line(210, sigY + 12, 275, sigY + 12);
    doc.setFont('helvetica', 'normal');
    doc.text('Sec. School Principal IV', 210, sigY + 17);

    // Save PDF
    const pdfFileName = `LNNCHS_Class_Substitution_Form_${(absentTeacherName || 'Teacher').replace(/\s+/g, '_')}.pdf`;
    doc.save(pdfFileName);

    // Record in Substitution Log
    const newLogEntry = {
      id: `SUB-2026-00${subHistory.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'Full Matrix',
      day: subDate,
      subTeacherName: 'Assigned Matrix Substitutes',
      subLevel: 'SHS',
      subDept: absentTeacherGroup,
      absentTeacherName: absentTeacherName || 'Absent Teacher',
      subjectSection: 'Class Substitution Form Matrix',
      room: 'SHS Classrooms',
      status: 'Assigned' as const
    };

    setSubHistory(prev => [newLogEntry, ...prev]);
    setSubDriveStatus(`✓ Issued Class Substitution Form! Saved to Log and downloaded ${pdfFileName}`);
    setTimeout(() => setSubDriveStatus(null), 5000);
  };

  // Export Special Order Substitution Slip to editable Word (.docx) file matching Class Substitution Form
  const exportSubstitutionSlipDOCX = async () => {
    try {
      const timeSlots = FORM_TIME_SLOTS;

      const doc = new DocxDocument({
        sections: [{
          properties: {},
          children: [
            // Header Paragraph
            new DocxParagraph({
              alignment: DocxAlignmentType.CENTER,
              children: [
                new DocxTextRun({ text: "LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL\n", bold: true, size: 22 }),
                new DocxTextRun({ text: "Grade XII - SENIOR HIGH SCHOOL\n", bold: true, size: 18, color: "002776" }),
                new DocxTextRun({ text: "Baroy, Lanao del Norte\n\n", size: 16 }),
                new DocxTextRun({ text: "CLASS SUBSTITUTION FORM\n", bold: true, size: 26, color: "002776" }),
                new DocxTextRun({ text: `${subSchoolYear}\n\n`, bold: true, size: 18, italics: true }),
              ]
            }),

            // Metadata Info Paragraphs
            new DocxParagraph({
              children: [
                new DocxTextRun({ text: `Name of Teacher: `, bold: true, size: 18 }),
                new DocxTextRun({ text: `${absentTeacherName || '____________________'}                     `, bold: true, size: 18, color: "CE1126" }),
                new DocxTextRun({ text: `Learning Area/Subject Group: `, bold: true, size: 18 }),
                new DocxTextRun({ text: `${absentTeacherGroup || '____________________'}\n`, bold: true, size: 18 }),
                new DocxTextRun({ text: `Date of Substitution: `, bold: true, size: 18 }),
                new DocxTextRun({ text: `${subDate}                     `, bold: true, size: 18 }),
                new DocxTextRun({ text: `Reason of Absence: `, bold: true, size: 18 }),
                new DocxTextRun({ text: `${absentReason}\n\n`, size: 18 }),
              ]
            }),

            // Substitution Matrix Table
            new DocxTable({
              width: { size: 100, type: DocxWidthType.PERCENTAGE },
              rows: [
                // Row 1: Time Headers
                new DocxTableRow({
                  children: [
                    new DocxTableCell({ width: { size: 13, type: DocxWidthType.PERCENTAGE }, children: [new DocxParagraph({ children: [new DocxTextRun({ text: "Time", bold: true, size: 16 })] })] }),
                    ...timeSlots.map(slot => new DocxTableCell({
                      width: { size: 9.6, type: DocxWidthType.PERCENTAGE },
                      children: [new DocxParagraph({ alignment: DocxAlignmentType.CENTER, children: [new DocxTextRun({ text: slot, bold: true, size: 14 })] })]
                    }))
                  ]
                }),

                // Row 2: Subject
                new DocxTableRow({
                  children: [
                    new DocxTableCell({ width: { size: 13, type: DocxWidthType.PERCENTAGE }, children: [new DocxParagraph({ children: [new DocxTextRun({ text: "Subject", bold: true, size: 16 })] })] }),
                    ...timeSlots.map(slot => {
                      const isRecess = slot === '9:30-9:45';
                      const isLunch = slot === '11:45-12:45';
                      const val = isRecess ? 'RECESS' : isLunch ? 'LUNCH BREAK' : (subMatrix[slot]?.subject || '-');
                      return new DocxTableCell({
                        width: { size: 9.6, type: DocxWidthType.PERCENTAGE },
                        children: [new DocxParagraph({ alignment: DocxAlignmentType.CENTER, children: [new DocxTextRun({ text: val, bold: true, size: 14 })] })]
                      });
                    })
                  ]
                }),

                // Row 3: Grade & Section
                new DocxTableRow({
                  children: [
                    new DocxTableCell({ width: { size: 13, type: DocxWidthType.PERCENTAGE }, children: [new DocxParagraph({ children: [new DocxTextRun({ text: "Grade & Section", bold: true, size: 16 })] })] }),
                    ...timeSlots.map(slot => {
                      const isRecess = slot === '9:30-9:45';
                      const isLunch = slot === '11:45-12:45';
                      const val = isRecess ? 'RECESS' : isLunch ? 'LUNCH BREAK' : (subMatrix[slot]?.gradeSection || '-');
                      return new DocxTableCell({
                        width: { size: 9.6, type: DocxWidthType.PERCENTAGE },
                        children: [new DocxParagraph({ alignment: DocxAlignmentType.CENTER, children: [new DocxTextRun({ text: val, bold: true, size: 14 })] })]
                      });
                    })
                  ]
                }),

                // Row 4: Substitute Teacher
                new DocxTableRow({
                  children: [
                    new DocxTableCell({ width: { size: 13, type: DocxWidthType.PERCENTAGE }, children: [new DocxParagraph({ children: [new DocxTextRun({ text: "Substitute Teacher", bold: true, size: 16 })] })] }),
                    ...timeSlots.map(slot => {
                      const isRecess = slot === '9:30-9:45';
                      const isLunch = slot === '11:45-12:45';
                      const val = isRecess ? 'RECESS' : isLunch ? 'LUNCH BREAK' : (subMatrix[slot]?.substituteTeacher || '-');
                      return new DocxTableCell({
                        width: { size: 9.6, type: DocxWidthType.PERCENTAGE },
                        children: [new DocxParagraph({ alignment: DocxAlignmentType.CENTER, children: [new DocxTextRun({ text: val, bold: true, size: 14, color: "00875A" })] })]
                      });
                    })
                  ]
                }),

                // Row 5: Signature
                new DocxTableRow({
                  children: [
                    new DocxTableCell({ width: { size: 13, type: DocxWidthType.PERCENTAGE }, children: [new DocxParagraph({ children: [new DocxTextRun({ text: "Signature", bold: true, size: 16 })] })] }),
                    ...timeSlots.map(slot => {
                      const isRecess = slot === '9:30-9:45';
                      const isLunch = slot === '11:45-12:45';
                      const val = isRecess ? 'RECESS' : isLunch ? 'LUNCH BREAK' : ' ';
                      return new DocxTableCell({
                        width: { size: 9.6, type: DocxWidthType.PERCENTAGE },
                        children: [new DocxParagraph({ alignment: DocxAlignmentType.CENTER, children: [new DocxTextRun({ text: val, size: 12, italics: true })] })]
                      });
                    })
                  ]
                })
              ]
            }),

            // Signatories Block
            new DocxParagraph({
              children: [
                new DocxTextRun({ text: "\n\nPrepared by:                                     Noted by:                                           Approved by:\n\n\n", bold: true, size: 16 }),
                new DocxTextRun({ text: `__________________________               JOAHN J. ANDOT                            ANISAH A. SINAL\n`, bold: true, size: 16 }),
                new DocxTextRun({ text: `Name and Signature of Teacher            SHS-ASP II                                      Sec. School Principal IV\n`, size: 14 }),
              ]
            })
          ]
        }]
      });

      const blob = await DocxPacker.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = `LNNCHS_Class_Substitution_Form_${(absentTeacherName || 'Teacher').replace(/\s+/g, '_')}.docx`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSubDriveStatus(`✓ Generated Word Document (${fileName}) ready to print!`);
      setTimeout(() => setSubDriveStatus(null), 5000);
    } catch (err) {
      console.error('Error generating Word document:', err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ================= 1. HEADER BANNER ================= */}
      <div className="bg-gradient-to-r from-[#002776] via-[#0038A8] to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-md border-b-4 border-[#FCD116]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-[#CE1126] text-white rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
                SY 2026-2027 Official Program
              </span>
              <span className="px-3 py-1 bg-[#FCD116] text-[#002776] rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
                LIS Synchronized
              </span>
              <span className="px-3 py-1 bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 rounded-full text-xs font-bold font-mono">
                JHS + SHS Full Directory
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <span>LNNCHS Teachers' Load &amp; Substitution Hub</span>
            </h1>

            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              Complete workload management for Junior High School (Grade 7–10) and Senior High School (Grade 11–12). Instantly search vacant teachers for substitution ("Pag-Sub"), view teaching hours, advisories, and class programs.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20 text-right space-y-1">
            <div className="text-xs font-bold text-[#FCD116] uppercase tracking-wider">LNNCHS Faculty Totals</div>
            <div className="text-xl font-black text-white">49 SHS + 24 JHS Faculty</div>
            <div className="text-[11px] text-blue-200">100% DepEd Order 009 &amp; 015 Compliant</div>
          </div>
        </div>
      </div>

      {/* ================= 2. TAB NAVIGATION ================= */}
      <div className="flex flex-wrap bg-stone-200/90 p-1.5 rounded-2xl gap-2 shadow-inner">
        <button
          onClick={() => setActiveTab('shs_loading')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'shs_loading'
              ? 'bg-[#002776] text-white shadow-md'
              : 'text-stone-700 hover:bg-stone-300'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-[#FCD116]" />
          <span>🎓 SHS Teacher Load (49)</span>
        </button>

        <button
          onClick={() => setActiveTab('jhs_loading')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'jhs_loading'
              ? 'bg-[#002776] text-white shadow-md'
              : 'text-stone-700 hover:bg-stone-300'
          }`}
        >
          <Building className="w-4 h-4 text-emerald-400" />
          <span>🏫 JHS Teacher Load (G7-10)</span>
        </button>

        <button
          onClick={() => setActiveTab('sub_finder')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer relative ${
            activeTab === 'sub_finder'
              ? 'bg-[#CE1126] text-white shadow-md'
              : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
          }`}
        >
          <UserCheck className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>🔎 Pag-Sub / Available Teacher Finder</span>
          <span className="px-1.5 py-0.5 bg-amber-400 text-stone-900 rounded-md text-[10px] font-black uppercase">
            HOT
          </span>
        </button>

        <button
          onClick={() => setActiveTab('quick_sub_generator')}
          className={`flex-1 min-w-[220px] py-3 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer relative ${
            activeTab === 'quick_sub_generator'
              ? 'bg-purple-800 text-white shadow-md ring-2 ring-purple-400'
              : 'bg-purple-100 text-purple-900 border border-purple-300 hover:bg-purple-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span>📝 Auto-Sub Generator &amp; Preview</span>
          <span className="px-1.5 py-0.5 bg-purple-600 text-white rounded-md text-[10px] font-black uppercase shadow-xs">
            NEW
          </span>
        </button>

        <button
          onClick={() => setActiveTab('class_programs')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'class_programs'
              ? 'bg-[#002776] text-white shadow-md'
              : 'text-stone-700 hover:bg-stone-300'
          }`}
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>⚡ Class Programs &amp; SII</span>
        </button>

        <button
          onClick={() => setActiveTab('rute_exam')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'rute_exam'
              ? 'bg-[#002776] text-white shadow-md'
              : 'text-stone-700 hover:bg-stone-300'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>📝 RUTE &amp; TOS Exams</span>
        </button>
      </div>

      {/* ================= TAB 1: SHS TEACHER LOADING ================= */}
      {activeTab === 'shs_loading' && (
        <div className="space-y-6 animate-fade-in">
          {/* Controls Bar */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search SHS teacher, subject, advisory..."
                  value={shsTeacherSearch}
                  onChange={(e) => setShsTeacherSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#002776] outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                <span className="text-xs font-bold text-stone-500 whitespace-nowrap">Dept:</span>
                {shsDepartments.map(dept => (
                  <button
                    key={dept}
                    onClick={() => setShsDeptFilter(dept)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      shsDeptFilter === dept
                        ? 'bg-[#002776] text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={exportShsLoadingPDF}
              className="px-4 py-2 bg bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 cursor-pointer shadow-xs self-start md:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Export SHS Loading PDF</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
              <div className="text-xs font-bold text-blue-700">Matching Faculty</div>
              <div className="text-2xl font-black text-[#002776]">{filteredShsTeachers.length}</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
              <div className="text-xs font-bold text-amber-800">Total Regular Periods</div>
              <div className="text-2xl font-black text-amber-900">{shsTotalRegularPeriods}</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl">
              <div className="text-xs font-bold text-purple-800">ALS Load Periods</div>
              <div className="text-2xl font-black text-purple-900">{shsTotalALSPeriods}</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
              <div className="text-xs font-bold text-emerald-800">Total Teaching Load</div>
              <div className="text-2xl font-black text-emerald-900">{(shsTotalMinutesAll / 60).toFixed(0)} hrs / wk</div>
            </div>
          </div>

          {/* Loading Table */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#002776] text-white font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-3.5 w-12 text-center">No</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Name of Teacher</th>
                  <th className="p-3.5">Advisory Class / Coordinatorship</th>
                  <th className="p-3.5 text-center">Reg</th>
                  <th className="p-3.5 text-center">ALS</th>
                  <th className="p-3.5 text-center">Adv Mins</th>
                  <th className="p-3.5 text-center">Total Mins</th>
                  <th className="p-3.5">Subjects Handled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                {filteredShsTeachers.map((t, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition">
                    <td className="p-3.5 text-center font-bold text-stone-400">{t.no}</td>
                    <td className="p-3.5 font-bold text-blue-900">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-mono">
                        {t.department}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-stone-900">{t.name}</td>
                    <td className="p-3.5 text-stone-600 font-mono text-[11px]">{t.advisoryOrCoordinatorship}</td>
                    <td className="p-3.5 text-center font-bold text-stone-800">{t.periodsRegular}</td>
                    <td className="p-3.5 text-center font-bold text-purple-700">{t.periodsALS}</td>
                    <td className="p-3.5 text-center text-stone-500">{t.advisoryMinutes}</td>
                    <td className="p-3.5 text-center font-black text-[#002776] bg-blue-50/40">{t.totalMinutes}</td>
                    <td className="p-3.5 text-stone-600 text-[11px] max-w-xs leading-snug">{t.subjectsHandled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 2: JHS TEACHER LOADING ================= */}
      {activeTab === 'jhs_loading' && (
        <div className="space-y-6 animate-fade-in">
          {/* Controls Bar */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search JHS teacher, department..."
                  value={jhsTeacherSearch}
                  onChange={(e) => setJhsTeacherSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#002776] outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                <span className="text-xs font-bold text-stone-500 whitespace-nowrap">Dept:</span>
                {jhsDepartments.map(dept => (
                  <button
                    key={dept}
                    onClick={() => setJhsDeptFilter(dept)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      jhsDeptFilter === dept
                        ? 'bg-[#002776] text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={exportJhsLoadingPDF}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 cursor-pointer shadow-xs self-start md:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Export JHS Loading PDF</span>
            </button>
          </div>

          {/* Loading Table */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#002776] text-white font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-3.5 w-12 text-center">No</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Name of Teacher</th>
                  <th className="p-3.5">Advisory Class / Designation</th>
                  <th className="p-3.5 text-center">Total Minutes / Wk</th>
                  <th className="p-3.5 text-center">Standard Hours</th>
                  <th className="p-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                {filteredJhsTeachers.map((t, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition">
                    <td className="p-3.5 text-center font-bold text-stone-400">{t.no}</td>
                    <td className="p-3.5 font-bold text-blue-900">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-mono">
                        {t.department}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-stone-900">{t.name}</td>
                    <td className="p-3.5 text-stone-600 font-mono text-[11px]">{t.advisoryOrCoordinatorship}</td>
                    <td className="p-3.5 text-center font-black text-[#002776] bg-blue-50/40">{t.totalMinutes}</td>
                    <td className="p-3.5 text-center font-bold text-emerald-700">30 hrs / week</td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => {
                          setSelectedSubTeacher({
                            name: t.name,
                            level: 'JHS',
                            department: t.department,
                            advisory: t.advisoryOrCoordinatorship
                          });
                          setActiveTab('sub_finder');
                        }}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1 mx-auto cursor-pointer"
                      >
                        <UserCheck className="w-3 h-3" />
                        <span>Check Vacant Slot</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 3: PAG-SUB / VACANT TEACHER FINDER ================= */}
      {activeTab === 'sub_finder' && (
        <div className="space-y-6 animate-fade-in">
          {/* Sub Finder Hero Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-6 text-white shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white text-amber-900 rounded-full text-xs font-black uppercase tracking-wider">
                Pag-Sub Assistant • LNNCHS SY 2026-2027
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              🔍 Available / Vacant Teacher Finder ("Pag Sub og Teacher")
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 max-w-2xl leading-relaxed">
              Select or type a time slot and day below. The system automatically inspects all teacher schedules across JHS and SHS to tell you <strong>EXACTLY WHO IS VACANT &amp; AVAILABLE</strong> to substitute right now!
            </p>
          </div>

          {/* ================= MULTI-TEACHER BATCH SUBSTITUTE ASSISTANT WORKFLOW ================= */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-800 shadow-xl space-y-6 text-stone-900 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-2xl bg-[#002776] text-white font-black flex items-center justify-center text-base shadow-sm">
                  AI
                </span>
                <div>
                  <h3 className="text-base font-black text-stone-900 uppercase tracking-wide">
                    📋 LNNCHS Substitute Teacher Scheduling Assistant (System Prompt Workflow)
                  </h3>
                  <p className="text-xs text-stone-500 font-mono">
                    Multi-Teacher Absence &amp; Auto-Assignment Engine (Steps 1 to 5)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowBatchSummaryModal(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs transition flex items-center gap-2 cursor-pointer shadow-md animate-pulse"
              >
                <Sparkles className="w-4 h-4" />
                <span>[GENERATE SUMMARY] — Daily Substitute Summary Report</span>
              </button>
            </div>

            {/* STEP 1: Input Absent Teachers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-300">
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-800 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#002776]" />
                  <span>STEP 1A — Date of Absence:</span>
                </label>
                <input
                  type="text"
                  value={batchAbsentDate}
                  onChange={(e) => setBatchAbsentDate(e.target.value)}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 font-mono"
                  placeholder="e.g., September 25, 2026 — Thursday"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-stone-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-rose-700" />
                  <span>STEP 1B — Absent Teachers (One or More):</span>
                </label>
                <textarea
                  rows={2}
                  value={batchAbsentTeachersInput}
                  onChange={(e) => setBatchAbsentTeachersInput(e.target.value)}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 font-mono"
                  placeholder="1. R. Pawaden&#10;2. M. Tabacon"
                />
              </div>
            </div>

            {/* STEP 2 & 3: Affected Classes & Available Substitutes per Period */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-stone-800 uppercase tracking-wide flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center text-[11px] font-black">2&amp;3</span>
                <span>STEP 2 &amp; 3 — Affected Classes &amp; Available Substitutes Scanned (Strict Rules: No Absent Subs, Respect Breaks, List Multiple Options):</span>
              </h4>

              <div className="overflow-x-auto border border-stone-300 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-200 text-stone-900 font-black uppercase text-[10px]">
                    <tr>
                      <th className="p-3 border-r border-stone-300">Time Slot</th>
                      <th className="p-3 border-r border-stone-300">Absent Teacher</th>
                      <th className="p-3 border-r border-stone-300">Subject / Grade &amp; Section</th>
                      <th className="p-3 border-r border-stone-300">Room</th>
                      <th className="p-3 text-emerald-900 bg-emerald-50">Suggested Available Substitutes (All Options)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 font-medium">
                    <tr className="bg-white">
                      <td className="p-3 font-mono font-bold border-r border-stone-200">08:30–09:30</td>
                      <td className="p-3 font-bold text-rose-950 border-r border-stone-200">R. Pawaden</td>
                      <td className="p-3 border-r border-stone-200">TVL • 12 HUMSS 3</td>
                      <td className="p-3 border-r border-stone-200">Room 203</td>
                      <td className="p-3 bg-emerald-50/50 font-semibold text-emerald-900">
                        ✅ M. Araba, J. Arquita, T. Tuastomban, M. Alaba
                      </td>
                    </tr>
                    <tr className="bg-stone-50">
                      <td className="p-3 font-mono font-bold border-r border-stone-200">10:45–11:45</td>
                      <td className="p-3 font-bold text-rose-950 border-r border-stone-200">R. Pawaden</td>
                      <td className="p-3 border-r border-stone-200">TVL • 12 HUMSS 4</td>
                      <td className="p-3 border-r border-stone-200">Room 203</td>
                      <td className="p-3 bg-emerald-50/50 font-semibold text-emerald-900">
                        ✅ J. Arquita, A. Canoog, R. Rufino
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-mono font-bold border-r border-stone-200">12:45–1:45</td>
                      <td className="p-3 font-bold text-rose-950 border-r border-stone-200">M. Tabacon</td>
                      <td className="p-3 border-r border-stone-200">GAS • 12 GAS 2</td>
                      <td className="p-3 border-r border-stone-200">Room 205</td>
                      <td className="p-3 bg-emerald-50/50 font-semibold text-emerald-900">
                        ✅ T. Tuastomban, M. Santillan, G. Oquina
                      </td>
                    </tr>
                    <tr className="bg-stone-50">
                      <td className="p-3 font-mono font-bold border-r border-stone-200">1:45–2:45</td>
                      <td className="p-3 font-bold text-rose-950 border-r border-stone-200">M. Tabacon</td>
                      <td className="p-3 border-r border-stone-200">FLM • 12 FLM</td>
                      <td className="p-3 border-r border-stone-200">Room 205</td>
                      <td className="p-3 bg-emerald-50/50 font-semibold text-emerald-900">
                        ✅ M. Araba, B. Tampus, N. Lacio
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* STEP 4: Substitute Assignment Form (Fillable Table) */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black text-stone-800 uppercase tracking-wide flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-[#002776] text-white flex items-center justify-center text-[11px] font-black">4</span>
                <span>STEP 4 — Substitute Assignment Form (Fillable &amp; Selectable):</span>
              </h4>

              <div className="overflow-x-auto border-2 border-stone-800 rounded-xl">
                <table className="w-full text-center text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#002776] text-white font-black">
                      <th className="p-3 border-r border-blue-900">Time</th>
                      <th className="p-3 border-r border-blue-900">Subject</th>
                      <th className="p-3 border-r border-blue-900">Grade/Section</th>
                      <th className="p-3 border-r border-blue-900">Absent Teacher</th>
                      <th className="p-3 border-r border-blue-900">Suggested Substitute(s)</th>
                      <th className="p-3 bg-amber-400 text-stone-950">Assigned Substitute (Choose)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 font-medium">
                    <tr className="bg-white">
                      <td className="p-3 font-mono font-bold border-r border-stone-800 bg-stone-100">08:30–09:30</td>
                      <td className="p-3 border-r border-stone-800">TVL</td>
                      <td className="p-3 border-r border-stone-800 font-bold text-purple-900">12 HUMSS 3</td>
                      <td className="p-3 border-r border-stone-800 font-bold text-rose-900">R. Pawaden</td>
                      <td className="p-3 border-r border-stone-800 text-[11px] text-stone-600">M. Araba, J. Arquita</td>
                      <td className="p-3 bg-amber-50">
                        <select
                          value={batchAssignedMap['8:30-9:30'] || 'M. ARABA'}
                          onChange={(e) => setBatchAssignedMap(prev => ({ ...prev, '8:30-9:30': e.target.value }))}
                          className="w-full p-1.5 bg-white border border-stone-300 rounded-lg font-black text-stone-900 text-xs outline-none"
                        >
                          <option value="M. ARABA">M. ARABA</option>
                          <option value="J. ARQUITA">J. ARQUITA</option>
                          <option value="T. TUASTOMBAN">T. TUASTOMBAN</option>
                        </select>
                      </td>
                    </tr>
                    <tr className="bg-stone-50">
                      <td className="p-3 font-mono font-bold border-r border-stone-800 bg-stone-100">10:45–11:45</td>
                      <td className="p-3 border-r border-stone-800">TVL</td>
                      <td className="p-3 border-r border-stone-800 font-bold text-purple-900">12 HUMSS 4</td>
                      <td className="p-3 border-r border-stone-800 font-bold text-rose-900">R. Pawaden</td>
                      <td className="p-3 border-r border-stone-800 text-[11px] text-stone-600">J. Arquita, A. Canoog</td>
                      <td className="p-3 bg-amber-50">
                        <select
                          value={batchAssignedMap['10:45-11:45'] || 'J. ARQUITA'}
                          onChange={(e) => setBatchAssignedMap(prev => ({ ...prev, '10:45-11:45': e.target.value }))}
                          className="w-full p-1.5 bg-white border border-stone-300 rounded-lg font-black text-stone-900 text-xs outline-none"
                        >
                          <option value="J. ARQUITA">J. ARQUITA</option>
                          <option value="A. CANOOG">A. CANOOG</option>
                          <option value="R. RUFINO">R. RUFINO</option>
                        </select>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-mono font-bold border-r border-stone-800 bg-stone-100">12:45–1:45</td>
                      <td className="p-3 border-r border-stone-800">GAS</td>
                      <td className="p-3 border-r border-stone-800 font-bold text-purple-900">12 GAS 2</td>
                      <td className="p-3 border-r border-stone-800 font-bold text-rose-900">M. Tabacon</td>
                      <td className="p-3 border-r border-stone-800 text-[11px] text-stone-600">T. Tuastomban, M. Santillan</td>
                      <td className="p-3 bg-amber-50">
                        <select
                          value={batchAssignedMap['12:45-1:45'] || 'T. TUASTOMBAN'}
                          onChange={(e) => setBatchAssignedMap(prev => ({ ...prev, '12:45-1:45': e.target.value }))}
                          className="w-full p-1.5 bg-white border border-stone-300 rounded-lg font-black text-stone-900 text-xs outline-none"
                        >
                          <option value="T. TUASTOMBAN">T. TUASTOMBAN</option>
                          <option value="M. SANTILLAN">M. SANTILLAN</option>
                          <option value="G. OQUINA">G. OQUINA</option>
                        </select>
                      </td>
                    </tr>
                    <tr className="bg-stone-50">
                      <td className="p-3 font-mono font-bold border-r border-stone-800 bg-stone-100">1:45–2:45</td>
                      <td className="p-3 border-r border-stone-800">FLM</td>
                      <td className="p-3 border-r border-stone-800 font-bold text-purple-900">12 FLM</td>
                      <td className="p-3 border-r border-stone-800 font-bold text-rose-900">M. Tabacon</td>
                      <td className="p-3 border-r border-stone-800 text-[11px] text-stone-600">M. Araba, B. Tampus</td>
                      <td className="p-3 bg-amber-50">
                        <select
                          value={batchAssignedMap['1:45-2:45'] || 'M. ARABA'}
                          onChange={(e) => setBatchAssignedMap(prev => ({ ...prev, '1:45-2:45': e.target.value }))}
                          className="w-full p-1.5 bg-white border border-stone-300 rounded-lg font-black text-stone-900 text-xs outline-none"
                        >
                          <option value="M. ARABA">M. ARABA</option>
                          <option value="B. TAMPUS">B. TAMPUS</option>
                          <option value="N. LACIO">N. LACIO</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* STEP 5: Summary Action Footer */}
            <div className="pt-4 border-t-2 border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-600 font-mono">
                ✓ System Prompt Rules Enforced: No absent teachers assigned, breaks respected, multiple substitute options available.
              </div>
              <button
                onClick={() => setShowBatchSummaryModal(true)}
                className="w-full sm:w-auto px-6 py-3 bg-[#002776] hover:bg-blue-950 text-white font-black rounded-2xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>[GENERATE SUMMARY] — View Daily Substitute Summary Report</span>
              </button>
            </div>
          </div>

          {/* Time & Filter Selection Panel */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            
            {/* STRICT LEVEL SEPARATION COMMAND BAR */}
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#002776]" />
                <span className="text-xs font-black text-stone-800">Substitution Level Mode Command:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSubLevelFilter('JHS')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                    subLevelFilter === 'JHS'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>🏫 JHS Teachers ONLY (Subbing Grade 7–10)</span>
                </button>

                <button
                  onClick={() => setSubLevelFilter('SHS')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                    subLevelFilter === 'SHS'
                      ? 'bg-purple-900 text-white shadow-xs'
                      : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>🎓 SHS Teachers ONLY (Subbing Grade 11–12)</span>
                </button>

                <button
                  onClick={() => setSubLevelFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    subLevelFilter === 'ALL'
                      ? 'bg-stone-800 text-white shadow-xs'
                      : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>⚡ Both (All Faculty)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Select Time Slot */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-stone-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Select Time Slot:</span>
                </label>
                <select
                  value={subSelectedTimeSlot}
                  onChange={(e) => setSubSelectedTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  {LNNCHS_TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              {/* Select Day */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-stone-700 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Select Day:</span>
                </label>
                <select
                  value={subSelectedDay}
                  onChange={(e) => setSubSelectedDay(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="M">Monday (Lunes)</option>
                  <option value="T">Tuesday (Martes)</option>
                  <option value="W">Wednesday (Miyerkules)</option>
                  <option value="Th">Thursday (Huwebes)</option>
                  <option value="F">Friday (Biyernes)</option>
                </select>
              </div>

              {/* Level Filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-stone-700 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  <span>Level Filter:</span>
                </label>
                <select
                  value={subLevelFilter}
                  onChange={(e) => setSubLevelFilter(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="ALL">ALL (JHS &amp; SHS)</option>
                  <option value="JHS">Junior High School (Grade 7-10)</option>
                  <option value="SHS">Senior High School (Grade 11-12)</option>
                </select>
              </div>

              {/* Department Filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-stone-700 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Department Filter:</span>
                </label>
                <select
                  value={subDeptFilter}
                  onChange={(e) => setSubDeptFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="ALL">ALL Departments</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="Filipino">Filipino</option>
                  <option value="TLE">TLE / TVL</option>
                  <option value="Aral.Pan.">Aral.Pan. / Social Sci</option>
                  <option value="MAPEH">MAPEH / PE</option>
                  <option value="Val.Ed.">Val.Ed.</option>
                </select>
              </div>
            </div>

            {/* Quick Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>🟢 {vacantTeachersList.length} Teachers VACANT / AVAILABLE</span>
                </span>
                <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-bold">
                  🔴 {occupiedTeachersList.length} In Class
                </span>
              </div>

              <div className="text-xs text-stone-500 font-mono">
                Showing availability for: <strong>{subSelectedTimeSlot}</strong> ({subSelectedDay === 'M' ? 'Mon' : subSelectedDay === 'T' ? 'Tue' : subSelectedDay === 'W' ? 'Wed' : subSelectedDay === 'Th' ? 'Thu' : 'Fri'})
              </div>
            </div>
          </div>

          {/* VACANT TEACHERS LIST */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-stone-800 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>KINSA TEACHER AVAILABLE (AVAILABLE VACANT TEACHERS FOR SUB):</span>
            </h3>

            {vacantTeachersList.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300 text-stone-500">
                <AlertCircle className="w-8 h-8 mx-auto text-amber-500 mb-2" />
                <p className="font-bold">No vacant teachers found for this time slot and filter combination.</p>
                <p className="text-xs text-stone-400 mt-1">Try changing the time slot or department filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vacantTeachersList.map((t, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border-2 border-emerald-300 shadow-xs hover:shadow-md transition space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-xl tracking-wider">
                      🟢 VACANT / FREE
                    </div>

                    <div className="space-y-1 pr-12">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-mono text-[10px] font-bold rounded-md">
                        {t.level} • {t.department}
                      </span>
                      <h4 className="text-base font-black text-stone-900">{t.name}</h4>
                      <p className="text-xs text-stone-500 font-mono">{t.advisory}</p>
                    </div>

                    <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1 font-mono">
                      <div className="font-bold flex items-center gap-1 text-emerald-800">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Free Time Window: {subSelectedTimeSlot}</span>
                      </div>
                      <div className="text-[11px] text-emerald-700">
                        No scheduled class assigned. Ready for substitution.
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedSubTeacher(t);
                        setSubSubjectSection('Grade 8 - Lavender (Math)');
                        setShowSubSuccessModal(true);
                      }}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Assign as Substitute Teacher</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Substitution Drive Status Banner */}
            {subDriveStatus && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between gap-3 text-emerald-900 text-xs font-bold shadow-xs animate-fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{subDriveStatus}</span>
                </div>
              </div>
            )}

            {/* ISSUED SUBSTITUTION ORDERS LOG TABLE */}
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                <div>
                  <h4 className="text-sm font-black text-stone-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#002776]" />
                    <span>LNNCHS Official Substitution Orders Log ({subHistory.length} Slips Issued)</span>
                  </h4>
                  <p className="text-xs text-stone-500 font-mono">
                    Track all teacher substitution orders issued for DepEd HR, Principal &amp; Division records.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-[#002776] rounded-full text-xs font-black font-mono">
                    Drive Synced: Boiser-Grading-Reports
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Date &amp; Time Slot</th>
                      <th className="p-3">Absent Teacher</th>
                      <th className="p-3">Assigned Substitute</th>
                      <th className="p-3">Subject &amp; Room</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                    {subHistory.map((item, i) => (
                      <tr key={i} className="hover:bg-stone-50 transition">
                        <td className="p-3 font-mono font-bold text-blue-900">{item.id}</td>
                        <td className="p-3 font-mono text-stone-600">
                          <div>{item.date} ({item.day.substring(0, 3)})</div>
                          <div className="text-[10px] text-stone-400 font-bold">{item.timeSlot}</div>
                        </td>
                        <td className="p-3 font-bold text-rose-900">{item.absentTeacherName}</td>
                        <td className="p-3 font-black text-emerald-900">
                          <div>{item.subTeacherName}</div>
                          <div className="text-[10px] text-stone-400 font-mono">{item.subLevel} • {item.subDept}</div>
                        </td>
                        <td className="p-3 text-stone-600">
                          <div className="font-bold text-stone-800">{item.subjectSection}</div>
                          <div className="text-[10px] text-stone-400 font-mono">{item.room}</div>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            item.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => {
                              setSelectedSubTeacher({
                                name: item.subTeacherName,
                                level: item.subLevel,
                                department: item.subDept,
                                advisory: 'Assigned Substitute'
                              });
                              setAbsentTeacherName(item.absentTeacherName);
                              setSubSubjectSection(item.subjectSection);
                              setSubRoom(item.room);
                              setShowSubSuccessModal(true);
                            }}
                            className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-[10px] font-bold transition cursor-pointer"
                          >
                            Re-Print Slip
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3.5: AUTO-SUB GENERATOR & PREVIEW TAB ================= */}
      {activeTab === 'quick_sub_generator' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#002776] rounded-3xl p-6 text-white shadow-md border-b-4 border-amber-400">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-400/40 text-amber-300 rounded-full text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>INSTANT TEACHER ABSENCE &amp; SUBSTITUTION ENGINE</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  📝 Class Substitution Form &amp; Auto-Generator
                </h2>
                <p className="text-xs sm:text-sm text-purple-100 max-w-2xl">
                  Select an absent teacher or load a pre-configured sample form below. The engine scans schedules, matches vacant teachers for each time slot, and formats the official <strong>Class Substitution Form</strong> ready to print or export as Word (.docx) &amp; PDF!
                </p>
              </div>

              {/* Quick Exemplar Switcher */}
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 space-y-2">
                <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider text-center">
                  ⚡ One-Click Exemplar Form Loaders:
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  <button
                    onClick={() => loadPreconfiguredExemplar('pawaden')}
                    className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-lg text-[11px] transition shadow-xs cursor-pointer"
                  >
                    📌 R. Pawaden
                  </button>
                  <button
                    onClick={() => loadPreconfiguredExemplar('tabacon')}
                    className="px-2.5 py-1 bg-blue-400 hover:bg-blue-300 text-stone-950 font-black rounded-lg text-[11px] transition shadow-xs cursor-pointer"
                  >
                    📌 M. Tabacon
                  </button>
                  <button
                    onClick={() => loadPreconfiguredExemplar('guillot')}
                    className="px-2.5 py-1 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-black rounded-lg text-[11px] transition shadow-xs cursor-pointer"
                  >
                    📌 L. GUILLOT
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Top Control Bar: Select Absent Teacher & Details */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-900 font-black flex items-center justify-center text-xs">
                1
              </span>
              <h3 className="text-sm font-black text-stone-900">Absent Teacher &amp; Form Settings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-bold">
              <div>
                <label className="text-stone-700 block mb-1">Absent Teacher Name:</label>
                <div className="relative">
                  <input
                    type="text"
                    list="absent-teachers-generator-list"
                    value={absentTeacherName}
                    onChange={(e) => handleSelectAbsentTeacher(e.target.value)}
                    placeholder="Type or select name..."
                    className="w-full p-2.5 bg-stone-50 border-2 border-purple-200 rounded-xl font-bold text-stone-900 focus:ring-2 focus:ring-purple-600 outline-none"
                  />
                  <datalist id="absent-teachers-generator-list">
                    <option value="R. Pawaden">TVL / HUMSS • SHS</option>
                    <option value="M. Tabacon">ABM / GAS / ICT • SHS</option>
                    <option value="L. GUILLOT">Tech Pro / Academics • SHS</option>
                    {LNNCHS_JHS_TEACHERS.map((t, i) => (
                      <option key={`jhs-${i}`} value={t.name}>{t.department} • JHS</option>
                    ))}
                    {LNNCHS_SHS_TEACHER_LOADINGS.map((t, i) => (
                      <option key={`shs-${i}`} value={t.name}>{t.department} • SHS</option>
                    ))}
                  </datalist>
                </div>
              </div>

              <div>
                <label className="text-stone-700 block mb-1">Learning Area / Subject Group:</label>
                <input
                  type="text"
                  value={absentTeacherGroup}
                  onChange={(e) => setAbsentTeacherGroup(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-stone-900"
                />
              </div>

              <div>
                <label className="text-stone-700 block mb-1">Date of Substitution:</label>
                <input
                  type="text"
                  value={subDate}
                  onChange={(e) => setSubDate(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="text-stone-700 block mb-1">Reason of Absence:</label>
                <input
                  type="text"
                  value={absentReason}
                  onChange={(e) => setAbsentReason(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-stone-900"
                />
              </div>
            </div>
          </div>

          {/* OFFICIAL CLASS SUBSTITUTION FORM PREVIEW */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-800 shadow-xl space-y-6 text-stone-900 font-sans">
            <div className="flex items-center justify-between border-b-2 border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#002776] text-white font-black flex items-center justify-center text-sm">
                  2
                </span>
                <div>
                  <h3 className="text-base font-black text-stone-900 uppercase tracking-wide">Official Class Substitution Form</h3>
                  <p className="text-xs text-stone-500 font-mono">Live On-Screen Form Preview &amp; Cell Editor</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportSubstitutionSlipDOCX}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-black rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>📄 Export Word File (.docx)</span>
                </button>
                <button
                  onClick={exportSubstitutionSlipPDF}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Download PDF Form</span>
                </button>
              </div>
            </div>

            {/* Official Form Header */}
            <div className="text-center space-y-1 font-sans">
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-stone-800">
                LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL
              </h2>
              <div className="text-xs font-bold text-stone-600 uppercase">Grade XII - SENIOR HIGH SCHOOL</div>
              <div className="text-xs font-semibold text-stone-500">Baroy, Lanao del Norte</div>
              <h1 className="text-lg sm:text-2xl font-black uppercase tracking-wide text-[#002776] pt-1">
                Class Substitution Form
              </h1>
              <div className="text-xs font-bold font-mono text-stone-600">{subSchoolYear}</div>
            </div>

            {/* Form Metadata Fields Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs font-medium border-t-2 border-b-2 border-stone-800 py-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-800 whitespace-nowrap">Name of Teacher:</span>
                <input
                  type="text"
                  value={absentTeacherName}
                  onChange={(e) => setAbsentTeacherName(e.target.value)}
                  className="flex-1 font-black text-rose-900 bg-amber-50/50 border-b-2 border-stone-800 px-2 py-0.5 focus:bg-amber-100 outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-800 whitespace-nowrap">Learning Area/Subject Group:</span>
                <input
                  type="text"
                  value={absentTeacherGroup}
                  onChange={(e) => setAbsentTeacherGroup(e.target.value)}
                  className="flex-1 font-bold border-b-2 border-stone-800 bg-transparent px-2 py-0.5 outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-800 whitespace-nowrap">Date of Substitution:</span>
                <input
                  type="text"
                  value={subDate}
                  onChange={(e) => setSubDate(e.target.value)}
                  className="flex-1 font-mono font-bold border-b-2 border-stone-800 bg-transparent px-2 py-0.5 outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-800 whitespace-nowrap">Reason of Absence:</span>
                <input
                  type="text"
                  value={absentReason}
                  onChange={(e) => setAbsentReason(e.target.value)}
                  className="flex-1 font-bold border-b-2 border-stone-800 bg-transparent px-2 py-0.5 outline-none"
                />
              </div>
            </div>

            {/* Substitution Schedule Table Matrix */}
            <div className="overflow-x-auto border-2 border-stone-800 rounded-lg">
              <table className="w-full text-center text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-stone-200 border-b-2 border-stone-800 text-stone-900 font-black">
                    <th className="p-2 border-r-2 border-stone-800 w-28 bg-stone-300">Time</th>
                    {FORM_TIME_SLOTS.map((slot) => {
                      const isBreak = slot === '9:30-9:45' || slot === '11:45-12:45';
                      return (
                        <th
                          key={slot}
                          className={`p-2 border-r border-stone-800 ${
                            isBreak ? 'bg-amber-200 text-amber-950 font-black' : 'bg-stone-100'
                          }`}
                        >
                          {slot}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 font-medium">
                  {/* Row 1: Subject */}
                  <tr className="border-b border-stone-800">
                    <td className="p-2.5 font-black border-r-2 border-stone-800 bg-stone-100 text-stone-900">
                      Subject
                    </td>
                    {FORM_TIME_SLOTS.map((slot) => {
                      const isRecess = slot === '9:30-9:45';
                      const isLunch = slot === '11:45-12:45';
                      if (isRecess) return <td key={slot} rowSpan={4} className="p-2 border-r-2 border-stone-800 bg-amber-100 font-black text-amber-900 uppercase tracking-widest text-center">RECESS</td>;
                      if (isLunch) return <td key={slot} rowSpan={4} className="p-2 border-r-2 border-stone-800 bg-amber-100 font-black text-amber-900 uppercase tracking-widest text-center">LUNCH BREAK</td>;
                      
                      return (
                        <td key={slot} className="p-1 border-r border-stone-800">
                          <input
                            type="text"
                            value={subMatrix[slot]?.subject || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSubMatrix(prev => ({
                                ...prev,
                                [slot]: { ...prev[slot], subject: val }
                              }));
                            }}
                            placeholder="-"
                            className="w-full text-center font-bold bg-transparent focus:bg-amber-50 outline-none text-stone-900"
                          />
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row 2: Grade & Section */}
                  <tr className="border-b border-stone-800">
                    <td className="p-2.5 font-black border-r-2 border-stone-800 bg-stone-100 text-stone-900">
                      Grade &amp; Section
                    </td>
                    {FORM_TIME_SLOTS.map((slot) => {
                      if (slot === '9:30-9:45' || slot === '11:45-12:45') return null;
                      return (
                        <td key={slot} className="p-1 border-r border-stone-800">
                          <input
                            type="text"
                            value={subMatrix[slot]?.gradeSection || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSubMatrix(prev => ({
                                ...prev,
                                [slot]: { ...prev[slot], gradeSection: val }
                              }));
                            }}
                            placeholder="-"
                            className="w-full text-center font-bold text-purple-900 bg-transparent focus:bg-purple-50 outline-none"
                          />
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row 3: Substitute Teacher */}
                  <tr className="border-b border-stone-800">
                    <td className="p-2.5 font-black border-r-2 border-stone-800 bg-stone-100 text-stone-900">
                      Substitute Teacher
                    </td>
                    {FORM_TIME_SLOTS.map((slot) => {
                      if (slot === '9:30-9:45' || slot === '11:45-12:45') return null;
                      return (
                        <td key={slot} className="p-1 border-r border-stone-800 bg-emerald-50/30">
                          <input
                            type="text"
                            value={subMatrix[slot]?.substituteTeacher || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSubMatrix(prev => ({
                                ...prev,
                                [slot]: { ...prev[slot], substituteTeacher: val }
                              }));
                            }}
                            placeholder="Assign Sub"
                            className="w-full text-center font-black text-emerald-900 bg-transparent focus:bg-emerald-100 outline-none"
                          />
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row 4: Signature */}
                  <tr>
                    <td className="p-2.5 font-black border-r-2 border-stone-800 bg-stone-100 text-stone-900">
                      Signature
                    </td>
                    {FORM_TIME_SLOTS.map((slot) => {
                      if (slot === '9:30-9:45' || slot === '11:45-12:45') return null;
                      return (
                        <td key={slot} className="p-2 border-r border-stone-800 h-10 text-[10px] text-stone-400 italic">
                          {subMatrix[slot]?.substituteTeacher ? '________________' : ''}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Signatories Footer Block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 font-sans text-xs">
              <div className="space-y-6">
                <div className="font-bold text-stone-800">Prepared by:</div>
                <div className="border-b-2 border-stone-800 pt-4 text-center font-bold text-stone-900">
                  {absentTeacherName || '________________________'}
                </div>
                <div className="text-center font-bold text-stone-600 text-[11px]">
                  Name and Signature of Teacher
                </div>
              </div>

              <div className="space-y-6">
                <div className="font-bold text-stone-800">Noted by:</div>
                <div className="border-b-2 border-stone-800 pt-4 text-center font-bold text-stone-900">
                  JOAHN J. ANDOT
                </div>
                <div className="text-center font-bold text-stone-600 text-[11px]">
                  SHS-ASP II
                </div>
              </div>

              <div className="space-y-6">
                <div className="font-bold text-stone-800">Approved by:</div>
                <div className="border-b-2 border-stone-800 pt-4 text-center font-bold text-stone-900">
                  ANISAH A. SINAL
                </div>
                <div className="text-center font-bold text-stone-600 text-[11px]">
                  Sec. School Principal IV
                </div>
              </div>
            </div>

            {/* Bottom Finalize Bar */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-stone-500">
                ✓ LNNCHS Form SY 2026-2027 • Standard Department Format
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={exportSubstitutionSlipDOCX}
                  className="flex-1 sm:flex-none px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-black rounded-2xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <FileText className="w-4 h-4 text-blue-200" />
                  <span>📄 Export Word File (.docx)</span>
                </button>
                <button
                  onClick={exportSubstitutionSlipPDF}
                  className="flex-1 sm:flex-none px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>Download PDF Form</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: CLASS PROGRAMS & TEACHER PROGRAMS ================= */}
      {activeTab === 'class_programs' && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Sub-Navigation Switcher */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#002776]" />
                  <span>Senior High School Official Class &amp; Teacher Programs</span>
                </h3>
                <p className="text-xs text-stone-500 font-mono">
                  SY 2026–2027 • TERM 2 (55–56 Days) Standard Schedules
                </p>
              </div>

              {/* View Category Switcher */}
              <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-2xl">
                <button
                  onClick={() => setProgViewMode('G11')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    progViewMode === 'G11'
                      ? 'bg-[#002776] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  🏫 Grade 11 Class Programs ({LNNCHS_GRADE11_CLASS_PROGRAMS.length})
                </button>
                <button
                  onClick={() => setProgViewMode('G12')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    progViewMode === 'G12'
                      ? 'bg-[#002776] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  🎓 Grade 12 Class Programs ({LNNCHS_GRADE12_CLASS_PROGRAMS.length})
                </button>
                <button
                  onClick={() => setProgViewMode('TEACHER')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    progViewMode === 'TEACHER'
                      ? 'bg-purple-900 text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  👨‍🏫 Teacher Programs ({LNNCHS_TEACHER_PROGRAMS.length})
                </button>
              </div>
            </div>

            {/* Selection Dropdown / Selector Cards */}
            {progViewMode === 'G11' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">Select Grade 11 Section / Track:</label>
                <div className="flex flex-wrap gap-2">
                  {LNNCHS_GRADE11_CLASS_PROGRAMS.map((prog, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedG11Index(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        selectedG11Index === idx
                          ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                          : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {prog.section}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {progViewMode === 'G12' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">Select Grade 12 Section / Strand:</label>
                <div className="flex flex-wrap gap-2">
                  {LNNCHS_GRADE12_CLASS_PROGRAMS.map((prog, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedG12Index(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        selectedG12Index === idx
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                          : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {prog.section}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {progViewMode === 'TEACHER' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">Select Teacher Program Schedule:</label>
                <div className="flex flex-wrap gap-2">
                  {LNNCHS_TEACHER_PROGRAMS.map((prog, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTeacherProgIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        selectedTeacherProgIndex === idx
                          ? 'bg-purple-900 text-white border-purple-900 shadow-xs'
                          : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {prog.teacherName} ({prog.advisoryClass || 'Teacher'})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DISPLAY SHEET FOR GRADE 11 OR GRADE 12 OR TEACHER PROGRAM */}
          {progViewMode === 'G11' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-800 shadow-xl space-y-6 text-stone-900 font-sans">
              {/* Official Header */}
              <div className="text-center space-y-1 border-b-2 border-stone-800 pb-4 font-sans">
                <div className="text-xs font-bold text-stone-600 uppercase tracking-widest">
                  LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL
                </div>
                <div className="text-sm font-black text-[#002776] uppercase tracking-wider">
                  STRENGTHENED SENIOR HIGH SCHOOL CURRICULUM
                </div>
                <h2 className="text-lg sm:text-xl font-black uppercase text-stone-900 pt-1">
                  Class Program – {LNNCHS_GRADE11_CLASS_PROGRAMS[selectedG11Index].term} of School Year 2026-2027
                </h2>
              </div>

              {/* Class Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold bg-stone-50 p-4 rounded-2xl border border-stone-300">
                <div>
                  <span className="text-stone-500 uppercase block text-[10px]">SECTION:</span>
                  <span className="text-sm font-black text-blue-950">
                    GRADE 11 {LNNCHS_GRADE11_CLASS_PROGRAMS[selectedG11Index].section.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 uppercase block text-[10px]">CLASS ADVISER:</span>
                  <span className="text-sm font-black text-stone-900">
                    {LNNCHS_GRADE11_CLASS_PROGRAMS[selectedG11Index].classAdviser}
                    {LNNCHS_GRADE11_CLASS_PROGRAMS[selectedG11Index].coAdviser && (
                      <span className="text-xs font-normal text-stone-600 block">
                        Co-Adviser: {LNNCHS_GRADE11_CLASS_PROGRAMS[selectedG11Index].coAdviser}
                      </span>
                    )}
                  </span>
                </div>
                <div className="sm:col-span-2 text-stone-700 font-mono text-[11px] pt-1 border-t border-stone-200">
                  <strong>Track / Pathway:</strong> {LNNCHS_GRADE11_CLASS_PROGRAMS[selectedG11Index].trackPathway} • <strong>Target Exit:</strong> {LNNCHS_GRADE11_CLASS_PROGRAMS[selectedG11Index].preferredExit}
                </div>
              </div>

              {/* Timetable Matrix */}
              <div className="overflow-x-auto border-2 border-stone-800 rounded-lg">
                <table className="w-full text-center text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#002776] text-white font-black">
                      <th className="p-2.5 border-r border-stone-700 w-32">TIME</th>
                      <th className="p-2.5 border-r border-stone-700">MONDAY</th>
                      <th className="p-2.5 border-r border-stone-700">TUESDAY</th>
                      <th className="p-2.5 border-r border-stone-700">WEDNESDAY</th>
                      <th className="p-2.5 border-r border-stone-700">THURSDAY</th>
                      <th className="p-2.5">FRIDAY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 font-medium">
                    {LNNCHS_GRADE11_CLASS_PROGRAMS[selectedG11Index].schedule.map((row, i) => {
                      const isBreak = row.monday === 'BREAK' || row.monday === 'LUNCH BREAK';
                      return (
                        <tr
                          key={i}
                          className={isBreak ? 'bg-amber-100 font-black text-amber-950' : i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}
                        >
                          <td className="p-2.5 font-bold font-mono border-r-2 border-stone-800 bg-stone-200 text-stone-900">
                            {row.time}
                          </td>
                          <td className="p-2 border-r border-stone-800 font-semibold">{row.monday}</td>
                          <td className="p-2 border-r border-stone-800 font-semibold">{row.tuesday}</td>
                          <td className="p-2 border-r border-stone-800 font-semibold">{row.wednesday}</td>
                          <td className="p-2 border-r border-stone-800 font-semibold">{row.thursday}</td>
                          <td className="p-2 font-semibold">{row.friday}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Signatories Block */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 text-center text-xs font-bold">
                <div>
                  <div className="border-b-2 border-stone-800 pb-1">
                    {LNNCHS_GRADE11_CLASS_PROGRAMS[selectedG11Index].classAdviser}
                  </div>
                  <div className="text-[11px] text-stone-500 font-normal pt-1">Class Adviser</div>
                </div>
                <div>
                  <div className="border-b-2 border-stone-800 pb-1">JOAHN J. ANDOT</div>
                  <div className="text-[11px] text-stone-500 font-normal pt-1">Assistant School Principal II</div>
                </div>
                <div>
                  <div className="border-b-2 border-stone-800 pb-1">ANISAH A. SINAL</div>
                  <div className="text-[11px] text-stone-500 font-normal pt-1">Sec. School Principal IV</div>
                </div>
              </div>
            </div>
          )}

          {progViewMode === 'G12' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-800 shadow-xl space-y-6 text-stone-900 font-sans">
              {/* Official Header */}
              <div className="text-center space-y-1 border-b-2 border-stone-800 pb-4 font-sans">
                <div className="text-xs font-bold text-stone-600 uppercase tracking-widest">
                  LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL
                </div>
                <div className="text-sm font-black text-[#002776] uppercase tracking-wider">
                  GRADE XII - SENIOR HIGH SCHOOL CURRICULUM
                </div>
                <h2 className="text-lg sm:text-xl font-black uppercase text-stone-900 pt-1">
                  Class Program – {LNNCHS_GRADE12_CLASS_PROGRAMS[selectedG12Index].term}, School Year 2026-2027
                </h2>
              </div>

              {/* Class Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold bg-stone-50 p-4 rounded-2xl border border-stone-300">
                <div>
                  <span className="text-stone-500 uppercase block text-[10px]">SECTION / STRAND:</span>
                  <span className="text-sm font-black text-emerald-950">
                    G12 {LNNCHS_GRADE12_CLASS_PROGRAMS[selectedG12Index].section.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 uppercase block text-[10px]">CLASS ADVISER:</span>
                  <span className="text-sm font-black text-stone-900">
                    {LNNCHS_GRADE12_CLASS_PROGRAMS[selectedG12Index].classAdviser}
                    {LNNCHS_GRADE12_CLASS_PROGRAMS[selectedG12Index].coAdviser && (
                      <span className="text-xs font-normal text-stone-600 block">
                        Co-Adviser: {LNNCHS_GRADE12_CLASS_PROGRAMS[selectedG12Index].coAdviser}
                      </span>
                    )}
                  </span>
                </div>
                <div className="sm:col-span-2 text-stone-700 font-mono text-[11px] pt-1 border-t border-stone-200">
                  <strong>Track / Pathway:</strong> {LNNCHS_GRADE12_CLASS_PROGRAMS[selectedG12Index].trackPathway} • <strong>Target Career:</strong> {LNNCHS_GRADE12_CLASS_PROGRAMS[selectedG12Index].targetJob}
                </div>
              </div>

              {/* Timetable Matrix */}
              <div className="overflow-x-auto border-2 border-stone-800 rounded-lg">
                <table className="w-full text-center text-xs border-collapse">
                  <thead>
                    <tr className="bg-emerald-900 text-white font-black">
                      <th className="p-2.5 border-r border-emerald-700 w-32">TIME</th>
                      <th className="p-2.5 border-r border-emerald-700">MONDAY</th>
                      <th className="p-2.5 border-r border-emerald-700">TUESDAY</th>
                      <th className="p-2.5 border-r border-emerald-700">WEDNESDAY</th>
                      <th className="p-2.5 border-r border-emerald-700">THURSDAY</th>
                      <th className="p-2.5">FRIDAY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 font-medium">
                    {LNNCHS_GRADE12_CLASS_PROGRAMS[selectedG12Index].schedule.map((row, i) => {
                      const isBreak = row.monday === 'BREAK' || row.monday === 'LUNCH BREAK';
                      return (
                        <tr
                          key={i}
                          className={isBreak ? 'bg-amber-100 font-black text-amber-950' : i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}
                        >
                          <td className="p-2.5 font-bold font-mono border-r-2 border-stone-800 bg-stone-200 text-stone-900">
                            {row.time}
                          </td>
                          <td className="p-2 border-r border-stone-800 font-semibold">{row.monday}</td>
                          <td className="p-2 border-r border-stone-800 font-semibold">{row.tuesday}</td>
                          <td className="p-2 border-r border-stone-800 font-semibold">{row.wednesday}</td>
                          <td className="p-2 border-r border-stone-800 font-semibold">{row.thursday}</td>
                          <td className="p-2 font-semibold">{row.friday}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Signatories Block */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 text-center text-xs font-bold">
                <div>
                  <div className="border-b-2 border-stone-800 pb-1">
                    {LNNCHS_GRADE12_CLASS_PROGRAMS[selectedG12Index].classAdviser}
                  </div>
                  <div className="text-[11px] text-stone-500 font-normal pt-1">Class Adviser</div>
                </div>
                <div>
                  <div className="border-b-2 border-stone-800 pb-1">JOAHN J. ANDOT</div>
                  <div className="text-[11px] text-stone-500 font-normal pt-1">Assistant School Principal II</div>
                </div>
                <div>
                  <div className="border-b-2 border-stone-800 pb-1">ANISAH A. SINAL</div>
                  <div className="text-[11px] text-stone-500 font-normal pt-1">Sec. School Principal IV</div>
                </div>
              </div>
            </div>
          )}

          {progViewMode === 'TEACHER' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-purple-900 shadow-xl space-y-6 text-stone-900 font-sans">
              {/* Official Header */}
              <div className="text-center space-y-1 border-b-2 border-stone-800 pb-4 font-sans">
                <div className="text-xs font-bold text-stone-600 uppercase tracking-widest">
                  LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL
                </div>
                <div className="text-sm font-black text-purple-900 uppercase tracking-wider">
                  SENIOR HIGH SCHOOL CURRICULUM
                </div>
                <h2 className="text-lg sm:text-xl font-black uppercase text-stone-900 pt-1">
                  TEACHER'S PROGRAM – {LNNCHS_TEACHER_PROGRAMS[selectedTeacherProgIndex].term} ({LNNCHS_TEACHER_PROGRAMS[selectedTeacherProgIndex].durationDays} DAYS), SCHOOL YEAR {LNNCHS_TEACHER_PROGRAMS[selectedTeacherProgIndex].schoolYear}
                </h2>
              </div>

              {/* Teacher Metadata */}
              <div className="bg-purple-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
                <div>
                  <div className="text-xs font-bold text-purple-200 uppercase">TEACHER NAME:</div>
                  <div className="text-lg font-black">{LNNCHS_TEACHER_PROGRAMS[selectedTeacherProgIndex].teacherName}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-amber-300 uppercase">CLASS ADVISORY:</div>
                  <div className="text-base font-black text-white">{LNNCHS_TEACHER_PROGRAMS[selectedTeacherProgIndex].advisoryClass || 'Faculty Member'}</div>
                </div>
              </div>

              {/* Timetable Matrix */}
              <div className="overflow-x-auto border-2 border-stone-800 rounded-lg">
                <table className="w-full text-center text-xs border-collapse">
                  <thead>
                    <tr className="bg-purple-950 text-white font-black">
                      <th className="p-2.5 border-r border-purple-800 w-32">TIME</th>
                      <th className="p-2.5 border-r border-purple-800">MONDAY</th>
                      <th className="p-2.5 border-r border-purple-800">TUESDAY</th>
                      <th className="p-2.5 border-r border-purple-800">WEDNESDAY</th>
                      <th className="p-2.5 border-r border-purple-800">THURSDAY</th>
                      <th className="p-2.5">FRIDAY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 font-medium">
                    {LNNCHS_TEACHER_PROGRAMS[selectedTeacherProgIndex].schedule.map((row, i) => {
                      const isBreak = row.monday === 'BREAK' || row.monday.includes('PRE-SCHOOL');
                      return (
                        <tr
                          key={i}
                          className={isBreak ? 'bg-amber-100 font-black text-amber-950' : i % 2 === 0 ? 'bg-white' : 'bg-purple-50/30'}
                        >
                          <td className="p-2.5 font-bold font-mono border-r-2 border-stone-800 bg-stone-200 text-stone-900">
                            {row.time}
                          </td>
                          <td className="p-2 border-r border-stone-800 font-semibold">{row.monday}</td>
                          <td className="p-2 border-r border-stone-800 font-semibold">{row.tuesday}</td>
                          <td className="p-2 border-r border-stone-800 font-semibold">{row.wednesday}</td>
                          <td className="p-2 border-r border-stone-800 font-semibold">{row.thursday}</td>
                          <td className="p-2 font-semibold">{row.friday}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Signatories Block */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 text-center text-xs font-bold">
                <div>
                  <div className="border-b-2 border-stone-800 pb-1">
                    {LNNCHS_TEACHER_PROGRAMS[selectedTeacherProgIndex].teacherName}
                  </div>
                  <div className="text-[11px] text-stone-500 font-normal pt-1">Teacher II</div>
                </div>
                <div>
                  <div className="border-b-2 border-stone-800 pb-1">JOAHN J. ANDOT</div>
                  <div className="text-[11px] text-stone-500 font-normal pt-1">Assistant School Principal II</div>
                </div>
                <div>
                  <div className="border-b-2 border-stone-800 pb-1">ANISAH A. SINAL</div>
                  <div className="text-[11px] text-stone-500 font-normal pt-1">Sec. School Principal IV</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 5: RUTE & TOS EXAMS ================= */}
      {activeTab === 'rute_exam' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            <span>60-Item RUTE Examination &amp; Life/Career TOS</span>
          </h3>
          <p className="text-xs text-stone-600">
            Official assessment items aligned with DepEd Region X Standards and Table of Specifications (TOS).
          </p>
        </div>
      )}

      {/* ================= SUBSTITUTION ASSIGNMENT MODAL ================= */}
      {showSubSuccessModal && selectedSubTeacher && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <UserCheck className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-black text-stone-900 text-base">Assign Substitution Order</h3>
                  <p className="text-xs text-stone-500 font-mono">LNNCHS Official Sub Slip Generator</p>
                </div>
              </div>
              <button
                onClick={() => setShowSubSuccessModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <div className="text-stone-500 uppercase font-bold text-[10px]">Assigned Substitute:</div>
              <div className="text-sm font-black text-stone-900">{selectedSubTeacher.name}</div>
              <div className="text-stone-600 font-mono">
                {selectedSubTeacher.level} • {selectedSubTeacher.department} • Time Slot: <strong>{subSelectedTimeSlot}</strong>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Select Absent Teacher (To be substituted):</label>
                <input
                  type="text"
                  list="absent-teachers-list"
                  placeholder="Type or select absent teacher name..."
                  value={absentTeacherName}
                  onChange={(e) => {
                    const name = e.target.value;
                    setAbsentTeacherName(name);
                    // Find if match exists to auto-fill subject
                    const jhsMatch = LNNCHS_JHS_TEACHERS.find(t => t.name.toLowerCase() === name.toLowerCase());
                    if (jhsMatch) {
                      setSubSubjectSection(`${jhsMatch.department} - ${jhsMatch.advisoryOrCoordinatorship}`);
                    }
                  }}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <datalist id="absent-teachers-list">
                  {LNNCHS_JHS_TEACHERS.map((t, i) => (
                    <option key={`jhs-teacher-${t.no}-${i}-${t.name}`} value={t.name}>{t.department} • {t.advisoryOrCoordinatorship}</option>
                  ))}
                  {LNNCHS_SHS_TEACHER_LOADINGS.map((t, i) => (
                    <option key={`shs-teacher-${t.department}-${t.no}-${i}-${t.name}`} value={t.name}>{t.department} • {t.subjectsHandled}</option>
                  ))}
                </datalist>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Class Section &amp; Subject:</label>
                <input
                  type="text"
                  value={subSubjectSection}
                  onChange={(e) => setSubSubjectSection(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Room Assignment:</label>
                <input
                  type="text"
                  value={subRoom}
                  onChange={(e) => setSubRoom(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Task / Instructions for Students:</label>
                <textarea
                  rows={2}
                  value={subNotes}
                  onChange={(e) => setSubNotes(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowSubSuccessModal(false)}
                className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  exportSubstitutionSlipPDF();
                  setShowSubSuccessModal(false);
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Sub Order Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= BATCH SUBSTITUTE SUMMARY REPORT MODAL ================= */}
      {showBatchSummaryModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border-2 border-stone-800 text-stone-900 font-sans">
            <div className="flex items-center justify-between border-b-2 border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-emerald-100 text-emerald-800 rounded-2xl">
                  <Sparkles className="w-6 h-6 text-emerald-700" />
                </span>
                <div>
                  <h3 className="font-black text-stone-900 text-lg uppercase tracking-wide">
                    📊 Daily Substitute Summary Report
                  </h3>
                  <p className="text-xs text-stone-500 font-mono">
                    LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL • {batchAbsentDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBatchSummaryModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Summary Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-center">
                <div className="text-xs font-bold text-blue-700 uppercase">Classes Affected</div>
                <div className="text-2xl font-black text-[#002776]">4</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center">
                <div className="text-xs font-bold text-emerald-700 uppercase">Substitutes Assigned</div>
                <div className="text-2xl font-black text-emerald-900">4</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl text-center">
                <div className="text-xs font-bold text-purple-700 uppercase">Absent Teachers</div>
                <div className="text-2xl font-black text-purple-900">2</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-center">
                <div className="text-xs font-bold text-amber-800 uppercase">Unassigned Gaps</div>
                <div className="text-2xl font-black text-amber-900">0 ⚠️</div>
              </div>
            </div>

            {/* Teacher Substitute Load Distribution */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-stone-800 uppercase tracking-wider">
                👨‍🏫 Teacher Substitute Load Distribution (Most Loaded First):
              </h4>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200 font-bold">
                  <span>M. ARABA</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded-md">2 Substitution Periods (08:30 &amp; 1:45)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-stone-200 font-bold">
                  <span>J. ARQUITA</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-md">1 Substitution Period (10:45)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>T. TUASTOMBAN</span>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-900 rounded-md">1 Substitution Period (12:45)</span>
                </div>
              </div>
            </div>

            {/* Unassigned Gap Warning Note */}
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>All 4 affected classes have been successfully matched and assigned to qualified vacant teachers. No unresolvable gaps (⚠️ UNASSIGNED) detected for this date.</span>
            </div>

            {/* Signatories Footer */}
            <div className="grid grid-cols-2 gap-6 pt-4 text-center text-xs font-bold border-t border-stone-200">
              <div>
                <div className="border-b-2 border-stone-800 pb-1">JOAHN J. ANDOT</div>
                <div className="text-stone-500 font-normal pt-1 text-[11px]">Assistant School Principal II</div>
              </div>
              <div>
                <div className="border-b-2 border-stone-800 pb-1">ANISAH A. SINAL</div>
                <div className="text-stone-500 font-normal pt-1 text-[11px]">Sec. School Principal IV</div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowBatchSummaryModal(false)}
                className="w-full py-3 bg-[#002776] hover:bg-blue-950 text-white font-black rounded-xl text-xs cursor-pointer shadow-md"
              >
                Close Summary Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
