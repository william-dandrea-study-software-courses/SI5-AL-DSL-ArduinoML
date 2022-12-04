/**
 * A transition between two states.
 */
export class Transition {

    /**
     * @param {Sensor} sensor: sensor which value is checked to trigger the transition
     * @param {SIGNAL} value: value that the sensor must have to trigger the transition
     * @param {State} nextState: state to change to when the transition is triggered
     */
    constructor(sensor, value, nextState) {
        this._sensor = sensor;
        this._value = value;
        this._nextState = nextState;
    }


    get sensor() {
        return this._sensor;
    }

    get value() {
        return this._value;
    }

    get nextState() {
        return this._nextState;
    }
}
