import {NamedElement} from "./util";
import {Action} from "./action.class";
import {Transition} from "./transition.class";


/**
 * A state in the application.
 */
export class State extends NamedElement {

    private readonly _actions: Action[];
    private _transition: Transition = null;


    /**
     * @param {string} name
     * @param {Action[]} actions
     */
    constructor(name: string, actions: Action[]) {
        super(name);
        this._actions = actions;
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
        this._actions.forEach(action => {
            result += (`\tdigitalWrite(${action.brick.name}, ${action.value});` + `\n`);
            result += (`\tboolean guard =  millis() - time > debounce;` + `\n`);
        })

        // generate code for the transition
        result += (`\tif (digitalRead(${this._transition.sensor.name}) == ${this._transition.value} && guard) {` + `\n`);
        result += (`\t\ttime = millis(); state_${this._transition.nextState.name}();` + `\n`);
        result += (`\t} else {` + `\n`);
        result += (`\t\tstate_${this._name}();` + `\n`);
        result += (`\t}` + `\n`);

        // End of state
        result += (`\n}` + `\n`);

        return result;
    }



    set transition(value: Transition) {
        this._transition = value;
    }
}
