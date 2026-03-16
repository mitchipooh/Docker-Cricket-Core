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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgSquadsTab = void 0;
var react_1 = require("react");
var OrgSquadsTab = function (_a) {
    var organization = _a.organization, isMainAdmin = _a.isMainAdmin, isCouncilAdmin = _a.isCouncilAdmin, isOrgAdmin = _a.isOrgAdmin, isLockdown = _a.isLockdown, isActive = _a.isActive, focusMyTeam = _a.focusMyTeam, myTeam = _a.myTeam, isClub = _a.isClub, affiliatedTeams = _a.affiliatedTeams, onLinkTeam = _a.onLinkTeam, onBulkAddTeams = _a.onBulkAddTeams, onRequestAddTeam = _a.onRequestAddTeam, onViewTeam = _a.onViewTeam, onRemoveTeam = _a.onRemoveTeam, onUpdateOrg = _a.onUpdateOrg, onSelectHubTeam = _a.onSelectHubTeam, onAddPlayer = _a.onAddPlayer, onBulkImportPlayers = _a.onBulkImportPlayers, onEditTeam = _a.onEditTeam, canEditTeam = _a.canEditTeam;
    if (!isActive)
        return null;
    return (<div className="space-y-6">
            {(isMainAdmin || isCouncilAdmin) && !isLockdown && (<div className="flex justify-end gap-2">
                    <button onClick={onLinkTeam} className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-100 transition-all shadow-sm">
                        🔗 Link Existing Team
                    </button>
                    <button onClick={onBulkAddTeams} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-slate-200">
                        + Bulk Add Teams
                    </button>
                </div>)}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(isMainAdmin || isCouncilAdmin) && !isLockdown && (<button onClick={onRequestAddTeam} className="border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center p-8 hover:bg-white hover:border-indigo-400 hover:shadow-lg transition-all text-slate-400 hover:text-indigo-600 gap-4 min-h-[200px] bg-slate-50/50">
                        <span className="text-5xl font-thin">+</span><span className="text-xs font-black uppercase tracking-widest">Register {isClub ? 'Squad' : 'Team'}</span>
                    </button>)}
                {/* Team Grid: Show all teams for admins (UNLESS focused), ONLY myTeam for team admins */}
                {((isOrgAdmin || isMainAdmin || isCouncilAdmin) && !focusMyTeam
            ? __spreadArray(__spreadArray([], organization.memberTeams, true), affiliatedTeams.map(function (t) { return (__assign(__assign({}, t), { isAffiliate: true })); }), true) : (myTeam ? [myTeam] : [])).map(function (team) { return (<div key={team.id} className={"bg-white border p-6 rounded-[2rem] hover:shadow-xl transition-all group flex flex-col relative ".concat(team.isAffiliate ? 'border-indigo-100 bg-indigo-50/10' : 'border-slate-200 hover:shadow-slate-100')}>
                        {/* Affiliate Badge */}
                        {team.isAffiliate && (<div className="absolute top-4 right-4 bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                🤝 {team.orgName || 'Affiliated'}
                            </div>)}

                        {/* X Remove Button (Only for own teams) */}
                        {!team.isAffiliate && (isMainAdmin || isCouncilAdmin) && (onRemoveTeam || onUpdateOrg) && (<button onClick={function (e) {
                    e.stopPropagation();
                    if (confirm("Remove ".concat(team.name, " from ").concat(organization.name, "?"))) {
                        if (onRemoveTeam) {
                            // Preferred: Use dedicated removal handler (cleanups junction table)
                            onRemoveTeam(organization.id, team.id);
                        }
                        else if (onUpdateOrg) {
                            // Fallback: Update organization (manual cleanup needed)
                            var updated = __assign(__assign({}, organization), { memberTeams: organization.memberTeams.filter(function (t) { return t.id !== team.id; }) });
                            onUpdateOrg(organization.id, updated);
                        }
                    }
                }} className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-red-500 text-slate-400 hover:text-white rounded-full flex items-center justify-center font-black text-lg transition-all opacity-0 group-hover:opacity-100 z-10" title="Remove from organization">
                                ×
                            </button>)}

                        {/* Team Header - Clickable to View Details */}
                        <div onClick={function () { return onViewTeam(team.id); }} className="cursor-pointer">
                            <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">{team.name}</h3>
                            <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">📍 {team.location || 'Home Ground'}</p>
                        </div>

                        {/* Player List at a Glance */}
                        <div className="mt-4 mb-4 flex-1">
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
                                {team.players.length} Player{team.players.length !== 1 ? 's' : ''}
                            </div>
                            {team.players.length > 0 ? (<div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                                    {team.players.map(function (player, idx) { return (<div key={player.id} className="flex items-center gap-2 text-xs">
                                            <span className="text-slate-400 font-mono text-[10px] w-5">{idx + 1}.</span>
                                            <span className="text-slate-700 font-medium truncate">{player.name}</span>
                                            <span className="text-[9px] text-slate-400 ml-auto flex-shrink-0">{player.role}</span>
                                        </div>); })}
                                </div>) : (<div className="text-slate-300 text-xs italic">No players yet</div>)}
                        </div>

                        {/* Action Buttons */}
                        {(isCouncilAdmin || canEditTeam(team.id)) && onUpdateOrg && (<div className="flex gap-2 pt-4 border-t border-slate-100" onClick={function (e) { return e.stopPropagation(); }}>
                                {!isLockdown && !team.isAffiliate && (<>
                                        <button onClick={function () { return onAddPlayer(team); }} className="flex-1 py-2 bg-slate-50 text-slate-600 hover:bg-indigo-600 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all border border-slate-100 hover:border-indigo-600">
                                            + Add
                                        </button>
                                        <button onClick={function () { return onBulkImportPlayers(team); }} className="flex-1 py-2 bg-slate-50 text-slate-600 hover:bg-emerald-600 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all border border-slate-100 hover:border-emerald-600">
                                            + Bulk
                                        </button>
                                    </>)}
                                {onSelectHubTeam && ((isOrgAdmin || isCouncilAdmin) || team.isAffiliate) && (<button onClick={function () { return onSelectHubTeam(team.id); }} className="px-3 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all border border-indigo-50 hover:border-indigo-600" title="Open Team Hub">
                                        ⚡ Hub
                                    </button>)}
                                {!team.isAffiliate && (<button onClick={function () { return onEditTeam(team); }} className="px-3 py-2 bg-slate-50 text-slate-600 hover:bg-indigo-600 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all border border-slate-100 hover:border-indigo-600" title="Edit Team Info">
                                        ✏️
                                    </button>)}
                            </div>)}
                    </div>); })}
            </div>
            {/* Removed separate Affiliated Teams section */}
        </div>);
};
exports.OrgSquadsTab = OrgSquadsTab;
