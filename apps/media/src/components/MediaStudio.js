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
exports.MediaStudio = void 0;
var react_1 = require("react");
var geminiService_1 = require("@cricket/shared/services/geminiService");
var MediaStudio = function (_a) {
    var _b;
    var onBack = _a.onBack, fixtures = _a.fixtures, _c = _a.isEmbedded, isEmbedded = _c === void 0 ? false : _c;
    var _d = (0, react_1.useState)(null), selectedFixture = _d[0], setSelectedFixture = _d[1];
    var _e = (0, react_1.useState)('LIGHT'), theme = _e[0], setTheme = _e[1];
    var _f = (0, react_1.useState)('VISUAL'), mode = _f[0], setMode = _f[1];
    // AI State
    var _g = (0, react_1.useState)(false), isGenerating = _g[0], setIsGenerating = _g[1];
    var _h = (0, react_1.useState)(null), generatedContent = _h[0], setGeneratedContent = _h[1];
    var handleGeneratePress = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedFixture || !selectedFixture.savedState)
                        return [2 /*return*/];
                    setIsGenerating(true);
                    return [4 /*yield*/, (0, geminiService_1.generatePressKit)(selectedFixture, selectedFixture.savedState)];
                case 1:
                    result = _a.sent();
                    setGeneratedContent(result);
                    setIsGenerating(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className={"animate-in slide-in-from-bottom-8 duration-500 pb-20 ".concat(isEmbedded ? '' : 'pt-0')}>
       
       {!isEmbedded && (<div className="flex items-center gap-6 mb-10">
            <button onClick={onBack} className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-black transition-all shadow-sm">←</button>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Studio</span></h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Generate engaging league assets</p>
            </div>
         </div>)}

       <div className="flex gap-4 mb-8">
          <button onClick={function () { return setMode('VISUAL'); }} className={"px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ".concat(mode === 'VISUAL' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-400')}>
            Visual Generator
          </button>
          <button onClick={function () { return setMode('AI_PRESS'); }} className={"px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ".concat(mode === 'AI_PRESS' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-400')}>
            AI Press Room
          </button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* CONTROL PANEL */}
          <div className="space-y-8">
             <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-lg">
                <h3 className="text-xl font-black text-slate-900 mb-6">Source Selection</h3>
                <div className="space-y-6">
                   <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Source Match</label>
                      <select onChange={function (e) { return setSelectedFixture(fixtures.find(function (f) { return f.id === e.target.value; }) || null); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none">
                         <option value="">-- Choose Fixture --</option>
                         {fixtures.map(function (f) { return <option key={f.id} value={f.id}>{f.teamAName} vs {f.teamBName}</option>; })}
                      </select>
                   </div>
                   
                   {mode === 'VISUAL' && (<div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Visual Theme</label>
                          <div className="flex gap-2">
                             {['LIGHT', 'DARK', 'NEON'].map(function (t) { return (<button key={t} onClick={function () { return setTheme(t); }} className={"flex-1 py-3 rounded-xl text-[10px] font-black uppercase border transition-all ".concat(theme === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200')}>{t}</button>); })}
                          </div>
                       </div>)}

                   {mode === 'AI_PRESS' && (<button onClick={handleGeneratePress} disabled={!selectedFixture || isGenerating} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95 disabled:opacity-50">
                         {isGenerating ? 'AI is Writing...' : 'Generate Press Kit'}
                       </button>)}
                </div>
             </div>
          </div>
          
          {/* PREVIEW PANEL */}
          <div className="bg-slate-100 p-8 rounded-[2.5rem] border border-slate-200 flex items-center justify-center relative overflow-hidden min-h-[400px]">
             {selectedFixture ? (mode === 'VISUAL' ? (<div className={"aspect-[4/5] w-full max-w-sm rounded-xl p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl transition-all duration-500 ".concat(theme === 'LIGHT' ? 'bg-white text-black' : theme === 'NEON' ? 'bg-black border-2 border-pink-500 text-white' : 'bg-slate-900 text-white')}>
                       <div className="z-10 text-center">
                          <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-8">Match Day Live</div>
                          <div className="flex justify-between items-center mb-6 px-4">
                             <div className="flex flex-col items-center">
                                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-black mb-2 text-black">{selectedFixture.teamAName.charAt(0)}</div>
                                <span className="font-black text-xl leading-none">{selectedFixture.teamAScore || '0/0'}</span>
                             </div>
                             <div className="text-3xl font-black opacity-30">VS</div>
                             <div className="flex flex-col items-center">
                                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-black mb-2 text-black">{selectedFixture.teamBName.charAt(0)}</div>
                                <span className="font-black text-xl leading-none">{selectedFixture.teamBScore || '0/0'}</span>
                             </div>
                          </div>
                          <div className="py-2 px-6 rounded-lg inline-block text-[10px] font-black uppercase tracking-widest bg-black text-white">{selectedFixture.status}</div>
                       </div>
                    </div>) : (<div className="w-full max-w-md space-y-4 h-full overflow-y-auto custom-scrollbar">
                        {isGenerating && (<div className="text-center py-20">
                                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Drafting Article...</p>
                            </div>)}
                        {generatedContent && (<>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                    <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Headline</div>
                                    <h3 className="text-xl font-serif font-black text-slate-900">{generatedContent.headline}</h3>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Social Posts</div>
                                    <div className="space-y-3">
                                        {(_b = generatedContent.socialPosts) === null || _b === void 0 ? void 0 : _b.map(function (post, i) { return (<div key={i} className="p-3 bg-slate-50 rounded-xl text-xs font-medium text-slate-700 italic border border-slate-100">
                                                "{post}"
                                            </div>); })}
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Match Report</div>
                                    <p className="text-sm leading-relaxed text-slate-600">{generatedContent.summary}</p>
                                </div>
                            </>)}
                        {!isGenerating && !generatedContent && (<div className="text-center py-20 text-slate-400 text-xs font-bold uppercase">Ready to generate</div>)}
                    </div>)) : (<div className="text-slate-400 font-bold uppercase text-xs">Select a match to begin</div>)}
          </div>
       </div>
    </div>);
};
exports.MediaStudio = MediaStudio;
