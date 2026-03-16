"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMemberModal = void 0;
var react_1 = require("react");
var AddMemberModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, globalUsers = _a.globalUsers, orgTeams = _a.orgTeams, onAdd = _a.onAdd, existingMemberIds = _a.existingMemberIds;
    var _b = (0, react_1.useState)('SEARCH'), step = _b[0], setStep = _b[1];
    var _c = (0, react_1.useState)(''), searchQuery = _c[0], setSearchQuery = _c[1];
    var _d = (0, react_1.useState)('NAME'), searchType = _d[0], setSearchType = _d[1]; // NEW
    var _e = (0, react_1.useState)('ALL'), roleFilter = _e[0], setRoleFilter = _e[1]; // NEW
    var _f = (0, react_1.useState)(null), selectedUser = _f[0], setSelectedUser = _f[1];
    var _g = (0, react_1.useState)('Scorer'), selectedRole = _g[0], setSelectedRole = _g[1];
    var _h = (0, react_1.useState)(''), targetTeamId = _h[0], setTargetTeamId = _h[1];
    var filteredUsers = (0, react_1.useMemo)(function () {
        if (!searchQuery && roleFilter === 'ALL')
            return [];
        return globalUsers.filter(function (u) {
            if (existingMemberIds.includes(u.id))
                return false;
            // Role Filter
            if (roleFilter !== 'ALL' && u.role !== roleFilter)
                return false;
            // Search Query
            if (!searchQuery)
                return true; // If only filtering by role
            if (searchType === 'ID') {
                return u.id.toLowerCase().includes(searchQuery.toLowerCase());
            }
            return u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.handle.toLowerCase().includes(searchQuery.toLowerCase());
        }).slice(0, 10);
    }, [globalUsers, searchQuery, existingMemberIds, searchType, roleFilter]);
    if (!isOpen)
        return null;
    var handleUserSelect = function (user) {
        setSelectedUser(user);
        setStep('CONFIGURE');
        // Default logic: if they look like a player, default to Player role
        if (user.role === 'Player') {
            setSelectedRole('Player');
            if (orgTeams.length > 0)
                setTargetTeamId(orgTeams[0].id);
        }
        else if (user.role === 'Umpire') {
            setSelectedRole('Umpire');
        }
        else if (user.role === 'Scorer') {
            setSelectedRole('Scorer');
        }
    };
    var handleConfirm = function () {
        if (selectedUser) {
            onAdd(selectedUser, selectedRole, targetTeamId);
            onClose();
            // Reset
            setStep('SEARCH');
            setSearchQuery('');
            setSelectedUser(null);
        }
    };
    return (<div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[300] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 overflow-hidden flex flex-col max-h-[80vh]">

                {/* HEADER */}
                <div className="bg-slate-900 p-8 border-b border-slate-800 shrink-0">
                    <h3 className="text-2xl font-black text-white mb-1">Add Member</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                        {step === 'SEARCH' ? 'Search Global Directory' : 'Configure Role & Access'}
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50">
                    {step === 'SEARCH' ? (<div className="space-y-4">
                            {/* Search Controls */}
                            <div className="flex gap-2">
                                <select value={searchType} onChange={function (e) { return setSearchType(e.target.value); }} className="bg-slate-100 border-none rounded-xl px-3 py-4 text-xs font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-slate-200 transition-colors">
                                    <option value="NAME">Name / Handle</option>
                                    <option value="ID">User ID</option>
                                </select>
                                <select value={roleFilter} onChange={function (e) { return setRoleFilter(e.target.value); }} className="bg-slate-100 border-none rounded-xl px-3 py-4 text-xs font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-slate-200 transition-colors">
                                    <option value="ALL">Any Role</option>
                                    <option value="Administrator">Admins</option>
                                    <option value="Captain">Captains</option>
                                    <option value="Scorer">Scorers</option>
                                    <option value="Umpire">Umpires</option>
                                    <option value="Coach">Coaches</option>
                                    <option value="Player">Players</option>
                                </select>
                            </div>

                            <input value={searchQuery} onChange={function (e) { return setSearchQuery(e.target.value); }} placeholder={searchType === 'ID' ? "Enter exact User ID..." : "Search by name or handle..."} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-500 shadow-sm" autoFocus/>
                            <div className="space-y-2">
                                {filteredUsers.map(function (user) { return (<button key={user.id} onClick={function () { return handleUserSelect(user); }} className="w-full p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex items-center gap-4 text-left group">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-black text-slate-900 text-sm">{user.name}</div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase">{user.handle} • {user.role}</div>
                                        </div>
                                    </button>); })}
                                {searchQuery && filteredUsers.length === 0 && (<div className="text-center py-8 text-slate-400 text-xs font-bold uppercase tracking-widest">No users found</div>)}
                                {!searchQuery && roleFilter === 'ALL' && (<div className="text-center py-12 opacity-30">
                                        <span className="text-4xl mb-2 block">🔍</span>
                                        <p className="text-xs font-black uppercase">Type to search or select a filter</p>
                                    </div>)}
                            </div>
                        </div>) : (<div className="space-y-6">
                            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xl">
                                    {selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900">{selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.name}</h4>
                                    <p className="text-xs text-slate-500 font-bold">{selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.handle}</p>
                                </div>
                                <button onClick={function () { return setStep('SEARCH'); }} className="ml-auto text-xs font-bold text-slate-400 underline hover:text-indigo-600">Change</button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Assign Role</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Administrator', 'Scorer', 'Umpire', 'Coach', 'Player'].map(function (role) { return (<button key={role} onClick={function () { return setSelectedRole(role); }} className={"py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ".concat(selectedRole === role
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300')}>
                                            {role}
                                        </button>); })}
                                </div>
                            </div>

                            {selectedRole === 'Player' && (<div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                    <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-1">Assign to Squad (Optional)</label>
                                    <select value={targetTeamId} onChange={function (e) { return setTargetTeamId(e.target.value); }} className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 font-bold text-sm text-slate-900 outline-none focus:border-emerald-500">
                                        <option value="">-- Add to Org Roster Only --</option>
                                        {orgTeams.map(function (t) { return (<option key={t.id} value={t.id}>{t.name}</option>); })}
                                    </select>
                                    <p className="text-[9px] text-slate-400 px-1">Adding to a squad automatically creates a Player Profile in that team.</p>
                                </div>)}
                        </div>)}
                </div>

                <div className="p-6 border-t border-slate-200 bg-white flex gap-4">
                    <button onClick={onClose} className="flex-1 py-4 text-slate-400 font-black uppercase text-xs hover:text-slate-600 transition-all">Cancel</button>
                    {step === 'CONFIGURE' && (<button onClick={handleConfirm} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-indigo-500 transition-all">
                            Confirm Assignment
                        </button>)}
                </div>
            </div>
        </div>);
};
exports.AddMemberModal = AddMemberModal;
