import { getFlyingSuperHeros } from "../super-heros";

test("returns super heros that can fly", () => {
  const flyingHeros = getFlyingSuperHeros();
  console.log(flyingHeros);
  expect(flyingHeros).toMatchSnapshot();
});
