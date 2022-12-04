import {Brick} from "./brick.class";


export class Buzzer extends Brick {


    /**
     * @param {string} name: name of the sensor
     * @param {number} pin: pin where the sensor is connected
     */
    constructor(name: string, pin: number) {
        super(name, pin);
    }

    /**
     * Arduino code for the setup of the sensor
     * @return {string}
     */
    public setup(): string {
        return `\tpinMode(${this._name}, OUTPUT);`;
    }


    public declare(): string {
        return super.declare();
    }
}
