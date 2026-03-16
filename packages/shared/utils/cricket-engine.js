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
exports.getBallColor = exports.updatePlayerStatsFromReport = exports.getOverString = exports.isLegalBall = exports.calculateDLSTarget = exports.calculateStandings = exports.generateKnockouts = exports.generateRoundRobin = void 0;
/**
 * Generates a Round Robin schedule for a list of teams.
 */
var generateRoundRobin = function (teams, tournamentId, groupId) {
    var fixtures = [];
    var n = teams.length;
    var teamPool = __spreadArray([], teams, true);
    if (n % 2 !== 0)
        teamPool.push({ id: 'BYE', name: 'BYE', players: [] });
    var numRounds = teamPool.length - 1;
    var half = teamPool.length / 2;
    for (var round = 0; round < numRounds; round++) {
        for (var i = 0; i < half; i++) {
            var teamA = teamPool[i];
            var teamB = teamPool[teamPool.length - 1 - i];
            if (teamA.id !== 'BYE' && teamB.id !== 'BYE') {
                fixtures.push({
                    id: "match-".concat(Date.now(), "-").concat(round, "-").concat(i),
                    tournamentId: tournamentId,
                    groupId: groupId,
                    stage: 'Group',
                    teamAId: teamA.id,
                    teamBId: teamB.id,
                    teamAName: teamA.name,
                    teamBName: teamB.name,
                    date: new Date(Date.now() + round * 86400000).toISOString().split('T')[0],
                    venue: 'Arena ' + (i + 1),
                    status: 'Scheduled',
                    format: 'T20' // Default, can be overridden
                });
            }
        }
        // Rotate pool
        var last = teamPool.pop();
        teamPool.splice(1, 0, last);
    }
    return fixtures;
};
exports.generateRoundRobin = generateRoundRobin;
/**
 * Generates Knockout Stage Fixtures (Semi-Finals & Final)
 */
var generateKnockouts = function (qualifiedTeams, tournamentId, format) {
    if (format === void 0) { format = 'T20'; }
    if (qualifiedTeams.length < 4)
        return [];
    var finalId = "match-final-".concat(Date.now());
    var sf1Id = "match-sf1-".concat(Date.now());
    var sf2Id = "match-sf2-".concat(Date.now());
    // 1 vs 4
    var sf1 = {
        id: sf1Id,
        tournamentId: tournamentId,
        stage: 'Semi-Final',
        relatedMatchId: finalId,
        teamAId: qualifiedTeams[0].teamId,
        teamBId: qualifiedTeams[3].teamId,
        teamAName: qualifiedTeams[0].teamName,
        teamBName: qualifiedTeams[3].teamName,
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        venue: 'Main Stadium',
        status: 'Scheduled',
        format: format
    };
    // 2 vs 3
    var sf2 = {
        id: sf2Id,
        tournamentId: tournamentId,
        stage: 'Semi-Final',
        relatedMatchId: finalId,
        teamAId: qualifiedTeams[1].teamId,
        teamBId: qualifiedTeams[2].teamId,
        teamAName: qualifiedTeams[1].teamName,
        teamBName: qualifiedTeams[2].teamName,
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        venue: 'Main Stadium',
        status: 'Scheduled',
        format: format
    };
    // Final (Placeholder)
    var final = {
        id: finalId,
        tournamentId: tournamentId,
        stage: 'Final',
        teamAId: 'TBD',
        teamBId: 'TBD',
        teamAName: 'Winner SF1',
        teamBName: 'Winner SF2',
        date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        venue: 'Grand Oval',
        status: 'Scheduled',
        format: format
    };
    return [sf1, sf2, final];
};
exports.generateKnockouts = generateKnockouts;
var pointsCalculator_1 = require("./pointsCalculator");
var pointsEngine_1 = require("../competition/pointsEngine");
/**
 * Calculate Standings for a group based on fixtures
 */
