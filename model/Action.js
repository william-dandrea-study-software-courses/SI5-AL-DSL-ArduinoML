/**
 * An action over a brick, sending a signal to it
 */
export class Action {

    /**
     * @param {SIGNAL} value: the signal to send
     * @param {Brick} brick: the brick concerned by the action
     */
    constructor(value, brick) {
        this._value = value;
        this._brick = brick;
    }


    /**
     * @return {SIGNAL}
     */
    get value() {
        return this._value;
    }

    /**
     * @return {Brick}
     */
    get brick() {
        return this._brick;
    }
}
