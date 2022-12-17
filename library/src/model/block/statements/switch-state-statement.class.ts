import { Statement } from "./statement.class";
import {State} from "../../states/state.class";

export class SwitchStateStatement extends Statement {
  protected readonly _nextState;

  protected constructor(nextState: State) {
    super();
    this._nextState = nextState;
  }

  public export(): string {
    return `\t\t${this._nextState.name}();`;
  }
}
