/**
 * BOISER Educational Voice Engine
 * Calm, clear, respectful and humble Cebuano-accented male voice synthesizer with clear pronunciation
 * and mandatory educational resource tagline appended to all voice messages.
 */

export const BOISER_MANDATORY_TAGLINE = 
  "Enjoy learning with BOISER educational resources. B.O.I.S.E.R. — Building Organizational Intelligence for Sustainable Educational Results.";

export interface VoiceOptions {
  appendTagline?: boolean;
  rate?: number; // 0.88: calm, steady, humble, and respectful
  pitch?: number; // 0.86: warm, grounded adult male timbre
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

// Global active voice configuration settings
export interface VoiceProfileConfig {
  accent: 'Cebuano Male' | 'Filipino Male' | 'English Male';
  pitch: number;
  rate: number;
  volume: number;
  clearPronunciation: boolean;
}

export let currentVoiceConfig: VoiceProfileConfig = {
  accent: 'Cebuano Male',
  pitch: 0.85, // Deep, warm, grounded male timbre
  rate: 0.86,  // Calm, deliberate, clear pronunciation
  volume: 1.0,
  clearPronunciation: true
};

/**
 * Command function to immediately switch and tune the active tour guide voice profile
 */
export const executeSwitchToCebuanoMaleVoiceCommand = (
  customAnnouncement?: string,
  onComplete?: () => void
): void => {
  currentVoiceConfig = {
    accent: 'Cebuano Male',
    pitch: 0.85,
    rate: 0.86,
    volume: 1.0,
    clearPronunciation: true
  };

  const commandConfirmationText = customAnnouncement || 
    "Voice command activated! Tour guide is now set to a calm, clear, and respectful Cebuano-accented male voice with clear pronunciation.";

  speakWithCebuanoMaleVoice(commandConfirmationText, {
    appendTagline: true,
    rate: currentVoiceConfig.rate,
    pitch: currentVoiceConfig.pitch,
    onEnd: onComplete,
    onError: onComplete
  });
};

/**
 * Cleans text from raw markdown, asterisks, hash tags, and emojis so
 * speech pronunciation is natural, respectful, and smooth.
 */
export const cleanTextForVoice = (rawText: string): string => {
  if (!rawText) return '';
  return rawText
    .replace(/[*_~`#\-]/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/🛡️|⛔|🔒|🚨|🔍|👋|🌐|🎤|✨|📘|📊|📝|🚀|•|⚡|💖|📁|👥|🏢|🏆|📖|🚪|👑|👤/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Selects the optimal calm, clear, respectful Cebuano / Filipino English male voice.
 */
export const findCebuanoMaleVoice = (): SpeechSynthesisVoice | null => {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Look for explicit Cebuano / Filipino / Tagalog voice
  const phVoice = voices.find(v => 
    v.lang.toLowerCase().includes('ceb') || 
    v.lang.toLowerCase().includes('fil') || 
    v.lang.toLowerCase().includes('tl') || 
    v.lang.toLowerCase().includes('ph')
  );
  if (phVoice) return phVoice;

  // 2. Look for male-named English voices (David, George, James, Mark, Guy, Daniel, Natural, Male)
  const maleKeywords = ['male', 'david', 'james', 'george', 'mark', 'guy', 'daniel', 'natural', 'richard', 'google us english', 'microsoft'];
  const maleVoice = voices.find(v => {
    const name = v.name.toLowerCase();
    return maleKeywords.some(kw => name.includes(kw)) && (v.lang.startsWith('en') || v.lang.includes('PH'));
  });
  if (maleVoice) return maleVoice;

  // 3. Fallback to standard English voice
  return voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
};

/**
 * Authoritative global voice function.
 * Speaks text using a calm, clear, respectful and humble Cebuano-accented male voice.
 * Automatically appends the required BOISER tagline.
 */
export const speakWithCebuanoMaleVoice = (
  text: string,
  options: VoiceOptions = {}
): void => {
  if (!('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis is not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const cleaned = cleanTextForVoice(text);
  const appendTag = options.appendTagline !== false;
  
  // Format with respectful pause before the mandatory tagline
  let fullText = cleaned;
  if (appendTag && !cleaned.toLowerCase().includes('enjoy learning with boiser')) {
    fullText = `${cleaned}. ${BOISER_MANDATORY_TAGLINE}`;
  }

  const utterance = new SpeechSynthesisUtterance(fullText);
  const voice = findCebuanoMaleVoice();
  if (voice) {
    utterance.voice = voice;
  }

  // Calm, steady, authoritative yet humble and respectful male voice characteristics
  utterance.rate = options.rate || currentVoiceConfig.rate;
  utterance.pitch = options.pitch || currentVoiceConfig.pitch;
  utterance.volume = currentVoiceConfig.volume;

  if (options.onStart) utterance.onstart = options.onStart;
  if (options.onEnd) utterance.onend = options.onEnd;
  if (options.onError) utterance.onerror = options.onError;

  window.speechSynthesis.speak(utterance);
};

export const stopCebuanoMaleVoice = (): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Rich Pre-scripted voice navigation walkthroughs for all app activities
 */
export const PRESET_VOICE_GUIDES = {
  welcome: "Maayong adlaw! With utmost respect and humility, welcome to Lanao del Norte National Comprehensive High School Power Education App, crafted by Master Creator Steaven Kinth D. Boiser. All institutional systems, Three-Term SF1 to SF10 records, and official DepEd Order Number 9, series of 2026 calendars are fully operational to serve your instructional and administrative duties.",

  userGuide: "Online User Guide and Standard Operating Procedures. To generate automated School Forms SF1 to SF10, navigate to the School Forms Hub, select your grade level, term, and section, then click Generate. To calculate Three-Term grades with automatic transmutation, open the Grading Engine. For Daily Lesson Plans aligned with DepEd Order Number 9, use the ILAW Exemplar Generator.",

  principals: "Executive School Leadership Doors. First is the Executive Door of Ma'am Anisah, Principal 3-A, overseeing Senior High School institutional management and the School Improvement Plan. Second is the Office of Ma'am Joan J. Andot, Asst. Principal II for Senior High School Academic Affairs and teacher loading schedules. Third is the Office of Ma'am Alma Almazing L. Calibo, Head Teacher for Curriculum Quality Assurance, ILAW approvals, and instructional mentoring.",

  registrar: "Registrar Office Door. Official LIS student enrollment, electronic class records, transmutations, and permanent Form 137 records are verified and secured here.",

  teachers: "Resident Faculty Doors. Grade 11 and Grade 12 advisers have private, dedicated rooms for automated SF forms, Budget of Work generator, and confidential Student Document Vaults.",

  activities: "Classroom Activities and Instructional Tools. The app features the ILAW 4-Day Daily Lesson Log Exemplar Generator, TechPro TVL Directory, Science and Mathematics Interactive Lab, Review of Related Literature RRL Builder, and Canva Bridge for visual slide presentation exports.",

  googleWorkspace: "Google Workspace Integration. You can synchronize lesson plans and student portfolios directly to Google Drive, collaborate in real time with fellow teachers in Google Chat, and receive administrative memorandums securely via Gmail Manager.",

  security: "Master Creator Real-Time Security Shield. Any suspicious attempt to alter data, inspect private databases, or perform unauthorized actions will automatically result in an immediate respectful logout and a 5-hour restriction. Re-activation is strictly upon the Master Creator's decision."
};
