"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInningsOverRateTimer = useInningsOverRateTimer;
var react_1 = require("react");
function useInningsOverRateTimer(matchStartTime, legalBallsBowled, inningsActive, config) {
    var _a;
    // Default to ~14.1 overs/hr (T20 Standard)
    var oversPerHour = (_a = config === null || config === void 0 ? void 0 : config.oversPerHour) !== null && _a !== void 0 ? _a : 14.11;
    var secondsPerOver = 3600 / oversPerHour;
    var _b = (0, react_1.useState)(0), elapsedSeconds = _b[0], setElapsedSeconds = _b[1];
    // Sync timer with match start time
    (0, react_1.useEffect)(function () {
        if (!matchStartTime || !inningsActive)
            return;
        // Initial sync
        setElapsedSeconds(Math.floor((Date.now() - matchStartTime) / 1000));
        var interval = setInterval(function () {
            setElapsedSeconds(Math.floor((Date.now() - matchStartTime) / 1000));
        }, 1000);
        return function () { return clearInterval(interval); };
    }, [matchStartTime, inningsActive]);
    var actualOvers = legalBallsBowled / 6;
    var expectedOvers = elapsedSeconds / secondsPerOver;
    // Logic: Behind rate if actual is less than expected (with 0.5 over grace period)
    // Only flag after 2 overs to avoid noise at the very start
    var behindRate = (actualOvers < expectedOvers - 0.5) && legalBallsBowled > 12;
    return {
        elapsedSeconds: elapsedSeconds,
        actualOvers: actualOvers,
        expectedOvers: expectedOvers,
        behindRate: behindRate,
        // Note: Pause/Resume logic is handled by the engine's matchStartTime adjustment in this architecture
    };
}
