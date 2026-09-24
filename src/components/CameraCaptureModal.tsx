import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check, AlertCircle } from 'lucide-react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Image: string) => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isStarting, setIsStarting] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setCapturedImage(null);
      setError(null);
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setIsStarting(true);
    setError(null);
    stopCamera();

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setError(
        err?.message?.includes('Permission')
          ? 'Camera permission was denied. Please allow camera access in your browser settings.'
          : 'Unable to access camera. Please check your camera permissions or upload an image file instead.'
      );
    } finally {
      setIsStarting(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleSnap = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setCapturedImage(dataUrl);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    if (!streamRef.current) {
      startCamera();
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border border-stone-800">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800 bg-stone-900/50">
          <div className="flex items-center gap-2 text-white font-medium text-sm">
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>Photograph Your Plant</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Area */}
        <div className="relative aspect-4/3 w-full bg-black flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-stone-300 max-w-sm">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <p className="text-sm font-medium mb-3">{error}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold"
              >
                Try Again
              </button>
            </div>
          ) : capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured plant preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Plant frame overlay guidelines */}
              <div className="absolute inset-8 border-2 border-dashed border-white/40 rounded-2xl pointer-events-none flex items-center justify-center">
                <span className="text-[11px] font-medium text-white/70 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
                  Center leaves or flowers inside frame
                </span>
              </div>
              {isStarting && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm">
                  Starting camera...
                </div>
              )}
            </>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Action Controls */}
        <div className="p-5 flex items-center justify-between bg-stone-900 border-t border-stone-800">
          {capturedImage ? (
            <div className="flex items-center justify-between w-full gap-4">
              <button
                type="button"
                onClick={handleRetake}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-stone-800 text-stone-200 hover:bg-stone-700 transition"
              >
                <RefreshCw className="w-4 h-4" />
                Retake
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30 transition"
              >
                <Check className="w-4 h-4" />
                Use Photo
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={toggleCamera}
                title="Switch front/back camera"
                className="p-3 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleSnap}
                disabled={isStarting || Boolean(error)}
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition disabled:opacity-50"
              >
                <div className="w-13 h-13 rounded-full border-2 border-stone-900 bg-emerald-600 flex items-center justify-center text-white">
                  <Camera className="w-6 h-6" />
                </div>
              </button>

              <div className="w-10" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
