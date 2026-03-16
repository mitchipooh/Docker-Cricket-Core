"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerEditModal = void 0;
var react_1 = require("react");
var PlayerEditModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, teamName = _a.teamName, currentPlayerId = _a.currentPlayerId, currentPlayerName = _a.currentPlayerName, role = _a.role, availablePlayers = _a.availablePlayers, onReplace = _a.onReplace, onRetire = _a.onRetire, onInjury = _a.onInjury;
    var _b = (0, react_1.useState)('REPLACE'), action = _b[0], setAction = _b[1];
    var _c = (0, react_1.useState)(''), selectedPlayerId = _c[0], setSelectedPlayerId = _c[1];
    var _d = (0, react_1.useState)('Retired Hurt'), retirementType = _d[0], setRetirementType = _d[1];
    if (!isOpen)
        return null;
    var handleSave = function () {
        if (action === 'REPLACE') {
            if (selectedPlayerId && selectedPlayerId !== currentPlayerId) {
                // Map the capitalized Role to the lowercase internal role expected by the engine
                var internalRole = role === 'Striker' ? 'striker' : role === 'NonStriker' ? 'nonStriker' : 'bowler';
                onReplace(currentPlayerId, selectedPlayerId, internalRole);
                onClose();
            }
        }
        else if (action === 'RETIRE' && onRetire) {
            onRetire(currentPlayerId, retirementType);
            onClose();
        }
        else if (action === 'INJURY' && onInjury && selectedPlayerId) {
            onInjury(selectedPlayerId);
            onClose();
        }
    };
    return (<div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95">
                <div className="bg-slate-100 p-6 border-b border-slate-200">
                    <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">Edit {role}</h3>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{currentPlayerName}</p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Action Selector */}
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button onClick={function () { return setAction('REPLACE'); }} className={"flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ".concat(action === 'REPLACE' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400')}>
                            Correction
                        </button>

                        {role !== 'Bowler' ? (<button onClick={function () { return setAction('RETIRE'); }} className={"flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ".concat(action === 'RETIRE' ? 'bg-white shadow-sm text-red-600' : 'text-slate-400')}>
                                Retire
                            </button>) : (<button onClick={function () { return setAction('INJURY'); }} className={"flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ".concat(action === 'INJURY' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-400')}>
                                Injury
                            </button>)}
                    </div>

                    {action === 'REPLACE' && (<div className="space-y-4">
                            <p className="text-xs text-slate-500">
                                Select the correct player who should be <strong>{role}</strong>. This will retroactively fix the current ball state but won't change history.
                            </p>
                            <UserSelect available={availablePlayers} current={currentPlayerId} selected={selectedPlayerId} onChange={setSelectedPlayerId}/>
                        </div>)}

                    {action === 'INJURY' && (<div className="space-y-4">
                            <p className="text-xs text-slate-500">
                                <strong>Injury Replacement:</strong> The new bowler will complete the current over.
                            </p>
                            <UserSelect available={availablePlayers} current={currentPlayerId} selected={selectedPlayerId} onChange={setSelectedPlayerId}/>
                        </div>)}

                    {action === 'RETIRE' && (<div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-red-500 px-1">Retirement Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={function () { return setRetirementType('Retired Hurt'); }} className={"p-3 rounded-xl border-2 text-xs font-bold transition-all ".concat(retirementType === 'Retired Hurt' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-100 bg-slate-50 text-slate-400')}>
                                        🤕 Retired Hurt
                                        <span className="block text-[9px] font-normal mt-1 text-slate-500">Can return later (Not Out)</span>
                                    </button>
                                    <button onClick={function () { return setRetirementType('Retired Out'); }} className={"p-3 rounded-xl border-2 text-xs font-bold transition-all ".concat(retirementType === 'Retired Out' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-100 bg-slate-50 text-slate-400')}>
                                        🛑 Retired Out
                                        <span className="block text-[9px] font-normal mt-1 text-slate-500">Cannot return (Wicket)</span>
                                    </button>
                                </div>
                            </div>
                        </div>)}
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 rounded-xl transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={(action === 'REPLACE' || action === 'INJURY') && !selectedPlayerId} className="flex-1 py-4 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                        Confirm
                    </button>
                </div>
            </div>
        </div>);
};
exports.PlayerEditModal = PlayerEditModal;
// Helper component to dry up the select logic
var UserSelect = function (_a) {
    var available = _a.available, current = _a.current, selected = _a.selected, onChange = _a.onChange;
    return (<div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 px-1">Swap With</label>
        <select value={selected} onChange={function (e) { return onChange(e.target.value); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500">
            <option value="">Select teammate...</option>
            {available.filter(function (p) { return p.id !== current; }).map(function (p) { return (<option key={p.id} value={p.id}>{p.name}</option>); })}
        </select>
    </div>);
};
