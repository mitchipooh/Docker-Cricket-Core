"use strict";
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
exports.TransferMarket = void 0;
var react_1 = require("react");
var centralZoneService_1 = require("@cricket/shared/services/centralZoneService");
var TransferMarket = function (_a) {
    var onBack = _a.onBack, onViewPlayer = _a.onViewPlayer, currentOrg = _a.currentOrg, onSendInvite = _a.onSendInvite;
    var _b = (0, react_1.useState)([]), players = _b[0], setPlayers = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)('ALL'), roleFilter = _d[0], setRoleFilter = _d[1];
    var _e = (0, react_1.useState)(''), searchTerm = _e[0], setSearchTerm = _e[1];
    (0, react_1.useEffect)(function () {
        loadMarket();
    }, [roleFilter]);
    var loadMarket = function () { return __awaiter(void 0, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, (0, centralZoneService_1.searchPlayersForMarket)(roleFilter === 'ALL' ? undefined : roleFilter)];
                case 1:
                    results = _a.sent();
                    setPlayers(results);
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var filteredPlayers = players.filter(function (p) {
        return p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.handle.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return (<div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all hover:shadow-lg">
                        ←
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Transfer Market</h1>
                        <p className="text-indigo-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Recruit Global Talent</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-xl border border-slate-100">
                    <div className="relative">
                        <span className="absolute left-4 top-3.5 text-slate-400 text-sm">🔍</span>
                        <input value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} placeholder="Search names or @handles..." className="bg-slate-50 border-none rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-slate-700 w-full md:w-64 focus:ring-2 ring-indigo-500/20"/>
                    </div>
                    <select value={roleFilter} onChange={function (e) { return setRoleFilter(e.target.value); }} className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-black text-slate-700 uppercase tracking-wider cursor-pointer">
                        <option value="ALL">All Roles</option>
                        <option value="Batsman">Batsmen</option>
                        <option value="Bowler">Bowlers</option>
                        <option value="All-rounder">All-Rounders</option>
                        <option value="Wicket-keeper">Keepers</option>
                    </select>
                </div>
            </div>

            {/* Market Grid */}
            {loading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50 animate-pulse">
                    {[1, 2, 3, 4, 5, 6].map(function (i) { return (<div key={i} className="bg-slate-100 h-64 rounded-[2.5rem]"/>); })}
                </div>) : filteredPlayers.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPlayers.map(function (player) {
                var _a, _b, _c, _d;
                return (<div key={player.id} className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 rounded-3xl bg-slate-50 border-2 border-slate-100 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                                    <img src={player.avatarUrl || "https://ui-avatars.com/api/?name=".concat(player.name, "&background=6366f1&color=fff")} className="w-full h-full object-cover" alt={player.name}/>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-slate-900 leading-tight truncate">{player.name}</h3>
                                    <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest">{player.handle}</p>
                                    <div className="mt-1 flex gap-1">
                                        <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter border border-emerald-100">
                                            LFC ✓
                                        </span>
                                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter">
                                            {((_a = player.playerDetails) === null || _a === void 0 ? void 0 : _a.primaryRole) || 'Player'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bio/Stats Preview */}
                            <div className="bg-slate-50 rounded-2xl p-4 flex-1 mb-6">
                                <p className="text-xs text-slate-500 font-medium line-clamp-3 leading-relaxed">
                                    {((_b = player.playerDetails) === null || _b === void 0 ? void 0 : _b.bio) || "This player has haven't provided a bio yet, but is actively looking for a new club to join for the 2026 season."}
                                </p>
                                <div className="mt-4 pt-4 border-t border-slate-200/50 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Style</p>
                                        <p className="text-xs font-bold text-slate-700">{((_c = player.playerDetails) === null || _c === void 0 ? void 0 : _c.battingStyle) || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bowling</p>
                                        <p className="text-xs font-bold text-slate-700 truncate">{((_d = player.playerDetails) === null || _d === void 0 ? void 0 : _d.bowlingStyle) || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button onClick={function () { return onViewPlayer(player.id); }} className="flex-1 border-2 border-slate-100 text-slate-600 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                                    Full Bio
                                </button>
                                {currentOrg && (<button onClick={function () { return onSendInvite(currentOrg, player); }} className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all">
                                        Invite
                                    </button>)}
                            </div>
                        </div>);
            })}
                </div>) : (<div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
                    <p className="text-6xl mb-6 grayscale">🏃‍♂️</p>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Market is Quiet</h3>
                    <p className="text-slate-500 font-medium">No players are currently looking for a club with these filters.</p>
                </div>)}
        </div>);
};
exports.TransferMarket = TransferMarket;
