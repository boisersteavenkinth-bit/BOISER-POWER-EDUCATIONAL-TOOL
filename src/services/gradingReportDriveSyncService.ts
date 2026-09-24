import { getOrCreateFolder, uploadBlobToDrive, DriveFileItem } from './googleDriveService';
import { BatchGradingExportConfig, generateBatchGradingPdfBlob, BatchStudentGradeEntry } from '../utils/batchGradingPdfExporter';

export const BOISER_GRADING_REPORTS_FOLDER_NAME = 'Boiser-Grading-Reports';

export interface GradingReportDriveSyncResult {
  success: boolean;
  folderId?: string;
  file?: DriveFileItem;
  error?: string;
}

/**
 * Pushes a batch grading PDF report directly into the 'Boiser-Grading-Reports' folder in Google Drive.
 */
export async function pushGradingPdfToGoogleDrive(
  config: BatchGradingExportConfig
): Promise<GradingReportDriveSyncResult> {
  try {
    // 1. Get or create designated Google Drive folder
    const folderId = await getOrCreateFolder(BOISER_GRADING_REPORTS_FOLDER_NAME);

    // 2. Generate PDF Binary Blob
    const { blob, fileName } = generateBatchGradingPdfBlob(config);

    // 3. Upload to Google Drive
    const uploadedFile = await uploadBlobToDrive({
      fileName,
      blob,
      mimeType: 'application/pdf',
      folderId,
      description: `LNNCHS Official Student Grading Report PDF: ${config.title} (${config.subject}, ${config.section}) - ${config.students.length} Learners`,
    });

    return {
      success: true,
      folderId,
      file: uploadedFile,
    };
  } catch (err: any) {
    console.error('Failed to sync student grading PDF report to Google Drive:', err);
    return {
      success: false,
      error: err?.message || 'Unknown error occurred while syncing student grading report to Google Drive',
    };
  }
}

/**
 * Pushes a single student's individual result slip PDF directly into Google Drive.
 */
export async function pushSingleStudentPdfToGoogleDrive(
  student: BatchStudentGradeEntry,
  config: Partial<BatchGradingExportConfig> = {}
): Promise<GradingReportDriveSyncResult> {
  const mergedConfig: BatchGradingExportConfig = {
    title: 'Diagnostic Student Assessment Result',
    subject: 'Life and Career Skills',
    gradeLevel: 'Grade 11',
    section: student.section || 'Einstein',
    schoolName: 'Lanao del Norte National Comprehensive High School',
    schoolId: '304005',
    district: 'Baroy District',
    division: 'Division of Lanao del Norte',
    region: 'Region X - Northern Mindanao',
    schoolYear: '2026-2027',
    teacherName: 'Steaven Kinth D. Boiser, T-III',
    dateEvaluated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    ...config,
    students: [student]
  };

  return pushGradingPdfToGoogleDrive(mergedConfig);
}
