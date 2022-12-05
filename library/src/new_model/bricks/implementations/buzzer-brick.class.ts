import {Brick} from "../brick.class";
import {OutputBrickInterface} from "../interfaces/output-brick.interface";
import {Command} from "../../utils/command.class";


export class BuzzerBrick extends Brick implements OutputBrickInterface {

    private readonly _frequency: number;
    private readonly _duration: number | null;

    constructor(name: string, pin: number, frequency: number, duration: number | null) {
        super(name, pin);
        this._frequency = frequency;
        this._duration = duration;
    }

    toUp(): Command {
        if (this._duration != null) {
            return new Command(`tone(${this._name}, ${this._frequency}, ${this._duration});`);
        }

        return new Command(`tone(${this._name}, ${this._frequency});`);
    }

    toDown(): Command | null {
        if (this._duration != null) {
            return null;
        }
        return new Command(`noTone(${this._name});`);
    }

    declare(): string {
        return `int ${this._name} = ${this._pin};`;
    }

    setup(): string {
        return `pinMode(${this._name}, OUTPUT)`;
    }
}
