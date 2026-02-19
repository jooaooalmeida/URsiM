import { defineArgs } from "@/helpers";
import { simulator } from "@/simulator/simulator";
import { CommandCategory, createCommand } from "@commands/command";

export const listCommand = createCommand({
  name: "list",
  category: CommandCategory.REGISTER,
  schema: defineArgs({}),
  description: "Lists all registers currently defined in URsiM.",
  onRun: () => {
    simulator.registers.list();
  },
});
