const cars = ["mercedes", "polo", "bmw"];

const iterator = cars[Symbol.iterator]();
iterator.next(); //?

for (const car of cars) {
  console.log("car:", car);
}

const CarFactory = {
  [Symbol.iterator]: () => {
    return {
      next: () => {
        const run = Math.random() > 0.1;
        if (run) {
          return {
            value: cars[Math.floor(Math.random() * 3)],
            done: false
          };
        }
        return { done: true };
      }
    };
  }
};

for (const car of CarFactory) {
  console.log("car factory produces:", car);
}
