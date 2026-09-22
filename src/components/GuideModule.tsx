import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Fingerprint, 
  Users, 
  CloudLightning, 
  WifiOff, 
  Languages,
  ChevronRight,
  Monitor,
  Database,
  Terminal,
  Settings,
  QrCode,
  Search,
  CheckCircle,
  Camera
} from 'lucide-react';

interface Step {
  icon: React.ReactNode;
  text: string;
  subtext: string;
}

interface GuideSection {
  title: string;
  steps: Step[];
}

interface GuideContent {
  [key: string]: {
    masters: GuideSection;
    users: GuideSection;
    scanner: GuideSection;
  };
}

const guideData: GuideContent = {
  en: {
    masters: {
      title: "Master's Technical Guide",
      steps: [
        { icon: <Fingerprint className="w-5 h-5 text-blue-600" />, text: "Biometric Activation", subtext: "Use your registered fingerprint to unlock the Master Skills Space." },
        { icon: <ShieldCheck className="w-5 h-5 text-green-600" />, text: "Security Protocols", subtext: "Monitor real-time security alerts and unauthorized access attempts." },
        { icon: <Terminal className="w-5 h-5 text-purple-600" />, text: "Master Command Engine", subtext: "Execute global system commands for scaling and deployment." },
        { icon: <Database className="w-5 h-5 text-orange-600" />, text: "Data Synchronization", subtext: "Manage cloud-to-local sync queues for 150,000+ teachers." }
      ]
    },
    users: {
      title: "Teacher's User Guide",
      steps: [
        { icon: <Users className="w-5 h-5 text-blue-500" />, text: "Sign In", subtext: "Log in using your official DepEd Employee ID for unlimited access." },
        { icon: <BookOpen className="w-5 h-5 text-emerald-500" />, text: "ILAW Generator", subtext: "Create DepEd-aligned lesson plans using the AI-assisted engine." },
        { icon: <WifiOff className="w-5 h-5 text-amber-500" />, text: "Offline Mode", subtext: "Work anytime, anywhere. Data saves automatically without internet." },
        { icon: <CloudLightning className="w-5 h-5 text-indigo-500" />, text: "Instant Sync", subtext: "Re-connect to sync your work to the cloud in under 30 seconds." }
      ]
    },
    scanner: {
      title: "Scanner & Grading Steps",
      steps: [
        { icon: <QrCode className="w-5 h-5 text-indigo-600" />, text: "Step 1: Scan Student ID", subtext: "Point camera at Student QR/Barcode to identify the learner." },
        { icon: <Monitor className="w-5 h-5 text-blue-600" />, text: "Step 2: Capture Answer Sheet", subtext: "Photograph or upload the student's handwritten answer sheet." },
        { icon: <Search className="w-5 h-5 text-purple-600" />, text: "Step 3: AI OCR Analysis", subtext: "The system reads the text and cross-references the answer key." },
        { icon: <CheckCircle className="w-5 h-5 text-green-600" />, text: "Step 4: AI Proofreading", subtext: "Receive grammar fixes and supportive feedback for the student." }
      ]
    }
  },
  tl: {
    masters: {
      title: "Gabay para sa Master",
      steps: [
        { icon: <Fingerprint className="w-5 h-5 text-blue-600" />, text: "Biometric Activation", subtext: "Gamitin ang iyong fingerprint para ma-unlock ang Master Skills Space." },
        { icon: <ShieldCheck className="w-5 h-5 text-green-600" />, text: "Security Protocols", subtext: "Bantayan ang real-time alerts at mga tangkang pagnakaw ng data." },
        { icon: <Terminal className="w-5 h-5 text-purple-600" />, text: "Master Command Engine", subtext: "Magpatakbo ng mga command para sa scaling at deployment." },
        { icon: <Database className="w-5 h-5 text-orange-600" />, text: "Data Synchronization", subtext: "Pamahalaan ang sync queues para sa 150,000+ na guro." }
      ]
    },
    users: {
      title: "Gabay para sa mga Guro",
      steps: [
        { icon: <Users className="w-5 h-5 text-blue-500" />, text: "Pag-Log In", subtext: "Gamitin ang iyong DepEd Employee ID para sa unlimited access." },
        { icon: <BookOpen className="w-5 h-5 text-emerald-500" />, text: "ILAW Generator", subtext: "Gumawa ng lesson plans na alinsunod sa DepEd curriculum." },
        { icon: <WifiOff className="w-5 h-5 text-amber-500" />, text: "Offline Mode", subtext: "Magtrabaho kahit saan. Awtomatikong mase-save ang iyong gawa." },
        { icon: <CloudLightning className="w-5 h-5 text-indigo-500" />, text: "Instant Sync", subtext: "Mag-sync ng gawa sa cloud sa loob lamang ng 30 segundo." }
      ]
    },
    scanner: {
      title: "Hakbang sa Scanner at Grading",
      steps: [
        { icon: <QrCode className="w-5 h-5 text-indigo-600" />, text: "Hakbang 1: I-scan ang ID", subtext: "Itapat ang camera sa QR/Barcode ng estudyante para makilala ang mag-aaral." },
        { icon: <Monitor className="w-5 h-5 text-blue-600" />, text: "Hakbang 2: Kunan ang Answer Sheet", subtext: "Picturan o i-upload ang answer sheet ng estudyante." },
        { icon: <Search className="w-5 h-5 text-purple-600" />, text: "Hakbang 3: AI OCR Analysis", subtext: "Babahahin ng system ang text at ihahambing sa answer key." },
        { icon: <CheckCircle className="w-5 h-5 text-green-600" />, text: "Hakbang 4: AI Proofreading", subtext: "Makakakuha ng grammar fixes at positibong feedback para sa estudyante." }
      ]
    }
  },
  bis: {
    masters: {
      title: "Giya para sa Master",
      steps: [
        { icon: <Fingerprint className="w-5 h-5 text-blue-600" />, text: "Biometric Activation", subtext: "Gamita ang imong fingerprint para ma-abli ang Master Skills Space." },
        { icon: <ShieldCheck className="w-5 h-5 text-green-600" />, text: "Security Protocols", subtext: "Bantayi ang real-time alerts ug mga pagsulay sa pag-extract og data." },
        { icon: <Terminal className="w-5 h-5 text-purple-600" />, text: "Master Command Engine", subtext: "Padagana ang mga command para sa scaling ug deployment." },
        { icon: <Database className="w-5 h-5 text-orange-600" />, text: "Data Synchronization", subtext: "Dumala sa sync queues para sa 150,000+ ka mga magtutudlo." }
      ]
    },
    users: {
      title: "Giya para sa mga Magtutudlo",
      steps: [
        { icon: <Users className="w-5 h-5 text-blue-500" />, text: "Pag-Sign In", subtext: "Gamita ang imong DepEd Employee ID para sa unlimited nga access." },
        { icon: <BookOpen className="w-5 h-5 text-emerald-500" />, text: "ILAW Generator", subtext: "Paghimo og lesson plans nga nakabase sa DepEd MELCs." },
        { icon: <WifiOff className="w-5 h-5 text-amber-500" />, text: "Offline Mode", subtext: "Trabaho bisan asa. Awtomatiko nga ma-save ang imong gihimo." },
        { icon: <CloudLightning className="w-5 h-5 text-indigo-500" />, text: "Instant Sync", subtext: "I-sync ang imong trabaho sa cloud sulod sa 30 segundos." }
      ]
    },
    scanner: {
      title: "Lakang sa Scanner ug Grading",
      steps: [
        { icon: <QrCode className="w-5 h-5 text-indigo-600" />, text: "Lakang 1: I-scan ang ID", subtext: "Itunong ang camera sa QR/Barcode sa estudyante para mailhan ang bata." },
        { icon: <Monitor className="w-5 h-5 text-blue-600" />, text: "Lakang 2: Picturan ang Answer Sheet", subtext: "Picturan o i-upload ang answer sheet sa estudyante." },
        { icon: <Search className="w-5 h-5 text-purple-600" />, text: "Lakang 3: AI OCR Analysis", subtext: "Basahon sa system ang text ug i-kumpara sa answer key." },
        { icon: <CheckCircle className="w-5 h-5 text-green-600" />, text: "Lakang 4: AI Proofreading", subtext: "Makadawat og grammar corrections ug madasigon nga feedback para sa bata." }
      ]
    }
  }
};

