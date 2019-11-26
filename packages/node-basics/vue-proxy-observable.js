const data = {
  factor: 0,
  counter: 0,
  result: 0
};

class Dep {
  static task;
  constructor(prop) {
    this.subscribers = new Set();
  }

  depend(target) {
    this.subscribers.add(target);
  }

  notify(target) {}
}

const dependencies = new WeakMap();

function makeObservable(obj) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      if (!dependencies.get(target)) {
        const observable = new Dep(target);
      }
    },
    set(target, prop, receiver) {}
  });
}

function runner(task) {
  Dep.task = task;
  task();
}

function renderEquation() {
  const $equation = document.querySelector("#equation");

  $equation.textContent = `${data.factor} + ${data.counter} = ${data.factor +
    data.counter}`;
}
