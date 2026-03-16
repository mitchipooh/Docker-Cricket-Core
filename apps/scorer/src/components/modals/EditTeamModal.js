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
exports.EditTeamModal = void 0;
var react_1 = require("react");
var EditTeamModal = function (_a) {
    var team = _a.team, onSave = _a.onSave, onClose = _a.onClose, onDelete = _a.onDelete;
    var _b = (0, react_1.useState)({
        name: team.name,
        location: team.location || '',
        logoUrl: team.logoUrl || ''
    }), formData = _b[0], setFormData = _b[1];
    var _c = (0, react_1.useState)(false), uploading = _c[0], setUploading = _c[1];
    var handleSave = function () {
        onSave(formData);
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
                    var MAX_SIZE = 400;
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
                    var dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    setFormData(function (prev) { return (__assign(__assign({}, prev), { logoUrl: dataUrl })); });
                    setUploading(false);
                };
                img.src = (_a = readerEvent.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(file);
        }
    };
    return (<div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-[250] flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Edit Team</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-xl">✕</button>
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-24 h-24 bg-slate-100 rounded-3xl overflow-hidden mb-4 border-2 border-slate-100 relative group">
                            {formData.logoUrl ? (<img src={formData.logoUrl} className="w-full h-full object-cover" alt="Team Logo"/>) : (<div className="w-full h-full flex items-center justify-center text-slate-300 text-3xl font-black">
                                    {formData.name.charAt(0)}
                                </div>)}
                            <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10"/>
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-[10px] font-black uppercase">{uploading ? '...' : 'Upload'}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Team Name</label>
                        <input value={formData.name} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }} className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold text-sm outline-none focus:ring-2 ring-indigo-500" placeholder="Team Name"/>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Location / Home Ground</label>
                        <input value={formData.location} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { location: e.target.value })); }} className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold text-sm outline-none focus:ring-2 ring-indigo-500" placeholder="City or Stadium Name"/>
                    </div>

                    <div className="pt-6 flex flex-col gap-3">
                        <button onClick={handleSave} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-500 transition-all flex items-center justify-center gap-2">
                            <span>Save Changes</span>
                        </button>
                        <button onClick={function () {
            if (confirm("Delete ".concat(team.name, "? This will remove it from the organization and all tournaments."))) {
                onDelete();
                onClose();
            }
        }} className="w-full py-4 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-50 hover:rounded-2xl transition-all">
                            Remove Team
                        </button>
                    </div>
                </div>
            </div>
        </div>);
};
exports.EditTeamModal = EditTeamModal;
