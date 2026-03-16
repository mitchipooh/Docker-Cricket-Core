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
exports.EditOrgModal = void 0;
var react_1 = require("react");
var UserProfileModal_1 = require("./UserProfileModal");
var EditOrgModal = function (_a) {
    var organization = _a.organization, onSave = _a.onSave, onClose = _a.onClose, currentUserProfile = _a.currentUserProfile;
    var _b = (0, react_1.useState)('DETAILS'), activeTab = _b[0], setActiveTab = _b[1];
    var _c = (0, react_1.useState)(null), viewingMember = _c[0], setViewingMember = _c[1];
    var _d = (0, react_1.useState)(false), uploading = _d[0], setUploading = _d[1];
    // Form Data
    var _e = (0, react_1.useState)({
        name: organization.name,
        description: organization.description || '',
        country: organization.country || '',
        location: organization.groundLocation || '',
        logoUrl: organization.logoUrl || '',
        isPublic: organization.isPublic !== undefined ? organization.isPublic : true,
        allowUserContent: organization.allowUserContent !== undefined ? organization.allowUserContent : true,
        allowMemberEditing: organization.allowMemberEditing !== undefined ? organization.allowMemberEditing : true,
        pushToGlobalFeed: organization.pushToGlobalFeed !== undefined ? organization.pushToGlobalFeed : true,
        managerName: organization.managerName || '',
        ownerName: organization.ownerName || '',
        establishedYear: organization.establishedYear || '',
        sponsors: organization.sponsors ? organization.sponsors.map(function (s) { return s.logoUrl || ''; }) : []
    }), formData = _e[0], setFormData = _e[1];
    var handleSaveDetails = function () {
        onSave(organization.id, {
            name: formData.name,
            description: formData.description,
            country: formData.country,
            groundLocation: formData.location,
            logoUrl: formData.logoUrl,
            isPublic: formData.isPublic,
            allowUserContent: formData.allowUserContent,
            allowMemberEditing: formData.allowMemberEditing,
            pushToGlobalFeed: formData.pushToGlobalFeed,
            managerName: formData.managerName,
            ownerName: formData.ownerName,
            establishedYear: formData.establishedYear ? Number(formData.establishedYear) : undefined,
            sponsors: formData.sponsors.filter(function (s) { return s.trim() !== ''; }).map(function (url, index) { return ({
                id: "sponsor-".concat(Date.now(), "-").concat(index),
                name: "Sponsor ".concat(index + 1),
                logoUrl: url,
                isActive: true,
                placements: ['SCOREBOARD_BOTTOM']
            }); })
        });
        onClose();
    };
    var handleLogoUpload = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            setUploading(true);
            var reader = new FileReader();
            reader.onload = function (readerEvent) {
                var _a;
                var img = new Image();
                img.onload = function () {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    // Resize logic: Max 800px width/height to save DB space
                    var MAX_SIZE = 800;
                    var width = img.width;
                    var height = img.height;
                    if (width > height) {
                        if (width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        }
                    }
                    else {
                        if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0, width, height);
                    // Compress to JPEG 0.7 quality
                    var dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    setFormData(function (prev) { return (__assign(__assign({}, prev), { logoUrl: dataUrl })); });
                    setUploading(false);
                };
                img.src = (_a = readerEvent.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(file);
        }
    };
    var handleRevoke = function (member) {
        // 1. Remove from members
        var updatedMembers = organization.members.filter(function (m) { return m.userId !== member.userId; });
        // 2. Update or Create Application with REJECTED status
        var updatedApplications = __spreadArray([], (organization.applications || []), true);
        var existingAppIndex = updatedApplications.findIndex(function (a) { return a.applicantId === member.userId; });
        if (existingAppIndex >= 0) {
            updatedApplications[existingAppIndex] = __assign(__assign({}, updatedApplications[existingAppIndex]), { status: 'REJECTED' });
        }
        else {
            // Create synthetic application record so they appear in rejected list
            var newApp = {
                id: "app-revoke-".concat(Date.now()),
                type: 'USER_JOIN',
                applicantId: member.userId,
                applicantName: member.name,
                applicantHandle: member.handle,
                status: 'REJECTED',
                timestamp: Date.now()
            };
            updatedApplications.push(newApp);
        }
        onSave(organization.id, {
            members: updatedMembers,
            applications: updatedApplications
        });
    };
    var handleRestore = function (app) {
        // 1. Update Application status
        var updatedApplications = (organization.applications || []).map(function (a) {
            return a.id === app.id ? __assign(__assign({}, a), { status: 'APPROVED' }) : a;
        });
        // 2. Add to Members (Default to Scorer)
        // Check if already member to prevent duplicates (edge case)
        var updatedMembers = __spreadArray([], organization.members, true);
        if (!updatedMembers.some(function (m) { return m.userId === app.applicantId; })) {
            updatedMembers.push({
                userId: app.applicantId,
                name: app.applicantName,
                handle: app.applicantHandle || '',
                role: 'Scorer',
                addedAt: Date.now()
            });
        }
        onSave(organization.id, {
            members: updatedMembers,
            applications: updatedApplications
        });
    };
    var admins = (0, react_1.useMemo)(function () { return organization.members.filter(function (m) { return m.role === 'Administrator'; }); }, [organization.members]);
    var scorers = (0, react_1.useMemo)(function () { return organization.members.filter(function (m) { return m.role === 'Scorer'; }); }, [organization.members]);
    var rejectedApps = (0, react_1.useMemo)(function () { return (organization.applications || []).filter(function (a) { return a.status === 'REJECTED'; }); }, [organization.applications]);
    var renderMemberRow = function (member) { return (<div key={member.userId} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm group hover:border-indigo-300 transition-all">
            <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={function () { return setViewingMember(member); }}>
                <div className={"w-10 h-10 rounded-full flex items-center justify-center font-black text-white shadow-sm ".concat(member.role === 'Administrator' ? 'bg-purple-600' : 'bg-teal-500')}>
                    {member.name.charAt(0)}
                </div>
                <div>
                    <div className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">{member.name}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">{member.handle}</div>
                </div>
            </div>

            <button onClick={function () { return handleRevoke(member); }} className="px-4 py-2 border border-red-100 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all">
                Revoke
            </button>
        </div>); };
    return (<div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[300] flex items-center justify-center p-4">
            <UserProfileModal_1.UserProfileModal member={viewingMember} isOpen={!!viewingMember} onClose={function () { return setViewingMember(null); }}/>

            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 overflow-hidden flex flex-col max-h-[85vh]">
                <div className="bg-slate-900 p-8 border-b border-slate-800 shrink-0">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-black text-white mb-2">Organization Settings</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Manage Entity & Access</p>
                        </div>
                        <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-slate-700 transition-all">✕</button>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={function () { return setActiveTab('DETAILS'); }} className={"px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ".concat(activeTab === 'DETAILS' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white')}>
                            Details
                        </button>
                        <button onClick={function () { return setActiveTab('ACCESS'); }} className={"px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ".concat(activeTab === 'ACCESS' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white')}>
                            Access Control
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50 p-8">
                    {activeTab === 'DETAILS' && (<div className="space-y-6">
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 relative group">
                                    {uploading ? (<div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>) : formData.logoUrl ? (<img src={formData.logoUrl} className="w-full h-full object-cover"/>) : (<span className="text-2xl text-slate-300 font-black">{formData.name.charAt(0)}</span>)}
                                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 opacity-0 cursor-pointer"/>
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <span className="text-white text-[9px] font-bold uppercase">{uploading ? 'Processing' : 'Change'}</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Organization Logo</h4>
                                    <p className="text-xs text-slate-500 mt-1">Tap image to upload. Auto-resized.</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Organization Name</label>
                                <input value={formData.name} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-500"/>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Region / Country</label>
                                    <input value={formData.country} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { country: e.target.value })); }} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-500"/>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Main Venue</label>
                                    <input value={formData.location} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { location: e.target.value })); }} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-500"/>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Description</label>
                                <textarea value={formData.description} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { description: e.target.value })); }} rows={3} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-500 resize-none"/>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Manager Name</label>
                                    <input value={formData.managerName} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { managerName: e.target.value })); }} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-500"/>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Owner Name</label>
                                    <input value={formData.ownerName} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { ownerName: e.target.value })); }} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-500"/>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Established Year</label>
                                    <input type="number" value={formData.establishedYear} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { establishedYear: e.target.value })); }} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-500"/>
                                </div>
                            </div>

                            {/* SPONSORS SECTION */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Sponsors (Max 5)</label>
                                <div className="space-y-2">
                                    {formData.sponsors.map(function (url, i) { return (<div key={i} className="flex gap-2">
                                            <input value={url} onChange={function (e) {
                    var newSponsors = __spreadArray([], formData.sponsors, true);
                    newSponsors[i] = e.target.value;
                    setFormData(__assign(__assign({}, formData), { sponsors: newSponsors }));
                }} placeholder="Enter Sponsor Logo URL" className="flex-1 bg-white border border-slate-200 rounded-xl px-5 py-3 font-bold text-sm outline-none focus:border-indigo-500"/>
                                            {url && <img src={url} className="w-10 h-10 object-contain rounded bg-slate-100 border border-slate-200"/>}
                                            <button onClick={function () {
                    var newSponsors = formData.sponsors.filter(function (_, idx) { return idx !== i; });
                    setFormData(__assign(__assign({}, formData), { sponsors: newSponsors }));
                }} className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center font-bold">✕</button>
                                        </div>); })}
                                    {formData.sponsors.length < 5 && (<button onClick={function () { return setFormData(__assign(__assign({}, formData), { sponsors: __spreadArray(__spreadArray([], formData.sponsors, true), [''], false) })); }} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">
                                            + Add Sponsor Logo
                                        </button>)}
                                </div>
                            </div>

                            {/* Visibility Toggle */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">Public Visibility</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Show in Global Feed</div>
                                    </div>
                                    <div onClick={function () { return setFormData(__assign(__assign({}, formData), { isPublic: !formData.isPublic })); }} className={"w-12 h-6 rounded-full relative cursor-pointer transition-colors ".concat(formData.isPublic ? 'bg-indigo-600' : 'bg-slate-300')}>
                                        <div className={"absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ".concat(formData.isPublic ? 'left-7' : 'left-1')}></div>
                                    </div>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">Allow User Posts</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enable Public Feed</div>
                                    </div>
                                    <div onClick={function () { return setFormData(__assign(__assign({}, formData), { allowUserContent: !formData.allowUserContent })); }} className={"w-12 h-6 rounded-full relative cursor-pointer transition-colors ".concat(formData.allowUserContent ? 'bg-emerald-500' : 'bg-slate-300')}>
                                        <div className={"absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ".concat(formData.allowUserContent ? 'left-7' : 'left-1')}></div>
                                    </div>
                                </div>

                                    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-slate-900 text-sm">Push Matches to Global Feed</div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Show Matches to All Users</div>
                                        </div>
                                        <div onClick={function () { return setFormData(__assign(__assign({}, formData), { pushToGlobalFeed: !formData.pushToGlobalFeed })); }} className={"w-12 h-6 rounded-full relative cursor-pointer transition-colors shrink-0 ".concat(formData.pushToGlobalFeed ? 'bg-blue-600' : 'bg-slate-300')}>
                                            <div className={"absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ".concat(formData.pushToGlobalFeed ? 'left-7' : 'left-1')}></div>
                                        </div>
                                    </div>
                                    {(currentUserProfile === null || currentUserProfile === void 0 ? void 0 : currentUserProfile.handle) === '@cz_admin' && (<div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between col-span-1 md:col-span-2">
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm">Council-wide Editing</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-indigo-600">Master Switch: Allow Member/Team Admins to Edit</div>
                                            </div>
                                            <div onClick={function () { return setFormData(__assign(__assign({}, formData), { allowMemberEditing: !formData.allowMemberEditing })); }} className={"w-12 h-6 rounded-full relative cursor-pointer transition-all ".concat(formData.allowMemberEditing ? 'bg-indigo-600' : 'bg-slate-300')}>
                                                <div className={"absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ".concat(formData.allowMemberEditing ? 'left-7' : 'left-1')}></div>
                                            </div>
                                        </div>)}
                                </div>

                                <button onClick={handleSaveDetails} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-slate-800 transition-all mt-4">Save Changes</button>
                            </div>)}

                            {/* Access Tab Content Remains Identical to previous implementation */}
                            {activeTab === 'ACCESS' && (<div className="space-y-8">
                                    <div>
                                        <h4 className="text-xs font-black text-purple-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-purple-600 rounded-full"></span> Administrators
                                        </h4>
                                        <div className="space-y-3">
                                            {admins.length > 0 ? admins.map(renderMemberRow) : <div className="text-slate-400 text-xs italic pl-4">No administrators defined.</div>}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-teal-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-teal-600 rounded-full"></span> Scorers
                                        </h4>
                                        <div className="space-y-3">
                                            {scorers.length > 0 ? scorers.map(renderMemberRow) : <div className="text-slate-400 text-xs italic pl-4">No scorers assigned.</div>}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span> Restricted / Rejected
                                        </h4>
                                        {rejectedApps.length === 0 ? (<div className="p-6 bg-slate-100 rounded-2xl border border-dashed border-slate-300 text-center text-slate-400 text-xs font-bold uppercase">
                                                No rejected applicants
                                            </div>) : (<div className="space-y-3">
                                                {rejectedApps.map(function (app) { return (<div key={app.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm opacity-75 hover:opacity-100 transition-opacity">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400">
                                                                {app.applicantName.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-sm text-slate-900">{app.applicantName}</div>
                                                                <div className="text-[10px] font-bold text-slate-400 uppercase">{new Date(app.timestamp).toLocaleDateString()}</div>
                                                            </div>
                                                        </div>
                                                        <button onClick={function () { return handleRestore(app); }} className="px-4 py-2 border border-emerald-100 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all">
                                                            Restore
                                                        </button>
                                                    </div>); })}
                                            </div>)}
                                    </div>
                                </div>)}
                        </div>
            </div>
            </div>);
};
exports.EditOrgModal = EditOrgModal;
