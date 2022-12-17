import { Sensor } from "../sensor.class";

export class ButtonSensor extends Sensor {
  constructor(name: string, pin: number) {
    super(name, pin);
  }
}
