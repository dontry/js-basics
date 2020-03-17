import { Shape } from "./Shape";

export class Rectangle extends Shape {
  private width: number;
  private height: number;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    super(x, y, color);
    this.width = width;
    this.height = height;
  }

  public size(): number {
    return this.height * this.width;
  }
}
