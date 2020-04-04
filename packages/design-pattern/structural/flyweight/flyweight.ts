export class Tree {
  constructor(private x: number, private y: number, private type: TreeType) {}

  public showDetails(): void {
    console.log(`Tree: ${this.x}, ${this.y}, ${this.type}`);
  }

  public getName(): string {
    return this.type.getName();
  }
}

export class TreeType {
  constructor(private name: string, private color: string) {}

  public getName() {
    return this.name;
  }

  public toString(): string {
    return `type: ${this.name}, color: ${this.color}`;
  }
}

export class TreeFactory {
  static treeTypes = new Map<string, TreeType>();

  public static getTreeType(name: string, color: string): TreeType {
    let type = this.treeTypes.get(name);
    if (type == null) {
      type = new TreeType(name, color);
    }
    return type;
  }
}

export class Forest {
  private trees: Tree[] = [];

  public plantTree(x: number, y: number, name: string, color: string) {
    const type = TreeFactory.getTreeType(name, color);
    const tree = new Tree(x, y, type);
    this.trees.push(tree);
  }

  public showDetails() {
    this.trees.forEach((tree) => {
      tree.showDetails();
    });
  }

  public getByName(name: string): Tree[] {
    return this.trees.filter((tree) => tree.getName() === name);
  }
}
