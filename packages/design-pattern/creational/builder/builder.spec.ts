import { Director } from "./Director";
import { CarBuilder } from "./CarBuilder";
import { Car } from "./Car";
import { Engine } from "./Engine";
import { ManualBuilder } from "./ManualBuilder";
import { Manual } from "./Manual";

describe("builder", () => {
  it("should build a car", () => {
    const carBuilder = new CarBuilder();
    const director = new Director(carBuilder);
    const car: Car = director.produceSportCar() as Car;
    expect(car.getSeats()).toBe(2);
    expect(car.getEngine() instanceof Engine).toBeTruthy();
    expect(car.getInterior()).toBe("Deluxe");
  });

  it("should create a car manual", () => {
    const manualBuilder = new ManualBuilder();
    const director = new Director(manualBuilder);
    const manual: Manual = director.produceSportCar() as Manual;
    expect(manual.getSeats()).toBe(2);
    expect(manual.getInterior()).toBe("Deluxe");
  });
});
