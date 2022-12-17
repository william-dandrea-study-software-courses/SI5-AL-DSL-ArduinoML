import {Component} from "./component.class";
import {Condition} from "../blocks/condition/condition.class";
import {DigitalAtomicCondition} from "../../../model/block/conditions/digital-atomic-condition.class";
import {ButtonSensor} from "../../../model/bricks/implementations/button-sensor.class";
import {OPERATOR} from "../../../model/utils/operator.enum";
import {SIGNAL} from "../../../model/utils/signal.enum";
import {Brick} from "../../../model/bricks/brick.class";


export class Button extends Component {

    private readonly _buttonModel: ButtonSensor;

    constructor(name: string, pin: number) {
        super(name, pin);
        this._buttonModel = new ButtonSensor(name, pin)
    }

    public isPressed(): Condition {
        return new Condition(new DigitalAtomicCondition(this._buttonModel, OPERATOR.EQUAL, SIGNAL.HIGH))
    }
    public isNotPressed(): Condition {
        return new Condition(new DigitalAtomicCondition(this._buttonModel, OPERATOR.EQUAL, SIGNAL.LOW))
    }

    getContent(): ButtonSensor {
        return this._buttonModel;
    }


}
