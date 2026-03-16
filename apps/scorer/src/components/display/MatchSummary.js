"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchSummary = void 0;
var react_1 = require("react");
var useDerivedStats_1 = require("@cricket/shared/scoring/hooks/useDerivedStats");
var MatchSummary = function (_a) {
    var match = _a.match, onClose = _a.onClose, onPin = _a.onPin, _b = _a.allTeams, allTeams = _b === void 0 ? [] : _b;
    var state = match.savedState;
    // Resolve teams
    var teamA = (0, react_1.useMemo)(function () { return allTeams.find(function (t) { return t.id === match.teamAId; }); }, [allTeams, match.teamAId]);
    var teamB = (0, react_1.useMemo)(function () { return allTeams.find(function (t) { return t.id === match.teamBId; }); }, [allTeams, match.teamBId]);
    var battingTeam = (state === null || state === void 0 ? void 0 : state.battingTeamId) === match.teamAId ? teamA : teamB;
    var bowlingTeam = (state === null || state === void 0 ? void 0 : state.battingTeamId) === match.teamAId ? teamB : teamA;
    // Use shared hook for consistent stats calculation
    // Pass empty object if no state to avoid hook errors, though logic handles nulls checks below
    var derivedStats = (0, useDerivedStats_1.useDerivedStats)(state || {
        battingTeamId: '', bowlingTeamId: '', score: 0, wickets: 0, totalBalls: 0,
        strikerId: '', nonStrikerId: '', bowlerId: '', innings: 1, history: [], inningsScores: [], isCompleted: false,
        matchTimer: { startTime: null, totalAllowances: 0, isPaused: false, lastPauseTime: null }
    }, match.customOvers || 20, battingTeam, bowlingTeam);
    // Helper to find player name
    var getPlayerName = function (playerId) {
        for (var _i = 0, allTeams_1 = allTeams; _i < allTeams_1.length; _i++) {
            var team = allTeams_1[_i];
            var player = team.players.find(function (p) { return p.id === playerId; });
            if (player)
                return player.name;
        }
        return 'Unknown Player';
    };
    // Calculate current score and stats
    var currentScore = (0, react_1.useMemo)(function () {
        if (!state)
            return { score: 0, wickets: 0, overs: '0.0', crr: 0, projected: 0 };
        var score = state.score || 0;
        var wickets = state.wickets || 0;
        var overs = derivedStats.overs;
        var crr = derivedStats.runRate;
        var totalOvers = match.customOvers || 20;
        // Calculate projected score
        var projected = 0;
        if (state.totalBalls > 0) {
            projected = Math.round(crr * totalOvers);
        }
        return { score: score, wickets: wickets, overs: overs, crr: crr, projected: projected };
    }, [state, derivedStats, match.customOvers]);
    // Get active batters
    var activeBatters = (0, react_1.useMemo)(function () {
        if (!state || !state.strikerId || !state.nonStrikerId)
            return [];
        var strikerStats = derivedStats.batterStats[state.strikerId];
        var nonStrikerStats = derivedStats.batterStats[state.nonStrikerId];
        var batters = [];
        if (strikerStats) {
            batters.push({
                name: getPlayerName(state.strikerId) + ' *',
                runs: strikerStats.runs,
                balls: strikerStats.balls,
                strikeRate: strikerStats.strikeRate
            });
        }
        if (nonStrikerStats) {
            batters.push({
                name: getPlayerName(state.nonStrikerId),
                runs: nonStrikerStats.runs,
                balls: nonStrikerStats.balls,
                strikeRate: nonStrikerStats.strikeRate
            });
        }
        return batters;
    }, [state, derivedStats, allTeams]);
    // Determine target setting
    var targetSetting = (0, react_1.useMemo)(function () {
        if (!state)
            return 'Innings 1';
        if (state.innings === 1)
            return 'Innings 1';
        if (state.innings === 2 && state.target)
            return "Target: ".concat(state.target);
        return "Innings ".concat(state.innings);
    }, [state]);
    if (!state)
        return null;
    return (<div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl transition-all">
                        ✕
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            🏏
                        </div>
                        <div>
                            <h2 className="text-white font-black text-sm uppercase tracking-widest">Match Summary</h2>
                            <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Cricket Match</p>
                        </div>
                    </div>
                    {onPin && (<button onClick={onPin} className="absolute top-4 right-16 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
                            📌 PIN
                        </button>)}
                </div>

                {/* Current Score */}
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Score</span>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">LIVE</span>
                    </div>
                    <div className="flex items-baseline gap-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-slate-900 dark:text-white">{currentScore.score}-{currentScore.wickets}</span>
                            <span className="text-xl font-bold text-slate-400">({currentScore.overs})</span>
                        </div>
                        <div className="ml-auto text-right">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CRR</div>
                            <div className="text-2xl font-black text-emerald-600">{currentScore.crr.toFixed(2)}</div>
                        </div>
                    </div>
                </div>

                {/* Projected & Target */}
                <div className="grid grid-cols-2 gap-4 p-6">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Projected (at {match.customOvers || 20}.00)</div>
                        <div className="text-3xl font-black text-slate-900 dark:text-white">{currentScore.projected}</div>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-700">
                        <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">Target Setting</div>
                        <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 italic">{targetSetting}</div>
                    </div>
                </div>

                {/* Active Batters */}
                {activeBatters.length > 0 && (<div className="px-6 pb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Batters</h3>
                        </div>
                        <div className="space-y-3">
                            {activeBatters.map(function (batter, idx) { return (<div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-xl">
                                            🏏
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900 dark:text-white text-sm">{batter.name}</h4>
                                            <p className="text-[10px] text-slate-500 font-bold">Batting at Innings {(state === null || state === void 0 ? void 0 : state.innings) || 1}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-slate-900 dark:text-white">{batter.runs}</div>
                                        <div className="text-[10px] text-slate-500 font-bold">({batter.balls})</div>
                                        <div className="text-[9px] text-slate-400 font-bold">SR {batter.strikeRate}</div>
                                    </div>
                                </div>); })}
                        </div>
                    </div>)}

                {/* Match Details */}
                <div className="px-6 pb-6">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <h3 className="font-black text-slate-900 dark:text-white text-sm mb-2">{match.teamAName} vs {match.teamBName}</h3>
                        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold">
                            <span>📍 {match.venue}</span>
                            <span>📅 {new Date(match.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
exports.MatchSummary = MatchSummary;
