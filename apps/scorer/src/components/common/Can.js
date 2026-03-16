"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Can = void 0;
var react_1 = require("react");
var PERMISSIONS = {
    Administrator: ['org:create', 'org:delete', 'team:add', 'team:remove', 'tournament:add', 'fixture:generate'],
    Scorer: ['match:score'],
    'Match Official': ['match:view', 'match:umpire'],
};
var Can = function (_a) {
    var role = _a.role, perform = _a.perform, children = _a.children, _b = _a.fallback, fallback = _b === void 0 ? null : _b;
    var userPermissions = PERMISSIONS[role] || [];
    var canPerform = userPermissions.includes(perform);
    return canPerform ? <>{children}</> : <>{fallback}</>;
};
exports.Can = Can;
