"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgFixturesTab = void 0;
var react_1 = require("react");
var OrgFixturesTab = function (_a) {
    var organization = _a.organization, isActive = _a.isActive, onUpdateFixture = _a.onUpdateFixture;
    if (!isActive)
        return null;
    var _b = (0, react_1.useState)('ALL'), filter = _b[0], setFilter = _b[1];
    var displayedFixtures = (0, react_1.useMemo)(function () {
        var fixtures = organization.fixtures || [];
        // Sort by date descending
        fixtures = __spreadArray([], fixtures, true).sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
        if (filter === 'ALL')
            return fixtures;
        if (filter === 'LIVE')
            return fixtures.filter(function (f) { return f.status === 'Live'; });
        if (filter === 'SCHEDULED')
            return fixtures.filter(function (f) { return f.status === 'Scheduled'; });
        if (filter === 'COMPLETED')
            return fixtures.filter(function (f) { return f.status === 'Completed'; });
        return fixtures;
    }, [organization.fixtures, filter]);
    return (<div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Team Fixtures</h3>
                <div className="flex gap-2">
                    {['ALL', 'LIVE', 'SCHEDULED', 'COMPLETED'].map(function (f) { return (<button key={f} onClick={function () { return setFilter(f); }} className={"px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ".concat(filter === f ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50')}>
                            {f}
                        </button>); })}
                </div>
            </div>

            {displayedFixtures.length === 0 ? (<div className="p-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold uppercase text-xs">
                    No fixtures found.
                </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayedFixtures.map(function (f) { return (<div key={f.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col gap-3 relative overflow-hidden group">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-2 items-center">
                                    <span className={"px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ".concat(f.status === 'Live' ? 'bg-red-100 text-red-600 animate-pulse' :
                    f.status === 'Completed' ? 'bg-slate-100 text-slate-500' :
                        'bg-blue-100 text-blue-600')}>
                                        {f.status}
                                    </span>
                                    {f.isOfficial === false && (<span className="bg-amber-100 text-amber-600 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest">Unofficial</span>)}
                                </div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    {new Date(f.date).toLocaleDateString()} • {f.venue}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 my-2">
                                <div className="flex justify-between items-start gap-3">
                                    <span className={"font-black text-lg break-words flex-1 leading-tight ".concat(f.winnerId && f.winnerId === f.teamAId ? 'text-emerald-600' : 'text-slate-900')}>{f.teamAName}</span>
                                    <span className="font-mono font-bold text-slate-600 shrink-0">{f.teamAScore || '-'}</span>
                                </div>
                                <div className="flex justify-between items-start gap-3">
                                    <span className={"font-black text-lg break-words flex-1 leading-tight ".concat(f.winnerId && f.winnerId === f.teamBId ? 'text-emerald-600' : 'text-slate-900')}>{f.teamBName}</span>
                                    <span className="font-mono font-bold text-slate-600 shrink-0">{f.teamBScore || '-'}</span>
                                </div>
                            </div>

                            {f.result && (<div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 p-2 rounded-lg text-center">
                                    {f.result}
                                </div>)}

                            {/* Optional Admin Controls could go here */}
                            {onUpdateFixture && (<div className="flex justify-end pt-2 border-t border-slate-100 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={function () {
                        // Handle edit or status toggle
                        // Ideally open a modal, but for now just a placeholder action or simple status toggle if needed
                        // If it's live, maybe 'End Match'?
                        // Leaving simple for display-first requirement.
                    }} className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest">
                                        Manage
                                    </button>
                                </div>)}
                        </div>); })}
                </div>)}
        </div>);
};
exports.OrgFixturesTab = OrgFixturesTab;
