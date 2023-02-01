import { role } from "@prisma/client";
import {
  getRoleFromIdRepository,
  getRoleFromNameRepository,
  deleteRoleFromIdRepository,
  updateRoleRepository,
  createRoleRepository,
} from "../repositories";

async function getRoleFromIdService(id: number): Promise<role | null> {
  return await getRoleFromIdRepository(id);
}

async function getRoleExistService(name: string): Promise<role | null> {
  return await getRoleFromNameRepository(name);
}

async function createRoleService(name: string): Promise<role | null> {
  try {
    return await createRoleRepository(name);
  } catch (err: any) {
    throw new Error(err);
  }
}

async function deleteRoleByIdService(
  id: number
): Promise<{ error: any; deletedRoleName: string | null }> {
  try {
    const deletedRole = await deleteRoleFromIdRepository(id);
    if (deletedRole) {
      const { name } = deletedRole;
      return { error: null, deletedRoleName: name };
    }
    const doesntExistError = "The role doesn't exist";
    return { error: doesntExistError, deletedRoleName: null };
  } catch (error: any) {
    return { error, deletedRoleName: null };
  }
}

async function updateRoleService(
  id: number,
  name: string
): Promise<{ name: string } | null> {
  try {
    const role = await updateRoleRepository(id, name);
    if (!role) {
      throw new Error("The role doesn't exist");
    }

    return { name };
  } catch (error: any) {
    throw new Error(error);
  }
}

export {
  getRoleFromIdService,
  createRoleService,
  getRoleExistService,
  deleteRoleByIdService,
  updateRoleService,
};
