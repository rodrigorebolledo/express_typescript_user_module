import jwt from "jsonwebtoken";

function validateToken(token: string, consumerUsername: string): boolean {
  const secret = process.env.JWT_PASSPHRASE || "somehappens8541";

  try {
    const decoded: any = jwt.verify(token, secret);
    const { username } = decoded;
    if (username === consumerUsername) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

async function createToken(username: string): Promise<string> {
  const secret = process.env.JWT_PASSPHRASE || "somehappens8541";
  return jwt.sign(
    {
      username,
    },
    secret,
    { expiresIn: "1h" }
  );
}

export { validateToken, createToken };
