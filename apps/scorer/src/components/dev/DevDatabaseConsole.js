"use strict";
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
exports.DevDatabaseConsole = void 0;
var react_1 = require("react");
var supabase_1 = require("@cricket/shared/lib/supabase");
var TABLES = [
    'organizations',
    'teams',
    'roster_players',
    'tournaments',
    'fixtures',
    'media_posts',
    'user_profiles',
    'app_state'
];
var DevDatabaseConsole = function (_a) {
    var onClose = _a.onClose;
    var _b = (0, react_1.useState)('organizations'), activeTable = _b[0], setActiveTable = _b[1];
    var _c = (0, react_1.useState)([]), data = _c[0], setData = _c[1];
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(''), search = _e[0], setSearch = _e[1];
    var _f = (0, react_1.useState)(''), error = _f[0], setError = _f[1];
    var _g = (0, react_1.useState)(null), editingItem = _g[0], setEditingItem = _g[1];
    var _h = (0, react_1.useState)(''), editJson = _h[0], setEditJson = _h[1];
    (0, react_1.useEffect)(function () {
        fetchData();
    }, [activeTable]);
    var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, rows, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    setError('');
                    return [4 /*yield*/, supabase_1.supabase.from(activeTable).select('*').limit(100)];
                case 1:
                    _a = _b.sent(), rows = _a.data, error = _a.error;
                    if (error) {
                        setError(error.message);
                        setData([]);
                    }
                    else {
                        setData(rows || []);
                    }
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are you sure you want to delete this row? This cannot be undone.'))
                        return [2 /*return*/];
                    return [4 /*yield*/, supabase_1.supabase.from(activeTable).delete().eq('id', id)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        alert('Delete failed: ' + error.message);
                    }
                    else {
                        setData(data.filter(function (d) { return d.id !== id; }));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        var parsed_1, error_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    parsed_1 = JSON.parse(editJson);
                    return [4 /*yield*/, supabase_1.supabase.from(activeTable).upsert(parsed_1)];
                case 1:
                    error_1 = (_a.sent()).error;
                    if (error_1)
                        throw error_1;
                    // Update local state
                    setData(data.map(function (d) { return d.id === parsed_1.id ? parsed_1 : d; }));
                    setEditingItem(null);
                    alert('Saved successfully!');
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    alert('Save failed: ' + e_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var filteredData = data.filter(function (row) {
        return JSON.stringify(row).toLowerCase().includes(search.toLowerCase());
    });
    return (<div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col text-white animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center font-black">db</div>
                    <h2 className="font-bold text-lg tracking-tight">Developer Database Console</h2>
                </div>
                <button onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold uppercase tracking-widest transition-all">
                    Close Console
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-2 overflow-y-auto">
                    <div className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-2 px-2">Tables</div>
                    {TABLES.map(function (table) { return (<button key={table} onClick={function () { return setActiveTable(table); }} className={"px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wide transition-all ".concat(activeTable === table ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white')}>
                            {table.replace('_', ' ')}
                        </button>); })}
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-slate-800 flex items-center gap-4 bg-slate-900/50">
                        <div className="relative flex-1 max-w-xl">
                            <span className="absolute left-3 top-2.5 text-slate-500">🔍</span>
                            <input type="text" placeholder="Search data..." value={search} onChange={function (e) { return setSearch(e.target.value); }} className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"/>
                        </div>
                        <div className="text-xs text-slate-400 font-bold uppercase">
                            {filteredData.length} records found
                        </div>
                        <button onClick={fetchData} className="ml-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold uppercase tracking-widest">
                            Refresh
                        </button>
                    </div>

                    {/* Table Area */}
                    <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                        {loading ? (<div className="flex items-center justify-center h-full text-slate-500 animate-pulse">Loading {activeTable}...</div>) : error ? (<div className="bg-red-900/20 text-red-500 p-4 rounded-xl border border-red-900/50 text-center">{error}</div>) : (<div className="grid gap-2">
                                {filteredData.map(function (row) { return (<div key={row.id} className="bg-slate-900 border border-slate-800 p-3 rounded-xl hover:border-slate-600 transition-colors group flex items-start gap-4">
                                        <div className="flex-1 min-w-0 font-mono text-xs text-slate-300 break-all">
                                            {/* Preview essential fields nicely */}
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-1.5 py-0.5 bg-slate-800 text-slate-500 rounded text-[9px] font-bold">{row.id}</span>
                                                {row.name && <span className="font-bold text-white text-sm">{row.name}</span>}
                                                {row.handle && <span className="text-indigo-400 font-bold">@{row.handle}</span>}
                                                {row.role && <span className="text-emerald-500 text-[10px] uppercase font-bold">{row.role}</span>}
                                            </div>
                                            <div className="opacity-60 line-clamp-1">{JSON.stringify(row)}</div>
                                        </div>

                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={function () { setEditingItem(row); setEditJson(JSON.stringify(row, null, 2)); }} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">
                                                Edit
                                            </button>
                                            <button onClick={function () { return handleDelete(row.id); }} className="px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">
                                                Delete
                                            </button>
                                        </div>
                                    </div>); })}
                                {filteredData.length === 0 && (<div className="text-center py-20 text-slate-500 text-sm">No records found.</div>)}
                            </div>)}
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editingItem && (<div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center p-6 backdrop-blur-sm">
                    <div className="bg-slate-900 w-full max-w-4xl h-[80vh] rounded-2xl border border-slate-700 shadow-2xl flex flex-col">
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                            <h3 className="font-bold text-white">Edit Record</h3>
                            <button onClick={function () { return setEditingItem(null); }} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <div className="flex-1 p-4 overflow-hidden">
                            <textarea value={editJson} onChange={function (e) { return setEditJson(e.target.value); }} className="w-full h-full bg-slate-950 text-emerald-400 font-mono text-sm p-4 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none resize-none custom-scrollbar" spellCheck={false}/>
                        </div>
                        <div className="p-4 border-t border-slate-800 flex justify-end gap-3 bg-slate-900 rounded-b-2xl">
                            <button onClick={function () { return setEditingItem(null); }} className="px-6 py-3 text-slate-400 font-bold hover:text-white uppercase text-xs tracking-widest">Cancel</button>
                            <button onClick={handleSave} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-lg">Save Changes</button>
                        </div>
                    </div>
                </div>)}
        </div>);
};
exports.DevDatabaseConsole = DevDatabaseConsole;
