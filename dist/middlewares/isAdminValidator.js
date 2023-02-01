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
const services_1 = require("../domains/user/services");
function isAdminValidator(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { consumerUsername } = req.body;
            const isAdmin = yield (0, services_1.isAdminService)(consumerUsername);
            if (isAdmin) {
                return next();
            }
            return res.status(403).send("You are not an admin");
        }
        catch (err) {
            return res.status(500).send(err);
        }
    });
}
exports.default = isAdminValidator;
