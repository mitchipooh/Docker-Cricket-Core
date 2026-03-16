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
exports.buildPointsTable = buildPointsTable;
var pointsEngine_ts_1 = require("./pointsEngine.ts");
function buildPointsTable(matches, teams) {
    var table = new Map();
    // Initialize all teams in the competition
    teams.forEach(function (t) {
        table.set(t.id, {
            teamId: t.id,
            teamName: t.name,
            played: 0,
            won: 0,
            lost: 0,
            tied: 0,
            nr: 0,
            drawn: 0,
            points: 0,
            bonusPoints: 0,
            runsFor: 0,
            oversFor: 0,
            runsAgainst: 0,
            oversAgainst: 0,
            nrr: 0
        });
    });
    matches.forEach(function (m) {
        var teamA = table.get(m.teamAId);
        var teamB = table.get(m.teamBId);
        if (!teamA || !teamB)
            return;
        teamA.played++;
        teamB.played++;
        // NRR Components
        teamA.runsFor += m.teamAScore;
        teamA.oversFor += m.teamAOvers;
        teamA.runsAgainst += m.teamBScore;
        teamA.oversAgainst += m.teamBOvers;
        teamB.runsFor += m.teamBScore;
        teamB.oversFor += m.teamBOvers;
        teamB.runsAgainst += m.teamAScore;
        teamB.oversAgainst += m.teamAOvers;
        // Points
        teamA.points += (0, pointsEngine_ts_1.calculatePoints)(m.result, 'A');
        teamB.points += (0, pointsEngine_ts_1.calculatePoints)(m.result, 'B');
        // Result Tally
        if (m.result === 'TIE') {
            teamA.tied++;
            teamB.tied++;
        }
        else if (m.result === 'HOME_WIN') {
            teamA.won++;
            teamB.lost++;
        }
        else if (m.result === 'AWAY_WIN') {
            teamB.won++;
            teamA.lost++;
        }
        else {
            teamA.nr++;
            teamB.nr++;
        }
    });
    return Array.from(table.values())
        .map(function (row) {
        // Net Run Rate = (Runs Scored / Overs Faced) - (Runs Conceded / Overs Bowled)
        var rrFor = row.oversFor > 0 ? row.runsFor / row.oversFor : 0;
        var rrAgainst = row.oversAgainst > 0 ? row.runsAgainst / row.oversAgainst : 0;
        return __assign(__assign({}, row), { nrr: parseFloat((rrFor - rrAgainst).toFixed(3)) });
    })
        .sort(function (a, b) {
        if (b.points !== a.points)
            return b.points - a.points;
        return b.nrr - a.nrr;
    });
}
