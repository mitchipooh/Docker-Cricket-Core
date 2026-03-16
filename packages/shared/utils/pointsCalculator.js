"use strict";
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
exports.calculateBonusPoints = calculateBonusPoints;
exports.calculateTeamPoints = calculateTeamPoints;
exports.calculatePointsForSide = calculatePointsForSide;
/**
 * Calculates bonus points based on thresholds
 */
function calculateBonusPoints(value, tiers, max) {
    var earned = 0;
    // Tiers are typically sorted by threshold ascending
    var sortedTiers = __spreadArray([], tiers, true).sort(function (a, b) { return a.threshold - b.threshold; });
    for (var _i = 0, sortedTiers_1 = sortedTiers; _i < sortedTiers_1.length; _i++) {
        var tier = sortedTiers_1[_i];
        if (value >= tier.threshold) {
            earned = tier.points;
        }
    }
    return Math.min(earned, max);
}
/**
 * Calculates total points for a team in a single match
 */
function calculateTeamPoints(isTeamA, payload, config) {
    var matchPoints = 0;
    var inningPoints = 0;
    var isIncomplete = payload.isIncomplete;
    // 1. Outright Match Points
    if (!isIncomplete) {
        if (payload.resultType === 'OUTRIGHT_WIN') {
            // Determine if this team is the winner
            // Note: This assumes we know who won. We'll simplify: 
            // If result is WIN, we need to know for which team we are calculating.
            // We'll pass the winnerId or side in a real implementation.
        }
    }
    // Refined approach: calculate for a specific side
    var teamRuns = isTeamA ? payload.teamARuns : payload.teamBRuns;
    var teamWickets = isTeamA ? payload.teamAWickets : payload.teamBWickets;
    var opponentWickets = isTeamA ? payload.teamBWickets : payload.teamAWickets;
    // OUTRIGHT RESULT
    if (!isIncomplete) {
        if (payload.resultType === 'OUTRIGHT_WIN') {
            // Logic for winner/loser
            // Assume MatchScoringPayload includes winnerSide: 'A' | 'B' | 'TIE'
        }
    }
    return null; // placeholder for refined logic below
}
// Rewriting for clarity based on user side parameter
function calculatePointsForSide(side, payload, config) {
    var matchPoints = 0;
    var inningPoints = 0;
    var isWinner = payload.winnerSide === side;
    var isMatchTie = payload.winnerSide === 'TIE';
    // 1. Outright Match Points
    if (!payload.isIncomplete) {
        if (isWinner)
            matchPoints = config.win_outright;
        else if (isMatchTie)
            matchPoints = config.tie_match;
    }
    // 2. Inning Points (First Innings Lead/Tie/Loss)
    // Determine if this side won first innings
    var didLead = payload.firstInningsWinnerId === (side === 'A' ? 'teamA' : 'teamB'); // placeholder logic for IDs
    // To make it robust, we'll use a result field in payload
    // Revised Payload for robust calculation:
    // firstInningsResultSideA: 'LEAD' | 'TIE' | 'LOSS' | 'NONE'
    var actualInningResult = side === 'A' ? payload.firstInningsResult : (payload.firstInningsResult === 'LEAD' ? 'LOSS' : (payload.firstInningsResult === 'LOSS' ? 'LEAD' : payload.firstInningsResult));
    if (actualInningResult === 'LEAD')
        inningPoints = config.first_inning_lead;
    else if (actualInningResult === 'TIE')
        inningPoints = config.first_inning_tie;
    else if (actualInningResult === 'LOSS')
        inningPoints = config.first_inning_loss;
    // Incomplete match logic: "prioritize Inning Points over Outright Win points"
    // This means if isIncomplete is true, matchPoints should definitely be 0.
    if (payload.isIncomplete) {
        matchPoints = 0;
    }
    // 3. Bonus Points
    var teamRuns = side === 'A' ? payload.teamARuns : payload.teamBRuns;
    var opponentWicketsTaken = side === 'A' ? payload.teamBWickets : payload.teamAWickets;
    var battingBonus = calculateBonusPoints(teamRuns, config.batting_bonus_tiers, config.bonus_batting_max);
    var bowlingBonus = calculateBonusPoints(opponentWicketsTaken, config.bowling_bonus_tiers, config.bonus_bowling_max);
    var total = matchPoints + inningPoints + battingBonus + bowlingBonus;
    var isValid = total <= config.max_total_per_match;
    return {
        matchPoints: matchPoints,
        inningPoints: inningPoints,
        battingBonus: battingBonus,
        bowlingBonus: bowlingBonus,
        total: total,
        isValid: isValid,
        error: isValid ? undefined : "Total points (".concat(total, ") exceeds maximum allowed per match (").concat(config.max_total_per_match, ")")
    };
}
