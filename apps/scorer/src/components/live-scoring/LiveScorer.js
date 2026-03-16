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
exports.LiveScorer = void 0;
var react_1 = require("react");
var ScoreSummaryWidget_1 = require("./ScoreSummaryWidget");
var ActivePlayersWidget_1 = require("./ActivePlayersWidget");
var TimelineWidget_1 = require("./TimelineWidget");
var ControlPadWidget_1 = require("./ControlPadWidget");
var LiveScorer = function (_a) {
    var match = _a.match, teams = _a.teams, onUpdateMatchState = _a.onUpdateMatchState, onExit = _a.onExit;
    // --- MATCH LOGIC INITIALIZATION ---
    var _b = (0, react_1.useState)(function () { return match.savedState || {
        innings: 1,
        battingTeamId: match.teamAId,
        bowlingTeamId: match.teamBId,
        score: 0,
        wickets: 0,
        totalBalls: 0,
        inningsScores: [],
        strikerId: '',
        nonStrikerId: '',
        bowlerId: '',
        isCompleted: false,
        history: [],
        matchTimer: { startTime: Date.now(), totalAllowances: 0, isPaused: false, lastPauseTime: null }
    }; }), state = _b[0], setState = _b[1];
    (0, react_1.useEffect)(function () {
        if (match.savedState)
            setState(match.savedState);
    }, [match.savedState]);
    var battingTeam = teams.find(function (t) { return t.id === state.battingTeamId; });
    // --- ACTIONS ---
    var handleInput = function (val) {
        var runs = typeof val === 'number' ? val : 0;
        var newBall = {
            timestamp: Date.now(),
            over: Math.floor(state.totalBalls / 6),
            ballNumber: (state.totalBalls % 6) + 1,
            strikerId: state.strikerId,
            bowlerId: state.bowlerId,
            runs: runs,
            isWicket: false,
            commentary: 'Ball bowled',
            innings: state.innings
        };
        var newState = __assign(__assign({}, state), { score: state.score + runs, totalBalls: state.totalBalls + 1, history: __spreadArray(__spreadArray([], state.history, true), [newBall], false) });
        setState(newState);
        onUpdateMatchState(match.id, newState);
    };
    var handleWicket = function () {
        var newBall = {
            timestamp: Date.now(),
            over: Math.floor(state.totalBalls / 6),
            ballNumber: (state.totalBalls % 6) + 1,
            strikerId: state.strikerId,
            bowlerId: state.bowlerId,
            runs: 0,
            isWicket: true,
            wicketType: 'Bowled',
            commentary: 'Wicket!',
            innings: state.innings
        };
        var newState = __assign(__assign({}, state), { wickets: state.wickets + 1, totalBalls: state.totalBalls + 1, history: __spreadArray(__spreadArray([], state.history, true), [newBall], false) });
        setState(newState);
        onUpdateMatchState(match.id, newState);
    };
    // FIXED SINGLE SCREEN LAYOUT WITHOUT SCROLL
    // Using CSS Grid to allocate space efficiently
    return (<div className="fixed inset-0 bg-slate-950 flex flex-col z-50">
            {/* 1. Header (Fixed Height) */}
            <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-2">
                    <button onClick={onExit} className="text-slate-400 hover:text-white">✕</button>
                    <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block leading-none">{match.teamAName} vs {match.teamBName}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-500/10 px-2 py-1 rounded">Live</span>
                </div>
            </div>

            {/* 2. Main Content Area (Flex Grow - Takes remaining space but no scroll) */}
            <div className="flex-1 flex flex-col min-h-0 p-2 gap-2">
                {/* Top Section: Summary & Players */}
                <div className="flex-[2] flex flex-col gap-2 min-h-0">
                    <ScoreSummaryWidget_1.ScoreSummaryWidget match={match} state={state} battingTeam={battingTeam}/>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <ActivePlayersWidget_1.ActivePlayersWidget state={state} teams={teams}/>
                    </div>
                </div>

                {/* Middle Section: Timeline (Fixed Height) */}
                <div className="shrink-0 h-10 mt-1">
                    <TimelineWidget_1.TimelineWidget state={state}/>
                </div>

                {/* Bottom Section: Controls (Flex Grow to fill bottom) */}
                <div className="flex-[3] min-h-0 mt-1">
                    <ControlPadWidget_1.ControlPadWidget onScoringInput={handleInput} onUndo={function () { }} onExtra={function () { }} onWicket={handleWicket}/>
                </div>
            </div>
        </div>);
};
exports.LiveScorer = LiveScorer;
