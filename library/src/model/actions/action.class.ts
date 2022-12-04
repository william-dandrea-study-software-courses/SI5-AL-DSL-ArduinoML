import {Signal} from "../util";
import {Brick} from "../bricks";


/**
 * An action over a brick, sending a signal to it
 */
export class Action {

    private readonly _brick: Brick;

    /**
     * @param {Brick} brick: the brick concerned by the action
     */
    public constructor(brick: Brick) {
        this._brick = brick;
    }


    get brick(): Brick {
        return this._brick;
    }
}
