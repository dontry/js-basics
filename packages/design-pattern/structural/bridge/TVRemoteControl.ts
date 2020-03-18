import { RemoteControl } from "./RemoteControl";

export class TVRemoteControl extends RemoteControl {
  public mute() {
    this.device.setVolume(0);
  }
}
