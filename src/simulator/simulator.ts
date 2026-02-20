import { instructionToString, waitForKeypress } from "@/helpers";
import { Registers } from "@simulator/registers";
import { generateAST, URMSyntaxError } from "@simulator/parser";

class Simulator {
  registers = new Registers();
  timeout = 5;
  programCounter = 0;
  debug = false;
  startTime = Date.now();

  setTimeout(value: number) {
    this.timeout = value;
  }

  toggleDebug() {
    this.debug = !this.debug;
    return this.debug;
  }

  async execute(content: string[]) {
    this.programCounter = 0;
    this.startTime = Date.now();

    try {
      const program = generateAST(content);
      while (this.programCounter < program.length) {
        if (this.debug) {
          console.log(
            `Next instruction to execute: ${instructionToString(program[this.programCounter]!)}`,
          );
          this.registers.list();
          console.log("Press any key to continue or CTRL + C to abort");
          const aborted = await waitForKeypress();
          if (aborted) throw new Error("Stopping execution due to user request.");
        }

        if (Date.now() - this.startTime > this.timeout * 1000 && !this.debug) {
          throw new Error("Stopping execution after timeout. (Is this program solvable?)");
          return;
        }

        const instruction = program[this.programCounter];
        switch (instruction?.type) {
          case "JUMP":
            if (
              this.registers.get(instruction.firstRegister) ==
              this.registers.get(instruction.secondRegister)
            ) {
              this.programCounter = instruction.goto - 1;
            } else {
              this.programCounter++;
            }
            break;
          case "SUCCESSOR":
            this.registers.increment(instruction.register);
            this.programCounter++;
            break;
          case "TRANSFER":
            this.registers.set(instruction.to, this.registers.get(instruction.from));
            this.programCounter++;
            break;
          case "ZERO":
            this.registers.zero(instruction.register);
            this.programCounter++;
            break;
        }
      }
      console.log("Program finished execution successfully.");
      this.registers.list();
    } catch (e) {
      console.log((e as Error).message ?? "Program execution failed with unknown error.");
      if (!(e instanceof URMSyntaxError)) {
        this.registers.list();
      }
    }
  }
}

export const simulator = new Simulator();
