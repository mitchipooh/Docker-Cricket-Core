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
exports.MatchResultSummary = void 0;
var react_1 = require("react");
var MatchSelectors_1 = require("@cricket/shared/scoring/MatchSelectors");
var MVPCalculator_1 = require("@cricket/shared/scoring/logic/MVPCalculator");
var buildBattingCard_1 = require("../../scorer/scorecard/buildBattingCard");
var generateMatchPDF_1 = require("@cricket/shared/scoring/logic/generateMatchPDF");
var MatchResultSummary = function (_a) {
    var _b;
    var matchState = _a.matchState, teamA = _a.teamA, teamB = _a.teamB, _c = _a.format, format = _c === void 0 ? 'Cricket Match' : _c, onExit = _a.onExit, onViewScorecard = _a.onViewScorecard, _d = _a.totalOvers, totalOvers = _d === void 0 ? 20 : _d, onPinToMedia = _a.onPinToMedia, nextInningsAction = _a.nextInningsAction, followOnAction = _a.followOnAction;
    // 4. PDF Generation
    // 4. PDF Generation
    var handleDownloadPDF = function () {
        (0, generateMatchPDF_1.generateMatchPDF)(matchState, teamA, teamB, format);
    };
    var result = (0, react_1.useMemo)(function () {
        var _a, _b, _c;
        var scoreA = ((_a = matchState.inningsScores.find(function (i) { return i.teamId === teamA.id; })) === null || _a === void 0 ? void 0 : _a.score) || 0;
        var scoreB = ((_b = matchState.inningsScores.find(function (i) { return i.teamId === teamB.id; })) === null || _b === void 0 ? void 0 : _b.score) || 0;
        var wicketsB = ((_c = matchState.inningsScores.find(function (i) { return i.teamId === teamB.id; })) === null || _c === void 0 ? void 0 : _c.wickets) || 0;
        var text = "Match Concluded";
        var subText = "Scores Level";
        var winnerId = null;
        if (scoreA > scoreB) {
            text = "".concat(teamA.name, " Win");
            subText = "by ".concat(scoreA - scoreB, " runs");
            winnerId = teamA.id;
        }
        else if (scoreB > scoreA) {
            text = "".concat(teamB.name, " Win");
            subText = "by ".concat(10 - wicketsB, " wickets");
            winnerId = teamB.id;
        }
        else {
            text = "Match Tied";
        }
        return { text: text, subText: subText, winnerId: winnerId };
    }, [matchState, teamA, teamB]);
    // 2. MVP
    var mvp = (0, react_1.useMemo)(function () {
        var allPlayers = __spreadArray(__spreadArray([], teamA.players, true), teamB.players, true);
        var ranked = (0, MVPCalculator_1.calculateMVP)(matchState, allPlayers);
        var top = ranked[0];
        var player = allPlayers.find(function (p) { return p.id === top.playerId; });
        return { player: player, stats: top.stats, points: top.points };
    }, [matchState, teamA, teamB]);
    // 3. Innings Summaries (Top 3 Batters, Top 3 Bowlers)
    // 3. Innings Summaries (Top 3 Batters, Top 3 Bowlers)
    var getInningsSummary = function (teamId, inningsNum) {
        var team = teamId === teamA.id ? teamA : teamB;
        var oppTeam = teamId === teamA.id ? teamB : teamA;
        // Calculate Score from History (More robust than inningsScores)
        // Note: We use empty strings for striker/nonStriker as we just need the totals
        var battingCard = (0, buildBattingCard_1.buildBattingCard)(matchState.history, team.players, inningsNum, '', '');
        var score = battingCard.totalScore;
        // Top 3 Batters
        var batters = battingCard.rows
            .sort(function (a, b) { return b.runs - a.runs; })
            .slice(0, 3)
            .filter(function (b) { return b.balls > 0; })
            .map(function (row) {
            var p = team.players.find(function (pl) { return pl.name === row.name; }) || { name: row.name, id: 'unknown' };
            return { p: p, s: { runs: row.runs, balls: row.balls } };
        });
        // Top 3 Bowlers (from opposition)
        // usage of getBowlingStats is fine, or we could use buildBowlingCard
        var bowlers = oppTeam.players
            .map(function (p) { return ({ p: p, s: (0, MatchSelectors_1.getBowlingStats)(p.id, matchState.history, inningsNum) }); })
            .sort(function (a, b) { return b.s.wickets - a.s.wickets || a.s.runs - b.s.runs; })
            .slice(0, 3)
            .filter(function (b) { return parseFloat(b.s.overs) > 0; });
        return { team: team, score: score, batters: batters, bowlers: bowlers };
    };
    // Determine Innings logic
    // If completed, we should have history for both.
    var firstBall = matchState.history.find(function (b) { return b.innings === 1; });
    var firstStrikerId = firstBall === null || firstBall === void 0 ? void 0 : firstBall.strikerId;
    // Check which team the first striker belongs to
    // If no history (e.g. 0 balls bowled), fallback to battingTeamId
    var firstBatTeamId = matchState.battingTeamId;
    if (firstStrikerId) {
        if (teamA.players.some(function (p) { return p.id === firstStrikerId; }))
            firstBatTeamId = teamA.id;
        else if (teamB.players.some(function (p) { return p.id === firstStrikerId; }))
            firstBatTeamId = teamB.id;
    }
    // If we can't determine from players (shouldn't happen), check inningsScores fallback
    if (!firstBall && matchState.inningsScores.length > 0) {
        var log = matchState.inningsScores.find(function (i) { return i.innings === 1; });
        if (log)
            firstBatTeamId = log.teamId;
    }
    var secondBatTeamId = firstBatTeamId === teamA.id ? teamB.id : teamA.id;
    var summary1 = getInningsSummary(firstBatTeamId, 1);
    var summary2 = getInningsSummary(secondBatTeamId, 2);
    // Live Stats Calculations
    var currentBatters = (0, react_1.useMemo)(function () {
        if (matchState.isCompleted)
            return [];
        var team = matchState.innings === 1 ? (firstBatTeamId === teamA.id ? teamA : teamB) : (secondBatTeamId === teamA.id ? teamA : teamB);
        return [matchState.strikerId, matchState.nonStrikerId]
            .filter(Boolean)
            .map(function (id) { return ({
            p: team.players.find(function (p) { return p.id === id; }),
            s: (0, MatchSelectors_1.getBattingStats)(id, matchState.history, matchState.innings)
        }); });
    }, [matchState, teamA, teamB]);
    var currentBowler = (0, react_1.useMemo)(function () {
        if (matchState.isCompleted || !matchState.bowlerId)
            return null;
        var oppTeam = matchState.innings === 1 ? (secondBatTeamId === teamA.id ? teamA : teamB) : (firstBatTeamId === teamA.id ? teamA : teamB);
        return {
            p: oppTeam.players.find(function (p) { return p.id === matchState.bowlerId; }),
            s: (0, MatchSelectors_1.getBowlingStats)(matchState.bowlerId, matchState.history, matchState.innings)
        };
    }, [matchState, teamA, teamB]);
    var projections = (0, react_1.useMemo)(function () {
        if (matchState.isCompleted)
            return null;
        var crr = matchState.totalBalls > 0 ? (matchState.score / (matchState.totalBalls / 6)) : 0;
        var projected = crr * totalOvers;
        // RRR logic for 2nd innings
        var rrr = 0;
        var runsNeeded = 0;
        var ballsRemaining = 0;
        if (matchState.innings === 2 && matchState.target) {
            runsNeeded = matchState.target - matchState.score;
            ballsRemaining = (totalOvers * 6) - matchState.totalBalls;
            rrr = ballsRemaining > 0 ? (runsNeeded / (ballsRemaining / 6)) : 0;
        }
        return { crr: crr.toFixed(2), projected: Math.round(projected), rrr: rrr.toFixed(2), runsNeeded: runsNeeded, ballsRemaining: ballsRemaining };
    }, [matchState, totalOvers]);
    return (<div className={"".concat(matchState.isCompleted ? 'fixed inset-0 z-[200]' : 'absolute inset-0 z-50', " bg-gray-100 overflow-y-auto animate-in fade-in duration-200")}>
            <div className="max-w-md mx-auto min-h-screen bg-gray-50 shadow-2xl relative">

                {/* Header */}
                <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <img src="/logo.jpg" alt="Logo" className="h-8 w-8 object-contain"/>
                        <div>
                            <h1 className="text-sm font-black text-gray-800 uppercase tracking-tight">
                                {matchState.isCompleted ? 'Match Result' : 'Match Summary'}
                            </h1>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{format}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {onPinToMedia && (<button onClick={onPinToMedia} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-indigo-500 transition-all flex items-center gap-2" title="Pin to Media Center">
                                📌 Pin
                            </button>)}
                        <button onClick={onExit} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                            ❌
                        </button>
                    </div>

                </div>

                <div className="p-4 space-y-6">
                    {/* Live Dashboard Section */}
                    {!matchState.isCompleted && (<div className="space-y-4">
                            {/* Score & Projections */}
                            <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-xl border border-slate-800 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <span className="text-6xl font-black italic">LIVE</span>
                                </div>

                                <div className="flex justify-between items-end relative z-10">
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Score</div>
                                        <div className="text-4xl font-black text-white leading-none">
                                            {matchState.score}-{matchState.wickets}
                                            <span className="text-sm font-bold text-slate-500 ml-2">({Math.floor(matchState.totalBalls / 6)}.{matchState.totalBalls % 6})</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CRR</div>
                                        <div className="text-2xl font-black text-teal-400 leading-none">{projections === null || projections === void 0 ? void 0 : projections.crr}</div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between relative z-10">
                                    {matchState.innings === 1 ? (<>
                                            <div>
                                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Projected (at {projections === null || projections === void 0 ? void 0 : projections.crr})</div>
                                                <div className="text-lg font-black text-white">{projections === null || projections === void 0 ? void 0 : projections.projected}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Target Setting</div>
                                                <div className="text-lg font-black text-indigo-400 italic">Innings 1</div>
                                            </div>
                                        </>) : (<>
                                            <div>
                                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Target: {matchState.target}</div>
                                                <div className="text-lg font-black text-white">{projections === null || projections === void 0 ? void 0 : projections.runsNeeded} <span className="text-[10px] text-slate-400 font-bold">REQD</span></div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">RRR</div>
                                                <div className="text-lg font-black text-orange-400">{projections === null || projections === void 0 ? void 0 : projections.rrr}</div>
                                            </div>
                                        </>)}
                                </div>
                            </div>

                            {/* Current Batters & Bowler */}
                            <div className="grid grid-cols-1 gap-3">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                                        Active Batters
                                    </div>
                                    <div className="space-y-3">
                                        {currentBatters.map(function (b, i) {
                var _a;
                return (<div key={i} className="flex justify-between items-center group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs">🏏</div>
                                                    <div>
                                                        <div className="text-xs font-black text-gray-800">{(_a = b.p) === null || _a === void 0 ? void 0 : _a.name} {i === 0 ? '*' : ''}</div>
                                                        <div className="text-[9px] font-bold text-gray-400">Batting at Innings {matchState.innings}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-black text-gray-900">{b.s.runs} <span className="text-[10px] text-gray-400 font-normal">({b.s.balls})</span></div>
                                                    <div className="text-[8px] font-bold text-gray-400 uppercase">SR {b.s.sr}</div>
                                                </div>
                                            </div>);
            })}
                                    </div>
                                </div>

                                {currentBowler && (<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                            Active Bowler
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs">⚾</div>
                                                <div>
                                                    <div className="text-xs font-black text-gray-800">{(_b = currentBowler.p) === null || _b === void 0 ? void 0 : _b.name}</div>
                                                    <div className="text-[9px] font-bold text-gray-400">Current Over</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-black text-teal-700">{currentBowler.s.wickets}-{currentBowler.s.runs} <span className="text-[10px] text-gray-400 font-normal">({currentBowler.s.overs})</span></div>
                                                <div className="text-[8px] font-bold text-gray-400 uppercase">ECON {currentBowler.s.econ}</div>
                                            </div>
                                        </div>
                                    </div>)}
                            </div>
                        </div>)}

                    {/* Innings 1 Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-teal-600 p-3 flex justify-between items-center text-white">
                            <div className="font-bold text-sm tracking-wide">{summary1.team.name}</div>
                            <div className="font-black text-lg">{summary1.score}</div>
                        </div>
                        <div className="p-3 grid grid-cols-2 gap-4 text-[10px]">
                            <div className="space-y-1.5">
                                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1 mb-1 border-b border-gray-100 pb-1">Batters</div>
                                {summary1.batters.map(function (b, i) { return (<div key={i} className="flex flex-col p-1.5 bg-gray-50 rounded border-l-2 border-teal-500">
                                        <div className="font-bold text-gray-700 truncate">{b.p.name}</div>
                                        <div className="font-black text-gray-900">{b.s.runs} <span className="text-gray-400 font-normal">({b.s.balls})</span></div>
                                    </div>); })}
                            </div>
                            <div className="space-y-1.5 text-right">
                                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1 mb-1 border-b border-gray-100 pb-1">Bowlers</div>
                                {summary1.bowlers.map(function (b, i) { return (<div key={i} className="flex flex-col p-1.5 bg-gray-50 rounded border-r-2 border-indigo-500">
                                        <div className="font-bold text-gray-700 truncate">{b.p.name}</div>
                                        <div className="font-black text-teal-600">{b.s.wickets}-{b.s.runs} <span className="text-gray-400 font-normal">({b.s.overs})</span></div>
                                    </div>); })}
                            </div>
                        </div>
                    </div>

                    {/* Innings 2 Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-orange-500 p-3 flex justify-between items-center text-white">
                            <div className="font-bold text-sm tracking-wide">{summary2.team.name}</div>
                            <div className="font-black text-lg">{summary2.score}</div>
                        </div>
                        <div className="p-3 grid grid-cols-2 gap-4 text-[10px]">
                            <div className="space-y-1.5">
                                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1 mb-1 border-b border-gray-100 pb-1">Batters</div>
                                {summary2.batters.map(function (b, i) { return (<div key={i} className="flex flex-col p-1.5 bg-gray-50 rounded border-l-2 border-orange-500">
                                        <div className="font-bold text-gray-700 truncate">{b.p.name}</div>
                                        <div className="font-black text-gray-900">{b.s.runs} <span className="text-gray-400 font-normal">({b.s.balls})</span></div>
                                    </div>); })}
                            </div>
                            <div className="space-y-1.5 text-right">
                                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1 mb-1 border-b border-gray-100 pb-1">Bowlers</div>
                                {summary2.bowlers.map(function (b, i) { return (<div key={i} className="flex flex-col p-1.5 bg-gray-50 rounded border-r-2 border-orange-500">
                                        <div className="font-bold text-gray-700 truncate">{b.p.name}</div>
                                        <div className="font-black text-orange-600">{b.s.wickets}-{b.s.runs} <span className="text-gray-400 font-normal">({b.s.overs})</span></div>
                                    </div>); })}
                            </div>
                        </div>
                    </div>

                    {/* Result Banner (Only shown if completed) */}
                    {matchState.isCompleted && (<div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-6 rounded-2xl text-center text-white shadow-lg animate-in zoom-in-95 duration-300">
                            <h2 className="text-2xl font-black uppercase tracking-tight leading-none mb-1">{result.text}</h2>
                            <p className="text-sm font-bold opacity-90 uppercase tracking-widest">{result.subText}</p>
                        </div>)}

                    {/* MVP Section (Only shown if completed) */}
                    {matchState.isCompleted && mvp.player && (<div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                            <div className="inline-block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Man of the Match</div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 text-left">
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden shrink-0">
                                    <img src={mvp.player.photoUrl || "https://ui-avatars.com/api/?name=".concat(mvp.player.name)} className="w-full h-full object-cover"/>
                                </div>
                                <div>
                                    <div className="font-black text-gray-800">{mvp.player.name}</div>
                                    <div className="text-xs text-gray-500 font-medium mt-0.5">
                                        {mvp.stats.runs > 0 && <span className="mr-2">🏏 {mvp.stats.runs}</span>}
                                        {mvp.stats.wickets > 0 && <span>⚾ {mvp.stats.wickets}</span>}
                                    </div>
                                </div>
                                <div className="ml-auto text-right">
                                    <div className="text-xl font-black text-teal-600 leading-none">{Math.round(mvp.points)}</div>
                                    <div className="text-[9px] font-bold text-gray-400 uppercase">PTS</div>
                                </div>
                            </div>
                        </div>)}

                    <div className="flex flex-col gap-3">
                        {/* Custom Actions (Next Innings / Follow On) */}
                        {nextInningsAction && (<button onClick={nextInningsAction.onClick} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl uppercase text-xs tracking-widest shadow-lg shadow-emerald-600/20 active:scale-95 transition-all">
                                {nextInningsAction.label}
                            </button>)}

                        {followOnAction && (<button onClick={followOnAction.onClick} className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-xl uppercase text-xs tracking-widest shadow-lg shadow-amber-600/20 active:scale-95 transition-all border-2 border-amber-400">
                                {followOnAction.label}
                            </button>)}

                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={handleDownloadPDF} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl uppercase text-[10px] tracking-widest shadow-lg shadow-indigo-600/20">
                                Download PDF
                            </button>
                            <button onClick={onViewScorecard} className="w-full py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-colors">
                                View Scorecard
                            </button>
                        </div>

                        <button onClick={onExit} className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-lg">
                            <span>←</span>
                            <span>{matchState.isCompleted ? 'Return to Dashboard' : 'Back to Scoring'}</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>);
};
exports.MatchResultSummary = MatchResultSummary;
