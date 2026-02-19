import { defineArgs } from "@/helpers";
import { simulator } from "@/simulator/simulator";
import { CommandCategory, createCommand } from "@commands/command";
import { z } from "zod";

export const setCommand = createCommand({
  name: "set",
  category: CommandCategory.REGISTER,
  schema: defineArgs({
    register: z.coerce.number().positive(),
    value: z.coerce.number().positive(),
  }),
  description: "Sets a specific register in URsiM to the given value.",
  onRun: ({ register, value }) => {
    simulator.registers.set(register, value);
    console.log(`Successfully set register R${register} to value ${value}`);
  },
});
