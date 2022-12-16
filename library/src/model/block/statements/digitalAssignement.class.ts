import { Statement } from "./statement.class";
import { Actuator } from "../../bricks";
import { SIGNAL } from "../../utils/signal.enum";

export class DigitalAssignement extends Statement {
  protected readonly _output: Actuator;
  protected readonly _value: SIGNAL;

  protected constructor(output: Actuator, value: SIGNAL) {
    super();
    this._output = output;
    this._value = value;
  }

  public export(): string {
    return `\tDigitalWrite(${this._output.name}, ${this._value})`;
  }
}
