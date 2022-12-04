import {Sensor} from "./bricks";
import {Signal} from "./util";
import {State} from "./state.class";

/**
 * A transition between two states.
 */
export class Transition {

    private readonly _sensor: Sensor;
    private readonly _value: Signal;
    private readonly _nextState: State;

    /**
     * @param {Sensor} sensor: sensor which value is checked to trigger the transition
     * @param {Signal} value: value that the sensor must have to trigger the transition
     * @param {State} nextState: state to change to when the transition is triggered
     */
    constructor(sensor: Sensor, value: Signal, nextState: State) {
        this._sensor = sensor;
        this._value = value;
        this._nextState = nextState;
    }


    get sensor(): Sensor {
        return this._sensor;
    }

    get value(): Signal {
        return this._value;
    }

    get nextState(): State {
        return this._nextState;
    }
}
