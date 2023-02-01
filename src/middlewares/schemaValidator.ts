import { Request, Response, NextFunction } from "express";

function getMessageFromDetails(details: { message: string }[]): string {
  return details
    .map((detail: { message: string }) => detail.message)
    .join("\n");
}

function schemaValidator(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { error, value } = schema.validate(body, { abortEarly: false });

    if (error) {
      const { details } = error;

      const messages: string = getMessageFromDetails(details);

      return res.status(422).send(messages);
    }
    req.body = value;
    return next();
  };
}

export default schemaValidator;
