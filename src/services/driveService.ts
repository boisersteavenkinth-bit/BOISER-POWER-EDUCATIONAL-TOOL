import { getAccessToken } from '../lib/googleAuth';

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  thumbnailLink?: string;
  createdTime?: string;
}

export async function searchDriveFiles(query?: string): Promise<DriveFileItem[]> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated with Google Workspace. Please sign in with Google first.');
  }

  // Build query for Google Drive v3 files.list
  let q = "trashed = false";
  if (query) {
    q += ` and (name contains '${query.replace(/'/g, "\\'")}' or fullText contains '${query.replace(/'/g, "\\'")}')`;
  } else {
    q += " and (name contains 'SSHS' or name contains 'Exemplar' or name contains 'LAS' or name contains 'Lesson' or name contains 'Activity')";
  }

  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&pageSize=50&fields=files(id,name,mimeType,webViewLink,thumbnailLink,createdTime)`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch files from Google Drive (HTTP ${response.status})`);
  }

  const data = await response.json();
  return data.files || [];
}

export async function fetchFolderFiles(folderId: string): Promise<DriveFileItem[]> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated with Google Workspace.');
  }

  const q = `'${folderId}' in parents and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&pageSize=100&fields=files(id,name,mimeType,webViewLink,thumbnailLink,createdTime)`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch folder files (HTTP ${response.status})`);
  }

  const data = await response.json();
  return data.files || [];
}

export async function fetchDriveFileContent(fileId: string, mimeType: string): Promise<string> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated with Google Workspace.');
  }

  // If Google Doc, export as text/plain or html
  let exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}`;
  let headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (mimeType === 'application/vnd.google-apps.document') {
    exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`;
  } else if (mimeType === 'application/vnd.google-apps.spreadsheet') {
    exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/csv`;
  } else {
    exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  }

  const response = await fetch(exportUrl, { headers });
  if (!response.ok) {
    throw new Error(`Failed to download file content (HTTP ${response.status})`);
  }

  return await response.text();
}
