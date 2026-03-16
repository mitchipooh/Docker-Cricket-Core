"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferMarket = void 0;
var react_1 = require("react");
var ContractModal_1 = require("./ContractModal");
var TransferMarket = function (_a) {
    var players = _a.players, myTeams = _a.myTeams, onTransfer = _a.onTransfer, onBack = _a.onBack;
    var _b = (0, react_1.useState)('ALL'), filterRole = _b[0], setFilterRole = _b[1];
    var _c = (0, react_1.useState)(''), searchQuery = _c[0], setSearchQuery = _c[1];
    var _d = (0, react_1.useState)(null), selectedPlayer = _d[0], setSelectedPlayer = _d[1];
    // Filter Logic: Show players who are 'lookingForClub' OR 'isHireable'
    var marketPlayers = (0, react_1.useMemo)(function () {
        return players
            .filter(function (p) { var _a, _b; return ((_a = p.playerDetails) === null || _a === void 0 ? void 0 : _a.lookingForClub) || ((_b = p.playerDetails) === null || _b === void 0 ? void 0 : _b.isHireable); })
            .filter(function (p) {
            if (filterRole !== 'ALL' && p.role !== filterRole)
                return false;
            if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                return false;
            return true;
        })
            .sort(function (a, b) { return b.stats.runs + (b.stats.wickets * 20) - (a.stats.runs + (a.stats.wickets * 20)); }); // Sort by "Value" roughly
    }, [players, filterRole, searchQuery]);
    return (<div className="animate-in fade-in duration-500 pb-20">
      <ContractModal_1.ContractModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={function () { return setSelectedPlayer(null); }} myTeams={myTeams} onSign={onTransfer}/>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
         <div className="flex items-center gap-6">
            <button onClick={onBack} className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-black transition-all shadow-sm">←</button>
            <div>
               <h1 className="text-4xl font-black text-slate-900 tracking-tight">Transfer Market</h1>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Scout & Sign Talent</p>
            </div>
         </div>
         
         <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto max-w-full">
            {['ALL', 'Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper'].map(function (role) { return (<button key={role} onClick={function () { return setFilterRole(role); }} className={"px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ".concat(filterRole === role ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50')}>
                 {role}
               </button>); })}
         </div>
      </div>

      <div className="mb-8">
         <input value={searchQuery} onChange={function (e) { return setSearchQuery(e.target.value); }} placeholder="Search players..." className="w-full bg-white border border-slate-200 rounded-[2rem] px-8 py-5 font-bold outline-none shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all text-sm"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {marketPlayers.map(function (player) {
            var _a;
            return (<div key={player.id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex flex-col overflow-hidden group">
               {/* Card Header */}
               <div className="h-24 bg-slate-900 relative">
                  <div className={"absolute inset-0 bg-gradient-to-br opacity-80 ".concat(player.role === 'Batsman' ? 'from-indigo-600 to-blue-900' : player.role === 'Bowler' ? 'from-emerald-600 to-teal-900' : 'from-purple-600 to-pink-900')}></div>
                  <div className="absolute -bottom-10 left-6">
                     <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg">
                        <img src={player.photoUrl || "https://ui-avatars.com/api/?name=".concat(player.name)} className="w-full h-full rounded-xl object-cover"/>
                     </div>
                  </div>
                  <div className="absolute top-4 right-4">
                     <span className="bg-black/30 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">
                        {((_a = player.playerDetails) === null || _a === void 0 ? void 0 : _a.isHireable) ? 'For Hire' : 'Free Agent'}
                     </span>
                  </div>
               </div>

               {/* Card Body */}
               <div className="pt-12 px-6 pb-6 flex-1 flex flex-col">
                  <div>
                     <h3 className="text-lg font-black text-slate-900 leading-tight">{player.name}</h3>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{player.role}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 my-6">
                     <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                        <div className="text-xl font-black text-slate-900">{player.stats.runs}</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Runs</div>
                     </div>
                     <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                        <div className="text-xl font-black text-slate-900">{player.stats.wickets}</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Wkts</div>
                     </div>
                  </div>

                  <div className="mt-auto">
                     <button onClick={function () { return setSelectedPlayer(player); }} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-indigo-600 transition-all shadow-lg">
                        Initiate Offer
                     </button>
                  </div>
               </div>
            </div>);
        })}
         
         {marketPlayers.length === 0 && (<div className="col-span-full py-20 text-center">
               <div className="text-6xl mb-4 opacity-20">🕵️</div>
               <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No players found matching your criteria.</p>
            </div>)}
      </div>
    </div>);
};
exports.TransferMarket = TransferMarket;
