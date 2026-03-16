"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBallTimeline = void 0;
var react_1 = require("react");
/**
 * Upgraded Ball Timeline Hook
 * Transforms raw BallEvent history into a UI-ready format for
 * ticker tapes, match records, and over-by-over summaries.
 */
var useBallTimeline = function (state) {
    return (0, react_1.useMemo)(function () {
        // state.history is stored latest-first. 
        // We filter out non-ball events (setup markers) for the timeline.
        return state.history
            .filter(function (ball) { var _a; return !((_a = ball.commentary) === null || _a === void 0 ? void 0 : _a.startsWith('EVENT')); })
            .map(function (ball, index) {
            var label = "".concat(ball.runs + (ball.extraRuns || 0));
            var type = 'score';
            var color = 'bg-slate-900';
            // 1. Wickets take priority for visual markers
            if (ball.isWicket) {
                label = 'W';
                type = 'wicket';
                color = 'bg-red-600';
            }
            // 2. Extras (Wide/NoBall usually carry penalty of 1)
            else if (ball.extraType === 'Wide') {
                var total = 1 + (ball.extraRuns || 0);
                label = "".concat(total, "wd");
                type = 'extra';
                color = 'bg-blue-600';
            }
            else if (ball.extraType === 'NoBall') {
                // NoBall usually includes runs off the bat + 1 penalty
                var total = 1 + ball.runs + (ball.extraRuns || 0);
                label = "".concat(total, "nb");
                type = 'extra';
                color = 'bg-purple-600';
            }
            else if (ball.extraType === 'Bye' || ball.extraType === 'LegBye') {
                label = "".concat(ball.extraRuns).concat(ball.extraType === 'Bye' ? 'b' : 'lb');
                type = 'extra';
                color = 'bg-amber-600';
            }
            // 3. Boundaries
            else if (ball.batRuns === 4) {
                label = '4';
                type = 'boundary';
                color = 'bg-indigo-600';
            }
            else if (ball.batRuns === 6) {
                label = '6';
                type = 'boundary';
                color = 'bg-emerald-600';
            }
            // 4. Dot Balls
            else if (ball.runs === 0 && (!ball.extraType || ball.extraType === 'None')) {
                label = '•';
                type = 'dot';
                color = 'bg-slate-700';
            }
            return {
                id: "timeline-".concat(ball.timestamp, "-").concat(index),
                ball: ball,
                label: label,
                type: type,
                color: color,
                displayOver: "".concat(ball.over, ".").concat(ball.ballNumber)
            };
        });
    }, [state.history]);
};
exports.useBallTimeline = useBallTimeline;
