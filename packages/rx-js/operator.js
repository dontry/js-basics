const Rx = require("rxjs");

function map(callback) {
  return Rx.Observable.create(observer => {
    return this.subscribe(
      next,
      err => {
        observer.error(err);
      },
      () => {
        observer.complete();
      }
    );
  });
}
Rx.Observable.prototype.map = map;
var people = Rx.of("Jerry", "Anna");
var helloPeople = people.map(item => item + " Hello~");

helloPeople.subscribe(log);

function next(observer) {
  try {
    observer.next(callback(value));
  } catch (e) {
    observer.error(e);
  }
}

function log(x) {
  console.log(x);
}

log.prototype.toString = "log";

next.prototype.toString = "next";
