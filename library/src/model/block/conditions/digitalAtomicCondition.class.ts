import { Sensor } from "../../bricks";
import { OPERATOR } from "../../utils/operator.enum";
import { SIGNAL } from "../../utils/signal.enum";
import { Condition } from "./condition.class";

export class DigitalAtomicCondition extends Condition {
  protected readonly _input: Sensor;
  protected readonly _operator: OPERATOR;
  protected readonly _value: SIGNAL;

  protected constructor(input: Sensor, operator: OPERATOR, value: SIGNAL) {
    super();
    this._input = input;
    this._operator = operator;
    this._value = value;
  }

  public isComposite(): boolean {
    return false;
  }

  public export(): string {
    return `DigitalRead(${this._input.name}) ${this._operator} ${this._value}`;
  }
}
