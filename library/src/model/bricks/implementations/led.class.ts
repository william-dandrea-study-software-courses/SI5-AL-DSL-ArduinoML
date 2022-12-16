import { Actuator } from "../actuator.class";

export class Led extends Actuator {
  constructor(name: string, pin: number) {
    super(name, pin);
  }
}
