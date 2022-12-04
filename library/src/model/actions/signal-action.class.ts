import {Signal} from "../util";
import {Brick} from "../bricks";
import {Action} from "./action.class";

/**
 * Send a signal through a Brick
 */
export class SignalAction extends Action {

    private readonly _value: Signal;

    /**
     * @param {Signal} value: the signal to send
     * @param {Brick} brick: the brick concerned by the action
     */
    constructor(brick: Brick, value: Signal) {
        super(brick);
        this._value = value;
    }


    get value(): Signal {
        return this._value;
    }
}
