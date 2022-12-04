import {NamedElement} from "../util";


/**
 * Abstraction for bricks.
 */
export class Brick extends NamedElement {

    private readonly _pin: number;

    /**
     * @param {string} name: name of the brick
     * @param {number} pin: pin where the brick is connected
     */
    public constructor(name: string, pin: number) {
        super(name);
        this._pin = pin;
    }

    /**
     * Arduino code for the declaration of the brick.
     * @return {String}
     */
    public declare(): string {
        return `int ${this._name} = ${Number(this._pin)};`;
    }

    /**
     * Arduino code for the setup of the sensor
     * @return {string}
     */
    public setup(): string {
        return ``;
    }


    get pin(): number {
        return this._pin;
    }
}
