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
exports.useMatchEngine = void 0;
var react_1 = require("react");
var applyDelivery_ts_1 = require("../engines/applyDelivery.ts");
var cricket_engine_ts_1 = require("../../utils/cricket-engine.ts");
var TestMatchLogic_ts_1 = require("../../components/scoring/logic/TestMatchLogic.ts");
var testMatchEngine_ts_1 = require("../../competition/testMatchEngine.ts");
var useMatchEngine = function (initialState) {
    var _a = (0, react_1.useState)(initialState), state = _a[0], setState = _a[1];
    var _b = (0, react_1.useState)([]), history = _b[0], setHistory = _b[1];
    var applyBall = (0, react_1.useCallback)(function (ball) {
        setHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), [state], false); });
        setState(function (prev) {
            var _a;
            var next = (0, applyDelivery_ts_1.applyDelivery)(prev, ball, null);
            // Update Test Match Metadata (Overs Today, Lead)
            if (next.testConfig) {
                // Calculate new lead
                next.lead = (0, TestMatchLogic_ts_1.calculateLead)(next);
                // Handling Overs Today
                // Detect if over changed
                // Detect if over changed
                if (Math.floor(next.totalBalls / 6) > Math.floor(prev.totalBalls / 6)) {
                    console.log('Over Changed. Prev OversToday:', prev.oversToday);
                    next.oversToday = (prev.oversToday || 0) + 1;
                    // Decrement Last Hour
                    if ((_a = next.adjustments) === null || _a === void 0 ? void 0 : _a.isLastHour) {
                        var updated = (0, testMatchEngine_ts_1.decrementLastHour)(next);
                        next.adjustments = updated.adjustments;
                    }
                }
                // Logic to transition session / day could go here or be manual
            }
            return next;
        });
    }, [state]);
    var recordWicket = (0, react_1.useCallback)(function (event) {
        applyBall({
            runs: 0,
            extraRuns: 0,
            extraType: 'None',
            isWicket: true,
            wicketType: event.wicketType,
            outPlayerId: event.batterId,
            fielderId: event.fielderId,
            commentary: "WICKET! ".concat(event.wicketType)
        });
    }, [applyBall]);
    var undoBall = (0, react_1.useCallback)(function () {
        if (history.length === 0)
            return;
        var previous = history[history.length - 1];
        setState(previous);
        setHistory(function (prev) { return prev.slice(0, -1); });
    }, [history]);
    var editBall = (0, react_1.useCallback)(function (ballTimestamp, updates) {
        setHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), [state], false); });
        setState(function (prev) {
            var allEvents = __spreadArray([], prev.history, true).reverse();
            var targetIndex = allEvents.findIndex(function (b) { return b.timestamp === ballTimestamp; });
            if (targetIndex === -1)
                return prev;
            allEvents[targetIndex] = __assign(__assign({}, allEvents[targetIndex]), updates);
            var replayedState = __assign(__assign({}, prev), { score: 0, wickets: 0, totalBalls: 0, history: [] });
            var firstInningsBall = allEvents.find(function (b) { return b.innings === prev.innings; });
            if (firstInningsBall) {
                replayedState.strikerId = firstInningsBall.strikerId;
                replayedState.nonStrikerId = firstInningsBall.nonStrikerId;
                replayedState.bowlerId = firstInningsBall.bowlerId;
            }
            allEvents.forEach(function (ball) {
                if (ball.innings === prev.innings) {
                    replayedState = (0, applyDelivery_ts_1.applyDelivery)(replayedState, ball, null);
                }
                else {
                    replayedState.history = __spreadArray([ball], replayedState.history, true);
                }
            });
            return replayedState;
        });
    }, [state]);
    var correctPlayerIdentity = (0, react_1.useCallback)(function (oldId, newId, role) {
        setHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), [state], false); });
        setState(function (prev) {
            var next = __assign({}, prev);
            if (role === 'striker' && next.strikerId === oldId)
                next.strikerId = newId;
            if (role === 'nonStriker' && next.nonStrikerId === oldId)
                next.nonStrikerId = newId;
            if (role === 'bowler' && next.bowlerId === oldId)
                next.bowlerId = newId;
            next.history = next.history.map(function (ball) {
                var b = __assign({}, ball);
                if (role === 'striker' && b.strikerId === oldId)
                    b.strikerId = newId;
                if (role === 'nonStriker' && b.nonStrikerId === oldId)
                    b.nonStrikerId = newId;
                if (role === 'bowler' && b.bowlerId === oldId)
                    b.bowlerId = newId;
                if (b.outPlayerId === oldId)
                    b.outPlayerId = newId;
                return b;
            });
            return next;
        });
    }, [state]);
    var retireBatter = (0, react_1.useCallback)(function (playerId, reason) {
        applyBall({
            isWicket: reason === 'Retired Out',
            wicketType: reason,
            outPlayerId: playerId,
            commentary: "EVENT: ".concat(reason),
            innings: state.innings
        });
    }, [applyBall, state.innings]);
    var replaceBowlerMidOver = (0, react_1.useCallback)(function (newBowlerId) {
        applyBall({
            commentary: 'EVENT: Injury Replacement (Bowler)',
            bowlerId: newBowlerId,
            innings: state.innings
        });
    }, [applyBall, state.innings]);
    var declareInnings = (0, react_1.useCallback)(function () {
        setHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), [state], false); });
        setState(function (prev) {
            var _a, _b, _c, _d;
            return (__assign(__assign({}, prev), { adjustments: __assign(__assign({}, prev.adjustments), { declared: true, oversLost: ((_a = prev.adjustments) === null || _a === void 0 ? void 0 : _a.oversLost) || 0, isLastHour: ((_b = prev.adjustments) === null || _b === void 0 ? void 0 : _b.isLastHour) || false, dayNumber: ((_c = prev.adjustments) === null || _c === void 0 ? void 0 : _c.dayNumber) || 1, session: ((_d = prev.adjustments) === null || _d === void 0 ? void 0 : _d.session) || '' }) }));
        });
    }, [state]);
    var concludeInnings = (0, react_1.useCallback)(function () {
        setHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), [state], false); });
        setState(function (prev) { return (__assign(__assign({}, prev), { adjustments: __assign(__assign({}, prev.adjustments), { concluded: true }) })); });
    }, [state]);
    var startInnings = (0, react_1.useCallback)(function (battingTeamId, bowlingTeamId, target, isFollowOn) {
        setHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), [state], false); });
        setState(function (prev) { return (__assign(__assign({}, prev), { innings: prev.innings + 1, battingTeamId: battingTeamId, bowlingTeamId: bowlingTeamId, score: 0, wickets: 0, totalBalls: 0, strikerId: '', nonStrikerId: '', bowlerId: '', target: target, isFollowOnEnforced: isFollowOn || prev.isFollowOnEnforced, adjustments: __assign(__assign({}, prev.adjustments), { declared: false, concluded: false }) })); });
    }, [state]);
    var endInnings = (0, react_1.useCallback)(function (completeMatch) {
        if (completeMatch === void 0) { completeMatch = false; }
        setHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), [state], false); });
        setState(function (prev) { return (__assign(__assign({}, prev), { inningsScores: __spreadArray(__spreadArray([], prev.inningsScores, true), [{
                    innings: prev.innings,
                    teamId: prev.battingTeamId,
                    score: prev.score,
                    wickets: prev.wickets,
                    overs: (0, cricket_engine_ts_1.getOverString)(prev.totalBalls)
                }], false), isCompleted: completeMatch || prev.isCompleted })); });
    }, [state]);
    var updateMetadata = (0, react_1.useCallback)(function (updates) {
        setHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), [state], false); });
        setState(function (prev) { return (__assign(__assign({}, prev), updates)); });
    }, [state]);
    // Test Match Specific Actions
    var startNewDay = (0, react_1.useCallback)(function () {
        setHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), [state], false); });
        setState(function (prev) { return (__assign(__assign({}, prev), { currentDay: (prev.currentDay || 1) + 1, oversToday: 0, adjustments: __assign(__assign({}, prev.adjustments), { session: 'Morning' }) })); });
    }, [state]);
    var enforceFollowOn = (0, react_1.useCallback)(function () {
        setHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), [state], false); });
        setState(function (prev) { return (__assign(__assign({}, prev), { isFollowOnEnforced: true, 
            // Start Innings 3 but with same batting team as Innings 2 (Team B)
            innings: 3, score: 0, wickets: 0, totalBalls: 0, strikerId: '', nonStrikerId: '', bowlerId: '', 
            // Batting team stays same (Team B), Bowling team stays same (Team A)
            battingTeamId: prev.battingTeamId, bowlingTeamId: prev.bowlingTeamId, adjustments: __assign(__assign({}, prev.adjustments), { declared: false, concluded: false }) })); });
    }, [state]);
    var triggerLastHour = (0, react_1.useCallback)(function () {
        setHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), [state], false); });
        setState(function (prev) { return (0, testMatchEngine_ts_1.triggerLastHour)(prev); });
    }, [state]);
    return {
        state: state,
        history: history,
        applyBall: applyBall,
        recordWicket: recordWicket,
        undoBall: undoBall,
        editBall: editBall,
        canUndo: history.length > 0,
        startInnings: startInnings,
        endInnings: endInnings,
        correctPlayerIdentity: correctPlayerIdentity,
        retireBatter: retireBatter,
        replaceBowlerMidOver: replaceBowlerMidOver,
        declareInnings: declareInnings,
        concludeInnings: concludeInnings,
        updateMetadata: updateMetadata, // NEW EXPORT
        startNewDay: startNewDay,
        enforceFollowOn: enforceFollowOn,
        triggerLastHour: triggerLastHour
    };
};
exports.useMatchEngine = useMatchEngine;
