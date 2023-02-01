import { createToken } from "../../../core/jwt";
import { getStringFromBuffer } from "../../../utils/buffer";
import { compare } from "../../../core/encrypt";

async function signInService(
  hashedPasswordBuffer: Buffer,
  plainPassword: string,
  username: string
) {
  const hashedPasswordString = getStringFromBuffer(hashedPasswordBuffer);
  const isAuthenticated = await compare(plainPassword, hashedPasswordString);
  if (isAuthenticated) {
    const token = await createToken(username);
    return { error: false, token };
  }
  return { error: true };
}

export { signInService };
