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
exports.applyDeliveryToOver = exports.isOverComplete = void 0;
var cricket_engine_ts_1 = require("../../utils/cricket-engine.ts");
var isOverComplete = function (balls) {
    return balls > 0 && balls % 6 === 0;
};
exports.isOverComplete = isOverComplete;
var applyDeliveryToOver = function (state, event) {
    var _a, _b;
    var _c = event.runs, runs = _c === void 0 ? 0 : _c, _d = event.extraRuns, extraRuns = _d === void 0 ? 0 : _d, _e = event.extraType, extraType = _e === void 0 ? 'None' : _e, _f = event.isWicket, isWicket = _f === void 0 ? false : _f;
    var isLegal = (0, cricket_engine_ts_1.isLegalBall)(extraType);
    var penalty = (extraType === 'Wide' || extraType === 'NoBall') ? 1 : 0;
    // Calculate Score Updates
    var nextScore = state.score + runs + extraRuns + penalty;
    var nextBalls = isLegal ? state.totalBalls + 1 : state.totalBalls;
    // Determine Strike Rotation
    var sId = state.strikerId;
    var nsId = state.nonStrikerId;
    // 1. Rotate on odd runs (physical runs only)
    var physicalRuns = runs + (['Bye', 'LegBye', 'Wide', 'NoBall'].includes(extraType) ? extraRuns : 0);
    if (physicalRuns % 2 !== 0) {
        _a = [nsId, sId], sId = _a[0], nsId = _a[1];
    }
    // 2. Rotate at end of over (if legal ball completed the over)
    if (isLegal && nextBalls % 6 === 0 && nextBalls > 0) {
        _b = [nsId, sId], sId = _b[0], nsId = _b[1];
    }
    return __assign(__assign({}, state), { score: nextScore, totalBalls: nextBalls, strikerId: sId, nonStrikerId: nsId });
};
exports.applyDeliveryToOver = applyDeliveryToOver;
