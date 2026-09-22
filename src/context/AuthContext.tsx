import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'owner' | 'user';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  school?: string;
  division?: string;
  avatarUrl?: string;
}

export interface ActivityLogItem {
  id: string;
  userEmail: string;
  userName: string;
  role: UserRole;
  feature: string;
  action: string;
  details?: string;
  timestamp: string;
  isSuspicious?: boolean;
}

export interface SecurityAlert {
  id: string;
  type: 'rapid_requests' | 'bulk_extraction' | 'code_scraping' | 'unauthorized_logo_change';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  sourceIpOrUser: string;
}

interface AuthContextType {
  currentUser: UserAccount;
  isOwner: boolean;
  activityLogs: ActivityLogItem[];
  securityAlerts: SecurityAlert[];
  logActivity: (feature: string, action: string, details?: string) => void;
  switchRole: (role: UserRole) => void;
  updateOwnerLogo: (logoUrl: string) => boolean;
  activeLogoUrl: string;
  dismissAlert: (alertId: string) => void;
  clearOldLogs: () => void;
  checkForUpdates: () => Promise<UpdateSuggestion[]>;
  updateSuggestions: UpdateSuggestion[];
  approveUpdate: (updateId: string) => void;
  dismissUpdate: (updateId: string) => void;
}

export interface UpdateSuggestion {
  id: string;
  title: string;
  source: string; // e.g., "DepEd Memorandum No. 021, s. 2026"
  category: 'calendar' | 'bow' | 'assessment' | 'rubric';
  summary: string;
  recommendedAction: string;
  status: 'pending' | 'approved' | 'dismissed';
  dateDetected: string;
}

const DEFAULT_OWNER: UserAccount = {
  id: 'owner-steaven-boiser',
  name: 'Steaven Kinth D. Boiser',
  email: 'boisersteavenkinth@gmail.com',
  role: 'owner',
  school: 'Lanao del Norte National Comprehensive High School (LNNCHS)',
  division: 'Division of Lanao del Norte, Region X'
};

const DEFAULT_TEACHER: UserAccount = {
  id: 'user-deped-teacher',
  name: 'DepEd SHS Faculty Member',
  email: 'teacher.rox@deped.gov.ph',
  role: 'user',
  school: 'LNNCHS / DepEd Region X',
  division: 'Division of Lanao del Norte'
};

