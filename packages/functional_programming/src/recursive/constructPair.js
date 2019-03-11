const _ = require("lodash");
const construct = require("../construct");
const nth = require("../nth");

const second = data => nth(data, 1);

/**
 * [c,3] = [[], []]
 * [b,2] = [[c], [3]]
 * [a,1] = [[b,c],[2,3]]
 * [[a,b,c], [1,2,3]]
 *
 * @param {*} pair
 * @param {*} rests
 * @returns
 */
function constructPair(pair, rests) {
  return [
    construct(_.first(pair), _.first(rests)),
    construct(second(pair), second(rests))
  ];
}

module.exports = constructPair;
