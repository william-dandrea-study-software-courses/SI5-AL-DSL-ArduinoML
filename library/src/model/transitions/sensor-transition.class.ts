import {Sensor, Signal, State, Transition} from "../index";


export class SensorTransition extends Transition {
    private readonly _sensor: Sensor;
    private readonly _value: Signal;

    /**
     * @param {Sensor} sensor: sensor which value is checked to trigger the transition
     * @param {Signal} value: value that the sensor must have to trigger the transition
     * @param {State} nextState: state to change to when the transition is triggered
     */
    constructor(sensor: Sensor, value: Signal, nextState: State) {
        super(nextState);
        this._sensor = sensor;
        this._value = value;
    }


    get sensor(): Sensor {
        return this._sensor;
    }

    get value(): Signal {
        return this._value;
    }
}
