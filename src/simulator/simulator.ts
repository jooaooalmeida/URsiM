import { Registers } from "@simulator/registers";
import type { Instructions } from "./parser";

class Simulator {
  registers = new Registers();
  programCounter = 0;

  execute(program: Instructions[]) {
    this.programCounter = 0;
    while (this.programCounter < program.length) {
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
    this.registers.list();
  }
}

export const simulator = new Simulator();
