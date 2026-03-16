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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offlineQueue = void 0;
var STORAGE_KEY = 'cc_sync_queue';
var OfflineQueueService = /** @class */ (function () {
    function OfflineQueueService() {
        var _this = this;
        this.queue = [];
        this.isProcessing = false;
        this.listeners = [];
        this.loadQueue();
        window.addEventListener('online', function () { return _this.processQueue(); });
        window.addEventListener('offline', function () { return _this.notifyListeners(); });
    }
    OfflineQueueService.prototype.loadQueue = function () {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                this.queue = JSON.parse(saved);
            }
        }
        catch (e) {
            console.error("Failed to load sync queue", e);
        }
    };
    OfflineQueueService.prototype.saveQueue = function () {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.queue));
        this.notifyListeners();
    };
    OfflineQueueService.prototype.enqueue = function (type, payload) {
        var mutation = {
            id: crypto.randomUUID(),
            type: type,
            payload: payload,
            timestamp: Date.now(),
            retryCount: 0
        };
        this.queue.push(mutation);
        this.saveQueue();
        if (navigator.onLine) {
            this.processQueue();
        }
    };
    OfflineQueueService.prototype.processQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentBatch, _loop_1, this_1, _i, currentBatch_1, item, state_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isProcessing || this.queue.length === 0 || !navigator.onLine)
                            return [2 /*return*/];
                        this.isProcessing = true;
                        this.notifyListeners();
                        currentBatch = __spreadArray([], this.queue, true);
                        _loop_1 = function (item) {
                            var error_1, index;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, this_1.syncItem(item)];
                                    case 1:
                                        _b.sent();
                                        // Remove from queue on success
                                        this_1.queue = this_1.queue.filter(function (m) { return m.id !== item.id; });
                                        this_1.saveQueue();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_1 = _b.sent();
                                        console.error("Failed to sync item ".concat(item.id), error_1);
                                        index = this_1.queue.findIndex(function (m) { return m.id === item.id; });
                                        if (index !== -1) {
                                            this_1.queue[index].retryCount++;
                                        }
                                        this_1.saveQueue();
                                        return [2 /*return*/, "break"];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, currentBatch_1 = currentBatch;
                        _a.label = 1;
                    case 1:
                        if (!(_i < currentBatch_1.length)) return [3 /*break*/, 4];
                        item = currentBatch_1[_i];
                        return [5 /*yield**/, _loop_1(item)];
                    case 2:
                        state_1 = _a.sent();
                        if (state_1 === "break")
                            return [3 /*break*/, 4];
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.isProcessing = false;
                        this.notifyListeners();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Mock Backend Call
    OfflineQueueService.prototype.syncItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // Simulate network latency
                        setTimeout(function () {
                            // In a real app, this would be fetch('/api/sync', ...)
                            console.log("[SYNC] Processed ".concat(item.type), item.payload);
                            // Random failure simulation (5% chance)
                            if (Math.random() < 0.05) {
                                reject(new Error("Random network glitch"));
                            }
                            else {
                                resolve();
                            }
                        }, 500); // 500ms latency
                    })];
            });
        });
    };
    OfflineQueueService.prototype.subscribe = function (listener) {
        var _this = this;
        this.listeners.push(listener);
        // Initial call
        listener(this.queue, navigator.onLine);
        return function () {
            _this.listeners = _this.listeners.filter(function (l) { return l !== listener; });
        };
    };
    OfflineQueueService.prototype.notifyListeners = function () {
        var _this = this;
        this.listeners.forEach(function (l) { return l(_this.queue, navigator.onLine); });
    };
    OfflineQueueService.prototype.getStatus = function () {
        return {
            pendingCount: this.queue.length,
            isOnline: navigator.onLine,
            isProcessing: this.isProcessing
        };
    };
    return OfflineQueueService;
}());
exports.offlineQueue = new OfflineQueueService();
