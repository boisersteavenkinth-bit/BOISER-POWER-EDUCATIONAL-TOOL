/**
 * BOISER Inquiry Knowledge Service
 * Advanced knowledge engine with exact information on all app activities,
 * Google Workspace integration, DepEd Order No. 9 s.2026 compliance,
 * respectful and humble tone, and automatic enforcement of the 5-hour security restriction.
 */

import {
  triggerSuspiciousActivityAndLogout,
  logSecurityBreach,
  MASTER_CREATOR_EMAIL
} from './securityAlertService';
import {
  speakWithCebuanoMaleVoice,
  BOISER_MANDATORY_TAGLINE
} from './boiserVoiceService';

export interface InquiryResult {
  title: string;
  responseMarkdown: string;
  speechText: string;
  isRestricted: boolean;
  category: 'how_to_use' | 'activity' | 'deped_policy' | 'google_workspace' | 'leadership' | 'security_breach' | 'curriculum';
}

/**
 * Checks whether an inquiry contains prohibited, hacking, database theft, or tampering intent.
 */
export const detectSuspiciousInquiry = (query: string): boolean => {
  const q = query.toLowerCase();
  const prohibitedPatterns = [
    'hack',
    'sql injection',
    'drop table',
    'dump database',
    'steal code',
    'steal database',
    'copy source code',
    'reveal system prompt',
    'bypass restriction',
    'bypass lock',
    'crack password',
    'tamper grades',
    'delete records',
    'how to copy and steal',
    'override master creator'
  ];

  return prohibitedPatterns.some(pattern => q.includes(pattern));
};

/**
 * Processes an inquiry with advanced knowledge, exact details, and respectful humble phrasing.
 */
