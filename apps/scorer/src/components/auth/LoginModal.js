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
exports.LoginModal = void 0;
var react_1 = require("react");
var useAuth_1 = require("@cricket/shared/hooks/useAuth");
var LoginModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, onSuccess = _a.onSuccess, _b = _a.initialMode, initialMode = _b === void 0 ? 'signin' : _b;
    var _c = (0, useAuth_1.useAuth)(), signInWithGoogle = _c.signInWithGoogle, signInWithFacebook = _c.signInWithFacebook, signInWithEmail = _c.signInWithEmail, signInWithHandle = _c.signInWithHandle, signUpWithEmail = _c.signUpWithEmail;
    var _d = (0, react_1.useState)(initialMode), mode = _d[0], setMode = _d[1];
    // Reset mode when modal opens
    react_1.default.useEffect(function () {
        if (isOpen)
            setMode(initialMode);
    }, [isOpen, initialMode]);
    var _e = (0, react_1.useState)(''), email = _e[0], setEmail = _e[1];
    var _f = (0, react_1.useState)(''), password = _f[0], setPassword = _f[1];
    var _g = (0, react_1.useState)(''), name = _g[0], setName = _g[1];
    var _h = (0, react_1.useState)(''), error = _h[0], setError = _h[1];
    var _j = (0, react_1.useState)(false), loading = _j[0], setLoading = _j[1];
    if (!isOpen)
        return null;
    var handleGoogleSignIn = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            alert('Google Sign-In is coming soon!');
            return [2 /*return*/];
        });
    }); };
    var handleEmailAuth = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    setError('');
                    if (!(mode === 'signin')) return [3 /*break*/, 5];
                    if (!email.trim().startsWith('@')) return [3 /*break*/, 2];
                    return [4 /*yield*/, signInWithHandle(email.trim(), password)];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, signInWithEmail(email.trim(), password)];
                case 3:
                    result = _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, signUpWithEmail(email.trim(), password, name)];
                case 6:
                    result = _a.sent();
                    _a.label = 7;
                case 7:
                    if (result.error) {
                        setError(result.error.message);
                        setLoading(false);
                    }
                    else {
                        onSuccess();
                        onClose();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 rounded-3xl max-w-md w-full p-8 relative border border-slate-700">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl">
                    ×
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">
                    {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-slate-400 text-sm mb-6">
                    {mode === 'signin'
            ? 'Sign in to access your cricket stats and teams'
            : 'Join the Cricket Core community'}
                </p>

                {error && (<div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-xl mb-4 text-sm">
                        {error}
                    </div>)}

                {/* Social Login */}
                <div className="grid grid-cols-1 gap-3 mb-4">
                    <button onClick={function () { return alert('Facebook Sign-In is coming soon!'); }} disabled={loading} className="w-full bg-[#1877F2] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-[#1864D9] transition-colors disabled:opacity-50">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Continue with Facebook
                    </button>

                    <button onClick={handleGoogleSignIn} disabled={loading} className="w-full bg-white text-slate-900 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-slate-100 transition-colors disabled:opacity-50">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                    </button>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 h-px bg-slate-700"></div>
                    <span className="text-slate-500 text-xs">OR</span>
                    <div className="flex-1 h-px bg-slate-700"></div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleEmailAuth} className="space-y-4">
                    {mode === 'signup' && (<div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                            <input type="text" value={name} onChange={function (e) { return setName(e.target.value); }} className="w-full bg-slate-800 text-white p-3 rounded-xl border border-slate-700 focus:border-indigo-500 focus:outline-none" placeholder="Your name" required/>
                        </div>)}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            {mode === 'signin' ? 'Email or Handle' : 'Email'}
                        </label>
                        <input type={mode === 'signin' ? 'text' : 'email'} value={email} onChange={function (e) { return setEmail(e.target.value); }} className="w-full bg-slate-800 text-white p-3 rounded-xl border border-slate-700 focus:border-indigo-500 focus:outline-none" placeholder={mode === 'signin' ? 'you@example.com or @handle' : 'you@example.com'} required/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input type="password" value={password} onChange={function (e) { return setPassword(e.target.value); }} className="w-full bg-slate-800 text-white p-3 rounded-xl border border-slate-700 focus:border-indigo-500 focus:outline-none" placeholder="••••••••" required minLength={6}/>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50">
                        {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button onClick={function () { return setMode(mode === 'signin' ? 'signup' : 'signin'); }} className="text-indigo-400 hover:text-indigo-300 text-sm">
                        {mode === 'signin'
            ? "Don't have an account? Sign up"
            : 'Already have an account? Sign in'}
                    </button>
                </div>
            </div>
        </div>);
};
exports.LoginModal = LoginModal;
