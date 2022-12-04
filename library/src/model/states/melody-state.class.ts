import {State} from "./state.class";
import {Action} from "../actions/action.class";
import {BuzzerAction} from "../actions/buzzer-action.class";
import {DelayAction} from "../actions/delay-action.class";


export class MelodyState extends State {

    constructor(name: string, actions: Action[]) {
        super(name, actions);
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

            if (action instanceof BuzzerAction) {
                result += (`\ttone(${action.brick.name},${action.frequency} ,${action.duration});` + `\n`);
            }

            if (action instanceof DelayAction) {
                result += (`\tdelay(${action.duration})` + `\n`);
            }

        })

        if (this._transition != null) {
            result += (`\tstate_${this._name}();` + `\n`);
        }


        // End of state
        result += (`\n}` + `\n`);
        return result;
    }

}
