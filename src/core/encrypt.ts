import bcrypt from "bcrypt";
import { getBuffer } from "../utils/buffer";

function encrypt(str: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(str, 10, (err, hash) => {
      if (err) {
        reject(new Error(err.message));
      }
      resolve(hash);
    });
  });
}

async function getEncryptedPasswordBuffer(password: string): Promise<Buffer> {
  const encryptedPassword = await encrypt(password);
  const encryptedPasswordBuffer = getBuffer(encryptedPassword);
  return encryptedPasswordBuffer;
}

function compare(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hashedPassword, (err, same) => {
      if (err) {
        reject(false);
      }
      resolve(same);
    });
  });
}

export { getEncryptedPasswordBuffer as default, compare };
