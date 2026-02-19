import { defineArgs } from "@/helpers";
import { simulator } from "@/simulator/simulator";
import { CommandCategory, createCommand } from "@commands/command";

export const clearCommand = createCommand({
  name: "clear",
  category: CommandCategory.REGISTER,
  schema: defineArgs({}),
  description: "Clears all registers in URsiM.",
  onRun: () => {
    simulator.registers.clear();
    return console.log("Successfully cleared all registers.");
  },
});
