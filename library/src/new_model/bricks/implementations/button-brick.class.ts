import {Brick} from "../brick.class";
import {InputBrickInterface} from "../interfaces/input-brick.interface";
import {Condition} from "../../utils/condition.class";


export class ButtonBrick extends Brick implements InputBrickInterface {

    constructor(name: string, pin: number) {
        super(name, pin);
    }

    isActive(): Condition {
        return new Condition(`digitalRead(${this._name}) == HIGH`);
    }

    isInactive(): Condition {
        return new Condition(`digitalRead(${this._name}) == LOW`);
    }

    setup(): string {
        return `pinMode(${this._name}, INPUT);`;
    }

    declare(): string {
        return `int ${this._name} = ${this._pin};`;
    }
}
