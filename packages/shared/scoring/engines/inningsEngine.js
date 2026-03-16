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
exports.endInnings = exports.checkEndOfInnings = void 0;
var checkEndOfInnings = function (state, totalOversAllowed, battingTeamPlayers, allowFlexibleSquad, matchFormat) {
    var _a, _b;
    if (battingTeamPlayers === void 0) { battingTeamPlayers = 11; }
    if (allowFlexibleSquad === void 0) { allowFlexibleSquad = false; }
    if (matchFormat === void 0) { matchFormat = 'T20'; }
    // 0. Declaration / Conclusion Check
    if ((_a = state.adjustments) === null || _a === void 0 ? void 0 : _a.declared)
        return 'Declared';
    if ((_b = state.adjustments) === null || _b === void 0 ? void 0 : _b.concluded)
        return 'Match Concluded';
    // 1. Wickets Logic
    // Ensure we have a valid player count (fallback to 11 if data missing)
    var effectivePlayers = battingTeamPlayers > 0 ? battingTeamPlayers : 11;
    // In cricket, you need a pair to bat. So max wickets is players - 1.
    var maxPossibleWickets = Math.max(0, effectivePlayers - 1);
    // If not flexible (Standard Rules), cap wickets at 10.
    var wicketLimit = allowFlexibleSquad ? maxPossibleWickets : Math.min(10, maxPossibleWickets);
    if (state.wickets >= wicketLimit)
        return 'All Out';
    // 2. Overs Completed
    // For Test matches, overs are per day, not hard limit for innings usually, 
    // but if custom overs are set (e.g. 450), we might respect it. 
    // Generally, Test innings end on wickets or declaration.
    if (matchFormat !== 'Test') {
        if (state.totalBalls >= totalOversAllowed * 6)
            return 'Overs Completed';
    }
    // 3. Target Chased
    // Limited Overs: 2nd innings chase.
    // Test: 4th innings chase.
    if (state.target !== undefined && state.score >= state.target) {
        return 'Target Chased';
    }
    return null;
};
exports.checkEndOfInnings = checkEndOfInnings;
var endInnings = function (state, reason) {
    return __assign({}, state);
};
exports.endInnings = endInnings;
