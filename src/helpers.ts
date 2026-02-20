import { stdin } from "node:process";
import { z } from "zod";

export function defineArgs<T extends z.ZodRawShape>(shape: T) {
  return z.preprocess((val: unknown) => {
    const args = (val as string[]) || [];
    const result: Record<string, string | undefined> = {};

    Object.keys(shape).forEach((key, index) => {
      result[key] = args[index];
    });

    return result;
  }, z.object(shape));
}

export function waitForKeypress(): Promise<void> {
  return new Promise((resolve) => {
    const wasRaw = stdin.isRaw;
    const listeners = stdin.rawListeners("data");
    stdin.removeAllListeners("data");

    if (typeof stdin.setRawMode === "function") {
      stdin.setRawMode(true);
    }
    stdin.resume();

    stdin.once("data", (data: Buffer) => {
      if (typeof stdin.setRawMode === "function") {
        stdin.setRawMode(wasRaw);
      }
      for (const listener of listeners) {
        stdin.on("data", listener as (...args: unknown[]) => void);
      }
      // Ctrl+C
      if (data[0] === 3) {
        process.exit();
      }
      resolve();
    });
  });
}
