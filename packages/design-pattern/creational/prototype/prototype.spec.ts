import { Rectangle } from "./Rectangle";
import { Circle } from "./Circle";
import { PrototypeRegistry } from "./PrototypeRegistry";
import { Shape } from "./Shape";

describe("prototype", () => {
  it("should return green rectangle and green circle", () => {
    const greenRectangle = new Rectangle(0, 0, 30, 30, "green");
    const blueRetangle = new Rectangle(0, 0, 30, 30, "blue");
    const greenCircle = new Circle(0, 0, 30, "green");
    const blueCircle = new Circle(0, 0, 30, "blue");

    const registry = new PrototypeRegistry();

    registry.addItem(greenRectangle);
    registry.addItem(blueRetangle);
    registry.addItem(greenCircle);
    registry.addItem(blueCircle);

    const items: Shape[] = registry.getByColor("green");
    expect(items.length).toBe(2);
    expect(items.filter(item => item instanceof Rectangle).length).toBe(1);
    const actualRectangle: Shape | undefined = items.find(
      item => item instanceof Rectangle
    );
    expect(actualRectangle).toBeTruthy();
    expect(actualRectangle).toBeInstanceOf(Rectangle);
    expect(actualRectangle!.getColor()).toBe("green");
    expect(items.filter(item => item instanceof Circle).length).toBe(1);
    const actualCircle: Shape | undefined = items.find(
      item => item instanceof Circle
    );
    expect(actualCircle).toBeTruthy();
    expect(actualCircle).toBeInstanceOf(Circle);
    expect(actualCircle!.getColor()).toBe("green");
  });
});
