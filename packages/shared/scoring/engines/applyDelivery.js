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
exports.applyDelivery = void 0;
var overEngine = require("./overEngine.ts");
var batterEngine = require("./batterEngine.ts");
var bowlerEngine = require("./bowlerEngine.ts");
var timerEngine = require("./timerEngine.ts");
var MatchSelectors_ts_1 = require("../MatchSelectors.ts");
var cricket_engine_ts_1 = require("../../utils/cricket-engine.ts");
var applyDelivery = function (currentState, event, match) {
    var _a;
    var state = __assign({}, currentState);
    // 0. Handle Special Setup Events (Bypass Engine Logic)
    // This maintains compatibility with the UI's existing way of setting players
    if ((_a = event.commentary) === null || _a === void 0 ? void 0 : _a.startsWith('EVENT')) {
        if (event.strikerId)
            state = batterEngine.assignNewBatter(state, event.strikerId, 'Striker');
        if (event.nonStrikerId)
            state = batterEngine.assignNewBatter(state, event.nonStrikerId, 'NonStriker');
        if (event.bowlerId)
            state = bowlerEngine.assignBowler(state, event.bowlerId);
        // NOTE: Timer is NOT started here anymore. It starts on the first legal/play delivery.
        // Update history for events too
        var setupBall = __assign({ timestamp: Date.now(), over: Math.floor(state.totalBalls / 6), ballNumber: state.totalBalls % 6, strikerId: state.strikerId, nonStrikerId: state.nonStrikerId, bowlerId: state.bowlerId, runs: 0, batRuns: 0, extraRuns: 0, extraType: 'None', isWicket: false, commentary: event.commentary || 'Setup Event', innings: state.innings }, event);
        return __assign(__assign({}, state), { history: __spreadArray([setupBall], state.history, true) });
    }
    // 1. Timer Engine
    state = timerEngine.startInningsTimer(state);
    // 2. Over Engine (Scoring & Basic Rotation)
    // Note: This returns the NEW state where totalBalls might have incremented if legal
    state = overEngine.applyDeliveryToOver(state, event);
    // 3. Batter Engine (Wickets)
    if (event.isWicket && event.outPlayerId) {
        state = batterEngine.handleWicket(state, event.outPlayerId);
    }
    // 4. Construct Full Ball Object for History
    // We need to verify if the bowler gets credit based on dismissal type
    var dismissal = event.wicketType ? MatchSelectors_ts_1.DISMISSAL_MATRIX[event.wicketType] : null;
    var isLegal = (0, cricket_engine_ts_1.isLegalBall)(event.extraType);
    // Robust Ball Number Calculation:
    // If legal, totalBalls has incremented, so the current ball index is state.totalBalls.
    // If illegal, totalBalls has NOT incremented, so the current ball index is state.totalBalls + 1 (the one we are attempting).
    // Note: If totalBalls is 0 (start), illegal ball -> index 1. Legal ball -> totalBalls becomes 1 -> index 1.
    var rawBallNum = isLegal ? state.totalBalls : state.totalBalls + 1;
    var calculatedBallNum = rawBallNum % 6 === 0 ? 6 : rawBallNum % 6;
    // Calculate Over Number
    // If we just finished an over (legal ball 6), the ball belongs to the previous over index.
    // If illegal ball at start of over (totalBalls 6), rawBallNum is 7, so over index 1.
    var calculatedOver = Math.floor((rawBallNum - 1) / 6);
    var ball = __assign({ timestamp: Date.now(), over: calculatedOver, ballNumber: calculatedBallNum, strikerId: currentState.strikerId, nonStrikerId: currentState.nonStrikerId, bowlerId: state.bowlerId, runs: event.runs || 0, batRuns: event.extraType === 'Wide' ? 0 : (event.runs || 0), extraRuns: event.extraRuns || 0, extraType: event.extraType || 'None', isWicket: event.isWicket || false, wicketType: event.wicketType, outPlayerId: event.outPlayerId, fielderId: event.fielderId, creditBowler: event.isWicket && (dismissal ? dismissal.credit : true), teamScoreAtBall: state.score, commentary: event.isWicket
            ? "WICKET! ".concat(event.wicketType)
            : "".concat((event.runs || 0) + (event.extraRuns || 0) + (['Wide', 'NoBall'].includes(event.extraType || '') ? 1 : 0), " runs ").concat(event.extraType !== 'None' ? "(".concat(event.extraType, ")") : ''), innings: state.innings }, event);
    return __assign(__assign({}, state), { history: __spreadArray([ball], state.history, true) });
};
exports.applyDelivery = applyDelivery;
