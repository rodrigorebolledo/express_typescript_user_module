"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function login(req, res, next) {
    const { body } = req;
    res.status(200).send({ message: "We receive a body", body });
}
exports.default = login;
