import {Brick} from "../bricks";
import {Signal} from "../util";
import {Action} from "./action.class";


/**
 * Add a time delay when we are passing through a brick
 */
export class DelayAction extends Action {

    private readonly _duration: number;

    /**
     * @param {Brick} brick: the brick concerned by the action
     * @param {number} duration: the duration of the delay in ms
     */
    constructor(brick: Brick, duration: number) {
        super(brick);
        this._duration = duration;
    }

    get duration(): number {
        return this._duration;
    }
}
