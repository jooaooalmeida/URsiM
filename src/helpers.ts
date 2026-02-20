import { stdin } from "node:process";
import { z } from "zod";
import type { Instructions } from "@simulator/parser";

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

export function instructionToString(instruction: Instructions) {
  switch (instruction.type) {
    case "JUMP":
      return `JUMP TO INST ${instruction.goto} IF R${instruction.firstRegister} == R${instruction.secondRegister}`;
      break;
    case "SUCCESSOR":
      return `SUCCESSOR at R${instruction.register}`;
      break;
    case "TRANSFER":
      return `TRANSFER from R${instruction.from} to R${instruction.to}`;
      break;
    case "ZERO":
      return `ZERO at R${instruction.register}`;
  }
}

export function waitForKeypress(): Promise<boolean> {
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

      if (data[0] === 3) {
        resolve(true);
      }
      resolve(false);
    });
  });
}
