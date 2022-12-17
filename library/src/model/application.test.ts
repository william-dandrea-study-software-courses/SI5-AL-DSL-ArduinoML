import * as chai from "chai";
import {ButtonSensor} from "./bricks/implementations/button-sensor.class";
import {BinaryExpressionCondition} from "./block/conditions/binary-expression-condition.class";
import {DigitalAtomicCondition} from "./block/conditions/digital-atomic-condition.class";
import {DelayStatement} from "./block/statements/delay-statement.class";
import {SwitchStateStatement} from "./block/statements/switch-state-statement.class";
import {StateModel} from "./states/state.class";
import {SIGNAL} from "./utils/signal.enum";
import {OPERATOR} from "./utils/operator.enum";
import {ApplicationModel} from "./application-model.class";
import {ConditionBlockDestination} from "./block/conditions/model-condition.class";


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

        const state: StateModel = new StateModel("state1", [statement1, binaryExpression]);
        const switchStateStatement: SwitchStateStatement = new SwitchStateStatement(state);
        binaryExpression.addBlock(switchStateStatement, ConditionBlockDestination.IF);
        // console.log(state.export())

        const state2: StateModel = new StateModel("state2", [statement2, binaryExpression]);

        const application: ApplicationModel = new ApplicationModel([button1, button2], [state, state2], state2);
        console.log(application.export());
    });



});
