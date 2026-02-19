export type Instructions =
  | { type: "ZERO"; register: number }
  | { type: "SUCCESSOR"; register: number }
  | { type: "TRANSFER"; from: number; to: number }
  | { type: "JUMP"; firstRegister: number; secondRegister: number; goto: number };

export function generateAST(rawInstructions: string[]): Instructions[] {
  return rawInstructions.map((i, index) => {
    const instruction = i.charAt(0).toUpperCase();
    const args = i
      .slice(2, i.charAt(-1) === ";" ? -2 : -1)
      .replaceAll(" ", "")
      .split(",");
    switch (instruction) {
      case "Z":
        if (args.length === 1 && Number(args[0]) > 0) {
          return { type: "ZERO", register: Number(args[0]) };
        }
        throw new Error(`Invalid arguments passed to instruction at line ${index + 1}`);
      case "S":
        if (args.length === 1 && Number(args[0]) > 0) {
          return { type: "SUCCESSOR", register: Number(args[0]) };
        }
        throw new Error(`Invalid arguments passed to instruction at line ${index + 1}`);
      case "T":
        if (args.length === 2 && Number(args[0]) > 0 && Number(args[1]) > 0) {
          return { type: "TRANSFER", from: Number(args[0]), to: Number(args[1]) };
        }
        throw new Error(`Invalid arguments passed to instruction at line ${index + 1}`);
      case "J":
        if (
          args.length === 3 &&
          Number(args[0]) > 0 &&
          Number(args[1]) > 0 &&
          Number(args[2]) > 0
        ) {
          return {
            type: "JUMP",
            firstRegister: Number(args[0]),
            secondRegister: Number(args[1]),
            goto: Number(args[2]),
          };
        }
        throw new Error(`Invalid arguments passed to instruction at line ${index + 1}`);
      default:
        throw new Error(`Invalid instruction ${instruction} found at line ${index + 1}`);
    }
  });
}
