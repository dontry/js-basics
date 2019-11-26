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

/* 
  Please note the core feature of iterables: separation of concerns.
  The range itself does not have the next() method.
  Instead, another object, a so-called “iterator” is created by the call to range[Symbol.iterator](), and its next() generates values for the iteration.
*/
let range = {
  from: 1,
  to: 5
};

// 1. call to for..of initially calls this
range[Symbol.iterator] = function() {
  // ...it returns the iterator object:
  // 2. Onward, for..of works only with this iterator, asking it for next values
  return {
    current: this.from,
    last: this.to,

    // 3. next() is called on each iteration by the for..of loop
    next() {
      // 4. it should return the value as an object {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// now it works!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}

//Infinite iterators are also possible. For instance, the range becomes infinite for range.to = Infinity.
//Or we can make an iterable object that generates an infinite sequence of pseudorandom numbers. Also can be useful.
