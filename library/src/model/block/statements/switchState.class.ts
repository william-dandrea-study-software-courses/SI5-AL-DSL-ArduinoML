import { State } from "../../states";
import { Statement } from "./statement.class";

export class SwitchState extends Statement {
  protected readonly _nextState;

  protected constructor(nextState: State) {
    super();
    this._nextState = nextState;
  }

  public export(): string {
    return `\t\t${this._nextState.name}();`;
  }
}
