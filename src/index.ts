import { setCommand } from "@commands/register/set";
import { helpCommand } from "@commands/general/help";
import { commandManager } from "@commands/manager";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output, prompt: "(URsiM)> " });

commandManager.register(helpCommand);
commandManager.register(setCommand);

console.log(
  "Welcome to the URsiM interactive shell! Use the help command or press CTRL + C to exit.",
);

rl.prompt();
for await (const line of rl) {
  commandManager.execute(line.trim().split(" "));
  rl.prompt();
}
