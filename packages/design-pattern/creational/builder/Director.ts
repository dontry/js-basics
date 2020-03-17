import { Builder } from "./Builder";
import { Engine } from "./Engine";

export class Director {
  constructor(private builder: Builder) {}

  produceSportCar(): Product {
    this.builder.reset();
    this.builder.setSeats(2);
    this.builder.setEngine(new Engine(100, 20, false));
    this.builder.setType("Sports Car");
    this.builder.setInterior("Deluxe");
    return this.builder.getProduct();
  }
}
