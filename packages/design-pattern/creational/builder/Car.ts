import { Engine } from "./Engine";

export class Car implements Product {
  private engine!: Engine;
  private seats!: number;
  private interior!: string;
  constructor() {}

  addEngine(engine: Engine) {
    this.engine = engine;
  }

  addSeats(seats: number) {
    this.seats = seats;
  }

  addInterior(interior: string) {
    this.interior = interior;
  }

  getSeats(): number {
    return this.seats;
  }

  getEngine(): Engine {
    return this.engine;
  }

  getInterior() {
    return this.interior;
  }

  showInfo(): string {
    return `This car is with ${this.seats} seats and ${this.interior} interior.`;
  }
}
