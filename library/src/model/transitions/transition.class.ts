import {Sensor} from "../bricks";
import {Signal} from "../util";
import {State} from "../states/state.class";

/**
 * A transition between two states.
 */
export class Transition {

    private readonly _nextState: State;

    /**
     * @param {State} nextState: state to change to when the transition is triggered
     */
    constructor(nextState: State) {
        this._nextState = nextState;
    }


    get nextState(): State {
        return this._nextState;
    }
}
