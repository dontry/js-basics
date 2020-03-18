import { Radio } from "./Radio";
import { TV } from "./TV";
import { RadioRemoteControl } from "./RadioRemoteControl";
import { TVRemoteControl } from "./TVRemoteControl";

describe("bridge", () => {
  describe("Radio with remote control", () => {
    it("should volume up", () => {
      const radio = new Radio();
      const radioRemoteControl = new RadioRemoteControl(radio);
      const prevVolume = radio.getVolume();
      radioRemoteControl.volumeUp();
      expect(radio.getVolume()).toBe(prevVolume + 1);
    });

    it("should volume down", () => {
      const radio = new Radio();
      radio.setVolume(10);
      const radioRemoteControl = new RadioRemoteControl(radio);
      const prevVolume = radio.getVolume();
      radioRemoteControl.volumeDown();
      expect(radio.getVolume()).toBe(prevVolume - 1);
    });

    it("should remain volume 0 when volume down", () => {
      const radio = new Radio();
      radio.setVolume(0);
      const radioRemoteControl = new RadioRemoteControl(radio);
      radioRemoteControl.volumeDown();
      expect(radio.getVolume()).toBe(0);
      radio.setVolume(10);
    });

    it("should set to FM mode ", () => {});
  });

  describe("TV with advanced remote control", () => {
    it("should volume up", () => {
      const tv = new TV();
      const tvRemoteControl = new TVRemoteControl(tv);
      const prevVolume = tv.getVolume();
      tvRemoteControl.volumeUp();
      expect(tv.getVolume()).toBe(prevVolume + 1);
    });

    it("should volume down", () => {
      const tv = new TV();
      tv.setVolume(10);
      const tvRemoteControl = new TVRemoteControl(tv);
      const prevVolume = tv.getVolume();
      tvRemoteControl.volumeDown();
      expect(tv.getVolume()).toBe(prevVolume - 1);
    });

    it("should mute the tv", () => {
      const tv = new TV();
      tv.setVolume(10);
      const tvRemoteControl = new TVRemoteControl(tv);
      tvRemoteControl.mute();
      expect(tv.getVolume()).toBe(0);
    });
  });
});
