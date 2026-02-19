import { defineArgs } from "@/helpers";
import { simulator } from "@/simulator/simulator";
import { CommandCategory, createCommand } from "@commands/command";
import z from "zod";

export const timeoutCommand = createCommand({
  name: "timeout",
  category: CommandCategory.GENERAL,
  schema: defineArgs({
    timeout: z.coerce.number().positive().min(1).max(10),
  }),
  description: "Changes the execution timeout of the simulator.",
  onRun: ({ timeout }) => {
    simulator.setTimeout(timeout);
    console.log(`Set execution timeout to ${timeout}s`);
  },
});
