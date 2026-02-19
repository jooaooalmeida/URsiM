import { CommandType, createCommand } from "../command";
import { z } from "zod";

const helpSchema = z.array(z.string());

export const helpCommand = createCommand({
  name: "help",
  category: CommandType.GENERAL,
  schema: helpSchema,

  onRun: () => {
    console.log(`Welcome from the Help Command!`);
  },
});
