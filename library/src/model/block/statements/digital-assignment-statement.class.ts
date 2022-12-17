import { Statement } from "./statement.class";
import { SIGNAL } from "../../utils/signal.enum";
import {Actuator} from "../../bricks/actuator.class";

export class DigitalAssignmentStatement extends Statement {
  protected readonly _output: Actuator;
  protected readonly _value: SIGNAL;

  constructor(output: Actuator, value: SIGNAL) {
    super();
    this._output = output;
    this._value = value;
  }

  public export(): string {
    return `digitalWrite(${this._output.name}, ${this._value});`;
  }
}
