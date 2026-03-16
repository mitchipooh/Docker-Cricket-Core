"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMVP = void 0;
var MatchSelectors_1 = require("../@cricket/shared/scoring/MatchSelectors");
var POINTS_SYSTEM = {
    RUN: 1,
    FOUR: 1,
    SIX: 2,
    WICKET: 20,
    MAIDEN: 4,
    DOT_BALL: 0.5,
    CATCH: 10,
    RUN_OUT: 15,
    STUMPING: 15,
    ECONOMY_BONUS: 10, // < 6 RPO
    STRIKE_RATE_BONUS: 10 // > 140 SR
};
var calculateMVP = function (matchState, allPlayers) {
    var performances = allPlayers.map(function (player) {
        var batPoints = 0;
        var bowlPoints = 0;
        var fieldingPoints = 0;
        var totalRuns = 0;
        var totalBalls = 0;
        var totalWickets = 0;
        var totalRunsConceded = 0;
        var totalMaidens = 0;
        var totalCatches = 0;
        var totalRunOuts = 0;
        var totalStumpings = 0;
        // Iterate through all possible innings (1-4)
        [1, 2, 3, 4].forEach(function (innings) {
            // 1. Batting Stats
            var batStats = (0, MatchSelectors_1.getBattingStats)(player.id, matchState.history, innings);
            totalRuns += batStats.runs;
            totalBalls += batStats.balls;
            batPoints += (batStats.runs * POINTS_SYSTEM.RUN) + (batStats.fours * POINTS_SYSTEM.FOUR) + (batStats.sixes * POINTS_SYSTEM.SIX);
            // 2. Bowling Stats
            var bowlStats = (0, MatchSelectors_1.getBowlingStats)(player.id, matchState.history, innings);
            totalWickets += bowlStats.wickets;
            totalRunsConceded += bowlStats.runs;
            bowlPoints += (bowlStats.wickets * POINTS_SYSTEM.WICKET);
            // Manual Maiden Calculation
            var bowlerBalls = matchState.history.filter(function (b) { return b.bowlerId === player.id && b.innings === innings && (b.extraType === 'None' || !b.extraType); });
            var overs = {};
            bowlerBalls.forEach(function (b) {
                overs[b.over] = (overs[b.over] || 0) + b.runs;
            });
            var maidens = Object.values(overs).filter(function (r) { return r === 0; }).length;
            totalMaidens += maidens;
            bowlPoints += (maidens * POINTS_SYSTEM.MAIDEN);
            // Dot Balls
            var dotBalls = matchState.history.filter(function (b) { return b.innings === innings && b.bowlerId === player.id && b.runs === 0 && (b.extraType === 'None' || !b.extraType); }).length;
            bowlPoints += (dotBalls * POINTS_SYSTEM.DOT_BALL);
        });
        // Bonuses (Match Totals)
        if (totalRuns > 30 && totalBalls > 0 && ((totalRuns / totalBalls) * 100) > 140)
            batPoints += POINTS_SYSTEM.STRIKE_RATE_BONUS;
        if (totalRuns >= 50)
            batPoints += 20;
        if (totalRuns >= 100)
            batPoints += 40;
        if (totalWickets >= 3)
            bowlPoints += 20;
        if (totalWickets >= 5)
            bowlPoints += 40;
        // Economy Bonus (Approximate over match) - only if bowled > 2 overs
        var totalOversBowledCount = matchState.history.filter(function (b) { return b.bowlerId === player.id && (b.extraType === 'None' || !b.extraType); }).length;
        var totalOversBowled = totalOversBowledCount / 6;
        if (totalOversBowled >= 2 && (totalRunsConceded / totalOversBowled) < 6.0)
            bowlPoints += POINTS_SYSTEM.ECONOMY_BONUS;
        // 3. Fielding Stats
        matchState.history.forEach(function (b) {
            if (b.isWicket) {
                if (b.fielderId === player.id) {
                    if (b.wicketType === 'Caught') {
                        totalCatches++;
                        fieldingPoints += POINTS_SYSTEM.CATCH;
                    }
                    if (b.wicketType === 'Run Out') {
                        totalRunOuts++;
                        fieldingPoints += POINTS_SYSTEM.RUN_OUT;
                    }
                    if (b.wicketType === 'Stumped') {
                        totalStumpings++;
                        fieldingPoints += POINTS_SYSTEM.STUMPING;
                    }
                }
                // Direct Hit / Assist logic could go here
                if (b.assistFielderId === player.id && b.wicketType === 'Run Out') {
                    fieldingPoints += (POINTS_SYSTEM.RUN_OUT / 2);
                }
            }
        });
        return {
            playerId: player.id,
            points: batPoints + bowlPoints + fieldingPoints,
            stats: {
                runs: totalRuns,
                balls: totalBalls,
                wickets: totalWickets,
                runsConceded: totalRunsConceded,
                catches: totalCatches,
                runOuts: totalRunOuts,
                stumpings: totalStumpings
            },
            breakdown: {
                battingPoints: batPoints,
                bowlingPoints: bowlPoints,
                fieldingPoints: fieldingPoints
            }
        };
    });
    return performances.sort(function (a, b) { return b.points - a.points; });
};
exports.calculateMVP = calculateMVP;
