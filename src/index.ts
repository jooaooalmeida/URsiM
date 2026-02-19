import { setCommand } from "@commands/register/set";
import { helpCommand } from "./commands/general/help";
import { commandManager } from "./commands/manager";

commandManager.register(helpCommand);
commandManager.register(setCommand);

console.write("Welcome to the URsiM interactive shell! Press CTRL + C to exit.\n> ");

for await (const line of console) {
  commandManager.execute(line.split(" "));
  console.write("> ");
}
