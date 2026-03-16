"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedAnalysis = void 0;
var react_1 = require("react");
var PitchView_1 = require("./PitchView");
var FieldView_1 = require("./FieldView");
var cricket_engine_1 = require("@cricket/shared/utils/cricket-engine");
var AdvancedAnalysis = function (_a) {
    var history = _a.history, teams = _a.teams, battingTeamId = _a.battingTeamId, bowlingTeamId = _a.bowlingTeamId;
    var _b = (0, react_1.useState)('all'), selectedStriker = _b[0], setSelectedStriker = _b[1];
    var _c = (0, react_1.useState)('all'), selectedBowler = _c[0], setSelectedBowler = _c[1];
    var _d = (0, react_1.useState)(false), is3D = _d[0], setIs3D = _d[1];
    var battingTeam = teams.find(function (t) { return t.id === battingTeamId; });
    var bowlingTeam = teams.find(function (t) { return t.id === bowlingTeamId; });
    var filteredBalls = (0, react_1.useMemo)(function () {
        return history.filter(function (b) {
            var matchStriker = selectedStriker === 'all' || b.strikerId === selectedStriker;
            var matchBowler = selectedBowler === 'all' || b.bowlerId === selectedBowler;
            return matchStriker && matchBowler;
        });
    }, [history, selectedStriker, selectedBowler]);
    var pitchData = (0, react_1.useMemo)(function () {
        return filteredBalls
            .filter(function (b) { return b.pitchCoords; })
            .map(function (b) { return ({
            coords: b.pitchCoords,
            color: (0, cricket_engine_1.getBallColor)(b)
        }); });
    }, [filteredBalls]);
    var shotData = (0, react_1.useMemo)(function () {
        return filteredBalls
            .filter(function (b) { return b.shotCoords; })
            .map(function (b) { return ({
            coords: b.shotCoords,
            color: (0, cricket_engine_1.getBallColor)(b)
        }); });
    }, [filteredBalls]);
    var stats = (0, react_1.useMemo)(function () {
        var total = filteredBalls.length;
        var runs = filteredBalls.reduce(function (acc, b) { return acc + (b.runs || 0) + (b.extraRuns || 0); }, 0);
        var wickets = filteredBalls.filter(function (b) { return b.isWicket; }).length;
        var ground = filteredBalls.filter(function (b) { return b.shotHeight === 'Ground'; }).length;
        var aerial = filteredBalls.filter(function (b) { return b.shotHeight === 'Aerial'; }).length;
        return { total: total, runs: runs, wickets: wickets, ground: ground, aerial: aerial };
    }, [filteredBalls]);
    return (<div className="h-full flex flex-col bg-slate-50 overflow-hidden">
            <div className="p-4 bg-white border-b border-gray-200 space-y-3">
                <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Spatial Analysis</h3>
                    <button onClick={function () { return setIs3D(!is3D); }} className={"text-[10px] font-black px-3 py-1 rounded-full transition-all border ".concat(is3D ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-200' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300')}>
                        {is3D ? 'View 2D' : 'Enable 3D View'}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Batter Filter</label>
                        <select value={selectedStriker} onChange={function (e) { return setSelectedStriker(e.target.value); }} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-bold text-gray-700 outline-none focus:border-indigo-500 transition-colors">
                            <option value="all">All Batters</option>
                            {battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.players.map(function (p) { return (<option key={p.id} value={p.id}>{p.name}</option>); })}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Bowler Filter</label>
                        <select value={selectedBowler} onChange={function (e) { return setSelectedBowler(e.target.value); }} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-bold text-gray-700 outline-none focus:border-indigo-500 transition-colors">
                            <option value="all">All Bowlers</option>
                            {bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.players.map(function (p) { return (<option key={p.id} value={p.id}>{p.name}</option>); })}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {/* Visualizations Container */}
                <div className={"grid grid-cols-1 gap-4 transition-all duration-500 ".concat(is3D ? 'perspective-[1000px]' : '')}>
                    {/* Pitch Map */}
                    <div className={"bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-all duration-700 ".concat(is3D ? 'rotate-x-[25deg] shadow-xl' : '')}>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">Pitch Map</span>
                            <span className="text-[10px] font-bold text-gray-400 italic">Impact zones</span>
                        </div>
                        <div className="flex justify-center">
                            <PitchView_1.PitchView deliveries={pitchData} readonly/>
                        </div>
                    </div>

                    {/* Wagon Wheel */}
                    <div className={"bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-all duration-700 ".concat(is3D ? 'rotate-x-[25deg] shadow-xl' : '')}>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">Wagon Wheel</span>
                            <span className="text-[10px] font-bold text-gray-400 italic">Shot direction</span>
                        </div>
                        <div className="flex justify-center">
                            <FieldView_1.FieldView shots={shotData} readonly/>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-tighter mb-1">Involved Deliveries</div>
                        <div className="text-xl font-black text-gray-800 leading-none">{stats.total}</div>
                        <div className="text-[8px] font-bold text-gray-400 mt-1 uppercase">Matches filter</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-tighter mb-1">Runs / Wickets</div>
                        <div className="text-xl font-black text-gray-800 leading-none">{stats.runs} <span className="text-xs text-red-500">/ {stats.wickets}</span></div>
                        <div className="text-[8px] font-bold text-gray-400 mt-1 uppercase">Total result</div>
                    </div>
                </div>

                {/* Shot Height Stat */}
                <div className="bg-slate-800 p-4 rounded-2xl text-white shadow-lg overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl">📊</div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-700 pb-2">Analysis Breakdown</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-300">Ground Shots</span>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="bg-emerald-400 h-full" style={{ width: "".concat(stats.total ? (stats.ground / stats.total * 100) : 0, "%") }}/>
                                </div>
                                <span className="text-sm font-black">{stats.ground}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-300">Aerial Shots</span>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="bg-sky-400 h-full" style={{ width: "".concat(stats.total ? (stats.aerial / stats.total * 100) : 0, "%") }}/>
                                </div>
                                <span className="text-sm font-black">{stats.aerial}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
exports.AdvancedAnalysis = AdvancedAnalysis;
