export abstract class State {
  constructor(protected player: Player) {}
  public abstract clickLock(): void;
  public abstract clickPlay(): void;
  public abstract clickNext(): void;
  public abstract clickPrevious(): void;
}

export class Player {
  private state!: State;
  private playing = false;
  private playList: string[] = [];
  private index: number = 0;

  constructor(soundTracks: string[]) {
    this.changeState(new ReadyState(this));
    this.playList = soundTracks;
  }

  public changeState(state: State): void {
    this.state = state;
  }

  public clickLock(): void {
    this.state.clickLock();
  }

  public clickPlay(): void {
    this.state.clickPlay();
  }

  public clickNext(): void {
    this.state.clickNext();
  }

  public clickPrevious(): void {
    this.state.clickPrevious();
  }
  public setPlaying(playing: boolean): void {
    this.playing = playing;
  }
  public getPlaying(): boolean {
    return this.playing;
  }
  public startPlayBack(): void {
    console.log(`Playing ${this.playList[this.index]}`);
  }
  public previousTrack(): void {
    this.index = this.index === 0 ? 0 : --this.index;
  }

  public nextTrack(): void {
    this.index =
      this.index < this.playList.length
        ? this.index + 1
        : this.playList.length - 1;
  }

  public getState(): State {
    return this.state;
  }
}

export class LockedState extends State {
  constructor(player: Player) {
    super(player);
  }
  public clickLock(): void {
    if (this.player.getPlaying()) {
      this.player.changeState(new ReadyState(this.player));
      console.log("Stop playing");
    } else {
      console.log("Locked...");
    }
  }
  public clickPlay(): void {
    this.player.changeState(new PlayingState(this.player));
    console.log("Ready");
  }
  public clickNext(): void {
    console.log("Locked...");
  }
  public clickPrevious(): void {
    console.log("Locked...");
  }
}

export class ReadyState extends State {
  constructor(player: Player) {
    super(player);
  }

  public clickLock(): void {
    this.player.changeState(new LockedState(this.player));
    console.log("Locked...");
  }
  public clickPlay(): void {
    this.player.startPlayBack();
    this.player.changeState(new PlayingState(this.player));
  }
  public clickNext(): void {
    this.player.nextTrack();
  }
  public clickPrevious(): void {
    this.player.previousTrack();
  }
}

export class PlayingState extends State {
  constructor(player: Player) {
    super(player);
  }

  public clickLock(): void {
    this.player.changeState(new LockedState(this.player));
    console.log("Stop playing");
  }
  public clickPlay(): void {
    this.player.changeState(new ReadyState(this.player));
    console.log("Paused...");
  }
  public clickNext(): void {
    this.player.nextTrack();
    this.player.startPlayBack();
  }
  public clickPrevious(): void {
    this.player.previousTrack();
    this.player.startPlayBack();
  }
}
