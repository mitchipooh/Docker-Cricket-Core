"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UmpireProfile = void 0;
var react_1 = require("react");
var UmpireReportForm_1 = require("./UmpireReportForm");
var UmpireProfile = function (_a) {
    var _b, _c;
    var profile = _a.profile, fixtures = _a.fixtures, organizations = _a.organizations, allTeams = _a.allTeams, onBack = _a.onBack, onCreateFixture = _a.onCreateFixture, onSubmitReport = _a.onSubmitReport;
    var _d = (0, react_1.useState)('assigned'), activeView = _d[0], setActiveView = _d[1];
    var _e = (0, react_1.useState)(null), selectedFixture = _e[0], setSelectedFixture = _e[1];
    var _f = (0, react_1.useState)(false), showReportModal = _f[0], setShowReportModal = _f[1];
    // Find umpire's organization
    var umpireOrg = (0, react_1.useMemo)(function () {
        return organizations.find(function (org) {
            return org.type === 'UMPIRE_ASSOCIATION' &&
                org.members.some(function (m) { return m.userId === profile.id; });
        });
    }, [organizations, profile.id]);
    // Filter fixtures assigned to this umpire
    var assignedFixtures = (0, react_1.useMemo)(function () {
        return fixtures.filter(function (f) {
            var _a;
            return ((_a = f.assignedUmpireIds) === null || _a === void 0 ? void 0 : _a.includes(profile.id)) &&
                f.status !== 'Completed';
        });
    }, [fixtures, profile.id]);
    // Available fixtures (not yet assigned an umpire)
    var availableFixtures = (0, react_1.useMemo)(function () {
        return fixtures.filter(function (f) {
            return !f.assignedUmpireIds || f.assignedUmpireIds.length === 0;
        }).slice(0, 20); // Limit to 20 for performance
    }, [fixtures]);
    // Submitted reports
    var submittedReports = (0, react_1.useMemo)(function () {
        return fixtures.filter(function (f) {
            return f.umpireReport && f.umpireReport.submittedBy === profile.id;
        });
    }, [fixtures, profile.id]);
    var stats = {
        assigned: assignedFixtures.length,
        available: availableFixtures.length,
        submitted: submittedReports.length,
        matchesOfficiated: ((_b = profile.umpireDetails) === null || _b === void 0 ? void 0 : _b.matchesOfficiated) || 0
    };
    var renderFixtureCard = function (fixture, showReportButton) {
        if (showReportButton === void 0) { showReportButton = false; }
        var teamA = allTeams.find(function (t) { return t.id === fixture.teamAId; });
        var teamB = allTeams.find(function (t) { return t.id === fixture.teamBId; });
        return (<div key={fixture.id} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-300 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg">
                            {(teamA === null || teamA === void 0 ? void 0 : teamA.name.charAt(0)) || 'A'}
                        </div>
                        <div>
                            <h3 className="font-black text-slate-900">{fixture.teamAName}</h3>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">vs {fixture.teamBName}</p>
                        </div>
                    </div>
                    <span className={"px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ".concat(fixture.status === 'Scheduled' ? 'bg-blue-100 text-blue-600' :
                fixture.status === 'Live' ? 'bg-green-100 text-green-600' :
                    'bg-slate-100 text-slate-600')}>
                        {fixture.status}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-50 p-3 rounded-xl">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Date</p>
                        <p className="text-sm font-bold text-slate-900">{new Date(fixture.date).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Venue</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{fixture.venue}</p>
                    </div>
                </div>

                {showReportButton && fixture.status === 'Completed' && (<button onClick={function () {
                    setSelectedFixture(fixture);
                    setShowReportModal(true);
                }} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all">
                        Submit Match Report
                    </button>)}
            </div>);
    };
    return (<div className="max-w-6xl mx-auto p-6 md:p-12 min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div>
                    <button onClick={onBack} className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-4 hover:text-indigo-500 transition-colors">
                        ← Back
                    </button>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Umpire Hub</h1>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">
                        {profile.name} • {((_c = profile.umpireDetails) === null || _c === void 0 ? void 0 : _c.certificationLevel) || 'Umpire'}
                    </p>
                    {umpireOrg && (<p className="text-indigo-600 font-bold text-sm mt-1">{umpireOrg.name}</p>)}
                </div>

                <button onClick={onCreateFixture} className="bg-emerald-500 text-white px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-lg">
                    + Create Fixture
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-indigo-600 rounded-2xl p-4 text-white shadow-lg">
                    <p className="text-3xl font-black">{stats.assigned}</p>
                    <p className="text-[9px] uppercase tracking-widest opacity-80 font-bold">Assigned Fixtures</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                    <p className="text-2xl font-black text-slate-800">{stats.available}</p>
                    <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Available</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                    <p className="text-2xl font-black text-slate-800">{stats.submitted}</p>
                    <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Reports Submitted</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                    <p className="text-2xl font-black text-slate-800">{stats.matchesOfficiated}</p>
                    <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Career Matches</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner mb-8">
                <button onClick={function () { return setActiveView('assigned'); }} className={"flex-1 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ".concat(activeView === 'assigned' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600')}>
                    My Fixtures ({stats.assigned})
                </button>
                <button onClick={function () { return setActiveView('available'); }} className={"flex-1 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ".concat(activeView === 'available' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600')}>
                    Available ({stats.available})
                </button>
                <button onClick={function () { return setActiveView('submitted'); }} className={"flex-1 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ".concat(activeView === 'submitted' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600')}>
                    Submitted ({stats.submitted})
                </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeView === 'assigned' && assignedFixtures.map(function (f) { return renderFixtureCard(f, true); })}
                {activeView === 'available' && availableFixtures.map(function (f) { return renderFixtureCard(f, false); })}
                {activeView === 'submitted' && submittedReports.map(function (f) { return renderFixtureCard(f, false); })}
            </div>

            {/* Empty States */}
            {activeView === 'assigned' && assignedFixtures.length === 0 && (<div className="text-center py-20">
                    <p className="text-6xl mb-4">📋</p>
                    <h3 className="text-xl font-black text-slate-900 mb-2">No Assigned Fixtures</h3>
                    <p className="text-slate-500 text-sm">You don't have any fixtures assigned yet.</p>
                </div>)}

            {activeView === 'available' && availableFixtures.length === 0 && (<div className="text-center py-20">
                    <p className="text-6xl mb-4">✅</p>
                    <h3 className="text-xl font-black text-slate-900 mb-2">All Fixtures Covered</h3>
                    <p className="text-slate-500 text-sm">There are no available fixtures at the moment.</p>
                </div>)}

            {activeView === 'submitted' && submittedReports.length === 0 && (<div className="text-center py-20">
                    <p className="text-6xl mb-4">📝</p>
                    <h3 className="text-xl font-black text-slate-900 mb-2">No Reports Submitted</h3>
                    <p className="text-slate-500 text-sm">Submit your first match report after officiating a match.</p>
                </div>)}

            {/* Report Modal */}
            {showReportModal && selectedFixture && (<div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[3rem] p-10 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Submit Match Report</h2>
                            <button onClick={function () { return setShowReportModal(false); }} className="text-slate-400 hover:text-slate-600 text-2xl font-black">✕</button>
                        </div>

                        <UmpireReportForm_1.UmpireReportForm fixture={selectedFixture} umpireId={profile.id} umpireName={profile.name} organizationId={(umpireOrg === null || umpireOrg === void 0 ? void 0 : umpireOrg.id) || 'GLOBAL'} onSubmit={function (report) {
                onSubmitReport(report);
                setShowReportModal(false);
                setSelectedFixture(null);
            }} onCancel={function () { return setShowReportModal(false); }}/>
                    </div>
                </div>)}
        </div>);
};
exports.UmpireProfile = UmpireProfile;
