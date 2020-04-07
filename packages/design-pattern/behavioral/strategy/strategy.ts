export interface Algorithm {
  execute(a: number, b: number): number;
}

export class Add implements Algorithm {
  execute(a: number, b: number): number {
    return a + b;
  }
}

export class Subtract implements Algorithm {
  execute(a: number, b: number): number {
    return a - b;
  }
}

export class Multiply implements Algorithm {
  execute(a: number, b: number): number {
    return a * b;
  }
}

export class Divide implements Algorithm {
  execute(a: number, b: number): number {
    return a / b;
  }
}

export class Context {
  private algo: Algorithm | undefined;

  public setAlgorithm(algo: Algorithm) {
    this.algo = algo;
  }

  public executeAlgorithm(a: number, b: number): number | undefined {
    return this.algo?.execute(a, b);
  }
}
