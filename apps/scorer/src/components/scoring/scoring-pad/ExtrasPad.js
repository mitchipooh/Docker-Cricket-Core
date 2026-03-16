"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtrasPad = void 0;
var react_1 = require("react");
var ExtrasPad = function (_a) {
    var readOnly = _a.readOnly, compact = _a.compact, onBack = _a.onBack, onCommitExtra = _a.onCommitExtra;
    var _b = (0, react_1.useState)(''), extraType = _b[0], setExtraType = _b[1];
    var _c = (0, react_1.useState)('Bat'), nbSubType = _c[0], setNbSubType = _c[1];
    var _d = (0, react_1.useState)(0), extraRuns = _d[0], setExtraRuns = _d[1];
    var _e = (0, react_1.useState)(false), showCustomInput = _e[0], setShowCustomInput = _e[1];
    var _f = (0, react_1.useState)(''), customRunsVal = _f[0], setCustomRunsVal = _f[1];
    var isByeOrLegBye = extraType === 'Bye' || extraType === 'LegBye';
    var isNoBall = extraType === 'NoBall';
    var runButtons = [0, 1, 2, 3, 4];
    if (isByeOrLegBye) {
        runButtons = [1, 2, 3, 4];
    }
    else if (isNoBall) {
        if (nbSubType === 'Bat') {
            runButtons = [0, 1, 2, 3, 4, 6];
        }
        else {
            runButtons = [1, 2, 3, 4];
        }
    }
    var btnClass = function (active) {
        return "flex-1 rounded-lg font-black text-xs uppercase tracking-wider transition-all border flex items-center justify-center ".concat(active
            ? 'bg-amber-600 text-white border-amber-600 shadow-md'
            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50', " ").concat(readOnly ? 'opacity-50 cursor-not-allowed' : '');
    };
    return (<div className="h-full w-full flex flex-col p-2 gap-2 bg-slate-50 overflow-hidden">
            {/* Header - Compact */}
            <h3 className="text-center font-black uppercase text-[9px] text-slate-400 tracking-[0.2em] shrink-0 h-4">
                Select Extra
            </h3>

            {/* Type Selection - Row 1 (Reduced Height) */}
            <div className="flex gap-2 h-12 shrink-0">
                <button onClick={function () { setExtraType('Wide'); setShowCustomInput(false); }} disabled={readOnly} className={btnClass(extraType === 'Wide')}>
                    Wide
                </button>
                <button onClick={function () {
            setExtraType('NoBall');
            setNbSubType('Bat');
            setShowCustomInput(false);
            if (extraRuns === 0)
                setExtraRuns(0);
        }} disabled={readOnly} className={btnClass(extraType === 'NoBall')}>
                    No Ball
                </button>
                <button onClick={function () {
            setExtraType('Bye');
            setShowCustomInput(false);
            if (extraRuns === 0)
                setExtraRuns(1);
        }} disabled={readOnly} className={btnClass(extraType === 'Bye')}>
                    Bye
                </button>
                <button onClick={function () {
            setExtraType('LegBye');
            setShowCustomInput(false);
            if (extraRuns === 0)
                setExtraRuns(1);
        }} disabled={readOnly} className={btnClass(extraType === 'LegBye')}>
                    Leg Bye
                </button>
            </div>

            {/* Sub-Type Selection (No Ball) - Conditional Row (Reduced Height) */}
            {isNoBall ? (<div className="flex gap-2 h-10 shrink-0 animate-in slide-in-from-top-2 fade-in">
                    <button onClick={function () { setNbSubType('Bat'); if (extraRuns === 0)
            setExtraRuns(0); }} disabled={readOnly} className={btnClass(nbSubType === 'Bat')}>
                        Off Bat
                    </button>
                    <button onClick={function () { setNbSubType('LegBye'); if (extraRuns === 0)
            setExtraRuns(1); }} disabled={readOnly} className={btnClass(nbSubType === 'LegBye')}>
                        NB + LB
                    </button>
                    <button onClick={function () { setNbSubType('Bye'); if (extraRuns === 0)
            setExtraRuns(1); }} disabled={readOnly} className={btnClass(nbSubType === 'Bye')}>
                        NB + BYE
                    </button>
                </div>) : (
        /* Spacer to balance layout if needed, or null to collapse */
        <div className="h-0 shrink-0 border-none"/>)}

            {/* Runs Selection - Flex Content (Takes remaining space) */}
            <div className="flex-1 min-h-0 flex flex-col justify-center gap-2">
                <h3 className="text-center font-black uppercase text-[9px] text-slate-300 tracking-[0.2em] shrink-0">
                    Run Score
                </h3>
                {showCustomInput ? (<div className="flex gap-2 h-14">
                        <input type="number" value={customRunsVal} onChange={function (e) { return setCustomRunsVal(e.target.value); }} placeholder="#" autoFocus disabled={readOnly} className="flex-1 bg-white border-2 border-slate-200 rounded-xl px-4 text-center text-slate-900 font-black text-2xl outline-none focus:border-amber-500"/>
                        <button onClick={function () {
                var val = parseInt(customRunsVal);
                if (!isNaN(val)) {
                    setExtraRuns(val);
                    setShowCustomInput(false);
                }
            }} className="w-20 bg-amber-600 text-white rounded-xl font-black uppercase text-xs">
                            Set
                        </button>
                    </div>) : (<div className="flex gap-2 h-14 shrink-0">
                        {runButtons.map(function (r) { return (<button key={r} onClick={function () { return setExtraRuns(r); }} disabled={readOnly} className={"flex-1 rounded-xl font-black text-2xl transition-all border flex items-center justify-center ".concat(extraRuns === r
                    ? 'bg-slate-800 text-white border-slate-800 shadow-lg scale-105'
                    : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50')}>
                                {r}
                            </button>); })}
                        <button onClick={function () { return setShowCustomInput(true); }} disabled={readOnly} className="w-12 rounded-xl font-bold text-xs bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center uppercase">
                            ...
                        </button>
                    </div>)}
            </div>

            {/* Footer Actions - Fixed Bottom (High Priority) */}
            <div className="flex gap-2 h-14 shrink-0 mt-auto z-10">
                <button onClick={onBack} className="w-1/3 bg-white text-slate-400 font-black uppercase text-xs rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
                    Cancel
                </button>
                <button disabled={!extraType || readOnly} onClick={function () {
            var isOffBat = extraType === 'NoBall' ? nbSubType === 'Bat' : false;
            onCommitExtra(extraType, extraRuns, isOffBat);
        }} className="flex-1 bg-amber-600 text-white font-black uppercase text-xs rounded-xl shadow-lg shadow-amber-900/20 hover:bg-amber-500 transition-all disabled:opacity-50 disabled:shadow-none tracking-widest">
                    Confirm {extraType === null || extraType === void 0 ? void 0 : extraType.replace('NoBall', 'No Ball')}
                </button>
            </div>
        </div>);
};
exports.ExtrasPad = ExtrasPad;
