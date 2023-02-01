import { role } from "@prisma/client";

import prisma from "../../../core/prisma";

async function getRoleFromNameRepository(name: string): Promise<role | null> {
  return await prisma.role.findFirst({
    where: {
      name,
    },
  });
}

async function getRoleFromIdRepository(id: number): Promise<role | null> {
  return await prisma.role.findFirst({
    where: {
      id,
    },
  });
}

async function deleteRoleFromIdRepository(id: number): Promise<role> {
  return await prisma.role.delete({
    where: {
      id,
    },
  });
}

async function updateRoleRepository(id: number, name: string): Promise<role> {
  return await prisma.role.update({
    where: { id },
    data: { name },
  });
}

async function createRoleRepository(name: string): Promise<role> {
  return await prisma.role.create({
    data: { name },
  });
}

export {
  getRoleFromNameRepository,
  getRoleFromIdRepository,
  deleteRoleFromIdRepository,
  updateRoleRepository,
  createRoleRepository,
};
