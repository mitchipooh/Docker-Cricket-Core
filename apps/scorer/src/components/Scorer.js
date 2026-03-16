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
exports.Scorer = void 0;
var react_1 = require("react");
var shared_1 = require("@cricket/shared");
var shared_2 = require("@cricket/shared");
var shared_3 = require("@cricket/shared");
var useMatchEngine_1 = require("@cricket/shared/scoring/hooks/useMatchEngine");
var useScoringPad_1 = require("@cricket/shared/scoring/hooks/useScoringPad");
var useMatchRules_1 = require("@cricket/shared/scoring/hooks/useMatchRules");
var useDerivedStats_1 = require("@cricket/shared/scoring/hooks/useDerivedStats");
var useWicketFlow_1 = require("@cricket/shared/scoring/hooks/useWicketFlow");
var useInningsOverRateTimer_1 = require("@cricket/shared/scoring/hooks/useInningsOverRateTimer");
// Views
var MobileScorerLayout_1 = require("./scorer-views/MobileScorerLayout");
var MatchResultSummary_1 = require("../display/MatchResultSummary");
var FullMatchScorecard_1 = require("../display/FullMatchScorecard");
var BroadcasterView_1 = require("../media/BroadcasterView");
// Modals
var ShotEntryModal_1 = require("../analytics/ShotEntryModal");
var WicketModal_1 = require("../modals/WicketModal");
var EndOfOverModal_1 = require("../modals/EndOfOverModal");
var MatchStartModal_1 = require("../modals/MatchStartModal");
var NewBatterModal_1 = require("../modals/NewBatterModal");
var PlayerEditModal_1 = require("../modals/PlayerEditModal");
var BallCorrectionModal_1 = require("../modals/BallCorrectionModal");
var CameraModal_1 = require("../modals/CameraModal");
var OfficialsModal_1 = require("../modals/OfficialsModal");
var inningsEngine_1 = require("@cricket/shared/scoring/engines/inningsEngine");
var useAudioCommentary_1 = require("@cricket/shared/hooks/useAudioCommentary");
var AudioCommentaryToggle_1 = require("./AudioCommentaryToggle");
var AudioSettingsModal_1 = require("./AudioSettingsModal");
var Scorer = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var match = _a.match, teams = _a.teams, userRole = _a.userRole, onUpdateMatchState = _a.onUpdateMatchState, onComplete = _a.onComplete, onAddMediaPost = _a.onAddMediaPost, onExit = _a.onExit, currentUserId = _a.currentUserId, organizations = _a.organizations, onUpdateOrgs = _a.onUpdateOrgs, _u = _a.readOnly, readOnly = _u === void 0 ? false : _u;
    // -- State Initialization --
    var initialMatchState = match.savedState || {
        battingTeamId: match.teamAId,
        bowlingTeamId: match.teamBId,
        score: 0,
        wickets: 0,
        totalBalls: 0,
        strikerId: ((_b = match.initialPlayers) === null || _b === void 0 ? void 0 : _b.strikerId) || '',
        nonStrikerId: ((_c = match.initialPlayers) === null || _c === void 0 ? void 0 : _c.nonStrikerId) || '',
        bowlerId: ((_d = match.initialPlayers) === null || _d === void 0 ? void 0 : _d.bowlerId) || '',
        innings: 1,
        history: [],
        inningsScores: [],
        isCompleted: false,
        matchTimer: { startTime: null, totalAllowances: 0, isPaused: false, lastPauseTime: null },
        umpires: match.umpires || []
    };
    var engine = (0, useMatchEngine_1.useMatchEngine)(initialMatchState);
    var pad = (0, useScoringPad_1.useScoringPad)();
    var wicket = (0, useWicketFlow_1.useWicketFlow)();
    var battingTeam = teams.find(function (t) { return t.id === engine.state.battingTeamId; });
    var bowlingTeam = teams.find(function (t) { return t.id === engine.state.bowlingTeamId; });
    var rules = (0, useMatchRules_1.useMatchRules)(match, engine.state, bowlingTeam);
    var stats = (0, useDerivedStats_1.useDerivedStats)(engine.state, rules.totalOversAllowed, battingTeam, bowlingTeam);
    var timer = (0, useInningsOverRateTimer_1.useInningsOverRateTimer)(engine.state.matchTimer.startTime, engine.state.totalBalls, !engine.state.isCompleted && !engine.state.matchTimer.isPaused);
    // -- UI State --
    var _v = (0, react_1.useState)(false), showBroadcaster = _v[0], setShowBroadcaster = _v[1];
    var _w = (0, react_1.useState)(false), showShotModal = _w[0], setShowShotModal = _w[1];
    var _x = (0, react_1.useState)(!engine.state.strikerId && !match.savedState), showStartModal = _x[0], setShowStartModal = _x[1];
    var _y = (0, react_1.useState)(false), showSubModal = _y[0], setShowSubModal = _y[1];
    var _z = (0, react_1.useState)(false), isCameraOpen = _z[0], setIsCameraOpen = _z[1];
    var _0 = (0, react_1.useState)(false), autoAnalytics = _0[0], setAutoAnalytics = _0[1];
    var _1 = (0, react_1.useState)(false), showOfficialsModal = _1[0], setShowOfficialsModal = _1[1];
    // Audio Commentary
    var audioCommentary = (0, useAudioCommentary_1.useAudioCommentary)();
    var _2 = (0, react_1.useState)(false), showAudioSettings = _2[0], setShowAudioSettings = _2[1];
    var _3 = (0, react_1.useState)('SCORING'), mobileTab = _3[0], setMobileTab = _3[1];
    var _4 = (0, react_1.useState)({ open: false, reason: null }), inningsBreak = _4[0], setInningsBreak = _4[1];
    var _5 = (0, react_1.useState)(null), correctionTarget = _5[0], setCorrectionTarget = _5[1];
    var _6 = (0, react_1.useState)(null), editingBall = _6[0], setEditingBall = _6[1];
    var _7 = (0, react_1.useState)(null), newBatterTarget = _7[0], setNewBatterTarget = _7[1];
    var _8 = (0, react_1.useState)('SUMMARY'), postMatchView = _8[0], setPostMatchView = _8[1];
    var isAuthorized = userRole === 'Scorer' || userRole === 'Administrator' || (userRole === 'Umpire' && ((_e = match.umpires) === null || _e === void 0 ? void 0 : _e.includes(currentUserId)));
    var isLockedByOther = engine.state.activeScorerId && engine.state.activeScorerId !== currentUserId;
    var isReadOnly = !isAuthorized || isLockedByOther;
    var claimLock = function () {
        if (!engine.state.activeScorerId && currentUserId) {
            engine.updateMetadata({ activeScorerId: currentUserId });
        }
    };
    // Determine available officials from the relevant organization
    var availableOfficials = (0, react_1.useMemo)(function () {
        // Find org for this fixture
        var hostOrg = organizations.find(function (o) { return o.fixtures.some(function (f) { return f.id === match.id; }); });
        if (!hostOrg)
            return [];
        return hostOrg.members
            .filter(function (m) { return m.role === 'Umpire' || m.role === 'Match Official'; })
            .map(function (m) { return ({ id: m.userId, name: m.name, handle: m.handle, role: 'Umpire', createdAt: m.addedAt }); });
    }, [organizations, match.id]);
    // -- Derived Stats --
    var calculateScore = function () {
        var battingTeamId = engine.state.battingTeamId;
        var bowlingTeamId = engine.state.bowlingTeamId;
        // Use Test Engine helpers if available/imported, else direct calculation
        var inningsScores = engine.state.inningsScores || [];
        var leadText = '';
        var targetText = '';
        var battingCompleted = inningsScores.filter(function (is) { return is.teamId === battingTeamId && is.isComplete; }).reduce(function (a, b) { return a + b.score; }, 0);
        var bowlingCompleted = inningsScores.filter(function (is) { return is.teamId === bowlingTeamId && is.isComplete; }).reduce(function (a, b) { return a + b.score; }, 0);
        var currentScore = engine.state.score;
        var battingTotal = battingCompleted + currentScore;
        var bowlingTotal = bowlingCompleted + (engine.state.innings === 4 ? 0 : 0); // Logic depends on current state
        // Simplified Lead/Trail Logic
        if (engine.state.innings === 1) {
            // No lead/trail yet
        }
        else if (engine.state.innings === 2) {
            var inn1 = inningsScores.find(function (is) { return is.innings === 1; });
            if (inn1) {
                var lead = battingTotal - inn1.score;
                if (lead > 0)
                    leadText = "Lead by ".concat(lead);
                else if (lead < 0)
                    leadText = "Trail by ".concat(Math.abs(lead));
                else
                    leadText = 'Scores Level';
            }
        }
        else if (engine.state.innings === 3) {
            // Aggregate check
            var lead = battingTotal - bowlingCompleted; // Bowling team has 1 completed (usually)
            // Correct logic: Team A (Batting) has Inn1 + Curr. Team B has Inn1.
            if (lead > 0)
                leadText = "Lead by ".concat(lead);
            else
                leadText = "Trail by ".concat(Math.abs(lead));
        }
        else if (engine.state.innings === 4) {
            var target = (bowlingCompleted - battingCompleted) + 1;
            var needed = target - currentScore;
            targetText = "Target: ".concat(target);
            if (needed > 0)
                leadText = "Need ".concat(needed, " to win");
            else
                leadText = "Win by ".concat(10 - engine.state.wickets, " wickets");
        }
        return { leadText: leadText, targetText: targetText };
    };
    var _9 = calculateScore(), leadText = _9.leadText, targetText = _9.targetText;
    // -- Handlers --
    var handleLastHourTrigger = function () {
        engine.triggerLastHour();
    };
    (0, react_1.useEffect)(function () {
        var params = new URLSearchParams(window.location.search);
        var tab = params.get('tab');
        if (tab === 'SUMMARY') {
            setMobileTab('SUMMARY');
        }
    }, []);
    (0, react_1.useEffect)(function () {
        onUpdateMatchState(match.id, engine.state);
    }, [engine.state, match.id]);
    (0, react_1.useEffect)(function () {
        var reason = (0, inningsEngine_1.checkEndOfInnings)(engine.state, rules.totalOversAllowed, battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.players.length, match.allowFlexibleSquad, match.format);
        if (reason) {
            setInningsBreak({ open: true, reason: reason });
        }
        else if (!engine.state.isCompleted && !showStartModal) {
            // Auto-prompt for new batter if someone is missing and innings is NOT over
            if (!engine.state.strikerId)
                setNewBatterTarget('Striker');
            else if (!engine.state.nonStrikerId)
                setNewBatterTarget('NonStriker');
        }
    }, [engine.state, rules.totalOversAllowed, battingTeam, match, showStartModal]);
    var handleRun = function (runs) {
        if (isReadOnly)
            return;
        claimLock();
        engine.applyBall({ runs: runs });
        // Audio commentary with player context
        if (audioCommentary.enabled) {
            var striker_1 = battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.players.find(function (p) { return p.id === engine.state.strikerId; });
            var bowler = bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.players.find(function (p) { return p.id === engine.state.bowlerId; });
            var commentary = (0, shared_2.generateCommentary)({
                runs: runs,
                batter: striker_1,
                bowler: bowler
            });
            audioCommentary.speak(commentary);
            // Check if over just completed (totalBalls is now divisible by 6)
            var ballsAfter = engine.state.totalBalls;
            if (ballsAfter > 0 && ballsAfter % 6 === 0) {
                // End of over - announce game update
                var overNumber = Math.floor(ballsAfter / 6);
                var striker_2 = battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.players.find(function (p) { return p.id === engine.state.strikerId; });
                var batterStats = stats.batterStats[engine.state.strikerId];
                var endOfOverCommentary_1 = (0, shared_2.generateEndOfOverCommentary)({
                    overNumber: overNumber,
                    score: engine.state.score,
                    wickets: engine.state.wickets,
                    currentRunRate: stats.runRate.toString(),
                    innings: engine.state.innings,
                    target: engine.state.target,
                    requiredRate: stats.requiredRate.toString(),
                    batterName: striker_2 === null || striker_2 === void 0 ? void 0 : striker_2.name,
                    batterScore: batterStats === null || batterStats === void 0 ? void 0 : batterStats.runs,
                    projectedScore: engine.state.innings === 1 && stats.runRate ?
                        Math.round((stats.runRate || 0) * rules.totalOversAllowed) : undefined,
                    lead: engine.state.lead
                });
                // Delay end-of-over commentary slightly so it doesn't overlap with ball commentary
                setTimeout(function () {
                    audioCommentary.speak(endOfOverCommentary_1);
                }, 2000);
            }
        }
        if (autoAnalytics)
            setShowShotModal(true);
    };
    var handleCommitExtra = function (type, runs, isOffBat) {
        if (isReadOnly)
            return;
        claimLock();
        var extraType = 'None';
        if (type === 'Wide')
            extraType = 'Wide';
        if (type === 'NoBall')
            extraType = 'NoBall';
        if (type === 'Bye')
            extraType = 'Bye';
        if (type === 'LegBye')
            extraType = 'LegBye';
        engine.applyBall({
            extraType: extraType,
            extraRuns: isOffBat ? 0 : runs,
            runs: isOffBat ? runs : 0,
            batRuns: isOffBat ? runs : 0
        });
        // Audio commentary for extras
        if (audioCommentary.enabled) {
            var bowler = bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.players.find(function (p) { return p.id === engine.state.bowlerId; });
            var commentary = (0, shared_2.generateCommentary)({
                runs: runs,
                isWide: extraType === 'Wide',
                isNoBall: extraType === 'NoBall',
                isBye: extraType === 'Bye',
                isLegBye: extraType === 'LegBye',
                bowler: bowler
            });
            audioCommentary.speak(commentary);
        }
        pad.resetPad();
        if (autoAnalytics)
            setShowShotModal(true);
    };
    var handleSwapBatters = function () {
        if (isReadOnly)
            return;
        var currentStriker = engine.state.strikerId;
        var currentNonStriker = engine.state.nonStrikerId;
        engine.updateMetadata({
            strikerId: currentNonStriker,
            nonStrikerId: currentStriker
        });
    };
    var startNextInnings = function () {
        if (isReadOnly)
            return;
        claimLock();
        if (match.format === 'Test' && engine.state.innings < 4) {
            var followOn = false;
            engine.endInnings(false);
            engine.startInnings(engine.state.bowlingTeamId, engine.state.battingTeamId, undefined, followOn);
        }
        else if (match.format !== 'Test' && engine.state.innings < 2) {
            engine.endInnings(false);
            engine.startInnings(engine.state.bowlingTeamId, engine.state.battingTeamId, engine.state.score + 1);
        }
        else if (match.format === 'Test' && engine.state.innings === 1) {
            engine.endInnings(false);
            engine.startInnings(engine.state.bowlingTeamId, engine.state.battingTeamId, engine.state.score + 1);
        }
        setInningsBreak({ open: false, reason: null });
        setShowStartModal(true);
    };
    // Calculate Lead/Trail message
    var leadMessage = (0, react_1.useMemo)(function () {
        if (targetText)
            return targetText;
        if (leadText)
            return leadText;
        // Fallback or legacy
        if (engine.state.target) {
            var needed = engine.state.target - engine.state.score;
            if (needed > 0)
                return "Target: ".concat(engine.state.target, " (").concat(needed, " to win)");
            return "Target Reached";
        }
        return null;
    }, [engine.state.target, engine.state.score, leadText, targetText]);
    var handleMatchFinish = function () {
        engine.endInnings(true);
        // Generat AI News
        var news = (0, shared_3.generateMatchNews)(match, engine.state);
        onAddMediaPost(news);
        // Persist final status as 'Completed'
        onUpdateMatchState(match.id, engine.state, 'Completed');
        onComplete();
    };
    var handlePinToMedia = function () {
        var _a, _b;
        var teamA = teams.find(function (t) { return t.id === match.teamAId; });
        var teamB = teams.find(function (t) { return t.id === match.teamBId; });
        var resultText = "Game in Progress";
        if (engine.state.isCompleted) {
            var scoreA = ((_a = engine.state.inningsScores.find(function (i) { return i.teamId === (teamA === null || teamA === void 0 ? void 0 : teamA.id); })) === null || _a === void 0 ? void 0 : _a.score) || 0;
            var scoreB = ((_b = engine.state.inningsScores.find(function (i) { return i.teamId === (teamB === null || teamB === void 0 ? void 0 : teamB.id); })) === null || _b === void 0 ? void 0 : _b.score) || 0;
            if (scoreA > scoreB)
                resultText = "".concat(teamA === null || teamA === void 0 ? void 0 : teamA.name, " won by ").concat(scoreA - scoreB, " runs");
            else if (scoreB > scoreA)
                resultText = "".concat(teamB === null || teamB === void 0 ? void 0 : teamB.name, " won");
            else
                resultText = "Match Tied";
        }
        var post = {
            id: "post-".concat(Date.now()),
            type: 'LIVE_STATUS',
            authorName: 'Match Scorer',
            caption: "\uD83C\uDFCF ".concat(teamA === null || teamA === void 0 ? void 0 : teamA.name, " vs ").concat(teamB === null || teamB === void 0 ? void 0 : teamB.name, "\nStatus: ").concat(resultText, "\nScore: ").concat(engine.state.score, "/").concat(engine.state.wickets, " (").concat(Math.floor(engine.state.totalBalls / 6), ".").concat(engine.state.totalBalls % 6, " ov)"),
            timestamp: Date.now(),
            likes: [],
            dislikes: [],
            shares: 0,
            comments: [],
            matchId: match.id
        };
        onAddMediaPost(post);
        alert('Match summary pinned to Media Center!');
    };
    var handleManualConclude = function () {
        engine.endInnings(true);
        // Generate AI News
        var news = (0, shared_3.generateMatchNews)(match, engine.state);
        onAddMediaPost(news);
        onUpdateMatchState(match.id, engine.state, 'Completed');
        onComplete();
    };
    var enforceFollowOn = function () {
        engine.startInnings(engine.state.battingTeamId, engine.state.bowlingTeamId, undefined, true);
        setInningsBreak({ open: false, reason: null });
    };
    var handleManualSave = function () {
        onUpdateMatchState(match.id, engine.state);
        alert('Game Saved Successfully!');
    };
    var canEnforceFollowOn = match.format === 'Test' && engine.state.innings === 2;
    var handleAnalyticsSave = function (pitch, shot, height) {
        if (engine.state.history.length > 0) {
            engine.editBall(engine.state.history[0].timestamp, { pitchCoords: pitch, shotCoords: shot, shotHeight: height });
        }
    };
    var openScoreboardWindow = function () {
        var width = 800;
        var height = 600;
        var left = (window.screen.width - width) / 2;
        var top = (window.screen.height - height) / 2;
        window.open("".concat(window.location.origin).concat(window.location.pathname, "?mode=scoreboard"), 'ScoreboardWindow', "width=".concat(width, ",height=").concat(height, ",left=").concat(left, ",top=").concat(top));
    };
    var handleUpdateOfficials = function (newUmpires) {
        engine.updateMetadata({ umpires: newUmpires });
    };
    (0, react_1.useEffect)(function () {
        var channel = new BroadcastChannel('cricket_sync_channel');
        // Find host org to get settings
        var hostOrg = organizations.find(function (o) { return o.fixtures.some(function (f) { return f.id === match.id; }); });
        channel.postMessage({
            type: 'UPDATE',
            state: engine.state,
            teams: { batting: battingTeam, bowling: bowlingTeam },
            sponsors: (hostOrg === null || hostOrg === void 0 ? void 0 : hostOrg.sponsors) || [],
            sponsorSettings: hostOrg === null || hostOrg === void 0 ? void 0 : hostOrg.sponsorSettings
        });
        return function () { return channel.close(); };
    }, [engine.state, battingTeam, bowlingTeam, organizations, match.id]);
    var getLastBall = function () { return engine.state.history[0]; };
    var striker = battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.players.find(function (p) { return p.id === engine.state.strikerId; });
    var nonStriker = battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.players.find(function (p) { return p.id === engine.state.nonStrikerId; });
    // Filter out dismissed players
    var dismissedPlayerIds = new Set(engine.state.history
        .filter(function (b) { return b.innings === engine.state.innings && b.isWicket && b.outPlayerId; })
        .map(function (b) { return b.outPlayerId; }));
    // Determine Squad IDs for strict selection
    var battingSquadIds = ((battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.id) === match.teamAId ? match.teamASquadIds : match.teamBSquadIds) || [];
    var bowlingSquadIds = ((bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.id) === match.teamAId ? match.teamASquadIds : match.teamBSquadIds) || [];
    var isStrictSquad = !match.allowFlexibleSquad;
    var selectableBatters = (battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.players.filter(function (p) {
        // Not At Crease
        return p.id !== engine.state.strikerId &&
            p.id !== engine.state.nonStrikerId &&
            // Not Dismissed
            !dismissedPlayerIds.has(p.id) &&
            // In Squad (if strict)
            (!isStrictSquad || battingSquadIds.length === 0 || battingSquadIds.includes(p.id));
    })) || [];
    var selectableBowlers = (bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.players.filter(function (p) {
        // In Squad (if strict)
        return (!isStrictSquad || bowlingSquadIds.length === 0 || bowlingSquadIds.includes(p.id));
    })) || [];
    var availableBatters = selectableBatters.filter(function (p) {
        // Exclude current batters
        if (p.id === engine.state.strikerId)
            return false;
        if (p.id === engine.state.nonStrikerId)
            return false;
        // Exclude dismissed batters in current innings
        var isDismissed = engine.state.history.some(function (ball) {
            return ball.isWicket &&
                ball.outPlayerId === p.id &&
                ball.innings === engine.state.innings;
        });
        if (isDismissed)
            return false;
        return true;
    });
    // --- FIX: END OF OVER LOGIC ---
    var currentOverIndex = Math.floor(engine.state.totalBalls / 6);
    var hasSelectedBowlerForThisOver = engine.state.history.some(function (b) {
        var _a;
        return b.innings === engine.state.innings && // Filter by current innings
            b.over === currentOverIndex &&
            ((_a = b.commentary) === null || _a === void 0 ? void 0 : _a.startsWith('EVENT: New Bowler'));
    });
    var needsBowlerChange = engine.state.totalBalls > 0 && engine.state.totalBalls % 6 === 0 && !engine.state.isCompleted && !hasSelectedBowlerForThisOver;
    if (engine.state.isCompleted) {
        if (postMatchView === 'SCORECARD') {
            return (<div className="h-full bg-slate-950">
                    <FullMatchScorecard_1.FullMatchScorecard matchState={engine.state} teamA={teams.find(function (t) { return t.id === match.teamAId; })} teamB={teams.find(function (t) { return t.id === match.teamBId; })} onBack={function () { return setPostMatchView('SUMMARY'); }}/>
                </div>);
        }
        return (<MatchResultSummary_1.MatchResultSummary matchState={engine.state} teamA={teams.find(function (t) { return t.id === match.teamAId; })} teamB={teams.find(function (t) { return t.id === match.teamBId; })} format={match.format} onExit={onExit} onViewScorecard={function () { return setPostMatchView('SCORECARD'); }}/>);
    }
    // Shared Props for children
    var isReadOnlyView = readOnly || isLockedByOther;
    var handleAddPlayer = function (name, teamId) {
        var newPlayer = {
            id: "temp-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9)),
            name: name,
            role: 'All-rounder',
            stats: {
                runs: 0, wickets: 0, ballsFaced: 0, ballsBowled: 0,
                runsConceded: 0, matches: 0, catches: 0, runOuts: 0,
                stumpings: 0, fours: 0, sixes: 0, hundreds: 0,
                fifties: 0, ducks: 0, threeWickets: 0, fiveWickets: 0, maidens: 0
            }
        };
        var org = organizations.find(function (o) { return o.memberTeams.some(function (t) { return t.id === teamId; }); });
        if (org) {
            var updatedOrg_1 = __assign(__assign({}, org), { memberTeams: org.memberTeams.map(function (t) {
                    return t.id === teamId ? __assign(__assign({}, t), { players: __spreadArray(__spreadArray([], t.players, true), [newPlayer], false) }) : t;
                }) });
            onUpdateOrgs(organizations.map(function (o) { return o.id === updatedOrg_1.id ? updatedOrg_1 : o; }));
        }
    };
    var layoutProps = {
        match: match,
        engine: engine,
        teams: teams,
        battingTeam: battingTeam,
        bowlingTeam: bowlingTeam,
        stats: stats,
        timer: timer,
        pad: pad,
        wicket: wicket,
        rules: rules,
        onExit: onExit,
        isAuthorized: !isReadOnlyView,
        onComplete: onComplete,
        handlers: {
            handleRun: handleRun,
            handleCommitExtra: handleCommitExtra,
            handleSwapBatters: handleSwapBatters,
            handleMatchFinish: handleMatchFinish,
            handleManualConclude: handleManualConclude,
            handleManualSave: handleManualSave,
            openScoreboardWindow: openScoreboardWindow,
            handleUpdateOfficials: handleUpdateOfficials,
            handleAnalyticsSave: handleAnalyticsSave
        },
        modals: {
            setIsCameraOpen: setIsCameraOpen,
            setShowSubModal: setShowSubModal,
            setShowBroadcaster: setShowBroadcaster,
            setShowOfficialsModal: setShowOfficialsModal,
            setShowShotModal: setShowShotModal,
            autoAnalytics: autoAnalytics,
            setAutoAnalytics: setAutoAnalytics,
            showShotModal: showShotModal,
            showStartModal: showStartModal,
            setShowStartModal: setShowStartModal,
            showSubModal: showSubModal,
            isCameraOpen: isCameraOpen,
            showOfficialsModal: showOfficialsModal,
        },
        onBallClick: setEditingBall,
        mobileTab: mobileTab,
        setMobileTab: setMobileTab,
        onEditPlayer: setCorrectionTarget,
        onPinToMedia: handlePinToMedia,
        onAddPlayer: handleAddPlayer,
        // onComplete: handleMatchFinish // Removed if redundant with onComplete above
    };
    return (<div className="h-full w-full relative">
            {isReadOnlyView && (<div className="absolute top-0 left-0 right-0 bg-indigo-600 text-white py-1 px-4 text-center text-[10px] font-black z-[100] shadow-lg flex items-center justify-center gap-2">
                    <span>👀</span> LIVE VIEW (READ ONLY) {isLockedByOther ? '• SCORED BY ANOTHER USER' : ''}
                </div>)}
            <MobileScorerLayout_1.MobileScorerLayout {...layoutProps}/>

            {/* Audio Commentary Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <AudioCommentaryToggle_1.AudioCommentaryToggle enabled={audioCommentary.enabled} speaking={audioCommentary.speaking} onToggle={function () { return audioCommentary.setEnabled(!audioCommentary.enabled); }} onOpenSettings={function () { return setShowAudioSettings(true); }} isSupported={audioCommentary.isSupported}/>
            </div>

            {/* Test Match Status Overlay (Optional) */}
            {/* Test Match Status Overlay */}
            {match.format === 'Test' && (<div className="fixed top-20 right-4 z-40 bg-slate-900/90 backdrop-blur text-white p-3 rounded-lg border border-slate-700 shadow-xl pointer-events-auto flex flex-col items-end gap-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                        Day {engine.state.currentDay || 1} • {((_f = engine.state.adjustments) === null || _f === void 0 ? void 0 : _f.session) || 'Session 1'}
                    </div>

                    <div className="font-mono text-sm font-bold text-white">
                        {leadMessage || 'Match in Progress'}
                    </div>

                    {((_g = engine.state.adjustments) === null || _g === void 0 ? void 0 : _g.isLastHour) ? (<div className="mt-1 bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs font-bold border border-amber-500/50 animate-pulse">
                            ⚠ LAST HOUR: {engine.state.adjustments.lastHourOversRemaining} Overs
                        </div>) : ((!((_h = engine.state.adjustments) === null || _h === void 0 ? void 0 : _h.concluded) && !engine.state.isCompleted) && (<button onClick={handleLastHourTrigger} className="mt-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] uppercase font-bold px-2 py-1 rounded border border-slate-600 transition-colors">
                                Signal Last Hour
                            </button>))}
                </div>)}

            {/* GLOBAL MODALS */}
            <ShotEntryModal_1.ShotEntryModal isOpen={showShotModal} onClose={function () { return setShowShotModal(false); }} onSave={handleAnalyticsSave} existingPitch={(_j = getLastBall()) === null || _j === void 0 ? void 0 : _j.pitchCoords} existingShot={(_k = getLastBall()) === null || _k === void 0 ? void 0 : _k.shotCoords} existingHeight={(_l = getLastBall()) === null || _l === void 0 ? void 0 : _l.shotHeight} ballColor={getLastBall() ? (0, shared_1.getBallColor)(getLastBall()) : undefined} isWaiting={!getLastBall() || (!!((_m = getLastBall()) === null || _m === void 0 ? void 0 : _m.pitchCoords) && !!((_o = getLastBall()) === null || _o === void 0 ? void 0 : _o.shotCoords) && !!((_p = getLastBall()) === null || _p === void 0 ? void 0 : _p.shotHeight))}/>

            <WicketModal_1.WicketModal open={wicket.isOpen} batters={[striker, nonStriker].filter(Boolean)} fielders={selectableBowlers} wicketType={wicket.wicketType} outPlayerId={wicket.outPlayerId} fielderId={wicket.fielderId} onSelectType={wicket.setWicketType} onSelectOutPlayer={wicket.setOutPlayerId} onSelectFielder={wicket.setFielderId} onConfirm={function () {
            if (isReadOnly)
                return;
            claimLock();
            engine.recordWicket({ type: 'WICKET', wicketType: wicket.wicketType, batterId: wicket.outPlayerId, fielderId: wicket.fielderId || undefined });
            // Audio commentary for wicket with player context
            if (audioCommentary.enabled && wicket.wicketType) {
                var striker_3 = battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.players.find(function (p) { return p.id === engine.state.strikerId; });
                var nonStriker_1 = battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.players.find(function (p) { return p.id === engine.state.nonStrikerId; });
                var bowler = bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.players.find(function (p) { return p.id === engine.state.bowlerId; });
                var outPlayer = [striker_3, nonStriker_1].find(function (p) { return (p === null || p === void 0 ? void 0 : p.id) === wicket.outPlayerId; });
                var fielderPlayer = bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.players.find(function (p) { return (p === null || p === void 0 ? void 0 : p.id) === wicket.fielderId; });
                var commentary = (0, shared_2.generateCommentary)({
                    runs: 0,
                    wicketType: wicket.wicketType,
                    outPlayer: outPlayer,
                    fielder: fielderPlayer,
                    bowler: bowler
                });
                audioCommentary.speak(commentary);
            }
            wicket.reset();
            if (autoAnalytics)
                setShowShotModal(true);
        }} onCancel={wicket.reset}/>

            <EndOfOverModal_1.EndOfOverModal isOpen={needsBowlerChange && isAuthorized} overNumber={Math.floor(engine.state.totalBalls / 6) + 1} bowlingTeamName={(bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.name) || ''} currentBowlerId={engine.state.bowlerId} bowlers={selectableBowlers} getAvailability={rules.getBowlerAvailability} onSelectBowler={function (id) { return engine.applyBall({ commentary: 'EVENT: New Bowler', bowlerId: id }); }}/>

            {inningsBreak.open && (<div className="fixed inset-0 z-[200]">
                    <MatchResultSummary_1.MatchResultSummary matchState={engine.state} teamA={teams.find(function (t) { return t.id === match.teamAId; })} teamB={teams.find(function (t) { return t.id === match.teamBId; })} format={match.format} onExit={function () { return setInningsBreak({ open: false, reason: null }); }} onViewScorecard={function () {
                setInningsBreak({ open: false, reason: null });
                setMobileTab('SCORECARD');
            }} onPinToMedia={handlePinToMedia} nextInningsAction={(function () {
                var isTest = match.format === 'Test';
                // Determine if match end
                var isMatchEnd = false;
                if (isTest) {
                    if (engine.state.innings === 4)
                        isMatchEnd = true;
                    // Check if innings victory etc logic already handled by engine.state.isCompleted
                    if (engine.state.isCompleted)
                        isMatchEnd = true;
                }
                else {
                    if (engine.state.innings >= 2)
                        isMatchEnd = true;
                }
                if (isMatchEnd) {
                    return { label: "Finalize Match Result", onClick: handleMatchFinish };
                }
                return { label: "Start Next Innings", onClick: startNextInnings };
            })()} followOnAction={canEnforceFollowOn ? { label: "Enforce Follow-On", onClick: enforceFollowOn } : undefined}/>
                </div>)}

            <MatchStartModal_1.MatchStartModal isOpen={showStartModal} battingPlayers={selectableBatters} bowlingPlayers={selectableBowlers} onConfirm={function (sId, nsId, bId) {
            if (isReadOnly)
                return;
            claimLock();
            // 1. Immediate State Update (Crucial for UI)
            engine.updateMetadata({ strikerId: sId, nonStrikerId: nsId, bowlerId: bId });
            // 2. Record Event (Logged in history)
            setTimeout(function () {
                engine.applyBall({
                    commentary: 'EVENT: Match Started',
                    strikerId: sId,
                    nonStrikerId: nsId,
                    bowlerId: bId,
                    innings: engine.state.innings
                });
            }, 50);
            setShowStartModal(false);
        }} onAddPlayer={handleAddPlayer} battingTeamId={battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.id} bowlingTeamId={bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.id}/>

            {pad.padView === 'bowler_replacement_select' && (<NewBatterModal_1.NewBatterModal isOpen={true} teamName={(bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.name) || ''} availableBatters={selectableBowlers.filter(function (p) { return p.id !== engine.state.bowlerId; })} targetRole="Striker" onSelect={function (id) { engine.replaceBowlerMidOver(id); pad.resetPad(); setCorrectionTarget(null); }} onAddPlayer={handleAddPlayer} teamId={bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.id}/>)}

            {newBatterTarget && !showStartModal && isAuthorized && (<NewBatterModal_1.NewBatterModal isOpen={true} teamName={(battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.name) || ''} availableBatters={availableBatters} targetRole={newBatterTarget} onSelect={function (id) {
                // Properly update the batter position
                if (newBatterTarget === 'Striker') {
                    engine.updateMetadata({ strikerId: id });
                }
                else {
                    engine.updateMetadata({ nonStrikerId: id });
                }
                setNewBatterTarget(null);
            }} onAddPlayer={handleAddPlayer} teamId={battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.id}/>)}

            <CameraModal_1.CameraModal isOpen={isCameraOpen} onClose={function () { return setIsCameraOpen(false); }} onUpload={function (url, type) {
            onAddMediaPost({ id: Date.now().toString(), type: type, contentUrl: url, authorName: 'Scorer', caption: 'Match Moment', timestamp: Date.now(), likes: [], dislikes: [], shares: 0, comments: [] });
            setIsCameraOpen(false);
        }}/>

            {showBroadcaster && <BroadcasterView_1.BroadcasterView matchState={engine.state} battingTeam={battingTeam} bowlingTeam={bowlingTeam} onClose={function () { return setShowBroadcaster(false); }}/>}

            <OfficialsModal_1.OfficialsModal isOpen={showOfficialsModal} onClose={function () { return setShowOfficialsModal(false); }} currentUmpires={engine.state.umpires || []} availableOfficials={availableOfficials} onSave={handleUpdateOfficials}/>

            {correctionTarget && (<PlayerEditModal_1.PlayerEditModal isOpen={true} onClose={function () { return setCorrectionTarget(null); }} teamName={correctionTarget === 'bowler' ? (bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.name) || '' : (battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.name) || ''} currentPlayerId={correctionTarget === 'bowler' ? engine.state.bowlerId : (correctionTarget === '@striker' ? engine.state.strikerId : engine.state.nonStrikerId)} currentPlayerName={(correctionTarget === 'bowler'
                ? (_r = (_q = bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.players) === null || _q === void 0 ? void 0 : _q.find(function (p) { return p.id === engine.state.bowlerId; })) === null || _r === void 0 ? void 0 : _r.name
                : (_t = (_s = battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.players) === null || _s === void 0 ? void 0 : _s.find(function (p) { return p.id === (correctionTarget === '@striker' ? engine.state.strikerId : engine.state.nonStrikerId); })) === null || _t === void 0 ? void 0 : _t.name) || 'Unknown Player'} role={correctionTarget === 'bowler' ? 'Bowler' : (correctionTarget === '@striker' ? 'Striker' : 'NonStriker')} availablePlayers={correctionTarget === 'bowler' ? selectableBowlers : availableBatters} onReplace={function (oldId, newId, role) {
                engine.correctPlayerIdentity(oldId, newId, role);
                setCorrectionTarget(null);
            }} onRetire={function (playerId, type) {
                engine.retireBatter(playerId, type);
                setCorrectionTarget(null);
                // Trigger new batter modal immediately
                setTimeout(function () {
                    setNewBatterTarget(correctionTarget === '@striker' ? 'Striker' : 'NonStriker');
                }, 100);
            }} onInjury={function (newPlayerId) {
                engine.replaceBowlerMidOver(newPlayerId);
                setCorrectionTarget(null);
            }}/>)}

            <BallCorrectionModal_1.BallCorrectionModal isOpen={!!editingBall} onClose={function () { return setEditingBall(null); }} ball={editingBall} onSave={function (updates) {
            if (editingBall) {
                engine.editBall(editingBall.timestamp, updates);
            }
        }}/>

            {engine.state.isCompleted && postMatchView === 'SUMMARY' && (<MatchResultSummary_1.MatchResultSummary matchState={engine.state} teamA={teams.find(function (t) { return t.id === match.teamAId; })} teamB={teams.find(function (t) { return t.id === match.teamBId; })} onExit={onExit} onViewScorecard={function () { return setPostMatchView('SCORECARD'); }} totalOvers={rules.totalOversAllowed} onPinToMedia={handlePinToMedia}/>)}

            {/* Audio Settings Modal */}
            <AudioSettingsModal_1.AudioSettingsModal isOpen={showAudioSettings} onClose={function () { return setShowAudioSettings(false); }} voices={audioCommentary.voices} settings={audioCommentary.settings} onVoiceChange={audioCommentary.setVoice} onSpeedChange={audioCommentary.setSpeed} onPitchChange={audioCommentary.setPitch} onVolumeChange={audioCommentary.setVolume} onTest={function () { return audioCommentary.speak('This is a test of the audio commentary system. Four! Six! Wicket!'); }}/>

        </div>);
};
exports.Scorer = Scorer;
