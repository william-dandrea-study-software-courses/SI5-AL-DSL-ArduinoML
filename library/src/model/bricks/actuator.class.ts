import {Brick} from "./brick.class";


export class Actuator extends Brick {

    /**
     * @param {string} name: name of the actuator
     * @param {number} pin: pin where the actuator is connected
     */
    public constructor(name: string, pin: number) {
        super(name, pin);
    }

    /**
     * Arduino code for the setup of the actuator
     * @return {string}
     */
    public setup(): string {
        return `\tpinMode(${this._name}, OUTPUT);`;
    }

    public declare(): string {
        return super.declare();
    }
}
