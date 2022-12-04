import {NamedElement} from "./NamedElement";

/**
 * Abstraction for bricks.
 */
export class Brick extends NamedElement {

    /**
     * @param {string} name: name of the brick
     * @param {number} pin: pin where the brick is connected
     */
    constructor(name, pin) {
        super(name);
        this._pin = pin;
    }


    /**
     * Arduino code for the declaration of the brick.
     * @return {String}
     */
    declare = () => {
        return `int ${this._name} = ${Number(this._pin)};`;
    }

    /**
     * Arduino code for the setup of the sensor
     * @return {string}
     */
    setup = () => {
        return ``
    }
}
