"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedCodeModal = void 0;
var react_1 = require("react");
var EmbedCodeModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, activeOrg = _a.activeOrg, activeTournament = _a.activeTournament;
    var _b = (0, react_1.useState)('player_search'), selectedView = _b[0], setSelectedView = _b[1];
    var _c = (0, react_1.useState)(''), embedUrl = _c[0], setEmbedUrl = _c[1];
    var _d = (0, react_1.useState)(''), iframeCode = _d[0], setIframeCode = _d[1];
    (0, react_1.useEffect)(function () {
        var baseUrl = window.location.origin;
        var url = "".concat(baseUrl, "/?mode=embed&view=").concat(selectedView);
        if (activeOrg) {
            url += "&orgId=".concat(activeOrg.id);
        }
        if (activeTournament) {
            url += "&tournamentId=".concat(activeTournament.id);
        }
        // Context-aware defaults
        if (selectedView === 'team_list' && activeOrg) {
            url += "&id=".concat(activeOrg.id);
        }
        setEmbedUrl(url);
        setIframeCode("<iframe src=\"".concat(url, "\" width=\"100%\" height=\"800\" frameborder=\"0\" style=\"border:0; width:100%; height:800px; display:block;\"></iframe>"));
    }, [selectedView, activeOrg, activeTournament]);
    // Update selected view if context changes
    (0, react_1.useEffect)(function () {
        if (activeTournament)
            setSelectedView('standings');
        else if (activeOrg)
            setSelectedView('team_list');
        else
            setSelectedView('player_search');
    }, [activeOrg === null || activeOrg === void 0 ? void 0 : activeOrg.id, activeTournament === null || activeTournament === void 0 ? void 0 : activeTournament.id]);
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900">Embed & Share</h2>
                        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Generate links for your website</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 font-black transition-colors flex items-center justify-center">✕</button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Select View to Embed</label>
                        <select value={selectedView} onChange={function (e) { return setSelectedView(e.target.value); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-bold outline-none focus:border-indigo-500 transition-all">
                            <option value="player_search">Global Player Registry</option>
                            {activeOrg && <option value="team_list">Team List ({activeOrg.name})</option>}
                            {activeTournament && (<>
                                    <option value="tournament">Full Tournament Dashboard</option>
                                    <option value="standings">Standings Table</option>
                                    <option value="fixtures">Fixtures List</option>
                                    <option value="bracket">Knockout Bracket</option>
                                    <option value="groups">Groups Overview</option>
                                </>)}
                        </select>
                    </div>

                    <div className="bg-slate-900 rounded-xl p-6 text-white overflow-hidden relative group">
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">Direct Link</div>
                        <code className="text-sm font-mono break-all block mb-4">{embedUrl}</code>
                        <button onClick={function () { return navigator.clipboard.writeText(embedUrl); }} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors w-full">
                            Copy Link
                        </button>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 relative group">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">WordPress / Iframe Code</div>
                        <textarea readOnly value={iframeCode} className="w-full bg-white border border-slate-200 rounded-lg p-3 text-xs font-mono text-slate-600 h-24 focus:outline-none mb-4 resize-none"/>
                        <button onClick={function () { return navigator.clipboard.writeText(iframeCode); }} className="bg-white border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 text-slate-500 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors w-full">
                            Copy Code
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-400">Paste this code into any HTML page or WordPress site to display this view.</p>
                </div>
            </div>
        </div>);
};
exports.EmbedCodeModal = EmbedCodeModal;
