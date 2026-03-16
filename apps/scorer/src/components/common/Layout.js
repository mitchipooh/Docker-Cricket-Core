"use strict";
/**
 * Cricket-Core 2026 Management System
 * Created by mitchipoohdevs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
var react_1 = require("react");
var NetworkStatus_1 = require("./NetworkStatus");
var DevTools_1 = require("../dev/DevTools");
var DevDatabaseConsole_1 = require("../dev/DevDatabaseConsole");
var Layout = function (_a) {
    var _b, _c;
    var children = _a.children, activeTab = _a.activeTab, onTabChange = _a.onTabChange, profile = _a.profile, theme = _a.theme, onThemeToggle = _a.onThemeToggle, settings = _a.settings, onToggleSetting = _a.onToggleSetting, onEditProfile = _a.onEditProfile, onApplyForAccreditation = _a.onApplyForAccreditation, onSignOut = _a.onSignOut, onSignIn = _a.onSignIn, onSignUp = _a.onSignUp, onSwitchProfile = _a.onSwitchProfile, showCaptainHub = _a.showCaptainHub, _d = _a.organizations, organizations = _d === void 0 ? [] : _d, viewingOrgId = _a.viewingOrgId, activeViewRole = _a.activeViewRole;
    var _e = (0, react_1.useState)(false), isMenuOpen = _e[0], setIsMenuOpen = _e[1];
    var _f = (0, react_1.useState)(false), isSettingsOpen = _f[0], setIsSettingsOpen = _f[1];
    var _g = (0, react_1.useState)(false), showNotifications = _g[0], setShowNotifications = _g[1];
    var _h = (0, react_1.useState)(false), showDbConsole = _h[0], setShowDbConsole = _h[1];
    // Determine Logo Path based on environment
    var logoSrc = ((_b = window.wpApiSettings) === null || _b === void 0 ? void 0 : _b.plugin_url)
        ? "".concat(window.wpApiSettings.plugin_url, "logo.jpg")
        : '/logo.jpg';
    var isDeveloper = settings.devMode || profile.handle === 'Trinity' || profile.handle === '@Trinity';
    var unreadCount = ((_c = profile.notifications) === null || _c === void 0 ? void 0 : _c.filter(function (n) { return !n.read; }).length) || 0;
    // Conditional Fullscreen on first interaction
    (0, react_1.useEffect)(function () {
        if (!settings.fullScreen)
            return; // Only enable if user has turned it on
        var handleInteraction = function () {
            if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(function (err) {
                    console.log("Error attempting to enable full-screen mode: ".concat(err.message, " (").concat(err.name, ")"));
                });
            }
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
        };
        document.addEventListener('click', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);
        return function () {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
        };
    }, [settings.fullScreen]);
    var handleNavClick = function (tab) {
        onTabChange(tab);
        setIsMenuOpen(false);
    };
    var navItems = [];
    if (profile.role === 'Guest') {
        navItems.push({ id: 'media', label: 'Media & Fan Zone', icon: '📺' });
        navItems.push({ id: 'scorer', label: 'Score Match', icon: '🏏' });
    }
    else if (profile.role === 'Fan') {
        navItems.push({ id: 'home', label: 'Media & Live', icon: '📺' });
        navItems.push({ id: 'home', label: 'Club Finder', icon: '🏟️' });
        navItems.push({ id: 'media', label: 'Media', icon: '📺' });
    }
    else if (profile.role === 'Captain') {
        navItems.push({ id: 'my_club', label: 'My Club', icon: '🛡️' });
        navItems.push({ id: 'captain_hub', label: "Captain's Hub", icon: '🎖️' });
        navItems.push({ id: 'media', label: 'Media', icon: '📺' });
    }
    else {
        navItems.push({ id: 'home', label: 'Dashboard', icon: '🏠' });
        if (showCaptainHub)
            navItems.push({ id: 'captain_hub', label: "Captain's Hub", icon: '🎖️' });
        navItems.push({ id: 'scorer', label: 'Scoring', icon: '🏏' });
        if (profile.role === 'Player' || profile.role === 'Scorer')
            navItems.push({ id: 'career', label: 'Career', icon: '📈' });
        if (profile.role === 'Administrator')
            navItems.push({ id: 'stats', label: 'Analytics', icon: '📊' });
        navItems.push({ id: 'media', label: 'Media', icon: '📺' });
    }
    // Publicly available for all roles in the menu
    navItems.push({ id: 'registry', label: 'Player Registry', icon: '👥' });
    // Resolve Global Sponsors
    var activeOrg = viewingOrgId ? organizations.find(function (o) { return o.id === viewingOrgId; }) : (organizations.find(function (o) { return o.id === 'org-central-zone'; }) || organizations[0]);
    var sponsorSettings = (activeOrg === null || activeOrg === void 0 ? void 0 : activeOrg.sponsorSettings) || {
        mediaTopHeight: 40,
        mediaBottomHeight: 40,
        scoreboardTopHeight: 40,
        scoreboardBottomHeight: 40
    };
    var topSponsors = ((activeOrg === null || activeOrg === void 0 ? void 0 : activeOrg.sponsors) || []).filter(function (s) { return s.isActive && s.placements.includes('MEDIA_TOP'); });
    // APP MODE
    var isAppMode = ['scorer', 'setup', 'media'].includes(activeTab);
    var mainClasses = isAppMode
        ? "h-[100dvh] w-full pt-16 lg:pt-20 overflow-x-hidden overflow-y-hidden flex flex-col relative"
        : "h-[100dvh] w-full pt-20 lg:pt-24 pb-12 px-2 md:px-8 lg:px-12 overflow-x-hidden overflow-y-auto scroll-container custom-scrollbar no-scrollbar relative flex flex-col";
    return (<div className={"h-[100dvh] w-full ".concat(theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900', " relative transition-colors duration-300 flex flex-col overflow-hidden")}>
      <div className="fixed top-4 left-4 lg:top-6 lg:left-6 z-50 flex items-center gap-4">
        {activeTab !== 'scorer' && (<button onClick={function () { setIsMenuOpen(!isMenuOpen); setIsSettingsOpen(false); }} className={"w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 shadow-2xl z-50 ".concat(isMenuOpen
                ? 'bg-slate-800 text-white rotate-90 ring-2 ring-indigo-500'
                : 'bg-indigo-600 text-white hover:scale-105 active:scale-95 shadow-indigo-600/40')} aria-label="Menu">
            <span className={"w-6 h-1 bg-current rounded-full transition-all ".concat(isMenuOpen ? 'rotate-45 translate-y-2.5' : '')}></span>
            <span className={"w-6 h-1 bg-current rounded-full transition-all ".concat(isMenuOpen ? 'opacity-0' : '')}></span>
            <span className={"w-6 h-1 bg-current rounded-full transition-all ".concat(isMenuOpen ? '-rotate-45 -translate-y-2.5' : '')}></span>
          </button>)}

        {!isMenuOpen && activeTab !== 'scorer' && (<div className="hidden md:flex items-center gap-3 bg-slate-900/10 backdrop-blur-md p-1 pr-4 rounded-2xl border border-white/10 shadow-sm animate-in fade-in slide-in-from-left-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-xs shadow-inner">
              {profile.name.charAt(0)}
            </div>
            <div className="flex flex-col px-1 py-1">
              <h1 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                {(new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 18 ? 'Good Afternoon' : 'Good Evening')}, {profile.role} {profile.name.split(' ')[0]}
              </h1>
              <span className="text-xs text-indigo-600 font-black uppercase tracking-widest leading-none">
                {activeTab === 'home' ? (profile.role === 'Fan' ? 'Media Center' : 'Dashboard') : activeTab.replace('_', ' ')}
              </span>
            </div>
          </div>)}
      </div>

      {/* GLOBAL SPONSOR BANNER - Center Gap */}
      <div className="fixed top-4 left-20 lg:top-6 lg:left-24 right-20 lg:right-24 z-50 flex justify-center pointer-events-none">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/5 h-12 lg:h-14 flex items-center justify-center gap-6 px-6 shadow-2xl overflow-hidden pointer-events-auto max-w-full">
          {topSponsors.length > 0 ? (topSponsors.map(function (s) { return (<img key={s.id} src={s.logoUrl} alt={s.name} className="h-8 lg:h-10 object-contain hover:scale-110 transition-transform cursor-pointer" onClick={function () { return s.website && window.open(s.website, '_blank'); }} title={s.name}/>); })) : (<div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] whitespace-nowrap">Cricket Core 2026 Management System</div>)}
        </div>
      </div>

      <div className="fixed top-4 right-4 lg:top-6 lg:right-6 z-50 flex items-center gap-4">
        {activeTab !== 'scorer' && (<div className="hidden md:block">
            <NetworkStatus_1.NetworkStatus />
          </div>)}

        {activeTab !== 'scorer' && (<button onClick={function () { setIsSettingsOpen(!isSettingsOpen); setIsMenuOpen(false); setShowNotifications(false); }} className={"w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl z-50 ".concat(isSettingsOpen ? 'bg-slate-800 text-white rotate-180 ring-2 ring-slate-600' : 'bg-white/10 backdrop-blur-md text-slate-400 border border-white/5 hover:bg-white/20')} aria-label="Settings">
            <span className="text-xl">⚙️</span>
          </button>)}
      </div>



      <div className={"fixed inset-0 bg-slate-950/90 backdrop-blur-md z-40 transition-opacity duration-300 ".concat(isMenuOpen || isSettingsOpen || showNotifications ? 'opacity-100' : 'opacity-0 pointer-events-none')} onClick={function () { setIsMenuOpen(false); setIsSettingsOpen(false); setShowNotifications(false); }}/>

      {/* Navigation Drawer */}
      <nav className={"fixed top-0 left-0 h-full w-full sm:w-72 bg-slate-900 p-6 pt-20 sm:pt-6 flex flex-col gap-4 shadow-2xl z-40 transition-transform duration-500 ease-out border-r border-slate-800 ".concat(isMenuOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex items-center gap-3 mb-2">
          <img src={logoSrc} alt="Cricket Core" className="w-12 h-12 object-contain drop-shadow-lg"/>
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-white leading-tight tracking-[0.2em]">CRICKET CORE</h1>
            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none">Management v3.0</p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 overflow-y-auto custom-scrollbar flex-1">
          <button key="home" onClick={function () { return handleNavClick('home'); }} className={"flex items-center gap-3 px-4 py-3 rounded-xl transition-all ".concat(activeTab === 'home' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800')}>
            <span className="text-lg">🏠</span><span className="font-black uppercase text-[10px] tracking-widest">Dashboard</span>
          </button>
          <button key="media" onClick={function () { return handleNavClick('media'); }} className={"flex items-center gap-3 px-4 py-3 rounded-xl transition-all ".concat(activeTab === 'media' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800')}>
            <span className="text-lg">📺</span><span className="font-black uppercase text-[10px] tracking-widest">Media Center</span>
          </button>
          {(showCaptainHub || activeViewRole === 'Administrator' || activeViewRole === 'Captain' || profile.role === 'Administrator') && (<button key="captain_hub" onClick={function () { return handleNavClick('captain_hub'); }} className={"flex items-center gap-3 px-4 py-3 rounded-xl transition-all ".concat(activeTab === 'captain_hub' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800')}>
              <span className="text-lg">🎖️</span><span className="font-black uppercase text-[10px] tracking-widest">Captain's Hub</span>
            </button>)}
          {(activeViewRole === 'Administrator' || profile.role === 'Administrator' || activeViewRole === 'Scorer') && (<button key="stats" onClick={function () { return handleNavClick('stats'); }} className={"flex items-center gap-3 px-4 py-3 rounded-xl transition-all ".concat(activeTab === 'stats' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800')}>
              <span className="text-lg">📊</span><span className="font-black uppercase text-[10px] tracking-widest">Analytics</span>
            </button>)}
          <button key="my_matches" onClick={function () { return handleNavClick('my_matches'); }} className={"flex items-center gap-3 px-4 py-3 rounded-xl transition-all ".concat(activeTab === 'my_matches' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800')}>
            <span className="text-lg">🏏</span><span className="font-black uppercase text-[10px] tracking-widest">My Matches</span>
          </button>
          <button key="profile" onClick={function () { return handleNavClick('profile'); }} className={"flex items-center gap-3 px-4 py-3 rounded-xl transition-all ".concat(activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800')}>
            <span className="text-lg">👤</span><span className="font-black uppercase text-[10px] tracking-widest">Profile</span>
          </button>
          <button key="my_teams" onClick={function () { return handleNavClick('my_teams'); }} className={"flex items-center gap-3 px-4 py-3 rounded-xl transition-all ".concat(activeTab === 'my_teams' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800')}>
            <span className="text-lg">🛡️</span><span className="font-black uppercase text-[10px] tracking-widest">My Teams</span>
          </button>
          <button key="my_clubs" onClick={function () { return handleNavClick('my_clubs'); }} className={"flex items-center gap-3 px-4 py-3 rounded-xl transition-all ".concat(activeTab === 'my_clubs' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800')}>
            <span className="text-lg">🏟️</span><span className="font-black uppercase text-[10px] tracking-widest">My Clubs</span>
          </button>
          <button key="scorer" onClick={function () { return handleNavClick('scorer'); }} className={"flex items-center gap-3 px-4 py-3 rounded-xl transition-all ".concat(activeTab === 'scorer' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800')}>
            <span className="text-lg">⚡</span><span className="font-black uppercase text-[10px] tracking-widest">Start a Match</span>
          </button>
          <button key="register_club" onClick={function () { return handleNavClick('register_club'); }} className={"flex items-center gap-3 px-4 py-3 rounded-xl transition-all ".concat(activeTab === 'register_club' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800')}>
            <span className="text-lg">📝</span><span className="font-black uppercase text-[10px] tracking-widest">Register a Club</span>
          </button>
          <button key="following" onClick={function () { return handleNavClick('following'); }} className={"flex items-center gap-3 px-4 py-3 rounded-xl transition-all ".concat(activeTab === 'following' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800')}>
            <span className="text-lg">📡</span><span className="font-black uppercase text-[10px] tracking-widest">Following</span>
          </button>
          <button key="registry" onClick={function () { return handleNavClick('registry'); }} className={"flex items-center gap-3 px-4 py-3 rounded-xl transition-all ".concat(['registry', 'team_registry'].includes(activeTab) ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800')}>
            <span className="text-lg">👥</span><span className="font-black uppercase text-[10px] tracking-widest">Player/Team Registry</span>
          </button>

        </div>

        {/* Settings Icon at Bottom */}
        <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
          <button onClick={function () { setIsSettingsOpen(!isSettingsOpen); setIsMenuOpen(false); }} className="w-full flex items-center justify-center gap-3 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-all group">
            <span className="text-xl group-hover:rotate-90 transition-transform duration-500">⚙️</span>
            <span className="font-black uppercase text-[10px] tracking-widest">Settings</span>
          </button>

          {profile.role === 'Guest' && (<div className="grid grid-cols-2 gap-2">
              <button onClick={onSignIn} className="py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all">
                Sign In
              </button>
              <button onClick={onSignUp} className="py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                Join Now
              </button>
            </div>)}

          <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-xl border border-white/5">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-black text-white text-xs">{profile.name.charAt(0)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black text-white truncate">{profile.name}</p>
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{profile.role === 'Guest' ? 'GUEST USER' : (activeViewRole || profile.role).toUpperCase()}</p>
            </div>
            {profile.role !== 'Guest' && <button onClick={onSignOut} className="w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-500 transition-colors">🚪</button>}
            {profile.role === 'Guest' && onSignIn && (<button onClick={onSignIn} className="w-6 h-6 flex items-center justify-center text-emerald-400 hover:text-emerald-500 transition-colors">🔑</button>)}
          </div>
        </div>
      </nav>

      {/* Settings Drawer */}
      <aside className={"fixed top-0 right-0 h-full w-full sm:w-80 bg-slate-900 p-8 pt-24 sm:pt-8 flex flex-col gap-6 shadow-2xl z-40 transition-transform duration-500 ease-out border-l border-slate-800 ".concat(isSettingsOpen ? 'translate-x-0' : 'translate-x-full')}>
        <div className="mb-4">
          <h2 className="text-xl font-black text-white">Application Settings</h2>
          <p className="text-slate-500 text-xs mt-1">Configure your experience</p>
        </div>

        {/* Notifications Section in Settings */}
        {profile.role !== 'Guest' && (<div className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/50 shadow-inner">
              <button onClick={function () { return setShowNotifications(!showNotifications); }} className="w-full p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="text-xl">🔔</span>
                    {unreadCount > 0 && (<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-800"></span>)}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white">Notifications</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest">{unreadCount > 0 ? "".concat(unreadCount, " new alerts") : 'No new alerts'}</div>
                  </div>
                </div>
                <span className={"text-xs transition-transform transform ".concat(showNotifications ? 'rotate-180' : '')}>▼</span>
              </button>
              {showNotifications && (<div className="p-2 bg-slate-900/50 max-h-48 overflow-y-auto no-scrollbar">
                  {profile.notifications && profile.notifications.length > 0 ? (profile.notifications.slice().reverse().map(function (n) { return (<div key={n.id} className={"p-2.5 mb-2 rounded-xl border text-left transition-all ".concat(n.read ? 'bg-slate-900/30 border-transparent opacity-60' : 'bg-slate-800 border-indigo-500/30')}>
                        <h4 className="text-[11px] font-bold text-white mb-0.5">{n.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-tight">{n.message}</p>
                      </div>); })) : (<div className="text-center py-4 text-slate-500 text-[10px] font-bold uppercase">No updates</div>)}
                </div>)}
            </div>)}


        <div className="flex-1 overflow-y-auto custom-scrollbar scroll-container space-y-4 pr-1">
          {(profile.role === 'Fan' || profile.role === 'Player') && (<div className="bg-slate-800 p-4 rounded-2xl flex items-center justify-between border border-slate-700/50">
              <div>
                <div className="text-xs font-bold text-white">Official Accreditation</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Join Organizations</div>
              </div>
              <button onClick={function () { if (onApplyForAccreditation) {
            onApplyForAccreditation();
            setIsSettingsOpen(false);
        } }} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Apply</button>
            </div>)}
          <div className="bg-slate-800 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Dark Mode</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">Visual Theme</div>
            </div>
            <button onClick={onThemeToggle} className={"w-12 h-6 rounded-full transition-colors relative ".concat(theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-600')}><div className={"w-4 h-4 bg-white rounded-full absolute top-1 transition-all ".concat(theme === 'dark' ? 'left-7' : 'left-1')}/></button>
          </div>

          <div className="bg-slate-800 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Developer Mode</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">Restricted Access</div>
            </div>
            <button onClick={function () {
            if (!settings.devMode) {
                var password = prompt('Enter developer password:');
                if (password === 'mitchipooh22') {
                    onToggleSetting('devMode');
                }
                else if (password !== null) {
                    alert('Incorrect password');
                }
            }
            else {
                onToggleSetting('devMode');
            }
        }} className={"w-12 h-6 rounded-full transition-colors relative ".concat(settings.devMode ? 'bg-indigo-600' : 'bg-slate-600')}>
              <div className={"w-4 h-4 bg-white rounded-full absolute top-1 transition-all ".concat(settings.devMode ? 'left-7' : 'left-1')}/>
            </button>
          </div>

          <div className="bg-slate-800 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Full-Screen Mode</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">Auto-enter fullscreen</div>
            </div>
            <button onClick={function () { return onToggleSetting('fullScreen'); }} className={"w-12 h-6 rounded-full transition-colors relative ".concat(settings.fullScreen ? 'bg-indigo-600' : 'bg-slate-600')}>
              <div className={"w-4 h-4 bg-white rounded-full absolute top-1 transition-all ".concat(settings.fullScreen ? 'left-7' : 'left-1')}/>
            </button>
          </div>

          <div className="bg-indigo-900/40 p-4 rounded-2xl flex items-center justify-between border border-indigo-500/30">
            <div>
              <div className="text-sm font-bold text-white">Demo Mode 🚀</div>
              <div className="text-[10px] text-indigo-300/60 uppercase tracking-widest font-black">Fill app with demo data</div>
            </div>
            <button onClick={function () { return onToggleSetting('demoMode'); }} className={"w-12 h-6 rounded-full transition-colors relative ".concat(settings.demoMode ? 'bg-emerald-500' : 'bg-slate-600')}>
              <div className={"w-4 h-4 bg-white rounded-full absolute top-1 transition-all ".concat(settings.demoMode ? 'left-7' : 'left-1')}/>
            </button>
          </div>

          {/* Fullscreen Action Button */}
          <button onClick={function () {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            }
            else {
                document.exitFullscreen();
            }
        }} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-3 group hover:bg-indigo-500 transition-all">
            <span className="text-lg">📺</span>
            Toggle Full Screen Now
          </button>



          {isDeveloper && (<div className="bg-slate-800/50 p-4 rounded-2xl border border-indigo-500/30 space-y-4">
              <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">Dev: Switch Persona</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={function () { onSwitchProfile('ADMIN'); setIsSettingsOpen(false); }} className="p-2 bg-purple-900/30 text-purple-400 border border-purple-500/30 rounded-lg text-[9px] font-bold uppercase hover:bg-purple-900/50">Admin</button>
                <button onClick={function () { onSwitchProfile('SCORER'); setIsSettingsOpen(false); }} className="p-2 bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-[9px] font-bold uppercase hover:bg-emerald-900/50">Scorer</button>
                <button onClick={function () { onSwitchProfile('UMPIRE'); setIsSettingsOpen(false); }} className="p-2 bg-yellow-900/30 text-yellow-400 border border-yellow-500/30 rounded-lg text-[9px] font-bold uppercase hover:bg-yellow-900/50">Umpire</button>
                <button onClick={function () { onSwitchProfile('PLAYER'); setIsSettingsOpen(false); }} className="p-2 bg-pink-900/30 text-pink-400 border border-pink-500/30 rounded-lg text-[9px] font-bold uppercase hover:bg-pink-900/50">Player</button>
                <button onClick={function () { onSwitchProfile('FAN'); setIsSettingsOpen(false); }} className="p-2 bg-slate-700/30 text-slate-400 border border-slate-600/30 rounded-lg text-[9px] font-bold uppercase hover:bg-slate-700/50">Fan</button>
                <button onClick={function () { onSwitchProfile('GUEST'); setIsSettingsOpen(false); }} className="p-2 bg-slate-500/30 text-slate-300 border border-slate-500/30 rounded-lg text-[9px] font-bold uppercase hover:bg-slate-500/50">Guest</button>
                <button onClick={function () { onSwitchProfile('CAPTAIN'); setIsSettingsOpen(false); }} className="p-2 col-span-2 bg-indigo-900/30 text-indigo-400 border border-indigo-500/30 rounded-lg text-[9px] font-bold uppercase hover:bg-indigo-900/50">Captain (Mock)</button>
              </div>

              <div className="h-px bg-indigo-500/20 my-4"/>
              <button onClick={function () { setShowDbConsole(true); setIsSettingsOpen(false); }} className="w-full py-4 bg-slate-900 border border-slate-700 hover:border-pink-500 text-slate-300 hover:text-pink-400 rounded-xl transition-all font-black uppercase text-[10px] tracking-[0.2em] shadow-lg group">
                <span className="mr-2 text-lg group-hover:animate-pulse">🗄️</span> Open Database Console
              </button>
              <div className="h-px bg-indigo-500/20 my-4"/>
              <DevTools_1.DevTools />
            </div>)}
        </div>
        <div className="mt-auto bg-slate-800/50 p-6 rounded-3xl text-center shrink-0">
          <div className="text-4xl mb-3">📱</div>
          <h3 className="font-bold text-white mb-2">Get Mobile App</h3>
          <p className="text-xs text-slate-400 mb-4">Install Cricket-Core on your device for best performance.</p>
          <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest">Install Now</button>
          <div className="pt-4 mt-4 border-t border-white/5 text-[9px] text-slate-500 font-bold uppercase tracking-widest">
            Created by mitchipoohdevs
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className={mainClasses}>

        <div className="max-w-[1920px] mx-auto h-full flex flex-col min-h-0 w-full">
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 md:px-6 md:py-8">
            {children}
          </div>
        </div>
      </main>
      {/* Developer Console Overlay */}
      {showDbConsole && (<react_1.default.Suspense fallback={null}>
            <DevDatabaseConsole_1.DevDatabaseConsole onClose={function () { return setShowDbConsole(false); }}/>
          </react_1.default.Suspense>)}
    </div>);
};
exports.Layout = Layout;
