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
exports.ProfileSetup = void 0;
var react_1 = require("react");
var centralZoneService_1 = require("@cricket/shared/services/centralZoneService");
var idGenerator_1 = require("@cricket/shared/utils/idGenerator");
var ProfileSetup = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    var onComplete = _a.onComplete, onCancel = _a.onCancel, _0 = _a.initialMode, initialMode = _0 === void 0 ? 'CREATE' : _0, existingProfile = _a.existingProfile;
    var _1 = (0, react_1.useState)(initialMode), setupMode = _1[0], setSetupMode = _1[1];
    var _2 = (0, react_1.useState)((existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.name) || ''), name = _2[0], setName = _2[1];
    var _3 = (0, react_1.useState)((existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.handle) || ''), handle = _3[0], setHandle = _3[1];
    var _4 = (0, react_1.useState)((existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.email) || ''), email = _4[0], setEmail = _4[1];
    var _5 = (0, react_1.useState)((existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.password) || ''), password = _5[0], setPassword = _5[1];
    var _6 = (0, react_1.useState)((existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.role) || 'Administrator'), role = _6[0], setRole = _6[1];
    var _7 = (0, react_1.useState)(''), error = _7[0], setError = _7[1];
    var _8 = (0, react_1.useState)(''), successMsg = _8[0], setSuccessMsg = _8[1];
    var _9 = (0, react_1.useState)(false), isProcessing = _9[0], setIsProcessing = _9[1];
    var _10 = (0, react_1.useState)(false), showPassword = _10[0], setShowPassword = _10[1];
    var googleClientId = (_b = window.wpApiSettings) === null || _b === void 0 ? void 0 : _b.google_client_id;
    // SWITCHED TO JPG
    var logoSrc = ((_c = window.wpApiSettings) === null || _c === void 0 ? void 0 : _c.plugin_url)
        ? "".concat(window.wpApiSettings.plugin_url, "logo.jpg")
        : 'logo.jpg';
    // Scorer/Coach/Player specific states...
    var _11 = (0, react_1.useState)(((_e = (_d = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.scorerDetails) === null || _d === void 0 ? void 0 : _d.hourlyRate) === null || _e === void 0 ? void 0 : _e.toString()) || ''), hourlyRate = _11[0], setHourlyRate = _11[1];
    var _12 = (0, react_1.useState)(((_g = (_f = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.scorerDetails) === null || _f === void 0 ? void 0 : _f.experienceYears) === null || _g === void 0 ? void 0 : _g.toString()) || ((_j = (_h = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.coachDetails) === null || _h === void 0 ? void 0 : _h.experienceYears) === null || _j === void 0 ? void 0 : _j.toString()) || ''), experience = _12[0], setExperience = _12[1];
    var _13 = (0, react_1.useState)(((_k = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.scorerDetails) === null || _k === void 0 ? void 0 : _k.bio) || ''), bio = _13[0], setBio = _13[1];
    var _14 = (0, react_1.useState)(((_l = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.coachDetails) === null || _l === void 0 ? void 0 : _l.level) || 'Level 1'), coachLevel = _14[0], setCoachLevel = _14[1];
    var _15 = (0, react_1.useState)(((_m = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.coachDetails) === null || _m === void 0 ? void 0 : _m.specialty) || 'General'), specialty = _15[0], setSpecialty = _15[1];
    var _16 = (0, react_1.useState)(((_o = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.playerDetails) === null || _o === void 0 ? void 0 : _o.battingStyle) || 'Right-hand'), battingStyle = _16[0], setBattingStyle = _16[1];
    var _17 = (0, react_1.useState)(((_p = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.playerDetails) === null || _p === void 0 ? void 0 : _p.bowlingStyle) || 'Right-arm Medium'), bowlingStyle = _17[0], setBowlingStyle = _17[1];
    var _18 = (0, react_1.useState)(((_q = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.playerDetails) === null || _q === void 0 ? void 0 : _q.primaryRole) || 'Batsman'), playerRole = _18[0], setPlayerRole = _18[1];
    var _19 = (0, react_1.useState)(((_r = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.playerDetails) === null || _r === void 0 ? void 0 : _r.isHireable) || ((_s = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.scorerDetails) === null || _s === void 0 ? void 0 : _s.isHireable) || false), isHireable = _19[0], setIsHireable = _19[1];
    // New Personalized Fields
    var _20 = (0, react_1.useState)(((_t = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.playerDetails) === null || _t === void 0 ? void 0 : _t.nickname) || ''), nickname = _20[0], setNickname = _20[1];
    var _21 = (0, react_1.useState)(((_u = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.playerDetails) === null || _u === void 0 ? void 0 : _u.age) || ''), age = _21[0], setAge = _21[1];
    var _22 = (0, react_1.useState)(((_w = (_v = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.playerDetails) === null || _v === void 0 ? void 0 : _v.jerseyNumber) === null || _w === void 0 ? void 0 : _w.toString()) || ''), jerseyNumber = _22[0], setJerseyNumber = _22[1];
    var _23 = (0, react_1.useState)(((_x = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.playerDetails) === null || _x === void 0 ? void 0 : _x.favoritePlayer) || ''), favPlayer = _23[0], setFavPlayer = _23[1];
    var _24 = (0, react_1.useState)(((_y = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.playerDetails) === null || _y === void 0 ? void 0 : _y.favoriteWorldCupMoment) || ''), favMoment = _24[0], setFavMoment = _24[1];
    var _25 = (0, react_1.useState)(((_z = existingProfile === null || existingProfile === void 0 ? void 0 : existingProfile.playerDetails) === null || _z === void 0 ? void 0 : _z.favoriteGround) || ''), favGround = _25[0], setFavGround = _25[1];
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            setError('');
            setSuccessMsg('');
            if (setupMode === 'LOGIN') {
                handleLogin();
            }
            else if (setupMode === 'RECOVER') {
                handleRecover();
            }
            else {
                handleCreate();
            }
            return [2 /*return*/];
        });
    }); };
    var handleRecover = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!handle) {
                setError('Please enter your User Handle to reset.');
                return [2 /*return*/];
            }
            setIsProcessing(true);
            // Simulate recovery (In real app, this sends email. Here we just mock success for UX)
            setTimeout(function () {
                setIsProcessing(false);
                setSuccessMsg("Recovery request sent for ".concat(handle, ". Please contact your Org Admin."));
            }, 1500);
            return [2 /*return*/];
        });
    }); };
    var handleLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
        var devProfile, sanitizedHandle, searchId, cloudData, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!handle || !password) {
                        setError('Please enter your handle and password');
                        return [2 /*return*/];
                    }
                    // Developer Backdoor
                    if (handle.toLowerCase() === 'trinity' && password === '123#') {
                        devProfile = {
                            id: 'dev-dennis-trinity',
                            name: 'Dennis',
                            handle: 'Trinity',
                            role: 'Administrator', // Start as Admin, can switch later
                            createdAt: Date.now(),
                            password: '123#'
                        };
                        onComplete(devProfile);
                        return [2 /*return*/];
                    }
                    setIsProcessing(true);
                    sanitizedHandle = handle.startsWith('@') ? handle : "@".concat(handle);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    searchId = sanitizedHandle.replace('@', '').toLowerCase();
                    return [4 /*yield*/, (0, centralZoneService_1.fetchUserData)(searchId)];
                case 2:
                    cloudData = _a.sent();
                    if (cloudData && cloudData.profile) {
                        if (cloudData.profile.password === password) {
                            onComplete(cloudData.profile);
                        }
                        else {
                            setError('Incorrect password for this handle.');
                        }
                    }
                    else {
                        setError('Account not found. Ensure you are using the correct handle.');
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    setError('Connection error. Please try again.');
                    return [3 /*break*/, 5];
                case 4:
                    setIsProcessing(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleCreate = function () {
        if (!name || !handle || !password) {
            setError('All fields are required.');
            return;
        }
        var sanitizedHandle = handle.startsWith('@') ? handle : "@".concat(handle);
        createProfile({
            id: sanitizedHandle.replace('@', '').toLowerCase(),
            name: name,
            handle: sanitizedHandle,
            password: password,
            role: role,
            email: email
        });
    };
    var createProfile = function (baseData) {
        var newProfile = {
            id: baseData.id || (0, idGenerator_1.generateId)('user'),
            name: baseData.name || 'Anonymous',
            handle: baseData.handle || '@anon',
            password: baseData.password,
            role: role,
            email: baseData.email,
            googleId: baseData.googleId,
            avatarUrl: baseData.avatarUrl,
            createdAt: Date.now(),
            scorerDetails: role === 'Scorer' ? {
                isHireable: true,
                hourlyRate: Number(hourlyRate) || 20,
                experienceYears: Number(experience) || 0,
                bio: bio || 'Professional Scorer available for league matches.'
            } : undefined,
            coachDetails: role === 'Coach' ? {
                level: coachLevel,
                specialty: specialty,
                experienceYears: Number(experience) || 0
            } : undefined,
            playerDetails: (role === 'Player' || role === 'Captain') ? {
                battingStyle: battingStyle,
                bowlingStyle: bowlingStyle,
                primaryRole: playerRole,
                lookingForClub: true,
                isHireable: isHireable,
                // Personalized
                nickname: nickname,
                age: age,
                favoritePlayer: favPlayer,
                favoriteWorldCupMoment: favMoment,
                favoriteGround: favGround,
                jerseyNumber: Number(jerseyNumber) || undefined
            } : undefined
        };
        onComplete(newProfile);
    };
    (0, react_1.useEffect)(function () {
        if (!googleClientId || setupMode !== 'CREATE')
            return;
        // ... Google Auth logic (same as before) ...
    }, [googleClientId, setupMode]);
    return (<div className="min-h-screen flex items-center justify-center p-6 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-md w-full bg-slate-800 rounded-[32px] p-10 border border-slate-700 shadow-2xl relative z-10 animate-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex flex-col items-center mb-8 relative">
          {onCancel && (<button onClick={onCancel} className="absolute left-0 top-0 text-slate-400 hover:text-white transition-colors text-xl font-black" title="Go Back">
              ←
            </button>)}
          <img src={logoSrc} alt="Cricket Core" className="w-32 h-32 object-contain mb-4 drop-shadow-2xl"/>
          <h1 className="text-3xl font-black text-white text-center">Cricket-Core 2026</h1>
          <p className="text-slate-400 text-center mt-2">
            {setupMode === 'CREATE' ? 'Join the global network' : setupMode === 'RECOVER' ? 'Recover Account' : 'Resume your career'}
          </p>
        </div>

        <div className="bg-slate-900/50 p-1 rounded-2xl flex mb-8 border border-white/5">
          <button onClick={function () { setSetupMode('CREATE'); setError(''); setSuccessMsg(''); }} className={"flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ".concat(setupMode === 'CREATE' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300')}>
            Create
          </button>
          <button onClick={function () { setSetupMode('LOGIN'); setError(''); setSuccessMsg(''); }} className={"flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ".concat(setupMode === 'LOGIN' || setupMode === 'RECOVER' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300')}>
            Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (<div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs font-bold text-center animate-in shake">
              {error}
            </div>)}
          {successMsg && (<div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-xs font-bold text-center animate-in zoom-in">
              {successMsg}
            </div>)}

          {setupMode === 'CREATE' && (<div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Full Name</label>
              <input type="text" required value={name} onChange={function (e) { return setName(e.target.value); }} placeholder="e.g. Dennis" className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"/>
            </div>)}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">System Handle</label>
            <div className="relative">
              <span className="absolute left-5 top-4 text-slate-500 font-bold">@</span>
              <input type="text" required value={handle.replace('@', '')} onChange={function (e) { return setHandle(e.target.value); }} placeholder="Trinity" className="w-full bg-slate-900 border border-slate-700 rounded-2xl pl-10 pr-5 py-4 text-white font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"/>
            </div>
          </div>

          {setupMode === 'CREATE' && (<div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Email Address</label>
              <input type="email" required value={email} onChange={function (e) { return setEmail(e.target.value); }} placeholder="you@example.com" className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"/>
            </div>)}

          {setupMode !== 'RECOVER' && (<div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Secure Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} required value={password} onChange={function (e) { return setPassword(e.target.value); }} placeholder="••••••••" className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 pr-12 text-white font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"/>
                <button type="button" onClick={function () { return setShowPassword(!showPassword); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors" title={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                    </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>)}
                </button>
              </div>
            </div>)}

          {setupMode === 'LOGIN' && (<div className="flex items-center gap-3 px-1">
              <input type="checkbox" id="keepSignedIn" className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 bg-slate-800" defaultChecked/>
              <label htmlFor="keepSignedIn" className="text-xs font-bold text-slate-400 select-none cursor-pointer">Keep me signed in</label>
            </div>)}

          {setupMode === 'LOGIN' && (<div className="text-right">
              <button type="button" onClick={function () { setSetupMode('RECOVER'); setError(''); }} className="text-[10px] font-bold text-slate-400 hover:text-indigo-400 transition-colors">
                Forgot Password?
              </button>
            </div>)}
          <div className="space-y-3 mt-4">
            <button type="submit" disabled={isProcessing} className="w-full bg-white text-slate-900 font-black py-5 rounded-2xl transition-all shadow-xl hover:bg-slate-200 active:scale-95 uppercase tracking-[0.2em] text-xs disabled:opacity-50">
              {isProcessing ? 'Processing...' : setupMode === 'LOGIN' ? 'Login' : setupMode === 'RECOVER' ? 'Reset Password' : 'Create Account'}
            </button>

            {(onCancel || setupMode === 'RECOVER') && (<button type="button" onClick={function () {
                if (setupMode === 'RECOVER')
                    setSetupMode('LOGIN');
                else if (onCancel)
                    onCancel();
            }} className="w-full bg-transparent text-slate-500 font-bold py-3 rounded-2xl hover:text-white hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px]">
                {setupMode === 'RECOVER' ? 'Back to Login' : 'Cancel'}
              </button>)}
          </div>
        </form>
      </div>
    </div>);
};
exports.ProfileSetup = ProfileSetup;
