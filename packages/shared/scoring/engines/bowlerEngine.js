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
exports.assignBowler = exports.canSelectBowler = void 0;
var canSelectBowler = function (state, bowlerId) {
    // Simple check: In standard rules, a bowler cannot bowl consecutive overs
    // We check if the current bowlerId (who just finished an over) is the same as the new selection
    // Note: This logic assumes state.bowlerId holds the bowler of the *just completed* over
    if (state.totalBalls > 0 && state.totalBalls % 6 === 0) {
        return state.bowlerId !== bowlerId;
    }
    return true;
};
exports.canSelectBowler = canSelectBowler;
var assignBowler = function (state, bowlerId) {
    return __assign(__assign({}, state), { bowlerId: bowlerId });
};
exports.assignBowler = assignBowler;
