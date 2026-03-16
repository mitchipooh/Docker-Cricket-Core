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
exports.MatchReportForm = void 0;
var react_1 = require("react");
var MatchReportForm = function (_a) {
    var fixture = _a.fixture, team = _a.team, onCancel = _a.onCancel, onSubmit = _a.onSubmit, currentUserId = _a.currentUserId, allPlayers = _a.allPlayers;
    var _b = (0, react_1.useState)(1), step = _b[0], setStep = _b[1];
    // Summary Scores
    var _c = (0, react_1.useState)(''), teamAScore = _c[0], setTeamAScore = _c[1];
    var _d = (0, react_1.useState)(''), teamAWickets = _d[0], setTeamAWickets = _d[1];
    var _e = (0, react_1.useState)(''), teamAOvers = _e[0], setTeamAOvers = _e[1];
    var _f = (0, react_1.useState)(''), teamBScore = _f[0], setTeamBScore = _f[1];
    var _g = (0, react_1.useState)(''), teamBWickets = _g[0], setTeamBWickets = _g[1];
    var _h = (0, react_1.useState)(''), teamBOvers = _h[0], setTeamBOvers = _h[1];
    // Umpires
    var _j = (0, react_1.useState)(''), umpire1 = _j[0], setUmpire1 = _j[1];
    var _k = (0, react_1.useState)(''), umpire2 = _k[0], setUmpire2 = _k[1];
    // File Upload (Scorecard)
    var _l = (0, react_1.useState)(null), photoUrl = _l[0], setPhotoUrl = _l[1];
    var _m = (0, react_1.useState)(null), fileType = _m[0], setFileType = _m[1];
    // Players Logic
    var teamAPlayers = (0, react_1.useMemo)(function () {
        // Use squad IDs if available, otherwise filter by teamId (assuming allPlayers has context or we find by iterating teams)
        // Since allPlayers might be just Player[], we check if we can match by teamId if present, or we rely on fixture.teamASquadIds
        if (fixture.teamASquadIds) {
            return allPlayers.filter(function (p) { var _a; return (_a = fixture.teamASquadIds) === null || _a === void 0 ? void 0 : _a.includes(p.id); });
        }
        // Fallback: try to match by teamId property if it exists (cast to any for safety)
        return allPlayers.filter(function (p) { return p.teamId === fixture.teamAId; });
    }, [allPlayers, fixture]);
    var teamBPlayers = (0, react_1.useMemo)(function () {
        if (fixture.teamBSquadIds) {
            return allPlayers.filter(function (p) { var _a; return (_a = fixture.teamBSquadIds) === null || _a === void 0 ? void 0 : _a.includes(p.id); });
        }
        return allPlayers.filter(function (p) { return p.teamId === fixture.teamBId; });
    }, [allPlayers, fixture]);
    // Initialize performances for ALL players
    var _o = (0, react_1.useState)(function () {
        var allMatchPlayers = __spreadArray(__spreadArray([], teamAPlayers, true), teamBPlayers, true);
        return allMatchPlayers.map(function (p) { return ({
            playerId: p.id,
            playerName: p.name,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            wickets: 0,
            overs: 0,
            maidens: 0,
            runsConceded: 0,
            catches: 0,
            stumpings: 0,
            runOuts: 0
        }); });
    }), performances = _o[0], setPerformances = _o[1];
    // Ratings State
    var _p = (0, react_1.useState)(0), umpire1Rating = _p[0], setUmpire1Rating = _p[1];
    var _q = (0, react_1.useState)(''), umpire1Comment = _q[0], setUmpire1Comment = _q[1];
    var _r = (0, react_1.useState)(0), umpire2Rating = _r[0], setUmpire2Rating = _r[1];
    var _s = (0, react_1.useState)(''), umpire2Comment = _s[0], setUmpire2Comment = _s[1];
    var _t = (0, react_1.useState)(0), pitchRating = _t[0], setPitchRating = _t[1];
    var _u = (0, react_1.useState)(0), outfieldRating = _u[0], setOutfieldRating = _u[1];
    var _v = (0, react_1.useState)(0), facilityRating = _v[0], setFacilityRating = _v[1];
    var _w = (0, react_1.useState)(''), facilityComment = _w[0], setFacilityComment = _w[1];
    var _x = (0, react_1.useState)(0), spiritRating = _x[0], setSpiritRating = _x[1];
    var _y = (0, react_1.useState)(''), spiritComment = _y[0], setSpiritComment = _y[1];
    var _z = (0, react_1.useState)('TEAM_A'), activeTab = _z[0], setActiveTab = _z[1];
    var handlePerformanceChange = function (playerId, field, value) {
        setPerformances(function (prev) { return prev.map(function (p) {
            var _a;
            return p.playerId === playerId ? __assign(__assign({}, p), (_a = {}, _a[field] = value, _a)) : p;
        }); });
    };
    var handleFileUpload = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var url = URL.createObjectURL(file);
            setPhotoUrl(url);
            setFileType(file.type === 'application/pdf' ? 'pdf' : 'image');
        }
    };
    var handleSubmit = function (e) {
        var _a, _b;
        e.preventDefault();
        var report = {
            id: "report-".concat(Date.now()),
            matchId: fixture.id,
            submittedBy: currentUserId,
            timestamp: Date.now(),
            status: 'PENDING',
            teamAScore: parseInt(teamAScore) || 0,
            teamAWickets: parseInt(teamAWickets) || 0,
            teamAOvers: teamAOvers || '0',
            teamBScore: parseInt(teamBScore) || 0,
            teamBWickets: parseInt(teamBWickets) || 0,
            teamBOvers: teamBOvers || '0',
            playerPerformances: performances,
            scorecardPhotoUrl: photoUrl || undefined,
            umpires: [umpire1, umpire2].filter(Boolean),
            umpireRatings: __assign(__assign({}, (umpire1 ? (_a = {}, _a[umpire1] = { rating: umpire1Rating, comment: umpire1Comment }, _a) : {})), (umpire2 ? (_b = {}, _b[umpire2] = { rating: umpire2Rating, comment: umpire2Comment }, _b) : {})),
            facilityRating: {
                pitch: pitchRating,
                outfield: outfieldRating,
                facilities: facilityRating,
                comment: facilityComment
            },
            spiritRating: {
                rating: spiritRating,
                comment: spiritComment
            }
        };
        onSubmit(report);
    };
    // Filter displayed performances based on active tab
    var currentTeamPlayers = activeTab === 'TEAM_A' ? teamAPlayers : teamBPlayers;
    var currentTeamName = activeTab === 'TEAM_A' ? fixture.teamAName : fixture.teamBName;
    return (<div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 max-w-5xl mx-auto min-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Match Report</h2>
                    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">
                        {fixture.format} • {fixture.venue}
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className={"w-3 h-3 rounded-full transition-all ".concat(step === 1 ? 'bg-indigo-600 scale-125' : 'bg-slate-200')}></div>
                    <div className={"w-3 h-3 rounded-full transition-all ".concat(step === 2 ? 'bg-indigo-600 scale-125' : 'bg-slate-200')}></div>
                    <div className={"w-3 h-3 rounded-full transition-all ".concat(step === 3 ? 'bg-indigo-600 scale-125' : 'bg-slate-200')}></div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                {step === 1 ? (<div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
                        {/* SCORE SUMMARY */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* TEAM A INPUTS */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-black text-slate-900 border-b-2 border-slate-100 pb-2 flex justify-between">
                                    {fixture.teamAName}
                                    <span className="text-slate-300 text-sm">Team A</span>
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Runs</label>
                                        <input type="number" min="0" value={teamAScore} onChange={function (e) { return setTeamAScore(e.target.value); }} className="w-full bg-white border-2 border-slate-200 focus:border-indigo-500 rounded-2xl px-5 py-4 font-black text-slate-900 text-lg outline-none focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-300" placeholder="0"/>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Wkts</label>
                                        <input type="number" min="0" max="10" value={teamAWickets} onChange={function (e) { return setTeamAWickets(e.target.value); }} className="w-full bg-white border-2 border-slate-200 focus:border-indigo-500 rounded-2xl px-5 py-4 font-black text-slate-900 text-lg outline-none focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-300" placeholder="0"/>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Overs</label>
                                        <input type="text" value={teamAOvers} onChange={function (e) { return setTeamAOvers(e.target.value); }} className="w-full bg-white border-2 border-slate-200 focus:border-indigo-500 rounded-2xl px-5 py-4 font-black text-slate-900 text-lg outline-none focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-300" placeholder="0.0"/>
                                    </div>
                                </div>
                            </div>

                            {/* TEAM B INPUTS */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-black text-slate-900 border-b-2 border-slate-100 pb-2 flex justify-between">
                                    {fixture.teamBName}
                                    <span className="text-slate-300 text-sm">Team B</span>
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Runs</label>
                                        <input type="number" min="0" value={teamBScore} onChange={function (e) { return setTeamBScore(e.target.value); }} className="w-full bg-white border-2 border-slate-200 focus:border-indigo-500 rounded-2xl px-5 py-4 font-black text-slate-900 text-lg outline-none focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-300" placeholder="0"/>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Wkts</label>
                                        <input type="number" min="0" max="10" value={teamBWickets} onChange={function (e) { return setTeamBWickets(e.target.value); }} className="w-full bg-white border-2 border-slate-200 focus:border-indigo-500 rounded-2xl px-5 py-4 font-black text-slate-900 text-lg outline-none focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-300" placeholder="0"/>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Overs</label>
                                        <input type="text" value={teamBOvers} onChange={function (e) { return setTeamBOvers(e.target.value); }} className="w-full bg-white border-2 border-slate-200 focus:border-indigo-500 rounded-2xl px-5 py-4 font-black text-slate-900 text-lg outline-none focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-300" placeholder="0.0"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MATCH INFO Inputs */}
                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Umpire 1</label>
                                <input type="text" value={umpire1} onChange={function (e) { return setUmpire1(e.target.value); }} className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-300" placeholder="Name"/>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Umpire 2</label>
                                <input type="text" value={umpire2} onChange={function (e) { return setUmpire2(e.target.value); }} className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-300" placeholder="Name"/>
                            </div>
                        </div>

                        {/* FILE UPLOAD */}
                        <div className="mt-8 bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100">
                            <h3 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-2">
                                <span>📄</span> Scorecard File
                                <span className="text-[10px] bg-white text-indigo-500 px-2 py-1 rounded-md uppercase tracking-wider">Required</span>
                            </h3>
                            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-[2rem] p-10 bg-white/50 hover:bg-white transition-all group cursor-pointer">
                                {photoUrl ? (<div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
                                        {fileType === 'image' ? (<img src={photoUrl} className="w-full h-full object-contain"/>) : (<div className="text-center p-6">
                                                <span className="text-4xl">📑</span>
                                                <p className="font-black text-slate-900 mt-2">PDF Document Uploaded</p>
                                            </div>)}
                                        <button type="button" onClick={function (e) { e.preventDefault(); setPhotoUrl(null); }} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-xl hover:bg-red-600 transition-colors z-10">✕</button>
                                    </div>) : (<div className="text-center">
                                        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-500 mb-4 mx-auto group-hover:scale-110 transition-transform">
                                            📤
                                        </div>
                                        <p className="text-indigo-900 font-black uppercase text-xs tracking-widest">Click to upload Scorecard</p>
                                        <p className="text-slate-400 font-bold text-[10px] mt-2 italic">Support: JPG, PNG, PDF</p>
                                        <input type="file" accept="image/*,application/pdf" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                                    </div>)}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-auto pt-8">
                            <button type="button" onClick={onCancel} className="flex-1 py-4 text-slate-400 font-black uppercase text-xs tracking-widest hover:text-slate-600 transition-colors">Cancel</button>
                            <button type="button" onClick={function () { return setStep(2); }} disabled={!teamAScore || !teamBScore || !photoUrl} className="flex-[2] py-4 bg-indigo-600 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl hover:bg-indigo-500 disabled:opacity-50 disabled:grayscale transition-all">
                                Next: Player Stats →
                            </button>
                        </div>
                    </div>) : step === 2 ? (<div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-8 duration-500">
                        {/* TEAM TABS */}
                        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner mb-6 mx-auto w-full max-w-md">
                            <button type="button" onClick={function () { return setActiveTab('TEAM_A'); }} className={"flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ".concat(activeTab === 'TEAM_A' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600')}>
                                {fixture.teamAName}
                            </button>
                            <button type="button" onClick={function () { return setActiveTab('TEAM_B'); }} className={"flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ".concat(activeTab === 'TEAM_B' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600')}>
                                {fixture.teamBName}
                            </button>
                        </div>

                        <div className="flex-1 overflow-visible">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <h3 className="text-xl font-black text-slate-900">{currentTeamName} Performance</h3>
                                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">{currentTeamPlayers.length} Players</span>
                            </div>

                            <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar space-y-3">
                                {currentTeamPlayers.map(function (p) {
                var perf = performances.find(function (perf) { return perf.playerId === p.id; }) || {
                    runs: 0, balls: 0, wickets: 0, overs: 0, runsConceded: 0, catches: 0
                };
                return (<div key={p.id} className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-200 hover:border-indigo-200 transition-all">
                                            <div className="flex justify-between items-center mb-4">
                                                <p className="font-black text-slate-900 text-sm uppercase tracking-tight">{p.name}</p>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">{p.role === 'All-rounder' ? 'All-Rndr' : p.role}</span>
                                            </div>
                                            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                                                <div>
                                                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Runs</label>
                                                    <input type="number" min="0" value={perf.runs} onChange={function (e) { return handlePerformanceChange(p.id, 'runs', parseInt(e.target.value) || 0); }} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 font-bold text-center outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50"/>
                                                </div>
                                                <div>
                                                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Balls</label>
                                                    <input type="number" min="0" value={perf.balls} onChange={function (e) { return handlePerformanceChange(p.id, 'balls', parseInt(e.target.value) || 0); }} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 font-bold text-center outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50"/>
                                                </div>
                                                <div>
                                                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Wkts</label>
                                                    <input type="number" min="0" value={perf.wickets} onChange={function (e) { return handlePerformanceChange(p.id, 'wickets', parseInt(e.target.value) || 0); }} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 font-bold text-center outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50"/>
                                                </div>
                                                <div>
                                                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Overs</label>
                                                    <input type="number" min="0" value={perf.overs} onChange={function (e) { return handlePerformanceChange(p.id, 'overs', parseInt(e.target.value) || 0); }} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 font-bold text-center outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50"/>
                                                </div>
                                                <div>
                                                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Conc</label>
                                                    <input type="number" min="0" value={perf.runsConceded} onChange={function (e) { return handlePerformanceChange(p.id, 'runsConceded', parseInt(e.target.value) || 0); }} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 font-bold text-center outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50"/>
                                                </div>
                                                <div>
                                                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Catch</label>
                                                    <input type="number" min="0" value={perf.catches} onChange={function (e) { return handlePerformanceChange(p.id, 'catches', parseInt(e.target.value) || 0); }} className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 font-bold text-center outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50"/>
                                                </div>
                                            </div>
                                        </div>);
            })}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6 pt-6 border-t border-slate-100">
                            <button type="button" onClick={function () { return setStep(1); }} className="flex-1 py-4 text-slate-400 font-black uppercase text-xs tracking-widest hover:text-slate-600 transition-colors">← Back</button>
                            <button type="button" onClick={function () { return setStep(3); }} className="flex-[2] py-4 bg-indigo-600 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl hover:bg-indigo-500 transition-all">
                                Next: Ratings →
                            </button>
                        </div>
                    </div>) : (<div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-8 duration-500">
                        {/* STEP 3: RATINGS & FEEDBACK */}
                        <div className="space-y-8 overflow-y-auto custom-scrollbar max-h-[60vh] pr-2">

                            {/* UMPIRE RATINGS */}
                            {(umpire1 || umpire2) && (<div className="space-y-6">
                                    <h3 className="text-xl font-black text-slate-900 border-b-2 border-slate-100 pb-2">Umpire Performance</h3>
                                    {[
                    { name: umpire1, rating: umpire1Rating, setRating: setUmpire1Rating, comment: umpire1Comment, setComment: setUmpire1Comment },
                    { name: umpire2, rating: umpire2Rating, setRating: setUmpire2Rating, comment: umpire2Comment, setComment: setUmpire2Comment }
                ].filter(function (u) { return u.name; }).map(function (u, idx) { return (<div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="font-bold text-slate-900">{u.name}</h4>
                                                <div className="flex gap-1">
                                                    {[1, 2, 3, 4, 5].map(function (star) { return (<button key={star} type="button" onClick={function () { return u.setRating(star); }} className={"text-2xl transition-transform hover:scale-110 ".concat(star <= u.rating ? 'grayscale-0' : 'grayscale opacity-30')}>
                                                            ⭐
                                                        </button>); })}
                                                </div>
                                            </div>
                                            <input value={u.comment} onChange={function (e) { return u.setComment(e.target.value); }} placeholder={"Feedback for ".concat(u.name, "...")} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"/>
                                        </div>); })}
                                </div>)}

                            {/* FACILITIES RATING */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-black text-slate-900 border-b-2 border-slate-100 pb-2">Ground & Facilities</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                { label: 'Pitch Quality', val: pitchRating, set: setPitchRating },
                { label: 'Outfield', val: outfieldRating, set: setOutfieldRating },
                { label: 'Facilities', val: facilityRating, set: setFacilityRating },
            ].map(function (item, idx) { return (<div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
                                            <div className="flex justify-center gap-1">
                                                {[1, 2, 3, 4, 5].map(function (star) { return (<button key={star} type="button" onClick={function () { return item.set(star); }} className={"text-xl transition-transform hover:scale-110 ".concat(star <= item.val ? 'grayscale-0' : 'grayscale opacity-30')}>
                                                        ⭐
                                                    </button>); })}
                                            </div>
                                        </div>); })}
                                </div>
                                <textarea value={facilityComment} onChange={function (e) { return setFacilityComment(e.target.value); }} placeholder="Any comments on the ground conditions?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 h-24 resize-none"/>
                            </div>

                            {/* SPIRIT OF THE GAME */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-black text-slate-900 border-b-2 border-slate-100 pb-2">Spirit of the Game</h3>
                                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                                        <p className="font-bold text-indigo-900 text-sm">Rate the opposition ({activeTab === 'TEAM_A' ? fixture.teamBName : fixture.teamAName}) behavior</p>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map(function (star) { return (<button key={star} type="button" onClick={function () { return setSpiritRating(star); }} className={"text-3xl transition-transform hover:scale-110 ".concat(star <= spiritRating ? 'grayscale-0' : 'grayscale opacity-30')}>
                                                    🤝
                                                </button>); })}
                                        </div>
                                    </div>
                                    <textarea value={spiritComment} onChange={function (e) { return setSpiritComment(e.target.value); }} placeholder="Comments on sportsmanship..." className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 h-20 resize-none"/>
                                </div>
                            </div>

                        </div>

                        <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100">
                            <button type="button" onClick={function () { return setStep(2); }} className="flex-1 py-4 text-slate-400 font-black uppercase text-xs tracking-widest hover:text-slate-600 transition-colors">← Back</button>
                            <button type="submit" className="flex-[2] py-4 bg-emerald-500 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl hover:bg-emerald-400 transition-all">
                                Submit Report ✓
                            </button>
                        </div>
                    </div>)}
            </form>
        </div>);
};
exports.MatchReportForm = MatchReportForm;
