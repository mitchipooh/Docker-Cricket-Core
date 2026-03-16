"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditTournamentModal = void 0;
var react_1 = require("react");
var EditTournamentModal = function (_a) {
    var tournament = _a.tournament, onSave = _a.onSave, onClose = _a.onClose, onDelete = _a.onDelete;
    var _b = (0, react_1.useState)({
        name: tournament.name,
        format: tournament.format,
        overs: tournament.overs,
        status: tournament.status,
        startDate: tournament.startDate || '',
        endDate: tournament.endDate || '',
        gameStartTime: tournament.gameStartTime || '',
        description: tournament.description || ''
    }), formData = _b[0], setFormData = _b[1];
    var handleSave = function () {
        onSave(formData);
        onClose();
    };
    return (<div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-[250] flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-xl shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Edit Tournament</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-xl">✕</button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Tournament Name</label>
                        <input value={formData.name} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }} className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold text-sm outline-none focus:ring-2 ring-indigo-500"/>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Format</label>
                            <select value={formData.format} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { format: e.target.value })); }} className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold text-sm outline-none">
                                <option value="T20">T20</option>
                                <option value="ODI">ODI</option>
                                <option value="TEST">TEST</option>
                                <option value="The 100">The 100</option>
                                <option value="T10">T10</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Overs</label>
                            <input type="number" value={formData.overs} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { overs: parseInt(e.target.value) })); }} className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold text-sm outline-none"/>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Default Start Time</label>
                            <input type="time" value={formData.gameStartTime} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { gameStartTime: e.target.value })); }} className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold text-sm outline-none"/>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Status</label>
                            <select value={formData.status} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { status: e.target.value })); }} className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold text-sm outline-none">
                                <option value="Upcoming">Upcoming</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Completed">Completed</option>
                                <option value="Draft">Draft</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Start Date</label>
                            <input type="date" value={formData.startDate} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { startDate: e.target.value })); }} className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold text-sm outline-none"/>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">End Date</label>
                            <input type="date" value={formData.endDate} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { endDate: e.target.value })); }} className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold text-sm outline-none"/>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Description / About</label>
                        <textarea value={formData.description} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { description: e.target.value })); }} placeholder="Details about this tournament..." className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold text-sm outline-none min-h-[100px] resize-none"/>
                    </div>

                    <div className="pt-6 flex flex-col gap-3">
                        <button onClick={handleSave} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-500 transition-all">
                            Save Updates
                        </button>
                        <button onClick={function () {
            if (confirm('Are you sure you want to delete this tournament? This cannot be undone.')) {
                onDelete();
                onClose();
            }
        }} className="w-full py-4 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-50 hover:rounded-2xl transition-all">
                            Delete Tournament
                        </button>
                    </div>
                </div>
            </div>
        </div>);
};
exports.EditTournamentModal = EditTournamentModal;
