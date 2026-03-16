"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoringPad = void 0;
var react_1 = require("react");
var MainPad_1 = require("./scoring-pad/MainPad");
var MobileScoringPad_1 = require("./scoring-pad/MobileScoringPad");
var ExtrasPad_1 = require("./scoring-pad/ExtrasPad");
var EventsPad_1 = require("./scoring-pad/EventsPad");
var ConfirmationPad_1 = require("./scoring-pad/ConfirmationPad");
var ScoringPad = function (props) {
    var padView = props.padView, onBack = props.onBack;
    if (padView === 'main') {
        return (<>
        <div className="md:hidden h-full w-full">
          <MobileScoringPad_1.MobileScoringPad {...props}/>
        </div>
        <div className="hidden md:block h-full w-full">
          <MainPad_1.MainPad {...props}/>
        </div>
      </>);
    }
    if (padView === 'extras') {
        return <ExtrasPad_1.ExtrasPad {...props}/>;
    }
    if (padView === 'events') {
        return <EventsPad_1.EventsPad {...props}/>;
    }
    if (padView === 'declare_confirm' || padView === 'end_match_confirm') {
        return <ConfirmationPad_1.ConfirmationPad {...props}/>;
    }
    return (<div className="h-full flex flex-col items-center justify-center text-center p-4 bg-slate-900 rounded-xl border border-slate-800">
      <div className="text-2xl mb-2 opacity-20">⚙️</div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">View Not Ready</p>
      <button onClick={onBack} className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all">Back</button>
    </div>);
};
exports.ScoringPad = ScoringPad;
