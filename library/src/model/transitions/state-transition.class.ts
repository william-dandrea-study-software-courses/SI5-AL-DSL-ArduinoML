import {Brick, Sensor} from "../bricks";
import {Signal} from "../util";
import {State} from "../states/state.class";
import {Transition} from "./transition.class";

/**
 * A transition between 2 states
 */
export class StateTransition extends Transition {
    private readonly _currentState: State;

    /**
     * @param {State} currentState: current state
     * @param {State} nextState: state to change to when the transition is triggered
     */
    constructor(currentState: State, nextState: State) {
        super(nextState);
        this._currentState = currentState;
    }

    get currentState(): State {
        return this._currentState;
    }
}
