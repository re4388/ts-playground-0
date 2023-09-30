export class SpecialStack {
  private arr: string[];

  constructor(initValues: string[]) {
    this.arr = initValues;
  }

  public pop(take: number): string[] {
    return this.arr.splice(this.arr.length - take, take);
  }

  public peak(): string {
    return this.arr.slice(-1)[0];
  }

  public push(input: string[]): void {
    this.arr = [...this.arr, ...input];
  }
}

