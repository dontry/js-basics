import { RadioMode, Radio } from "./Radio";
import { RemoteControl } from "./RemoteControl";

export class RadioRemoteControl extends RemoteControl {
  public switchMode(mode: RadioMode): void {
    (this.device as Radio).setMode(mode);
  }
}
