interface IRemoteControl {
  togglePower(): void;
  volumeDown(): void;
  volumeUp(): void;
  changeChannel(channel: string): void;
}

export class RemoteControl implements IRemoteControl {
  constructor(protected device: Device) {}

  public togglePower(): void {
    if (this.device.getIsEnabled()) {
      this.device.switch(false);
    } else {
      this.device.switch(true);
    }
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 1);
  }
  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 1);
  }
  changeChannel(channel: string): void {
    this.device.setChannel(channel);
  }
}