var calculateStandings = function (teams, fixtures, pointsConfig) {
    // Defensive merge to handle legacy tournaments missing new fields
    var config = __assign(__assign({}, pointsEngine_1.DEFAULT_POINTS_CONFIG), pointsConfig);
    var standingsMap = {};
    // Initialize
    teams.forEach(function (t) {
        standingsMap[t.id] = {
            teamId: t.id,
            teamName: t.name,
            played: 0,
            won: 0,
            lost: 0,
            drawn: 0,
            tied: 0,
            points: 0,
            bonusPoints: 0, // NEW
            nrr: 0,
            runsFor: 0,
            oversFor: 0,
            runsAgainst: 0,
            oversAgainst: 0
        };
    });
    fixtures.forEach(function (match) {
        if (match.status !== 'Completed' || match.stage !== 'Group')
            return;
        var tA = standingsMap[match.teamAId];
        var tB = standingsMap[match.teamBId];
        if (!tA || !tB)
            return;
        tA.played++;
        tB.played++;
        if (match.pointsData) {
            var pA = (0, pointsCalculator_1.calculatePointsForSide)('A', match.pointsData, config);
            var pB = (0, pointsCalculator_1.calculatePointsForSide)('B', match.pointsData, config);
            tA.points += pA.total;
            tA.bonusPoints += (pA.battingBonus + pA.bowlingBonus);
            tB.points += pB.total;
            tB.bonusPoints += (pB.battingBonus + pB.bowlingBonus);
            if (match.pointsData.winnerSide === 'A') {
                tA.won++;
                tB.lost++;
            }
            else if (match.pointsData.winnerSide === 'B') {
                tB.won++;
                tA.lost++;
            }
            else if (match.pointsData.winnerSide === 'TIE') {
                tA.tied++;
                tB.tied++;
            }
            else {
                tA.drawn++;
                tB.drawn++;
            }
        }
        else if (match.winnerId) {
            // Fallback for legacy/simple matches
            if (match.winnerId === match.teamAId) {
                tA.won++;
                tA.points += config.win;
                tB.lost++;
                tB.points += config.loss;
            }
            else if (match.winnerId === match.teamBId) {
                tB.won++;
                tB.points += config.win;
                tA.lost++;
                tA.points += config.loss;
            }
            else if (match.winnerId === 'TIE') {
                tA.tied++;
                tB.tied++;
                tA.points += config.tie;
                tB.points += config.tie;
            }
            else {
                tA.drawn++;
                tB.drawn++;
                tA.points += config.noResult;
                tB.points += config.noResult;
            }
        }
        // TODO: Advanced NRR calculation
    });
    return Object.values(standingsMap).sort(function (a, b) {
        if (b.points !== a.points)
            return b.points - a.points;
        return b.nrr - a.nrr;
    });
};
exports.calculateStandings = calculateStandings;
/**
 * DLS Resource Table approximation logic.
 * In a real production environment, this would use the official ICC DLS standard table.
 */
var calculateDLSTarget = function (firstInningsTotal, oversLost, wicketsDown, totalOvers) {
    if (totalOvers === void 0) { totalOvers = 20; }
    // Simple resource percentage calculation for demonstration
    var resourceLeft = (totalOvers - oversLost) / totalOvers;
    var wicketPenalty = 1 - (wicketsDown * 0.05); // Rough heuristic
    var adjustedTarget = Math.ceil(firstInningsTotal * resourceLeft * wicketPenalty) + 1;
    return adjustedTarget;
};
exports.calculateDLSTarget = calculateDLSTarget;
/**
 * Standard Cricket logic for over progression.
 */
var isLegalBall = function (extraType) {
    return extraType !== 'Wide' && extraType !== 'NoBall';
};
exports.isLegalBall = isLegalBall;
var getOverString = function (balls) {
    var overs = Math.floor(balls / 6);
    var remainder = balls % 6;
    return "".concat(overs, ".").concat(remainder);
};
exports.getOverString = getOverString;
/**
 * Updates player statistics based on a verified match report.
 */
var updatePlayerStatsFromReport = function (orgs, report) {
    return orgs.map(function (org) { return (__assign(__assign({}, org), { memberTeams: org.memberTeams.map(function (team) { return (__assign(__assign({}, team), { players: team.players.map(function (player) {
                var perf = report.playerPerformances.find(function (p) { return p.playerId === player.id; });
                if (!perf)
                    return player;
                return __assign(__assign({}, player), { stats: __assign(__assign({}, player.stats), { matches: player.stats.matches + 1, runs: player.stats.runs + perf.runs, ballsFaced: player.stats.ballsFaced + perf.balls, wickets: player.stats.wickets + perf.wickets, ballsBowled: player.stats.ballsBowled + (perf.overs * 6), runsConceded: player.stats.runsConceded + perf.runsConceded, catches: player.stats.catches + perf.catches, stumpings: player.stats.stumpings + perf.stumpings, runOuts: player.stats.runOuts + perf.runOuts, fours: player.stats.fours + perf.fours, sixes: player.stats.sixes + perf.sixes, maidens: player.stats.maidens + perf.maidens, highestScore: Math.max(player.stats.highestScore || 0, perf.runs), hundreds: player.stats.hundreds + (perf.runs >= 100 ? 1 : 0), fifties: player.stats.fifties + (perf.runs >= 50 && perf.runs < 100 ? 1 : 0), ducks: player.stats.ducks + (perf.runs === 0 ? 1 : 0), threeWickets: player.stats.threeWickets + (perf.wickets >= 3 && perf.wickets < 5 ? 1 : 0), fiveWickets: player.stats.fiveWickets + (perf.wickets >= 5 ? 1 : 0) }) });
            }) })); }), fixtures: org.fixtures.map(function (f) {
            if (f.id === report.matchId) {
                return __assign(__assign({}, f), { reportSubmission: __assign(__assign({}, report), { status: 'VERIFIED' }) });
            }
            return f;
        }) })); });
};
exports.updatePlayerStatsFromReport = updatePlayerStatsFromReport;
/**
 * Returns the color for a ball based on its result (runs, extras, wickets).
 * Synchronized with the scoring pad colors.
 */
var getBallColor = function (ball) {
    if (ball.isWicket)
        return '#b91c1c'; // Red 700
    if (ball.extraType && ball.extraType !== 'None')
        return '#b45309'; // Amber 700
    if (ball.runs === 4)
        return '#4f46e5'; // Indigo 600
    if (ball.runs === 6)
        return '#10b981'; // Emerald 600
    return '#1e293b'; // Slate 800 (Default for 0-3 runs)
};
exports.getBallColor = getBallColor;
