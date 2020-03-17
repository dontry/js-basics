import { Builder } from "./Builder";
import { Car } from "./Car";
import { Engine } from "./Engine";

export class CarBuilder implements Builder {
  private type!: string;
  private car!: Car;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.car = new Car();
  }

  setType(type: string): void {
    this.type = type;
  }
  setSeats(seats: number): void {
    this.car.addSeats(seats);
  }
  setEngine(engine: Engine): void {
    this.car.addEngine(engine);
  }

  setInterior(interior: string): void {
    this.car.addInterior(interior);
  }

  getCarInfo(): string {
    return `This car is ${this.type} with ${this.car.getSeats()} seats.`;
  }

  getProduct(): Car {
    return this.car;
  }
}
