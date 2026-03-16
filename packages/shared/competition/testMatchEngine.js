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
exports.checkForResult = exports.getNextInningsBattingTeamId = exports.endInnings = exports.isFollowOnEligible = exports.decrementLastHour = exports.triggerLastHour = exports.canEndInnings = exports.getTargetIfChase = exports.getLeadStatus = exports.getAggregateRuns = void 0;
/**
 * Calculates aggregate runs for a team across all innings.
 */
var getAggregateRuns = function (state, teamId, includeCurrentInnings) {
    if (includeCurrentInnings === void 0) { includeCurrentInnings = true; }
    var completedRuns = (state.inningsScores || [])
        .filter(function (is) { return is.teamId === teamId && is.isComplete; })
        .reduce(function (sum, is) { return sum + is.score; }, 0);
    if (includeCurrentInnings && state.battingTeamId === teamId) {
        return completedRuns + state.score;
    }
    return completedRuns;
};
exports.getAggregateRuns = getAggregateRuns;
/**
 * Computes lead or trail status between teams.
 */
var getLeadStatus = function (state) {
    var teamIds = Array.from(new Set((state.inningsScores || []).map(function (is) { return is.teamId; })));
    if (teamIds.length < 2)
        return { leadingTeamId: null, leadRuns: 0 };
    var runs0 = (0, exports.getAggregateRuns)(state, teamIds[0], true);
    var runs1 = (0, exports.getAggregateRuns)(state, teamIds[1], true);
    var diff = runs0 - runs1;
    if (diff > 0)
        return { leadingTeamId: teamIds[0], leadRuns: diff };
    if (diff < 0)
        return { leadingTeamId: teamIds[1], leadRuns: Math.abs(diff) };
    return { leadingTeamId: null, leadRuns: 0 };
};
exports.getLeadStatus = getLeadStatus;
/**
 * Calculates the target for the 4th innings chase.
 */
var getTargetIfChase = function (state) {
    if (state.innings < 4)
        return null;
    var battingTeamId = state.battingTeamId;
    var fieldingTeamId = state.bowlingTeamId;
    var fieldingTotal = (0, exports.getAggregateRuns)(state, fieldingTeamId, false);
    var battingTotalPrior = (0, exports.getAggregateRuns)(state, battingTeamId, false);
    var target = (fieldingTotal - battingTotalPrior) + 1;
    return target > 0 ? target : 1; // Minimum target is 1
};
exports.getTargetIfChase = getTargetIfChase;
/**
 * Checks if the current innings can or should end.
 */
var canEndInnings = function (state) {
    if (state.wickets >= 10)
        return true;
    if (state.innings === 4) {
        var target = (0, exports.getTargetIfChase)(state);
        if (target !== null && state.score >= target)
            return true;
    }
    return false;
};
exports.canEndInnings = canEndInnings;
/**
 * Triggers the Last Hour state.
 */
var triggerLastHour = function (state) {
    var _a, _b;
    return __assign(__assign({}, state), { adjustments: __assign(__assign({}, state.adjustments), { isLastHour: true, lastHourOversRemaining: 15, dayNumber: ((_a = state.adjustments) === null || _a === void 0 ? void 0 : _a.dayNumber) || 1, session: 'Evening', declared: ((_b = state.adjustments) === null || _b === void 0 ? void 0 : _b.declared) || false }) });
};
exports.triggerLastHour = triggerLastHour;
/**
 * Decrements the last hour overs if active.
 * Should be called at the end of every over.
 */
var decrementLastHour = function (state) {
    var _a;
    if (!((_a = state.adjustments) === null || _a === void 0 ? void 0 : _a.isLastHour))
        return state;
    var remaining = state.adjustments.lastHourOversRemaining || 0;
    if (remaining <= 0)
        return state;
    return __assign(__assign({}, state), { adjustments: __assign(__assign({}, state.adjustments), { lastHourOversRemaining: Math.max(0, remaining - 1), isLastHour: true, dayNumber: state.adjustments.dayNumber, session: state.adjustments.session || 'Evening', declared: state.adjustments.declared }) });
};
exports.decrementLastHour = decrementLastHour;
/**
 * Checks if the follow-on can be enforced.
 * Standard rule: Lead of 200+ runs in a 5-day match (unlimited overs) after 1st innings of both sides.
 */
var isFollowOnEligible = function (state) {
    var _a;
    // Must be after both teams have completed their first innings (so start of 3rd innings typically)
    // Actually, checked immediately after 2nd innings ends.
    var inningsCompleted = (state.inningsScores || []).filter(function (is) { return is.isComplete; }).length;
    if (inningsCompleted !== 2)
        return false;
    var teamIds = Array.from(new Set((state.inningsScores || []).map(function (is) { return is.teamId; })));
    if (teamIds.length < 2)
        return false;
    var teamBattingFirst = teamIds[0]; // Assuming order in scores implies batting order, better to track strictly
    // In our model, we should check who batted in Innings 1 vs Innings 2
    var innings1 = (state.inningsScores || []).find(function (is) { return is.innings === 1; });
    var innings2 = (state.inningsScores || []).find(function (is) { return is.innings === 2; });
    if (!innings1 || !innings2)
        return false;
    var runs1 = innings1.score;
    var runs2 = innings2.score;
    // If Team 2 batted second and is behind by >= 200
    var lead = runs1 - runs2;
    var threshold = ((_a = state.testConfig) === null || _a === void 0 ? void 0 : _a.followOnMargin) || 200;
    return lead >= threshold;
};
exports.isFollowOnEligible = isFollowOnEligible;
/**
 * transitions the state to the next innings
 */
