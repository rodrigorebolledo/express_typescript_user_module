import { Request, Response, NextFunction } from "express";
import { validateToken } from "../core/jwt";

function tokenValidator(req: Request, res: Response, next: NextFunction) {
  const { token, consumerUsername } = req.body;
  const isAValidToken = validateToken(token, consumerUsername);

  if (isAValidToken) {
    return next();
  }

  return res.status(403).send("The token provided is invalid");
}

export default tokenValidator;
