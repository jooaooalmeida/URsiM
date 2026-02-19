import { z } from "zod";

export enum CommandType {
  GENERAL,
  REGISTER,
}

export interface Command<T extends z.ZodType<any>> {
  name: string;
  category: CommandType;
  schema: T;
  onRun: (args: z.infer<T>) => void;
}

export function createCommand<T extends z.ZodType<any>>(command: Command<T>) {
  return command;
}
