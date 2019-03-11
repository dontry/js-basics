const _ = require("lodash");
const actions = require("./actions");
const lift = require("./lift");
const construct = require("../construct");

const mSqr = () => state => {
  const ans = state * state;
  return { answer: ans, state: ans };
};

const mNote = () => state => {
  console.log(state);
  return { answer: undefined, state: state };
};

const mNeg = () => state => ({ answer: -state, state: -state });

describe("actions", () => {
  describe("doubleSquareAction", () => {
    const doubleSquareAction = actions([mSqr(), mSqr()], values => values);
    it("should return [100, 10000]", () => {
      expect(doubleSquareAction(10)).toEqual([100, 10000]);
    });
  });

  describe("negativeSquareAction", () => {
    const negativeSqrAction = actions(
      [mSqr(), mNote(), mNeg()],
      values => values
    );

    it("should return [100, -10000]", () => {
      expect(negativeSqrAction(9)).toEqual([81, -81]);
    });
  });

  describe("lift", () => {
    const mSqr2 = lift(n => n * n);
    const mNote2 = lift(state => console.log(state), _.identity);
    const mNeg2 = lift(n => -n);

    it("should return -81", () => {
      const negativeAction2 = actions([mSqr2(), mNote2(), mNeg2()], function(
        values,
        state
      ) {
        return state;
      });
      expect(negativeAction2(9)).toEqual(-81);
    });
  });

  describe("stackAction", () => {
    const push = lift((stack, e) => construct(e, stack));
    const pop = lift(_.first, _.tail);
    const stackAction = actions([push(1), push(2), pop()], (values, state) => ({
      values,
      state
    }));

    it("should return values: [[1], [2,1], 2], state: [1]", () => {
      const res = stackAction([]);
      expect(res.values).toEqual([[1], [2, 1], 2]);
      expect(res.state).toEqual([1]);
    });
  });
});
