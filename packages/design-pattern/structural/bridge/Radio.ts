export type RadioMode = "AM" | "FM";

export class Radio implements Device {
  private volume: number;
  private channel: string;
  private isEnabled: boolean;
  private mode: RadioMode;

  constructor() {
    this.volume = 0;
    this.channel = "";
    this.isEnabled = false;
    this.mode = "AM";
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

  public setMode(mode: RadioMode): void {
    this.mode = mode;
  }

  public getChannel(): string {
    return this.channel;
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public getMode() {
    return this.mode;
  }

  public switch(isEnabled: boolean): void {
    this.isEnabled = isEnabled;
  }
}
