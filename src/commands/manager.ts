import { type Command, CommandCategory } from "./command";
import { z } from "zod";

class CommandManager {
  commandMap = new Map<string, Map<string, Command<z.ZodType<any>>>>();

  register(command: Command<any>) {
    const categoryName = CommandCategory[command.category].toLowerCase();
    if (!this.commandMap.has(categoryName)) {
      this.commandMap.set(categoryName, new Map());
    }

    this.commandMap.get(categoryName)!.set(command.name, command);
  }

  execute(args: string[]) {
    const argOne = args[0]?.toLowerCase();
    let category: string;
    let commandName: string;

    if (!argOne) {
      return console.log("Command not found. Please use the help command for available commands.");
    }

    // Populate category and commandName variables. The If block checks if the first argument was a category or not.
    if (this.commandMap.has(argOne)) {
      category = args.shift()!.toLowerCase();
      commandName = args.shift()?.toLowerCase() ?? "";
    } else {
      category = CommandCategory[CommandCategory.GENERAL].toLowerCase();
      commandName = args.shift()!.toLowerCase();
    }

    if (!commandName) {
      return console.log(`Missing command name for category ${category}.`);
    }

    const categoryMap = this.commandMap.get(category);

    const command = categoryMap!.get(commandName);
    if (!command) {
      return console.log(
        `Could not find command ${commandName}. Please use the help command for available commands.`,
      );
    }

    const result = command.schema.safeParse(args);
    if (!result.success) {
      return console.log(z.prettifyError(result.error));
    }

    command.onRun(result.data);
  }
}

export const commandManager = new CommandManager();
