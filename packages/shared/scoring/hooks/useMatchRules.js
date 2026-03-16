"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMatchRules = void 0;
var react_1 = require("react");
var cricket_engine_ts_1 = require("../../utils/cricket-engine.ts");
var useMatchRules = function (match, state, bowlingTeam) {
    /* =====================
       FORMAT & OVERS
    ===================== */
    var _a;
    var matchFormat = (match === null || match === void 0 ? void 0 : match.format) || 'T20';
    var customOvers = match === null || match === void 0 ? void 0 : match.customOvers;
    var rawOvers = customOvers !== null && customOvers !== void 0 ? customOvers : (matchFormat === 'T10'
        ? 10
        : matchFormat === 'T20'
            ? 20
            : matchFormat === '40-over'
                ? 40
                : matchFormat === '50-over'
                    ? 50
                    : 90); // Test default day
    var oversLost = ((_a = state.adjustments) === null || _a === void 0 ? void 0 : _a.oversLost) || 0;
    // SAFETY: Ensure totalOversAllowed is never 0 for limited overs to avoid quota deadlock
    var totalOversAllowed = Math.max(1, (rawOvers || 20) - oversLost);
    /* =====================
       1/5 BOWLING QUOTA RULE
    ===================== */
    var baseQuota = Math.floor(totalOversAllowed / 5);
    var remainderQuota = totalOversAllowed % 5;
    var maxQuota = Math.ceil(totalOversAllowed / 5);
    var bowlerStats = (0, react_1.useMemo)(function () {
        var stats = {};
        if (bowlingTeam) {
            bowlingTeam.players.forEach(function (p) {
                stats[p.id] = { balls: 0, overs: 0 };
            });
        }
        state.history.forEach(function (ball) {
            if (ball.innings === state.innings &&
                (0, cricket_engine_ts_1.isLegalBall)(ball.extraType) &&
                !ball.commentary.startsWith('EVENT')) {
                if (!stats[ball.bowlerId]) {
                    stats[ball.bowlerId] = { balls: 0, overs: 0 };
                }
                stats[ball.bowlerId].balls++;
                stats[ball.bowlerId].overs = Math.floor(stats[ball.bowlerId].balls / 6);
            }
        });
        return stats;
    }, [state.history, state.innings, bowlingTeam]);
    var bowlersUsingBonusOvers = (0, react_1.useMemo)(function () {
        return Object.values(bowlerStats).filter(function (s) { return s.balls > baseQuota * 6; }).length;
    }, [bowlerStats, baseQuota]);
    /* =====================
       BOWLER AVAILABILITY
    ===================== */
    var getBowlerAvailability = function (playerId) {
        var stats = bowlerStats[playerId] || { balls: 0, overs: 0 };
        var oversBowled = stats.overs;
        var ballsIntoOver = stats.balls % 6;
        // Consecutive over rule
        var isConsecutive = false;
        if (state.totalBalls > 0 && state.totalBalls % 6 === 0) {
            if (state.bowlerId === playerId) {
                isConsecutive = true;
            }
        }
        // Quota rules (not Test)
        if (matchFormat !== 'Test') {
            if (oversBowled >= maxQuota) {
                return {
                    allowed: false,
                    reason: 'Quota Full',
                    isConsecutive: isConsecutive,
                    oversBowled: oversBowled
                };
            }
            if (oversBowled === baseQuota &&
                ballsIntoOver === 0 &&
                bowlersUsingBonusOvers >= remainderQuota &&
                remainderQuota > 0) {
                return {
                    allowed: false,
                    reason: 'Max Bonus Overs Used',
                    isConsecutive: isConsecutive,
                    oversBowled: oversBowled
                };
            }
        }
        return {
            allowed: !isConsecutive,
            reason: isConsecutive ? 'Consecutive Over' : 'OK',
            isConsecutive: isConsecutive,
            oversBowled: oversBowled
        };
    };
    /* =====================
       OVER RATE EXPECTATION
    ===================== */
    var expectedMsPerOver = 4.25 * 60 * 1000;
    var targetDurationMs = totalOversAllowed * expectedMsPerOver;
    /* =====================
       EXPORT
    ===================== */
    return {
        matchFormat: matchFormat,
        totalOversAllowed: totalOversAllowed,
        // Quotas
        baseQuota: baseQuota,
        remainderQuota: remainderQuota,
        maxQuota: maxQuota,
        // Bowlers
        bowlerStats: bowlerStats,
        getBowlerAvailability: getBowlerAvailability,
        // Time
        targetDurationMs: targetDurationMs
    };
};
exports.useMatchRules = useMatchRules;
