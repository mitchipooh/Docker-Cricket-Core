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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserModal = void 0;
var react_1 = require("react");
var idGenerator_1 = require("@cricket/shared/utils/idGenerator");
var CreateUserModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, onCreate = _a.onCreate, organizationName = _a.organizationName;
    var _b = (0, react_1.useState)({
        name: '',
        handle: '@',
        password: '',
        role: 'Player',
        email: '' // Now REQUIRED
    }), formData = _b[0], setFormData = _b[1];
    if (!isOpen)
        return null;
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var emailRegex, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Validate required fields including email
                    if (!formData.name || !formData.handle || !formData.password || !formData.email) {
                        alert("Please fill in all required fields (Name, Handle, Email, Password).");
                        return [2 /*return*/];
                    }
                    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(formData.email)) {
                        alert("Please enter a valid email address.");
                        return [2 /*return*/];
                    }
                    newUser = {
                        id: (0, idGenerator_1.generateId)('user'), // Temporary ID, will be replaced by Supabase Auth ID
                        name: formData.name,
                        handle: formData.handle.startsWith('@') ? formData.handle : "@".concat(formData.handle),
                        role: formData.role,
                        email: formData.email, // Now required
                        createdAt: Date.now()
                    };
                    return [4 /*yield*/, onCreate(newUser, formData.password)];
                case 1:
                    _a.sent();
                    onClose();
                    setFormData({ name: '', handle: '@', password: '', role: 'Player', email: '' });
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900">Create New User</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">For {organizationName}</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center font-bold transition-all">✕</button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Full Name *</label>
                        <input value={formData.name} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-indigo-400 transition-colors" placeholder="e.g. John Smith"/>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">System Handle *</label>
                        <input value={formData.handle} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { handle: e.target.value })); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-indigo-400 transition-colors" placeholder="@johnsmith"/>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Email *</label>
                        <input type="email" value={formData.email} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { email: e.target.value })); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-indigo-400 transition-colors" placeholder="johnsmith@example.com"/>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Password *</label>
                        <input type="password" value={formData.password} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { password: e.target.value })); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-indigo-400 transition-colors" placeholder="Set a password"/>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Role</label>
                            <select value={formData.role} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { role: e.target.value })); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-indigo-400 transition-colors">
                                <option value="Administrator">Administrator</option>
                                <option value="Scorer">Scorer</option>
                                <option value="Captain">Captain</option>
                                <option value="Coach">Coach</option>
                                <option value="Player">Player</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button onClick={onClose} className="flex-1 py-3 text-slate-400 font-black uppercase text-xs hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
                    <button onClick={handleSubmit} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-black uppercase text-xs shadow-lg hover:bg-indigo-500 hover:shadow-xl hover:scale-[1.02] transition-all">Create Account</button>
                </div>
            </div>
        </div>);
};
exports.CreateUserModal = CreateUserModal;
