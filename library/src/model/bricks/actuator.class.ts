import { Brick } from "./brick.class";

export abstract class Actuator extends Brick {
  protected readonly _pin: number;
  protected readonly _name: string;

  protected constructor(name: string, pin: number) {
    super(name, pin);
  }

  setup(): string {
    return `\tpinMode(${this._name}, OUTPUT);`;
  }
}
