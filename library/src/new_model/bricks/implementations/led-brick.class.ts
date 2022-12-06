import {Brick} from "../brick.class";
import {OutputBrickInterface} from "../interfaces/output-brick.interface";
import {Command} from "../../utils/command.class";


export class LedBrick extends Brick implements OutputBrickInterface {

    constructor(name: string, pin: number) {
        super(name, pin);
    }

    toUp(): Command {
        return new Command(`digitalWrite(${this._name}, HIGH);`);
    }

    toDown(): Command | null {
        return new Command(`digitalWrite(${this._name}, LOW);`);
    }

    declare(): string {
        return `int ${this._name} = ${this._pin};`;
    }

    setup(): string {
        return `pinMode(${this._name}, OUTPUT);`;
    }
}
