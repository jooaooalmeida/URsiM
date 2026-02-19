import { defineArgs } from "@/helpers";
import { CommandCategory, createCommand } from "@commands/command";
import { commandManager } from "../manager";

export const helpCommand = createCommand({
  name: "help",
  category: CommandCategory.GENERAL,
  schema: defineArgs({}),
  description: "Displays this help message.",
  onRun: () => {
    console.log("\nAvailable Commands:\n");

    for (const [categoryName, categoryMap] of commandManager.commandMap.entries()) {
      for (const [commandName, command] of categoryMap.entries()) {
        const fullCommand =
          categoryName === "general" ? commandName : `${categoryName} ${commandName}`;

        console.log(`• ${fullCommand}: ${command.description}`);
      }
    }
    console.log("");
  },
});
