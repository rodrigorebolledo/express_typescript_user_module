import prisma from "../../../core/prisma";

import { getRoleFromNameRepository } from "../../role/repositories";
import { getUserFromUserNameRepository } from "../../user/repositories";
import getEncryptedPasswordBuffer from "../../../core/encrypt";

async function createFirstAdminUser(username: string, password: string) {
  const ADMIN_ROLE_NAME = "admin";

  try {
    const roleEntity = await getRoleFromNameRepository(ADMIN_ROLE_NAME);

    if (roleEntity) {
      const { id } = roleEntity;

      const encryptedPasswordBuffer = await getEncryptedPasswordBuffer(
        password
      );

      await prisma.user.create({
        data: { username, pass: encryptedPasswordBuffer, role_id: id },
      });
    }
  } catch (err: any) {
    throw new Error(err);
  }
}

async function createUser(username: string, password: string) {
  const MEMBER_ROLE_NAME = "member";
  let encryptedPasswordBuffer: Buffer;
  try {
    const roleEntity = await getRoleFromNameRepository(MEMBER_ROLE_NAME);

    if (roleEntity) {
      const { id } = roleEntity;
      const existingUser = await getUserFromUserNameRepository(username);

      if (existingUser) {
        throw new Error("The user already exits");
      }

      try {
        encryptedPasswordBuffer = await getEncryptedPasswordBuffer(password);
      } catch {
        throw new Error("The encryption fails");
      }

      await prisma.user.create({
        data: { username, pass: encryptedPasswordBuffer, role_id: id },
      });

      return;
    }

    throw new Error("the role entity doesn't exist");
  } catch (err: any) {
    throw new Error(err);
  }
}

export { createFirstAdminUser, createUser };
