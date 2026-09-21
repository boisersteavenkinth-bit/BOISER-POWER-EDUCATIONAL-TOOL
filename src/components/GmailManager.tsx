import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  Mail,
  Send,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  UserCheck,
  LogOut,
  Sparkles,
  Inbox,
  PenSquare,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
} from '../lib/googleAuth';
import {
  fetchMessagesList,
  fetchUserProfile,
  sendGmailMessage,
  trashGmailMessage,
  GmailMessageSummary,
  GmailUserProfile,
  SendEmailPayload,
} from '../services/gmailService';

const DEPED_TEMPLATES = [
  {
    name: 'DepEd Grade 11 Three-Term BOW & ILAW Plan Submission',
    subject: 'SUBMISSION: DepEd Region X Grade 11 Three-Term BOW & ILAW Plan (SY 2026-2027)',
    body: `Dear School Head / Department Chair,

Good day!

In compliance with DepEd Order No. 009 & No. 015, s. 2026, I am respectfully submitting our Grade 11 Three-Term Budget of Work (BOW) and corresponding Region X ILAW (Individual Learning Activity Worksheet) sessions for the upcoming trimester.

Key Details:
- Grade Level: Grade 11 Senior High School
- School Year: 2026–2027 (Three-Term Calendar, 201 Class Days)
- Verification Status: Full Alignment with DepEd Region X Curriculum Matrix
- Attached Artifacts: Budget of Work Schedule, Competency Extraction Records, and Formative Assessment TOS.

Thank you very much for your continuous guidance and support to our educators and learners.

Respectfully yours,
Teacher / Department Faculty
DepEd Region X (Northern Mindanao)`
  },
  {
    name: 'Learner Academic Progress Advisory (Parent / Guardian)',
    subject: 'ACADEMIC ADVISORY: Learner Trimester Performance Update (SY 2026-2027)',
    body: `Dear Parent / Guardian,

Warm greetings from our school!

We are pleased to share an update on your child's academic engagement and learning progress under the DepEd SY 2026–2027 Three-Term Curriculum.

Highlights:
- Classroom Participation & Written Work: Satisfactory
- Performance Tasks & Practical Output: Active Engagement
- Remediation / Intervention Needed: None / On Track

Please feel free to reach out or visit us during scheduled Parent-Teacher Conferences should you have any questions regarding your learner's progress.

Together for quality education,
Class Adviser / Subject Teacher`
  },
  {
    name: 'Three-Term SF9 Report Card Advisory',
    subject: 'OFFICIAL NOTICE: Release of Trimester Report Cards (SF9 - SY 2026-2027)',
    body: `To All Parents, Guardians, and Faculty Members,

Please be advised that the School Form 9 (SF9) Trimester Learner Progress Report Cards are now compiled and ready for distribution in accordance with DepEd Order No. 009, s. 2026 standards.

Honor roll eligibility and trimester weighted averages have been verified by the Academic Standards Committee.

Kindly coordinate with the designated advisory classrooms for signature confirmation.

DepEd Region X School Administration`
  }
];

