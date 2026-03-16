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
exports.TournamentDashboard = void 0;
var react_1 = require("react");
var PointsTable_1 = require("../display/PointsTable");
var BracketView_1 = require("@cricket/shared/competition/BracketView");
var buildPointsTable_1 = require("@cricket/shared/competition/buildPointsTable");
var PointsConfigSettings_1 = require("../admin/PointsConfigSettings");
var MatchResultEntryForm_1 = require("../admin/MatchResultEntryForm");
var duplicateDetection_1 = require("@cricket/shared/utils/duplicateDetection");
var TournamentDashboard = function (_a) {
    var _b, _c;
    var tournament = _a.tournament, organization = _a.organization, onBack = _a.onBack, onStartMatch = _a.onStartMatch, onGenerateFixtures = _a.onGenerateFixtures, onAddGroup = _a.onAddGroup, onUpdateGroupTeams = _a.onUpdateGroupTeams, onViewTeam = _a.onViewTeam, onViewMatch = _a.onViewMatch, onAddFixture = _a.onAddFixture, onUpdateFixture = _a.onUpdateFixture, onRemoveFixture = _a.onRemoveFixture, onUpdateTournament = _a.onUpdateTournament, _d = _a.allOrganizations, allOrganizations = _d === void 0 ? [] : _d, _e = _a.embedMode, embedMode = _e === void 0 ? false : _e, _f = _a.initialTab, initialTab = _f === void 0 ? 'OVERVIEW' : _f, _g = _a.isOrgAdmin, isOrgAdmin = _g === void 0 ? false : _g, // NEW
    onSelectHubTeam = _a.onSelectHubTeam // NEW
    ;
    var _h = (0, react_1.useState)(initialTab), activeTab = _h[0], setActiveTab = _h[1];
    var _j = (0, react_1.useState)('SCHEDULED'), activeFixtureTab = _j[0], setActiveFixtureTab = _j[1];
    var _k = (0, react_1.useState)(''), newGroupName = _k[0], setNewGroupName = _k[1];
    // Manual Fixture Creation State
    var _l = (0, react_1.useState)(false), isAddFixtureOpen = _l[0], setIsAddFixtureOpen = _l[1];
    var _m = (0, react_1.useState)(false), isCSVUploadOpen = _m[0], setIsCSVUploadOpen = _m[1];
    var _o = (0, react_1.useState)(null), duplicateWarning = _o[0], setDuplicateWarning = _o[1];
    var _p = (0, react_1.useState)({
        groupId: '',
        teamAId: '',
        teamBId: '',
        date: '',
        venue: '',
        format: tournament.format
    }), fixtureForm = _p[0], setFixtureForm = _p[1];
    // Manage Teams Modal State
    var _q = (0, react_1.useState)(null), managingGroupId = _q[0], setManagingGroupId = _q[1];
    var _r = (0, react_1.useState)(new Set()), selectedTeamIds = _r[0], setSelectedTeamIds = _r[1];
    // Match Result Entry Modal State
    var _s = (0, react_1.useState)(null), finishingMatch = _s[0], setFinishingMatch = _s[1];
    // Compute available teams for fixtures (filtered by selected group if any)
    var fixtureAvailableTeams = (0, react_1.useMemo)(function () {
        if (!fixtureForm.groupId)
            return [];
        var selectedGroup = (tournament.groups || []).find(function (g) { return g.id === fixtureForm.groupId; });
        return (selectedGroup === null || selectedGroup === void 0 ? void 0 : selectedGroup.teams) || [];
    }, [tournament.groups, fixtureForm.groupId]);
    var activeFixtures = organization.fixtures.filter(function (f) { return f.tournamentId === tournament.id; });
    var teamsInTournament = organization.memberTeams.filter(function (t) { return (tournament.teamIds || []).includes(t.id); });
    /* =====================
       Standings Logic
    ===================== */
    var groupStandings = (0, react_1.useMemo)(function () {
        // 1. Map existing MatchFixtures to CompletedMatch interface for the points table engine
        var completedMatches = activeFixtures
            .filter(function (f) { return f.status === 'Completed' && f.savedState; })
            .map(function (f) {
            var state = f.savedState;
            var teamAScoreData = state.inningsScores.find(function (i) { return i.teamId === f.teamAId; }) || (state.innings === 1 && state.battingTeamId === f.teamAId ? { score: state.score, wickets: state.wickets, overs: '0.0' } : { score: 0, wickets: 0, overs: '0.0' });
            var teamBScoreData = state.inningsScores.find(function (i) { return i.teamId === f.teamBId; }) || (state.innings === 2 && state.battingTeamId === f.teamBId ? { score: state.score, wickets: state.wickets, overs: '0.0' } : { score: 0, wickets: 0, overs: '0.0' });
            var scoreA = typeof teamAScoreData.score === 'number' ? teamAScoreData.score : parseInt(teamAScoreData.score);
            var scoreB = typeof teamBScoreData.score === 'number' ? teamBScoreData.score : parseInt(teamBScoreData.score);
            var result = 'NO_RESULT';
            if (scoreA > scoreB)
                result = 'HOME_WIN';
            else if (scoreB > scoreA)
                result = 'AWAY_WIN';
            else if (scoreA === scoreB && scoreA > 0)
                result = 'TIE';
            return {
                matchId: f.id,
                teamAId: f.teamAId,
                teamBId: f.teamBId,
                teamAName: f.teamAName,
                teamBName: f.teamBName,
                teamAScore: scoreA,
                teamAWkts: teamAScoreData.wickets,
                teamAOvers: parseFloat(teamAScoreData.overs),
                teamBScore: scoreB,
                teamBWkts: teamBScoreData.wickets,
                teamBOvers: parseFloat(teamBScoreData.overs),
                result: result
            };
        });
        // 2. Group by tournament groups
        return (tournament.groups || []).map(function (group) {
            var groupMatches = completedMatches.filter(function (m) {
                // If fixture has explicit group ID
                var fixture = activeFixtures.find(function (f) { return f.id === m.matchId; });
                if ((fixture === null || fixture === void 0 ? void 0 : fixture.groupId) === group.id)
                    return true;
                // Fallback: Check if both teams are in this group
                var groupTeamIds = group.teams.map(function (t) { return t.id; });
                return groupTeamIds.includes(m.teamAId) && groupTeamIds.includes(m.teamBId);
            });
            return {
                group: group,
                rows: (0, buildPointsTable_1.buildPointsTable)(groupMatches, group.teams)
            };
        });
    }, [activeFixtures, tournament.groups]);
    // Consolidate all available teams (Own + Affiliated)
    var availableTeams = (0, react_1.useMemo)(function () {
        // Own Teams
        var teams = __spreadArray([], organization.memberTeams, true);
        // Affiliated (Child) Teams
        if (organization.childOrgIds && organization.childOrgIds.length > 0) {
            var childOrgs = allOrganizations.filter(function (o) { var _a; return (_a = organization.childOrgIds) === null || _a === void 0 ? void 0 : _a.includes(o.id); });
            childOrgs.forEach(function (child) {
                teams = __spreadArray(__spreadArray([], teams, true), child.memberTeams, true);
            });
        }
        return teams;
    }, [organization, allOrganizations]);
    var openTeamManager = function (groupId) {
        var group = (tournament.groups || []).find(function (g) { return g.id === groupId; });
        if (group) {
            setSelectedTeamIds(new Set(group.teams.map(function (t) { return t.id; })));
            setManagingGroupId(groupId);
        }
    };
    var toggleTeamSelection = function (teamId) {
        var next = new Set(selectedTeamIds);
        if (next.has(teamId))
            next.delete(teamId);
        else
            next.add(teamId);
        setSelectedTeamIds(next);
    };
    var saveTeamSelection = function () {
        if (managingGroupId) {
            onUpdateGroupTeams(tournament.id, managingGroupId, Array.from(selectedTeamIds));
            setManagingGroupId(null);
        }
    };
    var handleGenerateKnockouts = function () {
        // 1. Flatten all standings to find global top 4 (simplistic logic)
        // In a real app, this would be Top 2 from G1 and Top 2 from G2
        var allRows = groupStandings.flatMap(function (g) { return g.rows; }).sort(function (a, b) { return b.points - a.points || b.nrr - a.nrr; });
        if (allRows.length < 4) {
            alert("Need at least 4 teams with standings data to generate Semi-Finals.");
            return;
        }
        var qualifiedTeams = allRows.slice(0, 4).map(function (row) { return ({
            teamId: row.teamId,
            teamName: row.teamName,
            played: row.played,
            won: row.won,
            lost: row.lost,
            drawn: row.drawn,
            tied: row.tied,
            points: row.points,
            bonusPoints: row.bonusPoints,
            nrr: row.nrr,
            runsFor: row.runsFor,
            oversFor: row.oversFor,
            runsAgainst: row.runsAgainst,
            oversAgainst: row.oversAgainst
        }); });
        // const newFixtures = generateKnockouts(qualifiedTeams, tournament.id, tournament.format);
        alert("Knockout Generation Logic linked. (Requires parent state update implementation)");
    };
    var displayedFixtures = activeFixtures.filter(function (f) {
        if (activeFixtureTab === 'LIVE')
            return f.status === 'Live';
        if (activeFixtureTab === 'SCHEDULED')
            return f.status === 'Scheduled';
        return f.status === 'Completed';
    });
    return (<div className="animate-in slide-in-from-bottom-8 duration-500 pb-20">
            {!embedMode && (<>
                    <div className="flex items-center gap-6 mb-10">
                        <button onClick={onBack} className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-black transition-all shadow-sm">←</button>
                        <div className="flex items-center gap-4">
                            <img src="/logo.jpg" alt="Logo" className="w-16 h-16 object-contain drop-shadow-sm rounded-xl bg-white p-1 border border-slate-100"/>
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight">{tournament.name}</h1>
                                <div className="flex flex-col gap-1 mt-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{tournament.format} • <span className="text-indigo-500">{tournament.status}</span></p>
                                    {(tournament.startDate || tournament.endDate) && (<p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                                            <span>📅</span>
                                            <span>
                                                {tournament.startDate ? new Date(tournament.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '...'}
                                                {tournament.endDate ? " \u2014 ".concat(new Date(tournament.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }), " ") : ''}
                                            </span>
                                        </p>)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
                        {['OVERVIEW', 'GROUPS', 'FIXTURES', 'STANDINGS', 'BRACKET', 'POINTS_CONFIG'].map(function (tab) { return (<button key={tab} onClick={function () { return setActiveTab(tab); }} className={"px - 8 py - 4 rounded - 3xl text - xs font - black uppercase tracking - widest whitespace - nowrap transition - all border ".concat(activeTab === tab ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-900', " ")}>{tab}</button>); })}
                    </div>
                </>)}

            {activeTab === 'OVERVIEW' && (<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm col-span-2">
                        <h3 className="text-xl font-black mb-4">Season Status</h3>
                        <p className="text-slate-500 leading-relaxed mb-4">Competition in the {tournament.name} is currently {(_b = tournament.status) === null || _b === void 0 ? void 0 : _b.toLowerCase()}. Tracking results across {(tournament.groups || []).length} active groups.</p>
                        {tournament.description && (<div className="mt-6 pt-6 border-t border-slate-100">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">About Tournament</h4>
                                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{tournament.description}</p>
                            </div>)}
                    </div>
                    <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">Total Fixtures</div>
                        <div className="text-5xl font-black">{activeFixtures.length}</div>
                    </div>
                </div>)}

            {activeTab === 'GROUPS' && (<div className="space-y-8 animate-in fade-in">
                    {isOrgAdmin && (<div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                            <input value={newGroupName} onChange={function (e) { return setNewGroupName(e.target.value); }} placeholder="New Group Name (e.g. Group A)" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none w-full"/>
                            <button onClick={function () { if (newGroupName) {
                onAddGroup(tournament.id, newGroupName);
                setNewGroupName('');
            } }} disabled={!newGroupName} className="bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg w-full md:w-auto transition-all">
                                + Create Group
                            </button>
                        </div>)}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(tournament.groups || []).map(function (group) { return (<div key={group.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden">
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900">{group.name}</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{group.teams.length} Teams</p>
                                    </div>
                                    {isOrgAdmin && (<button onClick={function () { return openTeamManager(group.id); }} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors">
                                            Manage Squads
                                        </button>)}
                                </div>

                                <div className="space-y-2 relative z-10">
                                    {group.teams.length === 0 ? (<div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-xs font-bold text-slate-400">
                                            No teams assigned yet.
                                        </div>) : (group.teams.map(function (team) { return (<div className="flex gap-2">
                                                <button key={team.id} onClick={function () { return onViewTeam(team.id); }} className="flex-1 flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">
                                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm">🛡️</div>
                                                    <span className="font-bold text-slate-700 text-sm">{team.name}</span>
                                                </button>
                                                {onSelectHubTeam && isOrgAdmin && (<button onClick={function () { return onSelectHubTeam(team.id); }} className="w-12 h-auto bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm" title="Open Team Hub">
                                                        ⚡
                                                    </button>)}
                                            </div>); }))}
                                </div>
                                <div className="absolute -bottom-6 -right-6 text-9xl opacity-[0.03] select-none pointer-events-none">🛡️</div>
                            </div>); })}
                    </div>
                </div>)}

            {activeTab === 'POINTS_CONFIG' && (<PointsConfigSettings_1.PointsConfigSettings config={tournament.pointsConfig} onSave={function (newConfig) {
                if (onUpdateTournament)
                    onUpdateTournament(tournament.id, { pointsConfig: newConfig });
            }}/>)}

            {activeTab === 'FIXTURES' && (<div className="space-y-6">
                    <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                        <div className="flex gap-2">
                            {['SCHEDULED', 'LIVE', 'COMPLETED'].map(function (ft) { return (<button key={ft} onClick={function () { return setActiveFixtureTab(ft); }} className={"px - 4 py - 2 rounded - xl text - [10px] font - black uppercase tracking - widest transition - all ".concat(activeFixtureTab === ft ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 border border-slate-200', " ")}>
                                    {ft}
                                </button>); })}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {onAddFixture && isOrgAdmin && (<>
                                    <button onClick={function () { return setIsAddFixtureOpen(true); }} className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-indigo-500 transition-all">
                                        + Manual Add
                                    </button>
                                    <button onClick={function () { return setIsCSVUploadOpen(true); }} className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-emerald-500 transition-all">
                                        📤 CSV Upload
                                    </button>
                                </>)}
                            {isOrgAdmin && <button onClick={onGenerateFixtures} className="bg-white border border-slate-200 text-slate-500 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition-all">Auto Generate</button>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {displayedFixtures.map(function (f) {
                var isAdmin = isOrgAdmin;
                var isLive = f.status === 'Live';
                var isCompleted = f.status === 'Completed';
                return (<div key={f.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-slate-50 transition-all group">
                                    <div className="flex items-center gap-4 flex-1 min-w-0" onClick={function () { return onViewMatch(f); }}>
                                        <div className={"w - 12 h - 12 rounded - 2xl flex items - center justify - center shrink - 0 ".concat(isLive ? 'bg-red-500/10 text-red-500 animate-pulse' : isCompleted ? 'bg-indigo-50 text-indigo-500' : 'bg-slate-50 text-slate-400', " ")}>
                                            {isLive ? '●' : isCompleted ? '🏁' : '🕒'}
                                        </div>
                                        <div className="truncate flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                                <span className="font-black text-sm truncate">{f.teamAName} vs {f.teamBName}</span>
                                                {isLive && (<span className="text-[9px] font-black text-red-500 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded animate-pulse">
                                                        LIVE: {f.teamAScore || '0/0'} - {f.teamBScore || '0/0'}
                                                    </span>)}
                                                {f.isDuplicate && (<span className="text-[9px] font-black text-amber-700 uppercase tracking-widest bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                                                        DUPLICATE
                                                    </span>)}
                                                {!f.isDuplicate && f.gameId && (<span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                                                        PRIMARY
                                                    </span>)}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest flex-wrap">
                                                {f.tournamentName && (<>
                                                        <span className="text-indigo-600">🏆 {f.tournamentName}</span>
                                                        <span>•</span>
                                                    </>)}
                                                {f.groupName && (<>
                                                        <span className="text-slate-500">{f.groupName}</span>
                                                        <span>•</span>
                                                    </>)}
                                                <span>{new Date(f.date).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span className="text-indigo-500/70">{f.venue}</span>
                                                <span>•</span>
                                                <span className="bg-slate-100 px-1.5 rounded">{f.format}</span>
                                            </div>
                                            {f.result && <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">Result: {f.result}</div>}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        {isCompleted && (<button onClick={function () { return setFinishingMatch(f); }} className="flex-1 sm:flex-none px-4 py-2.5 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all shadow-md">
                                                {f.pointsData ? 'Result' : 'Finish'}
                                            </button>)}
                                        <button onClick={function () { return onStartMatch(f); }} className={"flex - 1 sm: flex - none px - 4 py - 2.5 text - [9px] font - black uppercase tracking - widest rounded - xl transition - all shadow - md ".concat(isLive ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-slate-900 text-white hover:bg-slate-800', " ")}>
                                            {isLive ? 'Resume' : isCompleted ? 'Details' : 'Claim/Start'}
                                        </button>
                                        <button onClick={function () { return onViewMatch(f); }} className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">
                                            Scorecard
                                        </button>
                                        {isAdmin && onRemoveFixture && (<button onClick={function () {
                            if (window.confirm('Remove this fixture from tournament?')) {
                                onRemoveFixture(f.id);
                            }
                        }} className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100 shrink-0" title="Remove">
                                                ✕
                                            </button>)}
                                    </div>
                                </div>);
            })}
                        {displayedFixtures.length === 0 && (<div className="py-20 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-400 font-bold uppercase text-xs">
                                No {activeFixtureTab.toLowerCase()} fixtures found
                            </div>)}
                    </div>
                </div>)}

            {activeTab === 'STANDINGS' && (<div className="space-y-12 animate-in slide-in-from-right-8 pb-10">
                        {groupStandings.map(function (_a) {
                var group = _a.group, rows = _a.rows;
                return (<div key={group.id}>
                                <div className="flex items-center gap-3 mb-6 px-4">
                                    <h3 className="text-2xl font-black text-slate-900">{group.name}</h3>
                                    <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">{rows.length} Teams</span>
                                </div>
                                <PointsTable_1.PointsTable rows={rows} onViewTeam={onViewTeam}/>
                            </div>);
            })}
                        {groupStandings.length === 0 && (<div className="p-20 text-center flex flex-col items-center gap-4 opacity-20">
                                <span className="text-4xl">📊</span>
                                <p className="text-[10px] font-black uppercase tracking-widest">No groups defined</p>
                            </div>)}
                    </div>)}

            {activeTab === 'BRACKET' && (<div className="space-y-8 animate-in fade-in">
                        {isOrgAdmin && (<div className="flex justify-end">
                                <button onClick={handleGenerateKnockouts} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-indigo-500 shadow-lg transition-all">
                                    Auto-Generate Knockouts
                                </button>
                            </div>)}
                        <BracketView_1.BracketView fixtures={activeFixtures} onViewMatch={onViewMatch}/>
                    </div>)}

            {/* TEAM MANAGER MODAL */}
            {managingGroupId && (<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={function () { return setManagingGroupId(null); }}>
                        <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95" onClick={function (e) { return e.stopPropagation(); }}>
                            <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="text-2xl font-black text-slate-900">Select Teams</h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                                    Adding to {(_c = (tournament.groups || []).find(function (g) { return g.id === managingGroupId; })) === null || _c === void 0 ? void 0 : _c.name}
                                </p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                {/* OWN TEAMS */}
                                <div className="mb-6">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Internal Squads</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {organization.memberTeams.map(function (team) {
                var isSelected = selectedTeamIds.has(team.id);
                return (<button key={team.id} onClick={function () { return toggleTeamSelection(team.id); }} className={"p - 4 rounded - 2xl border - 2 transition - all flex items - center justify - between group ".concat(isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white hover:border-slate-300', " ")}>
                                                    <div className="flex items-center gap-3">
                                                        <div className={"w - 10 h - 10 rounded - xl flex items - center justify - center text - lg ".concat(isSelected ? 'bg-indigo-200' : 'bg-slate-50', " ")}>
                                                            🛡️
                                                        </div>
                                                        <div className="text-left">
                                                            <div className={"font - black text - sm ".concat(isSelected ? 'text-indigo-900' : 'text-slate-900', " ")}>{team.name}</div>
                                                            <div className="text-[10px] font-bold text-slate-400 uppercase">{team.players.length} Players</div>
                                                        </div>
                                                    </div>
                                                    <div className={"w - 6 h - 6 rounded - full border - 2 flex items - center justify - center transition - all ".concat(isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-slate-200 group-hover:border-slate-400', " ")}>
                                                        {isSelected && <span className="text-white text-[10px] font-black">✓</span>}
                                                    </div>
                                                </button>);
            })}
                                    </div>
                                </div>

                                {/* AFFILIATED TEAMS */}
                                {availableTeams.length > organization.memberTeams.length && (<div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Affiliated Club Teams</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {availableTeams.filter(function (t) { return !organization.memberTeams.some(function (mt) { return mt.id === t.id; }); }).map(function (team) {
                    var isSelected = selectedTeamIds.has(team.id);
                    return (<button key={team.id} onClick={function () { return toggleTeamSelection(team.id); }} className={"p - 4 rounded - 2xl border - 2 transition - all flex items - center justify - between group ".concat(isSelected ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100 bg-white hover:border-slate-300', " ")}>
                                                        <div className="flex items-center gap-3">
                                                            <div className={"w - 10 h - 10 rounded - xl flex items - center justify - center text - lg ".concat(isSelected ? 'bg-emerald-200' : 'bg-slate-50', " ")}>
                                                                🤝
                                                            </div>
                                                            <div className="text-left">
                                                                <div className={"font - black text - sm ".concat(isSelected ? 'text-emerald-900' : 'text-slate-900', " ")}>{team.name}</div>
                                                                <div className="text-[10px] font-bold text-slate-400 uppercase">Affiliated</div>
                                                            </div>
                                                        </div>
                                                        <div className={"w - 6 h - 6 rounded - full border - 2 flex items - center justify - center transition - all ".concat(isSelected ? 'bg-emerald-600 border-emerald-600' : 'border-slate-200 group-hover:border-slate-400', " ")}>
                                                            {isSelected && <span className="text-white text-[10px] font-black">✓</span>}
                                                        </div>
                                                    </button>);
                })}
                                        </div>
                                    </div>)}
                            </div>

                            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                                <button onClick={function () { return setManagingGroupId(null); }} className="px-6 py-4 text-slate-400 font-black uppercase text-xs hover:text-slate-600">Cancel</button>
                                <button onClick={saveTeamSelection} className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-indigo-500 transition-all">
                                    Update Group ({selectedTeamIds.size})
                                </button>
                            </div>
                        </div>
                    </div>)}

            {/* MANUAL ADD FIXTURE MODAL */}
            {isAddFixtureOpen && onAddFixture && (<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={function () { return setIsAddFixtureOpen(false); }}>
                        <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95" onClick={function (e) { return e.stopPropagation(); }}>
                            <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                                <h3 className="text-2xl font-black text-slate-900">Create Fixture</h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                                    Add a new match to {tournament.name}
                                </p>
                            </div>

                            <div className="p-8 space-y-6">
                                {/* Group Selection - REQUIRED FIRST */}
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Select Group *</label>
                                    <select value={fixtureForm.groupId} onChange={function (e) { return setFixtureForm(__assign(__assign({}, fixtureForm), { groupId: e.target.value, teamAId: '', teamBId: '' })); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-400 transition-colors">
                                        <option value="">Choose a group first</option>
                                        {(tournament.groups || []).map(function (group) { return (<option key={group.id} value={group.id}>{group.name} ({group.teams.length} teams)</option>); })}
                                    </select>
                                    {!fixtureForm.groupId && (<p className="text-xs text-amber-600 mt-2 font-bold">⚠️ Select a group to see available teams</p>)}
                                </div>

                                {/* Team A Selection */}
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Team A</label>
                                    <select value={fixtureForm.teamAId} onChange={function (e) { return setFixtureForm(__assign(__assign({}, fixtureForm), { teamAId: e.target.value })); }} disabled={!fixtureForm.groupId} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                        <option value="">Select Team A</option>
                                        {fixtureAvailableTeams.map(function (team) { return (<option key={team.id} value={team.id}>{team.name}</option>); })}
                                    </select>
                                </div>

                                {/* Team B Selection */}
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Team B</label>
                                    <select value={fixtureForm.teamBId} onChange={function (e) { return setFixtureForm(__assign(__assign({}, fixtureForm), { teamBId: e.target.value })); }} disabled={!fixtureForm.groupId} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                        <option value="">Select Team B</option>
                                        {fixtureAvailableTeams.filter(function (t) { return t.id !== fixtureForm.teamAId; }).map(function (team) { return (<option key={team.id} value={team.id}>{team.name}</option>); })}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Date */}
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Match Date</label>
                                        <input type="datetime-local" value={fixtureForm.date} onChange={function (e) { return setFixtureForm(__assign(__assign({}, fixtureForm), { date: e.target.value })); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-400 transition-colors"/>
                                    </div>

                                    {/* Format */}
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Format</label>
                                        <select value={fixtureForm.format} onChange={function (e) { return setFixtureForm(__assign(__assign({}, fixtureForm), { format: e.target.value })); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-400 transition-colors">
                                            <option value="T20">T20</option>
                                            <option value="T10">T10</option>
                                            <option value="50-over">50-over</option>
                                            <option value="40-over">40-over</option>
                                            <option value="Test">Test</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Duplicate Warning */}
                                {fixtureForm.teamAId && fixtureForm.teamBId && fixtureForm.date && (function () {
                var timestamp = new Date(fixtureForm.date).getTime();
                var duplicateCheck = (0, duplicateDetection_1.checkForDuplicateMatch)({ teamAId: fixtureForm.teamAId, teamBId: fixtureForm.teamBId, timestamp: timestamp }, organization.fixtures);
                if (duplicateCheck.isDuplicate) {
                    return (<div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                                                <div className="flex items-start gap-3">
                                                    <span className="text-2xl">⚠️</span>
                                                    <div className="flex-1">
                                                        <div className="font-bold text-amber-900 text-sm mb-1">Duplicate Match Detected</div>
                                                        <div className="text-xs text-amber-700 leading-relaxed">
                                                            A match between these teams on this date already exists. This will be marked as a <strong>DUPLICATE</strong> match and will <strong>NOT count toward player statistics</strong>.
                                                        </div>
                                                        {duplicateCheck.primaryMatch && (<button onClick={function () { return onViewMatch(duplicateCheck.primaryMatch); }} className="mt-2 text-amber-600 underline text-xs font-bold hover:text-amber-800">
                                                                View Primary Match →
                                                            </button>)}
                                                    </div>
                                                </div>
                                            </div>);
                }
                return null;
            })()}

                                {/* Venue */}
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Venue</label>
                                    <input type="text" value={fixtureForm.venue} onChange={function (e) { return setFixtureForm(__assign(__assign({}, fixtureForm), { venue: e.target.value })); }} placeholder="Enter venue name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-400 transition-colors"/>
                                </div>
                            </div>

                            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                                <button onClick={function () {
                setIsAddFixtureOpen(false);
                setFixtureForm({ groupId: '', teamAId: '', teamBId: '', date: '', venue: '', format: tournament.format });
            }} className="px-6 py-4 text-slate-400 font-black uppercase text-xs hover:text-slate-600">
                                    Cancel
                                </button>
                                <button onClick={function () {
                var _a, _b;
                var teamA = availableTeams.find(function (t) { return t.id === fixtureForm.teamAId; });
                var teamB = availableTeams.find(function (t) { return t.id === fixtureForm.teamBId; });
                if (!teamA || !teamB || !fixtureForm.date || !fixtureForm.venue) {
                    alert('Please fill all fields');
                    return;
                }
                var timestamp = new Date(fixtureForm.date).getTime();
                var gameId = (0, duplicateDetection_1.generateGameId)(teamA.id, teamB.id, timestamp);
                var duplicateCheck = (0, duplicateDetection_1.checkForDuplicateMatch)({ teamAId: teamA.id, teamBId: teamB.id, timestamp: timestamp }, organization.fixtures);
                var selectedGroup = (_a = tournament.groups) === null || _a === void 0 ? void 0 : _a.find(function (g) { return g.id === fixtureForm.groupId; });
                onAddFixture({
                    id: "fix - ".concat(Date.now(), " "),
                    tournamentId: tournament.id,
                    tournamentName: tournament.name,
                    groupId: fixtureForm.groupId,
                    groupName: selectedGroup === null || selectedGroup === void 0 ? void 0 : selectedGroup.name,
                    teamAId: teamA.id,
                    teamBId: teamB.id,
                    teamAName: teamA.name,
                    teamBName: teamB.name,
                    date: new Date(fixtureForm.date).toISOString(),
                    timestamp: timestamp,
                    venue: fixtureForm.venue,
                    format: fixtureForm.format,
                    status: 'Scheduled',
                    gameId: gameId,
                    isDuplicate: duplicateCheck.isDuplicate,
                    primaryMatchId: (_b = duplicateCheck.primaryMatch) === null || _b === void 0 ? void 0 : _b.id,
                    duplicateReason: duplicateCheck.isDuplicate ? "Duplicate of match between ".concat(teamA.name, " vs ").concat(teamB.name, " on ").concat(new Date(timestamp).toLocaleDateString(), " ") : undefined
                });
                if (duplicateCheck.isDuplicate) {
                    setDuplicateWarning(duplicateCheck);
                }
                setIsAddFixtureOpen(false);
                setFixtureForm({ groupId: '', teamAId: '', teamBId: '', date: '', venue: '', format: tournament.format });
            }} disabled={!fixtureForm.teamAId || !fixtureForm.teamBId || !fixtureForm.date || !fixtureForm.venue} className="px-8 py-4 bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-indigo-500 transition-all">
                                    Create Fixture
                                </button>
                            </div>
                        </div>
                    </div>)}

            {/* CSV UPLOAD MODAL */}
            {isCSVUploadOpen && onAddFixture && (<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={function () { return setIsCSVUploadOpen(false); }}>
                        <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95" onClick={function (e) { return e.stopPropagation(); }}>
                            <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50">
                                <h3 className="text-2xl font-black text-slate-900">Upload Fixtures (CSV)</h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                                    Bulk import fixtures from CSV file
                                </p>
                            </div>

                            <div className="p-8 space-y-6">
                                {/* CSV Format Instructions */}
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                                    <h4 className="text-sm font-black text-slate-700 mb-3">CSV Format Required:</h4>
                                    <code className="block bg-white p-4 rounded-xl text-xs font-mono text-slate-600 border border-slate-200">
                                        teamAId,teamBId,date,venue,format<br />
                                        tm-123,tm-456,2026-03-15T14:00,Stadium A,T20<br />
                                        tm-789,tm-123,2026-03-16T18:00,Stadium B,T20
                                    </code>
                                    <p className="text-xs text-slate-400 mt-3 font-bold">
                                        • Date format: YYYY-MM-DDTHH:MM<br />
                                        • Format options: T20, T10, 50-over, 40-over, Test
                                    </p>
                                </div>

                                {/* File Upload */}
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Select CSV File</label>
                                    <input type="file" accept=".csv" onChange={function (e) {
                var _a;
                var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                if (!file)
                    return;
                var reader = new FileReader();
                reader.onload = function (event) {
                    var _a, _b, _c, _d, _e, _f;
                    var csv = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                    var lines = csv.split('\n').filter(function (l) { return l.trim(); });
                    var headers = lines[0].split(',');
                    var successCount = 0;
                    var _loop_1 = function (i) {
                        var values = lines[i].split(',');
                        var teamAId = (_b = values[0]) === null || _b === void 0 ? void 0 : _b.trim();
                        var teamBId = (_c = values[1]) === null || _c === void 0 ? void 0 : _c.trim();
                        var date = (_d = values[2]) === null || _d === void 0 ? void 0 : _d.trim();
                        var venue = (_e = values[3]) === null || _e === void 0 ? void 0 : _e.trim();
                        var format = (((_f = values[4]) === null || _f === void 0 ? void 0 : _f.trim()) || tournament.format);
                        var teamA = availableTeams.find(function (t) { return t.id === teamAId; });
                        var teamB = availableTeams.find(function (t) { return t.id === teamBId; });
                        if (teamA && teamB && date && venue) {
                            onAddFixture({
                                id: "fix - csv - ".concat(Date.now(), " -").concat(i, " "),
                                tournamentId: tournament.id,
                                teamAId: teamA.id,
                                teamBId: teamB.id,
                                teamAName: teamA.name,
                                teamBName: teamB.name,
                                date: new Date(date).toISOString(),
                                venue: venue,
                                format: format,
                                status: 'Scheduled'
                            });
                            successCount++;
                        }
                    };
                    for (var i = 1; i < lines.length; i++) {
                        _loop_1(i);
                    }
                    alert("Successfully imported ".concat(successCount, " fixtures!"));
                    setIsCSVUploadOpen(false);
                };
                reader.readAsText(file);
            }} className="w-full bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl px-5 py-8 font-bold outline-none focus:border-emerald-400 transition-colors cursor-pointer hover:bg-slate-100"/>
                                </div>
                            </div>

                            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                                <button onClick={function () { return setIsCSVUploadOpen(false); }} className="px-6 py-4 text-slate-400 font-black uppercase text-xs hover:text-slate-600">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>)}
            {/* MATCH RESULT ENTRY MODAL */}
            {finishingMatch && (<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
                        <MatchResultEntryForm_1.MatchResultEntryForm fixture={finishingMatch} config={tournament.pointsConfig} onSave={function (fixtureId, resultData) {
                if (onUpdateFixture) {
                    onUpdateFixture(fixtureId, {
                        status: 'Completed',
                        pointsData: resultData,
                        winnerId: resultData.winnerSide === 'A' ? finishingMatch.teamAId : (resultData.winnerSide === 'B' ? finishingMatch.teamBId : 'TIE'),
                        result: resultData.isIncomplete
                            ? "Incomplete - ".concat(resultData.firstInningsResult === 'LEAD' ? finishingMatch.teamAName : (resultData.firstInningsResult === 'LOSS' ? finishingMatch.teamBName : 'Tied'), " on 1st Innings")
                            : (resultData.winnerSide === 'TIE' ? 'Match Tied' : "".concat(resultData.winnerSide === 'A' ? finishingMatch.teamAName : finishingMatch.teamBName, " won by Outright Victory"))
                    });
                }
                setFinishingMatch(null);
            }} onCancel={function () { return setFinishingMatch(null); }}/>
                    </div>
                </div>)}
        </div>);
};
exports.TournamentDashboard = TournamentDashboard;
