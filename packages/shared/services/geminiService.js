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
exports.getDLSAnalysis = exports.generatePressKit = exports.getCoachInsights = void 0;
var genai_1 = require("@google/genai");
// --- COACHING ---
var getCoachInsights = function (matchState, battingTeamName, bowlingTeamName) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, ai, currentOver, runRate, response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = process.env.API_KEY;
                if (!apiKey) {
                    return [2 /*return*/, {
                            analysis: "AI Coaching is disabled. Please configure process.env.API_KEY.",
                            tactics: ["Ensure API Key is set in environment", "Stick to line and length", "Rotate the strike"],
                            winProbability: 50
                        }];
                }
                ai = new genai_1.GoogleGenAI({ apiKey: apiKey });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                currentOver = Math.floor(matchState.totalBalls / 6);
                runRate = (matchState.score / (Math.max(1, matchState.totalBalls) / 6)).toFixed(2);
                return [4 /*yield*/, ai.models.generateContent({
                        model: "gemini-3-flash-preview",
                        contents: "\n        You are an elite T20 Cricket Strategy Coach. Analyze this live situation:\n        Match: ".concat(battingTeamName, " vs ").concat(bowlingTeamName, "\n        Innings: ").concat(matchState.innings, "\n        Score: ").concat(matchState.score, "/").concat(matchState.wickets, "\n        Overs: ").concat(currentOver, ".").concat(matchState.totalBalls % 6, "\n        Run Rate: ").concat(runRate, "\n        \n        Provide 3 specific, short, tactical instructions for the BOWLING captain to break the partnership or stem the run flow.\n        Keep it punchy, aggressive, and data-driven.\n      "),
                        config: {
                            responseMimeType: "application/json",
                            responseSchema: {
                                type: genai_1.Type.OBJECT,
                                properties: {
                                    analysis: { type: genai_1.Type.STRING },
                                    tactics: {
                                        type: genai_1.Type.ARRAY,
                                        items: { type: genai_1.Type.STRING }
                                    },
                                    winProbability: { type: genai_1.Type.NUMBER }
                                }
                            }
                        }
                    })];
            case 2:
                response = _a.sent();
                data = JSON.parse(response.text || "{}");
                return [2 /*return*/, data];
            case 3:
                error_1 = _a.sent();
                console.error("Coach AI Error:", error_1);
                return [2 /*return*/, {
                        analysis: "Unable to connect to strategy mainframe.",
                        tactics: ["Stick to line and length", "Protect the boundaries", "Rotate the strike"],
                        winProbability: 50
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCoachInsights = getCoachInsights;
// --- MEDIA ---
var generatePressKit = function (fixture, matchState) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, ai, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = process.env.API_KEY;
                if (!apiKey)
                    return [2 /*return*/, null];
                ai = new genai_1.GoogleGenAI({ apiKey: apiKey });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ai.models.generateContent({
                        model: "gemini-3-flash-preview",
                        contents: "\n        Write a press kit for this cricket match:\n        ".concat(fixture.teamAName, " vs ").concat(fixture.teamBName, "\n        Result: ").concat(fixture.result || 'Match in progress', "\n        Scores: ").concat(fixture.teamAScore, " vs ").concat(fixture.teamBScore, "\n        Venue: ").concat(fixture.venue, "\n        \n        Generate:\n        1. A catchy headline.\n        2. A 100-word dramatic match summary.\n        3. 3 viral style social media posts (Twitter/Instagram) with hashtags.\n      "),
                        config: {
                            responseMimeType: "application/json",
                            responseSchema: {
                                type: genai_1.Type.OBJECT,
                                properties: {
                                    headline: { type: genai_1.Type.STRING },
                                    summary: { type: genai_1.Type.STRING },
                                    socialPosts: {
                                        type: genai_1.Type.ARRAY,
                                        items: { type: genai_1.Type.STRING }
                                    }
                                }
                            }
                        }
                    })];
            case 2:
                response = _a.sent();
                return [2 /*return*/, JSON.parse(response.text || "{}")];
            case 3:
                error_2 = _a.sent();
                console.error("Press Kit AI Error:", error_2);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.generatePressKit = generatePressKit;
// --- DLS ---
var getDLSAnalysis = function (score, overs, wickets, target, weather) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, null];
    });
}); };
exports.getDLSAnalysis = getDLSAnalysis;
