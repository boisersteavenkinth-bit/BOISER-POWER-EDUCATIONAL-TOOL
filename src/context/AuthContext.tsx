import React, { createContext, useContext, useState, useEffect } from 'react';
import { isUserCurrentlyLockedOut } from '../services/securityAlertService';

export type UserRole = 'owner' | 'user';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string; // Stored locally for offline verification
  role: UserRole;
  school?: string;
  division?: string;
  avatarUrl?: string;
  isActivated?: boolean;
  isBlocked?: boolean;
  loginAttempts?: number;
  biometricId?: string; // For WebAuthn
  requestHelp?: boolean;
  helpMessage?: string;
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

export interface SubstitutionPlan {
  id: string;
  subject: string;
  section: string;
  substituteTeacherEmail: string;
  assignedByEmail: string;
  assignedByName: string;
  date: string;
  startTime: string;
  content: string;
  status: 'active' | 'completed' | 'cancelled';
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  senderEmail: string;
  senderName: string;
  message: string;
  timestamp: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'alarm';
  timestamp: string;
  read: boolean;
}

interface AuthContextType {
  currentUser: UserAccount;
  isOwner: boolean;
  isAuthenticated: boolean;
  activityLogs: ActivityLogItem[];
  securityAlerts: SecurityAlert[];
  logActivity: (feature: string, action: string, details?: string) => void;
  switchRole: (role: UserRole) => void;
  loginTeacherAccount: (credentials: { email: string; password?: string }) => { success: boolean; message: string };
  registerTeacherAccount: (teacher: { name: string; email: string; password?: string; school?: string; division?: string; gradeLevel?: string; subject?: string }) => { success: boolean; message: string };
  logoutUser: () => void;
  updateOwnerLogo: (logoUrl: string) => boolean;
  activeLogoUrl: string;
  dismissAlert: (alertId: string) => void;
  clearOldLogs: () => void;
  checkForUpdates: () => Promise<UpdateSuggestion[]>;
  updateSuggestions: UpdateSuggestion[];
  approveUpdate: (updateId: string) => void;
  dismissUpdate: (updateId: string) => void;
  userRegistry: UserAccount[];
  requestAccountHelp: (email: string, message: string) => { success: boolean; message: string };
  solveUserProblem: (email: string) => void;
  unblockUser: (email: string) => void;
  biometricRegister: (email: string) => Promise<{ success: boolean; message: string }>;
  biometricLogin: (email: string) => Promise<{ success: boolean; message: string }>;
  substitutionPlans: SubstitutionPlan[];
  addSubstitutionPlan: (plan: Omit<SubstitutionPlan, 'id' | 'timestamp' | 'status' | 'assignedByEmail' | 'assignedByName'>) => void;
  removeSubstitutionPlan: (id: string) => void;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (message: string) => void;
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
    return DEFAULT_TEACHER; // Default to guest teacher
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('boiser_is_authenticated_v1') === 'true';
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

