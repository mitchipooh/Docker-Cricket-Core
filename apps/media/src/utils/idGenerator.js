"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
/**
 * Generates a unique alphanumeric ID with a specific prefix.
 * Format: prefix_randomString (e.g., org_a1b2c3d4)
 */
var generateId = function (prefix) {
    if (prefix === void 0) { prefix = 'id'; }
    var randomPart = Math.random().toString(36).substr(2, 9);
    var timestampPart = Date.now().toString(36).substr(-4); // Last 4 chars of timestamp for ordering/uniqueness
    return "".concat(prefix, "_").concat(randomPart).concat(timestampPart);
};
exports.generateId = generateId;
