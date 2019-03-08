const dispatch = require("./dispatch");
const invoker = require("../invoker");

describe("str", () => {
  const str = dispatch(
    invoker("toString", Array.prototype.toString),
    invoker("toString", String.prototype.toString)
  );
  it("should return 'a'", () => {
    expect(str("a")).toEqual("a");
  });

  it("should return '0,1,2,3,4,5'", () => {
    expect(str([0, 1, 2, 3, 4, 5])).toEqual("0,1,2,3,4,5");
  });
});

const stringReverse = s => {
  if (typeof s === "string") {
    return s
      .split("")
      .reverse()
      .join("");
  } else {
    return undefined;
  }
};
describe("rev", () => {
  const rev = dispatch(
    invoker("reverse", Array.prototype.reverse),
    stringReverse
  );
  it("should return [3,2,1]", () => {
    expect(rev([1, 2, 3])).toEqual([3, 2, 1]);
  });
});

function isa(type, action) {
  return obj => {
    if (type === obj.type) {
      return action(obj);
    }
  };
}

describe("performCommand", () => {
  const performCommand = dispatch(
    isa("notify", obj => "notify"),
    isa("join", obj => "join"),
    obj => "default"
  );

  it("should return notify", () => {
    const obj = { type: "notify" };
    expect(performCommand(obj)).toEqual("notify");
  });

  it("should return 'default' as fallback", () => {
    expect(performCommand({ type: "xx" })).toEqual("default");
  });

  const performAdminCommand = dispatch(
    isa("kill", obj => `kill ${obj.hostname}`)
  );

  it("should return 'kill 8000'", () => {
    expect(performAdminCommand({ type: "kill", hostname: 8000 })).toEqual(
      `kill 8000`
    );
  });
});
