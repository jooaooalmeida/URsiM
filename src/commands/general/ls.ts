import { defineArgs } from "@/helpers";
import { CommandCategory, createCommand } from "@commands/command";
import { readdir } from "node:fs/promises";

export const listScriptsCommand = createCommand({
  name: "ls",
  category: CommandCategory.GENERAL,
  schema: defineArgs({}),
  description: "Lists all available scripts in the current directory and it's sub-directories.",
  onRun: async () => {
    let files = await readdir("./", { recursive: true });
    files = files.filter((name) => name.toLowerCase().endsWith(".urm"));
    console.log("\nAvailable Scripts:\n");
    for (const file of files) {
      console.log("• " + file);
    }
    console.log("");
  },
});