export const GuideModule: React.FC<{ isOwner: boolean }> = ({ isOwner }) => {
  const [lang, setLang] = useState<'en' | 'tl' | 'bis'>('en');

  const content = guideData[lang];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-stone-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          App Resource Center
        </h2>
        
        <div className="flex items-center bg-stone-100 p-1 rounded-xl gap-1">
          <button 
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === 'en' ? 'bg-white shadow-sm text-blue-600' : 'text-stone-500 hover:bg-stone-200'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLang('tl')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === 'tl' ? 'bg-white shadow-sm text-blue-600' : 'text-stone-500 hover:bg-stone-200'}`}
          >
            Tagalog
          </button>
          <button 
            onClick={() => setLang('bis')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === 'bis' ? 'bg-white shadow-sm text-blue-600' : 'text-stone-500 hover:bg-stone-200'}`}
          >
            Bisaya
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Guide Card */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-600">
            <Users className="w-5 h-5" />
            <h3 className="font-bold">{content.users.title}</h3>
          </div>
          
          <div className="space-y-4">
            {content.users.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                <div className="mt-1 p-2 bg-stone-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  {step.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-800">{step.text}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{step.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scanner & Grading Guide Card */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-600">
            <Camera className="w-5 h-5" />
            <h3 className="font-bold">{content.scanner.title}</h3>
          </div>
          
          <div className="space-y-4">
            {content.scanner.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                <div className="mt-1 p-2 bg-stone-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                  {step.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-800">{step.text}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{step.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Guide Card - Only visible to Owner */}
        {isOwner ? (
          <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Monitor className="w-5 h-5" />
              <h3 className="font-bold">{content.masters.title}</h3>
            </div>
            
            <div className="space-y-4">
              {content.masters.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="mt-1 p-2 bg-stone-800 rounded-lg group-hover:bg-blue-900/50 transition-colors border border-stone-700">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-100">{step.text}</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">{step.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-800">
              <button className="w-full flex items-center justify-between p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all">
                Access Master Skills Space
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-stone-50 p-6 rounded-2xl border border-dashed border-stone-200 flex flex-col items-center justify-center text-center space-y-3">
            <ShieldCheck className="w-10 h-10 text-stone-300" />
            <div>
              <h3 className="text-sm font-bold text-stone-400">Master Space Locked</h3>
              <p className="text-[10px] text-stone-400 max-w-[200px]">Only Steaven Kinth D. Boiser can access administrative controls and system coding.</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-4">
        <div className="p-2 bg-blue-600 rounded-lg text-white">
          <CloudLightning className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-900">Anytime, Anywhere Access Active</h4>
          <p className="text-xs text-blue-700">Offline caching is enabled. Work continues seamlessly even without data or wifi.</p>
        </div>
      </div>
    </div>
  );
};
