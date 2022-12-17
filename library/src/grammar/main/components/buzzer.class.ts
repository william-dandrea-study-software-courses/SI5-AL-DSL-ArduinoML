import {Component} from "./component.class";
import {StatementCodeBlock} from "../blocks/statement-code-block.class";
import {BuzzerStartStatement} from "../../../model/block/statements/buzzer-start-statement.class";
import {BuzzerActuator} from "../../../model/bricks/implementations/buzzer-actuator.class";
import {BuzzerStopStatement} from "../../../model/block/statements/buzzer-stop-statement.class";
import {Brick} from "../../../model/bricks/brick.class";


export class Buzzer extends Component {


    private readonly _frequency: number;
    private readonly _duration: number | null;

    private readonly _buzzerModel: BuzzerActuator;

    constructor(name: string, pin: number, frequency: number, duration: number | null) {
        super(name, pin);
        this._frequency = frequency;
        this._duration = duration;
        this._buzzerModel = new BuzzerActuator(this._name, this._pin, this._frequency, this._duration)
    }

    public soundUp(): StatementCodeBlock {
        return new StatementCodeBlock(new BuzzerStartStatement(this._buzzerModel, this._frequency, this._duration))
    }
    public soundDown(): StatementCodeBlock {
        return new StatementCodeBlock(new BuzzerStopStatement(this._buzzerModel))
    }

    getContent(): BuzzerActuator {
        return this._buzzerModel;
    }



}
