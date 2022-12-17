import { OPERATOR } from "../../utils/operator.enum";
import { SIGNAL } from "../../utils/signal.enum";
import { Condition } from "./condition.class";
import {Sensor} from "../../bricks/sensor.class";

export class DigitalAtomicCondition extends Condition {
  protected readonly _input: Sensor;
  protected readonly _operator: OPERATOR;
  protected readonly _value: SIGNAL;

  constructor(input: Sensor, operator: OPERATOR, value: SIGNAL) {
    super();
    this._input = input;
    this._operator = operator;
    this._value = value;
  }

  public isComposite(): boolean {
    return false;
  }

  public export(): string {
    return this.exportAll((this.exportCondition()));
  }

  public exportCondition(): string {
    return `digitalRead(${this._input.name}) ${this._operator} ${this._value}`
  }

  /*
  public export(): string {
    let result: string = '';
    result += `if (digitalRead(${this._input.name}) ${this._operator} ${this._value}) {` + `\n`;

    // result += `` + `\n`;
    this.children.forEach(child => {
      result += `\t${child.export()}` + `\n`;
    })
    result += `}` + `\n`;

    return result;
  } */
}
