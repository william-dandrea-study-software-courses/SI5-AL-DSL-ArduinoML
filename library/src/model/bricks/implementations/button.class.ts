import { Sensor } from "../sensor.class";

export class Button extends Sensor {
  constructor(name: string, pin: number) {
    super(name, pin);
  }
}
