"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsPad = void 0;
var react_1 = require("react");
var EventsPad = function (_a) {
    var readOnly = _a.readOnly, compact = _a.compact, onBack = _a.onBack, onMediaCapture = _a.onMediaCapture, onBroadcasterMode = _a.onBroadcasterMode, onNav = _a.onNav, onDeclare = _a.onDeclare, onSubRequest = _a.onSubRequest, matchFormat = _a.matchFormat, onToggleAnalytics = _a.onToggleAnalytics, autoAnalytics = _a.autoAnalytics, onOfficialsClick = _a.onOfficialsClick;
    var isTest = matchFormat === 'Test';
    var btnClass = function (base) {
        return "".concat(base, " ").concat(readOnly ? 'opacity-50 cursor-not-allowed pointer-events-none grayscale' : '', " ").concat(compact ? 'text-xs py-1' : '');
    };
    return (<div className="h-full flex flex-col animate-in zoom-in-95 p-1 gap-2">
            <h3 className="text-center font-black uppercase text-[9px] text-slate-500 tracking-widest shrink-0">Match Actions</h3>
            <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 overflow-y-auto pb-4">
                <button disabled={readOnly} onClick={function () { if (onMediaCapture)
        onMediaCapture(); }} className={btnClass("bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-2 group transition-all p-2")}>
                    <div className="w-10 h-10 rounded-full bg-slate-700 group-hover:bg-indigo-600 flex items-center justify-center text-xl transition-colors">📸</div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white text-center">Media Capture</span>
                </button>
                <button onClick={function () { if (onBroadcasterMode)
        onBroadcasterMode(); }} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-2 group transition-all p-2">
                    <div className="w-10 h-10 rounded-full bg-slate-700 group-hover:bg-green-600 flex items-center justify-center text-xl transition-colors">📺</div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white text-center">Broadcaster Mode</span>
                </button>
                <button disabled={readOnly} onClick={function () { return onNav('declare_confirm'); }} className={btnClass("bg-slate-800 hover:bg-red-900/30 border border-slate-700 hover:border-red-500 rounded-2xl flex flex-col items-center justify-center gap-2 group transition-all p-2")}>
                    <div className="w-10 h-10 rounded-full bg-slate-700 group-hover:bg-red-600 flex items-center justify-center text-xl transition-colors">✋</div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white text-center">Declare Innings</span>
                </button>
                <button disabled={readOnly} onClick={function () { if (onSubRequest)
        onSubRequest(); }} className={btnClass("bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-2 group transition-all p-2")}>
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl group-hover:bg-amber-600 transition-colors">🔁</div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white text-center">Substitute</span>
                </button>
                {onToggleAnalytics && (<button disabled={readOnly} onClick={onToggleAnalytics} className={btnClass("border rounded-2xl flex flex-col items-center justify-center gap-2 group transition-all p-2 ".concat(autoAnalytics ? 'bg-indigo-900/30 border-indigo-500/50 hover:bg-indigo-900/50' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'))}>
                        <div className={"w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors ".concat(autoAnalytics ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-500')}>📍</div>
                        <div className="flex flex-col items-center leading-none">
                            <span className={"text-[9px] font-black uppercase tracking-widest ".concat(autoAnalytics ? 'text-indigo-300' : 'text-slate-400')}>Auto Maps</span>
                            <span className="text-[8px] font-bold uppercase mt-1">{autoAnalytics ? 'ON' : 'OFF'}</span>
                        </div>
                    </button>)}
                {onOfficialsClick && (<button disabled={readOnly} onClick={onOfficialsClick} className={btnClass("bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-2 group transition-all p-2")}>
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl group-hover:bg-purple-600 transition-colors">👔</div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white text-center">Officials</span>
                    </button>)}
                {isTest && (<button disabled={readOnly} onClick={function () { return onNav('end_match_confirm'); }} className={btnClass("bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-2 group transition-all p-2")}>
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl group-hover:bg-purple-600 transition-colors">🏁</div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white text-center">End Match</span>
                    </button>)}
            </div>
            <button onClick={onBack} className="h-12 w-full bg-slate-800 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-700 shrink-0">Back to Scoring</button>
        </div>);
};
exports.EventsPad = EventsPad;
