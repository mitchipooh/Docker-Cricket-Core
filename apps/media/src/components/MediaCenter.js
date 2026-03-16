"use strict";
/**
 * Cricket-Core 2026 Management System
 * Created by mitchipoohdevs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaCenter = void 0;
var react_1 = require("react");
var MediaStudio_1 = require("./MediaStudio");
var MediaFeed_1 = require("./MediaFeed");
var NewsFeed_1 = require("./NewsFeed");
var PointsTable_1 = require("../display/PointsTable");
var buildPointsTable_1 = require("@cricket/shared/competition/buildPointsTable");
var MediaCenter = function (_a) {
    var _b;
    var onBack = _a.onBack, fixtures = _a.fixtures, teams = _a.teams, players = _a.players, mediaPosts = _a.mediaPosts, onAddMediaPost = _a.onAddMediaPost, onDeletePost = _a.onDeletePost, onUpdatePost = _a.onUpdatePost, initialMatchId = _a.initialMatchId, following = _a.following, onToggleFollow = _a.onToggleFollow, onViewTeam = _a.onViewTeam, onViewPlayer = _a.onViewPlayer, userRole = _a.userRole, currentProfile = _a.currentProfile, _c = _a.organizations, organizations = _c === void 0 ? [] : _c, onArchiveMatch = _a.onArchiveMatch, onDeleteMatch = _a.onDeleteMatch, viewingOrgId = _a.viewingOrgId, _d = _a.initialTab, initialTab = _d === void 0 ? 'NEWS' : _d;
    var _e = (0, react_1.useState)(initialTab), activeTab = _e[0], setActiveTab = _e[1];
    var _f = (0, react_1.useState)('SCHEDULED'), activeFixtureFilter = _f[0], setActiveFixtureFilter = _f[1];
    var _g = (0, react_1.useState)(''), searchQuery = _g[0], setSearchQuery = _g[1];
    var _h = (0, react_1.useState)(null), selectedMatch = _h[0], setSelectedMatch = _h[1];
    (0, react_1.useEffect)(function () {
        if (initialMatchId) {
            var match = fixtures.find(function (f) { return f.id === initialMatchId; });
            if (match) {
                setSelectedMatch(match);
                setActiveTab('FEED');
            }
        }
    }, [initialMatchId, fixtures]);
    var displayedFixtures = (0, react_1.useMemo)(function () {
        var filtered = fixtures;
        // Filter by Org if set
        if (viewingOrgId) {
            var org = organizations.find(function (o) { return o.id === viewingOrgId; });
            if (org) {
                // Only show fixtures belonging to this org
                // Note: Fixtures don't have orgId directly usually, but orgs have fixtures.
                // Better to use org.fixtures list if available, or cross-reference.
                var orgFixtureIds_1 = org.fixtures.map(function (f) { return f.id; });
                filtered = filtered.filter(function (f) { return orgFixtureIds_1.includes(f.id); });
            }
        }
        else {
            // NEW: Global feed visibility filtering based on pushToGlobalFeed setting
            filtered = filtered.filter(function (fixture) {
                var hostOrg = organizations.find(function (org) { return org.fixtures.some(function (f) { return f.id === fixture.id; }); });
                // Standalone matches (no host org) are always visible
                if (!hostOrg)
                    return true;
                // If org pushes to global feed (or setting is undefined/true), show to everyone
                if (hostOrg.pushToGlobalFeed !== false)
                    return true;
                // Otherwise, only show to org members
                var currentUserId = currentProfile === null || currentProfile === void 0 ? void 0 : currentProfile.id;
                if (!currentUserId)
                    return false;
                return hostOrg.members.some(function (m) { return m.userId === currentUserId; });
            });
        }
        // Apply status/type filters
        filtered = filtered.filter(function (f) {
            if (activeFixtureFilter === 'ARCHIVE')
                return f.isArchived;
            if (f.isArchived)
                return false;
            if (activeFixtureFilter === 'UNOFFICIAL')
                return f.isOfficial === false;
            // For other tabs (LIVE, SCHEDULED, COMPLETED), only show official matches
            if (f.isOfficial === false)
                return false;
            if (activeFixtureFilter === 'LIVE')
                return f.status === 'Live';
            if (activeFixtureFilter === 'SCHEDULED')
                return f.status === 'Scheduled';
            if (activeFixtureFilter === 'COMPLETED')
                return f.status === 'Completed';
            return false;
        });
        // Apply search query filter
        if (searchQuery.trim()) {
            var query_1 = searchQuery.toLowerCase();
            filtered = filtered.filter(function (f) {
                var _a, _b, _c;
                var teamAMatch = (_a = f.teamAName) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(query_1);
                var teamBMatch = (_b = f.teamBName) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(query_1);
                var venueMatch = (_c = f.venue) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(query_1);
                var dateMatch = new Date(f.date).toLocaleDateString().toLowerCase().includes(query_1);
                return teamAMatch || teamBMatch || venueMatch || dateMatch;
            });
        }
        return filtered;
    }, [fixtures, activeFixtureFilter, viewingOrgId, organizations, currentProfile, searchQuery]);
    // Also filter MediaPosts if looking at specific Org
    var displayedPosts = (0, react_1.useMemo)(function () {
        if (!viewingOrgId)
            return mediaPosts;
        var org = organizations.find(function (o) { return o.id === viewingOrgId; });
        if (!org)
            return mediaPosts;
        // Find matches for this org
        var orgFixtureIds = org.fixtures.map(function (f) { return f.id; });
        return mediaPosts.filter(function (p) {
            // If post is linked to a match, check if that match belongs to Org
            if (p.matchId)
                return orgFixtureIds.includes(p.matchId);
            // If post has no match, maybe filter by user membership? (Too strict for now, just show match content)
            return true;
        });
    }, [mediaPosts, viewingOrgId, organizations]);
    var filteredTeams = teams.filter(function (t) { return t.name.toLowerCase().includes(searchQuery.toLowerCase()); });
    var filteredPlayers = players.filter(function (p) { return p.name.toLowerCase().includes(searchQuery.toLowerCase()); });
    var handleSelectMatch = function (match) {
        setSelectedMatch(match);
        if (match)
            setActiveTab('FEED');
    };
    var isGuest = !currentProfile || currentProfile.role === 'Guest';
    var isAdmin = userRole === 'Administrator' || userRole === 'Scorer';
    var centralZone = organizations.find(function (o) { return o.id === 'org-central-zone'; }) || organizations[0];
    var canPostToFeed = isAdmin || (!isGuest && ((centralZone === null || centralZone === void 0 ? void 0 : centralZone.allowUserContent) !== false));
    var globalStandings = (0, react_1.useMemo)(function () {
        if (activeTab !== 'STANDINGS')
            return [];
        var allTables = [];
        organizations.forEach(function (org) {
            org.tournaments.forEach(function (trn) {
                var trnFixtures = org.fixtures.filter(function (f) { return f.tournamentId === trn.id && f.status === 'Completed' && f.savedState && f.isOfficial !== false; });
                if (trnFixtures.length === 0 && trn.groups.every(function (g) { return g.teams.length === 0; }))
                    return;
                var completedMatches = trnFixtures.map(function (f) {
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
                trn.groups.forEach(function (grp) {
                    var grpMatches = completedMatches.filter(function (m) {
                        var teamIds = grp.teams.map(function (t) { return t.id; });
                        return teamIds.includes(m.teamAId) && teamIds.includes(m.teamBId);
                    });
                    var rows = (0, buildPointsTable_1.buildPointsTable)(grpMatches, grp.teams);
                    if (rows.length > 0 || grp.teams.length > 0) {
                        allTables.push({
                            title: "".concat(org.name, " - ").concat(trn.name, " (").concat(grp.name, ")"),
                            rows: rows
                        });
                    }
                });
            });
        });
        return allTables;
    }, [organizations, activeTab]);
    // Aggregate sponsors for display
    var sponsors = (0, react_1.useMemo)(function () {
        return organizations.flatMap(function (o) { return o.sponsors || []; }).filter(function (s) { return s.isActive; });
    }, [organizations]);
    var topSponsors = sponsors.filter(function (s) { return s.placements.includes('MEDIA_TOP'); });
    var bottomSponsors = sponsors.filter(function (s) { return s.placements.includes('MEDIA_BOTTOM'); });
    // Resolve sizing settings
    var activeOrg = viewingOrgId ? organizations.find(function (o) { return o.id === viewingOrgId; }) : (organizations.find(function (o) { return o.id === 'org-central-zone'; }) || organizations[0]);
    var sponsorSettings = (activeOrg === null || activeOrg === void 0 ? void 0 : activeOrg.sponsorSettings) || {
        mediaTopHeight: 320,
        mediaBottomHeight: 320,
        scoreboardTopHeight: 400,
        scoreboardBottomHeight: 480
    };
    return (<div className="h-full flex flex-col animate-in slide-in-from-bottom-8 duration-500 overflow-hidden w-full max-w-[100vw] overflow-x-hidden">


            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 px-2 md:px-0 shrink-0 pt-4">
                <div className="flex items-center gap-6">
                    <button onClick={onBack} className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-black transition-all shadow-sm">←</button>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            {viewingOrgId ? (<span className="flex items-center gap-3">
                                    <span className="text-indigo-600">{(_b = organizations.find(function (o) { return o.id === viewingOrgId; })) === null || _b === void 0 ? void 0 : _b.name}</span>
                                    <span className="text-slate-300">/</span>
                                    <span>Media</span>
                                </span>) : 'Media Center'}
                        </h1>
                        <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Live Games & Fan Content</p>
                    </div>
                </div>

                <div className="flex bg-white rounded-2xl p-1.5 border border-slate-200 shadow-sm self-start md:self-auto overflow-x-auto max-w-full no-scrollbar shrink-0">
                    {['NEWS', 'FEED', 'FIXTURES', 'STANDINGS', 'TEAMS', 'PLAYERS', 'STUDIO'].map(function (tab) { return (<button key={tab} onClick={function () { return setActiveTab(tab); }} className={"px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ".concat(activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50')}>
                            {tab}
                        </button>); })}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-24 px-1 scroll-container w-full">
                {activeTab === 'NEWS' && (<NewsFeed_1.NewsFeed posts={displayedPosts} onAddPost={onAddMediaPost} onDeletePost={onDeletePost} onUpdatePost={onUpdatePost} isAdmin={isAdmin} currentUser={currentProfile}/>)}

                {activeTab === 'FEED' && (<MediaFeed_1.MediaFeed fixtures={displayedFixtures} teams={teams} mediaPosts={displayedPosts} onAddMediaPost={onAddMediaPost} onDeletePost={onDeletePost} selectedMatch={selectedMatch} onSelectMatch={handleSelectMatch} canPost={canPostToFeed} isAdmin={isAdmin} organizations={organizations} onUpdatePost={onUpdatePost} currentUser={currentProfile}/>)}

                {activeTab === 'STUDIO' && <MediaStudio_1.MediaStudio onBack={function () { return setActiveTab('FEED'); }} fixtures={fixtures} isEmbedded={true}/>}

                {activeTab === 'STANDINGS' && (<div className="space-y-8 animate-in fade-in pb-10">
                        {globalStandings.length === 0 ? <div className="text-center py-20 text-slate-400 text-xs font-bold uppercase tracking-widest border-2 border-dashed border-slate-200 rounded-[2rem]">No active league tables found.</div> : globalStandings.map(function (table, idx) { return (<div key={idx} className="space-y-4">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-indigo-500 pl-3">{table.title}</h3>
                                <PointsTable_1.PointsTable rows={table.rows} onViewTeam={onViewTeam}/>
                            </div>); })}
                    </div>)}

                {activeTab === 'FIXTURES' && (<div className="space-y-6 animate-in fade-in pb-10">
                        {/* Search Input */}
                        <div className="relative">
                            <input type="text" placeholder="Search matches by team, venue, or date..." value={searchQuery} onChange={function (e) { return setSearchQuery(e.target.value); }} className="w-full px-6 py-4 pl-12 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm font-bold placeholder:text-slate-400"/>
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
                            {searchQuery && (<button onClick={function () { return setSearchQuery(''); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-sm">
                                    ✕
                                </button>)}
                        </div>

                        <div className="flex gap-2 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar">
                            {['LIVE', 'SCHEDULED', 'COMPLETED', 'UNOFFICIAL', 'ARCHIVE'].map(function (filter) { return (<button key={filter} onClick={function () { return setActiveFixtureFilter(filter); }} className={"px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ".concat(activeFixtureFilter === filter ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-400')}>{filter}</button>); })}
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {displayedFixtures.map(function (f) { return (<div key={f.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 group">
                                    <div className="flex flex-col gap-1 w-full md:w-auto text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                                            <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded">{new Date(f.date).toLocaleDateString()}</span>
                                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{f.venue}</span>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-200 px-1.5 rounded">{f.format}</span>
                                            {f.isOfficial === false && <span className="text-[10px] font-black bg-amber-100 text-amber-600 px-2 py-0.5 rounded uppercase tracking-widest">Unofficial</span>}
                                            {f.isArchived && <span className="text-[10px] font-black bg-slate-200 text-slate-500 px-2 py-0.5 rounded uppercase tracking-widest">Archived</span>}
                                        </div>
                                        <div className="flex items-center justify-center md:justify-start gap-4 text-lg"><span className="font-black text-slate-900">{f.teamAName}</span><span className="text-xs font-bold text-slate-300">VS</span><span className="font-black text-slate-900">{f.teamBName}</span></div>
                                        {f.status === 'Live' && <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-1 animate-pulse">Live Score: {f.teamAScore || '0/0'} - {f.teamBScore || '0/0'}</div>}
                                        {f.result && <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">{f.result}</div>}
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        {isAdmin && (<div className="flex gap-1 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {!f.isArchived && onArchiveMatch && <button onClick={function () { return onArchiveMatch(f.id); }} className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 flex items-center justify-center" title="Archive">📦</button>}
                                                {onDeleteMatch && <button onClick={function () { return onDeleteMatch(f.id); }} className="w-8 h-8 rounded-full bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center" title="Delete">🗑️</button>}
                                            </div>)}
                                        <button onClick={function () { return handleSelectMatch(f); }} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-indigo-500 transition-all w-full md:w-auto">Scorecard</button>
                                    </div>
                                </div>); })}
                            {displayedFixtures.length === 0 && <div className="py-20 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-400 font-bold uppercase text-xs">No {activeFixtureFilter.toLowerCase()} fixtures found</div>}
                        </div>
                    </div>)}

                {(activeTab === 'TEAMS' || activeTab === 'PLAYERS') && (<div className="space-y-6 animate-in fade-in pb-10">
                        <input value={searchQuery} onChange={function (e) { return setSearchQuery(e.target.value); }} placeholder={"Search ".concat(activeTab.toLowerCase(), "...")} className="w-full bg-white border border-slate-200 rounded-[2rem] px-6 py-4 font-bold outline-none shadow-sm focus:ring-2 focus:ring-indigo-500"/>
                        {activeTab === 'TEAMS' && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTeams.map(function (t) {
                    var isFollowed = following.teams.includes(t.id);
                    return (<div key={t.id} className="bg-white rounded-[2.5rem] p-6 border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:shadow-xl transition-all">
                                            <div className="flex items-center gap-4 cursor-pointer" onClick={function () { return onViewTeam(t.id); }}>
                                                <img src={t.logoUrl} className="w-16 h-16 rounded-2xl bg-slate-50 object-cover"/>
                                                <div><h3 className="font-black text-lg text-slate-900 leading-tight">{t.name}</h3><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.location}</p></div>
                                            </div>
                                            <button onClick={function () { return onToggleFollow('TEAM', t.id); }} className={"w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ".concat(isFollowed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200')}>{isFollowed ? 'Following Team' : 'Follow Team'}</button>
                                        </div>);
                })}
                            </div>)}
                        {activeTab === 'PLAYERS' && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {filteredPlayers.slice(0, 48).map(function (p) {
                    var isFollowed = following.players.includes(p.id);
                    return (<div key={p.id} className="bg-white rounded-[2rem] p-4 border border-slate-200 shadow-sm flex items-center gap-4 hover:border-indigo-300 transition-all group">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 overflow-hidden cursor-pointer" onClick={function () { return onViewPlayer(p); }}><img src={p.photoUrl} className="w-full h-full object-cover"/></div>
                                            <div className="flex-1 min-w-0"><h4 className="font-black text-xs text-slate-900 truncate cursor-pointer hover:underline" onClick={function () { return onViewPlayer(p); }}>{p.name}</h4><p className="text-[9px] text-slate-400 font-bold uppercase">{p.teamName}</p></div>
                                            <button onClick={function () { return onToggleFollow('PLAYER', p.id); }} className={"w-8 h-8 rounded-full flex items-center justify-center transition-all ".concat(isFollowed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-300 hover:bg-indigo-100 hover:text-indigo-500')}>{isFollowed ? '✓' : '+'}</button>
                                        </div>);
                })}
                            </div>)}
                    </div>)}
            </div>

        </div>);
};
exports.MediaCenter = MediaCenter;
