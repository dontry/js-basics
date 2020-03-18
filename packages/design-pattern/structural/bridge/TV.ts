export class TV implements Device {
  private volume: number;
  private channel: string;
  private isEnabled: boolean;

  constructor() {
    this.volume = 0;
    this.channel = "";
    this.isEnabled = false;
  }

  public setVolume(volume: number): void {
    if (volume >= 0) {
      this.volume = volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setChannel(channel: string): void {
    this.channel = channel;
  }

  public getChannel(): string {
    return this.channel;
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public switch(isEnabled: boolean): void {
    this.isEnabled = isEnabled;
  }
}
