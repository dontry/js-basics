import { Builder } from "./Builder";
import { Car as Manual } from "./Car";
import { Engine } from "./Engine";

export class ManualBuilder implements Builder {
  private type!: string;
  private manual!: Manual;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.manual = new Manual();
  }

  setType(type: string): void {
    this.type = type;
  }

  setSeats(seats: number): void {
    this.manual.addSeats(seats);
  }

  setInterior(interior: string): void {
    this.manual.addInterior(interior);
  }
  setEngine(engine: Engine): void {
    this.manual.addEngine(engine);
  }

  getCarInfo(): string {
    return this.manual.showInfo();
  }

  getProduct(): Manual {
    return this.manual;
  }
}