  const [userRegistry, setUserRegistry] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('boiser_user_registry_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('User registry load error', e);
    }
    return [];
  });

  const [substitutionPlans, setSubstitutionPlans] = useState<SubstitutionPlan[]>(() => {
    try {
      const saved = localStorage.getItem('boiser_sub_plans_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Sub plans load error', e);
    }
    return [];
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('boiser_notifications_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Notifications load error', e);
    }
    return [];
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('boiser_chat_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Chat load error', e);
    }
    return [];
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

  useEffect(() => {
    const handleRespectfulLockout = (e: CustomEvent) => {
      if (currentUser.email === 'boisersteavenkinth@gmail.com') return;
      logoutUser();
    };

    window.addEventListener('boiser_user_locked_out_respectfully' as any, handleRespectfulLockout);
    return () => {
      window.removeEventListener('boiser_user_locked_out_respectfully' as any, handleRespectfulLockout);
    };
  }, [currentUser]);

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

  const loginTeacherAccount = (credentials: {
    email: string;
    password?: string;
  }): { success: boolean; message: string } => {
    const trimmedEmail = credentials.email.trim().toLowerCase();
    const isMaster = trimmedEmail === 'boisersteavenkinth@gmail.com';
    const isDepEd = trimmedEmail.endsWith('@deped.gov.ph');

    if (!isMaster && !isDepEd) {
      return {
        success: false,
        message: 'Access Restricted: Please use your official DepEd email (@deped.gov.ph).'
      };
    }

    // 5-Hour Lockout & Master Creator only decision check
    const lockoutStatus = isUserCurrentlyLockedOut(trimmedEmail);
    if (lockoutStatus.isLocked) {
      const remainingMins = Math.round((lockoutStatus.remainingMs || 0) / 60000);
      return {
        success: false,
        message: `Account Under 5-Hour Restriction (${remainingMins} mins remaining): Suspicious or unauthorized activity detected. Only Master Creator Steaven Kinth D. Boiser can authorize your login.`
      };
    }

    const existingUser = userRegistry.find(u => u.email === trimmedEmail);
    
    if (existingUser && existingUser.isBlocked) {
      return { 
        success: false, 
        message: 'Account Blocked: Too many failed attempts. Please contact the Master Creator for assistance.' 
      };
    }

    if (existingUser && credentials.password && existingUser.password !== credentials.password) {
      const attempts = (existingUser.loginAttempts || 0) + 1;
      const isNowBlocked = attempts >= 3;
      
      const updatedRegistry = userRegistry.map(u => 
        u.email === trimmedEmail 
          ? { ...u, loginAttempts: attempts, isBlocked: isNowBlocked } 
          : u
      );
      
      setUserRegistry(updatedRegistry);
      localStorage.setItem('boiser_user_registry_v1', JSON.stringify(updatedRegistry));

      if (isNowBlocked) {
        logActivity('Security', 'Account Automatically Blocked', `User ${trimmedEmail} exceeded 3 password attempts.`);
        return { success: false, message: 'Account Blocked: Too many failed attempts. Security lock engaged.' };
      }

      return { success: false, message: `Invalid password. ${3 - attempts} attempts remaining before automatic block.` };
    }

    const nextUser: UserAccount = existingUser || {
      id: isMaster ? 'owner-steaven-boiser' : `teacher-${Date.now()}`,
      name: isMaster ? 'Steaven Kinth D. Boiser' : 'DepEd Teacher',
      email: trimmedEmail,
      role: isMaster ? 'owner' : 'user',
      school: isMaster ? 'LNNCHS' : 'LNNCHS / DepEd Public School',
      division: 'Division of Lanao del Norte',
      isActivated: isMaster ? true : false // Master is pre-activated
    };

    // Reset attempts on successful login
    if (existingUser) {
      const updatedRegistry = userRegistry.map(u => 
        u.email === trimmedEmail ? { ...u, loginAttempts: 0 } : u
      );
      setUserRegistry(updatedRegistry);
      localStorage.setItem('boiser_user_registry_v1', JSON.stringify(updatedRegistry));
    }

    setCurrentUser(nextUser);
    setIsAuthenticated(true);
    try {
      localStorage.setItem('boiser_auth_current_user_v1', JSON.stringify(nextUser));
      localStorage.setItem('boiser_is_authenticated_v1', 'true');
    } catch (e) {
      console.warn('Auth save error', e);
    }

    logActivity('DepEd Authentication', isMaster ? 'Master Creator Authenticated' : 'DepEd Teacher Sign-in', `Verified ${nextUser.email}`);
    return {
      success: true,
      message: `Welcome back, ${nextUser.name}!`
    };
  };

  const registerTeacherAccount = (teacher: {
    name: string;
    email: string;
    password?: string;
    school?: string;
    division?: string;
    subject?: string;
  }): { success: boolean; message: string } => {
    const trimmedEmail = teacher.email.trim().toLowerCase();
    const isMaster = trimmedEmail === 'boisersteavenkinth@gmail.com';
    const isDepEd = trimmedEmail.endsWith('@deped.gov.ph');

    if (!isMaster && !isDepEd) {
      return {
        success: false,
        message: 'Registration is restricted: You must provide an official DepEd email address ending with @deped.gov.ph.'
      };
    }

    const newUser: UserAccount = {
      id: isMaster ? 'owner-steaven-boiser' : `teacher-${Date.now()}`,
      name: teacher.name.trim(),
      email: trimmedEmail,
      password: teacher.password,
      role: isMaster ? 'owner' : 'user',
      school: teacher.school || 'LNNCHS',
      division: teacher.division || 'Division of Lanao del Norte',
      isActivated: isMaster ? true : false,
      loginAttempts: 0
    };

    const updatedRegistry = [...userRegistry.filter(u => u.email !== trimmedEmail), newUser];
    setUserRegistry(updatedRegistry);
    
    try {
      localStorage.setItem('boiser_user_registry_v1', JSON.stringify(updatedRegistry));
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('boiser_auth_current_user_v1', JSON.stringify(newUser));
      localStorage.setItem('boiser_is_authenticated_v1', 'true');
    } catch (e) {
      console.warn('Registration save error', e);
    }

    logActivity('DepEd Authentication', 'New Teacher Registered', `Account created for ${newUser.email}. Activation pending master review.`);
    return {
      success: true,
      message: isMaster ? 'Master Creator Registered!' : 'Account created successfully! Please wait for Master Creator to activate your door.'
    };
  };

  const requestAccountHelp = (email: string, message: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const updatedRegistry = userRegistry.map(u => 
      u.email === trimmedEmail ? { ...u, requestHelp: true, helpMessage: message } : u
    );
    setUserRegistry(updatedRegistry);
    localStorage.setItem('boiser_user_registry_v1', JSON.stringify(updatedRegistry));
    logActivity('Account Support', 'Help Request Sent', `User ${trimmedEmail} requested help: ${message}`);
    return { success: true, message: 'Your request has been sent to the Master Creator. Please wait for a response.' };
  };

  const solveUserProblem = (email: string) => {
    const updatedRegistry = userRegistry.map(u => 
      u.email === email ? { ...u, requestHelp: false, helpMessage: '', isActivated: true } : u
    );
    setUserRegistry(updatedRegistry);
    localStorage.setItem('boiser_user_registry_v1', JSON.stringify(updatedRegistry));
    logActivity('Master Admin', 'Problem Solved', `Master Creator solved problem for ${email} and activated account.`);
  };

  const unblockUser = (email: string) => {
    const updatedRegistry = userRegistry.map(u => 
      u.email === email ? { ...u, isBlocked: false, loginAttempts: 0 } : u
    );
    setUserRegistry(updatedRegistry);
    localStorage.setItem('boiser_user_registry_v1', JSON.stringify(updatedRegistry));
    logActivity('Master Admin', 'User Unblocked', `Master Creator unblocked account for ${email}.`);
  };

  const biometricRegister = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Mock biometric registration using browser credentials API
      // In a real app, this would involve server-side challenge verification
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: "Boiser Power Tools" },
          user: {
            id: new Uint8Array(16),
            name: email,
            displayName: email
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          timeout: 60000,
          attestation: "direct"
        }
      });

      if (credential) {
        const updatedRegistry = userRegistry.map(u => 
          u.email === email ? { ...u, biometricId: (credential as any).id } : u
        );
        setUserRegistry(updatedRegistry);
        localStorage.setItem('boiser_user_registry_v1', JSON.stringify(updatedRegistry));
        logActivity('Security', 'Biometric Registered', `Fingerprint added for ${email}`);
        return { success: true, message: 'Fingerprint registered successfully! You can now use it to sign in.' };
      }
      return { success: false, message: 'Biometric registration failed.' };
    } catch (e) {
      console.error('Biometric error', e);
      return { success: false, message: 'Biometric registration cancelled or not supported.' };
    }
  };

  const biometricLogin = async (email: string): Promise<{ success: boolean; message: string }> => {
    const user = userRegistry.find(u => u.email === email);
    if (!user || !user.biometricId) {
      return { success: false, message: 'No fingerprint found for this account. Please register it first.' };
    }

    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      
      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          allowCredentials: [{
            id: Buffer.from(user.biometricId, 'base64'), // Mocking base64 conversion if needed
            type: "public-key"
          }],
          timeout: 60000
        }
      });

      if (assertion) {
        return loginTeacherAccount({ email });
      }
      return { success: false, message: 'Biometric authentication failed.' };
    } catch (e) {
      // For demo purposes, we will treat a successful browser prompt as success if it returns anything
      // In a real WebAuthn flow, we'd verify the signature
      console.error('Biometric login error', e);
      return { success: false, message: 'Biometric login failed.' };
    }
  };

  const logoutUser = () => {
    setCurrentUser(DEFAULT_TEACHER);
    setIsAuthenticated(false);
    try {
      localStorage.setItem('boiser_auth_current_user_v1', JSON.stringify(DEFAULT_TEACHER));
      localStorage.setItem('boiser_is_authenticated_v1', 'false');
    } catch (e) {
      console.warn('Auth save error', e);
    }
    logActivity('Authentication', 'User Logged Out', 'Reset to standard teacher guest session.');
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

  const addSubstitutionPlan = (planData: Omit<SubstitutionPlan, 'id' | 'timestamp' | 'status' | 'assignedByEmail' | 'assignedByName'>) => {
    const newPlan: SubstitutionPlan = {
      ...planData,
      id: `plan-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'active',
      assignedByEmail: currentUser.email,
      assignedByName: currentUser.name
    };

    setSubstitutionPlans(prev => {
      const updated = [newPlan, ...prev];
      localStorage.setItem('boiser_sub_plans_v1', JSON.stringify(updated));
      return updated;
    });

    // Create notification for the substitute teacher
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: '🚨 New Substitution Assignment',
      message: `You have been assigned to substitute for ${newPlan.subject} in ${newPlan.section}. Please check your portal.`,
      type: 'alarm',
      timestamp: new Date().toISOString(),
      read: false
    };

    // We simulate "sending" to the specific user by adding to a shared pool
    // In a real app, this would be a targeted firestore document
    setNotifications(prev => {
      const updated = [newNotif, ...prev];
      localStorage.setItem('boiser_notifications_v1', JSON.stringify(updated));
      return updated;
    });

    logActivity('Substitution', 'Assigned Substitute Teacher', `Teacher ${planData.substituteTeacherEmail} assigned for ${planData.subject}`);
  };

  const removeSubstitutionPlan = (id: string) => {
    setSubstitutionPlans(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem('boiser_sub_plans_v1', JSON.stringify(updated));
      return updated;
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('boiser_notifications_v1', JSON.stringify(updated));
      return updated;
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('boiser_notifications_v1');
  };

  const sendChatMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: `chat-${Date.now()}`,
      senderEmail: currentUser.email,
      senderName: currentUser.name,
      message,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => {
      const updated = [...prev, newMessage].slice(-50); // Keep last 50
      localStorage.setItem('boiser_chat_v1', JSON.stringify(updated));
      return updated;
    });
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
        isAuthenticated,
        activityLogs,
        securityAlerts,
        logActivity,
        switchRole,
        loginTeacherAccount,
        registerTeacherAccount,
        logoutUser,
        updateOwnerLogo,
        activeLogoUrl,
        dismissAlert,
        clearOldLogs,
        checkForUpdates,
        updateSuggestions,
        approveUpdate,
        dismissUpdate,
        userRegistry,
        requestAccountHelp,
        solveUserProblem,
        unblockUser,
        biometricRegister,
        biometricLogin,
        substitutionPlans,
        addSubstitutionPlan,
        removeSubstitutionPlan,
        notifications,
        markNotificationRead,
        clearNotifications,
        chatMessages,
        sendChatMessage
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
