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
exports.UmpireReportForm = void 0;
var react_1 = require("react");
var UmpireReportForm = function (_a) {
    var fixture = _a.fixture, umpireId = _a.umpireId, umpireName = _a.umpireName, organizationId = _a.organizationId, onSubmit = _a.onSubmit, onCancel = _a.onCancel;
    var parseScore = function (scoreStr) {
        if (!scoreStr)
            return 0;
        var base = scoreStr.split('/')[0];
        return parseInt(base) || 0;
    };
    var parseWickets = function (scoreStr) {
        if (!scoreStr)
            return 0;
        var parts = scoreStr.split('/');
        return parts.length > 1 ? parseInt(parts[1]) || 0 : 0;
    };
    var _b = (0, react_1.useState)({
        pitchCondition: 3,
        groundCondition: 3,
        facilitiesRating: 3,
        teamASpirit: 5,
        teamBSpirit: 5,
        comments: '',
        winningTeam: 'draw',
        teamAScore: parseScore(fixture.teamAScore),
        teamAWickets: parseWickets(fixture.teamAScore),
        teamAOvers: '0',
        teamBScore: parseScore(fixture.teamBScore),
        teamBWickets: parseWickets(fixture.teamBScore),
        teamBOvers: '0',
    }), form = _b[0], setForm = _b[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        var report = {
            id: 'UR-' + Date.now(),
            matchId: fixture.id,
            fixtureId: fixture.id,
            submittedBy: umpireId,
            umpireName: umpireName,
            timestamp: Date.now(),
            status: 'PENDING',
            matchOutcome: {
                winningTeam: form.winningTeam,
                teamAScore: form.teamAScore,
                teamAWickets: form.teamAWickets,
                teamAOvers: form.teamAOvers,
                teamBScore: form.teamBScore,
                teamBWickets: form.teamBWickets,
                teamBOvers: form.teamBOvers,
            },
            facilityReport: {
                pitchCondition: form.pitchCondition,
                outfieldCondition: form.groundCondition,
                facilitiesRating: form.facilitiesRating,
                comments: form.comments
            },
            playerBehaviorRatings: {
                teamASpirit: form.teamASpirit,
                teamBSpirit: form.teamBSpirit,
                notes: form.comments
            },
            organizationId: organizationId,
            conductNotes: form.comments
        };
        onSubmit(report);
    };
    var RatingButton = function (_a) {
        var label = _a.label, value = _a.value, field = _a.field, _b = _a.max, max = _b === void 0 ? 5 : _b;
        return (<div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{label}</label>
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                {Array.from({ length: max }, function (_, i) { return i + 1; }).map(function (v) { return (<button key={v} type="button" onClick={function () {
                var _a;
                return setForm(__assign(__assign({}, form), (_a = {}, _a[field] = v, _a)));
            }} className={"flex-1 py-3 rounded-xl text-sm font-black transition-all ".concat(form[field] === v ? 'bg-white text-indigo-600 shadow-md transform scale-105' : 'text-slate-400 hover:text-slate-600')}>
                        {v}
                    </button>); })}
            </div>
        </div>);
    };
    return (<form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                <div className="flex items-center gap-4 mb-2">
                    <span className="text-2xl">🏏</span>
                    <h3 className="text-lg font-black text-slate-900">{fixture.teamAName} vs {fixture.teamBName}</h3>
                </div>
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest px-10">Official Umpire Report</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-indigo-600 pl-3">Facility Report</h4>
                    <RatingButton label="Pitch (1-5)" value={form.pitchCondition} field="pitchCondition"/>
                    <RatingButton label="Outfield (1-5)" value={form.groundCondition} field="groundCondition"/>
                    <RatingButton label="Facilities (1-5)" value={form.facilitiesRating} field="facilitiesRating"/>
                </div>
                <div className="space-y-6">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-emerald-500 pl-3">Spirit of Cricket</h4>
                    <RatingButton label={fixture.teamAName + " (1-5)"} value={form.teamASpirit} field="teamASpirit"/>
                    <RatingButton label={fixture.teamBName + " (1-5)"} value={form.teamBSpirit} field="teamBSpirit"/>
                </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-amber-500 pl-3">Match Outcome Override</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Winning Team</label>
                        <select value={form.winningTeam} onChange={function (e) { return setForm(__assign(__assign({}, form), { winningTeam: e.target.value })); }} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none">
                            <option value="teamA">{fixture.teamAName}</option>
                            <option value="teamB">{fixture.teamBName}</option>
                            <option value="draw">Draw</option>
                            <option value="tie">Tie</option>
                            <option value="no_result">No Result</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Confidential Match Notes</label>
                <textarea value={form.comments} onChange={function (e) { return setForm(__assign(__assign({}, form), { comments: e.target.value })); }} placeholder="Provide details on any incidents, player disciplinary issues, or exceptional conduct..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-700 focus:ring-2 ring-indigo-500/20 h-40 resize-none outline-none" required/>
            </div>

            <div className="flex gap-4">
                <button type="button" onClick={onCancel} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all">
                    Cancel
                </button>
                <button type="submit" className="flex-[2] py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.15em] shadow-xl shadow-indigo-100 hover:bg-indigo-500 transition-all">
                    Verify & Submit Report
                </button>
            </div>
        </form>);
};
exports.UmpireReportForm = UmpireReportForm;
