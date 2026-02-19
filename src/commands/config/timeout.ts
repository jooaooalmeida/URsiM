import { defineArgs } from "@/helpers";
import { CommandCategory, createCommand } from "@commands/command";
import z from "zod";

export const timeoutCommand = createCommand({
  name: "timeout",
  category: CommandCategory.GENERAL,
  schema: defineArgs({
    timeout: z.coerce.number().positive().min(1).max(10),
  }),
  description: "Changes the execution timeout of the simulator.",
  onRun: () => {
    process.exit();
  },
});
