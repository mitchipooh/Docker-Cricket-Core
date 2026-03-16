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
exports.endInningsTimer = exports.resumeInningsTimer = exports.pauseInningsTimer = exports.startInningsTimer = void 0;
var startInningsTimer = function (state) {
    if (state.matchTimer.startTime)
        return state; // Already started
    return __assign(__assign({}, state), { matchTimer: __assign(__assign({}, state.matchTimer), { startTime: Date.now(), isPaused: false }) });
};
exports.startInningsTimer = startInningsTimer;
var pauseInningsTimer = function (state) {
    if (state.matchTimer.isPaused)
        return state;
    return __assign(__assign({}, state), { matchTimer: __assign(__assign({}, state.matchTimer), { isPaused: true, lastPauseTime: Date.now() }) });
};
exports.pauseInningsTimer = pauseInningsTimer;
var resumeInningsTimer = function (state) {
    if (!state.matchTimer.isPaused)
        return state;
    // Calculate downtime to adjust start time or allowances if needed
    // For simplicity in this architecture, we just flip the flag
    return __assign(__assign({}, state), { matchTimer: __assign(__assign({}, state.matchTimer), { isPaused: false, lastPauseTime: null }) });
};
exports.resumeInningsTimer = resumeInningsTimer;
var endInningsTimer = function (state) {
    // Logic to freeze timer or record duration could go here
    return __assign(__assign({}, state), { matchTimer: __assign(__assign({}, state.matchTimer), { isPaused: true }) });
};
exports.endInningsTimer = endInningsTimer;
