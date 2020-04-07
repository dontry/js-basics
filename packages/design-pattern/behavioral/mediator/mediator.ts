export interface Mediator {
  notify(sender: Object, event: string): void;
}

export class ConcreteMediator implements Mediator {
  constructor(private component1: Component1, private component2: Component2) {}
  notify(sender: Object, event: string): void {
    if (event === "A") {
      this.component2.doC();
    }
    if (event === "B") {
      this.component1.doB();
    }
  }
}

class BaseComponent {
  constructor(protected mediator: Mediator) {}
}

class Component1 extends BaseComponent {
  doA() {
    console.log("Component 1 does A");
    this.mediator.notify(this, "A");
  }

  doB() {
    console.log("Component 1 does B");
  }
}

class Component2 extends BaseComponent {
  doC() {
    console.log("Component 2 does C");
    this.mediator.notify(this, "B");
  }
}
