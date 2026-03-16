"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDerivedStats = void 0;
var react_1 = require("react");
var cricket_engine_ts_1 = require("../../utils/cricket-engine.ts");
var useDerivedStats = function (state, totalOversAllowed, battingTeam, bowlingTeam) {
    /* =====================
       BATTER STATS
    ===================== */
    var batterStats = (0, react_1.useMemo)(function () {
        var stats = {};
        battingTeam === null || battingTeam === void 0 ? void 0 : battingTeam.players.forEach(function (p) {
            stats[p.id] = {
                runs: 0,
                balls: 0,
                ones: 0,
                fours: 0,
                sixes: 0,
                strikeRate: 0,
                runRate: 0,
                isOut: false
            };
        });
        state.history.forEach(function (ball) {
            var _a, _b, _c;
            if (ball.innings !== state.innings || ((_a = ball.commentary) === null || _a === void 0 ? void 0 : _a.startsWith('EVENT')))
                return;
            if (!ball.strikerId)
                return;
            var batter = stats[ball.strikerId];
            if (!batter)
                return;
            // Balls faced (exclude Wides/NB for valid balls faced stats)
            var isLegal = (0, cricket_engine_ts_1.isLegalBall)(ball.extraType);
            if (isLegal) {
                batter.balls += 1;
            }
            // Runs calculation
            // Wides don't count for batter runs
            if (ball.extraType !== 'Wide') {
                var r = (_c = (_b = ball.batRuns) !== null && _b !== void 0 ? _b : ball.runs) !== null && _c !== void 0 ? _c : 0;
                batter.runs += r;
                if (r === 1)
                    batter.ones += 1;
                if (r === 4)
                    batter.fours += 1;
                if (r === 6)
                    batter.sixes += 1;
            }
            // Wicket
            if (ball.isWicket && ball.outPlayerId === ball.strikerId) {
                batter.isOut = true;
                batter.dismissal = ball.dismissalType || ball.wicketType;
            }
        });
        Object.values(stats).forEach(function (b) {
            b.strikeRate =
                b.balls > 0 ? parseFloat(((b.runs / b.balls) * 100).toFixed(1)) : 0;
            b.runRate =
                b.balls > 0 ? parseFloat(((b.runs / b.balls) * 6).toFixed(2)) : 0;
        });
        return stats;
    }, [state.history, state.innings, battingTeam]);
    /* =====================
       BOWLER STATS
    ===================== */
    var bowlerStats = (0, react_1.useMemo)(function () {
        var stats = {};
        var oversData = {};
        bowlingTeam === null || bowlingTeam === void 0 ? void 0 : bowlingTeam.players.forEach(function (p) {
            stats[p.id] = {
                balls: 0,
                runs: 0,
                wickets: 0,
                maidens: 0,
                overs: '0.0',
                economy: 0
            };
        });
        state.history.forEach(function (ball) {
            var _a;
            if (ball.innings !== state.innings || ((_a = ball.commentary) === null || _a === void 0 ? void 0 : _a.startsWith('EVENT')))
                return;
            if (!ball.bowlerId)
                return;
            var bowler = stats[ball.bowlerId];
            if (!bowler)
                return;
            var penalty = (ball.extraType === 'Wide' || ball.extraType === 'NoBall') ? 1 : 0;
            if (ball.extraType !== 'Bye' && ball.extraType !== 'LegBye') {
                bowler.runs += (ball.runs + (ball.extraRuns || 0) + penalty);
            }
            if (ball.isWicket && ball.creditBowler) {
                bowler.wickets += 1;
            }
            if ((0, cricket_engine_ts_1.isLegalBall)(ball.extraType)) {
                bowler.balls += 1;
            }
            var overIdx = ball.over;
            if (!oversData[overIdx]) {
                oversData[overIdx] = { bowlerId: ball.bowlerId, runs: 0, legalBalls: 0 };
            }
            if ((0, cricket_engine_ts_1.isLegalBall)(ball.extraType)) {
                oversData[overIdx].legalBalls += 1;
            }
            if (ball.extraType !== 'Bye' && ball.extraType !== 'LegBye') {
                oversData[overIdx].runs += (ball.runs + (ball.extraRuns || 0) + penalty);
            }
        });
        Object.values(oversData).forEach(function (o) {
            if (o.legalBalls === 6 && o.runs === 0 && stats[o.bowlerId]) {
                stats[o.bowlerId].maidens += 1;
            }
        });
        Object.values(stats).forEach(function (b) {
            b.overs = (0, cricket_engine_ts_1.getOverString)(b.balls);
            var totalOvers = b.balls / 6;
            b.economy = totalOvers > 0 ? parseFloat((b.runs / totalOvers).toFixed(2)) : 0;
        });
        return stats;
    }, [state.history, state.innings, bowlingTeam]);
    var runRate = (0, react_1.useMemo)(function () {
        return state.totalBalls > 0
            ? parseFloat(((state.score / state.totalBalls) * 6).toFixed(2))
            : 0;
    }, [state.score, state.totalBalls]);
    var requiredRate = (0, react_1.useMemo)(function () {
        if (state.innings !== 2 || !state.target)
            return 0;
        var runsNeeded = state.target - state.score;
        var ballsRemaining = (totalOversAllowed * 6) - state.totalBalls;
        if (ballsRemaining <= 0)
            return 0;
        return parseFloat(((runsNeeded / ballsRemaining) * 6).toFixed(2));
    }, [state.innings, state.target, state.score, state.totalBalls, totalOversAllowed]);
    return {
        batterStats: batterStats,
        bowlerStats: bowlerStats,
        runRate: runRate,
        requiredRate: requiredRate,
        overs: (0, cricket_engine_ts_1.getOverString)(state.totalBalls)
    };
};
exports.useDerivedStats = useDerivedStats;
