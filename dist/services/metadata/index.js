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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHasInitialize = void 0;
const metadata_1 = require("../../repositories/metadata");
function getHasInitialize() {
    return __awaiter(this, void 0, void 0, function* () {
        const DEFAULT_VALUE = true;
        try {
            const metadata = yield (0, metadata_1.getMetadata)();
            if (metadata) {
                const { has_initialize } = metadata;
                return has_initialize;
            }
            return DEFAULT_VALUE;
        }
        catch (_a) {
            return DEFAULT_VALUE;
        }
    });
}
exports.getHasInitialize = getHasInitialize;
