export type Instructions =
  | { type: "ZERO"; register: number }
  | { type: "SUCCESSOR"; register: number }
  | { type: "TRANSFER"; from: number; to: number }
  | { type: "JUMP"; firstRegister: number; secondRegister: number; goto: number };

export class URMSyntaxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "URMSyntaxError";
    Object.setPrototypeOf(this, URMSyntaxError.prototype);
  }
}

export function generateAST(rawInstructions: string[]): Instructions[] {
  const ast: Instructions[] = [];

  for (let i = 0; i < rawInstructions.length; i++) {
    const rawLine = rawInstructions[i];

    const cleanLine = rawLine!.split("#")[0]!.trim();
    if (!cleanLine) continue;

    const match = cleanLine.match(/^([ZSTJ])\s*\(([^)]+)\)\s*;?$/i);
    if (!match) {
      throw new URMSyntaxError(
        `Syntax error at line ${i + 1}: Instruction is not properly formatted.`,
      );
    }

    const instruction = match[1]!.toUpperCase();
    const args = match[2]!.split(",").map((arg) => {
      const num = Number(arg.trim());
      if (!Number.isInteger(num) || num <= 0) {
        throw new URMSyntaxError(
          `Invalid argument '${arg.trim()}' at line ${i + 1}. All numbers must be naturals.`,
        );
      }
      return num;
    });

    switch (instruction) {
      case "Z":
        if (args.length !== 1)
          throw new URMSyntaxError(
            `Syntax error at line ${i + 1}: The ZERO instruction only takes one register`,
          );
        ast.push({ type: "ZERO", register: args[0]! });
        break;

      case "S":
        if (args.length !== 1)
          throw new URMSyntaxError(
            `Syntax error at line ${i + 1}: The SUCCESSOR instruction only takes one register.`,
          );
        ast.push({ type: "SUCCESSOR", register: args[0]! });
        break;

      case "T":
        if (args.length !== 2)
          throw new URMSyntaxError(
            `Syntax error at line ${i + 1}: The TRANSFER instruction takes two registries`,
          );
        ast.push({ type: "TRANSFER", from: args[0]!, to: args[1]! });
        break;

      case "J":
        if (args.length !== 3)
          throw new URMSyntaxError(
            `Syntax error at line ${i + 1}: The JUMP instruction always takes two registers and one insrtuction`,
          );
        ast.push({
          type: "JUMP",
          firstRegister: args[0]!,
          secondRegister: args[1]!,
          goto: args[2]!,
        });
        break;
    }
  }

  return ast;
}
