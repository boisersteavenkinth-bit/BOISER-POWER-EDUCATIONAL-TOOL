export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet?: string;
  from?: string;
  to?: string;
  subject?: string;
  date?: string;
  isUnread?: boolean;
}

export interface GmailUserProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

export interface SendEmailPayload {
  to: string;
  subject: string;
  body: string;
  cc?: string;
  bcc?: string;
}

/**
 * Encodes text to RFC 2822 base64url format safely
 */
function createRawEmail({ to, subject, body, cc, bcc }: SendEmailPayload): string {
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const emailLines: string[] = [
    `To: ${to}`,
    `Subject: ${utf8Subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
  ];

  if (cc && cc.trim()) {
    emailLines.push(`Cc: ${cc.trim()}`);
  }
  if (bcc && bcc.trim()) {
    emailLines.push(`Bcc: ${bcc.trim()}`);
  }

  emailLines.push('');
  emailLines.push(body);

  const rawString = emailLines.join('\r\n');
  return btoa(unescape(encodeURIComponent(rawString)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function fetchUserProfile(accessToken: string): Promise<GmailUserProfile> {
  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to load Gmail profile: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export async function fetchMessagesList(
  accessToken: string,
  query: string = '',
  maxResults: number = 15
): Promise<GmailMessageSummary[]> {
  const params = new URLSearchParams({
    maxResults: maxResults.toString(),
  });
  if (query.trim()) {
    params.set('q', query.trim());
  }

  const listRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!listRes.ok) {
    const errorText = await listRes.text();
    throw new Error(`Failed to list messages: ${listRes.status} - ${errorText}`);
  }

  const listData = await listRes.json();
  const rawList: Array<{ id: string; threadId: string }> = listData.messages || [];

  if (rawList.length === 0) {
    return [];
  }

  // Fetch summaries in parallel for the first batch
  const summaries = await Promise.all(
    rawList.slice(0, 15).map(async (item) => {
      try {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${item.id}?format=metadata&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Subject&metadataHeaders=Date`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!detailRes.ok) return null;
        const detail = await detailRes.json();
        const headers: Array<{ name: string; value: string }> = detail.payload?.headers || [];

        const getHeader = (name: string) =>
          headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value || '';

        const labelIds: string[] = detail.labelIds || [];

        return {
          id: item.id,
          threadId: item.threadId,
          snippet: detail.snippet || '',
          from: getHeader('From'),
          to: getHeader('To'),
          subject: getHeader('Subject') || '(No Subject)',
          date: getHeader('Date'),
          isUnread: labelIds.includes('UNREAD'),
        } as GmailMessageSummary;
      } catch (e) {
        return null;
      }
    })
  );

  return summaries.filter((s): s is GmailMessageSummary => s !== null);
}

export async function fetchFullMessage(accessToken: string, id: string): Promise<any> {
  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to load message: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export async function sendGmailMessage(
  accessToken: string,
  payload: SendEmailPayload
): Promise<any> {
  const raw = createRawEmail(payload);

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send email: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export async function trashGmailMessage(accessToken: string, id: string): Promise<any> {
  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/trash`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to move message to trash: ${response.status} - ${errorText}`);
  }

  return response.json();
}
