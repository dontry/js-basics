function visit(mapFunc, resultFunc, array) {
  if (Array.isArray(array)) return resultFunc(array.map(mapFunc));
  else return resultFunc(array);
}

const x = visit(x => x, x => !isNaN(x), 42);
x;

module.exports = visit;
