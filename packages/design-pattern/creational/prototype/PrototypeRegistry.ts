import { Shape } from "./Shape";

export class PrototypeRegistry {
  private shapes: Shape[];
  constructor() {
    this.shapes = [];
  }

  public addItem(shape: Shape): void {
    this.shapes.push(shape);
  }

  public getByColor(color: string): Shape[] {
    return this.shapes
      .filter(shape => shape.getColor() === color)
      .map(shape => {
        return shape.clone();
      });
  }
}
