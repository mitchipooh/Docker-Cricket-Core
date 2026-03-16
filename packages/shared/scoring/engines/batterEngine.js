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
exports.assignNewBatter = exports.handleWicket = void 0;
var handleWicket = function (state, outPlayerId) {
    var sId = state.strikerId;
    var nsId = state.nonStrikerId;
    // Remove the dismissed batter from the crease
    if (sId === outPlayerId) {
        sId = '';
    }
    else if (nsId === outPlayerId) {
        nsId = '';
    }
    return __assign(__assign({}, state), { wickets: state.wickets + 1, strikerId: sId, nonStrikerId: nsId });
};
exports.handleWicket = handleWicket;
var assignNewBatter = function (state, playerId, role) {
    return __assign(__assign({}, state), { strikerId: role === 'Striker' ? playerId : state.strikerId, nonStrikerId: role === 'NonStriker' ? playerId : state.nonStrikerId });
};
exports.assignNewBatter = assignNewBatter;
