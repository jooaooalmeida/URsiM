import { z } from "zod";

export enum CommandCategory {
  GENERAL,
  REGISTER,
  CONFIG,
}

export interface Command<T extends z.ZodType<any>> {
  name: string;
  description: string;
  category: CommandCategory;
  schema: T;
  onRun: (args: z.infer<T>) => void | Promise<void>;
}

export function createCommand<T extends z.ZodType<any>>(command: Command<T>) {
  return command;
}
