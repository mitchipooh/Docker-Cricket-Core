"use strict";
/**
 * Cricket-Core 2026 Management System
 * Created by mitchipoohdevs
 */
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
exports.AdminCenter = void 0;
var react_1 = require("react");
var shared_1 = require("@cricket/shared");
var GlobalDashboard_1 = require("../dashboard/GlobalDashboard");
var OrganizationView_1 = require("../dashboard/OrganizationView");
var pointsEngine_1 = require("@cricket/shared/competition/pointsEngine");
var TournamentDashboard_1 = require("../dashboard/TournamentDashboard");
var DeleteOrgModal_1 = require("../modals/DeleteOrgModal");
var HRPortal_1 = require("./HRPortal");
var TransferMarket_1 = require("../market/TransferMarket");
var SponsorManager_1 = require("./SponsorManager");
var CreateOrgModal_1 = require("../modals/CreateOrgModal");
var IssueResolutionModal_1 = require("../modals/IssueResolutionModal");
var EmbedCodeModal_1 = require("../modals/EmbedCodeModal");
var AdminCenter = function (_a) {
    var organizations = _a.organizations, standaloneMatches = _a.standaloneMatches, userRole = _a.userRole, onStartMatch = _a.onStartMatch, onViewMatch = _a.onViewMatch, onRequestSetup = _a.onRequestSetup, onUpdateOrgs = _a.onUpdateOrgs, onCreateOrg = _a.onCreateOrg, onAddTeam = _a.onAddTeam, onRemoveTeam = _a.onRemoveTeam, onBulkAddPlayers = _a.onBulkAddPlayers, onAddGroup = _a.onAddGroup, onUpdateGroupTeams = _a.onUpdateGroupTeams, onAddTournament = _a.onAddTournament, mediaPosts = _a.mediaPosts, onAddMediaPost = _a.onAddMediaPost, onViewTeam = _a.onViewTeam, onOpenMediaStudio = _a.onOpenMediaStudio, following = _a.following, onToggleFollow = _a.onToggleFollow, _b = _a.mockGlobalUsers, mockGlobalUsers = _b === void 0 ? [] : _b, _c = _a.onAddMemberToOrg, onAddMemberToOrg = _c === void 0 ? function () { } : _c, onProcessApplication = _a.onProcessApplication, _d = _a.hireableScorers, hireableScorers = _d === void 0 ? [] : _d, currentUserId = _a.currentUserId, onApplyForOrg = _a.onApplyForOrg, onUpgradeProfile = _a.onUpgradeProfile, onTransferPlayer = _a.onTransferPlayer, currentUserProfile = _a.currentUserProfile, showCaptainHub = _a.showCaptainHub, onOpenCaptainHub = _a.onOpenCaptainHub, onRequestMatchReports = _a.onRequestMatchReports, onUpdateProfile = _a.onUpdateProfile, onRequestTransferMarket = _a.onRequestTransferMarket, _e = _a.issues, issues = _e === void 0 ? [] : _e, onUpdateIssues = _a.onUpdateIssues, onRemoveTournament = _a.onRemoveTournament, onUpdateTournament = _a.onUpdateTournament, onUpdateFixture = _a.onUpdateFixture, onRemoveFixture = _a.onRemoveFixture, _f = _a.allOrganizations, allOrganizations = _f === void 0 ? [] : _f, onSelectHubTeam = _a.onSelectHubTeam, onRequestAffiliation = _a.onRequestAffiliation, onViewOrg = _a.onViewOrg, onCreateUser = _a.onCreateUser, activeViewRole = _a.activeViewRole, onSwitchViewRole = _a.onSwitchViewRole;
    var _g = (0, react_1.useState)('GLOBAL'), viewScope = _g[0], setViewScope = _g[1];
    var _h = (0, react_1.useState)(null), selectedOrgId = _h[0], setSelectedOrgId = _h[1];
    var _j = (0, react_1.useState)(null), selectedTournamentId = _j[0], setSelectedTournamentId = _j[1];
    var _k = (0, react_1.useState)({ createOrg: false, deleteOrg: false, addTeam: false, addTournament: false }), modals = _k[0], setModals = _k[1];
    var _l = (0, react_1.useState)(null), pendingOrg = _l[0], setPendingOrg = _l[1];
    var _m = (0, react_1.useState)(null), selectedIssue = _m[0], setSelectedIssue = _m[1];
    var _o = (0, react_1.useState)(false), isResolutionModalOpen = _o[0], setIsResolutionModalOpen = _o[1];
    var _p = (0, react_1.useState)(false), showEmbedModal = _p[0], setShowEmbedModal = _p[1];
    var _q = (0, react_1.useState)({ name: '', location: '' }), teamForm = _q[0], setTeamForm = _q[1];
    var _r = (0, react_1.useState)({
        name: '',
        format: 'T20',
        startDate: '',
        endDate: '',
        gameStartTime: '',
        description: ''
    }), trnForm = _r[0], setTrnForm = _r[1];
    var activeOrg = (0, react_1.useMemo)(function () { return organizations.find(function (o) { return o.id === selectedOrgId; }); }, [organizations, selectedOrgId]);
    var activeTrn = (0, react_1.useMemo)(function () { return activeOrg === null || activeOrg === void 0 ? void 0 : activeOrg.tournaments.find(function (t) { return t.id === selectedTournamentId; }); }, [activeOrg, selectedTournamentId]);
    var allTeams = (0, react_1.useMemo)(function () { return organizations.flatMap(function (org) { return org.memberTeams; }); }, [organizations]);
    var globalPlayers = (0, react_1.useMemo)(function () { return organizations.flatMap(function (org) { return org.memberTeams.flatMap(function (t) { return t.players.map(function (p) { return (__assign(__assign({}, p), { teamName: t.name, teamId: t.id, orgId: org.id, orgName: org.name })); }); }); }); }, [organizations]);
    var globalFixtures = (0, react_1.useMemo)(function () { return __spreadArray(__spreadArray([], organizations.flatMap(function (org) { return org.fixtures; }), true), standaloneMatches, true).sort(function (a, b) { var weight = { 'Live': 0, 'Scheduled': 1, 'Completed': 2 }; var diff = (weight[a.status] || 1) - (weight[b.status] || 1); return diff !== 0 ? diff : a.status === 'Completed' ? new Date(b.date).getTime() - new Date(a.date).getTime() : new Date(a.date).getTime() - new Date(b.date).getTime(); }); }, [organizations, standaloneMatches]);
    var incompleteMatches = (0, react_1.useMemo)(function () {
        return globalFixtures.filter(function (f) { return f.status === 'Live' && f.scorerId === currentUserId; });
    }, [globalFixtures, currentUserId]);
    var topBatsmen = (0, react_1.useMemo)(function () { return __spreadArray([], globalPlayers, true).sort(function (a, b) { return b.stats.runs - a.stats.runs; }).slice(0, 5); }, [globalPlayers]);
    var topBowlers = (0, react_1.useMemo)(function () { return __spreadArray([], globalPlayers, true).sort(function (a, b) { return b.stats.wickets - a.stats.wickets; }).slice(0, 5); }, [globalPlayers]);
    var currentOrgPlayers = (0, react_1.useMemo)(function () { return activeOrg ? activeOrg.memberTeams.flatMap(function (t) { return t.players.map(function (p) { return (__assign(__assign({}, p), { teamName: t.name, teamId: t.id, orgId: activeOrg.id, orgName: activeOrg.name })); }); }) : []; }, [activeOrg]);
    var currentUserMemberInActiveOrg = (0, react_1.useMemo)(function () { return activeOrg === null || activeOrg === void 0 ? void 0 : activeOrg.members.find(function (m) { return m.userId === currentUserId; }); }, [activeOrg, currentUserId]);
    var isOrgAdminOfActiveOrg = ((currentUserMemberInActiveOrg === null || currentUserMemberInActiveOrg === void 0 ? void 0 : currentUserMemberInActiveOrg.role) === 'Administrator' && !currentUserMemberInActiveOrg.managedTeamId) || userRole === 'Administrator';
    var isTeamAdminOfActiveOrg = (currentUserMemberInActiveOrg === null || currentUserMemberInActiveOrg === void 0 ? void 0 : currentUserMemberInActiveOrg.role) === 'Administrator' && !!currentUserMemberInActiveOrg.managedTeamId;
    var accessibleOrgs = (0, react_1.useMemo)(function () {
        if (userRole === 'Administrator')
            return organizations;
        return organizations.filter(function (org) { return org.members.some(function (m) { return m.userId === currentUserId; }); });
    }, [organizations, userRole, currentUserId]);
    var myManagedTeams = (0, react_1.useMemo)(function () {
        return organizations
            .filter(function (org) { return org.members.some(function (m) { return m.userId === currentUserId && m.role === 'Administrator'; }); })
            .flatMap(function (org) { return org.memberTeams; });
    }, [organizations, currentUserId]);
    var handleDeleteConfirm = function () { if (pendingOrg) {
        onUpdateOrgs(organizations.filter(function (o) { return o.id !== pendingOrg.id; }));
        setModals(__assign(__assign({}, modals), { deleteOrg: false }));
        setPendingOrg(null);
        if (selectedOrgId === pendingOrg.id)
            setSelectedOrgId(null);
    } };
    var handleRequestCreateOrg = function () {
        setModals(__assign(__assign({}, modals), { createOrg: true }));
    };
    var handleAddTeam = function () { if (selectedOrgId && teamForm.name) {
        onAddTeam(selectedOrgId, __assign(__assign({}, teamForm), { players: [] }));
        setModals(__assign(__assign({}, modals), { addTeam: false }));
        setTeamForm({ name: '', location: '' });
    } };
    var handleCreateTournament = function () { if (selectedOrgId) {
        onAddTournament(selectedOrgId, { id: "trn-".concat(Date.now()), name: trnForm.name, format: trnForm.format, startDate: trnForm.startDate, endDate: trnForm.endDate, gameStartTime: trnForm.gameStartTime, description: trnForm.description, overs: trnForm.format === 'Test' ? 90 : 20, groups: [], teamIds: [], pointsConfig: trnForm.format === 'Test' ? pointsEngine_1.PRESET_TEST : pointsEngine_1.DEFAULT_POINTS_CONFIG, status: 'Upcoming', createdBy: currentUserId });
        setModals(__assign(__assign({}, modals), { addTournament: false }));
        setTrnForm({ name: '', format: 'T20', startDate: '', endDate: '', gameStartTime: '', description: '' });
    } };
    var handleTournamentAddGroup = function (tournamentId, groupName) { if (!activeOrg)
        return; var newGroup = { id: "grp-".concat(Date.now()), name: groupName, teams: [] }; onUpdateOrgs(organizations.map(function (org) { return org.id === activeOrg.id ? __assign(__assign({}, org), { tournaments: org.tournaments.map(function (t) { return t.id === tournamentId ? __assign(__assign({}, t), { groups: __spreadArray(__spreadArray([], (t.groups || []), true), [newGroup], false) }) : t; }) }) : org; })); };
    var handleTournamentUpdateTeams = function (tournamentId, groupId, teamIds) {
        if (!activeOrg)
            return;
        var allAvailableTeams = organizations.flatMap(function (o) { return o.memberTeams; });
        var selectedTeams = allAvailableTeams.filter(function (t) { return teamIds.includes(t.id); });
        onUpdateOrgs(organizations.map(function (org) {
            return org.id === activeOrg.id
                ? __assign(__assign({}, org), { tournaments: org.tournaments.map(function (t) {
                        return t.id === tournamentId
                            ? __assign(__assign({}, t), { groups: (t.groups || []).map(function (g) {
                                    return g.id === groupId ? __assign(__assign({}, g), { teams: selectedTeams }) : g;
                                }) }) : t;
                    }) }) : org;
        }));
    };
    var handleGenerateFixtures = function () { if (!activeOrg || !activeTrn)
        return; var newFix = (activeTrn.groups || []).flatMap(function (g) { return (0, shared_1.generateRoundRobin)(g.teams, activeTrn.id, g.id); }); onUpdateOrgs(organizations.map(function (o) { return o.id === activeOrg.id ? __assign(__assign({}, o), { fixtures: __spreadArray(__spreadArray([], o.fixtures, true), newFix, true) }) : o; })); };
    var handleAddFixture = function (fixture) {
        if (!activeOrg)
            return;
        // Preserve ALL fields from fixture, only set defaults for truly missing required fields
        var completeFixture = __assign(__assign({ tournamentId: (activeTrn === null || activeTrn === void 0 ? void 0 : activeTrn.id) || '', teamAId: '', teamBId: '', teamAName: '', teamBName: '', date: new Date().toISOString(), venue: '', format: 'T20', status: 'Scheduled' }, fixture), { 
            // Ensure ID is set if not provided
            id: fixture.id || "fix-".concat(Date.now()) });
        onUpdateOrgs(organizations.map(function (o) {
            return o.id === activeOrg.id
                ? __assign(__assign({}, o), { fixtures: __spreadArray(__spreadArray([], o.fixtures, true), [completeFixture], false) }) : o;
        }));
    };
    var handleUpdateOrgDetails = function (id, data) {
        onUpdateOrgs(organizations.map(function (o) { return o.id === id ? __assign(__assign({}, o), data) : o; }));
    };
    var handleProcessApplication = function (orgId, appId, action, role) {
        var parentOrg = organizations.find(function (o) { return o.id === orgId; });
        var app = parentOrg === null || parentOrg === void 0 ? void 0 : parentOrg.applications.find(function (a) { return a.id === appId; });
        if (!parentOrg || !app)
            return;
        var isAffiliation = app.type === 'ORG_AFFILIATE';
        var childOrgId = app.applicantId;
        var updatedOrgs = organizations.map(function (org) {
            if (org.id === orgId) {
                var updatedApps = org.applications.map(function (a) { return a.id === appId ? __assign(__assign({}, a), { status: action }) : a; });
                var newChildIds = org.childOrgIds || [];
                if (action === 'APPROVED' && isAffiliation && !newChildIds.includes(childOrgId)) {
                    newChildIds = __spreadArray(__spreadArray([], newChildIds, true), [childOrgId], false);
                }
                var newMembers = org.members;
                var updatedTeams = org.memberTeams;
                if (action === 'APPROVED' && !isAffiliation && role) {
                    if (!org.members.some(function (m) { return m.userId === app.applicantId; })) {
                        newMembers = __spreadArray(__spreadArray([], org.members, true), [{
                                userId: app.applicantId,
                                name: app.applicantName,
                                handle: app.applicantHandle || '',
                                role: role,
                                addedAt: Date.now()
                            }], false);
                    }
                    if (role === 'Player' && org.memberTeams.length > 0) {
                        var firstTeam_1 = org.memberTeams[0];
                        var newPlayer_1 = {
                            id: app.applicantId,
                            name: app.applicantName,
                            role: 'All-rounder',
                            photoUrl: app.applicantImage,
                            stats: { runs: 0, wickets: 0, ballsFaced: 0, ballsBowled: 0, runsConceded: 0, matches: 0, catches: 0, runOuts: 0, stumpings: 0, fours: 0, sixes: 0, hundreds: 0, fifties: 0, ducks: 0, threeWickets: 0, fiveWickets: 0, maidens: 0 }
                        };
                        updatedTeams = org.memberTeams.map(function (t) { return t.id === firstTeam_1.id ? __assign(__assign({}, t), { players: __spreadArray(__spreadArray([], t.players, true), [newPlayer_1], false) }) : t; });
                    }
                }
                return __assign(__assign({}, org), { applications: updatedApps, childOrgIds: newChildIds, members: newMembers, memberTeams: updatedTeams });
            }
            if (org.id === childOrgId && action === 'APPROVED' && isAffiliation) {
                var newParentIds = org.parentOrgIds || [];
                if (!newParentIds.includes(orgId)) {
                    return __assign(__assign({}, org), { parentOrgIds: __spreadArray(__spreadArray([], newParentIds, true), [orgId], false) });
                }
            }
            return org;
        });
        if (onProcessApplication) {
            onProcessApplication(orgId, appId, action, role);
        }
        else {
            onUpdateOrgs(updatedOrgs);
        }
    };
    var handleResolveIssue = function (issueId, resolution, response) {
        var newStatus = resolution === 'DISMISSED' ? 'DISMISSED' : 'RESOLVED';
        var updatedIssues = issues.map(function (i) { return i.id === issueId ? __assign(__assign({}, i), { status: newStatus, resolution: resolution, adminResponse: response, resolvedAt: Date.now() }) : i; });
        if (onUpdateIssues)
            onUpdateIssues(updatedIssues);
        setIsResolutionModalOpen(false);
    };
    var centralZone = organizations.find(function (o) { return o.id === 'org-central-zone'; });
    var currentMember = centralZone === null || centralZone === void 0 ? void 0 : centralZone.members.find(function (m) { return m.userId === currentUserId; });
    var hasPermission = function (perm) { var _a; return userRole === 'Administrator' || !!((_a = currentMember === null || currentMember === void 0 ? void 0 : currentMember.permissions) === null || _a === void 0 ? void 0 : _a[perm]); };
    return (<div className="max-w-7xl mx-auto px-1.5 py-4 md:p-8 min-h-screen">
      <CreateOrgModal_1.CreateOrgModal isOpen={modals.createOrg} onClose={function () { return setModals(__assign(__assign({}, modals), { createOrg: false })); }} onCreate={onCreateOrg} userRole={userRole}/>
      <IssueResolutionModal_1.IssueResolutionModal issue={selectedIssue} isOpen={isResolutionModalOpen} onClose={function () { return setIsResolutionModalOpen(false); }} onResolve={handleResolveIssue}/>
      {/* INCOMPLETE GAMES WARNING */}
      {incompleteMatches.length > 0 && (<div className="mb-8 bg-red-500/10 border-2 border-red-500/30 rounded-[2.5rem] p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 bg-red-500 text-white rounded-2xl flex items-center justify-center text-xl animate-pulse">⚠</div>
            <div>
              <h3 className="text-red-600 dark:text-red-400 font-black uppercase text-xs tracking-widest mb-1">Incomplete Games Detected</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-bold">You have {incompleteMatches.length} match{incompleteMatches.length > 1 ? 'es' : ''} in progress. Pick back up where you left off!</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={function () { return onSwitchViewRole && onSwitchViewRole('Scorer'); }} className="px-6 py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-lg">
              Continue Scoring
            </button>
          </div>
        </div>)}

      {/* ROLE SWITCHER - Mobile Dropdown / Desktop Grid */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-4 duration-500">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-1 italic">Welcome Back, {currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.name}</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Unified Profile Active
          </p>
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden w-full">
          <select value={activeViewRole} onChange={function (e) { return onSwitchViewRole && onSwitchViewRole(e.target.value); }} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-black text-slate-900 dark:text-white outline-none focus:ring-2 ring-indigo-500/20">
            {['Administrator', 'Scorer', 'Player', 'Umpire', 'Captain', 'Coach'].map(function (role) { return (<option key={role} value={role}>{role}</option>); })}
          </select>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex flex-wrap bg-slate-50 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-inner gap-1">
          {['Administrator', 'Scorer', 'Player', 'Umpire', 'Captain', 'Coach'].map(function (role) { return (<button key={role} onClick={function () { return onSwitchViewRole && onSwitchViewRole(role); }} className={"px-4 md:px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ".concat(activeViewRole === role ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300')}>
              {role}
            </button>); })}
        </div>
      </div>

      {/* GLOBAL NAV TABS - Mobile Dropdown / Desktop Tabs */}
      {viewScope === 'GLOBAL' && (userRole === 'Administrator' || hasPermission('view_protests')) && (<div className="mb-8">
          {/* Mobile Dropdown */}
          <div className="md:hidden mb-4">
            <div className="relative">
              <select value={viewScope} onChange={function (e) { return setViewScope(e.target.value); }} className="w-full appearance-none bg-slate-900 text-white rounded-xl px-6 py-4 font-black uppercase tracking-widest outline-none border border-slate-800 shadow-lg">
                <option value="GLOBAL">Dashboard</option>
                {userRole === 'Administrator' && (<>
                    <option value="HR">HR & Talent</option>
                    <option value="MARKET">Transfer Market</option>
                    <option value="SPONSORS">Sponsors</option>
                    <option value="REPORTS">Reports {globalFixtures.some(function (f) { var _a; return ((_a = f.reportSubmission) === null || _a === void 0 ? void 0 : _a.status) === 'PENDING'; }) ? '(Pending!)' : ''}</option>
                  </>)}
                {hasPermission('view_protests') && <option value="ISSUES">Issues</option>}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none text-xs">▼</div>
            </div>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex gap-4">
            <button onClick={function () { return setViewScope('GLOBAL'); }} className="text-2xl font-black text-slate-900 border-b-4 border-slate-900 pb-1">Dashboard</button>
            {userRole === 'Administrator' && (<>
                <button onClick={function () { return setViewScope('HR'); }} className="text-2xl font-black text-slate-300 hover:text-slate-500 border-b-4 border-transparent hover:border-slate-200 pb-1 transition-all">HR & Talent</button>
                <button onClick={function () { return setViewScope('MARKET'); }} className="text-2xl font-black text-slate-300 hover:text-slate-500 border-b-4 border-transparent hover:border-slate-200 pb-1 transition-all">Transfer Market</button>
                <button onClick={function () { return setViewScope('SPONSORS'); }} className="text-2xl font-black text-slate-300 hover:text-slate-500 border-b-4 border-transparent hover:border-slate-200 pb-1 transition-all">Sponsors</button>
                {organizations.some(function (o) { return o.members.length === 0; }) && (<button onClick={function () {
                        if (confirm("Found orphaned organizations. Claim them to your account?")) {
                            var claimedOrgs = organizations.map(function (o) {
                                if (o.members.length === 0) {
                                    return __assign(__assign({}, o), { members: [{
                                                userId: currentUserId || 'unknown',
                                                name: (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.name) || 'Admin',
                                                handle: (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.handle) || '@admin',
                                                role: 'Administrator',
                                                addedAt: Date.now()
                                            }] });
                                }
                                return o;
                            });
                            onUpdateOrgs(claimedOrgs);
                            alert("Orphaned organizations claimed! They should now appear in your dashboard.");
                        }
                    }} className="text-2xl font-black text-red-500 hover:text-red-700 border-b-4 border-transparent hover:border-red-200 pb-1 transition-all animate-pulse">
                    ⚠ Fix Profile Pinning
                  </button>)}
              </>)}
            {hasPermission('view_protests') && (<button onClick={function () { return setViewScope('ISSUES'); }} className="text-2xl font-black text-slate-300 hover:text-slate-500 border-b-4 border-transparent hover:border-slate-200 pb-1 transition-all relative">
                Issues
                <span className="absolute -top-1 -right-2 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white"></span>
              </button>)}
            {userRole === 'Administrator' && (<button onClick={function () { return setViewScope('REPORTS'); }} className="text-2xl font-black text-slate-300 hover:text-slate-500 border-b-4 border-transparent hover:border-slate-200 pb-1 relative transition-all">
                Reports
                {globalFixtures.some(function (f) { var _a; return ((_a = f.reportSubmission) === null || _a === void 0 ? void 0 : _a.status) === 'PENDING'; }) && (<span className="absolute -top-1 -right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>)}
              </button>)}
          </div>
        </div>)}

      {viewScope === 'HR' && (<div><button onClick={function () { return setViewScope('GLOBAL'); }} className="mb-6 text-slate-400 font-bold uppercase text-xs tracking-widest hover:text-slate-900">← Back to Dashboard</button><HRPortal_1.HRPortal scorers={hireableScorers}/></div>)}
      {viewScope === 'MARKET' && (<div><button onClick={function () { return setViewScope('GLOBAL'); }} className="mb-6 text-slate-400 font-bold uppercase text-xs tracking-widest hover:text-slate-900">← Back to Dashboard</button><TransferMarket_1.TransferMarket players={globalPlayers} myTeams={myManagedTeams} onTransfer={function (pId, tId) { return onTransferPlayer && onTransferPlayer(pId, tId); }} onBack={function () { return setViewScope('GLOBAL'); }}/></div>)}
      {viewScope === 'SPONSORS' && (<div>
          <button onClick={function () { return setViewScope('GLOBAL'); }} className="mb-6 text-slate-400 font-bold uppercase text-xs tracking-widest hover:text-slate-900">← Back to Dashboard</button>
          {/* Default to central zone for global sponsors, or select specific org */}
          <SponsorManager_1.SponsorManager organization={organizations.find(function (o) { return o.id === 'org-central-zone'; }) || organizations[0]} onUpdateOrg={handleUpdateOrgDetails}/>
        </div>)}

      {viewScope === 'ISSUES' && (<div className="animate-in fade-in duration-500">
          <button onClick={function () { return setViewScope('GLOBAL'); }} className="mb-6 text-slate-400 font-bold uppercase text-xs tracking-widest hover:text-slate-900">← Back to Dashboard</button>
          <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100">
            <h3 className="text-3xl font-black text-slate-900 mb-8 italic">Protests & Issues</h3>
            <div className="space-y-4">
              {issues.length === 0 ? (<div className="p-10 text-center bg-slate-50 rounded-[2rem] border border-slate-100">
                  <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No Active Issues or Protests</p>
                </div>) : (issues
                .filter(function (issue) { return (centralZone === null || centralZone === void 0 ? void 0 : centralZone.memberTeams.some(function (t) { return t.id === issue.teamId; })) || true; })
                .map(function (issue) {
                var _a;
                return (<div key={issue.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-all">
                      <div className="flex items-center gap-6">
                        <div className={"w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black ".concat(issue.type === 'PROTEST' ? 'bg-red-100 text-red-500' : 'bg-orange-100 text-orange-500')}>
                          {issue.type === 'PROTEST' ? '!' : '⚠'}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-lg">{issue.title}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {(((_a = organizations.flatMap(function (o) { return o.memberTeams; }).find(function (t) { return t.id === issue.teamId; })) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown Team')} • {new Date(issue.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={"px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ".concat(issue.status === 'OPEN' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600')}>
                          {issue.status}
                        </span>
                        <button onClick={function () { setSelectedIssue(issue); setIsResolutionModalOpen(true); }} className="px-6 py-2 bg-white text-slate-900 border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md transition-all">
                          View Details
                        </button>
                      </div>
                    </div>);
            }))}
            </div>
          </div>
        </div>)}

      {viewScope === 'REPORTS' && (<div className="animate-in fade-in duration-500">
          <button onClick={function () { return setViewScope('GLOBAL'); }} className="mb-6 text-slate-400 font-bold uppercase text-xs tracking-widest hover:text-slate-900">← Back to Dashboard</button>
          <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100">
            <h3 className="text-3xl font-black text-slate-900 mb-8 italic">Match Report Submissions</h3>
            <div className="space-y-4">
              {globalFixtures.filter(function (f) { return f.reportSubmission; }).length === 0 && (<p className="text-slate-400 text-center py-20 font-black uppercase text-xs tracking-widest">No match reports submitted yet</p>)}
              {globalFixtures.filter(function (f) { return f.reportSubmission; }).map(function (fixture) {
                var _a, _b, _c, _d, _e, _f;
                return (<div key={fixture.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-500 text-xl font-black">
                      {((_a = fixture.reportSubmission) === null || _a === void 0 ? void 0 : _a.status) === 'PENDING' ? '?' : ((_b = fixture.reportSubmission) === null || _b === void 0 ? void 0 : _b.status) === 'VERIFIED' ? '✓' : '✕'}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-lg">{fixture.teamAName} vs {fixture.teamBName}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submitted on {new Date(fixture.reportSubmission.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={"px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ".concat(((_c = fixture.reportSubmission) === null || _c === void 0 ? void 0 : _c.status) === 'VERIFIED' ? 'bg-emerald-100 text-emerald-600' :
                        ((_d = fixture.reportSubmission) === null || _d === void 0 ? void 0 : _d.status) === 'REJECTED' ? 'bg-red-100 text-red-600' :
                            'bg-indigo-100 text-indigo-600')}>
                      {(_e = fixture.reportSubmission) === null || _e === void 0 ? void 0 : _e.status}
                    </span>
                    <button onClick={function () { return onViewMatch(fixture); }} className="px-6 py-2 bg-white text-slate-900 border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md transition-all">
                      {((_f = fixture.reportSubmission) === null || _f === void 0 ? void 0 : _f.status) === 'PENDING' ? 'Review & Verify' : 'View Details'}
                    </button>
                  </div>
                </div>);
            })}
            </div>
          </div>
        </div>)}

      {viewScope === 'GLOBAL' && (<GlobalDashboard_1.GlobalDashboard organizations={organizations} onSelectOrg={function (id) { setSelectedOrgId(id); setViewScope('ORG_LEVEL'); }} onRequestDeleteOrg={function (org) { setPendingOrg(org); setModals(__assign(__assign({}, modals), { deleteOrg: true })); }} onRequestCreateOrg={handleRequestCreateOrg} onRequestQuickMatch={onRequestSetup} onOpenMediaStudio={onOpenMediaStudio} fixtures={globalFixtures} topBatsmen={topBatsmen} topBowlers={topBowlers} onStartMatch={onStartMatch} onViewMatch={onViewMatch} onViewTeam={onViewTeam} currentUserId={currentUserId} onApplyForOrg={onApplyForOrg} onUpgradeProfile={onUpgradeProfile} following={following} onToggleFollow={onToggleFollow} onRequestCaptainHub={onOpenCaptainHub} onRequestMatchReports={onRequestMatchReports} showCaptainHub={showCaptainHub} profile={currentUserProfile} onUpdateProfile={onUpdateProfile} onRequestTransferMarket={onRequestTransferMarket} onViewOrg={onViewOrg} onCreateUser={onCreateUser} globalUsers={mockGlobalUsers} onRemoveFixture={function (fId) {
                var org = organizations.find(function (o) { return o.fixtures.some(function (f) { return f.id === fId; }); });
                if (org && onRemoveFixture) {
                    onRemoveFixture(org.id, fId);
                }
            }}/>)}

      {viewScope === 'ORG_LEVEL' && activeOrg && (<OrganizationView_1.OrganizationView organization={activeOrg} userRole={userRole} onBack={function () { return setViewScope('GLOBAL'); }} onViewTournament={function (id) { setSelectedTournamentId(id); setViewScope('TOURNAMENT_LEVEL'); }} onViewPlayer={function () { }} onRequestAddTeam={function () { return setModals(__assign(__assign({}, modals), { addTeam: true })); }} onRequestAddTournament={function () { return setModals(__assign(__assign({}, modals), { addTournament: true })); }} players={currentOrgPlayers} onViewTeam={onViewTeam} isFollowed={following.orgs.includes(activeOrg.id)} onToggleFollow={function () { return onToggleFollow('ORG', activeOrg.id); }} globalUsers={mockGlobalUsers || []} onAddMember={function (member) { return onAddMemberToOrg && onAddMemberToOrg(activeOrg.id, member); }} onUpdateOrg={handleUpdateOrgDetails} onRemoveTeam={onRemoveTeam} onProcessApplication={handleProcessApplication} allOrganizations={organizations} currentUserProfile={currentUserProfile} onRequestCaptainHub={onOpenCaptainHub} onSelectHubTeam={onSelectHubTeam} onUpdateFixture={onUpdateFixture} onRemoveFixture={onRemoveFixture} onApplyForOrg={onApplyForOrg} onRequestAffiliation={onRequestAffiliation} onRemoveTournament={onRemoveTournament} onUpdateTournament={onUpdateTournament} onCreateUser={onCreateUser}/>)}

      {viewScope === 'TOURNAMENT_LEVEL' && activeTrn && activeOrg && (<TournamentDashboard_1.TournamentDashboard tournament={activeTrn} organization={activeOrg} onBack={function () { return setViewScope('ORG_LEVEL'); }} onStartMatch={onStartMatch} onGenerateFixtures={handleGenerateFixtures} onAddGroup={handleTournamentAddGroup} onUpdateGroupTeams={handleTournamentUpdateTeams} onViewTeam={onViewTeam} onViewMatch={onViewMatch} onAddFixture={handleAddFixture} onUpdateFixture={function (fId, data) { return onUpdateFixture && onUpdateFixture(activeOrg.id, fId, data); }} onUpdateTournament={function (tId, data) { return onUpdateTournament && onUpdateTournament(activeOrg.id, tId, data); }} allOrganizations={organizations} isOrgAdmin={isOrgAdminOfActiveOrg} onSelectHubTeam={onSelectHubTeam}/>)}

      {modals.deleteOrg && pendingOrg && <DeleteOrgModal_1.DeleteOrgModal organization={pendingOrg} onConfirm={handleDeleteConfirm} onCancel={function () { return setModals(__assign(__assign({}, modals), { deleteOrg: false })); }}/>}

      {modals.addTeam && (<div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl">
            <h3 className="text-2xl font-black text-slate-900 mb-8">New Squad</h3>
            <input value={teamForm.name} onChange={function (e) { return setTeamForm(__assign(__assign({}, teamForm), { name: e.target.value })); }} placeholder="Squad Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none mb-4"/>
            <input value={teamForm.location} onChange={function (e) { return setTeamForm(__assign(__assign({}, teamForm), { location: e.target.value })); }} placeholder="Home Ground" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none mb-8"/>
            <div className="flex gap-4"><button onClick={function () { return setModals(__assign(__assign({}, modals), { addTeam: false })); }} className="flex-1 py-4 text-slate-400 font-black uppercase text-xs">Cancel</button><button onClick={handleAddTeam} className="flex-1 py-4 bg-indigo-600 text-white font-black uppercase text-xs rounded-xl shadow-xl">Confirm</button></div>
          </div>
        </div>)}
      {modals.addTournament && (<div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-black text-slate-900 mb-8">Tournament Management</h3>

            {/* Existing Tournaments */}
            {activeOrg && activeOrg.tournaments.length > 0 && (<div className="mb-8">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Existing Tournaments</h4>
                <div className="space-y-3">
                  {activeOrg.tournaments.map(function (t) { return (<div key={t.id} className="relative bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-indigo-300 transition-all group">
                      <button onClick={function () {
                        if (confirm("Delete \"".concat(t.name, "\"? This action cannot be undone."))) {
                            if (onRemoveTournament) {
                                onRemoveTournament(activeOrg.id, t.id);
                            }
                        }
                    }} className="absolute top-2 right-2 w-6 h-6 bg-red-100 hover:bg-red-500 text-red-500 hover:text-white rounded-full flex items-center justify-center font-black text-sm transition-all opacity-0 group-hover:opacity-100" title="Delete Tournament">
                        ×
                      </button>
                      <div className="pr-8">
                        <p className="font-black text-slate-900">{t.name}</p>
                        <p className="text-xs text-slate-400 uppercase tracking-widest">{t.format} • {t.status}</p>
                      </div>
                    </div>); })}
                </div>
                <div className="border-t border-slate-200 my-6"></div>
              </div>)}

            {/* Create New Tournament Form */}
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Create New Tournament</h4>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Tournament Name</label>
                <input value={trnForm.name} onChange={function (e) { return setTrnForm(__assign(__assign({}, trnForm), { name: e.target.value })); }} placeholder="e.g. Summer League 2026" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none"/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Format</label>
                  <select value={trnForm.format} onChange={function (e) { return setTrnForm(__assign(__assign({}, trnForm), { format: e.target.value })); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none">
                    <option value="T20">Twenty20</option><option value="T10">T10 Series</option><option value="50-over">One Day Series</option><option value="Test">Multi-day Series</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Default Start Time</label>
                  <input type="time" value={trnForm.gameStartTime} onChange={function (e) { return setTrnForm(__assign(__assign({}, trnForm), { gameStartTime: e.target.value })); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none"/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Start Date</label>
                  <input type="date" value={trnForm.startDate} onChange={function (e) { return setTrnForm(__assign(__assign({}, trnForm), { startDate: e.target.value })); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none"/>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">End Date</label>
                  <input type="date" value={trnForm.endDate} onChange={function (e) { return setTrnForm(__assign(__assign({}, trnForm), { endDate: e.target.value })); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none"/>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Description / About</label>
                <textarea value={trnForm.description} onChange={function (e) { return setTrnForm(__assign(__assign({}, trnForm), { description: e.target.value })); }} placeholder="Details about this tournament..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none min-h-[80px] resize-none"/>
              </div>
            </div>

            <div className="flex gap-4 mt-8"><button onClick={function () { return setModals(__assign(__assign({}, modals), { addTournament: false })); }} className="flex-1 py-4 text-slate-400 font-black uppercase text-xs">Cancel</button><button onClick={handleCreateTournament} className="flex-1 py-4 bg-slate-900 text-white font-black uppercase text-xs rounded-xl shadow-xl">Deploy</button></div>
          </div>
        </div>)}
      {/* Embed Code Modal */}
      <EmbedCodeModal_1.EmbedCodeModal isOpen={showEmbedModal} onClose={function () { return setShowEmbedModal(false); }} activeOrg={activeOrg} activeTournament={activeTrn}/>

      {/* Floating Embed Button */}
      <button onClick={function () { return setShowEmbedModal(true); }} className="fixed bottom-6 right-6 bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-600 transition-colors z-40 flex items-center gap-2 group" title="Generate Embed Codes">
        <span className="text-xl">🔗</span>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-black uppercase tracking-widest">
          Embed & Share
        </span>
      </button>
    </div>);
};
exports.AdminCenter = AdminCenter;
