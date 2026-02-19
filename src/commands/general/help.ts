import { CommandCategory, createCommand } from "../command";
import { z } from "zod";

const helpSchema = z.any();

export const helpCommand = createCommand({
  name: "help",
  category: CommandCategory.GENERAL,
  schema: helpSchema,

  onRun: () => {
    console.log(`Welcome from the Help Command!`);
  },
});
