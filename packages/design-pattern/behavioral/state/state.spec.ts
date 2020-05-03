import { Player } from "./state";

describe("State", () => {
  const soundTracks = ["A", "B", "C", "D"];
  let player: Player;
  beforeEach(() => {
    jest.spyOn(global.console, "log");
    player = new Player(soundTracks);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("player default state", () => {
    expect(player.getState().constructor.name).toBe("ReadyState");
  });
  test("ready.clickPlay()", () => {
    jest.spyOn(player, "startPlayBack");
    player.clickPlay();
    expect(player.getState().constructor.name).toBe("PlayingState");
    expect(player.startPlayBack).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith("Playing A");
  });

  test("ready.clickLock()", () => {
    player.clickLock();
    expect(player.getState().constructor.name).toBe("LockedState");
    expect(console.log).lastCalledWith("Locked...");
  });

  test("ready.clickNext()", () => {
    const prevIndex = player["index"];
    player.clickNext();
    expect(player["index"]).toBe(prevIndex + 1);
  });

  test("ready.clickPrevious()", () => {
    player["index"] = 3;
    player.clickPrevious();
    expect(player["index"]).toBe(2);
  });
});
