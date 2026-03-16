"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLiveStatusUpdate = exports.generateMatchNews = void 0;
var idGenerator_1 = require("./idGenerator");
/**
 * Generates an AI-style news article for a completed match.
 */
var generateMatchNews = function (match, state) {
    var _a;
    var winnerId = match.winnerId;
    var teamA = match.teamAName;
    var teamB = match.teamBName;
    var teamAScoreRec = state.inningsScores.find(function (i) { return i.teamId === match.teamAId; });
    var teamBScoreRec = state.inningsScores.find(function (i) { return i.teamId === match.teamBId; });
    var scoreA = "".concat((teamAScoreRec === null || teamAScoreRec === void 0 ? void 0 : teamAScoreRec.score) || 0, "/").concat((teamAScoreRec === null || teamAScoreRec === void 0 ? void 0 : teamAScoreRec.wickets) || 0);
    var scoreB = "".concat((teamBScoreRec === null || teamBScoreRec === void 0 ? void 0 : teamBScoreRec.score) || 0, "/").concat((teamBScoreRec === null || teamBScoreRec === void 0 ? void 0 : teamBScoreRec.wickets) || 0);
    var headline = '';
    var body = '';
    // Determine Winner Context
    var winningTeamName = winnerId === match.teamAId ? teamA : match.teamBId ? teamB : 'Match Drawn';
    if ((_a = match.result) === null || _a === void 0 ? void 0 : _a.includes('won by')) {
        headline = "".concat(winningTeamName, " Dominates in Thrilling Contest against ").concat(winnerId === match.teamAId ? teamB : teamA);
    }
    else {
        headline = "".concat(teamA, " vs ").concat(teamB, " Ends in ").concat(match.result);
    }
    // Identify Top Performers (Mock logic for now, ideally parse stats)
    // We can extract best batsman/bowler from stats if available, or just generic commentary.
    var bestBat = "Top Order"; // Placeholder
    var bestBowl = "Bowling Attack"; // Placeholder
    body = "\nIn a gripping encounter at ".concat(match.venue, ", ").concat(winningTeamName, " secured a victory.\n").concat(teamA, " posted ").concat(scoreA, ", while ").concat(teamB, " managed ").concat(scoreB, ".\nThe ").concat(bestBat, " performed exceptionally well, supported by a disciplined ").concat(bestBowl, ".\n\nStatus: ").concat(match.status, "\nResult: ").concat(match.result, "\n    ").trim();
    return {
        id: (0, idGenerator_1.generateId)('news'),
        type: 'NEWS',
        authorName: 'Cricket Core AI',
        authorAvatar: '', // Use a default AI avatar later
        title: headline,
        caption: body,
        timestamp: Date.now(),
        likes: [],
        dislikes: [],
        shares: 0,
        comments: [],
        matchId: match.id
    };
};
exports.generateMatchNews = generateMatchNews;
/**
 * Generates a Live Status update for an ongoing match.
 */
var generateLiveStatusUpdate = function (match, state) {
    var teamA = match.teamAName;
    var teamB = match.teamBName;
    var battingTeamId = state.battingTeamId;
    var battingTeamName = battingTeamId === match.teamAId ? teamA : teamB;
    var currentScore = "".concat(state.score, "/").concat(state.wickets);
    var overs = Math.floor(state.totalBalls / 6) + '.' + (state.totalBalls % 6);
    return {
        id: (0, idGenerator_1.generateId)('live'),
        type: 'LIVE_STATUS',
        authorName: 'Match Centre',
        title: "LIVE: ".concat(battingTeamName, " ").concat(currentScore, " (").concat(overs, ")"),
        caption: "Live update from ".concat(match.venue, ". ").concat(battingTeamName, " are currently batting at ").concat(currentScore, " after ").concat(overs, " overs."),
        timestamp: Date.now(),
        likes: [],
        dislikes: [],
        shares: 0,
        comments: [],
        matchId: match.id,
        contentUrl: '' // If we had a screenshot URL, it would go here
    };
};
exports.generateLiveStatusUpdate = generateLiveStatusUpdate;
