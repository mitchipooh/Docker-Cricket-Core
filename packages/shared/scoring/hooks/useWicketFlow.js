"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWicketFlow = useWicketFlow;
var react_1 = require("react");
function useWicketFlow() {
    var _a = (0, react_1.useState)(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = (0, react_1.useState)(null), wicketType = _b[0], setWicketType = _b[1];
    var _c = (0, react_1.useState)(null), outPlayerId = _c[0], setOutPlayerId = _c[1];
    var _d = (0, react_1.useState)(null), fielderId = _d[0], setFielderId = _d[1];
    var start = (0, react_1.useCallback)(function (defaultBatterId) {
        setOutPlayerId(defaultBatterId || null);
        setIsOpen(true);
    }, []);
    var reset = (0, react_1.useCallback)(function () {
        setIsOpen(false);
        setWicketType(null);
        setOutPlayerId(null);
        setFielderId(null);
    }, []);
    return {
        isOpen: isOpen,
        wicketType: wicketType,
        outPlayerId: outPlayerId,
        fielderId: fielderId,
        start: start,
        reset: reset,
        setWicketType: setWicketType,
        setOutPlayerId: setOutPlayerId,
        setFielderId: setFielderId
    };
}
