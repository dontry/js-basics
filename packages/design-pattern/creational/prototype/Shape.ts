export abstract class Shape {
  constructor(
    protected x: number,
    protected y: number,
    protected color: string
  ) {}
  public abstract size(): number;
  public getX() {
    return this.x;
  }

  public clone(): Shape {
    return Object.create(this);
  }
  public getY() {
    return this.y;
  }
  public getColor() {
    return this.color;
  }
}
