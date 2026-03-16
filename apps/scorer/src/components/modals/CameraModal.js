"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraModal = void 0;
var react_1 = require("react");
var CameraModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, onUpload = _a.onUpload;
    var videoRef = (0, react_1.useRef)(null);
    var canvasRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(null), stream = _b[0], setStream = _b[1];
    var _c = (0, react_1.useState)('PHOTO'), mode = _c[0], setMode = _c[1];
    var _d = (0, react_1.useState)(null), capturedMedia = _d[0], setCapturedMedia = _d[1];
    var _e = (0, react_1.useState)(false), isRecording = _e[0], setIsRecording = _e[1];
    var _f = (0, react_1.useState)('IDLE'), uploadState = _f[0], setUploadState = _f[1];
    // MediaRecorder refs
    var mediaRecorderRef = (0, react_1.useRef)(null);
    var chunksRef = (0, react_1.useRef)([]);
    (0, react_1.useEffect)(function () {
        if (isOpen) {
            startCamera();
        }
        else {
            stopCamera();
            setCapturedMedia(null);
            setUploadState('IDLE');
        }
        return function () { return stopCamera(); };
    }, [isOpen]);
    var startCamera = function () { return __awaiter(void 0, void 0, void 0, function () {
        var mediaStream, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                            video: { facingMode: 'environment' },
                            audio: mode === 'VIDEO'
                        })];
                case 1:
                    mediaStream = _a.sent();
                    setStream(mediaStream);
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error("Camera access denied:", err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var stopCamera = function () {
        if (stream) {
            stream.getTracks().forEach(function (track) { return track.stop(); });
            setStream(null);
        }
    };
    var handleCapture = function () {
        var _a;
        if (mode === 'PHOTO') {
            if (videoRef.current && canvasRef.current) {
                var context = canvasRef.current.getContext('2d');
                if (context) {
                    canvasRef.current.width = videoRef.current.videoWidth;
                    canvasRef.current.height = videoRef.current.videoHeight;
                    context.drawImage(videoRef.current, 0, 0);
                    var dataUrl = canvasRef.current.toDataURL('image/jpeg');
                    setCapturedMedia(dataUrl);
                    stopCamera();
                }
            }
        }
        else {
            if (isRecording) {
                // Stop Recording
                (_a = mediaRecorderRef.current) === null || _a === void 0 ? void 0 : _a.stop();
                setIsRecording(false);
            }
            else {
                // Start Recording
                if (!stream)
                    return;
                chunksRef.current = [];
                var recorder = new MediaRecorder(stream);
                recorder.ondataavailable = function (e) { return chunksRef.current.push(e.data); };
                recorder.onstop = function () {
                    var blob = new Blob(chunksRef.current, { type: 'video/webm' });
                    var url = URL.createObjectURL(blob);
                    setCapturedMedia(url);
                    stopCamera();
                };
                recorder.start();
                setIsRecording(true);
                mediaRecorderRef.current = recorder;
            }
        }
    };
    var handleUpload = function () {
        setUploadState('UPLOADING');
        // Simulate upload delay
        setTimeout(function () {
            if (onUpload && capturedMedia) {
                // Fix: Map internal 'PHOTO' mode to expected 'IMAGE' type for the callback
                onUpload(capturedMedia, mode === 'PHOTO' ? 'IMAGE' : 'VIDEO');
            }
            setUploadState('SUCCESS');
            setTimeout(function () {
                onClose();
            }, 1500);
        }, 1500);
    };
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 bg-black z-[300] flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-20">
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></span>
           <span className="text-xs font-black text-white uppercase tracking-widest">Media Center Live</span>
        </div>
        <button onClick={onClose} className="text-white bg-white/20 hover:bg-white/30 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md">✕</button>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
        {capturedMedia ? (mode === 'PHOTO' ? (<img src={capturedMedia} alt="Capture" className="w-full h-full object-contain"/>) : (<video src={capturedMedia} controls className="w-full h-full object-contain"/>)) : (<video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"/>)}
        
        {/* Hidden Canvas for Photo Capture */}
        <canvas ref={canvasRef} className="hidden"/>

        {/* Upload Overlay */}
        {uploadState !== 'IDLE' && (<div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-30">
             {uploadState === 'UPLOADING' ? (<>
                 <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                 <p className="text-white font-black uppercase tracking-widest text-xs">Uploading to Media Center...</p>
               </>) : (<>
                 <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-4xl mb-4 animate-in zoom-in shadow-[0_0_30px_#10b981]">✓</div>
                 <p className="text-white font-black uppercase tracking-widest text-xs">Asset Secured</p>
               </>)}
          </div>)}
      </div>

      {/* Controls */}
      {!capturedMedia && uploadState === 'IDLE' && (<div className="bg-black/80 backdrop-blur-md p-8 pb-12 flex flex-col gap-6">
           <div className="flex justify-center gap-8">
              <button onClick={function () { return setMode('PHOTO'); }} className={"text-xs font-black uppercase tracking-widest transition-all ".concat(mode === 'PHOTO' ? 'text-yellow-400 scale-110' : 'text-slate-500')}>
                Photo
              </button>
              <button onClick={function () { return setMode('VIDEO'); }} className={"text-xs font-black uppercase tracking-widest transition-all ".concat(mode === 'VIDEO' ? 'text-red-500 scale-110' : 'text-slate-500')}>
                Video
              </button>
           </div>

           <div className="flex justify-center items-center">
              <button onClick={handleCapture} className={"w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all active:scale-95 ".concat(mode === 'VIDEO' && isRecording
                ? 'border-red-500 bg-red-500/20'
                : 'border-white bg-white/20 hover:bg-white/30')}>
                 <div className={"transition-all duration-300 ".concat(mode === 'VIDEO' && isRecording
                ? 'w-8 h-8 bg-red-500 rounded-sm'
                : 'w-16 h-16 bg-white rounded-full')}/>
              </button>
           </div>
        </div>)}

      {/* Review Controls */}
      {capturedMedia && uploadState === 'IDLE' && (<div className="bg-black/90 p-6 flex gap-4">
           <button onClick={function () { setCapturedMedia(null); startCamera(); }} className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-black uppercase text-xs tracking-widest">
             Discard
           </button>
           <button onClick={handleUpload} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-indigo-600/30">
             Upload Asset
           </button>
        </div>)}
    </div>);
};
exports.CameraModal = CameraModal;
