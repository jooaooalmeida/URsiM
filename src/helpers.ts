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
