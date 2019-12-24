type Params = number | string;

class Stack<T extends Params> {
  private arr: T[] = [];

  /**
   * push
   */
  public push(item: T): void {
    this.arr.push(item);
  }

  /**
   * pop
   */
  public pop(): void {
    this.arr.pop();
  }
}

const numStack = new Stack<number>();

const boolStack = new Stack<boolean>();

numStack.push(true);
boolStack.push("ss");
