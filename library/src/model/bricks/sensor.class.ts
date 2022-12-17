import { Brick } from "./brick.class";

export abstract class Sensor extends Brick {
  protected readonly _pin: number;
  protected readonly _name: string;

  protected constructor(name: string, pin: number) {
    super(name, pin);
  }

  setup(): string {
    return `pinMode(${this._name}, INPUT);`;
  }
}
