import { Statement } from "./statement.class";
import {StateModel} from "../../states/state.class";

export class SwitchStateStatement extends Statement {
  protected readonly _nextState;

  constructor(nextState: StateModel) {
    super();
    this._nextState = nextState;
  }

  public export(): string {
    return `${this._nextState.name}();`;
  }
}
