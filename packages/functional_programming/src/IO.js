const _ = require("lodash/fp");
const IO = function(f) {
  this._value = f;
};

IO.of = function(x) {
  return new IO(function() {
    return x;
  });
};

const compose = (f, g) => x => f(g(x));

IO.prototype.map = function(f) {
  return new IO(
    compose(
      f,
      this._value
    )
  );
};

const io_window = new IO(function() {
  const window = { innerWidth: 100 };
  return window;
});

const x = io_window.map(win => win.innerWidth);
const y = x._value();
y;
