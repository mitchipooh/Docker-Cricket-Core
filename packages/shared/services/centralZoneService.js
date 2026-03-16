"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTeamFromTournament = exports.removeTeamFromOrg = exports.updateAffiliationStatus = exports.requestAffiliation = exports.approvePlayerClaim = exports.claimPlayerProfile = exports.fetchUserData = exports.pushUserData = exports.deleteMediaPost = exports.deleteTournament = exports.deleteTeam = exports.deleteMatchFixture = exports.updateFixture = exports.fetchGlobalSync = exports.pushGlobalSync = void 0;
var api_1 = require("../lib/api");
// --- GLOBAL LEAGUE DATA SYNC ---
var pushGlobalSync = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var res, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, api_1.apiFetch)('/sync/push', {
                        method: 'POST',
                        body: JSON.stringify(data)
                    })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.success];
            case 2:
                e_1 = _a.sent();
                console.error("Global Sync Push Failed:", e_1);
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.pushGlobalSync = pushGlobalSync;
var fetchGlobalSync = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, api_1.apiFetch)("/sync/pull".concat(userId ? "?userId=".concat(userId) : ''))];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                e_2 = _a.sent();
                console.error("Global Sync Fetch Failed:", e_2);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.fetchGlobalSync = fetchGlobalSync;
// --- GRANULAR OPERATIONS ---
var updateFixture = function (fixtureId, data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, api_1.apiFetch)("/fixtures/".concat(fixtureId), {
                    method: 'PATCH',
                    body: JSON.stringify(data)
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.updateFixture = updateFixture;
var deleteMatchFixture = function (fixtureId) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, api_1.apiFetch)("/fixtures/".concat(fixtureId), { method: 'DELETE' })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.success];
        }
    });
}); };
exports.deleteMatchFixture = deleteMatchFixture;
var deleteTeam = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, api_1.apiFetch)("/teams/".concat(teamId), { method: 'DELETE' })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.success];
        }
    });
}); };
exports.deleteTeam = deleteTeam;
var deleteTournament = function (tournamentId) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, api_1.apiFetch)("/tournaments/".concat(tournamentId), { method: 'DELETE' })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.success];
        }
    });
}); };
exports.deleteTournament = deleteTournament;
var deleteMediaPost = function (postId) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, api_1.apiFetch)("/media/".concat(postId), { method: 'DELETE' })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.success];
        }
    });
}); };
exports.deleteMediaPost = deleteMediaPost;
var pushUserData = function (userId, data) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, api_1.apiFetch)("/user/".concat(userId), {
                    method: 'POST',
                    body: JSON.stringify(data)
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.success];
        }
    });
}); };
exports.pushUserData = pushUserData;
var fetchUserData = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, api_1.apiFetch)("/user/".concat(userId))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.fetchUserData = fetchUserData;
// Mocked/Simplified for local mode
var claimPlayerProfile = function (_playerId, _userId, _applicantName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.warn("Player claiming not fully implemented in local mode");
        return [2 /*return*/, { success: false, message: 'Feature not available in offline mode' }];
    });
}); };
exports.claimPlayerProfile = claimPlayerProfile;
var approvePlayerClaim = function (_claimId, _playerId, _userId) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, true];
}); }); };
exports.approvePlayerClaim = approvePlayerClaim;
var requestAffiliation = function (_targetOrgId, _application) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, true];
}); }); };
exports.requestAffiliation = requestAffiliation;
var updateAffiliationStatus = function (_parentOrgId, _childOrgId, _status) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, true];
}); }); };
exports.updateAffiliationStatus = updateAffiliationStatus;
var removeTeamFromOrg = function (_orgId, _teamId) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, true];
}); }); };
exports.removeTeamFromOrg = removeTeamFromOrg;
var removeTeamFromTournament = function (_tournamentId, _teamId) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, true];
}); }); };
exports.removeTeamFromTournament = removeTeamFromTournament;
