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
exports.OrganizationView = void 0;
var react_1 = require("react");
var PlayerProfileModal_1 = require("../modals/PlayerProfileModal");
var EditOrgModal_1 = require("../modals/EditOrgModal");
var BulkActionModal_1 = require("../modals/BulkActionModal");
var AddPlayerModal_1 = require("../modals/AddPlayerModal");
var UserProfileModal_1 = require("../modals/UserProfileModal");
var AddMemberModal_1 = require("../modals/AddMemberModal");
var GlobalTeamSearchModal_1 = require("../modals/GlobalTeamSearchModal");
var EditTeamModal_1 = require("../modals/EditTeamModal");
var EditTournamentModal_1 = require("../modals/EditTournamentModal");
var CreateUserModal_1 = require("../modals/CreateUserModal"); // NEW
var AccessControlPanel_1 = require("./org/AccessControlPanel");
var OrgSquadsTab_1 = require("./org/OrgSquadsTab");
var OrgTournamentsTab_1 = require("./org/OrgTournamentsTab");
var OrgFixturesTab_1 = require("./org/OrgFixturesTab");
var OrganizationView = function (_a) {
    var organization = _a.organization, userRole = _a.userRole, onBack = _a.onBack, onViewTournament = _a.onViewTournament, onViewPlayer = _a.onViewPlayer, onRequestAddTeam = _a.onRequestAddTeam, onRequestAddTournament = _a.onRequestAddTournament, players = _a.players, onViewTeam = _a.onViewTeam, isFollowed = _a.isFollowed, onToggleFollow = _a.onToggleFollow, globalUsers = _a.globalUsers, onAddMember = _a.onAddMember, onUpdateOrg = _a.onUpdateOrg, onRemoveTeam = _a.onRemoveTeam, onRemoveTournament = _a.onRemoveTournament, onUpdateTournament = _a.onUpdateTournament, onRemoveFixture = _a.onRemoveFixture, onProcessApplication = _a.onProcessApplication, _b = _a.allOrganizations, allOrganizations = _b === void 0 ? [] : _b, currentUserProfile = _a.currentUserProfile, _c = _a.embedMode, embedMode = _c === void 0 ? false : _c, onRequestCaptainHub = _a.onRequestCaptainHub, onSelectHubTeam = _a.onSelectHubTeam, onUpdateFixture = _a.onUpdateFixture, onApplyForOrg = _a.onApplyForOrg, onRequestAffiliation = _a.onRequestAffiliation, onCreateUser = _a.onCreateUser // NEW
    ;
    var isClub = organization.type === 'CLUB';
    var _d = (0, react_1.useState)('SQUADS'), activeTab = _d[0], setActiveTab = _d[1];
    var _e = (0, react_1.useState)(''), playerSearch = _e[0], setPlayerSearch = _e[1];
    var _f = (0, react_1.useState)(null), selectedPlayer = _f[0], setSelectedPlayer = _f[1];
    // Member Management State
    var _g = (0, react_1.useState)(false), isAddMemberModalOpen = _g[0], setIsAddMemberModalOpen = _g[1];
    var _h = (0, react_1.useState)(false), isCreateUserModalOpen = _h[0], setIsCreateUserModalOpen = _h[1]; // NEW
    var _j = (0, react_1.useState)(null), viewingMember = _j[0], setViewingMember = _j[1];
    var _k = (0, react_1.useState)(false), isEditModalOpen = _k[0], setIsEditModalOpen = _k[1];
    // Bulk Actions & Team Management
    var _l = (0, react_1.useState)(null), bulkAction = _l[0], setBulkAction = _l[1];
    var _m = (0, react_1.useState)(null), viewingActionsFor = _m[0], setViewingActionsFor = _m[1];
    var _o = (0, react_1.useState)(null), targetTeam = _o[0], setTargetTeam = _o[1];
    var _p = (0, react_1.useState)(false), isAddPlayerModalOpen = _p[0], setIsAddPlayerModalOpen = _p[1];
    // Global Team Search State
    var _q = (0, react_1.useState)(false), isTeamSearchOpen = _q[0], setIsTeamSearchOpen = _q[1];
    var _r = (0, react_1.useState)(null), editingTeam = _r[0], setEditingTeam = _r[1];
    var _s = (0, react_1.useState)(null), editingTournament = _s[0], setEditingTournament = _s[1];
    // Direct Add Player by ID
    var _t = (0, react_1.useState)(''), addPlayerId = _t[0], setAddPlayerId = _t[1];
    // Application Approval State
    var _u = (0, react_1.useState)(null), appToApprove = _u[0], setAppToApprove = _u[1];
    // Affiliation State
    var _v = (0, react_1.useState)(''), affiliationSearch = _v[0], setAffiliationSearch = _v[1];
    var pendingApps = (0, react_1.useMemo)(function () { var _a; return ((_a = organization.applications) === null || _a === void 0 ? void 0 : _a.filter(function (a) { return a.status === 'PENDING' || a.status === 'REVIEW'; })) || []; }, [organization.applications]);
    var currentUserMember = (0, react_1.useMemo)(function () { return organization.members.find(function (m) { return m.userId === (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.id); }); }, [organization.members, currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.id]);
    // PERMISSION LOGIC UPDATE: Check Parent Orgs
    var isParentOrgAdmin = (0, react_1.useMemo)(function () {
        if (!(currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.id))
            return false;
        // Find if current user is admin in ANY parent organization
        return allOrganizations
            .filter(function (o) { var _a; return (_a = organization.parentOrgIds) === null || _a === void 0 ? void 0 : _a.includes(o.id); })
            .some(function (parent) { return parent.members.some(function (m) { return m.userId === currentUserProfile.id && m.role === 'Administrator'; }); });
    }, [allOrganizations, organization.parentOrgIds, currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.id]);
    var isOrgAdmin = ((currentUserMember === null || currentUserMember === void 0 ? void 0 : currentUserMember.role) === 'Administrator' && !currentUserMember.managedTeamId) || userRole === 'Administrator' || isParentOrgAdmin;
    var isTeamAdmin = (currentUserMember === null || currentUserMember === void 0 ? void 0 : currentUserMember.role) === 'Administrator' && !!currentUserMember.managedTeamId;
    var isCouncilAdmin = (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.handle) === '@cz_admin';
    var isMainAdmin = organization.createdBy === (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.id) || userRole === 'Administrator' || isParentOrgAdmin;
    var isUmpireAssociation = organization.type === 'UMPIRE_ASSOCIATION';
    var canEditTeam = function (teamId) {
        if (isCouncilAdmin || isOrgAdmin || isMainAdmin)
            return true;
        if (!organization.allowMemberEditing)
            return false;
        return (currentUserMember === null || currentUserMember === void 0 ? void 0 : currentUserMember.managedTeamId) === teamId;
    };
    // Resolve Affiliated Teams
    var affiliatedTeams = (0, react_1.useMemo)(function () {
        if (!organization.childOrgIds || organization.childOrgIds.length === 0)
            return [];
        var childOrgs = allOrganizations.filter(function (o) { var _a; return (_a = organization.childOrgIds) === null || _a === void 0 ? void 0 : _a.includes(o.id); });
        return childOrgs.flatMap(function (o) { return o.memberTeams.map(function (t) { return (__assign(__assign({}, t), { orgName: o.name })); }); });
    }, [organization.childOrgIds, allOrganizations]);
    // Derived Global Teams (for search)
    // Flatten all teams from all organizations to create a "Global Database" simulation
    // Ideally this would be fetched from a 'teams' table directly, but this works for client-side demo
    var globalTeams = (0, react_1.useMemo)(function () {
        return allOrganizations.flatMap(function (o) { return o.memberTeams; });
    }, [allOrganizations]);
    // Officials Logic
    var officials = (0, react_1.useMemo)(function () { return organization.members.filter(function (m) { return m.role === 'Umpire' || m.role === 'Match Official'; }); }, [organization.members]);
    var getOfficialStats = function (userId) {
        return organization.fixtures.filter(function (f) { var _a; return (_a = f.umpires) === null || _a === void 0 ? void 0 : _a.includes(userId); }).length;
    };
    var handlePlayerClick = function (p) {
        setSelectedPlayer(p);
        onViewPlayer(p);
    };
    var handleLinkTeam = function (team) {
        if (!onUpdateOrg)
            return;
        // Check if already in this org
        if (organization.memberTeams.some(function (t) { return t.id === team.id; })) {
            alert("This team is already in your organization.");
            return;
        }
        // Add to memberTeams
        var updatedTeams = __spreadArray(__spreadArray([], organization.memberTeams, true), [team], false);
        onUpdateOrg(organization.id, { memberTeams: updatedTeams });
        setIsTeamSearchOpen(false);
        alert("".concat(team.name, " linked to ").concat(organization.name, " successfully!"));
    };
    var handleManualAddMember = function (user, role, targetTeamId) {
        var _a;
        // 1. Add to Org Members
        var newMember = {
            userId: user.id,
            name: user.name,
            handle: user.handle,
            role: role,
            addedAt: Date.now()
        };
        // We need to use onUpdateOrg to persist this properly if we want to do both member + team update
        if (onUpdateOrg) {
            var updatedMembers = __spreadArray(__spreadArray([], organization.members, true), [newMember], false);
            var updatedTeams = organization.memberTeams;
            // 2. If Player and Team Selected, add to Squad
            if (role === 'Player' && targetTeamId) {
                var newPlayer_1 = {
                    id: user.id,
                    name: user.name,
                    role: ((_a = user.playerDetails) === null || _a === void 0 ? void 0 : _a.primaryRole) || 'All-rounder',
                    photoUrl: user.avatarUrl,
                    stats: { runs: 0, wickets: 0, ballsFaced: 0, ballsBowled: 0, runsConceded: 0, matches: 0, catches: 0, runOuts: 0, stumpings: 0, fours: 0, sixes: 0, hundreds: 0, fifties: 0, ducks: 0, threeWickets: 0, fiveWickets: 0, maidens: 0 }
                };
                updatedTeams = updatedTeams.map(function (t) { return t.id === targetTeamId ? __assign(__assign({}, t), { players: __spreadArray(__spreadArray([], t.players, true), [newPlayer_1], false) }) : t; });
            }
            onUpdateOrg(organization.id, { members: updatedMembers, memberTeams: updatedTeams });
        }
        else {
            onAddMember(newMember);
        }
    };
    var finalizeApplication = function (role) {
        if (appToApprove && onProcessApplication) {
            onProcessApplication(organization.id, appToApprove.id, 'APPROVED', role);
            setAppToApprove(null);
        }
    };
    var handleAddSinglePlayer = function (name, role) {
        if (!onUpdateOrg || !targetTeam)
            return;
        var newPlayer = {
            id: "pl-".concat(Date.now()),
            name: name,
            role: role,
            stats: { runs: 0, wickets: 0, ballsFaced: 0, ballsBowled: 0, runsConceded: 0, matches: 0, catches: 0, runOuts: 0, stumpings: 0, fours: 0, sixes: 0, hundreds: 0, fifties: 0, ducks: 0, threeWickets: 0, fiveWickets: 0, maidens: 0 }
        };
        var updatedTeams = organization.memberTeams.map(function (t) {
            return t.id === targetTeam.id ? __assign(__assign({}, t), { players: __spreadArray(__spreadArray([], t.players, true), [newPlayer], false) }) : t;
        });
        onUpdateOrg(organization.id, { memberTeams: updatedTeams });
        setTargetTeam(null);
    };
    var handleAddPlayerByID = function () {
        var _a;
        if (!onUpdateOrg || !addPlayerId)
            return;
        var user = globalUsers.find(function (u) { return u.id === addPlayerId; });
        if (user) {
            if (organization.memberTeams.length === 0) {
                alert("Please create a team/squad first.");
                return;
            }
            var targetTeamId_1 = organization.memberTeams[0].id;
            var newPlayer_2 = {
                id: user.id,
                name: user.name,
                role: ((_a = user.playerDetails) === null || _a === void 0 ? void 0 : _a.primaryRole) || 'All-rounder',
                photoUrl: user.avatarUrl,
                stats: { runs: 0, wickets: 0, ballsFaced: 0, ballsBowled: 0, runsConceded: 0, matches: 0, catches: 0, runOuts: 0, stumpings: 0, fours: 0, sixes: 0, hundreds: 0, fifties: 0, ducks: 0, threeWickets: 0, fiveWickets: 0, maidens: 0 }
            };
            var updatedTeams = organization.memberTeams.map(function (t) {
                return t.id === targetTeamId_1 ? __assign(__assign({}, t), { players: __spreadArray(__spreadArray([], t.players, true), [newPlayer_2], false) }) : t;
            });
            onUpdateOrg(organization.id, { memberTeams: updatedTeams });
            setAddPlayerId('');
            alert("".concat(user.name, " added to ").concat(organization.memberTeams[0].name, "."));
        }
        else {
            alert("User ID not found in global directory.");
        }
    };
    var handleBulkData = function (data) {
        if (!onUpdateOrg)
            return;
        if (bulkAction === 'TEAMS') {
            var newTeams = data.map(function (name) { return ({
                id: "tm-".concat(Date.now(), "-").concat(Math.floor(Math.random() * 1000)),
                name: name.trim(),
                players: []
            }); });
            var updatedMemberTeams = __spreadArray(__spreadArray([], organization.memberTeams, true), newTeams, true);
            onUpdateOrg(organization.id, { memberTeams: updatedMemberTeams });
        }
        else if (bulkAction === 'PLAYERS') {
            var targetId_1 = targetTeam === null || targetTeam === void 0 ? void 0 : targetTeam.id;
            if (!targetId_1) {
                if (organization.memberTeams.length === 0) {
                    var newTeam = { id: "tm-gen-".concat(Date.now()), name: 'General Squad', players: [] };
                    organization.memberTeams.push(newTeam);
                    targetId_1 = newTeam.id;
                }
                else {
                    targetId_1 = organization.memberTeams[0].id;
                }
            }
            var newPlayers_1 = data.map(function (line, idx) {
                var _a = line.split('-').map(function (s) { return s.trim(); }), name = _a[0], roleRaw = _a[1];
                var role = ['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper'].includes(roleRaw) ? roleRaw : 'All-rounder';
                return {
                    id: "pl-bulk-".concat(Date.now(), "-").concat(idx),
                    name: name,
                    role: role,
                    stats: { runs: 0, wickets: 0, ballsFaced: 0, ballsBowled: 0, runsConceded: 0, matches: 0, catches: 0, runOuts: 0, stumpings: 0, fours: 0, sixes: 0, hundreds: 0, fifties: 0, ducks: 0, threeWickets: 0, fiveWickets: 0, maidens: 0 }
                };
            });
            var updatedTeams = organization.memberTeams.map(function (t) {
                return t.id === targetId_1 ? __assign(__assign({}, t), { players: __spreadArray(__spreadArray([], t.players, true), newPlayers_1, true) }) : t;
            });
            onUpdateOrg(organization.id, { memberTeams: updatedTeams });
        }
        setBulkAction(null);
        setTargetTeam(null);
    };
    // Default tabs for everyone (Squads usually restricted to view own, Tournaments read-only)
    var availableTabs = ['SQUADS', 'MATCHES', 'TOURNAMENTS'];
    // Org Admins get full access
    if (isOrgAdmin || isMainAdmin || isCouncilAdmin) {
        availableTabs = ['SQUADS', 'PLAYERS', 'TOURNAMENTS', 'MEMBERS', 'OFFICIALS', 'REQUESTS'];
        if (isMainAdmin || isCouncilAdmin) {
            availableTabs.push('AFFILIATIONS');
            availableTabs.push('ACCESS');
        }
    }
    else {
        // Team Admins / Players: Strictly SQUADS and TOURNAMENTS only
        // Ensure PLAYERS tab is NOT included here
    }
    if (isUmpireAssociation && (isOrgAdmin || isMainAdmin || isCouncilAdmin)) {
        availableTabs.push('ASSIGNMENTS');
    }
    var parentOrgs = allOrganizations.filter(function (o) { var _a; return (_a = organization.parentOrgIds) === null || _a === void 0 ? void 0 : _a.includes(o.id); });
    var incomingAffiliations = pendingApps.filter(function (a) { return a.type === 'ORG_AFFILIATE'; });
    var userRequests = pendingApps.filter(function (a) { return a.type === 'USER_JOIN' || a.type === 'PLAYER_CLAIM'; });
    // Helper to find player name for claims
    var getTargetPlayerName = function (playerId) {
        if (!playerId)
            return 'Unknown Profile';
        var p = organization.memberTeams.flatMap(function (t) { return t.players; }).find(function (p) { return p.id === playerId; });
        return (p === null || p === void 0 ? void 0 : p.name) || 'Unknown Profile';
    };
    var isLockdown = organization.allowMemberEditing === false &&
        !allOrganizations.filter(function (o) { var _a; return (_a = organization.parentOrgIds) === null || _a === void 0 ? void 0 : _a.includes(o.id); })
            .some(function (parent) { return parent.members.some(function (m) { return m.userId === (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.id) && m.role === 'Administrator'; }); });
    var isCaptain = (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.role) === 'Captain' || organization.members.some(function (m) { return m.userId === (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.id) && m.role === 'Captain'; });
    var isCoach = (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.role) === 'Coach' || organization.members.some(function (m) { return m.userId === (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.id) && m.role === 'Coach'; });
    var isPlayer = (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.role) === 'Player';
    var myTeamId = react_1.default.useMemo(function () {
        // ... (rest of logic)
        // If the user has a managedTeamId, prioritize that.
        if (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.managedTeamId)
            return currentUserProfile.managedTeamId;
        // Fallback: Check if they are a captain/player in the roster manually (less reliable if duplicates exist)
        var memberRef = organization.memberTeams.find(function (t) { return t.players.some(function (p) { return p.email === (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.email); }); }); // Using email/id match
        return memberRef === null || memberRef === void 0 ? void 0 : memberRef.id;
    }, [currentUserProfile, organization.memberTeams]);
    var myTeam = react_1.default.useMemo(function () { return organization.memberTeams.find(function (t) { return t.id === myTeamId; }); }, [organization.memberTeams, myTeamId]);
    var needsTeamAssignment = (isTeamAdmin || isCaptain || isCoach) && !isOrgAdmin && !myTeamId;
    var _w = (0, react_1.useState)(false), focusMyTeam = _w[0], setFocusMyTeam = _w[1];
    // Auto-view my team if I am a team admin and not browsing
    react_1.default.useEffect(function () {
        if (myTeamId && (isTeamAdmin || isCaptain || isCoach) && !isOrgAdmin && activeTab === 'SQUADS') {
            // We don't setViewingTeam here to avoid loops, but we conditionally render below
        }
        // For Admins with teams, if they click the button, we focus
    }, [myTeamId, isTeamAdmin, isCaptain, isCoach, isOrgAdmin, activeTab]);
    return (<div className="animate-in slide-in-from-right-8 duration-500 max-w-[100vw] overflow-x-hidden">
            {isLockdown && (<div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 mb-4 rounded-r shadow-sm flex items-center gap-3">
                    <span className="text-xl">🔒</span>
                    <div>
                        <p className="font-bold text-sm">Organization Locked</p>
                        <p className="text-xs">Your governing body has restricted editing for this organization. You cannot add or remove players/teams at this time.</p>
                    </div>
                </div>)}

            {/* CAPTAIN'S HUB WELCOME / TEAM LINKING */}
            {needsTeamAssignment && activeTab === 'SQUADS' && (<div className="bg-indigo-900 rounded-[2.5rem] p-12 text-center text-white mb-8 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-5xl mb-4">👋</div>
                        <h2 className="text-3xl font-black mb-2">Welcome, Captain!</h2>
                        <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-8">Please link your account to your squad to verify your roster.</p>
                        <button onClick={function () { return setIsTeamSearchOpen(true); }} className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl hover:scale-105">
                            🔗 Select My Team
                        </button>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -ml-16 -mb-16"></div>
                </div>)}

            <UserProfileModal_1.UserProfileModal member={viewingMember} isOpen={!!viewingMember} onClose={function () { return setViewingMember(null); }} allOrganizations={allOrganizations}/>

            {/* ... Modals ... */}
            <AddMemberModal_1.AddMemberModal isOpen={isAddMemberModalOpen} onClose={function () { return setIsAddMemberModalOpen(false); }} globalUsers={globalUsers} orgTeams={organization.memberTeams} existingMemberIds={organization.members.map(function (m) { return m.userId; })} onAdd={handleManualAddMember}/>

            {/* Global Team Search Modal */}
            <GlobalTeamSearchModal_1.GlobalTeamSearchModal isOpen={isTeamSearchOpen} onClose={function () { return setIsTeamSearchOpen(false); }} allTeams={globalTeams} onSelectTeam={function (team) {
            // Logic to link team to current user if self-assigning
            if (needsTeamAssignment && onUpdateOrg) {
                handleLinkTeam(team);
                var updatedMembers = organization.members.map(function (m) {
                    return m.userId === (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.id) ? __assign(__assign({}, m), { role: 'Captain', managedTeamId: team.id }) : m;
                });
                onUpdateOrg(organization.id, { members: updatedMembers });
            }
            else {
                handleLinkTeam(team);
            }
        }} currentOrgName={organization.name}/>

            {editingTeam && onUpdateOrg && (<EditTeamModal_1.EditTeamModal team={editingTeam} onClose={function () { return setEditingTeam(null); }} onSave={function (updates) {
                var updatedTeams = organization.memberTeams.map(function (t) {
                    return t.id === editingTeam.id ? __assign(__assign({}, t), updates) : t;
                });
                onUpdateOrg(organization.id, { memberTeams: updatedTeams });
            }} onDelete={function () {
                if (onRemoveTeam) {
                    onRemoveTeam(organization.id, editingTeam.id);
                }
                else {
                    var updatedTeams = organization.memberTeams.filter(function (t) { return t.id !== editingTeam.id; });
                    onUpdateOrg(organization.id, { memberTeams: updatedTeams });
                }
            }}/>)}

            <PlayerProfileModal_1.PlayerProfileModal isOpen={!!selectedPlayer} player={selectedPlayer} onClose={function () { return setSelectedPlayer(null); }} isFollowed={false} onToggleFollow={function () { }} allFixtures={organization.fixtures} onUpdatePlayer={selectedPlayer && (isCouncilAdmin || canEditTeam(selectedPlayer.teamId)) && onUpdateOrg ? function (updatedPlayer) {
            var teams = organization.memberTeams.map(function (t) {
                if (t.id === (selectedPlayer === null || selectedPlayer === void 0 ? void 0 : selectedPlayer.teamId)) {
                    return __assign(__assign({}, t), { players: t.players.map(function (p) { return p.id === selectedPlayer.id ? __assign(__assign({}, p), updatedPlayer) : p; }) });
                }
                return t;
            });
            onUpdateOrg(organization.id, { memberTeams: teams });
            setSelectedPlayer(function (prev) { return prev ? __assign(__assign({}, prev), updatedPlayer) : null; });
        } : undefined} onDeletePlayer={selectedPlayer && (isCouncilAdmin || canEditTeam(selectedPlayer.teamId)) && onUpdateOrg ? function (playerId) {
            var teams = organization.memberTeams.map(function (t) {
                if (t.id === (selectedPlayer === null || selectedPlayer === void 0 ? void 0 : selectedPlayer.teamId)) {
                    return __assign(__assign({}, t), { players: t.players.filter(function (p) { return p.id !== playerId; }) });
                }
                return t;
            });
            onUpdateOrg(organization.id, { memberTeams: teams });
            setSelectedPlayer(null);
        } : undefined}/>

            {isEditModalOpen && onUpdateOrg && (<EditOrgModal_1.EditOrgModal organization={organization} onClose={function () { return setIsEditModalOpen(false); }} onSave={onUpdateOrg} currentUserProfile={currentUserProfile}/>)}

            {editingTournament && onUpdateTournament && onRemoveTournament && (<EditTournamentModal_1.EditTournamentModal tournament={editingTournament} onClose={function () { return setEditingTournament(null); }} onSave={function (data) {
                onUpdateTournament(organization.id, editingTournament.id, data);
                setEditingTournament(null);
            }} onDelete={function () {
                onRemoveTournament(organization.id, editingTournament.id);
                setEditingTournament(null);
            }}/>)}

            {bulkAction && (<BulkActionModal_1.BulkActionModal isOpen={true} mode={bulkAction} onClose={function () { setBulkAction(null); setTargetTeam(null); }} onConfirm={handleBulkData} currentUserPassword={currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.password}/>)}

            <AddPlayerModal_1.AddPlayerModal isOpen={isAddPlayerModalOpen} teamName={(targetTeam === null || targetTeam === void 0 ? void 0 : targetTeam.name) || ''} onClose={function () { setIsAddPlayerModalOpen(false); setTargetTeam(null); }} onSave={handleAddSinglePlayer}/>

            {!embedMode && (<>
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-8 gap-4">
                        <div className="flex items-center gap-3 md:gap-5 w-full">
                            <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-black transition-all shadow-sm flex-none">←</button>
                            <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-white p-1 rounded-xl shadow-md border border-slate-100 flex-none">
                                    {organization.logoUrl ? (<img src={organization.logoUrl} className="w-full h-full object-cover rounded-lg"/>) : (<div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center font-black text-slate-300 text-xl">{organization.name.charAt(0)}</div>)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight truncate">{organization.name}</h1>
                                        {isClub && <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[7px] md:text-[8px] font-black uppercase tracking-widest align-middle whitespace-nowrap">Club</span>}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                            📊 {organization.memberTeams.length + affiliatedTeams.length} Squads
                                        </p>
                                        {organization.establishedYear && (<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                🗓️ Est. {organization.establishedYear}
                                            </p>)}
                                        {(organization.address || organization.groundLocation) && (<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 truncate">
                                                📍 {organization.address || organization.groundLocation}
                                            </p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto justify-start md:justify-end flex-wrap">
                            {(myTeam || (isTeamAdmin || isOrgAdmin) && onRequestCaptainHub) && (<button onClick={function () {
                    if (isOrgAdmin && myTeam) {
                        setFocusMyTeam(!focusMyTeam);
                        setActiveTab('SQUADS');
                    }
                    else if (onRequestCaptainHub) {
                        onRequestCaptainHub();
                    }
                }} className={"px-4 py-2.5 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest transition-all shadow-md ".concat(focusMyTeam ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-indigo-600 text-white hover:bg-indigo-500')}>
                                    {focusMyTeam ? 'Org View 🏢' : 'Team Hub ⚡'}
                                </button>)}
                            {isOrgAdmin && onUpdateOrg && !isTeamAdmin && (<button onClick={function () { return setIsEditModalOpen(true); }} className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center text-lg transition-all" title="Settings">
                                    ⚙️
                                </button>)}
                            <button onClick={onToggleFollow} className={"px-4 py-2.5 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest transition-all whitespace-nowrap ".concat(isFollowed ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800')}>
                                {isFollowed ? "Following" : "Follow"}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-1 rounded-xl flex w-full gap-1 mb-6 md:mb-8 border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
                        {availableTabs.map(function (tab) {
                var count = tab === 'REQUESTS' ? userRequests.length : tab === 'AFFILIATIONS' ? incomingAffiliations.length : 0;
                return (<button key={tab} onClick={function () { return setActiveTab(tab); }} className={"flex-none px-4 md:px-6 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-1.5 ".concat(activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900')}>
                                    {tab === 'TOURNAMENTS' && isClub ? 'LEAGUES' : tab}
                                    {count > 0 && (<span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[8px]">{count}</span>)}
                                </button>);
            })}
                    </div>
                </>)}

            <OrgTournamentsTab_1.OrgTournamentsTab organization={organization} isClub={isClub} isOrgAdmin={isOrgAdmin} isActive={activeTab === 'TOURNAMENTS'} onRequestAddTournament={onRequestAddTournament} onViewTournament={onViewTournament} onUpdateTournament={onUpdateTournament} onRemoveTournament={onRemoveTournament} setEditingTournament={setEditingTournament}/>

            <OrgFixturesTab_1.OrgFixturesTab organization={organization} isActive={activeTab === 'MATCHES'} onUpdateFixture={onUpdateFixture}/>

            <OrgSquadsTab_1.OrgSquadsTab organization={organization} isMainAdmin={isMainAdmin} isCouncilAdmin={isCouncilAdmin} isOrgAdmin={isOrgAdmin} isLockdown={isLockdown} isActive={activeTab === 'SQUADS'} focusMyTeam={focusMyTeam} myTeam={myTeam} isClub={isClub} affiliatedTeams={affiliatedTeams} onLinkTeam={function () { return setIsTeamSearchOpen(true); }} onBulkAddTeams={function () { return setBulkAction('TEAMS'); }} onRequestAddTeam={onRequestAddTeam} onViewTeam={onViewTeam} onRemoveTeam={onRemoveTeam} onUpdateOrg={onUpdateOrg} onSelectHubTeam={onSelectHubTeam} onAddPlayer={function (team) { setTargetTeam(team); setIsAddPlayerModalOpen(true); }} onBulkImportPlayers={function (team) { setTargetTeam(team); setBulkAction('PLAYERS'); }} onEditTeam={setEditingTeam} canEditTeam={canEditTeam}/>


            {activeTab === 'PLAYERS' && (<div className="space-y-6">
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col gap-4">
                            <div className="flex gap-2">
                                <input value={playerSearch} onChange={function (e) { return setPlayerSearch(e.target.value); }} placeholder={"Search ".concat(isClub ? 'club' : 'organizational', " roster...")} className="flex-1 bg-slate-50 border-none outline-none p-4 rounded-xl font-bold text-sm"/>
                                {isOrgAdmin && (<button onClick={function () { return setBulkAction('PLAYERS'); }} className="bg-slate-900 text-white px-6 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-700 shadow-lg">Bulk Import</button>)}
                            </div>
                            {isOrgAdmin && (<div className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-100">
                                    <input value={addPlayerId} onChange={function (e) { return setAddPlayerId(e.target.value); }} placeholder="Add Player by User ID..." className="flex-1 bg-white border-none outline-none px-4 py-3 rounded-lg font-mono text-xs"/>
                                    <button onClick={handleAddPlayerByID} className="bg-indigo-600 text-white px-4 py-3 rounded-lg font-black uppercase text-xs tracking-widest hover:bg-indigo-500">Add</button>
                                </div>)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {players.filter(function (p) { return p.name.toLowerCase().includes(playerSearch.toLowerCase()); }).map(function (p) { return (<div key={p.id} onClick={function () { return handlePlayerClick(p); }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-400 transition-all flex items-center gap-4 group hover:shadow-lg">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-lg overflow-hidden border border-slate-200 group-hover:border-indigo-300"><img src={p.photoUrl || "https://ui-avatars.com/api/?name=".concat(p.name, "&background=random")} alt={p.name} className="w-full h-full object-cover"/></div>
                                    <div><div className="font-black text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{p.name}</div><div className="text-[10px] font-bold text-slate-400 uppercase">{p.teamName}</div><div className="text-[9px] font-bold text-indigo-400 uppercase mt-0.5">{p.role}</div></div>
                                </div>); })}
                        </div>
                    </div>)}

            {/* MEMBERS TAB */}
            {activeTab === 'MEMBERS' && (<div className="space-y-8 animate-in fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Registered Members</h3>
                            {isOrgAdmin && (<div className="flex gap-2">
                                    {onCreateUser && (<button onClick={function () { return setIsCreateUserModalOpen(true); }} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-indigo-500 shadow-lg transition-all">
                                            + Create User
                                        </button>)}
                                    <button onClick={function () { return setIsAddMemberModalOpen(true); }} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-700 shadow-lg transition-all">
                                        Add Existing
                                    </button>
                                </div>)}
                        </div>

                        {/* Create User Modal */}
                        {isCreateUserModalOpen && onCreateUser && (<CreateUserModal_1.CreateUserModal isOpen={true} onClose={function () { return setIsCreateUserModalOpen(false); }} onCreate={function (user, password) { return __awaiter(void 0, void 0, void 0, function () {
                    var result, createdUser, err_1;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                console.log("Creating user...", user);
                                return [4 /*yield*/, onCreateUser(user, password)];
                            case 1:
                                result = _b.sent();
                                if (!result.success) {
                                    alert("Failed to create user: ".concat(((_a = result.error) === null || _a === void 0 ? void 0 : _a.message) || 'Unknown error'));
                                    return [2 /*return*/];
                                }
                                createdUser = __assign(__assign({}, user), { id: result.userId });
                                handleManualAddMember(createdUser, user.role);
                                setIsCreateUserModalOpen(false);
                                alert("User ".concat(user.handle, " created successfully!\n\nPassword: ").concat(password, "\n\nThey can now sign in with their handle and password."));
                                return [3 /*break*/, 3];
                            case 2:
                                err_1 = _b.sent();
                                console.error("User creation failed:", err_1);
                                alert("Failed to create user: ".concat(err_1.message || 'Unknown error'));
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }} organizationName={organization.name}/>)}

                        {/* Group members by role for clearer display */}
                        {['Administrator', 'Captain', 'Scorer', 'Umpire', 'Coach', 'Player'].map(function (role) {
                var roleMembers = organization.members.filter(function (m) { return m.role === role; });
                if (roleMembers.length === 0)
                    return null;
                return (<div key={role} className="space-y-4">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">{role}s</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {roleMembers.map(function (member) { return (<div key={member.userId} onClick={function () { return setViewingMember(member); }} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-indigo-300 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className={"w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg text-white shadow-md ".concat(role === 'Administrator' ? 'bg-purple-600' :
                            role === 'Scorer' ? 'bg-teal-500' :
                                role === 'Umpire' ? 'bg-amber-500' :
                                    role === 'Captain' ? 'bg-indigo-600' :
                                        'bg-slate-800')}>
                                                        {member.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{member.name}</h4>
                                                        <p className="text-xs font-bold text-slate-400">{member.handle}</p>
                                                    </div>
                                                </div>
                                                <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">
                                                    View
                                                </div>
                                            </div>); })}
                                    </div>
                                </div>);
            })}

                        {organization.members.length === 0 && (<div className="p-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold uppercase text-xs">
                                No members found. Add some to get started.
                            </div>)}
                    </div>)}

            {/* REQUESTS TAB */}
            {activeTab === 'REQUESTS' && (<div className="space-y-6 animate-in fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Pending Applications</h3>
                        </div>
                        {userRequests.length === 0 ? (<div className="p-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold uppercase text-xs">
                                No pending membership requests.
                            </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userRequests.map(function (app) { return (<div key={app.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center font-black text-slate-400">
                                                {app.applicantImage ? <img src={app.applicantImage} className="w-full h-full object-cover"/> : app.applicantName.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900">{app.applicantName}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{app.applicantHandle || '@user'}</p>
                                                {app.type === 'PLAYER_CLAIM' && (<div className="mt-2 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                                                        <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-0.5">Claiming Profile</p>
                                                        <p className="text-xs font-black text-indigo-700">{getTargetPlayerName(app.targetPlayerId)}</p>
                                                    </div>)}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={function () { return setAppToApprove(app); }} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/20">Accept</button>
                                            <button onClick={function () { return onProcessApplication === null || onProcessApplication === void 0 ? void 0 : onProcessApplication(organization.id, app.id, 'REJECTED'); }} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Decline</button>
                                        </div>
                                    </div>); })}
                            </div>)}
                    </div>)}

            {/* AFFILIATIONS TAB */}
            {activeTab === 'AFFILIATIONS' && (<div className="space-y-6 animate-in fade-in">
                        {/* Outgoing Requests / Find Zone */}
                        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div>
                                    <h3 className="text-xl font-black mb-2">Connect with Zone</h3>
                                    <p className="text-xs text-indigo-200 font-bold uppercase tracking-widest max-w-md">
                                        Link your {organization.type === 'UMPIRE_ASSOCIATION' ? 'association' : 'club'} to a governing body to receive official fixtures.
                                    </p>
                                </div>
                                <div className="w-full md:w-auto relative">
                                    <input type="text" placeholder="Search Governing Bodies..." className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm font-bold placeholder-indigo-300 w-full md:w-64 focus:bg-white/20 transition-all outline-none" value={affiliationSearch} onChange={function (e) { return setAffiliationSearch(e.target.value); }}/>
                                    <span className="absolute right-4 top-3.5 text-indigo-300">🔍</span>
                                </div>
                            </div>

                            {/* Search Results */}
                            {affiliationSearch && (<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-2">
                                    {allOrganizations
                    .filter(function (o) { var _a; return o.type === 'GOVERNING_BODY' && !((_a = organization.parentOrgIds) === null || _a === void 0 ? void 0 : _a.includes(o.id)); })
                    .filter(function (o) { return o.name.toLowerCase().includes(affiliationSearch.toLowerCase()); })
                    .slice(0, 4)
                    .map(function (org) {
                    var _a, _b, _c;
                    var hasPendingApp = (_a = organization.applications) === null || _a === void 0 ? void 0 : _a.some(function (a) { return a.type === 'ORG_AFFILIATE' && a.applicantId === org.id && a.status === 'PENDING'; }); // Wait, this is for incoming. For outgoing, we need to check if WE have applied to THEM.
                    // Actually, the application lives on the TARGET org (the parent).
                    // So we actually don't know easily if we have a pending application unless we check ALL orgs or if we keep track of outgoing apps.
                    // In App.tsx handleRequestAffiliation, we added the app to the TARGET org.
                    // We did NOT add it to the Applicant org.
                    // So the Applicant org has no record of the pending application unless we read all organizations and check their applications.
                    // Let's use allOrganizations to check.
                    var pendingOnTarget = (_c = (_b = allOrganizations.find(function (o) { return o.id === org.id; })) === null || _b === void 0 ? void 0 : _b.applications) === null || _c === void 0 ? void 0 : _c.some(function (a) { return a.type === 'ORG_AFFILIATE' && a.applicantId === organization.id && a.status === 'PENDING'; });
                    return (<div key={org.id} className="bg-white/10 border border-white/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/20 transition-all">
                                                    <div>
                                                        <div className="font-black">{org.name}</div>
                                                        <div className="text-[10px] uppercase tracking-widest text-indigo-300">{org.country || 'Global'}</div>
                                                    </div>
                                                    {pendingOnTarget ? (<button disabled className="bg-white/50 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest cursor-not-allowed">
                                                            Pending...
                                                        </button>) : (<button onClick={function () { return onRequestAffiliation === null || onRequestAffiliation === void 0 ? void 0 : onRequestAffiliation(org.id, organization); }} className="bg-white text-indigo-900 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                                                            Request Link
                                                        </button>)}
                                                </div>);
                })}
                                    {allOrganizations.filter(function (o) { return o.type === 'GOVERNING_BODY' && o.name.toLowerCase().includes(affiliationSearch.toLowerCase()); }).length === 0 && (<div className="col-span-full text-center text-indigo-300 text-xs font-bold uppercase py-4">No governing bodies found matching "{affiliationSearch}"</div>)}
                                </div>)}
                        </div>

                        {/* List of Current Affiliations */}
                        {organization.parentOrgIds && organization.parentOrgIds.length > 0 && (<div className="bg-white p-6 rounded-[2rem] border border-slate-200">
                                <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4">Active Affiliations</h3>
                                <div className="flex flex-wrap gap-4">
                                    {allOrganizations.filter(function (o) { var _a; return (_a = organization.parentOrgIds) === null || _a === void 0 ? void 0 : _a.includes(o.id); }).map(function (parent) { return (<div key={parent.id} className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl flex items-center gap-3">
                                            <span className="text-lg">🏛️</span>
                                            <span className="font-black text-indigo-900 text-sm">{parent.name}</span>
                                        </div>); })}
                                </div>
                            </div>)}

                        <div className="flex justify-between items-center mb-4 pt-6 border-t border-slate-100">
                            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Incoming Organization Ties</h3>
                        </div>
                        {incomingAffiliations.length === 0 ? (<div className="p-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold uppercase text-xs">
                                No pending affiliation requests.
                            </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {incomingAffiliations.map(function (app) { return (<div key={app.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-xl">
                                                🤝
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900">{app.applicantName}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wants to affiliate</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={function () { return onProcessApplication === null || onProcessApplication === void 0 ? void 0 : onProcessApplication(organization.id, app.id, 'APPROVED'); }} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20">Grant Affiliation</button>
                                            <button onClick={function () { return onProcessApplication === null || onProcessApplication === void 0 ? void 0 : onProcessApplication(organization.id, app.id, 'REJECTED'); }} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Decline</button>
                                        </div>
                                    </div>); })}
                            </div>)}
                    </div>)}

            {/* OFFICIALS TAB */}
            {activeTab === 'OFFICIALS' && (<div className="space-y-6 animate-in fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Official Panel</h3>
                            {isOrgAdmin && (<button onClick={function () { return setIsAddMemberModalOpen(true); }} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-700">
                                    + Register Official
                                </button>)}
                        </div>
                        {officials.length === 0 ? (<div className="p-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold uppercase text-xs">
                                No officials registered. Use the 'Add Member' feature to add Umpires.
                            </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {officials.map(function (member) { return (<div key={member.userId} onClick={function () { return setViewingMember(member); }} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-indigo-300 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-lg">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900">{member.name}</h4>
                                                <p className="text-xs font-bold text-slate-400">{member.role}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-indigo-600">{getOfficialStats(member.userId)}</div>
                                            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Games</div>
                                        </div>
                                    </div>); })}
                            </div>)}
                    </div>)}

            {/* ACCESS CONTROL TAB */}
            {activeTab === 'ACCESS' && (<AccessControlPanel_1.AccessControlPanel organization={organization} onUpdateOrg={onUpdateOrg} isParentAdmin={allOrganizations.filter(function (o) { var _a; return (_a = organization.parentOrgIds) === null || _a === void 0 ? void 0 : _a.includes(o.id); })
                .some(function (parent) { return parent.members.some(function (m) { return m.userId === (currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.id) && m.role === 'Administrator'; }); })} isMainAdmin={isMainAdmin} isOrgAdmin={isOrgAdmin}/>)}

            {/* ASSIGNMENTS TAB (Umpire Associations Only) */}
            {activeTab === 'ASSIGNMENTS' && (<div className="space-y-6 animate-in fade-in">
                        <div className="bg-slate-900 text-white p-6 rounded-[2rem] mb-6">
                            <h3 className="text-xl font-black mb-2">Officiating Assignments</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Assign your officials to affiliated matches</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {allOrganizations
                .filter(function (o) { var _a; return (_a = organization.parentOrgIds) === null || _a === void 0 ? void 0 : _a.includes(o.id); })
                .flatMap(function (o) { return o.fixtures.map(function (f) { return (__assign(__assign({}, f), { orgName: o.name, orgId: o.id })); }); })
                .filter(function (f) { return f.status !== 'Completed'; })
                .sort(function (a, b) { return new Date(a.date).getTime() - new Date(b.date).getTime(); })
                .map(function (fixture) { return (<div key={fixture.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[9px] font-black uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded text-slate-500">{fixture.orgName}</span>
                                                <span className="text-[9px] font-bold text-slate-400">{new Date(fixture.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="font-black text-slate-900">{fixture.teamAName} vs {fixture.teamBName}</div>
                                            <div className="text-xs text-slate-400 font-bold uppercase mt-1">
                                                {fixture.umpires && fixture.umpires.length > 0 ? (<span className="text-emerald-600 flex items-center gap-1">
                                                        ✓ {fixture.umpires.length} Assigned
                                                        <span className="text-slate-400 font-normal normal-case">
                                                            ({organization.members.filter(function (m) { var _a; return (_a = fixture.umpires) === null || _a === void 0 ? void 0 : _a.includes(m.userId); }).map(function (m) { return m.name; }).join(', ')})
                                                        </span>
                                                    </span>) : (<span className="text-amber-500">⚠ Unassigned</span>)}
                                            </div>
                                        </div>

                                        {isOrgAdmin && (<div className="flex items-center gap-2">
                                                <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-indigo-500" onChange={function (e) {
                        if (e.target.value && onUpdateFixture) {
                            var currentUmpires = fixture.umpires || [];
                            if (!currentUmpires.includes(e.target.value)) {
                                onUpdateFixture(fixture.orgId, fixture.id, { umpires: __spreadArray(__spreadArray([], currentUmpires, true), [e.target.value], false) });
                            }
                        }
                    }} value="">
                                                    <option value="">+ Assign Official</option>
                                                    {officials.map(function (off) {
                        var _a;
                        return (<option key={off.userId} value={off.userId} disabled={(_a = fixture.umpires) === null || _a === void 0 ? void 0 : _a.includes(off.userId)}>
                                                            {off.name}
                                                        </option>);
                    })}
                                                </select>
                                            </div>)}
                                    </div>); })}
                        </div>
                    </div>)}

            {/* Role Selection / Approval Modal */}
            {appToApprove && (<div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95">
                        <h3 className="text-xl font-black text-slate-900 mb-2">Accept Application</h3>
                        <p className="text-slate-500 text-xs mb-6">Approve <span className="font-bold text-slate-900">{appToApprove.applicantName}</span>. They will be notified.</p>
                        <div className="space-y-3">
                            <button onClick={function () { return finalizeApplication('Player'); }} className="w-full p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left group">
                                <div className="font-black text-slate-900 group-hover:text-indigo-700">Add as Player</div>
                                <div className="text-[10px] text-slate-400 group-hover:text-indigo-600/70">Assign to team roster.</div>
                            </button>
                            <button onClick={function () { return finalizeApplication('Scorer'); }} className="w-full p-4 rounded-xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 transition-all text-left group">
                                <div className="font-black text-slate-900 group-hover:text-teal-700">Scorer / Staff</div>
                                <div className="text-[10px] text-slate-400 group-hover:text-teal-600/70">Can score matches.</div>
                            </button>
                            <button onClick={function () { return finalizeApplication('Club'); }} className="w-full p-4 rounded-xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left group">
                                <div className="font-black text-slate-900 group-hover:text-emerald-700">Add as Club / Team</div>
                                <div className="text-[10px] text-slate-400 group-hover:text-emerald-600/70">Create new team & assign admin.</div>
                            </button>
                        </div>
                        <button onClick={function () { return setAppToApprove(null); }} className="mt-6 w-full py-3 text-slate-400 font-black uppercase text-xs hover:text-slate-600">Cancel</button>
                    </div>
                </div>)}
            {/* Edit Member/Role Modal */}
            {viewingMember && (<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-black text-slate-400">
                                {viewingMember.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">{viewingMember.name}</h3>
                                <p className="text-sm font-bold text-slate-400">{viewingMember.handle}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Current Role</label>
                                <div className="p-4 bg-slate-50 rounded-xl font-bold text-slate-900 border border-slate-100">
                                    {viewingMember.role}
                                </div>
                            </div>

                            {isOrgAdmin && viewingMember.role !== 'Administrator' && ( /* Prevent demoting self if only admin? Simplified for now */<div>
                                    <label className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block mb-2">Change Role To</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Administrator', 'Scorer', 'Umpire', 'Coach', 'Player', 'Captain'].filter(function (r) { return r !== viewingMember.role; }).map(function (role) { return (<button key={role} onClick={function () {
                        // Update logic
                        if (onUpdateOrg) { // Using onUpdateOrg to simulate member update for now, ideally needs a specific API
                            // In a real app this would be a dedicated updateMember call
                            // For now, we'll alert as this requires backend wiring deeper than UI
                            alert("Role change for ".concat(viewingMember.name, " to ").concat(role, " would happen here. (Backend Hook Needed)"));
                        }
                    }} className="py-3 px-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:border-indigo-500 hover:text-indigo-600 transition-all">
                                                {role}
                                            </button>); })}
                                    </div>
                                </div>)}

                            <div className="pt-4 border-t border-slate-100">
                                <button onClick={function () { return setViewingMember(null); }} className="w-full py-3 bg-slate-900 text-white rounded-xl font-black uppercase text-xs">Close</button>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>);
};
exports.OrganizationView = OrganizationView;
