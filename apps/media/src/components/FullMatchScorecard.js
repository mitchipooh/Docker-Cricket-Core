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
exports.FullMatchScorecard = void 0;
var react_1 = require("react");
var buildBattingCard_1 = require("../../scorer/scorecard/buildBattingCard");
var buildBowlingCard_1 = require("../../scorer/scorecard/buildBowlingCard");
var BattingScorecard_1 = require("./BattingScorecard");
var BowlingScorecard_1 = require("./BowlingScorecard");
var LinearScorebook_1 = require("@cricket/shared/scoring/LinearScorebook");
var FullMatchScorecard = function (_a) {
    var matchState = _a.matchState, teamA = _a.teamA, teamB = _a.teamB, onBack = _a.onBack;
    // Determine which innings have data
    var inningsList = (0, react_1.useMemo)(function () {
        var list = [];
        // Check completed innings
        matchState.inningsScores.forEach(function (s) {
            if (!list.includes(s.innings))
                list.push(s.innings);
        });
        // Check current innings
        if (!list.includes(matchState.innings)) {
            // Only if there's some history or it's innings 1
            if (matchState.innings === 1 || matchState.history.some(function (b) { return b.innings === matchState.innings; })) {
                list.push(matchState.innings);
            }
        }
        return list.sort(function (a, b) { return a - b; });
    }, [matchState]);
    var _b = (0, react_1.useState)(inningsList[inningsList.length - 1] || 1), activeTab = _b[0], setActiveTab = _b[1];
    var _c = (0, react_1.useState)('SUMMARY'), viewMode = _c[0], setViewMode = _c[1];
    var _d = (0, react_1.useState)(1), scale = _d[0], setScale = _d[1];
    // Helper to build data for a specific innings
    var getInningsData = function (inn) {
        // Is it completed?
        var completedData = matchState.inningsScores.find(function (s) { return s.innings === inn; });
        // Determine Batting Team
        var battingTeamId = completedData === null || completedData === void 0 ? void 0 : completedData.teamId;
        // If not in completed, check if it's current
        if (!battingTeamId && matchState.innings === inn) {
            battingTeamId = matchState.battingTeamId;
        }
        // If still unknown (shouldn't happen for valid innings), deduce from logic (simplified)
        if (!battingTeamId) {
            // Robust Fallback: Check who batted in this innings from history
            var firstBallOfInnings = matchState.history.find(function (b) { return b.innings === inn; });
            var sId_1 = firstBallOfInnings === null || firstBallOfInnings === void 0 ? void 0 : firstBallOfInnings.strikerId;
            if (sId_1) {
                if (teamA.players.some(function (p) { return p.id === sId_1; }))
                    battingTeamId = teamA.id;
                else if (teamB.players.some(function (p) { return p.id === sId_1; }))
                    battingTeamId = teamB.id;
            }
            if (!battingTeamId)
                return null;
        }
        var battingTeam = battingTeamId === teamA.id ? teamA : teamB;
        var bowlingTeam = battingTeamId === teamA.id ? teamB : teamA;
        // Current Strikers (only if this is the active current innings)
        var isCurrent = matchState.innings === inn && !matchState.isCompleted;
        var sId = isCurrent ? matchState.strikerId : '';
        var nsId = isCurrent ? matchState.nonStrikerId : '';
        var battingCard = (0, buildBattingCard_1.buildBattingCard)(matchState.history, battingTeam.players, inn, sId, nsId);
        var bowlingCard = (0, buildBowlingCard_1.buildBowlingCard)(matchState.history, bowlingTeam.players, inn);
        return { battingTeam: battingTeam, bowlingTeam: bowlingTeam, battingCard: battingCard, bowlingCard: bowlingCard };
    };
    var activeData = getInningsData(activeTab);
    var handleZoom = function (direction) {
        setScale(function (prev) {
            var next = direction === 'in' ? prev + 0.1 : prev - 0.1;
            return Math.max(0.5, Math.min(next, 1.5));
        });
    };
    return (<div className="flex flex-col h-full bg-slate-950 text-white animate-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-slate-800 bg-slate-900 shrink-0">
        <div className="flex items-center gap-3">
          {onBack && (<button onClick={onBack} className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all text-sm">
              ←
            </button>)}
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain"/>
            <div>
              <h2 className="text-sm font-black uppercase tracking-tight">Scorecard</h2>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{teamA.name} vs {teamB.name}</p>
            </div>
          </div>
          {/* Status Banner */}
          {matchState.isCompleted ? (<div className="flex items-center gap-2 bg-emerald-950/30 border border-emerald-500/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Completed</span>
            </div>) : (<div className="flex items-center gap-2 bg-indigo-950/30 border border-indigo-500/20 px-3 py-1 rounded-full animate-pulse">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Live Cloud Match</span>
            </div>)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Zoom Controls */}
        <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          <button onClick={function () { return handleZoom('out'); }} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded text-xs">-</button>
          <span className="w-8 flex items-center justify-center text-[9px] font-mono text-slate-500">{Math.round(scale * 100)}%</span>
          <button onClick={function () { return handleZoom('in'); }} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded text-xs">+</button>
        </div>

        {/* View Mode Switcher */}
        <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          <button onClick={function () { return setViewMode('SUMMARY'); }} className={"px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ".concat(viewMode === 'SUMMARY' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white')}>
            Summary
          </button>
          <button onClick={function () { return setViewMode('BOOK'); }} className={"px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ".concat(viewMode === 'BOOK' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white')}>
            Book
          </button>
        </div>
      </div>

      {/* Innings Tabs */}
      <div className="flex bg-slate-900 border-b border-slate-800 overflow-x-auto no-scrollbar shrink-0">
        {inningsList.map(function (inn) {
            var data = getInningsData(inn);
            if (!data)
                return null;
            return (<button key={inn} onClick={function () { return setActiveTab(inn); }} className={"px-4 py-3 text-[10px] font-black uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ".concat(activeTab === inn
                    ? 'border-indigo-500 text-white bg-slate-800'
                    : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/50')}>
              Inn {inn} ({data.battingTeam.name.substring(0, 3).toUpperCase()})
            </button>);
        })}
      </div>

      {/* Content with Zoom */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-slate-950">
        <div style={{ transform: "scale(".concat(scale, ")"), transformOrigin: 'top center', transition: 'transform 0.2s ease' }}>
          {activeData ? (viewMode === 'SUMMARY' ? (<div className="space-y-4 max-w-4xl mx-auto">
                <div className="animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest">Batting</h3>
                    <div className="text-[10px] font-bold text-slate-400">{activeData.battingTeam.name}</div>
                  </div>
                  <BattingScorecard_1.BattingScorecard data={activeData.battingCard}/>
                </div>

                <div className="animate-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest">Bowling</h3>
                    <div className="text-[10px] font-bold text-slate-400">{activeData.bowlingTeam.name}</div>
                  </div>
                  <BowlingScorecard_1.BowlingScorecard rows={activeData.bowlingCard}/>
                </div>
              </div>) : (<div className="animate-in slide-in-from-right-4 duration-300 max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest">Scorebook View</h3>
                  <div className="text-[10px] font-bold text-slate-400">{activeData.battingTeam.name}</div>
                </div>
                <LinearScorebook_1.LinearScorebook data={__assign(__assign({}, activeData.battingCard), { bowlingRows: activeData.bowlingCard })}/>
              </div>)) : (<div className="text-center py-20 text-slate-500 font-bold uppercase text-xs tracking-widest">
              No data for this innings
            </div>)}
        </div>
      </div>
    </div>);
};
exports.FullMatchScorecard = FullMatchScorecard;