var endInnings = function (state, reason) {
    var currentInningsIndex = state.innings; // 1-based
    // 1. Mark current innings as complete
    var updatedScores = state.inningsScores.map(function (is) {
        return is.innings === currentInningsIndex ? __assign(__assign({}, is), { isComplete: true, endReason: reason }) : is;
    });
    // 2. Determine Next Batting Team
    // Check follow-on eligibility first if we just finished Innings 2
    var nextBattingTeam = (0, exports.getNextInningsBattingTeamId)(__assign(__assign({}, state), { innings: currentInningsIndex }), state.isFollowOnEnforced);
    // If we just finished innings 2, we might not know if follow-on is enforced yet.
    // The UI should handle the pause. But assuming standard transition:
    // If follow-on is NOT enforced (default), we swap.
    // Special handling: If this was the final innings (4th) or match result reachable?
    // checkForResult should be called before this or immediately after.
    var nextInningsNumber = currentInningsIndex + 1;
    // If match is over, we shouldn't really call this, but safety check:
    if (nextInningsNumber > 4)
        return __assign(__assign({}, state), { isCompleted: true });
    return __assign(__assign({}, state), { innings: nextInningsNumber, battingTeamId: nextBattingTeam || state.bowlingTeamId, bowlingTeamId: state.battingTeamId, score: 0, wickets: 0, totalBalls: 0, strikerId: '', nonStrikerId: '', bowlerId: '', history: [], 
        // If state.history is global, dont clear. If per innings, clear. 
        // Type def says `history: BallEvent[]`. Usually keeps full match log.
        // We should initialize the new innings score entry
        inningsScores: __spreadArray(__spreadArray([], updatedScores, true), [
            {
                innings: nextInningsNumber,
                teamId: nextBattingTeam || state.bowlingTeamId,
                score: 0,
                wickets: 0,
                overs: '0.0'
            }
        ], false) });
};
exports.endInnings = endInnings;
/**
 * Determines the next team to bat, including follow-on handling.
 */
var getNextInningsBattingTeamId = function (state, followOnEnforced) {
    if (followOnEnforced === void 0) { followOnEnforced = false; }
    var teamIds = Array.from(new Set((state.inningsScores || []).map(function (is) { return is.teamId; })));
    if (teamIds.length < 2)
        return null;
    var currentBattingTeamId = state.battingTeamId;
    var otherTeamId = state.bowlingTeamId;
    // After Innings 1 -> Always other team (Innings 2)
    if (state.innings === 1)
        return otherTeamId;
    // After Innings 2 -> Check follow-on
    if (state.innings === 2) {
        return followOnEnforced ? otherTeamId : currentBattingTeamId;
    }
    // After Innings 3 -> Always the other team (Innings 4)
    if (state.innings === 3)
        return otherTeamId;
    return null; // No 5th innings in Test
};
exports.getNextInningsBattingTeamId = getNextInningsBattingTeamId;
/**
 * Checks for a match-ending result.
 */
var checkForResult = function (state) {
    var _a;
    var teamIds = Array.from(new Set((state.inningsScores || []).map(function (is) { return is.teamId; })));
    if (teamIds.length < 2)
        return null;
    var teamA = teamIds[0];
    var teamB = teamIds[1];
    // Count strictly completed innings
    var completedInningsA = (state.inningsScores || []).filter(function (is) { return is.teamId === teamA && is.isComplete; }).length;
    var completedInningsB = (state.inningsScores || []).filter(function (is) { return is.teamId === teamB && is.isComplete; }).length;
    // 1. Innings Victory (One team finished 2 innings, other finished 1)
    var runsA = (0, exports.getAggregateRuns)(state, teamA, true);
    var runsB = (0, exports.getAggregateRuns)(state, teamB, true);
    // Case A: Team A played 1, Team B played 2, A > B
    if (completedInningsA === 1 && completedInningsB === 2) {
        if (runsA > runsB) {
            return { winnerTeamId: teamA, resultType: 'WIN_BY_INNINGS_AND_RUNS', margin: "".concat(runsA - runsB, " runs") };
        }
    }
    // Case B: Team B played 1, Team A played 2, B > A
    if (completedInningsB === 1 && completedInningsA === 2) {
        if (runsB > runsA) {
            return { winnerTeamId: teamB, resultType: 'WIN_BY_INNINGS_AND_RUNS', margin: "".concat(runsB - runsA, " runs") };
        }
    }
    // 2. 4th Innings Result
    if (state.innings === 4) {
        var target = (0, exports.getTargetIfChase)(state);
        if (target === null)
            return null;
        if (state.score >= target) {
            return {
                winnerTeamId: state.battingTeamId,
                resultType: 'WIN_BY_WICKETS',
                margin: "".concat(10 - state.wickets, " wickets")
            };
        }
        // Check if chasing team is all out
        var currentInnings = (state.inningsScores || []).find(function (is) { return is.innings === 4; });
        if ((currentInnings === null || currentInnings === void 0 ? void 0 : currentInnings.isComplete) || state.wickets >= 10) {
            if (state.score < target - 1) {
                return {
                    winnerTeamId: state.bowlingTeamId,
                    resultType: 'WIN_BY_RUNS',
                    margin: "".concat(target - 1 - state.score, " runs")
                };
            }
            else if (state.score === target - 1) {
                return { winnerTeamId: null, resultType: 'TIE' };
            }
        }
    }
    // 3. Time/Draw - typically handled externally or via "Concluded" flag
    if ((_a = state.adjustments) === null || _a === void 0 ? void 0 : _a.concluded) {
        return { winnerTeamId: null, resultType: 'DRAW' };
    }
    return null;
};
exports.checkForResult = checkForResult;
