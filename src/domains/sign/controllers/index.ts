import { NextFunction, Request, Response } from "express";
import {
  getIsTheFirstUser,
  getUserFromUserNameService,
} from "../../user/services";
import { signInService } from "../services/signin";
import {
  createFirstAdminUserController,
  createUserController,
} from "../../user/controllers";

async function signUpController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isTheFirstUser = await getIsTheFirstUser();

  if (isTheFirstUser) {
    return await createFirstAdminUserController(req, res, next);
  }
  return await createUserController(req, res, next);
}

async function signInController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const USER_PASSWORD_ERROR = "The username or password doesn't exist";
  const { username, password } = req.body;
  const user = await getUserFromUserNameService(username);

  if (user) {
    const { pass: hashedPassword } = user;
    const { token, error } = await signInService(
      hashedPassword,
      password,
      username
    );

    if (error) {
      return res.status(403).send({ error: { message: USER_PASSWORD_ERROR } });
    }

    return res.status(200).send({ data: { token } });
  }
  return res.status(403).send({ error: { message: USER_PASSWORD_ERROR } });
}

export { signInController, signUpController };
