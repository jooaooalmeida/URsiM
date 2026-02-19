import { helpCommand } from "./commands/general/help";
import { CommandManager } from "./commands/manager";

const commandManager = new CommandManager();
commandManager.register(helpCommand);

commandManager.execute(prompt("Insira o nome do comando a executar: ") ?? "", ["45"]);
