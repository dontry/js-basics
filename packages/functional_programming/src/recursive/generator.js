// we only need a calculable tail function for lazy execution
/**
 *
 *
 * @param {*} seed
 * @param {*} current current is used to calculate value for head,
 * @param {*} step step used for recursion
 * @returns
 */
function generator(seed, current, step) {
  return {
    head: current(seed),
    tail: () => {
      console.log("forced");
      return generator(step(seed), current, step);
    }
  };
}

function genHead(gen) {
  return gen.head;
}

function genTail(gen) {
  return gen.tail();
}

module.exports = { generator, genHead, genTail };
