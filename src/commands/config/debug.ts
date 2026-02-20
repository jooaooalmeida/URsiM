import { defineArgs } from "@/helpers";
import { simulator } from "@/simulator/simulator";
import { CommandCategory, createCommand } from "@commands/command";

export const debugCommand = createCommand({
  name: "debug",
  category: CommandCategory.GENERAL,
  schema: defineArgs({}),
  description: "Toggles the debug mode.",
  onRun: () => {
    const newMode = simulator.toggleDebug();
    console.log(`Debug mode was set to ${newMode}`);
  },
});