const INITIAL_SUGGESTIONS: UpdateSuggestion[] = [
  {
    id: 'upd-1',
    title: 'DepEd Memorandum No. 018, s. 2026: Regional TechPro Work Immersion Rubrics',
    source: 'DepEd ROX Curriculum & Learning Management Division (CLMD)',
    category: 'rubric',
    summary: 'Updates standard evaluation matrices for Grade 12 TechPro workplace simulations and practicum logs.',
    recommendedAction: 'Incorporate 5-point competency rubric into TechPro BOW viewer and ILAW Generator.',
    status: 'pending',
    dateDetected: '2026-09-20'
  },
  {
    id: 'upd-2',
    title: 'DO 015, s. 2026 Addendum: Trimester SF9 Transmutation Scale Verification',
    source: 'DepEd Central Office — Office of the Undersecretary for Curriculum and Instruction',
    category: 'assessment',
    summary: 'Formal validation of passing floor (75) to transmuted raw score conversion for Grade 11 Core Subjects.',
    recommendedAction: 'Verify Three-Term SF9 auto-calculation engine matches the 2026 addendum tables.',
    status: 'pending',
    dateDetected: '2026-09-15'
  },
  {
    id: 'upd-3',
    title: 'Strengthened SHS Electives: Advanced Digital Media & Agricultural Systems',
    source: 'DepEd Bureau of Curriculum Development',
    category: 'bow',
    summary: 'Draft syllabus competencies for Term 3 vocational specializations under the 2026 curriculum.',
    recommendedAction: 'Pre-load draft competency records into the Competency Database for optional preview.',
    status: 'pending',
    dateDetected: '2026-09-10'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('boiser_auth_current_user_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Auth state load error', e);
    }
    return DEFAULT_OWNER; // Default to app creator Steaven Kinth D. Boiser
  });

  const [activeLogoUrl, setActiveLogoUrl] = useState<string>(() => {
    try {
      const savedLogo = localStorage.getItem('boiser_app_custom_logo_v1');
      if (savedLogo) return savedLogo;
    } catch (e) {
      console.warn('Logo load error', e);
    }
    return '/boiser-logo.png';
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('boiser_activity_logs_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Logs load error', e);
    }
    return [
      {
        id: 'log-init-1',
        userEmail: 'boisersteavenkinth@gmail.com',
        userName: 'Steaven Kinth D. Boiser',
        role: 'owner',
        feature: 'Authentication',
        action: 'Owner Sign-in',
        details: 'Admin session initiated with owner credential access.',
        timestamp: new Date().toISOString()
      },
      {
        id: 'log-init-2',
        userEmail: 'teacher.rox@deped.gov.ph',
        userName: 'SHS Teacher Account',
        role: 'user',
        feature: 'ILAW Generator',
        action: 'Plan Generation (Grade 11)',
        details: 'Mabisang Komunikasyon (Term 1, Week 1) generated.',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      }
    ];
  });

  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>(() => {
    try {
      const saved = localStorage.getItem('boiser_security_alerts_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Alerts load error', e);
    }
    return [];
  });

  const [updateSuggestions, setUpdateSuggestions] = useState<UpdateSuggestion[]>(() => {
    try {
      const saved = localStorage.getItem('boiser_update_suggestions_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Update suggestions load error', e);
    }
    return INITIAL_SUGGESTIONS;
  });

  // Recent request tracker for suspicious rapid-fire rate limiting detection
  const [requestTimestamps, setRequestTimestamps] = useState<number[]>([]);

  const isOwner = currentUser.role === 'owner' && currentUser.email === 'boisersteavenkinth@gmail.com';

  const logActivity = (feature: string, action: string, details?: string) => {
    const now = Date.now();
    const iso = new Date(now).toISOString();

    // Check rate limit: if > 12 actions within 30 seconds, flag as suspicious
    const recent = [...requestTimestamps, now].filter(t => now - t < 30000);
    setRequestTimestamps(recent);

    const isSuspicious = recent.length > 12;

    if (isSuspicious) {
      const newAlert: SecurityAlert = {
        id: `alert-${now}`,
        type: 'rapid_requests',
        severity: 'high',
        message: `High frequency activity detected: ${recent.length} requests in under 30 seconds from ${currentUser.email}. Possible automated scraping or rapid batch trigger.`,
        timestamp: iso,
        sourceIpOrUser: currentUser.email
      };
      setSecurityAlerts(prev => [newAlert, ...prev.slice(0, 19)]);
      try {
        localStorage.setItem('boiser_security_alerts_v1', JSON.stringify([newAlert, ...securityAlerts]));
      } catch (e) {
        console.warn('Alerts save error', e);
      }
    }

    const newItem: ActivityLogItem = {
      id: `log-${now}-${Math.random().toString(36).substring(2, 6)}`,
      userEmail: currentUser.email,
      userName: currentUser.name,
      role: currentUser.role,
      feature,
      action,
      details,
      timestamp: iso,
      isSuspicious
    };

    setActivityLogs(prev => {
      const updated = [newItem, ...prev.slice(0, 99)]; // Keep latest 100
      try {
        localStorage.setItem('boiser_activity_logs_v1', JSON.stringify(updated));
      } catch (e) {
        console.warn('Logs save error', e);
      }
      return updated;
    });
  };

  const switchRole = (role: UserRole) => {
    const nextUser = role === 'owner' ? DEFAULT_OWNER : DEFAULT_TEACHER;
    setCurrentUser(nextUser);
    try {
      localStorage.setItem('boiser_auth_current_user_v1', JSON.stringify(nextUser));
    } catch (e) {
      console.warn('Auth save error', e);
    }
    logActivity('Authentication', `Switched Account Role to ${role.toUpperCase()}`, `Active user: ${nextUser.name} (${nextUser.email})`);
  };

  const updateOwnerLogo = (logoUrl: string): boolean => {
    if (!isOwner) {
      // Security enforcement: regular users cannot alter branding
      const newAlert: SecurityAlert = {
        id: `alert-${Date.now()}`,
        type: 'unauthorized_logo_change',
        severity: 'high',
        message: `Unauthorized attempt to alter app branding/logo by non-owner account: ${currentUser.email}`,
        timestamp: new Date().toISOString(),
        sourceIpOrUser: currentUser.email
      };
      setSecurityAlerts(prev => [newAlert, ...prev]);
      logActivity('Security', 'Blocked Logo Modification Attempt', `User ${currentUser.email} attempted to change logo without Owner authority.`);
      return false;
    }

    setActiveLogoUrl(logoUrl);
    try {
      localStorage.setItem('boiser_app_custom_logo_v1', logoUrl);
    } catch (e) {
      console.warn('Logo save error', e);
    }
    logActivity('Branding & Logo', 'Updated Official Logo Asset', 'Owner Steaven Kinth D. Boiser updated official mascot logo.');
    return true;
  };

  const dismissAlert = (alertId: string) => {
    setSecurityAlerts(prev => {
      const updated = prev.filter(a => a.id !== alertId);
      try {
        localStorage.setItem('boiser_security_alerts_v1', JSON.stringify(updated));
      } catch (e) {
        console.warn('Alerts save error', e);
      }
      return updated;
    });
  };

  const clearOldLogs = () => {
    setActivityLogs(prev => prev.slice(0, 10));
    try {
      localStorage.setItem('boiser_activity_logs_v1', JSON.stringify(activityLogs.slice(0, 10)));
    } catch (e) {
      console.warn('Clear logs error', e);
    }
    logActivity('Admin Management', 'Cleared Historical Activity Logs', 'Retained 10 most recent verified logs.');
  };

  const checkForUpdates = async (): Promise<UpdateSuggestion[]> => {
    logActivity('System Updates', 'Manual Check for Educational Tool Updates', 'Scanning DepEd official repository issuances & policy changes.');
    // Simulated live check
    await new Promise(r => setTimeout(r, 600));
    return updateSuggestions;
  };

  const approveUpdate = (updateId: string) => {
    setUpdateSuggestions(prev => {
      const updated = prev.map(u => (u.id === updateId ? { ...u, status: 'approved' as const } : u));
      try {
        localStorage.setItem('boiser_update_suggestions_v1', JSON.stringify(updated));
      } catch (e) {
        console.warn('Update save error', e);
      }
      return updated;
    });
    logActivity('System Updates', 'Approved Educational Tool Update', `Update ID ${updateId} approved by Owner.`);
  };

  const dismissUpdate = (updateId: string) => {
    setUpdateSuggestions(prev => {
      const updated = prev.map(u => (u.id === updateId ? { ...u, status: 'dismissed' as const } : u));
      try {
        localStorage.setItem('boiser_update_suggestions_v1', JSON.stringify(updated));
      } catch (e) {
        console.warn('Update save error', e);
      }
      return updated;
    });
    logActivity('System Updates', 'Dismissed Educational Tool Update', `Update ID ${updateId} dismissed.`);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isOwner,
        activityLogs,
        securityAlerts,
        logActivity,
        switchRole,
        updateOwnerLogo,
        activeLogoUrl,
        dismissAlert,
        clearOldLogs,
        checkForUpdates,
        updateSuggestions,
        approveUpdate,
        dismissUpdate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
