const compose = (f, g) => x => f(g(x));

const toUpperCase = x => x.toUpperCase();
const exclaim = x => x + "!";

const result = toUpperCase(exclaim("hello world!"));
result;

const head = function(x) {
  return x[0];
};

const reverse = array =>
  array.reduce(function(acc, x) {
    return [x].concat(acc);
  }, []);

const last = compose(
  head,
  reverse
);

const res = last(["jumpkick", "roundhouse", "uppercut"]);
res;

const compose2 = (...funcs) => x => {
  return funcs.reduce((acc, f) => f(acc), x);
};

const func = compose2(toUpperCase, exclaim);
const xx = func("Happy hour");
xx;
