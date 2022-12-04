import {NamedElement} from "../util";
import {Action} from "../actions/action.class";
import {Transition} from "../transitions/transition.class";
import {SignalAction} from "../actions/signal-action.class";


/**
 * A state in the application.
 */
export class State extends NamedElement {

    protected readonly _actions: Action[];
    protected _transition: Transition = null;

    /**
     * @param {string} name
     * @param {SignalAction[]} actions
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
        return '';
    }


    set transition(value: Transition) {
        this._transition = value;
    }
}
