import { CommandCategory, createCommand } from "../command";
import { z } from "zod";

const setSchema = z.preprocess(
  (val: unknown) => {
    const args = val as string[];
    return {
      name: args[0],
    };
  },
  z.object({
    name: z.string().min(3),
  }),
);

export const setCommand = createCommand({
  name: "set",
  category: CommandCategory.REGISTER,
  schema: setSchema,

  onRun: ({ name }) => {
    console.log(`Welcome from the Set Command! ${name}`);
  },
});
