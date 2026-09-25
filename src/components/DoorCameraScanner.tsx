import React, { useRef, useState, useEffect } from 'react';
import { 
  Camera, 
  X, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  QrCode, 
  FileCheck, 
  Scan,
  Maximize,
  Loader2,
  CheckCircle2,
  Zap
} from 'lucide-react';

interface DoorCameraScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onResult?: (result: any) => void;
  mode?: 'activity' | 'exam' | 'qr' | 'rute' | 'ddt';
}

export const DoorCameraScanner: React.FC<DoorCameraScannerProps> = ({
  isOpen,
  onClose,
  onResult,
  mode = 'activity'
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setCapturedImage(null);
      setError(null);
      setScanResult(null);
      return;
    }
    startCamera();
    return () => stopCamera();
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setError(null);
    stopCamera();
    try {
      const constraints = {
        video: { facingMode: { ideal: facingMode }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err: any) {
      setError('Camera access denied or unavailable.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      processImage(dataUrl);
    }
  };

  const processImage = async (image: string) => {
    setIsScanning(true);
    // Simulate AI scanning and grading
    await new Promise(r => setTimeout(r, 2000));
    
    const mockResults = {
      activity: { score: 95, total: 100, feedback: 'Excellent mastery of concepts. Clear and neat handwriting.' },
      exam: { score: 45, total: 50, feedback: 'Pass. Review items 12 and 15 regarding plate tectonics.' },
      qr: { type: 'DO 3, s. 2026', data: 'DLL-W1-GM11-BOISER', status: 'Verified' },
      rute: { score: 58, total: 60, status: 'Advanced' },
      ddt: { status: 'Compliant', remarks: 'All indicators met.' }
    };

    setScanResult(mockResults[mode]);
    setIsScanning(false);
    if (onResult) onResult(mockResults[mode]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
        {/* Header */}
        <div className="bg-[#002776] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Camera className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight">DepEd Smart Scanner</h3>
              <p className="text-[10px] text-blue-200 font-bold uppercase">Mode: {mode.toUpperCase()}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
        </div>

        {/* Viewport */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
          {capturedImage ? (
            <div className="relative w-full h-full">
              <img src={capturedImage} className="w-full h-full object-contain" alt="Captured" />
              {isScanning && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white space-y-4">
                  <Loader2 className="w-12 h-12 animate-spin text-amber-400" />
                  <p className="text-sm font-black uppercase tracking-widest animate-pulse">AI Analyzing Document...</p>
                  <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 animate-[progress_2s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
                  </div>
                </div>
              )}
              {scanResult && !isScanning && (
                <div className="absolute inset-0 bg-white/95 p-8 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
                  <CheckCircle2 className="w-20 h-12 text-emerald-500 mb-4" />
                  <h4 className="text-2xl font-black text-slate-900 uppercase mb-2">Scan Successful!</h4>
                  
                  <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 w-full space-y-4 mb-6">
                    {mode === 'qr' ? (
                      <>
                        <div className="text-xs font-black text-slate-400 uppercase">QR Code Data</div>
                        <div className="text-lg font-black text-blue-800">{scanResult.data}</div>
                        <div className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black inline-block">{scanResult.status}</div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-around items-center">
                          <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase">Score</div>
                            <div className="text-4xl font-black text-emerald-600">{scanResult.score}/{scanResult.total}</div>
                          </div>
                          <div className="h-10 w-px bg-slate-200"></div>
                          <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase">Percentage</div>
                            <div className="text-2xl font-black text-blue-600">{Math.round((scanResult.score / scanResult.total) * 100)}%</div>
                          </div>
                        </div>
                        <div className="text-left p-4 bg-white rounded-2xl border border-slate-200">
                          <p className="text-xs font-bold text-slate-700 italic">"{scanResult.feedback || scanResult.remarks}"</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex gap-3 w-full">
                    <button 
                      onClick={() => { setCapturedImage(null); setScanResult(null); startCamera(); }}
                      className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-black transition"
                    >
                      SCAN NEXT
                    </button>
                    <button 
                      onClick={onClose}
                      className="flex-1 py-3 bg-[#002776] text-white rounded-2xl text-xs font-black shadow-lg"
                    >
                      RECORD & CLOSE
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
              {/* Scan Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-12 border-2 border-dashed border-amber-400/60 rounded-3xl shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-amber-400 rounded-tl-lg"></div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-amber-400 rounded-tr-lg"></div>
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-amber-400 rounded-bl-lg"></div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-amber-400 rounded-br-lg"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-amber-400/40 animate-[scan_3s_linear_infinite]"></div>
                  </div>
                </div>
              </div>
              <p className="absolute bottom-10 left-0 right-0 text-center text-white text-xs font-bold bg-black/40 backdrop-blur-md py-2 mx-20 rounded-full">
                Align the document or QR code within the frame
              </p>
            </>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Footer Actions */}
        {!capturedImage && (
          <div className="p-6 bg-slate-50 flex items-center justify-around">
            <button 
              onClick={() => setFacingMode(f => f === 'environment' ? 'user' : 'environment')}
              className="p-4 bg-white rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition shadow-sm"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
            
            <button 
              onClick={handleCapture}
              className="w-20 h-20 bg-white rounded-full border-8 border-slate-200 flex items-center justify-center shadow-xl active:scale-95 transition"
            >
              <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white">
                <Scan className="w-8 h-8" />
              </div>
            </button>

            <button 
              onClick={() => {}}
              className="p-4 bg-white rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition shadow-sm"
            >
              <Zap className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};