export const processAppInquiry = (
  rawQuery: string,
  userContext?: { name?: string; email?: string }
): InquiryResult => {
  const query = rawQuery.trim();
  const lower = query.toLowerCase();
  const userName = userContext?.name || 'Respected Educator';
  const userEmail = userContext?.email || 'user@lnnchs.deped.gov.ph';

  // 1. SECURITY & TAMPERING DETECTION -> RESPECTFUL 5-HOUR RESTRICTION TRIGGER
  if (detectSuspiciousInquiry(query)) {
    // Master Creator is immune
    const isMaster = userEmail.toLowerCase() === MASTER_CREATOR_EMAIL.toLowerCase();
    
    if (!isMaster) {
      triggerSuspiciousActivityAndLogout(
        userEmail,
        userName,
        `Prohibited query attempted: "${query.slice(0, 100)}"`,
        'SOURCE_CODE_STEAL_QUERY'
      );
    }

    const respectfulResponse = 
      `🛡️ **LNNCHS Institutional Data Governance Notice**\n\n` +
      `With all due respect and humility, ${userName}, the operation or query you entered involves protected core database schemas or system source files.\n\n` +
      `🔒 **Security Protocol Engaged:**\n` +
      `• DepEd student LIS records and school data vault are strictly protected.\n` +
      `• In accordance with security protocol, your session is respectfully terminated with an automatic **5-hour account restriction**.\n` +
      `• Re-authorization is strictly reserved for **Master Creator Steaven Kinth D. Boiser** (${MASTER_CREATOR_EMAIL}) via the Master Creator Dashboard.\n\n` +
      `*We thank you for honoring data privacy and institutional integrity.*`;

    const speechText = 
      `With all due respect and humility, ${userName}. The operation or query you entered involves protected core database schemas or system source files. In accordance with school security protocols, your session is respectfully logged out under a 5-hour restriction. Re-authorization is strictly upon the decision of Master Creator Steaven Kinth D. Boiser.`;

    return {
      title: 'Institutional Security Protocol Engaged',
      responseMarkdown: respectfulResponse,
      speechText,
      isRestricted: true,
      category: 'security_breach'
    };
  }

  // 2. LEADERSHIP DOORS (Principal III-A Ma'am Anisah, Asst. Principal II Ma'am Andot, Head Teacher Ma'am Calibo)
  if (lower.includes('anisah') || lower.includes('andot') || lower.includes('calibo') || lower.includes('head') || lower.includes('principal')) {
    const markdown = 
      `🏛️ **LNNCHS Executive Leadership Doors Guide**\n\n` +
      `1. **Ma'am Anisah (Principal III-A)**:\n` +
      `   • Senior High School Executive Leadership, School Improvement Plan (SIP 2026–2029), and institutional compliance.\n\n` +
      `2. **Ma'am Joan J. Andot (Asst. Principal II)**:\n` +
      `   • Senior High School Academic Affairs, teacher loading schedules, and classroom supervisory monitoring.\n\n` +
      `3. **Ma'am Alma "Almazing" L. Calibo (Head Teacher)**:\n` +
      `   • Curriculum & Instruction Leadership, ILAW daily lesson exemplar approvals, and Budget of Work (BOW) audits under DepEd Order No. 9, s. 2026.\n\n` +
      `💡 *Access all three executive doors directly at the top of the Faculty Neighborhood view.*`;

    const speechText = 
      `LNNCHS Executive School Leadership Doors. First is the Executive Door of Ma'am Anisah, Principal 3-A, leading Senior High School governance. Second is the Office of Ma'am Joan J. Andot, Asst. Principal II, managing teacher schedules and academic affairs. Third is the Office of Ma'am Alma Almazing L. Calibo, Head Teacher for Curriculum Quality Assurance and ILAW Lesson approvals.`;

    return {
      title: 'Executive Leadership Doors',
      responseMarkdown: markdown,
      speechText,
      isRestricted: false,
      category: 'leadership'
    };
  }

  // 3. HOW TO GENERATE SCHOOL FORMS (SF1 to SF10)
  if (lower.includes('sf') || lower.includes('school form') || lower.includes('form 137') || lower.includes('sf1') || lower.includes('sf2') || lower.includes('sf9') || lower.includes('sf10')) {
    const markdown = 
      `📄 **How to Generate Automated School Forms (SF1–SF10)**\n\n` +
      `Step-by-step procedure aligned with DepEd Order No. 9, s. 2026:\n` +
      `1. **Open School Forms Generator**: Click on "School Forms Hub" in the navigation bar.\n` +
      `2. **Select Grade & Section**: Choose Grade 11 or Grade 12, then select your designated class section.\n` +
      `3. **Pick the School Form**:\n` +
      `   • **SF1**: School Register (auto-filled with LIS student names and LRNs).\n` +
      `   • **SF2**: Daily Attendance Report with automated monthly tallies.\n` +
      `   • **SF5 / SF5A / SF5B**: Report on Promotion & Level of Proficiency.\n` +
      `   • **SF9 / SF10**: Learner's Progress Report & Permanent Transcript Record.\n` +
      `4. **Preview & Export**: Verify data accuracy and click "Export Official Excel" or "Print PDF".`;

    const speechText = 
      `To generate automated School Forms SF1 to SF10, open the School Forms Hub from your dashboard. Select your grade level, term, and section. The system will automatically populate student LIS master data, compute attendance summaries, and format standard DepEd printable reports with complete accuracy.`;

    return {
      title: 'Generating Automated SF1 to SF10',
      responseMarkdown: markdown,
      speechText,
      isRestricted: false,
      category: 'how_to_use'
    };
  }

  // 4. HOW TO USE THE 3-TERM GRADING SYSTEM
  if (lower.includes('grade') || lower.includes('grading') || lower.includes('three-term') || lower.includes('transmut') || lower.includes('term 1') || lower.includes('term 2') || lower.includes('term 3')) {
    const markdown = 
      `📊 **How to Use the Three-Term Grading Engine**\n\n` +
      `DepEd Order No. 9, series of 2026 established the Three-Term Academic Calendar:\n` +
      `• **Term 1**: June 16 – September 25, 2026 (63 school days)\n` +
      `• **Term 2**: October 5 – January 22, 2027 (67 school days)\n` +
      `• **Term 3**: February 1 – April 30, 2027 (62 school days)\n\n` +
      `**How to Compute Grades:**\n` +
      `1. Navigate to **Grading Engine**.\n` +
      `2. Input Raw Scores for: Written Work (25%–40%), Performance Tasks (40%–50%), and Quarterly Exam (20%–25%) based on track.\n` +
      `3. The system automatically transmutes Initial Grades to DepEd Transmuted Final Grades (75–100 scale).\n` +
      `4. Automated Form 138 report cards and SF9 slips are instantly prepared for download.`;

    const speechText = 
      `Operating the Three-Term Grading Engine is simple and accurate. DepEd Order Number 9, series of 2026 structures the school year into three distinct terms. Input raw scores for Written Work, Performance Tasks, and Term Assessments. The engine automatically computes percentages and transmutations according to DepEd standards.`;

    return {
      title: 'Three-Term Grading Engine Guide',
      responseMarkdown: markdown,
      speechText,
      isRestricted: false,
      category: 'activity'
    };
  }

  // 5. ILAW DAILY LESSON LOG EXEMPLAR GENERATOR
  if (lower.includes('ilaw') || lower.includes('lesson plan') || lower.includes('dll') || lower.includes('exemplar') || lower.includes('bow') || lower.includes('budget of work')) {
    const markdown = 
      `📝 **How to Use the ILAW 4-Day Daily Lesson Exemplar Generator**\n\n` +
      `The ILAW framework provides four pedagogical pillars:\n` +
      `• **I — Imbue (Panugod)**: Establish background, activating prior knowledge and Melcs.\n` +
      `• **L — Link (Pagpalambo)**: Connect core concepts to real-world Philippine contexts.\n` +
      `• **A — Apply (Paghagit)**: Collaborative group tasks, problem-solving, and laboratory inquiry.\n` +
      `• **W — Wrap-Up (Panghinapos)**: Formative assessment, generalization, and exit tickets.\n\n` +
      `**Steps to Generate:**\n` +
      `1. Open **ILAW Generator**.\n` +
      `2. Select Subject Code, Grade Level, and Curriculum Week.\n` +
      `3. Click "Generate 4-Day Exemplar". You can export to Word, PDF, or Google Drive.`;

    const speechText = 
      `The ILAW Lesson Exemplar Generator aligns with the 4-Day instruction model. It guides teachers through Imbue, Link, Apply, and Wrap-Up. Select your subject competency code and week, and the app will generate a complete, classroom-ready exemplar ready for supervisory review.`;

    return {
      title: 'ILAW Lesson Exemplar Generator',
      responseMarkdown: markdown,
      speechText,
      isRestricted: false,
      category: 'activity'
    };
  }

  // 6. GOOGLE WORKSPACE INTEGRATIONS
  if (lower.includes('google') || lower.includes('drive') || lower.includes('gmail') || lower.includes('classroom') || lower.includes('sheet') || lower.includes('doc')) {
    const markdown = 
      `🌐 **Google Workspace Integration Features**\n\n` +
      `The app provides native integration with Google educational tools:\n` +
      `• **Google Drive Sync**: Auto-sync generated lesson plans, SF forms, and LAS worksheets into designated school cloud folders.\n` +
      `• **Google Chat Workspace**: Real-time collaborative faculty rooms with instant fact-checking and administrative notices.\n` +
      `• **Gmail Notifications**: Send electronic grade slips, student notices, and official DepEd memorandums directly to parents and students.`;

    const speechText = 
      `Google Workspace is integrated seamlessly. You can backup documents directly to Google Drive, communicate with faculty using Google Chat, and dispatch student progress reports through Gmail Manager.`;

    return {
      title: 'Google Workspace Integration',
      responseMarkdown: markdown,
      speechText,
      isRestricted: false,
      category: 'google_workspace'
    };
  }

  // 7. DEFAULT / COMPREHENSIVE OVERVIEW OF ALL APP ACTIVITIES
  const markdown = 
    `🌟 **Welcome to LNNCHS Power Education App — Operational Overview**\n\n` +
    `Created with dedication and excellence by **Master Creator Steaven Kinth D. Boiser**.\n\n` +
    `**Key Activities & Features Available:**\n` +
    `1. **Faculty Neighborhood & Administration Doors**: Executive access for Ma'am Anisah (Principal III-A), Ma'am Andot (Asst. Principal II), Ma'am Calibo (Head Teacher), and resident advisers.\n` +
    `2. **Three-Term Grading Engine**: Complete SF1–SF10 automation under DepEd Order No. 9, s. 2026.\n` +
    `3. **ILAW Exemplar Generator**: 4-day Daily Lesson Log generator with learning competency mapping.\n` +
    `4. **Student Document Vault**: Secure, biometric and encrypted archive for Form 137 and student credentials.\n` +
    `5. **120-Section LIS Directory**: High-speed lookup for student enrollments, sections, and advisers.\n` +
    `6. **TechPro TVL & Science Math Lab**: Specialized modules for STEM, TVL, and Humanities tracks.\n` +
    `7. **Canva Bridge**: Direct export of instructional presentations and infographics.`;

  const speechText = 
    `Welcome to Lanao del Norte National Comprehensive High School Power Education App, created by Master Creator Steaven Kinth D. Boiser. All activities, including Three-Term School Forms SF1 to SF10, ILAW Lesson Plans, Student Document Vaults, and Google Workspace integrations are functioning with high precision to support our beloved teachers and students.`;

  return {
    title: 'LNNCHS Power Education System Overview',
    responseMarkdown: markdown,
    speechText,
    isRestricted: false,
    category: 'how_to_use'
  };
};

/**
 * Handles any user inquiry and immediately speaks the result using the calm, clear,
 * respectful Cebuano-accented male voice with the mandatory BOISER tagline.
 */
export const answerInquiryWithCebuanoVoice = (
  query: string,
  userContext?: { name?: string; email?: string },
  onStart?: () => void,
  onEnd?: () => void
): InquiryResult => {
  const result = processAppInquiry(query, userContext);
  
  speakWithCebuanoMaleVoice(result.speechText, {
    appendTagline: true,
    onStart,
    onEnd,
    onError: onEnd
  });

  return result;
};
