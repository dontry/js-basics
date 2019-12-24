class Producer {
  constructor(params) {
    this.listeners = [];
  }
  addListener(listener) {
    if (typeof listener === "function") {
      this.listeners.push(listener);
    } else {
      throw new Error(`listener has to be a function`);
    }
  }

  removeListener(listener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }

  notify(message) {
    this.listeners.forEach(listener => {
      listener(message);
    });
  }
}

const producer = new Producer();

function createListener(id) {
  return function(msg) {
    console.log(msg + ` from listener ${id}`);
  };
}

producer.addListener(createListener(1));
producer.addListener(createListener(2));

producer.notify("Create a new object!");

// Lazy evaluation
function* getNumbers(words) {
  for (let character of words) {
    if (/^[0-9]+$/.test(character)) {
      const result = parseInt(character, 10);
      yield result;
    }
  }
}

const iterator = getNumbers("30 days for RxJS (04)");

iterator.next();
// { value: 3, done: false }
iterator.next();
// { value: 0, done: false }
iterator.next();
// { value: 0, done: false }
iterator.next();
// { value: 4, done: false }
iterator.next();
// { value: undefined, done: true }

// both Observer and Iterator are accessing information progressively
// The  difference is  Observer is a producer pushing the information,
// whereas Iterator is a consumer pulling the information

//  Observable is a combination of these two patterns, it is like a sequence pushing elements
