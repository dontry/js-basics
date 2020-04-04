import { SquarePeg, RoundHole, SquarePegAdapter } from "./adapter";

describe("Adapter", () => {
  test(" square peg with the width of 5  should fit the round hole with a radius of 5 with an adapter", () => {
    const square = new SquarePeg(5);
    const roundHole = new RoundHole(6);
    const roundPeg = new SquarePegAdapter(square);

    expect(roundHole.fits(roundPeg)).toBeTruthy();
  });
});
