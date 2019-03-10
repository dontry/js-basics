const repeat = require("../high_order_functions/repeat");
const { partial1 } = require("../composer/partial");
const possible =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateRandomCharacter() {
  return possible.charAt(Math.floor(Math.random() * possible.length));
}

function generateString(charGen, len) {
  return repeat(len, charGen).join("");
}

const composeRandomString = partial1(generateString, generateRandomCharacter);

module.exports = {
  generateRandomCharacter,
  composeRandomString,
  generateString
};
