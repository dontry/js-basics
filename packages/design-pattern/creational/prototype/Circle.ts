import { Shape } from "./Shape";

export class Circle extends Shape {
  private radius: number;
  constructor(x: number, y: number, radius: number, color: string) {
    super(x, y, color);
    this.radius = radius;
  }

  public size(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
}
