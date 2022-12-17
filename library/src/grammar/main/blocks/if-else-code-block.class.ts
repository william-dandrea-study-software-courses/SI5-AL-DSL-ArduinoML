import {CodeBlock} from "./code-block.class";
import {Condition} from "./condition/condition.class";
import {BinaryExpressionCondition} from "../../../model/block/conditions/binary-expression-condition.class";
import {OPERATOR} from "../../../model/utils/operator.enum";
import {ConditionBlockDestination, ModelCondition} from "../../../model/block/conditions/model-condition.class";


export class IfElseCodeBlock extends CodeBlock {

    private _ifCodeBlock: CodeBlock[] = [];
    private _elseCodeBlock: CodeBlock[] = [];

    private _conditions: Condition[] = [];
    private _operator: OPERATOR | null = null;

    constructor() {
        super();
    }

    public addIfCodeBlock(value: CodeBlock) {
        this._ifCodeBlock.push(value);
    }

    public addElseCodeBlock(value: CodeBlock) {
        this._elseCodeBlock.push(value);
    }

    public addConditions(value: Condition) {
        this._conditions.push(value);
    }

    set operator(value: OPERATOR | null) {
        this._operator = value;
    }

    getContent(): ModelCondition  {
        const binaryExpressionCondition: BinaryExpressionCondition = new BinaryExpressionCondition(this._operator || OPERATOR.OR)

        for (const condition of this._conditions) {
            const modelCondition: ModelCondition = new ModelCondition();
            binaryExpressionCondition.addCondition(condition.condition);
        }

        this._ifCodeBlock.forEach(cb => {
            binaryExpressionCondition.addBlock(cb.getContent(), ConditionBlockDestination.IF);
        })

        this._elseCodeBlock.forEach(cb => {
            binaryExpressionCondition.addBlock(cb.getContent(), ConditionBlockDestination.ELSE);
        });

        return binaryExpressionCondition;
    }
}
