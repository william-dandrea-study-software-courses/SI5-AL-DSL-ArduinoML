import { Statement } from "./statement.class";
import {BuzzerActuator} from "../../bricks/implementations/buzzer-actuator.class";

export class BuzzerStartStatement extends Statement {
    private readonly _frequency: number;
    private readonly _duration: number | null;
    private readonly _buzzer: BuzzerActuator;

    constructor(buzzer: BuzzerActuator, frequency: number, duration: number | null) {
        super();
        this._frequency = frequency;
        this._duration = duration;
        this._buzzer = buzzer;
    }

    export(): string {
        if (this._duration) {
            return `tone(${this._buzzer.name}, ${this._frequency}, ${this._duration});`;
        }
        return `tone(${this._buzzer.name}, ${this._frequency});`
    }
}
