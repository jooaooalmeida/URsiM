import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { setCommand } from "@commands/register/set";
import { helpCommand } from "@commands/general/help";
import { commandManager } from "@commands/manager";
import { clearCommand } from "@commands/general/clear";
import { clearCommand as registerClearCommand } from "@commands/register/clear";
import { exitCommand } from "@commands/general/exit";
import { listCommand } from "@commands/register/list";
import { runCommand } from "@commands/general/run";
import { timeoutCommand } from "@commands/config/timeout";
import { listScriptsCommand } from "@commands/general/ls";

const rl = readline.createInterface({ input, output, prompt: "(URsiM)> " });

commandManager.register(helpCommand);
commandManager.register(setCommand);
commandManager.register(clearCommand);
commandManager.register(exitCommand);
commandManager.register(listCommand);
commandManager.register(runCommand);
commandManager.register(registerClearCommand);
commandManager.register(timeoutCommand);
commandManager.register(listScriptsCommand);

console.log(
  "Welcome to the URsiM interactive shell! Use the help command or press CTRL + C to exit.",
);

rl.prompt();
for await (const line of rl) {
  const input = line.trim();
  if (input) {
    await commandManager.execute(input.split(" "));
  }
  rl.prompt();
}
