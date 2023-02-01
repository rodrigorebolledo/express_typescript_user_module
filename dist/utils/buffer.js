"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuffer = exports.getStringFromBuffer = void 0;
function getStringFromBuffer(buffer) {
    return buffer.toString("utf-8");
}
exports.getStringFromBuffer = getStringFromBuffer;
function getBuffer(str) {
    return Buffer.from(str, "utf-8");
}
exports.getBuffer = getBuffer;
