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
exports.PlayerProfileModal = void 0;
var react_1 = require("react");
var FieldView_1 = require("../analytics/FieldView");
var PitchView_1 = require("../analytics/PitchView");
var PlayerProfileModal = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j;
    var player = _a.player, isOpen = _a.isOpen, onClose = _a.onClose, isFollowed = _a.isFollowed, onToggleFollow = _a.onToggleFollow, _k = _a.allFixtures, allFixtures = _k === void 0 ? [] : _k, onViewMatch = _a.onViewMatch, onUpdatePlayer = _a.onUpdatePlayer, onDeletePlayer = _a.onDeletePlayer, onClaim = _a.onClaim;
    var _l = (0, react_1.useState)('SUMMARY'), viewMode = _l[0], setViewMode = _l[1];
    var _m = (0, react_1.useState)('BATTING'), activeTab = _m[0], setActiveTab = _m[1];
    var _o = (0, react_1.useState)('OFFICIAL'), statContext = _o[0], setStatContext = _o[1];
    var _p = (0, react_1.useState)(false), uploading = _p[0], setUploading = _p[1];
    var _q = (0, react_1.useState)(false), isEditing = _q[0], setIsEditing = _q[1];
    var _r = (0, react_1.useState)({
        name: '', role: '', bio: '', age: '', battingStyle: '', bowlingStyle: '', teamName: '', teamRole: '',
        nickname: '', favoritePlayer: '', favoriteWorldCupMoment: '', favoriteGround: ''
    }), editForm = _r[0], setEditForm = _r[1];
    var contextFixtures = (0, react_1.useMemo)(function () {
        return allFixtures.filter(function (f) {
            return statContext === 'OFFICIAL' ? f.isOfficial !== false : f.isOfficial === false;
        });
    }, [allFixtures, statContext]);
    var calculatedStats = (0, react_1.useMemo)(function () {
        if (!player)
            return { matches: 0, runs: 0, wickets: 0, ballsFaced: 0, ballsBowled: 0, runsConceded: 0, catches: 0, stumpings: 0, highestScore: 0, fours: 0, sixes: 0, fiveWickets: 0, threeWickets: 0, maidens: 0, ducks: 0, hundreds: 0, fifties: 0, bestBowling: '' };
        var runs = 0, wickets = 0, ballsFaced = 0, ballsBowled = 0, runsConceded = 0;
        var matches = 0, catches = 0, stumpings = 0;
        var highestScore = 0, fours = 0, sixes = 0;
        var fiveWickets = 0, threeWickets = 0, maidens = 0, ducks = 0, hundreds = 0, fifties = 0;
        var bestBowling = '';
        contextFixtures.forEach(function (f) {
            var _a, _b;
            if (!f.savedState)
                return;
            var isPlayerInMatch = ((_a = f.teamASquadIds) === null || _a === void 0 ? void 0 : _a.includes(player.id)) || ((_b = f.teamBSquadIds) === null || _b === void 0 ? void 0 : _b.includes(player.id)) || f.teamAId === player.teamId || f.teamBId === player.teamId;
            if (isPlayerInMatch)
                matches++;
            var history = f.savedState.history;
            var playerBatting = history.filter(function (b) { var _a; return b.strikerId === player.id && !((_a = b.commentary) === null || _a === void 0 ? void 0 : _a.startsWith('EVENT')); });
            var matchRuns = playerBatting.reduce(function (sum, b) { return sum + (b.runs || 0); }, 0);
            var legalBallsFaced = playerBatting.filter(function (b) { return b.extraType !== 'Wide'; }).length;
            if (legalBallsFaced > 0 || playerBatting.some(function (b) { return b.isWicket && b.outPlayerId === player.id; })) {
                ballsFaced += legalBallsFaced;
                runs += matchRuns;
                if (matchRuns > highestScore)
                    highestScore = matchRuns;
                if (matchRuns >= 100)
                    hundreds++;
                else if (matchRuns >= 50)
                    fifties++;
                if (matchRuns === 0 && playerBatting.some(function (b) { return b.isWicket && b.outPlayerId === player.id; }))
                    ducks++;
                fours += playerBatting.filter(function (b) { return b.runs === 4; }).length;
                sixes += playerBatting.filter(function (b) { return b.runs === 6; }).length;
            }
            var playerBowling = history.filter(function (b) { var _a; return b.bowlerId === player.id && !((_a = b.commentary) === null || _a === void 0 ? void 0 : _a.startsWith('EVENT')); });
            var matchWickets = playerBowling.filter(function (b) { return b.isWicket && b.creditBowler; }).length;
            var matchRunsConceded = playerBowling.reduce(function (sum, b) {
                var penalty = (b.extraType === 'Wide' || b.extraType === 'NoBall') ? 1 : 0;
                return sum + (b.runs || 0) + (b.extraRuns || 0) + penalty;
            }, 0);
            if (playerBowling.length > 0) {
                wickets += matchWickets;
                runsConceded += matchRunsConceded;
                ballsBowled += playerBowling.filter(function (b) { return b.extraType !== 'Wide' && b.extraType !== 'NoBall'; }).length;
                if (matchWickets >= 5)
                    fiveWickets++;
                else if (matchWickets >= 3)
                    threeWickets++;
            }
            catches += history.filter(function (b) { return b.isWicket && b.wicketType === 'Caught' && b.fielderId === player.id; }).length;
            stumpings += history.filter(function (b) { return b.isWicket && b.wicketType === 'Stumped' && b.fielderId === player.id; }).length;
        });
        return { matches: matches, runs: runs, wickets: wickets, ballsFaced: ballsFaced, ballsBowled: ballsBowled, runsConceded: runsConceded, catches: catches, stumpings: stumpings, highestScore: highestScore, fours: fours, sixes: sixes, fiveWickets: fiveWickets, threeWickets: threeWickets, maidens: maidens, ducks: ducks, hundreds: hundreds, fifties: fifties, bestBowling: bestBowling };
    }, [contextFixtures, player]);
    var relevantBalls = (0, react_1.useMemo)(function () {
        if (!player)
            return [];
        var balls = [];
        contextFixtures.forEach(function (f) {
            var _a;
            if ((_a = f.savedState) === null || _a === void 0 ? void 0 : _a.history) {
                f.savedState.history.forEach(function (b) {
                    if (b.strikerId === player.id || b.bowlerId === player.id)
                        balls.push(b);
                });
            }
        });
        return balls;
    }, [contextFixtures, player]);
    var pitchData = (0, react_1.useMemo)(function () { return relevantBalls.filter(function (b) { return player && b.strikerId === player.id && b.pitchCoords; }).map(function (b) { return ({ coords: b.pitchCoords, color: b.isWicket ? 'red' : b.runs >= 4 ? 'yellow' : 'green' }); }); }, [relevantBalls, player]);
    var shotData = (0, react_1.useMemo)(function () { return relevantBalls.filter(function (b) { return player && b.strikerId === player.id && b.shotCoords; }).map(function (b) { return ({ coords: b.shotCoords, color: b.runs === 4 ? 'indigo' : b.runs === 6 ? 'emerald' : 'yellow' }); }); }, [relevantBalls, player]);
    var battingAvg = calculatedStats.matches > 0 ? (calculatedStats.runs / Math.max(1, calculatedStats.matches - calculatedStats.ducks)).toFixed(1) : '0.0';
    var battingSR = calculatedStats.ballsFaced > 0 ? ((calculatedStats.runs / calculatedStats.ballsFaced) * 100).toFixed(1) : '0.0';
    var oversBowled = Math.floor(calculatedStats.ballsBowled / 6) + (calculatedStats.ballsBowled % 6) / 10;
    var bowlingEcon = calculatedStats.ballsBowled > 0 ? (calculatedStats.runsConceded / (calculatedStats.ballsBowled / 6)).toFixed(2) : '0.0';
    var bowlingAvg = calculatedStats.wickets > 0 ? (calculatedStats.runsConceded / calculatedStats.wickets).toFixed(1) : '0.0';
    if (!isOpen || !player)
        return null;
    var isKeeper = player.role === 'Wicket-keeper';
    var playerMatches = contextFixtures.filter(function (f) {
        var _a, _b;
        return f.teamAId === player.teamId || f.teamBId === player.teamId ||
            ((_a = f.teamASquadIds) === null || _a === void 0 ? void 0 : _a.includes(player.id)) || ((_b = f.teamBSquadIds) === null || _b === void 0 ? void 0 : _b.includes(player.id));
    }).sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
    var handleDetailedView = function () {
        setViewMode('DETAILED');
        if (player.role === 'Bowler')
            setActiveTab('BOWLING');
        else if (isKeeper)
            setActiveTab('KEEPING');
        else
            setActiveTab('BATTING');
    };
    var tabs = ['BATTING', 'BOWLING', 'SPATIAL', 'MATCHES'].filter(function (t) { if (t === 'KEEPING' && !isKeeper)
        return false; return true; });
    var handleEditToggle = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (isEditing) {
            if (onUpdatePlayer) {
                onUpdatePlayer({
                    name: editForm.name,
                    role: editForm.role,
                    bio: editForm.bio,
                    playerDetails: __assign(__assign({}, (player.playerDetails || { battingStyle: 'Right-hand', bowlingStyle: '', primaryRole: editForm.role, lookingForClub: false, isHireable: false })), { battingStyle: (editForm.battingStyle || 'Right-hand'), bowlingStyle: editForm.bowlingStyle || '', primaryRole: editForm.role, age: editForm.age, teamRole: editForm.teamRole, nickname: editForm.nickname, favoritePlayer: editForm.favoritePlayer, favoriteWorldCupMoment: editForm.favoriteWorldCupMoment, favoriteGround: editForm.favoriteGround })
                });
            }
            setIsEditing(false);
        }
        else {
            setEditForm({
                name: player.name,
                role: player.role,
                bio: player.bio || '',
                age: ((_a = player.playerDetails) === null || _a === void 0 ? void 0 : _a.age) || '',
                battingStyle: ((_b = player.playerDetails) === null || _b === void 0 ? void 0 : _b.battingStyle) || 'Right-hand',
                bowlingStyle: ((_c = player.playerDetails) === null || _c === void 0 ? void 0 : _c.bowlingStyle) || '',
                teamName: player.teamName || '',
                teamRole: ((_d = player.playerDetails) === null || _d === void 0 ? void 0 : _d.teamRole) || '',
                nickname: ((_e = player.playerDetails) === null || _e === void 0 ? void 0 : _e.nickname) || '',
                favoritePlayer: ((_f = player.playerDetails) === null || _f === void 0 ? void 0 : _f.favoritePlayer) || '',
                favoriteWorldCupMoment: ((_g = player.playerDetails) === null || _g === void 0 ? void 0 : _g.favoriteWorldCupMoment) || '',
                favoriteGround: ((_h = player.playerDetails) === null || _h === void 0 ? void 0 : _h.favoriteGround) || ''
            });
            setIsEditing(true);
        }
    };
    var handlePhotoUpload = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file && onUpdatePlayer) {
            setUploading(true);
            var reader = new FileReader();
            reader.onload = function (readerEvent) {
                var _a;
                var img = new Image();
                img.onload = function () {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
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
                    var dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    onUpdatePlayer({ photoUrl: dataUrl });
                    setUploading(false);
                };
                img.src = (_a = readerEvent.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(file);
        }
    };
    return (<div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[200] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#1A1A2E] w-full max-w-5xl md:h-[85vh] rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-slate-800 relative overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500">

                {/* LEFT PANE: MEDIA & BRANDING */}
                <div className="w-full md:w-1/2 relative bg-slate-950 overflow-hidden shrink-0 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-transparent to-transparent z-10"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/40 to-transparent z-10"/>

                    {player.highlightVideoUrl ? (<video src={player.highlightVideoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-90 scale-105"/>) : (<img src={player.photoUrl || "https://ui-avatars.com/api/?name=".concat(player.name, "&background=1A1A2E&color=fff&size=1024")} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={player.name}/>)}

                    {/* CLOSE/BACK BUTTONS */}
                    <div className="absolute top-8 left-8 z-30 flex gap-3">
                        <button onClick={onClose} className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full text-white flex items-center justify-center transition-all border border-white/10 shadow-2xl">←</button>
                    </div>

                    {/* PHOTO UPLOAD OVERLAY */}
                    {onUpdatePlayer && (<div className="absolute bottom-8 left-8 z-30">
                            <label className="bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-xl cursor-pointer text-[10px] font-black uppercase text-white tracking-widest transition-all">
                                {uploading ? 'Uploading...' : 'Change Photo'}
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden"/>
                            </label>
                        </div>)}
                </div>

                {/* RIGHT PANE: INFO CARD */}
                <div className="flex-1 bg-white relative flex flex-col min-w-0">

                    {/* TRADING CARD LOGO/HEADER */}
                    <div className="bg-[#FCE4EC] p-12 flex justify-between items-start shrink-0">
                        <div className="space-y-1">
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600">PLAYER</div>
                            <div className="text-3xl font-serif italic text-pink-800 leading-none">profile</div>
                        </div>
                        <div className="flex items-center gap-4">
                            {isEditing && (<div className="space-y-1 text-right">
                                    <div className="text-[9px] font-black text-pink-400 uppercase tracking-widest">Select Role:</div>
                                    <select value={editForm.role} onChange={function (e) { return setEditForm(__assign(__assign({}, editForm), { role: e.target.value })); }} className="bg-transparent border-b border-pink-300 font-black text-slate-800 uppercase focus:border-indigo-500 outline-none text-xs">
                                        <option value="Batsman">Batsman</option>
                                        <option value="Bowler">Bowler</option>
                                        <option value="All-rounder">All-rounder</option>
                                        <option value="Wicket-keeper">Wicket-keeper</option>
                                    </select>
                                </div>)}
                            <div className="w-12 h-12">
                                <svg viewBox="0 0 100 100" className="w-full h-full fill-pink-600 opacity-20">
                                    <rect x="10" y="10" width="80" height="80"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* MAIN INFO */}
                    <div className="px-12 py-8 flex-1 overflow-y-auto no-scrollbar bg-gradient-to-b from-[#FCE4EC] to-white">
                        <div className="mb-12">
                            <div className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-1">Name:</div>
                            {isEditing ? (<input value={editForm.name} onChange={function (e) { return setEditForm(__assign(__assign({}, editForm), { name: e.target.value })); }} className="text-5xl font-black text-slate-900 bg-transparent border-b-4 border-pink-400 focus:border-indigo-600 outline-none w-full uppercase"/>) : (<h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
                                    {player.name.split(' ').map(function (n, i) { return (<div key={i}>{n}</div>); })}
                                </h1>)}
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <div className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Age:</div>
                                {isEditing ? (<input value={editForm.age} onChange={function (e) { return setEditForm(__assign(__assign({}, editForm), { age: e.target.value })); }} className="bg-transparent border-b border-pink-300 font-black text-slate-800 uppercase focus:border-indigo-500 outline-none w-full"/>) : (<div className="text-xl font-black text-slate-800 uppercase">{((_b = player.playerDetails) === null || _b === void 0 ? void 0 : _b.age) || '26'}</div>)}
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Local Team:</div>
                                {isEditing ? (<input value={editForm.teamName} onChange={function (e) { return setEditForm(__assign(__assign({}, editForm), { teamName: e.target.value })); }} className="bg-transparent border-b border-pink-300 font-black text-slate-800 uppercase focus:border-indigo-500 outline-none w-full"/>) : (<div className="text-xl font-black text-slate-800 uppercase">{player.teamName || 'HOODS'}</div>)}
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Batting:</div>
                                {isEditing ? (<select value={editForm.battingStyle} onChange={function (e) { return setEditForm(__assign(__assign({}, editForm), { battingStyle: e.target.value })); }} className="bg-transparent border-b border-pink-300 font-black text-slate-800 uppercase focus:border-indigo-500 outline-none w-full">
                                        <option value="Right-hand">RIGHT-HANDED</option>
                                        <option value="Left-hand">LEFT-HANDED</option>
                                    </select>) : (<div className="text-xl font-black text-slate-800 uppercase">{((_c = player.playerDetails) === null || _c === void 0 ? void 0 : _c.battingStyle) || 'RIGHT-HANDED'}</div>)}
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Bowling:</div>
                                {isEditing ? (<input value={editForm.bowlingStyle} onChange={function (e) { return setEditForm(__assign(__assign({}, editForm), { bowlingStyle: e.target.value })); }} className="bg-transparent border-b border-pink-300 font-black text-slate-800 uppercase focus:border-indigo-500 outline-none w-full"/>) : (<div className="text-xl font-black text-slate-800 uppercase">{((_d = player.playerDetails) === null || _d === void 0 ? void 0 : _d.bowlingStyle) || 'RIGHT-ARM OFFSPIN'}</div>)}
                            </div>
                            <div className="space-y-1 col-span-2">
                                <div className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Role in Team:</div>
                                {isEditing ? (<select value={editForm.teamRole} onChange={function (e) { return setEditForm(__assign(__assign({}, editForm), { teamRole: e.target.value })); }} className="bg-transparent border-b border-pink-300 font-black text-slate-800 uppercase focus:border-indigo-500 outline-none w-full">
                                        <option value="">SELECT ROLE</option>
                                        <option value="Batter">BATTER</option>
                                        <option value="Bowler">BOWLER</option>
                                        <option value="Wicket-keeper">WICKET-KEEPER</option>
                                        <option value="Captain">CAPTAIN</option>
                                        <option value="Vice Captain">VICE CAPTAIN</option>
                                    </select>) : (<div className="text-xl font-black text-slate-800 uppercase">{((_e = player.playerDetails) === null || _e === void 0 ? void 0 : _e.teamRole) || 'PLAYER'}</div>)}
                            </div>

                            <div className="space-y-1 col-span-2">
                                <div className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Nickname:</div>
                                {isEditing ? (<input value={editForm.nickname} onChange={function (e) { return setEditForm(__assign(__assign({}, editForm), { nickname: e.target.value })); }} className="bg-transparent border-b border-pink-300 font-black text-slate-800 uppercase focus:border-indigo-500 outline-none w-full"/>) : (<div className="text-xl font-black text-slate-800 uppercase">{((_f = player.playerDetails) === null || _f === void 0 ? void 0 : _f.nickname) || '-'}</div>)}
                            </div>

                            <div className="space-y-1 col-span-2">
                                <div className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Favorite Player:</div>
                                {isEditing ? (<input value={editForm.favoritePlayer} onChange={function (e) { return setEditForm(__assign(__assign({}, editForm), { favoritePlayer: e.target.value })); }} className="bg-transparent border-b border-pink-300 font-black text-slate-800 uppercase focus:border-indigo-500 outline-none w-full"/>) : (<div className="text-base font-black text-slate-800 uppercase">{((_g = player.playerDetails) === null || _g === void 0 ? void 0 : _g.favoritePlayer) || '-'}</div>)}
                            </div>

                            <div className="space-y-1 col-span-2">
                                <div className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Favorite WC Moment:</div>
                                {isEditing ? (<input value={editForm.favoriteWorldCupMoment} onChange={function (e) { return setEditForm(__assign(__assign({}, editForm), { favoriteWorldCupMoment: e.target.value })); }} className="bg-transparent border-b border-pink-300 font-black text-slate-800 uppercase focus:border-indigo-500 outline-none w-full"/>) : (<div className="text-base font-black text-slate-800 uppercase">{((_h = player.playerDetails) === null || _h === void 0 ? void 0 : _h.favoriteWorldCupMoment) || '-'}</div>)}
                            </div>

                            <div className="space-y-1 col-span-2">
                                <div className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Favorite Ground:</div>
                                {isEditing ? (<input value={editForm.favoriteGround} onChange={function (e) { return setEditForm(__assign(__assign({}, editForm), { favoriteGround: e.target.value })); }} className="bg-transparent border-b border-pink-300 font-black text-slate-800 uppercase focus:border-indigo-500 outline-none w-full"/>) : (<div className="text-base font-black text-slate-800 uppercase">{((_j = player.playerDetails) === null || _j === void 0 ? void 0 : _j.favoriteGround) || '-'}</div>)}
                            </div>
                        </div>

                        {/* BIO SECTION */}
                        <div className="mt-12 pt-12 border-t border-pink-100">
                            <div className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-4 italic">Biography</div>
                            {isEditing ? (<textarea value={editForm.bio} onChange={function (e) { return setEditForm(__assign(__assign({}, editForm), { bio: e.target.value })); }} className="w-full bg-slate-50 rounded-2xl p-4 text-slate-600 text-sm border-2 border-pink-200 focus:border-indigo-500 outline-none h-32"/>) : (<p className="text-slate-600 text-sm font-medium leading-relaxed">
                                    {player.bio || "A vital part of the team, bringing consistency and high-level performance to every match."}
                                </p>)}
                        </div>
                    </div>

                    {/* FOOTER ACTIONS */}
                    <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 shrink-0">
                        <div className="flex gap-2">
                            {onUpdatePlayer && (<button onClick={handleEditToggle} className={"px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95 ".concat(isEditing ? 'bg-indigo-600 text-white' : 'bg-[#10B981] text-white')}>
                                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                                </button>)}
                            {isEditing && onDeletePlayer && (<button onClick={function () { return confirm("Delete ".concat(player.name, "?")) && onDeletePlayer(player.id); }} className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-red-600 text-white shadow-xl hover:bg-red-700 transition-all">
                                    Delete
                                </button>)}
                            {!isEditing && (<>
                                    {!player.userId && onClaim && (<button onClick={function () {
                    if (confirm("Are you sure this is you? This will send a claim request to the team admin.")) {
                        onClaim(player.id);
                    }
                }} className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white shadow-xl hover:bg-indigo-500 transition-all shadow-indigo-200">
                                            Claim Profile
                                        </button>)}
                                    <button onClick={onToggleFollow} className={"px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ".concat(isFollowed ? 'bg-[#10B981] text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300')}>
                                        {isFollowed ? 'Following' : 'Follow'}
                                    </button>
                                </>)}
                        </div>
                        <button onClick={handleDetailedView} className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-all flex items-center gap-2">
                            Analytics →
                        </button>
                    </div>

                    {/* DETAILED VIEW OVERLAY */}
                    {viewMode === 'DETAILED' && (<div className="absolute inset-0 bg-[#FCE4EC] z-50 flex flex-col p-12 overflow-y-auto custom-scrollbar animate-in slide-in-from-right-10 duration-500">
                            <div className="flex justify-between items-center mb-8 shrink-0">
                                <button onClick={function () { return setViewMode('SUMMARY'); }} className="text-pink-600 font-black text-sm flex items-center gap-2 hover:gap-4 transition-all">← Back to Profile</button>
                                <div className="bg-white/50 backdrop-blur-md p-1 rounded-xl flex gap-1">
                                    {['OFFICIAL', 'UNOFFICIAL'].map(function (ctx) { return (<button key={ctx} onClick={function () { return setStatContext(ctx); }} className={"px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all ".concat(statContext === ctx ? 'bg-pink-600 text-white shadow-lg' : 'text-pink-400 hover:bg-pink-100')}>{ctx}</button>); })}
                                </div>
                            </div>

                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6 shrink-0">
                                {tabs.map(function (tab) { return (<button key={tab} onClick={function () { return setActiveTab(tab); }} className={"px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ".concat(activeTab === tab ? 'bg-pink-600 text-white shadow-xl' : 'bg-white text-pink-400 hover:bg-pink-50')}>{tab}</button>); })}
                            </div>

                            <div className="grid grid-cols-1 gap-6 flex-1">
                                {activeTab === 'BATTING' && (<div className="bg-white rounded-[2rem] p-8 shadow-sm space-y-8">
                                        <div className="flex justify-between items-end border-b border-pink-50 pb-6">
                                            <div><div className="text-6xl font-black text-pink-600 leading-none">{calculatedStats.runs}</div><div className="text-xs font-bold text-pink-300 uppercase tracking-widest mt-2">Career Runs</div></div>
                                            <div className="text-right"><div className="text-4xl font-black text-slate-800 leading-none">{calculatedStats.highestScore || 0}</div><div className="text-[10px] font-bold text-pink-300 uppercase tracking-widest mt-1">High Score</div></div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            {[
                    { l: 'Average', v: battingAvg }, { l: 'SR', v: battingSR }, { l: '100s', v: calculatedStats.hundreds },
                    { l: '50s', v: calculatedStats.fifties }, { l: 'Ducks', v: calculatedStats.ducks }, { l: 'Fours', v: calculatedStats.fours }, { l: 'Sixes', v: calculatedStats.sixes }, { l: 'Matches', v: calculatedStats.matches }
                ].map(function (s, i) { return (<div key={i} className="bg-pink-50/50 p-6 rounded-2xl border border-pink-100/50">
                                                    <div className="text-2xl font-black text-slate-800">{s.v}</div>
                                                    <div className="text-[10px] text-pink-300 uppercase tracking-widest font-black">{s.l}</div>
                                                </div>); })}
                                        </div>
                                    </div>)}
                                {activeTab === 'BOWLING' && (<div className="bg-white rounded-[2rem] p-8 shadow-sm space-y-8">
                                        <div className="flex justify-between items-end border-b border-pink-50 pb-6">
                                            <div><div className="text-6xl font-black text-indigo-600 leading-none">{calculatedStats.wickets}</div><div className="text-xs font-bold text-indigo-300 uppercase tracking-widest mt-2">Career Wickets</div></div>
                                            <div className="text-right"><div className="text-4xl font-black text-slate-800 leading-none">{calculatedStats.bestBowling || '-/-'}</div><div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mt-1">Best Fig.</div></div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            {[
                    { l: 'Economy', v: bowlingEcon }, { l: 'Average', v: bowlingAvg }, { l: '5W Hauls', v: calculatedStats.fiveWickets },
                    { l: '3W Hauls', v: calculatedStats.threeWickets }, { l: 'Maidens', v: calculatedStats.maidens }, { l: 'Overs', v: oversBowled }
                ].map(function (s, i) { return (<div key={i} className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50">
                                                    <div className="text-2xl font-black text-slate-800">{s.v}</div>
                                                    <div className="text-[10px] text-indigo-300 uppercase tracking-widest font-black">{s.l}</div>
                                                </div>); })}
                                        </div>
                                    </div>)}
                                {activeTab === 'SPATIAL' && (<div className="bg-white rounded-[2rem] p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-pink-400 uppercase tracking-widest text-center">Pitch Dispersion</h4>
                                            <div className="bg-pink-50 p-4 rounded-3xl"><PitchView_1.PitchView deliveries={pitchData} readonly/></div>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-pink-400 uppercase tracking-widest text-center">Wagon Wheel</h4>
                                            <div className="bg-pink-50 p-4 rounded-3xl"><FieldView_1.FieldView shots={shotData} readonly/></div>
                                        </div>
                                    </div>)}
                                {activeTab === 'MATCHES' && (<div className="bg-white rounded-[2rem] p-8 shadow-sm space-y-4">
                                        <h3 className="text-sm font-black text-pink-600 uppercase tracking-widest mb-4">Match History</h3>
                                        <div className="space-y-3">
                                            {playerMatches.map(function (m) { return (<div key={m.id} onClick={function () { return onViewMatch && onViewMatch(m); }} className="p-4 rounded-2xl border border-pink-100 hover:bg-pink-50 transition-all cursor-pointer flex justify-between items-center group">
                                                    <div>
                                                        <div className="text-[10px] text-pink-300 font-bold uppercase">{new Date(m.date).toLocaleDateString()}</div>
                                                        <div className="font-bold text-slate-800 text-sm group-hover:text-pink-600 transition-colors">{m.teamAName} vs {m.teamBName}</div>
                                                    </div>
                                                    <div className={"text-[10px] font-black uppercase px-2 py-1 rounded ".concat(m.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600')}>{m.status}</div>
                                                </div>); })}
                                        </div>
                                    </div>)}
                            </div>
                        </div>)}
                </div>

                {/* EXIT BUTTON */}
                <button onClick={onClose} className="absolute top-8 right-8 z-[60] w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full text-white flex items-center justify-center transition-all border border-white/10 shadow-2xl md:hidden">✕</button>
            </div>
        </div>);
};
exports.PlayerProfileModal = PlayerProfileModal;
