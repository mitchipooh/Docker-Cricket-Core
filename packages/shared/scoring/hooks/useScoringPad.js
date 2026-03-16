"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScoringPad = void 0;
var react_1 = require("react");
var useScoringPad = function () {
    var _a = (0, react_1.useState)('main'), padView = _a[0], setPadView = _a[1];
    var _b = (0, react_1.useState)(false), isRunGridExpanded = _b[0], setIsRunGridExpanded = _b[1];
    // --- No Ball Flow ---
    var _c = (0, react_1.useState)(null), pendingNbType = _c[0], setPendingNbType = _c[1];
    // --- Wicket Flow ---
    var _d = (0, react_1.useState)(null), pendingWicketPlayerId = _d[0], setPendingWicketPlayerId = _d[1];
    var _e = (0, react_1.useState)(null), pendingDismissalType = _e[0], setPendingDismissalType = _e[1];
    var _f = (0, react_1.useState)(null), pendingFielderId = _f[0], setPendingFielderId = _f[1];
    var _g = (0, react_1.useState)(null), pendingAssistFielderId = _g[0], setPendingAssistFielderId = _g[1];
    // --- Bowler Replacement ---
    var _h = (0, react_1.useState)(null), replacementMode = _h[0], setReplacementMode = _h[1];
    // --- Batter Actions ---
    var _j = (0, react_1.useState)(null), batterActionTarget = _j[0], setBatterActionTarget = _j[1];
    /* =====================
       Generic Helpers
    ===================== */
    var resetPad = (0, react_1.useCallback)(function () {
        setPadView('main');
        setIsRunGridExpanded(false);
        setPendingNbType(null);
        setPendingWicketPlayerId(null);
        setPendingDismissalType(null);
        setPendingFielderId(null);
        setPendingAssistFielderId(null);
        setReplacementMode(null);
        setBatterActionTarget(null);
    }, []);
    /* =====================
       Run / Extras Flow
    ===================== */
    var openRunGrid = (0, react_1.useCallback)(function () {
        setIsRunGridExpanded(true);
    }, []);
    var closeRunGrid = (0, react_1.useCallback)(function () {
        setIsRunGridExpanded(false);
    }, []);
    var startWide = (0, react_1.useCallback)(function () {
        setPadView('wide_runs');
    }, []);
    var startNoBall = (0, react_1.useCallback)(function () {
        setPadView('nb_type');
    }, []);
    var selectNoBallType = (0, react_1.useCallback)(function (type) {
        setPendingNbType(type);
        setPadView('nb_runs');
    }, []);
    var startByes = (0, react_1.useCallback)(function () {
        setPadView('bye_runs');
    }, []);
    var startLegByes = (0, react_1.useCallback)(function () {
        setPadView('lb_runs');
    }, []);
    /* =====================
       Wicket Flow
    ===================== */
    var startWicket = (0, react_1.useCallback)(function (outPlayerId) {
        setPendingWicketPlayerId(outPlayerId);
        setPadView('wicket_type_select');
    }, []);
    var selectDismissalType = (0, react_1.useCallback)(function (type) {
        setPendingDismissalType(type);
        setPadView('wicket_fielder_select');
    }, []);
    var selectFielder = (0, react_1.useCallback)(function (fielderId) {
        setPendingFielderId(fielderId);
        setPadView('wicket_assist_select');
    }, []);
    var selectAssistFielder = (0, react_1.useCallback)(function (fielderId) {
        if (fielderId)
            setPendingAssistFielderId(fielderId);
        setPadView('main');
    }, []);
    /* =====================
       Bowler Replacement
    ===================== */
    var startBowlerReplacement = (0, react_1.useCallback)(function (mode) {
        setReplacementMode(mode);
        setPadView('bowler_replacement_select');
    }, []);
    /* =====================
       Batter Actions
    ===================== */
    var openBatterActions = (0, react_1.useCallback)(function (target) {
        setBatterActionTarget(target);
        setPadView('batter_actions_menu');
    }, []);
    var startBatterReplacement = (0, react_1.useCallback)(function () {
        setPadView('batter_replacement_select');
    }, []);
    return {
        // Views
        padView: padView,
        setPadView: setPadView,
        isRunGridExpanded: isRunGridExpanded,
        // Extras
        pendingNbType: pendingNbType,
        startWide: startWide,
        startNoBall: startNoBall,
        selectNoBallType: selectNoBallType,
        startByes: startByes,
        startLegByes: startLegByes,
        openRunGrid: openRunGrid,
        closeRunGrid: closeRunGrid,
        // Wicket
        pendingWicketPlayerId: pendingWicketPlayerId,
        pendingDismissalType: pendingDismissalType,
        pendingFielderId: pendingFielderId,
        pendingAssistFielderId: pendingAssistFielderId,
        startWicket: startWicket,
        selectDismissalType: selectDismissalType,
        selectFielder: selectFielder,
        selectAssistFielder: selectAssistFielder,
        // Bowler
        replacementMode: replacementMode,
        startBowlerReplacement: startBowlerReplacement,
        // Batter
        batterActionTarget: batterActionTarget,
        openBatterActions: openBatterActions,
        startBatterReplacement: startBatterReplacement,
        // Reset
        resetPad: resetPad
    };
};
exports.useScoringPad = useScoringPad;
