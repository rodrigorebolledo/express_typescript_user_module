"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../core/jwt");
function tokenValidator(req, res, next) {
    const { token, consumerUsername } = req.body;
    const isAValidToken = (0, jwt_1.validateToken)(token, consumerUsername);
    if (isAValidToken) {
        return next();
    }
    return res.status(403).send("The token provided is invalid");
}
exports.default = tokenValidator;
