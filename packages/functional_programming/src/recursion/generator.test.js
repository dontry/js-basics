const { generator, genHead, genTail } = require("./generator");
const trampoline = require("./trampoline");
const { partial } = require("../composer/partial");
const cat = require("../cat");

const ints = generator(0, x => x, x => x + 1);

// a big defect of generator is the tail is not executed before access
// which means every access requires a recomputation
// we should use heap more often than stack, because heap size is far larger than stack size
describe("genTake", () => {
  const genTake = (n, gen) => {
    const doTake = (x, g, ret) => {
      if (x === 0) return ret;
      else return partial(doTake, x - 1, genTail(g), cat(ret, genHead(g)));
    };
    return trampoline(doTake, n, gen, []);
  };
  it("should return [0,1,2,3]", () => {
    const res = genTake(4, ints);
    expect(res).toEqual([0, 1, 2, 3]);
  });
});
