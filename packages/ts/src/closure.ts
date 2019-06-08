// typescript avoids the use of clsures to emulate private members
// to improve the application performance
class Counter {
  private static _COUNTER = 0;
  private number: number;
  constructor() {
    this.number = 0;
  }
  private _changeBy(val: number): void {
    Counter._COUNTER += val;
  }

  public increment(): void {
    this._changeBy(-1);
  }

  public value(): number {
    return Counter._COUNTER;
  }
}
