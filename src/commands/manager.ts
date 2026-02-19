import type { Command } from "./command";
import { z } from "zod";

export class CommandManager {
  commands = new Map<string, Command<z.ZodType<any>>>();

  register(command: Command<any>) {
    this.commands.set(command.name, command);
  }

  execute(commandName: string, args: string[]) {
    const command = this.commands.get(commandName);
    if (!command) {
      return console.log(
        "No command found. Please use the help command to check available commands.",
      );
    }

    const result = command.schema.safeParse(args);
    if (!result.success) {
      return console.log(z.prettifyError(result.error));
    }

    command.onRun(result.data);
  }
}
