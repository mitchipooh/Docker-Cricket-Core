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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedViewer = void 0;
var react_1 = require("react");
var DataProvider_1 = require("@cricket/shared/contexts/DataProvider");
var TournamentDashboard_1 = require("../dashboard/TournamentDashboard");
var PlayerRegistry_1 = require("../search/PlayerRegistry");
var OrganizationView_1 = require("../dashboard/OrganizationView");
var EmbedViewer = function () {
    var orgs = (0, DataProvider_1.useData)().orgs;
    var params = new URLSearchParams(window.location.search);
    // Embed Parameters
    var view = params.get('view');
    var entityId = params.get('id');
    var orgId = params.get('orgId');
    var tournamentId = params.get('tournamentId');
    var groupId = params.get('groupId');
    // Find Entity Helpers
    var findTournament = function (tId) {
        if (!tId)
            return null;
        for (var _i = 0, orgs_1 = orgs; _i < orgs_1.length; _i++) {
            var org = orgs_1[_i];
            var trn = org.tournaments.find(function (t) { return t.id === tId; });
            if (trn)
                return { tournament: trn, org: org };
        }
        return null;
    };
    var findOrg = function (oId) {
        return orgs.find(function (o) { return o.id === oId; }) || null;
    };
    // Aggregate all data for registry
    var allPlayers = (0, react_1.useMemo)(function () {
        return orgs.flatMap(function (o) { return o.memberTeams.flatMap(function (t) { return t.players; }); });
    }, [orgs]);
    var allTeams = (0, react_1.useMemo)(function () {
        return orgs.flatMap(function (o) { return o.memberTeams; });
    }, [orgs]);
    // Render Logic
    if (view === 'tournament' || view === 'standings' || view === 'fixtures' || view === 'bracket' || view === 'groups') {
        var tId = tournamentId || entityId;
        var data = findTournament(tId);
        if (!data)
            return <div className="p-8 text-center text-slate-500 font-bold">Tournament not found</div>;
        var tab = 'OVERVIEW';
        if (view === 'standings')
            tab = 'STANDINGS';
        if (view === 'fixtures')
            tab = 'FIXTURES';
        if (view === 'bracket')
            tab = 'BRACKET';
        if (view === 'groups')
            tab = 'GROUPS';
        return (<div className="bg-slate-50 min-h-screen p-4">
                <TournamentDashboard_1.TournamentDashboard tournament={data.tournament} organization={data.org} onBack={function () { }} // No back button in embed
         onStartMatch={function () { }} // Read-only usually
         onGenerateFixtures={function () { }} onAddGroup={function () { }} onUpdateGroupTeams={function () { }} onViewTeam={function () { }} onViewMatch={function () { }} embedMode={true} initialTab={tab} allOrganizations={orgs}/>
            </div>);
    }
    if (view === 'player_search') {
        return (<div className="bg-slate-50 min-h-screen p-4">
                <PlayerRegistry_1.PlayerRegistry allPlayers={allPlayers} allTeams={allTeams} onViewPlayer={function () { }} onBack={function () { }}/>
            </div>);
    }
    if (view === 'team_list' && orgId) {
        var org_1 = findOrg(orgId);
        if (!org_1)
            return <div className="p-8 text-center text-slate-500 font-bold">Organization not found</div>;
        var orgPlayers = org_1.memberTeams.flatMap(function (team) {
            return team.players.map(function (p) { return (__assign(__assign({}, p), { teamId: team.id, orgId: org_1.id })); });
        });
        return (<div className="bg-slate-50 min-h-screen p-4">
                <OrganizationView_1.OrganizationView organization={org_1} userRole="Guest" onBack={function () { }} onViewTournament={function () { }} onViewPlayer={function () { }} onRequestAddTeam={function () { }} onRequestAddTournament={function () { }} onUpdateOrg={function (org) { }} onRemoveTeam={function (id) { }} players={orgPlayers} onViewTeam={function () { }} isFollowed={false} onToggleFollow={function () { }} globalUsers={[]} onAddMember={function () { }} embedMode={true}/>
            </div>);
    }
    return (<div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-slate-400 font-bold uppercase tracking-widest text-sm">
            <span>Invalid Embed Configuration</span>
            <span className="text-[10px] mt-2 opacity-70">Code: {view} | ID: {entityId}</span>
        </div>);
};
exports.EmbedViewer = EmbedViewer;
