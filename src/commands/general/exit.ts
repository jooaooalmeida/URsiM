import { defineArgs } from "@/helpers";
import { CommandCategory, createCommand } from "@commands/command";

export const exitCommand = createCommand({
  name: "exit",
  category: CommandCategory.GENERAL,
  schema: defineArgs({}),
  description: "Exits the URsiM Interactive Shell.",
  onRun: () => {
    process.exit();
  },
});
