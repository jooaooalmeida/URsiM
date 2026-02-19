import { table } from "table";

export class Registers {
  private data = new Map<number, number>();
  get(index: number) {
    return this.data.get(index) ?? 0;
  }
  set(index: number, value: number) {
    this.data.set(index, value);
  }
  increment(index: number) {
    this.data.set(index, this.get(index) + 1);
  }
  zero(index: number) {
    this.data.set(index, 0);
  }
  clear() {
    this.data.clear();
  }
  list() {
    if (this.data.size === 0) {
      return console.log("No registers initialized.");
    }
    const sortedRegs = Array.from(this.data.keys()).sort((a, b) => a - b);
    const headers = sortedRegs.map((reg) => `R${reg}`);
    const values = sortedRegs.map((reg) => this.data.get(reg)!);
    const data = [headers, values];
    console.log(table(data));
  }
}