export const GmailManager: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [profile, setProfile] = useState<GmailUserProfile | null>(null);

  // Mail states
  const [activeView, setActiveView] = useState<'inbox' | 'compose'>('inbox');
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<GmailMessageSummary | null>(null);

  // Compose states
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [composeCc, setComposeCc] = useState('');

  // Confirmation Modals (MANDATORY for mutating operations)
  const [showSendConfirmModal, setShowSendConfirmModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState<string | null>(null);

  const [messageToTrash, setMessageToTrash] = useState<GmailMessageSummary | null>(null);
  const [isTrashing, setIsTrashing] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize Auth on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, accessToken) => {
        setUser(authedUser);
        setToken(accessToken);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );

    return () => unsubscribe();
  }, []);

  // When token is available, load user profile and recent emails
  useEffect(() => {
    if (token) {
      loadProfileAndInbox();
    }
  }, [token]);

  const loadProfileAndInbox = async () => {
    if (!token) return;
    setLoadingMessages(true);
    setErrorMessage(null);
    try {
      const [userProf, msgList] = await Promise.all([
        fetchUserProfile(token).catch(() => null),
        fetchMessagesList(token, searchQuery, 15).catch((e) => {
          console.error(e);
          return [];
        }),
      ]);

      if (userProf) setProfile(userProf);
      setMessages(msgList);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error communicating with Gmail API.');
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.error('Sign in failed:', err);
      setErrorMessage(err?.message || 'Sign in with Google was cancelled or encountered an issue.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setProfile(null);
      setMessages([]);
      setNeedsAuth(true);
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  const handleApplyTemplate = (tmpl: typeof DEPED_TEMPLATES[0]) => {
    setComposeSubject(tmpl.subject);
    setComposeBody(tmpl.body);
    setActiveView('compose');
  };

  // Open mandatory confirmation before sending
  const handleInitiateSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim()) {
      alert('Please specify at least one recipient email address.');
      return;
    }
    setShowSendConfirmModal(true);
  };

  // Execute sending after explicit user confirmation
  const handleConfirmSend = async () => {
    if (!token) return;
    setIsSending(true);
    setErrorMessage(null);
    setSendSuccessMessage(null);

    try {
      await sendGmailMessage(token, {
        to: composeTo.trim(),
        subject: composeSubject.trim() || '(No Subject)',
        body: composeBody,
        cc: composeCc.trim() || undefined,
      });

      setShowSendConfirmModal(false);
      setSendSuccessMessage(`Email successfully dispatched to ${composeTo.trim()}!`);
      // Reset compose form
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
      setComposeCc('');
      // Reload inbox after a brief delay
      setTimeout(() => {
        loadProfileAndInbox();
        setActiveView('inbox');
        setSendSuccessMessage(null);
      }, 2000);
    } catch (err: any) {
      console.error('Failed to send email:', err);
      setErrorMessage(`Failed to send email: ${err?.message || 'Check recipient or connection'}`);
      setShowSendConfirmModal(false);
    } finally {
      setIsSending(false);
    }
  };

  // Execute trash after explicit user confirmation
  const handleConfirmTrash = async () => {
    if (!token || !messageToTrash) return;
    setIsTrashing(true);
    try {
      await trashGmailMessage(token, messageToTrash.id);
      setMessages((prev) => prev.filter((m) => m.id !== messageToTrash.id));
      if (selectedMessage?.id === messageToTrash.id) {
        setSelectedMessage(null);
      }
      setMessageToTrash(null);
    } catch (err: any) {
      console.error('Trash error:', err);
      setErrorMessage(`Could not move message to trash: ${err?.message || ''}`);
      setMessageToTrash(null);
    } finally {
      setIsTrashing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#002776] via-[#0038A8] to-stone-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden border-b-4 border-[#FCD116]">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCD116] text-stone-950 text-xs font-extrabold uppercase tracking-wider">
            <Mail className="w-4 h-4" />
            Google Workspace Gmail Integration
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            DepEd Official Gmail Communications Hub
          </h1>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
            Directly connect your authorized Google account to inspect incoming division notices, dispatch official Three-Term curriculum plans, and send learner academic progress updates.
          </p>

          {/* User Auth Status / Sign-in Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {needsAuth ? (
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="gsi-material-button bg-white text-stone-800 hover:bg-stone-50 border border-stone-300 px-4 py-2.5 rounded-full font-bold text-xs flex items-center gap-2.5 shadow-md transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
                <span>{isLoggingIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User Avatar" className="w-7 h-7 rounded-full border border-[#FCD116]" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#FCD116] text-[#002776] flex items-center justify-center font-bold">
                    {user?.displayName?.[0] || 'U'}
                  </div>
                )}
                <div>
                  <div className="font-bold text-white">{user?.displayName || 'Authorized Educator'}</div>
                  <div className="text-[11px] text-blue-200">{profile?.emailAddress || user?.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-3 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 flex items-center gap-1 transition cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {sendSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{sendSuccessMessage}</span>
        </div>
      )}

      {needsAuth ? (
        /* Sign-in prompt card */
        <div className="bg-white rounded-3xl p-10 border border-stone-200 shadow-sm text-center space-y-6 max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0038A8] flex items-center justify-center mx-auto shadow-inner">
            <Mail className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-stone-900">Connect Your Google Account</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              To send official DepEd lesson plans, notices, and progress advisories directly from this app, please sign in with your authorized Google Account.
            </p>
          </div>
          <div>
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#0038A8] to-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer inline-flex items-center gap-3"
            >
              <svg className="w-5 h-5 bg-white p-0.5 rounded-full" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              </svg>
              <span>{isLoggingIn ? 'Connecting...' : 'Sign in with Google & Authorize Gmail'}</span>
            </button>
          </div>
          <div className="text-[11px] text-stone-400">
            Compliant with DepEd Data Privacy protocols & Google Workspace OAuth 2.0 specifications.
          </div>
        </div>
      ) : (
        /* Authenticated Main Workspace */
        <div className="space-y-6">
          {/* Quick DepEd Email Template Carousel */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <h3 className="text-xs font-extrabold text-amber-950 uppercase tracking-wider">
                  Quick DepEd Region X Email Templates
                </h3>
              </div>
              <span className="text-[11px] text-amber-800 font-medium">Click any template to auto-populate email draft</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DEPED_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyTemplate(tmpl)}
                  className="p-3.5 bg-white rounded-2xl border border-amber-200 hover:border-amber-400 hover:shadow-sm text-left transition cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-stone-900 group-hover:text-[#0038A8] transition">
                      {tmpl.name}
                    </span>
                    <p className="text-[11px] text-stone-500 line-clamp-2">
                      {tmpl.subject}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#0038A8]">
                    <span>Use Template</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('inbox')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeView === 'inbox'
                    ? 'bg-[#0038A8] text-white shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <Inbox className="w-4 h-4" />
                <span>Inbox & Messages ({messages.length})</span>
              </button>

              <button
                onClick={() => setActiveView('compose')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeView === 'compose'
                    ? 'bg-[#0038A8] text-white shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <PenSquare className="w-4 h-4" />
                <span>Compose DepEd Email</span>
              </button>
            </div>

            {activeView === 'inbox' && (
              <button
                onClick={loadProfileAndInbox}
                disabled={loadingMessages}
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                title="Refresh Inbox"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingMessages ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            )}
          </div>

          {/* Tab 1: Inbox */}
          {activeView === 'inbox' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Message List */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 shadow-sm p-4 sm:p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && loadProfileAndInbox()}
                      placeholder="Search inbox by subject, sender, or keyword (Press Enter)..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8]"
                    />
                  </div>
                  <button
                    onClick={loadProfileAndInbox}
                    className="px-4 py-2 rounded-xl bg-[#0038A8] hover:bg-blue-900 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Search
                  </button>
                </div>

                {loadingMessages ? (
                  <div className="py-16 text-center space-y-3">
                    <RefreshCw className="w-6 h-6 animate-spin text-[#0038A8] mx-auto" />
                    <p className="text-xs text-stone-500">Loading messages from Gmail API...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="py-16 text-center text-xs text-stone-500 space-y-2">
                    <Inbox className="w-8 h-8 text-stone-300 mx-auto" />
                    <p>No messages found in your inbox.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100 max-h-[520px] overflow-y-auto">
                    {messages.map((msg) => {
                      const isSelected = selectedMessage?.id === msg.id;
                      return (
                        <div
                          key={msg.id}
                          onClick={() => setSelectedMessage(msg)}
                          className={`p-3.5 rounded-2xl transition cursor-pointer flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'bg-blue-50/70 border border-blue-200'
                              : 'hover:bg-stone-50'
                          }`}
                        >
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs truncate ${
                                  msg.isUnread ? 'font-black text-stone-900' : 'font-bold text-stone-700'
                                }`}
                              >
                                {msg.from || 'Unknown Sender'}
                              </span>
                              {msg.isUnread && (
                                <span className="px-1.5 py-0.2 rounded bg-blue-600 text-white text-[9px] font-extrabold">
                                  NEW
                                </span>
                              )}
                            </div>

                            <h4
                              className={`text-xs truncate ${
                                msg.isUnread ? 'font-bold text-stone-900' : 'text-stone-800'
                              }`}
                            >
                              {msg.subject}
                            </h4>

                            <p className="text-[11px] text-stone-500 line-clamp-1">{msg.snippet}</p>
                          </div>

                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className="text-[10px] text-stone-400 whitespace-nowrap">
                              {msg.date ? new Date(msg.date).toLocaleDateString() : ''}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setMessageToTrash(msg);
                              }}
                              className="p-1 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition"
                              title="Delete to Trash"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Message Preview Pane */}
              <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Message Details
                </h3>

                {selectedMessage ? (
                  <div className="space-y-4 animate-fade-in text-xs">
                    <div className="space-y-2 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                      <div>
                        <span className="text-stone-400 block text-[10px]">SUBJECT</span>
                        <span className="font-bold text-stone-900 text-sm">{selectedMessage.subject}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">FROM</span>
                        <span className="font-medium text-stone-800">{selectedMessage.from}</span>
                      </div>
                      {selectedMessage.date && (
                        <div>
                          <span className="text-stone-400 block text-[10px]">DATE</span>
                          <span className="text-stone-600">{selectedMessage.date}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="text-stone-400 block text-[10px] mb-1">SNIPPET / PREVIEW</span>
                      <div className="p-4 rounded-2xl bg-white border border-stone-200 text-stone-800 leading-relaxed font-sans text-xs">
                        {selectedMessage.snippet}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setComposeTo(selectedMessage.from?.match(/<([^>]+)>/)?.[1] || selectedMessage.from || '');
                          setComposeSubject(`Re: ${selectedMessage.subject}`);
                          setComposeBody(`\n\n--- In reply to message on ${selectedMessage.date} ---\n${selectedMessage.snippet}`);
                          setActiveView('compose');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#0038A8] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs hover:bg-blue-900 transition cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Reply in Compose</span>
                      </button>

                      <button
                        onClick={() => setMessageToTrash(selectedMessage)}
                        className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Trash</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center text-xs text-stone-400 space-y-2">
                    <FileText className="w-8 h-8 text-stone-300 mx-auto" />
                    <p>Select any message on the left to inspect details</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Compose Email */}
          {activeView === 'compose' && (
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0038A8] flex items-center justify-center font-bold">
                    <PenSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-stone-900">Compose Official DepEd Email</h2>
                    <p className="text-xs text-stone-500">
                      Dispatched securely via your authenticated Google account ({profile?.emailAddress || user?.email})
                    </p>
                  </div>
                </div>

                <span className="text-[11px] px-2.5 py-1 rounded-full bg-blue-50 text-[#0038A8] font-bold border border-blue-200">
                  DO 009 & DO 015 Verified
                </span>
              </div>

              <form onSubmit={handleInitiateSend} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Recipient Email (To:) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={composeTo}
                      onChange={(e) => setComposeTo(e.target.value)}
                      placeholder="e.g. principal@deped.gov.ph, parent@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Cc (Optional)
                    </label>
                    <input
                      type="text"
                      value={composeCc}
                      onChange={(e) => setComposeCc(e.target.value)}
                      placeholder="e.g. department.head@deped.gov.ph"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Subject Line <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    placeholder="e.g. SUBMISSION: Grade 11 Three-Term Budget of Work (SY 2026-2027)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Email Body Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={12}
                    value={composeBody}
                    onChange={(e) => setComposeBody(e.target.value)}
                    placeholder="Compose your message or select one of the DepEd templates above..."
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8] font-sans leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setComposeTo('');
                      setComposeSubject('');
                      setComposeBody('');
                      setComposeCc('');
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition cursor-pointer"
                  >
                    Clear Draft
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0038A8] to-blue-700 hover:from-blue-800 hover:to-blue-900 text-white font-bold text-xs shadow-md flex items-center gap-2 transition cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#FCD116]" />
                    <span>Send Email (Review & Confirm)</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* MANDATORY Confirmation Dialog for Sending Email */}
      {showSendConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#0038A8] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#0038A8] flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-stone-900">Confirm Email Dispatch</h3>
                  <p className="text-xs text-stone-500">Google Workspace Gmail Sending Confirmation</p>
                </div>
              </div>
              <button
                onClick={() => setShowSendConfirmModal(false)}
                className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs space-y-2">
              <p className="text-stone-700 leading-relaxed">
                You are about to send an email from your authorized Gmail account:
              </p>
              <div className="space-y-1 font-mono text-[11px] text-stone-800">
                <div><strong>To:</strong> {composeTo}</div>
                {composeCc && <div><strong>Cc:</strong> {composeCc}</div>}
                <div><strong>Subject:</strong> {composeSubject}</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSendConfirmModal(false)}
                disabled={isSending}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition cursor-pointer"
              >
                Cancel & Edit
              </button>
              <button
                type="button"
                onClick={handleConfirmSend}
                disabled={isSending}
                className="px-6 py-2.5 rounded-xl bg-[#0038A8] hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-2 shadow-md transition cursor-pointer"
              >
                {isSending ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#FCD116]" />
                )}
                <span>{isSending ? 'Sending...' : 'Yes, Confirm & Send'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANDATORY Confirmation Dialog for Deleting Email */}
      {messageToTrash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-red-500 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-stone-900">Move Email to Trash?</h3>
                <p className="text-xs text-stone-500">Destructive Workspace Action</p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to move the email <strong>"{messageToTrash.subject}"</strong> to Trash? You will still be able to recover it from your Gmail Trash folder within 30 days.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMessageToTrash(null)}
                disabled={isTrashing}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmTrash}
                disabled={isTrashing}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition cursor-pointer"
              >
                {isTrashing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                <span>{isTrashing ? 'Moving to Trash...' : 'Confirm Move to Trash'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
