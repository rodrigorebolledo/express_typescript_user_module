import { user } from "@prisma/client";
import {
  getUserCountRepository,
  getUserFromIdRepository,
  getUserFromUserNameRepository,
  updateUserRepository,
  deleteUserFromIdRepository,
} from "../repositories";
import { getRoleFromIdRepository } from "../../role/repositories";
import getEncryptedPasswordBuffer from "../../../core/encrypt";

async function getIsTheFirstUser() {
  const count = await getUserCountRepository();

  if (count === 0) return true;
  return false;
}

async function getUserFromIdService(id: number): Promise<user | null> {
  return await getUserFromIdRepository(id);
}

async function isAdminService(username: string): Promise<boolean> {
  const existingUser: user | null = await getUserFromUserNameRepository(
    username
  );

  if (existingUser) {
    const { role_id } = existingUser;
    const role = await getRoleFromIdRepository(role_id);
    if (role) {
      const { name } = role;
      if (name === process.env.ADMIN_ROLE_NAME) {
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
}

async function updateUserService(
  id: number,
  username: string,
  password: string
): Promise<{ data: { user: { username: string } } } | null> {
  let encryptedPasswordBuffer;
  try {
    encryptedPasswordBuffer = await getEncryptedPasswordBuffer(password);
  } catch {
    throw new Error("The encryption fails");
  }

  try {
    const user = await updateUserRepository(
      id,
      username,
      encryptedPasswordBuffer
    );

    const copyUser: any = { ...user };
    delete copyUser["pass"];

    return { data: { user: copyUser } };
  } catch (error: any) {
    throw new Error("The user doesn't exist");
  }
}

async function deleteUserFromIdService(id: number) {
  return await deleteUserFromIdRepository(id);
}

async function getUserFromUserNameService(
  username: string
): Promise<user | null> {
  return await getUserFromUserNameRepository(username);
}

export {
  getIsTheFirstUser,
  getUserFromIdService,
  isAdminService,
  updateUserService,
  deleteUserFromIdService,
  getUserFromUserNameService,
};
