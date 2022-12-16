import { Actuator } from "../actuator.class";

export class Buzzer extends Actuator {
  private readonly _frequency: number;
  private readonly _duration: number | null;

  constructor(
    name: string,
    pin: number,
    frequency: number,
    duration: number | null
  ) {
    super(name, pin);
    this._frequency = frequency;
    this._duration = duration;
  }
}
