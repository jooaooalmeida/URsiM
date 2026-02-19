import { defineArgs } from "../../helpers";
import { CommandCategory, createCommand } from "../command";
import { z } from "zod";

export const setCommand = createCommand({
  name: "set",
  category: CommandCategory.REGISTER,
  schema: defineArgs({
    name: z.string().min(3),
  }),

  onRun: ({ name }) => {
    console.log(`Welcome from the Set Command! ${name}`);
  },
});
