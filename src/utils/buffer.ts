function getStringFromBuffer(buffer: Buffer): string {
  return buffer.toString("utf-8");
}

function getBuffer(str: string): Buffer {
  return Buffer.from(str, "utf-8");
}

export { getStringFromBuffer, getBuffer };
