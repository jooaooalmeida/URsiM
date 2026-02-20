import { defineArgs } from "@/helpers";
import { generateAST } from "@/simulator/parser";
import { simulator } from "@/simulator/simulator";
import { CommandCategory, createCommand } from "@commands/command";
import z from "zod";

export const runCommand = createCommand({
  name: "run",
  category: CommandCategory.GENERAL,
  schema: defineArgs({
    programPath: z.string().endsWith(".urm"),
  }),
  description: "Runs a .urm file and displays the output.",
  onRun: async ({ programPath }) => {
    let content;
    try {
      const file = Bun.file(programPath);
      content = (await file.text()).trim().split("\n");
    } catch (e) {
      return console.log(`Failed to read file at ${programPath} (${(e as Error).message})`);
    }
    if (content.length === 0) {
      return console.log(`Failed to read file ${programPath}`);
    }
    const programAST = generateAST(content);
    await simulator.execute(programAST);
  },
});
