import { getOrCreateFolder, uploadBlobToDrive, DriveFileItem } from './googleDriveService';
import { generateILAWDocxBlob } from '../utils/depedDocxExporter';
import { ILAWCompletePlan } from '../types/ilawDO3';

export const BOISER_LESSONS_FOLDER_NAME = 'Boiser-Generated-Lessons';

export interface ILAWDriveSyncResult {
  success: boolean;
  folderId?: string;
  file?: DriveFileItem;
  error?: string;
}

/**
 * Pushes an ILAW Plan .docx file into the 'Boiser-Generated-Lessons' folder in Google Drive.
 */
export async function pushILAWDocxToGoogleDrive(
  plan: ILAWCompletePlan
): Promise<ILAWDriveSyncResult> {
  try {
    // 1. Get or create the designated 'Boiser-Generated-Lessons' folder
    const folderId = await getOrCreateFolder(BOISER_LESSONS_FOLDER_NAME);

    // 2. Generate the docx binary blob
    const { blob, fileName } = await generateILAWDocxBlob(plan);

    // 3. Upload to Google Drive
    const uploadedFile = await uploadBlobToDrive({
      fileName,
      blob,
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      folderId,
      description: `DepEd DO 3, s. 2026 ILAW Lesson Plan: ${plan.header.lesson} (${plan.header.learningArea}, Term ${plan.header.term}) by ${plan.header.teacher}`,
    });

    return {
      success: true,
      folderId,
      file: uploadedFile,
    };
  } catch (err: any) {
    console.error('Failed to sync ILAW .docx to Google Drive:', err);
    return {
      success: false,
      error: err?.message || 'Unknown error occurred while syncing to Google Drive',
    };
  }
}
