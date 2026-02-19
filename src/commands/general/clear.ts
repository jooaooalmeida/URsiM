import { defineArgs } from "@/helpers";
import { CommandCategory, createCommand } from "@commands/command";

export const clearCommand = createCommand({
  name: "clear",
  category: CommandCategory.GENERAL,
  schema: defineArgs({}),
  description: "Clears the terminal window.",
  onRun: () => {
    console.clear();
  },
});
