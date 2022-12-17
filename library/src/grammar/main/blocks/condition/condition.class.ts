import {DigitalAtomicCondition} from "../../../../model/block/conditions/digital-atomic-condition.class";


export class Condition {

    private readonly _condition: DigitalAtomicCondition;


    constructor(condition: DigitalAtomicCondition) {
        this._condition = condition;
    }


    get condition(): DigitalAtomicCondition {
        return this._condition;
    }
}
