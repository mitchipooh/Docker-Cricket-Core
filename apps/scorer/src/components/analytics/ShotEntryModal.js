"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShotEntryModal = void 0;
var react_1 = require("react");
var FieldView_1 = require("./FieldView");
var PitchView_1 = require("./PitchView");
var ShotEntryModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, onSave = _a.onSave, existingPitch = _a.existingPitch, existingShot = _a.existingShot, existingHeight = _a.existingHeight, ballColor = _a.ballColor, _b = _a.isWaiting, isWaiting = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)(existingPitch), pitch = _c[0], setPitch = _c[1];
    var _d = (0, react_1.useState)(existingShot), shot = _d[0], setShot = _d[1];
    var _e = (0, react_1.useState)(existingHeight), height = _e[0], setHeight = _e[1];
    var _f = (0, react_1.useState)('PITCH'), tab = _f[0], setTab = _f[1];
    if (!isOpen)
        return null;
    var handleSave = function () {
        onSave(pitch, shot, height);
        onClose();
        // Reset internal state for next time
        setPitch(undefined);
        setShot(undefined);
        setHeight(undefined);
        setTab('PITCH');
    };
    return (<div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[300] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-sm shadow-2xl animate-in zoom-in-95 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-6 bg-slate-950 border-b border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Ball Analytics</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Guided Entry</p>
            </div>
            <div className="text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest bg-indigo-600">
              Step {tab === 'PITCH' ? '1' : tab === 'SHOT' ? '2' : '3'} of 3
            </div>
          </div>

          <div className="flex bg-slate-800 rounded-xl p-1">
            <button onClick={function () { return setTab('PITCH'); }} className={"flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all flex items-center justify-center gap-1 ".concat(tab === 'PITCH' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500')}>
              Pitch
            </button>
            <button onClick={function () { return setTab('SHOT'); }} className={"flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all flex items-center justify-center gap-1 ".concat(tab === 'SHOT' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500')}>
              Shot
            </button>
            <button onClick={function () { return setTab('HEIGHT'); }} className={"flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all flex items-center justify-center gap-1 ".concat(tab === 'HEIGHT' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500')}>
              Type
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 bg-slate-900 flex items-center justify-center relative overflow-y-auto">
          {tab === 'PITCH' && (<div className="w-full animate-in slide-in-from-left-4">
              <p className="text-center text-[10px] text-slate-500 mb-6 font-bold uppercase tracking-widest bg-slate-800 py-2 rounded-full border border-white/5 px-4">
                1. Tap ball impact point
              </p>
              <PitchView_1.PitchView onRecord={function (c) { setPitch(c); setTimeout(function () { return setTab('SHOT'); }, 400); }} deliveries={pitch ? [{ coords: pitch, color: ballColor || '#14b8a6' }] : []}/>
            </div>)}
          {tab === 'SHOT' && (<div className="w-full animate-in slide-in-from-right-4">
              <p className="text-center text-[10px] text-slate-500 mb-6 font-bold uppercase tracking-widest bg-slate-800 py-2 rounded-full border border-white/5 px-4">
                2. Tap where ball traveled
              </p>
              <FieldView_1.FieldView onRecord={function (c) { setShot(c); setTimeout(function () { return setTab('HEIGHT'); }, 400); }} shots={shot ? [{ coords: shot, color: ballColor || '#f59e0b' }] : []}/>
            </div>)}
          {tab === 'HEIGHT' && (<div className="w-full animate-in slide-in-from-bottom-4 flex flex-col items-center">
              <p className="text-center text-[10px] text-slate-500 mb-8 font-bold uppercase tracking-widest bg-slate-800 py-2 rounded-full border border-white/5 px-4 w-full">
                3. Select shot type
              </p>

              <div className="grid grid-cols-1 gap-4 w-full px-4">
                <button onClick={function () { setHeight('Ground'); setTimeout(handleSave, 300); }} className={"py-8 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ".concat(height === 'Ground' ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl scale-105' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500')}>
                  <span className="text-4xl text-emerald-400">🌱</span>
                  <span className="font-black uppercase tracking-widest text-sm">Ground Shot</span>
                </button>

                <button onClick={function () { setHeight('Aerial'); setTimeout(handleSave, 300); }} className={"py-8 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ".concat(height === 'Aerial' ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl scale-105' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500')}>
                  <span className="text-4xl text-sky-400">☁️</span>
                  <span className="font-black uppercase tracking-widest text-sm">Aerial Shot</span>
                </button>
              </div>
            </div>)}

          {/* Waiting Overlay */}
          {isWaiting && (<div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-8 text-center animate-in fade-in duration-500">
              <div className="space-y-6">
                <div className="w-20 h-20 rounded-full border-4 border-slate-700 border-t-indigo-500 animate-spin mx-auto opacity-40"/>
                <div className="space-y-2">
                  <h4 className="text-lg font-black uppercase tracking-tight text-white/50">Waiting on ball</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest italic leading-relaxed">
                    Recording is complete.<br />Please bowl the next delivery.
                  </p>
                </div>
              </div>
            </div>)}
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-950 flex gap-4">
          <button key="skip" onClick={onClose} className="flex-1 py-4 text-slate-500 font-black uppercase text-xs hover:text-white transition-all">Skip</button>
          <button key="save" onClick={handleSave} disabled={!pitch && !shot && !height} className="flex-1 py-4 bg-gradient-to-r from-teal-600 to-indigo-600 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale">
            Done
          </button>
        </div>
      </div>
    </div>);
};
exports.ShotEntryModal = ShotEntryModal;
