const assert = require("assert");
const thumbWar = require("./thumb-war.js");
const utils = require("./utils.js");

const originalGetWinner = utils.getWinner;
// eslint-disable-next-line no-unused-vars
utils.getWinner = (p1, p2) => p1;
const winner = thumbWar("Github", "Atlassian");
assert.strictEqual(winner, "Github");
utils.getWinner = originalGetWinner;
