import { defineArgs } from "../../helpers";
import { CommandCategory, createCommand } from "../command";

export const helpCommand = createCommand({
  name: "help",
  category: CommandCategory.GENERAL,
  schema: defineArgs({}),

  onRun: () => {
    console.log(`Welcome from the Help Command!`);
  },
});
