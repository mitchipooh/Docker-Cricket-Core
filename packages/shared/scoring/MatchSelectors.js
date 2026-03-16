"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTTCBPoints = exports.getBowlerAvailability = exports.getBowlingStats = exports.getBattingStats = exports.DISMISSAL_MATRIX = void 0;
var cricket_engine_ts_1 = require("../utils/cricket-engine.ts");
exports.DISMISSAL_MATRIX = {
    'Bowled': { credit: true, team: true, faced: true, fielder: false, color: 'bg-red-600' },
    'Caught': { credit: true, team: true, faced: true, fielder: true, color: 'bg-red-600' },
    'LBW': { credit: true, team: true, faced: true, fielder: false, color: 'bg-red-600' },
    'Stumped': { credit: true, team: true, faced: true, fielder: true, color: 'bg-red-600' },
    'Hit Wicket': { credit: true, team: true, faced: true, fielder: false, color: 'bg-red-600' },
    'Run Out': { credit: false, team: true, faced: true, fielder: true, color: 'bg-slate-600' },
    'Obstructing Field': { credit: false, team: true, faced: true, fielder: false, color: 'bg-slate-600' },
    'Hit Ball Twice': { credit: false, team: true, faced: true, fielder: false, color: 'bg-slate-600' },
    'Timed Out': { credit: false, team: true, faced: false, fielder: false, color: 'bg-slate-600' },
    'Retired Out': { credit: false, team: true, faced: false, fielder: false, color: 'bg-amber-600' },
    'Retired Hurt': { credit: false, team: false, faced: false, fielder: false, color: 'bg-amber-600' }
};
var getBattingStats = function (playerId, history, currentInnings) {
    var h = history.filter(function (b) { return b.strikerId === playerId && b.innings === currentInnings && !b.commentary.startsWith('EVENT'); });
    var r = h.reduce(function (acc, b) { return acc + b.runs; }, 0);
    var b = h.filter(function (x) {
        var dInfo = x.wicketType ? exports.DISMISSAL_MATRIX[x.wicketType] : null;
        return (dInfo && !dInfo.faced) ? false : (0, cricket_engine_ts_1.isLegalBall)(x.extraType);
    }).length;
    return {
        runs: r,
        balls: b,
        sr: b > 0 ? ((r / b) * 100).toFixed(0) : '0',
        fours: h.filter(function (x) { return x.runs === 4; }).length,
        sixes: h.filter(function (x) { return x.runs === 6; }).length,
        dots: h.filter(function (x) { return x.runs === 0; }).length,
        ones: h.filter(function (x) { return x.runs === 1; }).length
    };
};
exports.getBattingStats = getBattingStats;
var getBowlingStats = function (playerId, history, currentInnings) {
    var h = history.filter(function (b) { return b.bowlerId === playerId && b.innings === currentInnings && !b.commentary.startsWith('EVENT'); });
    var legalBalls = h.filter(function (x) { return (0, cricket_engine_ts_1.isLegalBall)(x.extraType); }).length;
    var runs = h.reduce(function (acc, x) {
        if (x.extraType === 'Bye' || x.extraType === 'LegBye')
            return acc;
        var extraPenalty = (x.extraType === 'Wide' || x.extraType === 'NoBall') ? 1 : 0;
        return acc + x.runs + extraPenalty + (x.extraType === 'Wide' ? (x.extraRuns || 0) : 0);
    }, 0);
    var wickets = h.filter(function (x) { var _a; return x.isWicket && (!x.wicketType || ((_a = exports.DISMISSAL_MATRIX[x.wicketType]) === null || _a === void 0 ? void 0 : _a.credit)); }).length;
    return {
        overs: "".concat(Math.floor(legalBalls / 6), ".").concat(legalBalls % 6),
        runs: runs,
        wickets: wickets,
        econ: legalBalls > 0 ? (runs / (legalBalls / 6)).toFixed(1) : '0.0'
    };
};
exports.getBowlingStats = getBowlingStats;
var getBowlerAvailability = function (playerId, state, match) {
    var _a;
    var matchFormat = (match === null || match === void 0 ? void 0 : match.format) || 'T20';
    var customOvers = (match === null || match === void 0 ? void 0 : match.customOvers) || (matchFormat === 'T20' ? 20 : 50);
    var totalOversAllowed = customOvers - (((_a = state.adjustments) === null || _a === void 0 ? void 0 : _a.oversLost) || 0);
    var maxQuota = Math.ceil(totalOversAllowed / 5);
    var h = state.history.filter(function (b) { return b.bowlerId === playerId && b.innings === state.innings && (0, cricket_engine_ts_1.isLegalBall)(b.extraType); });
    var oversBowled = Math.floor(h.length / 6);
    var isConsecutive = state.totalBalls > 0 && state.totalBalls % 6 === 0 && state.bowlerId === playerId;
    var isQuotaFull = matchFormat !== 'Test' && oversBowled >= maxQuota;
    return {
        isConsecutive: isConsecutive,
        isQuotaFull: isQuotaFull,
        oversBowled: oversBowled,
        quotaRemaining: Math.max(0, maxQuota - oversBowled)
    };
};
exports.getBowlerAvailability = getBowlerAvailability;
var calculateTTCBPoints = function (state, match) {
    var teamAPoints = 0, teamBPoints = 0;
    if (state.innings === 1) {
        if (state.score >= 300)
            teamAPoints += 4;
        else if (state.score >= 200)
            teamAPoints += 2;
        if (state.wickets >= 8)
            teamBPoints += 3;
        else if (state.wickets >= 5)
            teamBPoints += 2;
    }
    return { teamAPoints: teamAPoints, teamBPoints: teamBPoints };
};
exports.calculateTTCBPoints = calculateTTCBPoints;
