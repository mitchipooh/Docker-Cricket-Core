"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentView = void 0;
var react_1 = require("react");
var EditTournamentModal_1 = require("../modals/EditTournamentModal");
var TournamentView = function (_a) {
    var tournament = _a.tournament, organization = _a.organization, allTeams = _a.allTeams, fixtures = _a.fixtures, onBack = _a.onBack, onUpdateTournament = _a.onUpdateTournament, onDeleteTournament = _a.onDeleteTournament, onAddTeam = _a.onAddTeam, onRemoveTeam = _a.onRemoveTeam, isOrgAdmin = _a.isOrgAdmin, onSelectHubTeam = _a.onSelectHubTeam // NEW
    ;
    var _b = (0, react_1.useState)('FIXTURES'), activeTab = _b[0], setActiveTab = _b[1];
    var _c = (0, react_1.useState)(false), isAddTeamOpen = _c[0], setIsAddTeamOpen = _c[1];
    var _d = (0, react_1.useState)(false), isEditModalOpen = _d[0], setIsEditModalOpen = _d[1];
    var _e = (0, react_1.useState)(''), searchTeam = _e[0], setSearchTeam = _e[1];
    var tournamentTeams = allTeams.filter(function (t) { return (tournament.teamIds || []).includes(t.id); });
    var availableTeams = allTeams.filter(function (t) { return !(tournament.teamIds || []).includes(t.id) && organization.memberTeams.some(function (mt) { return mt.id === t.id; }); });
    var handleAddTeam = function (teamId) {
        onAddTeam(teamId);
        setIsAddTeamOpen(false);
    };
    return (<div className="h-full flex flex-col bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 p-6 md:p-10">
                <button onClick={onBack} className="mb-6 text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-colors">
                    ← Back to {organization.name}
                </button>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">{tournament.name}</h1>
                        <div className="flex gap-3">
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{tournament.format}</span>
                            <span className={"px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ".concat(tournament.status === 'Ongoing' ? 'bg-emerald-100 text-emerald-700' :
            tournament.status === 'Completed' ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-700')}>
                                {tournament.status}
                            </span>
                        </div>
                    </div>
                    {isOrgAdmin && (<div className="flex gap-2">
                            <button onClick={function () { return setIsEditModalOpen(true); }} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-slate-200 transition-all flex items-center gap-2">
                                ✏️ Edit
                            </button>
                            <button onClick={function () { return onUpdateTournament({ status: tournament.status === 'Ongoing' ? 'Completed' : 'Ongoing' }); }} className="bg-white border border-slate-200 text-slate-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-slate-50">
                                {tournament.status === 'Ongoing' ? 'End Tournament' : 'Reopen Tournament'}
                            </button>
                        </div>)}
                </div>
            </div>

            {isEditModalOpen && (<EditTournamentModal_1.EditTournamentModal tournament={tournament} onClose={function () { return setIsEditModalOpen(false); }} onSave={onUpdateTournament} onDelete={function () {
                if (onDeleteTournament) {
                    onDeleteTournament(tournament.id);
                    onBack();
                }
            }}/>)}

            {/* Tabs */}
            <div className="flex border-b border-slate-200 bg-white px-6 md:px-10 overflow-x-auto">
                {['FIXTURES', 'TEAMS', 'STANDINGS'].map(function (tab) { return (<button key={tab} onClick={function () { return setActiveTab(tab); }} className={"px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ".concat(activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600')}>
                        {tab}
                    </button>); })}
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                {activeTab === 'TEAMS' && (<div className="space-y-6">
                        {isOrgAdmin && (<div className="flex justify-end">
                                <button onClick={function () { return setIsAddTeamOpen(true); }} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-indigo-500 shadow-lg">
                                    + Add Team
                                </button>
                            </div>)}

                        {tournamentTeams.length === 0 ? (<div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold uppercase text-xs">
                                No teams linked to this tournament.
                            </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {tournamentTeams.map(function (team) { return (<div key={team.id} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
                                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-xl overflow-hidden">
                                            {team.logoUrl ? <img src={team.logoUrl} className="w-full h-full object-cover"/> : '🛡️'}
                                        </div>
                                        <div>
                                            <div className="font-black text-slate-900">{team.name}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{team.location || 'No Location'}</div>
                                        </div>
                                        <div className="ml-auto flex items-center gap-2">
                                            {onSelectHubTeam && isOrgAdmin && (<button onClick={function () { return onSelectHubTeam(team.id); }} className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all" title="Open Team Hub">
                                                    ⚡
                                                </button>)}
                                            {isOrgAdmin && onRemoveTeam && (<button onClick={function () { return onRemoveTeam(team.id); }} className="text-slate-300 hover:text-red-500 text-xl font-black">×</button>)}
                                        </div>
                                    </div>); })}
                            </div>)}
                    </div>)}

                {activeTab === 'FIXTURES' && (<div className="space-y-4">
                        <div className="p-12 text-center text-slate-400 font-bold uppercase text-xs">
                            Fixture management coming soon.
                        </div>
                    </div>)}
                {activeTab === 'STANDINGS' && (<div className="space-y-4">
                        <div className="p-12 text-center text-slate-400 font-bold uppercase text-xs">
                            Points table calculation pending.
                        </div>
                    </div>)}
            </div>

            {/* Add Team Modal */}
            {isAddTeamOpen && (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-[2rem] max-w-lg w-full shadow-2xl animate-in zoom-in-95">
                        <h2 className="text-xl font-black text-slate-900 mb-4">Add Team to {tournament.name}</h2>
                        <input value={searchTeam} onChange={function (e) { return setSearchTeam(e.target.value); }} placeholder="Search teams..." className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold text-sm mb-4 focus:ring-2 ring-indigo-500 outline-none"/>
                        <div className="max-h-60 overflow-y-auto space-y-2 mb-4 custom-scrollbar">
                            {availableTeams.filter(function (t) { return t.name.toLowerCase().includes(searchTeam.toLowerCase()); }).map(function (team) { return (<button key={team.id} onClick={function () { return handleAddTeam(team.id); }} className="w-full flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-xl transition-colors text-left group">
                                    <span className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-lg text-xs">🛡️</span>
                                    <span className="font-bold text-slate-700 group-hover:text-indigo-700">{team.name}</span>
                                </button>); })}
                            {availableTeams.length === 0 && (<div className="text-center text-slate-400 text-xs py-4 font-bold uppercase">No available teams found.</div>)}
                        </div>
                        <button onClick={function () { return setIsAddTeamOpen(false); }} className="w-full bg-slate-100 text-slate-500 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-200">Cancel</button>
                    </div>
                </div>)}
        </div>);
};
exports.TournamentView = TournamentView;
