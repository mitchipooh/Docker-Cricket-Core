"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalDashboard = void 0;
var react_1 = require("react");
var OrgCard_1 = require("../admin/OrgCard");
var Can_1 = require("../common/Can");
var ApplicationModal_1 = require("../modals/ApplicationModal");
var GlobalDashboard = function (_a) {
    var organizations = _a.organizations, profile = _a.profile, onUpdateProfile = _a.onUpdateProfile, onSelectOrg = _a.onSelectOrg, onRequestDeleteOrg = _a.onRequestDeleteOrg, onRequestCreateOrg = _a.onRequestCreateOrg, onRequestQuickMatch = _a.onRequestQuickMatch, onOpenMediaStudio = _a.onOpenMediaStudio, fixtures = _a.fixtures, topBatsmen = _a.topBatsmen, topBowlers = _a.topBowlers, onStartMatch = _a.onStartMatch, onViewMatch = _a.onViewMatch, onViewTeam = _a.onViewTeam, currentUserId = _a.currentUserId, onApplyForOrg = _a.onApplyForOrg, onUpgradeProfile = _a.onUpgradeProfile, following = _a.following, onToggleFollow = _a.onToggleFollow, onRequestCaptainHub = _a.onRequestCaptainHub, showCaptainHub = _a.showCaptainHub, onRequestMatchReports = _a.onRequestMatchReports, onOpenCaptainHub = _a.onOpenCaptainHub, onViewOrg = _a.onViewOrg, onCreateUser = _a.onCreateUser, onRequestTransferMarket = _a.onRequestTransferMarket, _b = _a.globalUsers, globalUsers = _b === void 0 ? [] : _b, // NEW
    onRemoveFixture = _a.onRemoveFixture // NEW
    ;
    var _c = (0, react_1.useState)(false), showApplicationModal = _c[0], setShowApplicationModal = _c[1];
    // Safety check
    if (!profile)
        return <div className="p-10 text-center font-bold text-slate-400">Loading Profile...</div>;
    // Access Logic
    var myOrgs = organizations.filter(function (org) { return org.members.some(function (m) { return m.userId === currentUserId; }); });
    // Filter discovery to only show PUBLIC organizations (or ones user is already in)
    var discoverOrgs = organizations.filter(function (org) { return org.isPublic !== false && !org.members.some(function (m) { return m.userId === currentUserId; }); });
    // Match Official Resume Feature
    // NEW: Filter fixtures to only show matches from user's organizations (Command Center scoping)
    var myOrgIds = myOrgs.map(function (org) { return org.id; });
    var myOrgFixtures = fixtures.filter(function (fixture) {
        // Check if fixture belongs to any of user's organizations
        var hostOrg = organizations.find(function (org) { return org.fixtures.some(function (f) { return f.id === fixture.id; }); });
        if (!hostOrg)
            return false; // Don't show standalone matches in Command Center
        return myOrgIds.includes(hostOrg.id);
    });
    var liveMatches = myOrgFixtures.filter(function (f) { return f.status === 'Live'; });
    var isAdminOrScorer = profile.role === 'Administrator' || profile.role === 'Scorer';
    var isUmpire = profile.role === 'Umpire';
    var isScorer = profile.role === 'Scorer';
    var isFan = profile.role === 'Fan';
    var isPlayer = profile.role === 'Player';
    var isGuest = profile.role === 'Guest';
    // Helper to check if user can claim a specific match
    var canClaimMatch = function (match) {
        if (!isAdminOrScorer && !isUmpire)
            return false;
        if (match.status === 'Completed')
            return false;
        var hostOrg = organizations.find(function (org) { return org.fixtures.some(function (fx) { return fx.id === match.id; }); });
        if (!hostOrg)
            return true;
        var isMember = hostOrg.members.some(function (m) { return m.userId === currentUserId; });
        return isMember;
    };
    var handleApplyClick = function (orgId) {
        if (isGuest && onUpgradeProfile) {
            alert("Please create a profile to apply to organizations.");
            onUpgradeProfile();
        }
        else if (onApplyForOrg) {
            onApplyForOrg(orgId);
        }
    };
    return (<div className="animate-in fade-in duration-700 pb-20">
      <ApplicationModal_1.ApplicationModal isOpen={showApplicationModal} onClose={function () { return setShowApplicationModal(false); }} organizations={organizations.filter(function (org) { return org.isPublic !== false; })} onApply={handleApplyClick}/>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter">
            {isFan || isGuest ? 'Fun Hub' : 'Command Center'}
          </h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
            {isFan || isGuest ? 'Fan Zone & Live Games' : isPlayer ? 'Player Hub' : 'Global Operations'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Can_1.Can role={profile.role} perform="fixture:generate">
            <button onClick={onRequestQuickMatch} className="flex-1 md:flex-none bg-emerald-500 text-white px-3 md:px-5 py-2.5 md:py-3 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-400 hover:scale-105 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
              <span>⚡</span> Quick Match
            </button>
          </Can_1.Can>
          {(isFan || isPlayer || isGuest) && onUpgradeProfile && (<button onClick={onUpgradeProfile} className="flex-1 md:flex-none bg-indigo-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-500 hover:scale-105 transition-all whitespace-nowrap">
              {isGuest ? 'Create Profile' : 'Upgrade Profile'}
            </button>)}
          <button onClick={onOpenMediaStudio} className="flex-1 md:flex-none bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest shadow-xl shadow-pink-200 hover:shadow-pink-300 hover:scale-105 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
            <span>🔴</span> Media Studio
          </button>
          {showCaptainHub && onOpenCaptainHub && (<div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button onClick={onOpenCaptainHub} className="flex-1 md:flex-none bg-indigo-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-500 hover:scale-105 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                <span>🎖️</span> Captain's Hub
              </button>
              <button onClick={onRequestMatchReports} className="flex-1 md:flex-none bg-slate-900 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 hover:scale-105 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                <span>📋</span> Reports
              </button>
            </div>)}
          <Can_1.Can role={profile.role} perform="org:create">
            <button onClick={onRequestTransferMarket} className="flex-1 md:flex-none bg-white text-indigo-600 border border-slate-200 hover:bg-slate-50 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest transition-all shadow-xl whitespace-nowrap">Recruit Talent 🏃‍♂️</button>
            <button onClick={onRequestCreateOrg} className="flex-1 md:flex-none bg-slate-900 text-white hover:bg-slate-800 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest transition-all shadow-xl whitespace-nowrap">+ New Org</button>
          </Can_1.Can>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <div className="space-y-6 md:space-y-8">

          {/* MATCH OFFICIAL RESUME SECTION */}
          {(isUmpire || isScorer) && (<div className="bg-yellow-50 border border-yellow-200 rounded-[2rem] p-8 shadow-sm">
              <h3 className="text-xl font-black text-yellow-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚡</span> Active Assignments
              </h3>
              {liveMatches.length > 0 ? (<div className="grid grid-cols-1 gap-3">
                  {liveMatches.map(function (m) { return (<div key={m.id} className="bg-white p-4 rounded-2xl border border-yellow-100 flex items-center justify-between">
                      <div>
                        <div className="font-black text-sm text-slate-900">{m.teamAName} vs {m.teamBName}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">{m.venue}</div>
                      </div>
                      <button onClick={function () { return onStartMatch(m); }} className="bg-yellow-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-yellow-600 transition-all">
                        Resume
                      </button>
                    </div>); })}
                </div>) : (<p className="text-yellow-700/60 text-xs font-bold uppercase tracking-widest">No live matches to officiate currently.</p>)}
            </div>)}

          {/* MATCH DAY HIGHLIGHTS - NEW Prominent Section */}
          {(liveMatches.length > 0 || myOrgFixtures.some(function (f) { return f.status === 'Scheduled'; })) && (<div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Match Day
                </h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Live & Upcoming</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myOrgFixtures
                .filter(function (f) { return f.status === 'Live' || f.status === 'Scheduled'; })
                .sort(function (a, b) {
                // 1. Status Priority (Live > Scheduled)
                if (a.status === 'Live' && b.status !== 'Live')
                    return -1;
                if (a.status !== 'Live' && b.status === 'Live')
                    return 1;
                // 2. User Affiliation Priority
                var aIsMyOrg = organizations.some(function (o) { return o.fixtures.some(function (fx) { return fx.id === a.id; }) && o.members.some(function (m) { return m.userId === currentUserId; }); });
                var bIsMyOrg = organizations.some(function (o) { return o.fixtures.some(function (fx) { return fx.id === b.id; }) && o.members.some(function (m) { return m.userId === currentUserId; }); });
                if (aIsMyOrg && !bIsMyOrg)
                    return -1;
                if (!aIsMyOrg && bIsMyOrg)
                    return 1;
                // 3. Date Priority (Soonest first)
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            })
                .slice(0, 10)
                .map(function (f) {
                var isClaimable = canClaimMatch(f);
                var isAdmin = profile.role === 'Administrator';
                var isMyOrg = organizations.some(function (o) { return o.fixtures.some(function (fx) { return fx.id === f.id; }) && o.members.some(function (m) { return m.userId === currentUserId; }); });
                var hostOrg = organizations.find(function (o) { return o.fixtures.some(function (fx) { return fx.id === f.id; }); });
                return (<div key={f.id} className={"p-4 rounded-3xl border transition-all hover:bg-slate-50 group flex items-center justify-between gap-4 ".concat(f.status === 'Live' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900')}>
                        <div className="flex items-center gap-4 flex-1 min-w-0" onClick={function () { return onViewMatch(f); }}>
                          <div className={"w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ".concat(f.status === 'Live' ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-indigo-50 text-indigo-500')}>
                            {f.status === 'Live' ? '●' : '📅'}
                          </div>
                          <div className="truncate flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-sm truncate">{f.teamAName} vs {f.teamBName}</span>
                              <span className={"text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ".concat(f.status === 'Live' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500')}>
                                {f.status === 'Live' ? 'Live' : 'Upcoming'}
                              </span>
                              {!isMyOrg && hostOrg && (<span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-600 border border-indigo-200">
                                  Global: {hostOrg.name}
                                </span>)}
                            </div>
                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{f.venue} • {new Date(f.date).toLocaleDateString()}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isClaimable && (<button onClick={function (e) { e.stopPropagation(); onStartMatch(f); }} className="bg-indigo-600 text-white px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg">
                              {f.status === 'Live' ? 'Resume' : 'Claim'}
                            </button>)}
                          <button onClick={function (e) { e.stopPropagation(); onViewMatch(f); }} className="bg-slate-100 text-slate-900 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200">
                            Stats
                          </button>
                          {isAdmin && onRemoveFixture && (<button onClick={function (e) {
                            e.stopPropagation();
                            if (window.confirm('Delete this fixture permanently?'))
                                onRemoveFixture(f.id);
                        }} className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100">
                              ✕
                            </button>)}
                        </div>
                      </div>);
            })}
              </div>
            </div>)}

          {/* MY ORGANIZATIONS */}
          {!isFan && !isGuest && (<div className="space-y-6">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> My Organizations</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {myOrgs.length > 0 ? (myOrgs.map(function (org) { return (<OrgCard_1.OrgCard key={org.id} org={org} userRole={profile.role} onOpen={onSelectOrg} onDeleteRequest={onRequestDeleteOrg}/>); })) : (<div className="col-span-full py-12 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem]">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">You are not a member of any organization.</p>
                  </div>)}
                <Can_1.Can role={profile.role} perform="org:create">
                  <button onClick={onRequestCreateOrg} className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-slate-50 hover:border-indigo-300 transition-all text-slate-400 hover:text-indigo-600 gap-2 group aspect-[4/3] md:aspect-auto">
                    <span className="text-3xl md:text-4xl font-thin group-hover:scale-110 transition-transform">+</span>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-center">New Org</span>
                  </button>
                </Can_1.Can>
              </div>
            </div>)}

          {/* DISCOVER ORGANIZATIONS */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-300"></span> {isPlayer ? 'Find Clubs' : 'Discover'}</h3>
              {!isFan && !isGuest && (<button onClick={function () { return setShowApplicationModal(true); }} className="text-indigo-600 font-bold text-xs uppercase tracking-widest hover:underline">Find More</button>)}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {discoverOrgs.slice(0, 6).map(function (org) {
            var isFollowing = following === null || following === void 0 ? void 0 : following.orgs.includes(org.id);
            return (<div key={org.id} className="bg-white border border-slate-200 p-4 rounded-2xl opacity-85 hover:opacity-100 transition-all relative overflow-hidden group flex flex-col h-full">
                    <button onClick={function () { return onViewOrg && onViewOrg(org.id); }} className="text-left w-full hover:underline group-hover:text-indigo-600 transition-colors mb-2">
                      <h4 className="font-black text-sm md:text-base text-slate-900 line-clamp-1">{org.name}</h4>
                    </button>
                    <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                      <span className={"text-[7px] md:text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ".concat(org.type === 'GOVERNING_BODY' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700')}>
                        {org.type === 'GOVERNING_BODY' ? 'Org' : 'Club'}
                      </span>
                      <span className="text-[9px] text-slate-500 truncate">{org.country || 'Global'}</span>
                    </div>

                    <div className="mt-auto">
                      {isFan || isGuest ? (<button onClick={function () { return onToggleFollow && onToggleFollow('ORG', org.id); }} className={"w-full py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ".concat(isFollowing ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-200')}>
                          {isFollowing ? 'Following' : 'Follow'}
                        </button>) : (<button onClick={function () { return handleApplyClick(org.id); }} className="w-full py-1.5 bg-slate-50 text-slate-600 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                          {isPlayer && org.type === 'CLUB' ? 'Join' : 'Apply'}
                        </button>)}
                    </div>
                  </div>);
        })}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR - GLOBAL MATCHES & STATS */}
        <div className="space-y-8">


          <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-xl shadow-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Global Leaders</h3>
            <div className="space-y-6">
              <div>
                <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-3">Orange Cap</div>
                {topBatsmen.slice(0, 3).map(function (p, i) { return (<div key={p.id} className="flex justify-between items-center text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700">{p.name}</span>
                      <button onClick={function () { return onViewTeam(p.teamId); }} className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1 rounded hover:bg-slate-200">{p.teamName}</button>
                    </div>
                    <span className="font-black text-slate-900">{p.stats.runs}</span>
                  </div>); })}
              </div>
              <div>
                <div className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-3">Purple Cap</div>
                {topBowlers.slice(0, 3).map(function (p, i) { return (<div key={p.id} className="flex justify-between items-center text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700">{p.name}</span>
                      <button onClick={function () { return onViewTeam(p.teamId); }} className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1 rounded hover:bg-slate-200">{p.teamName}</button>
                    </div>
                    <span className="font-black text-slate-900">{p.stats.wickets}</span>
                  </div>); })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
exports.GlobalDashboard = GlobalDashboard;
