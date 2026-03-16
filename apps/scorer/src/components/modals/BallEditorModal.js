"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BallEditorModal = void 0;
var react_1 = require("react");
var BallEditorModal = function (_a) {
    var ball = _a.ball, battingTeam = _a.battingTeam, bowlingTeam = _a.bowlingTeam, onClose = _a.onClose, onSave = _a.onSave;
    var _b = (0, react_1.useState)(ball.runs), runs = _b[0], setRuns = _b[1];
    var _c = (0, react_1.useState)(ball.extraType), extraType = _c[0], setExtraType = _c[1];
    var _d = (0, react_1.useState)(ball.extraRuns || 0), extraRuns = _d[0], setExtraRuns = _d[1];
    var _e = (0, react_1.useState)(ball.isWicket), isWicket = _e[0], setIsWicket = _e[1];
    var _f = (0, react_1.useState)(ball.wicketType), wicketType = _f[0], setWicketType = _f[1];
    var _g = (0, react_1.useState)(ball.strikerId), strikerId = _g[0], setStrikerId = _g[1];
    var _h = (0, react_1.useState)(ball.bowlerId), bowlerId = _h[0], setBowlerId = _h[1];
    var WICKET_TYPES = [
        'Bowled', 'Caught', 'LBW', 'Run Out', 'Stumped', 'Hit Wicket'
    ];
    var handleSave = function () {
        onSave({
            runs: runs,
            batRuns: extraType === 'Wide' ? 0 : runs,
            extraType: extraType,
            extraRuns: extraRuns,
            isWicket: isWicket,
            wicketType: isWicket ? wicketType : undefined,
            strikerId: strikerId,
            bowlerId: bowlerId
        });
    };
    return (<div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[300] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95">
         <div className="bg-slate-950 p-6 border-b border-slate-800 flex justify-between items-center">
            <div>
               <h3 className="text-xl font-black text-white">Edit Ball {ball.over}.{ball.ballNumber}</h3>
               <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Retroactive Scorer Override</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors">✕</button>
         </div>

         <div className="p-8 space-y-6 overflow-y-auto no-scrollbar">
            {/* Identity */}
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Striker</label>
                  <select value={strikerId} onChange={function (e) { return setStrikerId(e.target.value); }} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs font-bold text-white outline-none">
                     {battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.players.map(function (p) { return <option key={p.id} value={p.id}>{p.name}</option>; })}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Bowler</label>
                  <select value={bowlerId} onChange={function (e) { return setBowlerId(e.target.value); }} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs font-bold text-white outline-none">
                     {bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.players.map(function (p) { return <option key={p.id} value={p.id}>{p.name}</option>; })}
                  </select>
               </div>
            </div>

            {/* Outcome */}
            <div className="grid grid-cols-3 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Runs</label>
                  <input type="number" value={runs} onChange={function (e) { return setRuns(parseInt(e.target.value) || 0); }} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs font-bold text-white outline-none"/>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Extra Type</label>
                  <select value={extraType} onChange={function (e) { return setExtraType(e.target.value); }} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs font-bold text-white outline-none">
                     <option value="None">None</option>
                     <option value="Wide">Wide</option>
                     <option value="NoBall">No Ball</option>
                     <option value="Bye">Bye</option>
                     <option value="LegBye">Leg Bye</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Extra Runs</label>
                  <input type="number" value={extraRuns} onChange={function (e) { return setExtraRuns(parseInt(e.target.value) || 0); }} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs font-bold text-white outline-none"/>
               </div>
            </div>

            {/* Wicket */}
            <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/20">
               <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-black text-red-400 uppercase tracking-widest">Wicket Incident</label>
                  <button onClick={function () { return setIsWicket(!isWicket); }} className={"px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ".concat(isWicket ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-500')}>
                     {isWicket ? 'Active' : 'No Wicket'}
                  </button>
               </div>
               {isWicket && (<div className="grid grid-cols-2 gap-2">
                     {WICKET_TYPES.map(function (t) { return (<button key={t} onClick={function () { return setWicketType(t); }} className={"p-2 rounded-xl border text-[10px] font-bold transition-all ".concat(wicketType === t ? 'border-red-500 bg-red-500/20 text-white' : 'border-slate-700 bg-slate-800 text-slate-500')}>
                           {t}
                        </button>); })}
                  </div>)}
            </div>
         </div>

         <div className="p-6 bg-slate-950 border-t border-slate-800 flex gap-4 shrink-0">
            <button onClick={onClose} className="flex-1 py-4 text-slate-500 font-black uppercase text-xs hover:text-white transition-all">Cancel</button>
            <button onClick={handleSave} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-900/20 hover:bg-indigo-500 transition-all">Update History</button>
         </div>
      </div>
    </div>);
};
exports.BallEditorModal = BallEditorModal;
