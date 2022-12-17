import {Component} from "./component.class";
import {Statement} from "../../../model/block/statements/statement.class";
import {StatementCodeBlock} from "../blocks/statement-code-block.class";
import {DigitalAssignmentStatement} from "../../../model/block/statements/digital-assignment-statement.class";
import {LedActuator} from "../../../model/bricks/implementations/led-actuator.class";
import {SIGNAL} from "../../../model/utils/signal.enum";
import {Brick} from "../../../model/bricks/brick.class";


export class Led extends Component {

    private readonly _ledModel: LedActuator;

    constructor(name: string, pin: number) {
        super(name, pin);
        this._ledModel = new LedActuator(this._name, this._pin);
    }

    public lightOn(): StatementCodeBlock {
        return new StatementCodeBlock(new DigitalAssignmentStatement(this._ledModel, SIGNAL.HIGH));
    }

    public lightOff(): StatementCodeBlock {
        return new StatementCodeBlock(new DigitalAssignmentStatement(this._ledModel, SIGNAL.LOW));
    }

    getContent(): LedActuator {
        return this._ledModel;
    }


}
