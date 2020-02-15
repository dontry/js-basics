const { sum, subtract } = require("../math");

test("sum adds numbers ", () => {
  const result = sum(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});

test("subtract minus numbers ", () => {
  const result = subtract(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});

async function test(assertion, callback) {
  try {
    await callback();
    console.log(`✔ ${assertion} - PASSED`);
  } catch (e) {
    console.error(`❌ ${assertion} - FAILED\n`);
    console.error(e);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equalt to ${expected}`);
      }
    }
  };
}
