import {Signal} from "./util";
import {Brick} from "./bricks";


/**
 * An action over a brick, sending a signal to it
 */
export class Action {

    private readonly _value: Signal;
    private readonly _brick: Brick;


    /**
     * @param {Signal} value: the signal to send
     * @param {Brick} brick: the brick concerned by the action
     */
    public constructor(value: Signal, brick: Brick) {
        this._value = value;
        this._brick = brick;
    }


    get value(): Signal {
        return this._value;
    }

    get brick(): Brick {
        return this._brick;
    }
}
