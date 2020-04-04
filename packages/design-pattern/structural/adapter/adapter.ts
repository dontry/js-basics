export class RoundHole {
  constructor(private radius: number) {}

  public getRadius() {
    return this.radius;
  }
  public fits(peg: RoundPeg): boolean {
    return this.getRadius() >= peg.getRadius();
  }
}

export class RoundPeg {
  constructor(private radius: number) {}

  public getRadius(): number {
    return this.radius;
  }
}

export class SquaredHole {
  constructor(private width: number) {}

  public getWidth(): number {
    return this.width;
  }

  public fits(peg: SquarePeg): boolean {
    return this.getWidth() >= peg.getWidth();
  }
}

export class SquarePeg {
  constructor(private width: number) {}

  public getWidth(): number {
    return this.width;
  }
}

export class SquarePegAdapter extends RoundPeg {
  constructor(private squaredPeg: SquarePeg) {
    super(0);
  }

  public getRadius() {
    return (this.squaredPeg.getWidth() * Math.sqrt(2)) / 2;
  }
}
