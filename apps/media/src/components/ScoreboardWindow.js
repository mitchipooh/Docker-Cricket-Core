"use strict";
/**
 * Cricket-Core 2026 Management System
 * Created by mitchipoohdevs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreboardWindow = void 0;
var react_1 = require("react");
var MatchSelectors_1 = require("@cricket/shared/scoring/MatchSelectors");
var useBallTimeline_1 = require("@cricket/shared/scoring/hooks/useBallTimeline");
var FullMatchScorecard_1 = require("./FullMatchScorecard");
var ScoreboardWindow = function () {
    var _a, _b, _c, _d, _e;
    var _f = (0, react_1.useState)({ state: null, teams: {} }), data = _f[0], setData = _f[1];
    var _g = (0, react_1.useState)('LIVE'), activeTab = _g[0], setActiveTab = _g[1];
    var _h = (0, react_1.useState)(false), isEditMode = _h[0], setIsEditMode = _h[1];
    var _j = (0, react_1.useState)(''), customMessage = _j[0], setCustomMessage = _j[1];
    var _k = (0, react_1.useState)(true), showSponsors = _k[0], setShowSponsors = _k[1];
    (0, react_1.useEffect)(function () {
        var channel = new BroadcastChannel('cricket_sync_channel');
        channel.onmessage = function (event) {
            if (event.data.type === 'UPDATE') {
                setData({
                    state: event.data.state,
                    teams: event.data.teams,
                    sponsors: event.data.sponsors || [],
                    sponsorSettings: event.data.sponsorSettings
                });
            }
        };
        return function () { return channel.close(); };
    }, []);
    if (!data.state) {
        return (<div className="h-screen w-screen bg-slate-950 flex items-center justify-center flex-col text-slate-500">
                <div className="text-4xl animate-pulse mb-4">📡</div>
                <h1 className="text-xl font-black uppercase tracking-widest">Waiting for Live Feed...</h1>
                <p className="text-xs font-bold mt-2">Scoreboard will update automatically</p>
                <div className="mt-8 text-[10px] font-bold text-slate-700 uppercase tracking-widest">Powered by mitchipoohdevs</div>
            </div>);
    }
    var state = data.state, teams = data.teams, sponsors = data.sponsors, settings = data.sponsorSettings;
    var sponsorSettings = settings || {
        mediaTopHeight: 320,
        mediaBottomHeight: 320,
        scoreboardTopHeight: 400,
        scoreboardBottomHeight: 480
    };
    var striker = (_a = teams.batting) === null || _a === void 0 ? void 0 : _a.players.find(function (p) { return p.id === state.strikerId; });
    var nonStriker = (_b = teams.batting) === null || _b === void 0 ? void 0 : _b.players.find(function (p) { return p.id === state.nonStrikerId; });
    var bowler = (_c = teams.bowling) === null || _c === void 0 ? void 0 : _c.players.find(function (p) { return p.id === state.bowlerId; });
    var strikerStats = state.strikerId ? (0, MatchSelectors_1.getBattingStats)(state.strikerId, state.history, state.innings) : null;
    var nonStrikerStats = state.nonStrikerId ? (0, MatchSelectors_1.getBattingStats)(state.nonStrikerId, state.history, state.innings) : null;
    var bowlerStats = state.bowlerId ? (0, MatchSelectors_1.getBowlingStats)(state.bowlerId, state.history, state.innings) : null;
    var runRate = state.totalBalls > 0 ? ((state.score / state.totalBalls) * 6).toFixed(2) : '0.00';
    var reqRunRate = state.target && state.totalBalls < 120 // Assuming T20 base for calculation
        ? ((state.target - state.score) / ((120 - state.totalBalls) / 6)).toFixed(2)
        : null;
    // Runs off balls (This Over)
    var timeline = (0, useBallTimeline_1.useBallTimeline)(state).slice(0, 6).reverse();
    // Match Timer logic (simplified for display)
    var startTime = state.matchTimer.startTime;
    var elapsedTime = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    var formatTime = function (secs) {
        var m = Math.floor(secs / 60);
        var s = secs % 60;
        return "".concat(m, ":").concat(s.toString().padStart(2, '0'));
    };
    var topSponsors = (sponsors === null || sponsors === void 0 ? void 0 : sponsors.filter(function (s) { return s.isActive && s.placements.includes('SCOREBOARD_TOP'); })) || [];
    var bottomSponsors = (sponsors === null || sponsors === void 0 ? void 0 : sponsors.filter(function (s) { return s.isActive && s.placements.includes('SCOREBOARD_BOTTOM'); })) || [];
    return (<div className="h-screen w-screen bg-slate-950 text-white overflow-hidden flex flex-col relative group">

            {/* EDIT OVERLAY TRIGGER */}
            <div className="absolute top-0 right-0 p-2 z-[60] opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={function () { return setIsEditMode(!isEditMode); }} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-xs font-bold uppercase backdrop-blur-md">
                    {isEditMode ? 'Close Edit' : 'Edit View'}
                </button>
            </div>

            {/* EDIT CONTROLS */}
            {isEditMode && (<div className="absolute top-10 right-2 bg-slate-800 p-4 rounded-xl shadow-2xl z-[60] border border-slate-700 w-64 space-y-4">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Active Tab</label>
                        <div className="flex bg-slate-900 rounded p-1">
                            {['LIVE', 'CARD', 'SQUADS'].map(function (m) { return (<button key={m} onClick={function () { return setActiveTab(m); }} className={"flex-1 py-1 text-[9px] font-bold uppercase rounded ".concat(activeTab === m ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white')}>
                                    {m}
                                </button>); })}
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Ticker Message</label>
                        <input value={customMessage} onChange={function (e) { return setCustomMessage(e.target.value); }} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white" placeholder="e.g. Lunch Break"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Show Sponsors</span>
                        <button onClick={function () { return setShowSponsors(!showSponsors); }} className={"w-8 h-4 rounded-full relative transition-colors ".concat(showSponsors ? 'bg-emerald-500' : 'bg-slate-600')}>
                            <div className={"absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ".concat(showSponsors ? 'left-4.5' : 'left-0.5')}/>
                        </button>
                    </div>
                </div>)}

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 relative bg-[#0f172a] overflow-hidden flex flex-col">
                {activeTab === 'LIVE' && (<div className="flex-1 flex flex-col justify-end p-8 pb-4 relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>

                        {/* MATCH INFO HEADER */}
                        <div className="absolute top-8 left-8 flex gap-6 items-start">
                            <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl p-4 min-w-[150px] text-center">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Match Timer</div>
                                <div className="text-2xl font-mono font-bold text-white">{formatTime(elapsedTime)}</div>
                            </div>
                            {state.target && (<div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl p-4 min-w-[150px] text-center">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target</div>
                                    <div className="text-2xl font-mono font-bold text-white">{state.target}</div>
                                    <div className="text-[9px] font-bold text-indigo-400 mt-1 uppercase">Need {state.target - state.score} Runs</div>
                                </div>)}
                            <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl p-4 min-w-[150px] text-center">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Run Rates</div>
                                <div className="flex justify-center gap-4">
                                    <div><div className="text-xl font-mono font-bold text-white">{runRate}</div><span className="text-[8px] uppercase text-slate-500">CRR</span></div>
                                    {reqRunRate && <div><div className="text-xl font-mono font-bold text-amber-500">{reqRunRate}</div><span className="text-[8px] uppercase text-slate-500">RRR</span></div>}
                                </div>
                            </div>
                        </div>

                        {/* MAIN SCOREBOARD BAR */}
                        <div className="flex items-end mb-4 relative z-10">
                            {/* Team & Score */}
                            <div className="bg-slate-900 text-white rounded-t-3xl rounded-bl-3xl p-8 shadow-2xl border-l-[12px] border-indigo-600 min-w-[420px] relative z-20">
                                <div className="flex items-center gap-6 mb-4">
                                    {((_d = teams.batting) === null || _d === void 0 ? void 0 : _d.logoUrl) && <img src={teams.batting.logoUrl} className="w-16 h-16 bg-white rounded-full p-1"/>}
                                    <div>
                                        <h1 className="text-4xl font-black uppercase leading-none tracking-tight">{((_e = teams.batting) === null || _e === void 0 ? void 0 : _e.name) || 'Batting'}</h1>
                                        <p className="text-indigo-400 font-bold text-sm uppercase tracking-widest mt-1">{state.innings === 1 ? '1st Innings' : 'Chase'}</p>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-6">
                                    <span className="text-7xl font-black tabular-nums tracking-tighter">{state.score}/{state.wickets}</span>
                                    <span className="text-3xl text-slate-400 font-bold">{Math.floor(state.totalBalls / 6)}.{state.totalBalls % 6} Ov</span>
                                </div>
                            </div>

                            {/* Batters Card */}
                            <div className="bg-slate-800/95 backdrop-blur text-white p-6 mb-0 ml-[-20px] pl-12 rounded-tr-[3rem] relative z-10 border-b-8 border-slate-900 flex-1 min-w-0 max-w-5xl flex justify-between items-center shadow-xl">
                                <div className="flex-1 flex items-center justify-around px-8">
                                    {/* Striker */}
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <div className="font-black text-3xl leading-none flex items-center gap-3 justify-end mb-2">
                                                {striker === null || striker === void 0 ? void 0 : striker.name} <span className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_20px_#10b981]"></span>
                                            </div>
                                            <div className="text-emerald-300 font-mono font-bold text-2xl">
                                                {strikerStats === null || strikerStats === void 0 ? void 0 : strikerStats.runs}<span className="text-lg text-slate-500 ml-2">({strikerStats === null || strikerStats === void 0 ? void 0 : strikerStats.balls})</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-16 w-px bg-slate-600 mx-8"></div>

                                    {/* Non-Striker */}
                                    <div className="flex items-center gap-6 opacity-60">
                                        <div className="text-left">
                                            <div className="font-bold text-2xl leading-none text-slate-300 mb-2">
                                                {nonStriker === null || nonStriker === void 0 ? void 0 : nonStriker.name}
                                            </div>
                                            <div className="text-slate-400 font-mono font-bold text-xl">
                                                {nonStrikerStats === null || nonStrikerStats === void 0 ? void 0 : nonStrikerStats.runs}<span className="text-base text-slate-600 ml-2">({nonStrikerStats === null || nonStrikerStats === void 0 ? void 0 : nonStrikerStats.balls})</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BOWLER & THIS OVER */}
                        <div className="flex gap-6 relative z-10">
                            <div className="bg-white text-slate-900 rounded-[2rem] p-5 shadow-xl flex items-center gap-6 min-w-[400px]">
                                <div className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">Current Bowler</div>
                                <div>
                                    <div className="font-black text-2xl uppercase leading-none">{bowler === null || bowler === void 0 ? void 0 : bowler.name}</div>
                                    <div className="font-mono text-lg font-bold text-slate-600 mt-1">
                                        {bowlerStats === null || bowlerStats === void 0 ? void 0 : bowlerStats.wickets}-{bowlerStats === null || bowlerStats === void 0 ? void 0 : bowlerStats.runs} <span className="text-sm text-slate-400">({bowlerStats === null || bowlerStats === void 0 ? void 0 : bowlerStats.overs})</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800/80 backdrop-blur rounded-[2rem] p-5 flex items-center gap-3 flex-1 shadow-xl border border-slate-700">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-4">This Over</div>
                                {timeline.map(function (ball) { return (<div key={ball.id} className={"w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ".concat(ball.color, " text-white shadow-lg border-2 border-white/10")}>
                                        {ball.label}
                                    </div>); })}
                            </div>
                        </div>
                    </div>)}

                {activeTab === 'CARD' && teams.batting && teams.bowling && (<div className="flex-1 overflow-y-auto p-8">
                        <FullMatchScorecard_1.FullMatchScorecard matchState={state} teamA={teams.batting} teamB={teams.bowling}/>
                    </div>)}

                {activeTab === 'SQUADS' && (<div className="flex-1 p-8 grid grid-cols-2 gap-8">
                        {[teams.batting, teams.bowling].map(function (t) { return t && (<div key={t.id} className="bg-slate-800 rounded-2xl p-6">
                                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                    <img src={t.logoUrl} className="w-8 h-8 bg-white rounded-full"/> {t.name}
                                </h2>
                                <div className="grid grid-cols-1 gap-2">
                                    {t.players.map(function (p) { return (<div key={p.id} className="bg-slate-700/50 p-2 rounded flex justify-between">
                                            <span>{p.name}</span>
                                            <span className="text-slate-400 text-xs">{p.role}</span>
                                        </div>); })}
                                </div>
                            </div>); })}
                    </div>)}
            </div>

            {/* BOTTOM TICKER / SPONSORS */}
            <div className="bg-slate-900 border-t border-slate-800 shrink-0 relative z-30">
                {customMessage && (<div className="bg-indigo-600 text-white py-1 px-4 text-xs font-black uppercase tracking-widest text-center animate-pulse">
                        {customMessage}
                    </div>)}
                <div className="bg-black py-1 text-center">
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Powered by mitchipoohdevs</p>
                </div>
            </div>
        </div>);
};
exports.ScoreboardWindow = ScoreboardWindow;
