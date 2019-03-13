const _ = require("lodash");
const lazyChain = require("./lazyChain");
const { validator } = require("../high_order_functions/validator");
const pipeline = require("../flow-based/pipeline");
const { partial1 } = require("../composer/partial");
const precondition = require("../composer/precondition");
const invoker = require("../high_order_functions/invoker");

describe("lazyOp", () => {
  it("should return [0,1,2,3,7,7,8,9]", () => {
    const lazyOp = lazyChain([2, 1, 3])
      .invoke("concat", [7, 7, 8, 9, 0])
      .invoke("sort");

    expect(lazyOp.force()).toEqual([0, 1, 2, 3, 7, 7, 8, 9]);
  });
});

function deferredSort(arr) {
  return lazyChain(arr).invoke("sort");
}

function force(thunk) {
  return thunk.force();
}

const validateTriples = validator(
  "Each array should have three elements",
  arrays => {
    return arrays.every(a => a.length === 3);
  }
);

const validateTripleStore = partial1(precondition(validateTriples), _.identity);

const postProcess = data => data.map(d => d[1]);

const processTriples = data =>
  pipeline(
    data,
    JSON.parse,
    validateTripleStore,
    deferredSort,
    force,
    postProcess,
    invoker("sort", Array.prototype.sort)
  );

describe("processTriples", () => {
  it("should  return", () => {
    const res = processTriples("[[2,1,3],[7,7,1],[0,9,5]]");
    expect(res).toEqual([1, 7, 9]);
  });
});
