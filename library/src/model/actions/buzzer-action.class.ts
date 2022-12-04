import {Action} from "./action.class";
import {Brick} from "../bricks";

/**
 * Execute a buzzer sound
 */
export class BuzzerAction extends Action {

    private readonly _frequency: number;
    private readonly _duration: number;

    /**
     * @param {Brick} brick: the brick concerned by the action
     * @param {number} frequency: the frequency of the sound
     * @param {number} duration : the duration of the sound
     */
    constructor(brick: Brick, frequency: number, duration: number) {
        super(brick);
        this._frequency = frequency;
        this._duration = duration;
    }


    get frequency(): number {
        return this._frequency;
    }

    get duration(): number {
        return this._duration;
    }
}
