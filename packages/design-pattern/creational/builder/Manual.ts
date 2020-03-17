import { Engine } from "./Engine";

export class Manual implements Product {
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

  getSeats(): number {
    return this.seats;
  }

  addInterior(interior: string) {
    this.interior = interior;
  }

  getInterior() {
    return this.interior;
  }

  showInfo(): string {
    throw new Error("Method not implemented.");
  }
}
