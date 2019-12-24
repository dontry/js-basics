import { Subscription } from "rxjs";

class Observable {
  constructor(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
      this.source = null;
    }
  }

  lift(operator) {
    const observable = new Observable();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  static toSubscriber() {}

  subscribe(observerOrNext, error, complete) {
    const { operator } = this;
    const sink = toSubscriber(observerOrNext, error, complete);

    if (operator) {
      // sink.add(operator.call(sink, this.source));
      operator.call(sink, this.source);
    } else {
      // sink.add(this.)
      this.source ? this._subscribe(sink) : this._trySubscribe(sink);
    }
    return sink;
  }

  _trySubscribe(sink) {
    try {
      return this._subscribe(sink);
    } catch (e) {}
  }
}

class Subscriber extends Subscription {
  constructor(destinationOrNext, error, complete) {
    this.isStopped = false;
    this.destination = null;

    super();

    switch (arguments.length) {
      case 0:
        this.destination = emptyObserver;
        break;
      case 1:
        if (!destinationOrNext) {
          this.destination = emptyObserver;
          break;
        }
        if (typeof destinationOrNext === "object") {
          if (destinationOrNext instanceof Subscriber) {
            this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
            this.destination = destinationOrNext;
            destinationOrNext.add(this);
          } else {
            this.syncErrorThrowable = true;
            this.destination = new SafeSubscriber(this, destinationOrNext);
          }
          break;
        }
      default:
        break;
    }
  }

  next(value) {
    if (!this.isStopped) {
      this._next(value);
    }
  }

  error(err) {
    if (!this.isStopped) {
      this.isStopped = true;
      this._error(err);
    }
  }

  complete(): void {
    if (!this.isStopped) {
      this.isStopped = true;
      this._complete();
    }
  }
}

class SafeSubscriber extends Subscriber {
  constructor(_parentSubscriber, observerOrNext, error, complete) {
    super();
    let next,
      context = this;

    if (isFunction(observerOrNext)) {
      next = observerOrNext;
    } else if (observerOrNext) {
      next = observerOrNext.next;
      error = observerOrNext.error;
      complete = observerOrNext.complete;
      if (observerOrNext !== emptyObserver) {
        context = Object.create(observerOrNext);
      }
    }

    this._context = context;
    this._next = next;
    this._error = error;
    this._complete = complete;
  }
}

const emptyObserver = {
  closed: true,
  next(value: any): void {
    /* noop */
  },
  error(err: any): void {
    console.error(err);
  },
  complete(): void {
    /*noop*/
  }
};

function toSubscriber(observerOrNext, error, complete) {
  if (observerOrNext) {
    if (observerOrNext instanceof Subscriber) {
      return observerOrNext;
    }
  }
  return new Subscriber(nextOrObserver, error, complete);
}
