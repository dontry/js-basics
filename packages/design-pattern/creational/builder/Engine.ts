export class Engine {
  constructor(
    private readonly volume: number,
    private mileage: number,
    private started: boolean
  ) {}

  public on(): void {
    this.started = true;
  }

  public off(): void {
    this.started = false;
  }

  public isStarted(): boolean {
    return this.started;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getMileage(): number {
    return this.mileage;
  }
}
