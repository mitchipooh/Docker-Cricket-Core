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
exports.MatchResultEntryForm = void 0;
var react_1 = require("react");
var pointsCalculator_1 = require("@cricket/shared/utils/pointsCalculator");
var pointsEngine_1 = require("@cricket/shared/competition/pointsEngine");
var MatchResultEntryForm = function (_a) {
    var fixture = _a.fixture, config = _a.config, onSave = _a.onSave, onCancel = _a.onCancel;
    // Merge with defaults to handle legacy tournaments missing new fields
    var mergedConfig = (0, react_1.useMemo)(function () { return (__assign(__assign({}, pointsEngine_1.DEFAULT_POINTS_CONFIG), config)); }, [config]);
    var _b = (0, react_1.useState)({
        resultType: 'OUTRIGHT_WIN',
        winnerSide: 'A',
        firstInningsWinnerId: fixture.teamAId, // Initial assumption
        firstInningsResult: 'LEAD',
        isIncomplete: false,
        teamARuns: 0,
        teamBRuns: 0,
        teamAWickets: 0,
        teamBWickets: 0,
    }), formData = _b[0], setFormData = _b[1];
    var sideAPoints = (0, react_1.useMemo)(function () { return (0, pointsCalculator_1.calculatePointsForSide)('A', formData, mergedConfig); }, [formData, mergedConfig]);
    var sideBPoints = (0, react_1.useMemo)(function () { return (0, pointsCalculator_1.calculatePointsForSide)('B', formData, mergedConfig); }, [formData, mergedConfig]);
    var isValid = sideAPoints.isValid && sideBPoints.isValid;
    return (<div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="bg-slate-900 p-8 text-white">
                <h3 className="text-2xl font-black italic uppercase tracking-tight">Record Match Result</h3>
                <p className="text-indigo-400 font-bold text-xs uppercase tracking-widest mt-1">{fixture.teamAName} vs {fixture.teamBName}</p>
            </div>

            <div className="p-8 space-y-8">
                {/* Results Logic */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Match Outcome</label>
                        <div className="flex flex-col gap-2">
                            <select value={formData.isIncomplete ? 'INCOMPLETE' : 'OUTRIGHT'} onChange={function (e) { return setFormData(function (p) { return (__assign(__assign({}, p), { isIncomplete: e.target.value === 'INCOMPLETE' })); }); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold outline-none focus:ring-2 ring-indigo-500">
                                <option value="OUTRIGHT">Outright Result</option>
                                <option value="INCOMPLETE">Incomplete Match (Innings Based)</option>
                            </select>

                            {!formData.isIncomplete && (<select value={formData.winnerSide} onChange={function (e) { return setFormData(function (p) { return (__assign(__assign({}, p), { winnerSide: e.target.value })); }); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold outline-none">
                                    <option value="A">{fixture.teamAName} Won Outright</option>
                                    <option value="B">{fixture.teamBName} Won Outright</option>
                                    <option value="TIE">Match Tied</option>
                                </select>)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">1st Innings Performance</label>
                        <div className="flex flex-col gap-2">
                            <select value={formData.firstInningsResult || ''} onChange={function (e) { return setFormData(function (p) { return (__assign(__assign({}, p), { firstInningsResult: e.target.value })); }); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold outline-none">
                                <option value="LEAD">{fixture.teamAName} 1st Innings Lead</option>
                                <option value="TIE">1st Innings Tied</option>
                                <option value="LOSS">{fixture.teamAName} 1st Innings Loss</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-900 uppercase text-center">{fixture.teamAName}</h4>
                        <div className="flex gap-4">
                            <StatInput label="Runs" value={formData.teamARuns} onChange={function (v) { return setFormData(function (p) { return (__assign(__assign({}, p), { teamARuns: v })); }); }}/>
                            <StatInput label="Wkts Taken" value={formData.teamAWickets} onChange={function (v) { return setFormData(function (p) { return (__assign(__assign({}, p), { teamAWickets: v })); }); }}/>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-900 uppercase text-center">{fixture.teamBName}</h4>
                        <div className="flex gap-4">
                            <StatInput label="Runs" value={formData.teamBRuns} onChange={function (v) { return setFormData(function (p) { return (__assign(__assign({}, p), { teamBRuns: v })); }); }}/>
                            <StatInput label="Wkts Taken" value={formData.teamBWickets} onChange={function (v) { return setFormData(function (p) { return (__assign(__assign({}, p), { teamBWickets: v })); }); }}/>
                        </div>
                    </div>
                </div>

                {/* Points Preview */}
                <div className="grid grid-cols-2 gap-4">
                    <PointsCard side="A" name={fixture.teamAName} calculation={sideAPoints}/>
                    <PointsCard side="B" name={fixture.teamBName} calculation={sideBPoints}/>
                </div>

                {(!isValid) && (<div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-3 animate-bounce">
                        <span className="text-xl">⚠️</span>
                        <span>{sideAPoints.error || sideBPoints.error}</span>
                    </div>)}

                <div className="flex gap-4 pt-4">
                    <button onClick={onCancel} className="flex-1 py-4 text-slate-400 font-black uppercase text-xs tracking-widest">Cancel</button>
                    <button disabled={!isValid} onClick={function () { return onSave(fixture.id, formData); }} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl disabled:opacity-50 transition-all">
                        Confirm & Save Result
                    </button>
                </div>
            </div>
        </div>);
};
exports.MatchResultEntryForm = MatchResultEntryForm;
var StatInput = function (_a) {
    var label = _a.label, value = _a.value, onChange = _a.onChange;
    return (<div className="flex-1 flex flex-col items-center gap-1">
        <span className="text-[9px] font-black text-slate-400 uppercase">{label}</span>
        <input type="number" value={value} onChange={function (e) { return onChange(parseInt(e.target.value) || 0); }} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-center font-black outline-none focus:ring-2 ring-indigo-500"/>
    </div>);
};
var PointsCard = function (_a) {
    var name = _a.name, calculation = _a.calculation;
    return (<div className={"p-5 rounded-3xl border transition-all ".concat(calculation.isValid ? 'bg-indigo-50/50 border-indigo-100' : 'bg-red-50 border-red-100')}>
        <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-black text-slate-400 uppercase truncate max-w-[100px]">{name}</span>
            <span className={"text-2xl font-black ".concat(calculation.isValid ? 'text-indigo-600' : 'text-red-600')}>{calculation.total}</span>
        </div>
        <div className="space-y-1">
            <PointRow label="Match" value={calculation.matchPoints}/>
            <PointRow label="Innings" value={calculation.inningPoints}/>
            <PointRow label="Batting" value={calculation.battingBonus}/>
            <PointRow label="Bowling" value={calculation.bowlingBonus}/>
        </div>
    </div>);
};
var PointRow = function (_a) {
    var label = _a.label, value = _a.value;
    return (<div className="flex justify-between text-[10px] items-center">
        <span className="text-slate-500 font-bold uppercase tracking-tight">{label}</span>
        <span className="font-black text-slate-900">+{value}</span>
    </div>);
};
