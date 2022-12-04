import {NamedElement} from "./NamedElement";
import {SIGNAL} from "./SIGNAL";


/**
 * A state in the application.
 */
export class State extends NamedElement {

    /**
     * @param {string} name
     * @param {Action[]} actions
     * @param {Transition} transition
     */
    constructor(name, actions, transition) {
        super(name);

        this._actions = actions;
        this._transition = transition;
    }


    /**
     * Sets the transition of the state
     * @param {Transition} transition
     */
    set transition(transition) {
        this._transition = transition;
    }


    /**
     * Arduino code for the state.
     * @return {String}
     */
    setup = () => {
        let result = "";
        result += (`void state_${this._name}() {` + `\n`);
        // result += (`` + `\n`);

        // generate code for state actions
        this._actions.forEach(action => {
            result += (`\tdigitalWrite(${action.brick.name}, ${action.value.value});` + `\n`);
            result += (`\tboolean guard =  millis() - time > debounce;` + `\n`);
        })

        // generate code for the transition
        result += (`\tif (digitalRead(${this._transition.sensor.name}) == ${this._transition.value.value} && guard) {` + `\n`);
        result += (`\t\ttime = millis(); state_${this._transition.nextState.name}();` + `\n`);
        result += (`\t} else {` + `\n`);
        result += (`\t\tstate_${this._name}();` + `\n`);
        result += (`\t}` + `\n`);

        // End of state
        result += (`\n}` + `\n`);

        return result;
    }
}
