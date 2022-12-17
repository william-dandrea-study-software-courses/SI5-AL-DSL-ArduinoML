import { Actuator } from "../actuator.class";

export class LedActuator extends Actuator {
  constructor(name: string, pin: number) {
    super(name, pin);
  }
}
