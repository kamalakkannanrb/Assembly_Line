import { useState, useRef, useEffect} from 'react';

export function Scanner() {
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [stream, setStream] = useState<any>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<any>(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [status, setStatus] = useState<{message:string,type:string,visible:boolean}>({ message: '', type: '', visible: false });

  const showStatus = (message: string, type: string) => {
    setStatus({ message, type, visible: true });
    setTimeout(() => {
      setStatus(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video:{
            width:{ideal:1280},
            height:{ideal:720}
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setStream(mediaStream);
      setIsStreamActive(true);
      showStatus('Camera started successfully!', 'success');
    } catch (err) {
      console.error('Error accessing camera:', err);
      showStatus('Error accessing camera. Please check permissions.', 'error');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');
    
    setCapturedPhoto(dataURL);
    showStatus('Photo captured successfully!', 'success');
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track:any) =>track.stop());
      setStream(null);
      setIsStreamActive(false);
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      showStatus('Camera stopped.', 'success');
    }
  };

  const downloadPhoto = () => {
    if (!capturedPhoto) return;
    
    const link = document.createElement('a');
    link.href = capturedPhoto;
    link.download = `photo_${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track:any) => track.stop());
      }
    };
  }, [stream]);

  // Check camera support
  const isCameraSupported = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-2">
          📷 Scanner
        </h1>

        {!isCameraSupported && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Camera not supported in this browser.
          </div>
        )}

        {/* Controls */}
        <div className="text-center mb-6">
          <button
            onClick={startCamera}
            disabled={isStreamActive || !isCameraSupported}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg mx-2 transition-colors"
          >
            Start Camera
          </button>
          
          <button
            onClick={capturePhoto}
            disabled={!isStreamActive}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg mx-2 transition-colors"
          >
            Take Photo
          </button>
          
          <button
            onClick={stopCamera}
            disabled={!isStreamActive}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg mx-2 transition-colors"
          >
            Stop Camera
          </button>
        </div>

        {/* Status Message */}
        {status.visible && (
          <div className={`text-center py-3 px-4 rounded-lg mb-4 font-semibold ${
            status.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {status.message}
          </div>
        )}

        {/* Video Preview */}
        <div className="text-center mb-6">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-w-lg h-auto border-2 border-gray-300 rounded-lg shadow-md mx-auto"
            style={{ display: isStreamActive ? 'block' : 'none' }}
          />
          
          {!isStreamActive && (
            <div className="w-full max-w-lg h-64 bg-gray-200 border-2 border-gray-300 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-gray-500 text-lg">Camera Preview</span>
            </div>
          )}
        </div>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Captured Photo */}
        {capturedPhoto && (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Captured Photo:</h3>
            <img
              src={capturedPhoto}
              alt="Captured photo"
              className="max-w-full h-auto border-2 border-gray-300 rounded-lg shadow-md mx-auto mb-4"
            />
            <button
              onClick={downloadPhoto}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Download Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}