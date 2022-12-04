import {Brick} from "./brick.class";


export class Sensor extends Brick {


    /**
     * @param {string} name: name of the sensor
     * @param {number} pin: pin where the sensor is connected
     */
    public constructor(name: string, pin: number) {
        super(name, pin);
    }

    /**
     * Arduino code for the setup of the sensor
     * @return {string}
     */
    public setup(): string {
        return `\tpinMode(${this._name}, INPUT);`;
    }


    public declare(): string {
        return super.declare();
    }
}
