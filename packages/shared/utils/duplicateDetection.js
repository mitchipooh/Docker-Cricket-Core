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
exports.generateGameId = generateGameId;
exports.checkForDuplicateMatch = checkForDuplicateMatch;
exports.markAsDuplicate = markAsDuplicate;
exports.filterNonDuplicateMatches = filterNonDuplicateMatches;
exports.getDuplicateMatches = getDuplicateMatches;
exports.isSameGame = isSameGame;
/**
 * Generates a unique game ID based on teams and date
 * This ensures the same teams playing on the same day get the same gameId
 * regardless of which match was created first
 */
function generateGameId(teamAId, teamBId, date) {
    // Sort team IDs to ensure consistency regardless of order
    var _a = [teamAId, teamBId].sort(), team1 = _a[0], team2 = _a[1];
    // Convert date to YYYY-MM-DD format
    var dateStr;
    if (typeof date === 'number') {
        dateStr = new Date(date).toISOString().split('T')[0];
    }
    else {
        // Assume date is already in a parseable format
        dateStr = new Date(date).toISOString().split('T')[0];
    }
    return "".concat(team1, "_").concat(team2, "_").concat(dateStr);
}
/**
 * Checks if a new fixture would be a duplicate of an existing match
 */
function checkForDuplicateMatch(newFixture, existingFixtures) {
    if (!newFixture.teamAId || !newFixture.teamBId || (!newFixture.date && !newFixture.timestamp)) {
        // Can't check for duplicates without required fields
        return {
            isDuplicate: false,
            gameId: ''
        };
    }
    var gameId = generateGameId(newFixture.teamAId, newFixture.teamBId, newFixture.timestamp || newFixture.date);
    // Find existing match with same gameId
    var existingMatch = existingFixtures.find(function (f) { return f.gameId === gameId; });
    return {
        isDuplicate: !!existingMatch,
        primaryMatch: existingMatch,
        gameId: gameId
    };
}
/**
 * Marks a fixture as duplicate and links it to the primary match
 */
function markAsDuplicate(fixture, primaryMatch, reason) {
    return __assign(__assign({}, fixture), { isDuplicate: true, primaryMatchId: primaryMatch.id, duplicateReason: reason || "Duplicate of match ".concat(primaryMatch.id), gameId: primaryMatch.gameId });
}
/**
 * Filters out duplicate matches from a list of fixtures
 * Used for stats calculation to ensure duplicates don't count
 */
function filterNonDuplicateMatches(fixtures) {
    return fixtures.filter(function (f) { return !f.isDuplicate; });
}
/**
 * Gets all duplicates of a primary match
 */
function getDuplicateMatches(primaryMatchId, allFixtures) {
    return allFixtures.filter(function (f) { return f.primaryMatchId === primaryMatchId; });
}
/**
 * Checks if two fixtures represent the same game
 */
function isSameGame(fixture1, fixture2) {
    if (fixture1.gameId && fixture2.gameId) {
        return fixture1.gameId === fixture2.gameId;
    }
    // Fallback: check teams and date
    var sameTeams = ((fixture1.teamAId === fixture2.teamAId && fixture1.teamBId === fixture2.teamBId) ||
        (fixture1.teamAId === fixture2.teamBId && fixture1.teamBId === fixture2.teamAId));
    var date1 = new Date(fixture1.timestamp || fixture1.date).toISOString().split('T')[0];
    var date2 = new Date(fixture2.timestamp || fixture2.date).toISOString().split('T')[0];
    return sameTeams && date1 === date2;
}
