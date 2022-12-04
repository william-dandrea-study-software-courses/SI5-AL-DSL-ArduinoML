import {SignalAction} from "../actions/signal-action.class";
import {State} from "./state.class";
import {SensorTransition} from "../transitions/sensor-transition.class";


export class SignalState extends State {

    private readonly _signalActions: SignalAction[];

    /**
     * @param {string} name
     * @param {SignalAction[]} actions
     */
    constructor(name: string, actions: SignalAction[]) {
        super(name, actions);
        this._signalActions = actions;
    }


    /**
     * Arduino code for the state.
     * @return {String}
     */
    public setup(): string {
        let result = "";
        result += (`void state_${this._name}() {` + `\n`);
        // result += (`` + `\n`);

        // generate code for state actions
        this._signalActions.forEach(action => {
            result += (`\tdigitalWrite(${action.brick.name}, ${action.value});` + `\n`);
            result += (`\tboolean guard =  millis() - time > debounce;` + `\n`);
        })

        // generate code for the transition

        if (this._transition instanceof SensorTransition) {
            result += (`\tif (digitalRead(${this._transition.sensor.name}) == ${this._transition.value} && guard) {` + `\n`);
            result += (`\t\ttime = millis(); state_${this._transition.nextState.name}();` + `\n`);
            result += (`\t} else {` + `\n`);
            result += (`\t\tstate_${this._name}();` + `\n`);
            result += (`\t}` + `\n`);
        }

        // End of state
        result += (`\n}` + `\n`);

        return result;
    }
}
