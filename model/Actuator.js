import {Brick} from "./Brick";


export class Actuator extends Brick {

    /**
     * @param {string} name: name of the actuator
     * @param {number} pin: pin where the actuator is connected
     */
    constructor(name, pin) {
        super(name, pin);
    }

    /**
     * Arduino code for the setup of the actuator
     * @return {string}
     */
    setup = () => {
        return `\tpinMode(${this._name}, OUTPUT);`
    }
}
