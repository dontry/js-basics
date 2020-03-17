import { Engine } from "./Engine";
import { Car } from "./Car";

export interface Builder {
  reset(): void;
  setType(type: string): void;
  setSeats(seats: number): void;
  setEngine(engine: Engine): void;
  setInterior(interior: string): void;
  getProduct(): Car;
}
