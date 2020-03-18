interface Device {
  setVolume(volume: number): void;
  getVolume(): number;
  setChannel(channel: string): void;
  getChannel(): string;
  getIsEnabled(): boolean;
  switch(isEnabled: boolean): void;
}
