import {Brick} from "./Brick";


export class Sensor extends Brick {


    /**
     * @param {string} name: name of the sensor
     * @param {number} pin: pin where the sensor is connected
     */
    constructor(name, pin) {
        super(name, pin);
    }

    /**
     * Arduino code for the setup of the sensor
     * @return {string}
     */
    setup = () => {
        return `\tpinMode(${this._name}, INPUT);`
    }
}
