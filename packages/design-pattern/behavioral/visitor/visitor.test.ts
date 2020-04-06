import { Dot, Circle, JsonExportVisitor } from "./visitor";

describe("Visitor ", () => {
  it("should return JSON string of dot and circle", () => {
    const dot = new Dot();
    dot.setX(1);
    dot.setY(10);

    const circle = new Circle();
    circle.setX(3);
    circle.setY(3);
    circle.setRadius(3);

    const compoundGraphics = [dot, circle];

    const exporter = new JsonExportVisitor();
    const result = exporter.exportShapes(compoundGraphics);
    expect(result).toBe(`[{"x":1,"y":10},{"x":3,"y":3,"radius":3}]`);
  });
});
