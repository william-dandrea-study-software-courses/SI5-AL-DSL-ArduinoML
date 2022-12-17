import { Statement } from "./statement.class";

export class DelayStatement extends Statement {
  private readonly _delayInMs: number;

  constructor(delayInMs: number) {
    super();
    this._delayInMs = delayInMs;
  }

  export(): string {
    return `delay(${this._delayInMs});`;
  }
}
