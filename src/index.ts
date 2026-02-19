import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { setCommand } from "@commands/register/set";
import { helpCommand } from "@commands/general/help";
import { commandManager } from "@commands/manager";
import { clearCommand } from "@commands/general/clear";
import { exitCommand } from "@commands/general/exit";

const rl = readline.createInterface({ input, output, prompt: "(URsiM)> " });

commandManager.register(helpCommand);
commandManager.register(setCommand);
commandManager.register(clearCommand);
commandManager.register(exitCommand);

console.log(
  "Welcome to the URsiM interactive shell! Use the help command or press CTRL + C to exit.",
);

rl.prompt();
for await (const line of rl) {
  const input = line.trim();
  if (input) {
    commandManager.execute(input.split(" "));
  }
  rl.prompt();
}
