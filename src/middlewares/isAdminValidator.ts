import { NextFunction, Request, Response } from "express";
import { isAdminService } from "../domains/user/services";

async function isAdminValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { consumerUsername } = req.body;

    const isAdmin = await isAdminService(consumerUsername);

    if (isAdmin) {
      return next();
    }

    return res.status(403).send("You are not an admin");
  } catch (err) {
    return res.status(500).send(err);
  }
}

export default isAdminValidator;
