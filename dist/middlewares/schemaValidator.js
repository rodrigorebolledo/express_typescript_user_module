"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMessageFromDetails(details) {
    return details
        .map((detail) => detail.message)
        .join("\n");
}
function schemaValidator(schema) {
    return (req, res, next) => {
        const { body } = req;
        const { error, value } = schema.validate(body, { abortEarly: false });
        if (error) {
            const { details } = error;
            const messages = getMessageFromDetails(details);
            return res.status(422).send(messages);
        }
        req.body = value;
        return next();
    };
}
exports.default = schemaValidator;
