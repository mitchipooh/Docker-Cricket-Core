"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverFeed = void 0;
var react_1 = require("react");
var BallEditorModal_1 = require("../modals/BallEditorModal");
var OverFeed = function (_a) {
    var matchState = _a.matchState, battingTeam = _a.battingTeam, bowlingTeam = _a.bowlingTeam, onEditBall = _a.onEditBall;
    var _b = (0, react_1.useState)(null), editingBall = _b[0], setEditingBall = _b[1];
    var _c = (0, react_1.useState)(null), activeEditOver = _c[0], setActiveEditOver = _c[1];
    // Group balls by over
    var currentInningsBalls = matchState.history
        .filter(function (b) { var _a; return b.innings === matchState.innings && !((_a = b.commentary) === null || _a === void 0 ? void 0 : _a.startsWith('EVENT')); })
        .reverse();
    var oversMap = new Map();
    currentInningsBalls.forEach(function (b) {
        if (!oversMap.has(b.over))
            oversMap.set(b.over, []);
        oversMap.get(b.over).push(b);
    });
    var overIndices = Array.from(oversMap.keys()).sort(function (a, b) { return b - a; });
    var getBallSymbol = function (ball) {
        if (ball.isWicket)
            return 'W';
        if (ball.extraType === 'Wide')
            return "".concat(1 + (ball.extraRuns || 0), "w");
        if (ball.extraType === 'NoBall')
            return "".concat(1 + (ball.runs || 0), "n");
        if (ball.extraType === 'Bye')
            return "".concat(ball.extraRuns, "b");
        if (ball.extraType === 'LegBye')
            return "".concat(ball.extraRuns, "l");
        if (ball.runs === 0)
            return '•';
        return ball.runs.toString();
    };
    var getBallColor = function (ball) {
        if (ball.isWicket)
            return 'bg-red-600 text-white';
        if (ball.extraType !== 'None' && ball.extraType)
            return 'bg-amber-600 text-white';
        if (ball.runs >= 4)
            return 'bg-indigo-600 text-white';
        if (ball.runs === 0)
            return 'bg-slate-800 text-slate-500';
        return 'bg-slate-700 text-white';
    };
    return (<div className="h-full flex flex-col bg-slate-950 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Match Timeline</h2>
        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          {overIndices.length} Overs Recorded
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {overIndices.map(function (overIdx) {
            var balls = oversMap.get(overIdx);
            var bowlerId = balls[0].bowlerId;
            var bowler = bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.players.find(function (p) { return p.id === bowlerId; });
            var isBeingEdited = activeEditOver === overIdx;
            return (<div key={overIdx} className={"flex items-center px-4 py-2 border-b border-white/5 transition-colors ".concat(isBeingEdited ? 'bg-indigo-500/10' : 'hover:bg-white/5')}>
              {/* Left: Over & Bowler */}
              <div className="w-32 shrink-0 flex flex-col justify-center">
                <div className="text-[10px] font-black text-indigo-500 uppercase leading-none mb-1">Over {overIdx + 1}</div>
                <div className="text-xs font-bold text-white truncate pr-2">{(bowler === null || bowler === void 0 ? void 0 : bowler.name) || 'Unknown'}</div>
              </div>

              {/* Center: Balls */}
              <div className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {balls.map(function (ball, bIdx) { return (<button key={ball.timestamp} disabled={!isBeingEdited} onClick={function () { return setEditingBall(ball); }} className={"\n                      w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black transition-all shrink-0\n                      ".concat(getBallColor(ball), "\n                      ").concat(isBeingEdited ? 'ring-2 ring-indigo-400 animate-pulse scale-105 shadow-lg' : '', "\n                    ")}>
                    {getBallSymbol(ball)}
                  </button>); })}
              </div>

              {/* Right: Edit Toggle */}
              <div className="w-16 shrink-0 flex justify-end">
                <button onClick={function () { return setActiveEditOver(isBeingEdited ? null : overIdx); }} className={"\n                    px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all\n                    ".concat(isBeingEdited
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white', "\n                  ")}>
                  {isBeingEdited ? 'DONE' : 'EDIT'}
                </button>
              </div>
            </div>);
        })}

        {overIndices.length === 0 && (<div className="h-full flex flex-col items-center justify-center p-20 opacity-20 text-center">
            <span className="text-5xl mb-4">🏏</span>
            <p className="text-sm font-black uppercase tracking-widest">No overs bowled yet</p>
          </div>)}
      </div>

      {editingBall && (<BallEditorModal_1.BallEditorModal ball={editingBall} battingTeam={battingTeam} bowlingTeam={bowlingTeam} onClose={function () { return setEditingBall(null); }} onSave={function (updates) {
                onEditBall(editingBall.timestamp, updates);
                setEditingBall(null);
            }}/>)}
    </div>);
};
exports.OverFeed = OverFeed;
