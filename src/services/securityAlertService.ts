export interface SecurityBreachRecord {
  id: string;
  intruderName: string;
  intruderEmail: string;
  attemptedAction: string;
  violationType: 'UNAUTHORIZED_COPY_ATTEMPT' | 'DATABASE_INSPECTION_ATTEMPT' | 'MASTER_DOOR_BREACH' | 'SOURCE_CODE_STEAL_QUERY' | 'SUSPICIOUS_SYSTEM_TAMPER';
  timestamp: string;
  ipOrDevice: string;
  queryOrTarget: string;
  status: 'FLAGGED' | 'BLOCKED' | 'REVOKED';
}

export interface UserLockoutRecord {
  id: string;
  email: string;
  name: string;
  reason: string;
  lockedAt: number;
  lockDurationMs: number; // 5 hours = 18,000,000 ms
  isUnlockedByMaster: boolean;
  unlockedAt?: number;
}

const STORAGE_KEY = 'lnnchs_security_breaches_v1';
const LOCKOUT_KEY = 'lnnchs_user_lockouts_v1';
export const MASTER_CREATOR_EMAIL = 'boisersteavenkinth@gmail.com';
export const FIVE_HOURS_MS = 5 * 60 * 60 * 1000; // 5 hours

export const getSecurityBreaches = (): SecurityBreachRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [
        {
          id: 'breach-101',
          intruderName: 'Unknown Visitor (Guest IP: 192.168.1.45)',
          intruderEmail: 'unauthorized_guest@external.node',
          attemptedAction: 'Attempted to query database schemas & copy source code in Chatbot',
          violationType: 'SOURCE_CODE_STEAL_QUERY',
          timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ipOrDevice: 'External Web Node / Chrome Mobile',
          queryOrTarget: 'Query: "How to copy and steal Boiser App database and code?"',
          status: 'BLOCKED'
        }
      ];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse security breaches', err);
    return [];
  }
};

export const logSecurityBreach = (
  name: string,
  email: string,
  action: string,
  type: SecurityBreachRecord['violationType'],
  query: string
): SecurityBreachRecord => {
  const current = getSecurityBreaches();
  const newBreach: SecurityBreachRecord = {
    id: `breach-${Date.now()}`,
    intruderName: name || 'Unauthorized User',
    intruderEmail: email || 'anonymous@guest.node',
    attemptedAction: action,
    violationType: type,
    timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    ipOrDevice: 'Node Secure IP ' + (Math.floor(Math.random() * 200) + 10) + '.' + (Math.floor(Math.random() * 200) + 10),
    queryOrTarget: query,
    status: 'BLOCKED'
  };

  const updated = [newBreach, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving breach', e);
  }

  // Dispatch custom window event so alert banners light up
  window.dispatchEvent(new CustomEvent('boiser_security_breach', { detail: newBreach }));
  return newBreach;
};

export const clearSecurityBreaches = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('boiser_security_breach_cleared'));
  } catch (err) {
    console.error('Failed to clear breaches', err);
  }
};

// ==================== 5-HOUR USER LOCKOUT ENGINE ====================

export const getLockedOutUsers = (): UserLockoutRecord[] => {
  try {
    const raw = localStorage.getItem(LOCKOUT_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load user lockouts', e);
    return [];
  }
};

export const saveLockedOutUsers = (list: UserLockoutRecord[]): void => {
  try {
    localStorage.setItem(LOCKOUT_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save user lockouts', e);
  }
};

/**
 * Checks if a given email is restricted.
 * MASTER CREATOR IS NEVER RESTRICTED UNDER ANY CIRCUMSTANCE.
 * For other users, only the Master Creator's decision button can unlock them (even if 2 minutes or 5 hours have passed).
 */
export const isUserCurrentlyLockedOut = (email: string): { isLocked: boolean; reason?: string; lockedAt?: number; remainingMs?: number } => {
  if (!email) return { isLocked: false };
  const normalized = email.trim().toLowerCase();
  
  // Master Creator is completely immune to any lockout or restriction
  if (normalized === MASTER_CREATOR_EMAIL.toLowerCase()) {
    return { isLocked: false };
  }

  const lockouts = getLockedOutUsers();
  const record = lockouts.find(r => r.email.toLowerCase() === normalized && !r.isUnlockedByMaster);
  
  if (!record) {
    return { isLocked: false };
  }

  const elapsed = Date.now() - record.lockedAt;
  const remainingMs = Math.max(0, record.lockDurationMs - elapsed);

  return {
    isLocked: true,
    reason: record.reason,
    lockedAt: record.lockedAt,
    remainingMs
  };
};

/**
 * Initiates an automatic logout and 5-hour restriction for suspicious / illegal activity.
 * Respectfully logs the user out.
 */
export const triggerSuspiciousActivityAndLogout = (
  email: string,
  name: string,
  attemptedAction: string,
  violationType: SecurityBreachRecord['violationType'] = 'SUSPICIOUS_SYSTEM_TAMPER'
): boolean => {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();

  // NEVER restrict the Master Creator
  if (normalized === MASTER_CREATOR_EMAIL.toLowerCase()) {
    return false;
  }

  // Log the breach
  logSecurityBreach(name, email, attemptedAction, violationType, attemptedAction);

  // Set the 5-hour lockout record
  const lockouts = getLockedOutUsers().filter(u => u.email.toLowerCase() !== normalized);
  const newLockout: UserLockoutRecord = {
    id: `lockout-${Date.now()}`,
    email: normalized,
    name: name || 'DepEd User',
    reason: `Automated 5-Hour Lockout: Suspicious activity intercepted (${attemptedAction}).`,
    lockedAt: Date.now(),
    lockDurationMs: FIVE_HOURS_MS,
    isUnlockedByMaster: false
  };

  saveLockedOutUsers([newLockout, ...lockouts]);

  // Dispatch event so UI can show respectful message and log out
  window.dispatchEvent(
    new CustomEvent('boiser_user_locked_out_respectfully', {
      detail: {
        email: normalized,
        name,
        reason: newLockout.reason,
        lockDurationMs: FIVE_HOURS_MS
      }
    })
  );

  return true;
};

/**
 * ONLY Master Creator can unlock a restricted user.
 */
export const unlockUserByMaster = (email: string): boolean => {
  const normalized = email.trim().toLowerCase();
  const lockouts = getLockedOutUsers();
  const updated = lockouts.map(r => {
    if (r.email.toLowerCase() === normalized) {
      return { ...r, isUnlockedByMaster: true, unlockedAt: Date.now() };
    }
    return r;
  });

  saveLockedOutUsers(updated);
  window.dispatchEvent(new CustomEvent('boiser_user_unlocked_by_master', { detail: { email: normalized } }));
  return true;
};
