"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkActionModal = void 0;
var react_1 = require("react");
var BulkActionModal = function (_a) {
    var isOpen = _a.isOpen, mode = _a.mode, onClose = _a.onClose, onConfirm = _a.onConfirm, currentUserPassword = _a.currentUserPassword;
    var _b = (0, react_1.useState)(''), inputText = _b[0], setInputText = _b[1];
    var _c = (0, react_1.useState)(''), password = _c[0], setPassword = _c[1];
    var _d = (0, react_1.useState)('INPUT'), step = _d[0], setStep = _d[1];
    var _e = (0, react_1.useState)(''), error = _e[0], setError = _e[1];
    if (!isOpen)
        return null;
    var handleVerify = function () {
        if (password === currentUserPassword) {
            var lines = inputText.split('\n').map(function (l) { return l.trim(); }).filter(function (l) { return l.length > 0; });
            onConfirm(lines);
        }
        else {
            setError('Incorrect Admin Password');
        }
    };
    return (<div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[300] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 overflow-hidden flex flex-col max-h-[85vh]">
                <div className="bg-slate-900 p-8 text-white">
                    <h3 className="text-xl font-black mb-1">Bulk Import {mode === 'TEAMS' ? 'Teams' : 'Players'}</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Administrative Action</p>
                </div>

                <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                    {step === 'INPUT' ? (<>
                            <p className="text-sm text-slate-600 mb-4 font-medium">
                                {mode === 'TEAMS'
                ? "Paste team names below (one per line). Duplicates will be handled automatically."
                : "Paste players below or upload CSV. Format: Name, Handle, Role"}
                            </p>

                            {/* CSV Upload Option (Players Only) */}
                            {mode === 'PLAYERS' && (<div className="mb-4">
                                    <label className="block w-full p-4 border-2 border-dashed border-slate-300 rounded-xl text-center cursor-pointer hover:border-indigo-400 hover:bg-slate-50 transition-all group">
                                        <input type="file" accept=".csv" className="hidden" onChange={function (e) {
                    var _a;
                    var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (file) {
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            var _a;
                            var text = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                            // Simple CSV parser: Name, Handle, Role
                            // Example: John Doe, @john, Batsman
                            var rows = text.split('\n').slice(1); // Skip header
                            var formatted = rows.map(function (r) {
                                var _a = r.split(',').map(function (c) { return c.trim(); }), name = _a[0], handle = _a[1], role = _a[2];
                                if (!name)
                                    return null;
                                return "".concat(name).concat(role ? " - ".concat(role) : '');
                            }).filter(Boolean).join('\n');
                            setInputText(formatted);
                        };
                        reader.readAsText(file);
                    }
                }}/>
                                        <span className="text-xs font-black uppercase text-slate-400 group-hover:text-indigo-600">
                                            📂 Upload CSV (Name, Handle, Role)
                                        </span>
                                    </label>
                                    <div className="text-center text-[10px] font-bold text-slate-300 uppercase my-2">- OR -</div>
                                </div>)}

                            <textarea value={inputText} onChange={function (e) { return setInputText(e.target.value); }} placeholder={mode === 'TEAMS' ? "Team A\nTeam B..." : "John Doe - Batsman\nJane Smith\n..."} className="w-full h-48 bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm outline-none focus:border-indigo-500 resize-none"/>
                        </>) : (<div className="py-10 text-center">
                            <div className="text-4xl mb-4">🔒</div>
                            <h4 className="text-lg font-black text-slate-900 mb-2">Security Check</h4>
                            <p className="text-xs text-slate-500 mb-6">Please enter your admin password to authorize this bulk update.</p>
                            <input type="password" value={password} onChange={function (e) { return setPassword(e.target.value); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold text-center outline-none focus:border-indigo-500" placeholder="Admin Password" autoFocus/>
                            {error && <p className="text-red-500 text-xs font-bold mt-4 uppercase tracking-widest animate-pulse">{error}</p>}
                        </div>)}
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-4">
                    <button onClick={onClose} className="flex-1 py-4 text-slate-400 font-black uppercase text-xs hover:text-slate-600 transition-all">Cancel</button>
                    {step === 'INPUT' ? (<button onClick={function () { return setStep('VERIFY'); }} disabled={!inputText.trim()} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-indigo-500 shadow-lg disabled:opacity-50">
                            Proceed to Verify
                        </button>) : (<button onClick={handleVerify} className="flex-1 py-4 bg-emerald-500 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-emerald-400 shadow-lg">
                            Confirm Import
                        </button>)}
                </div>
            </div>
        </div>);
};
exports.BulkActionModal = BulkActionModal;
