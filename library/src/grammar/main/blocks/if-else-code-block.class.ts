import {CodeBlock} from "./code-block.class";
import {Condition} from "./condition/condition.class";
import {BinaryExpressionCondition} from "../../../model/block/conditions/binary-expression-condition.class";
import {OPERATOR} from "../../../model/utils/operator.enum";
import {ConditionBlockDestination, ModelCondition} from "../../../model/block/conditions/model-condition.class";


export class IfElseCodeBlock extends CodeBlock {

    private _ifCodeBlock: CodeBlock | null;
    private _elseCodeBlock: CodeBlock | null;

    private _conditions: Condition[] = [];
    private _operator: OPERATOR | null;

    constructor() {
        super();
    }

    set ifCodeBlock(value: CodeBlock) {
        this._ifCodeBlock = value;
    }

    set elseCodeBlock(value: CodeBlock) {
        this._elseCodeBlock = value;
    }

    public addConditions(value: Condition) {
        this._conditions.push(value);
    }

    set operator(value: OPERATOR | null) {
        this._operator = value;
    }

    getContent() {
        const binaryExpressionCondition: BinaryExpressionCondition = new BinaryExpressionCondition(this._operator)

        for (const condition of this._conditions) {
            const modelCondition: ModelCondition = new ModelCondition();
            binaryExpressionCondition.addCondition(condition.condition);
        }

        if (this._ifCodeBlock != null) {
            binaryExpressionCondition.addBlock(this._ifCodeBlock.getContent(), ConditionBlockDestination.IF);
        }

        if (this._elseCodeBlock != null) {
            binaryExpressionCondition.addBlock(this._elseCodeBlock.getContent(), ConditionBlockDestination.ELSE);
        }

        return binaryExpressionCondition;
    }


}
