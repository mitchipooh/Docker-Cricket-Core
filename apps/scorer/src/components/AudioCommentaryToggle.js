"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioCommentaryToggle = void 0;
var react_1 = require("react");
var AudioCommentaryToggle = function (_a) {
    var enabled = _a.enabled, speaking = _a.speaking, onToggle = _a.onToggle, onOpenSettings = _a.onOpenSettings, isSupported = _a.isSupported;
    if (!isSupported) {
        return (<div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-400">
                <span>🔇</span>
                <span>Audio not supported</span>
            </div>);
    }
    return (<div className="flex items-center gap-2">
            <button onClick={onToggle} className={"flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ".concat(enabled
            ? 'bg-emerald-500 text-white hover:bg-emerald-600'
            : 'bg-slate-200 text-slate-600 hover:bg-slate-300')} title={enabled ? 'Disable audio commentary' : 'Enable audio commentary'}>
                <span className="text-base">{enabled ? '🔊' : '🔇'}</span>
                <span>{enabled ? 'Commentary On' : 'Commentary Off'}</span>
                {speaking && enabled && (<span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>)}
            </button>

            {enabled && (<button onClick={onOpenSettings} className="w-8 h-8 flex items-center justify-center bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-all" title="Audio settings">
                    ⚙️
                </button>)}
        </div>);
};
exports.AudioCommentaryToggle = AudioCommentaryToggle;
