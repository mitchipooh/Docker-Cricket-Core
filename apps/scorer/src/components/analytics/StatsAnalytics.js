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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsAnalytics = void 0;
var react_1 = require("react");
var cricket_engine_1 = require("@cricket/shared/utils/cricket-engine");
var PitchView_1 = require("./PitchView");
var FieldView_1 = require("./FieldView");
var StatsAnalytics = function (_a) {
    var teams = _a.teams, onBack = _a.onBack, hideHeader = _a.hideHeader;
    var _b = (0, react_1.useState)(null), dlsData = _b[0], setDlsData = _b[1];
    var _c = (0, react_1.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, react_1.useState)({
        score: 150,
        wickets: 4,
        overs: 12.4,
        target: 200,
        weather: "Overcast with light drizzle"
    }), dlsForm = _d[0], setDlsForm = _d[1];
    var runDLS = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setIsLoading(true);
            setTimeout(function () {
                var oversLost = 20 - dlsForm.overs;
                var revised = (0, cricket_engine_1.calculateDLSTarget)(dlsForm.target - 1, oversLost, dlsForm.wickets, 20);
                setDlsData({
                    revisedTarget: revised,
                    tacticalAdvice: "Based on current mathematical trends, maintain the run rate and protect wickets to stay ahead of the par score.",
                    winningProbability: Math.min(100, Math.max(0, 50 + (dlsForm.score / dlsForm.target * 50) - (dlsForm.wickets * 10)))
                });
                setIsLoading(false);
            }, 600);
            return [2 /*return*/];
        });
    }); };
    // Mock data for visualizations since we don't query a specific match here
    var mockPitchData = [
        { coords: { x: 45, y: 30 }, color: 'red' },
        { coords: { x: 55, y: 150 }, color: 'green' },
        { coords: { x: 50, y: 170 }, color: 'blue' },
        { coords: { x: 20, y: 40 }, color: 'yellow' },
    ];
    var mockShotData = [
        { coords: { x: 10, y: 10 }, color: 'red' },
        { coords: { x: 90, y: 90 }, color: 'green' },
        { coords: { x: 50, y: 10 }, color: 'white' },
        { coords: { x: 20, y: 50 }, color: 'yellow' },
    ];
    return (<div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500">
      {!hideHeader && (<header className="flex items-center gap-6">
          {onBack && (<button onClick={onBack} className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-all shadow-lg border border-slate-700">←</button>)}
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Advanced Analytics</h1>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Moneyball Insights & DLS Logic</p>
          </div>
        </header>)}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pitch & Field Analysis */}
        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Spatial Analysis</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center">
              <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Pitch Map</h4>
              <PitchView_1.PitchView deliveries={mockPitchData} readonly/>
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center">
              <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4">Wagon Wheel</h4>
              <FieldView_1.FieldView shots={mockShotData} readonly/>
            </div>
          </div>

          <div className="mt-4 flex gap-4 text-[10px] uppercase font-bold text-slate-500 justify-center">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Wicket</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Dot</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> 4s/6s</span>
          </div>
        </div>

        {/* DLS Module */}
        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🌧️</span>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">DLS Target Calculator</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Current Score</label>
              <input type="number" value={dlsForm.score} onChange={function (e) { return setDlsForm(__assign(__assign({}, dlsForm), { score: Number(e.target.value) })); }} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"/>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Wickets Down</label>
              <input type="number" value={dlsForm.wickets} onChange={function (e) { return setDlsForm(__assign(__assign({}, dlsForm), { wickets: Number(e.target.value) })); }} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"/>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Overs Completed</label>
              <input type="number" value={dlsForm.overs} onChange={function (e) { return setDlsForm(__assign(__assign({}, dlsForm), { overs: Number(e.target.value) })); }} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"/>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Initial Target</label>
              <input type="number" value={dlsForm.target} onChange={function (e) { return setDlsForm(__assign(__assign({}, dlsForm), { target: Number(e.target.value) })); }} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"/>
            </div>
          </div>

          <button onClick={runDLS} disabled={isLoading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20">
            {isLoading ? 'Processing Standard Logic...' : 'Calculate Revised Target'}
          </button>

          {dlsData && (<div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 animate-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-indigo-400">REVISED TARGET</span>
                <span className="text-4xl font-black text-white">{dlsData.revisedTarget}</span>
              </div>
              <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Mathematical Analysis</p>
              <p className="text-sm text-slate-300 italic mb-4">"{dlsData.tacticalAdvice}"</p>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full transition-all duration-1000" style={{ width: "".concat(dlsData.winningProbability, "%") }}></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase text-right">Win Probability: {Math.round(dlsData.winningProbability)}%</p>
            </div>)}
        </div>
      </div>
    </div>);
};
exports.StatsAnalytics = StatsAnalytics;
