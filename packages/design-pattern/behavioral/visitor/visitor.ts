export abstract class Shape {
  public abstract move(x: number, y: number): void;
  public abstract draw(): void;
  //Double dispatch is a trick that allows using dynamic binding alongside with overloaded methods. Here how it’s done:
  public accept(visitor: Visitor): Record<string, number> {
    return visitor.visit(this);
  }
}

export class Dot extends Shape {
  private x: number = 0;
  private y: number = 0;
  constructor() {
    super();
  }

  public setX(x: number) {
    this.x = x;
  }

  public setY(y: number) {
    this.y = y;
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public move(x: number, y: number): void {
    this.x = this.x + x;
    this.y = this.y + y;
  }
  public draw(): void {
    console.log(`Draw Dot: (${this.x},${this.y})`);
  }
}

export class Circle extends Shape {
  private x: number = 0;
  private y: number = 0;
  private radius: number = 0;
  constructor() {
    super();
  }

  public setX(x: number) {
    this.x = x;
  }

  public setY(y: number) {
    this.y = y;
  }

  public setRadius(r: number) {
    this.radius = r;
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public getRadius() {
    return this.radius;
  }

  public move(x: number, y: number): void {
    this.x = this.x + x;
    this.y = this.y + y;
  }
  public draw(): void {
    console.log(`Draw Circle: (${this.x},${this.y}),  radius: ${this.radius}`);
  }
}

export interface Visitor {
  visit(shape: Shape): Record<string, number>;
}

export class JsonExportVisitor implements Visitor {
  public visit(shape: Shape): Record<string, number> {
    if (shape instanceof Dot) {
      return this.visitDot(shape);
    } else if (shape instanceof Circle) {
      return this.visitCircle(shape);
    } else {
      return {};
    }
  }

  visitDot(dot: Dot) {
    return {
      x: dot.getX(),
      y: dot.getY(),
    };
  }

  visitCircle(circle: Circle) {
    return {
      x: circle.getX(),
      y: circle.getY(),
      radius: circle.getRadius(),
    };
  }

  exportShapes(shapes: Shape[]): string {
    const json = shapes.map((shape) => shape.accept(this));
    return JSON.stringify(json);
  }
}
