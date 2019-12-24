# RxJS

---

## Observable

An Observable can be created in this way.

```js
var Observable = Rx.Observable.create(observer => {
  observer.next(2);
  observer.complete();
  return () => console.log("disposed");
});
```

### Rx.of

It returns an Observable created with a `subscribe` method.

```js
export function fromArray<T>(input: ArrayLike<T> ) {
    return new Observable(<T> subscribeToArray(input));
}
```

`subscribeToArray` passes the arguments from `Rx.of(args)` and iterates it with a subscriber. It returns the `subscribe` function. The `subscriber` later will be fired with the array elements.

A `subscribe` function should have `subscriber.next()` and `subscriber.complete()` methods.

```js
export const subscribeToArray = <T>(array: ArrayLike<T>) => (
  subscriber: Subscriber<T>
) => {
  for (let i = 0, len = array.length; i < len && !subscriber.closed; i++) {
    subscriber.next(array[i]);
  }
  subscriber.complete();
};
```

## Observable

### Observable constructor

```js
// subscribe is the function that is called when the Observable is initially subscribed to.
constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic) {
  if (subscribe) {
    this._subscribe = subscribe;
  }
```

### Observable.subscribe

A simple version of `Observable.subscribe`

```js
subscribe(observerOrNext?: PartialObserver<T> | ((value: T) => void),
            error?: (error: any) => void,
            complete?: () => void): Subscription {

  /*
    If the Observable uses pipe to chain the operator functors, the operator will call
    the observable's lift method. The lift method will assign the operator to observable's  operator. Then the operator can be accessed by the observable.
  */
    const { operator } = this;

    /*
      Sink is also a subscriber. It is the last subscriber to subscribe the observable.
      The sink can call the unsubscribe method in the end.
    */
    const sink = toSubscriber(observerOrNext, error, complete);

    if (operator) {
      sink.add(operator.call(sink, this.source));
    } else {
      sink.add(
        this.source || (config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
        // The observable  the subscribe method assigned by function like subscribeToArray()
        // or it will calls the subscribe function recursively
        this._subscribe(sink) :
        this._trySubscribe(sink)
      );
    }

    return sink;
  }
```

### Observable.lift

`lift` method is used for wrap the current Observable source with a new Observable source so that the subscribers will be called recursively. It also returns an Observable.

```js
  lift<R>(operator: Operator<T, R>): Observable<R> {
    const observable = new Observable<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }
```

## Observable.pipe

`pipe` method is actually a reducer for operators to consume observables. The return type is Observable

```js
pipe(...operations: OperatorFunction<any, any>[]): Observable<any> {
  if (operations.length === 0) {
    return this as any;
  }

  return pipeFromArray(operations)(this);
}
```

```js
pipeFromArray<T, R>(fns: Array<UnaryFunction<T, R>>): UnaryFunction<T, R> {
  if (!fns) {
    return noop as UnaryFunction<any, any>;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input: T): R {
    return fns.reduce((prev: any, fn: UnaryFunction<T, R>) => fn(prev), input as any);
  };
}
```

## Operator

A typical Operator file consists of three parts: the function, the operator class, and the subscriber class

### Operator function

Operator function always calls the `source.lift(new Operator(value))` function.

```js
export function operatorFunction<T, R>(args): OperatorFunction<T, R> {
  return (source: Observable<T>) => source.lift(new Operator(args));
}
```

### Operator class

The `Operator` constructor passes in the target function. The `Operator` class has a method `call(subscriber, source)`. The method `call(subscriber, source)`actually implements `source.subscribe(subscriber)`

```js
  call(subscriber: Subscriber<R>, source: any): any {
    return source.subscribe(new OperatorSubscriber(subscriber, ...rest));
  }
```

### Operator subscriber

The operator subscriber makes it possible to call the subscribers recursively. The passed in subscriber will be destination of the operator subscriber. It is a subclass of `Subscriber`. It has a protected method `_next()`. `_mext()` calls the operator target function and then calls the `destination.next()`

```js
  _next(value: T) {
    let result: any;
    try {
      result = this.targetFunction.call(this.thisArg, value, this.count++);
    } catch (err) {
      this.destination.error(err);
      return;
    }
    this.destination.next(result);
  }

```

## Subscriber

`Subscriber` extends `Subscription` class and implements `Observer` interface. It is an iterator-like object.
`Observer` interface has three methods and a status:

- closed;
- next();
- error();
- complete();

### Subscriber constructor

Setting `destination` to a `SafeSubscriber`. The `SafeSubscriber` constructor assigns `next`, `error` and `complete` method.

### Subscriber.next

The `Observer` callback to receive notifications of type `next` from the Observable with the `next` value.

```js
  next(value?: T): void {
    if (!this.isStopped && this.destination.next) {
      const { _parentSubscriber } = this;
      if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
        this.__tryOrUnsub(this.destination.next, value);
      } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
        this.unsubscribe();
      }
    }
  }
```

### Subscriber.\_\_tryOrUnsub

It calls the function passed in

```js
  private __tryOrUnsub(fn: Function, value?: any): void {
    try {
      fn.call(this._context, value);
    } catch (err) {
      this.unsubscribe();
      if (config.useDeprecatedSynchronousErrorHandling) {
        throw err;
      } else {
        hostReportError(err);
      }
    }
  }
```

## Subscription

Represents a disposable resource, such as the execution of an Observable.
Subscription has one important method, `unsubscribe`, that takes no argument
and just disposes the resource held by the subscription.

### Subscription.unsubscribe

Disposes the resources held by the subscription.

### Subscription.add

The `add()` method attach a child Subscription to the current Subscription.
When a Subscription is unsubscribed, all its children (and its grandchildren)
will be unsubscribed as well.

# A walk-through of Rxjs operation

```js
var source = Rx.of(1, 2, 3, 4);
var newest = source.pipe(
  filter(g => g % 2 == 0),
  map(v => "Hello " + v)
);

newest.subscribe(console.log);
```

1. `Rx.of` --> `fromArray(args)` --> `new Observable(subscribeToArray(input))`

- `subscribeToArray` returns a `subscribe` function which is passed to the new `Observable` and assigned to `_subscribe`
- `subscribe` function will call `subscriber.next()` and `subscriber.complete()`

2. `source.pipe(filter, map)` --> `pipeFromArray(operations)(this)` --> `piped` --> `reduce` -->`filterOperatorFunction` --> `source.lift` -->
   --> `reduce` --> `mapOperatorFunction` --> `source.lift`

- `piped` is a reducer function.
- `source.lift` create a new Observable and passed operator as the new Observable's operator. So it creates a operator chain.

3. `newest.subscribe` --> `operator.call(sink, mapObservable.source)` --> `MapOperator.call` --> `source.subscribe(new MapSubscriber(args))` -->
   -->`operator.call(sink, this.source)` --> `FilterOperator.call` --> `source.subscribe(new FilterSubscriber(args))` --> `this._subscribe()` --> `subscribeToArray.subscribe` --> `FilterSubscriber._next` --> `this.destination.next` --> `MapSubscriber._next(value)` --> `this.destination.next(value)` --> `console.log` --> `this.complete` --> `this.unsubscribe`

- sink is the last subscriber
- pipe order: filter, map
- observable order: map, filter
- subscribe caller order: \_subscribe(), filter, map, console.log
- each element in the array will call the filter, the map operator and console.log in order.
