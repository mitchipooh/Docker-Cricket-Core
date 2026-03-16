"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndOfOverModal = void 0;
var react_1 = require("react");
var EndOfOverModal = function (_a) {
    var isOpen = _a.isOpen, overNumber = _a.overNumber, bowlingTeamName = _a.bowlingTeamName, currentBowlerId = _a.currentBowlerId, bowlers = _a.bowlers, onSelectBowler = _a.onSelectBowler, getAvailability = _a.getAvailability;
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[50] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95">
        <div className="bg-slate-900 p-8 text-center">
           <h2 className="text-2xl font-black text-white uppercase italic tracking-wider">Over {overNumber} Complete</h2>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Select Next Bowler for {bowlingTeamName}</p>
        </div>
        
        <div className="p-4 bg-slate-50 max-h-[60vh] overflow-y-auto custom-scrollbar">
           <div className="grid grid-cols-1 gap-2">
              {bowlers.map(function (p) {
            var avail = getAvailability(p.id);
            var isCurrent = p.id === currentBowlerId;
            return (<button key={p.id} disabled={!avail.allowed} onClick={function () { return onSelectBowler(p.id); }} className={"w-full p-4 rounded-xl flex items-center justify-between border-2 transition-all ".concat(isCurrent
                    ? 'border-slate-200 bg-slate-100 opacity-50 cursor-not-allowed'
                    : !avail.allowed
                        ? 'border-slate-100 bg-white opacity-40 grayscale'
                        : 'border-white bg-white shadow-sm hover:border-indigo-500 hover:shadow-md')}>
                       <div className="flex items-center gap-3">
                          <div className={"w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ".concat(isCurrent ? 'bg-slate-300 text-slate-500' : 'bg-indigo-100 text-indigo-600')}>
                             {p.name.charAt(0)}
                          </div>
                          <div className="text-left">
                             <div className="font-bold text-sm text-slate-900">{p.name}</div>
                             <div className="text-[10px] font-bold text-slate-400 uppercase">{p.role}</div>
                          </div>
                       </div>
                       {!avail.allowed && (<span className="text-[9px] font-black text-red-400 uppercase tracking-wider">{avail.reason}</span>)}
                    </button>);
        })}
           </div>
        </div>
      </div>
    </div>);
};
exports.EndOfOverModal = EndOfOverModal;
