"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverRateTimer = OverRateTimer;
var react_1 = require("react");
function OverRateTimer(_a) {
    var elapsedSeconds = _a.elapsedSeconds, actualOvers = _a.actualOvers, expectedOvers = _a.expectedOvers, behindRate = _a.behindRate, _b = _a.totalInningsMinutes // Standard T20
    , totalInningsMinutes = _b === void 0 ? 85 : _b // Standard T20
    ;
    var _c = (0, react_1.useState)(false), showRemaining = _c[0], setShowRemaining = _c[1];
    var formatTime = function (totalSecs) {
        var s = Math.abs(totalSecs);
        var hours = Math.floor(s / 3600);
        var minutes = Math.floor((s % 3600) / 60);
        var seconds = s % 60;
        return hours > 0
            ? "".concat(hours, ":").concat(minutes.toString().padStart(2, '0'), ":").concat(seconds.toString().padStart(2, '0'))
            : "".concat(minutes.toString().padStart(2, '0'), ":").concat(seconds.toString().padStart(2, '0'));
    };
    var totalInningsSeconds = totalInningsMinutes * 60;
    var timeRemaining = totalInningsSeconds - elapsedSeconds;
    // Calculate Avg time per over
    var avgSecondsPerOver = actualOvers > 0 ? elapsedSeconds / actualOvers : 0;
    return (<button onClick={function () { return setShowRemaining(!showRemaining); }} className={"\n        flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all duration-300\n        ".concat(behindRate
            ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.6)] animate-pulse'
            : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white', "\n      ")}>
      <div className="flex items-center gap-1.5">
        <span className={behindRate ? 'text-white' : 'opacity-70'}>
            {behindRate ? '⚠️' : '⏱'}
        </span>
        <span className={behindRate ? 'text-white' : 'text-indigo-400'}>
          {showRemaining ? "Rem: ".concat(formatTime(timeRemaining)) : formatTime(elapsedSeconds)}
        </span>
      </div>

      <div className={"w-px h-3 ".concat(behindRate ? 'bg-white/30' : 'bg-white/10')}/>

      <div className="flex items-center gap-1.5 whitespace-nowrap">
         <span className="text-white">{actualOvers.toFixed(1)} Ov</span>
         {!behindRate && actualOvers > 0 && (<span className="text-[9px] text-emerald-400 ml-1">Avg {formatTime(Math.round(avgSecondsPerOver))}</span>)}
      </div>
      
      {behindRate && (<span className="text-[9px] bg-white text-red-600 px-1.5 py-0.5 rounded uppercase tracking-widest font-black ml-1">
          SLOW
        </span>)}
    </button>);
}
