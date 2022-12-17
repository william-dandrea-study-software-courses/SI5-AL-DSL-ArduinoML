import * as chai from "chai";
import {StateModel} from "./state.class";
import {ButtonSensor} from "../bricks/implementations/button-sensor.class";
import {BinaryExpressionCondition} from "../block/conditions/binary-expression-condition.class";
import {OPERATOR} from "../utils/operator.enum";
import {DigitalAtomicCondition} from "../block/conditions/digital-atomic-condition.class";
import {SIGNAL} from "../utils/signal.enum";
import {DelayStatement} from "../block/statements/delay-statement.class";
import {ConditionBlockDestination} from "../block/conditions/condition.class";
import {SwitchStateStatement} from "../block/statements/switch-state-statement.class";


const expect = chai.expect;

describe("Test the export of a block", () => {

    it("test binary expression with digital atomic condition", () => {
        const button1: ButtonSensor = new ButtonSensor("BUTTON1", 12)
        const button2: ButtonSensor = new ButtonSensor("BUTTON2", 13)

        const binaryExpression: BinaryExpressionCondition = new BinaryExpressionCondition(OPERATOR.AND);

        const digitalCondition1: DigitalAtomicCondition = new DigitalAtomicCondition(button1, OPERATOR.EQUAL, SIGNAL.HIGH)
        const digitalCondition2: DigitalAtomicCondition = new DigitalAtomicCondition(button2, OPERATOR.EQUAL, SIGNAL.HIGH)

        binaryExpression.addCondition(digitalCondition1);
        binaryExpression.addCondition(digitalCondition2);

        const statement1: DelayStatement = new DelayStatement(500);
        const statement2: DelayStatement = new DelayStatement(200);
        binaryExpression.addBlock(statement1, ConditionBlockDestination.IF);
        binaryExpression.addBlock(statement2, ConditionBlockDestination.ELSE);

        const state: StateModel = new StateModel("state1", binaryExpression);
        const switchStateStatement: SwitchStateStatement = new SwitchStateStatement(state);
        binaryExpression.addBlock(switchStateStatement, ConditionBlockDestination.IF);
        console.log(state.export())
    })
});
