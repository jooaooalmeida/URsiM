import { defineArgs } from "@/helpers";
import { CommandCategory, createCommand } from "@commands/command";

export const exitCommand = createCommand({
  name: "exit",
  category: CommandCategory.GENERAL,
  schema: defineArgs({}),

  onRun: () => {
    process.exit();
  },
});
