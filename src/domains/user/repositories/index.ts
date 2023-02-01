import { user } from "@prisma/client";
import prisma from "../../../core/prisma";

async function getUserFromUserNameRepository(
  username: string
): Promise<user | null> {
  return await prisma.user.findFirst({
    where: {
      username,
    },
  });
}

async function getUserFromIdRepository(id: number): Promise<user | null> {
  return await prisma.user.findFirst({
    where: {
      id,
    },
  });
}

async function getUserCountRepository(): Promise<number> {
  return await prisma.user.count();
}

async function deleteUserFromIdRepository(id: number): Promise<user> {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}

async function updateUserRepository(
  id: number,
  username: string,
  password: Buffer
) {
  return await prisma.user.update({
    where: { id },
    data: { username, pass: password },
  });
}

export {
  getUserFromUserNameRepository,
  getUserFromIdRepository,
  getUserCountRepository,
  deleteUserFromIdRepository,
  updateUserRepository,
};
