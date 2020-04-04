import { Forest } from "./flyweight";

describe("Flyweight", () => {
  it("should get correct amount of gum tree", () => {
    const forest = new Forest();
    forest.plantTree(1, 1, "gum tree", "red");
    forest.plantTree(1, 2, "gum tree", "blue");
    forest.plantTree(3, 3, "cypress", "yellow");
    forest.plantTree(5, 3, "apple tree", "black");
    forest.plantTree(5, 3, "spruce", "black");
    forest.plantTree(6, 3, "spruce", "black");

    expect(forest.getByName("gum tree").length).toBe(2);
  });
});
