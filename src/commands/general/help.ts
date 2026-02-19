import { defineArgs } from "@/helpers";
import { CommandCategory, createCommand } from "@commands/command";

export const helpCommand = createCommand({
  name: "help",
  category: CommandCategory.GENERAL,
  schema: defineArgs({}),
  description: "Displays this help message.",
  onRun: () => {
    console.log(`Welcome from the Help Command!`);
  },
});
