import { Statement } from "./statement.class";
import {Actuator} from "../../bricks/actuator.class";
import {BuzzerActuator} from "../../bricks/implementations/buzzer-actuator.class";

export class BuzzerStopStatement extends Statement {
    private readonly _buzzer: BuzzerActuator;

    constructor(buzzer: BuzzerActuator) {
        super();
        this._buzzer = buzzer;
    }

    export(): string {
        return `noTone(${this._buzzer.name});`;
    }
}
