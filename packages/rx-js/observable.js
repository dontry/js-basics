const Rx = require("rxjs");
const { map, filter } = require("rxjs/operators");

function subscribe(observer) {
  observer.next("Jerry");
  observer.next("Anna");
  observer.complete("ggg");
}

subscribe({
  next: function(value) {
    console.log(value);
  },
  error: function(error) {
    console.log(error);
  },
  complete: function() {
    console.log("complete");
  }
});

var source = Rx.of(1, 2, 3, 4);
var newest = source.pipe(
  filter(g => g % 2 == 0),
  map(v => "Hello " + v)
);

newest.subscribe(console.log);
