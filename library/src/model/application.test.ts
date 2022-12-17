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
import {BuzzerActuator} from "./bricks/implementations/buzzer-actuator.class";
import {BuzzerStartStatement} from "./block/statements/buzzer-start-statement.class";
import {BuzzerStopStatement} from "./block/statements/buzzer-stop-statement.class";


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

        const state2: StateModel = new StateModel("state2", [statement2, binaryExpression]);

        const application: ApplicationModel = new ApplicationModel([button1, button2], [state, state2], state2);
        console.log(application.export());
    });

    it("dual check alarm", () => {
        const buzzer: BuzzerActuator = new BuzzerActuator("BUZZER", 13, 1000, null);
        const button1: ButtonSensor = new ButtonSensor("BUTTON1", 11);
        const button2: ButtonSensor = new ButtonSensor("BUTTON2", 12);

        const binaryExpression: BinaryExpressionCondition = new BinaryExpressionCondition(OPERATOR.AND);
        binaryExpression.addCondition(new DigitalAtomicCondition(button1, OPERATOR.EQUAL, SIGNAL.HIGH));
        binaryExpression.addCondition(new DigitalAtomicCondition(button2, OPERATOR.EQUAL, SIGNAL.HIGH));

        const mainState: StateModel = new StateModel("main", []);

        binaryExpression.addBlock(new BuzzerStartStatement(buzzer, 1000, null), ConditionBlockDestination.IF)
        binaryExpression.addBlock(new SwitchStateStatement(mainState), ConditionBlockDestination.IF)

        binaryExpression.addBlock(new BuzzerStopStatement(buzzer), ConditionBlockDestination.ELSE)
        binaryExpression.addBlock(new SwitchStateStatement(mainState), ConditionBlockDestination.ELSE)

        mainState.addBlock(binaryExpression);
        const application: ApplicationModel = new ApplicationModel([button1, button2, buzzer], [mainState], mainState);
        console.log(application.export());


        /*
        const buzzer: Buzzer = new Buzzer("BUZZER", 13, 1000, null);
        const button1: Button = new Button("BUTTON1", 11);
        const button2: Button = new Button("BUTTON2", 12);

        const mainState: State = new State("main");

        const ifElseCodeBlock: IfElseCodeBlock = new IfElseCodeBlock();
        ifElseCodeBlock.addConditions(button2.isPressed())
        ifElseCodeBlock.addConditions(button1.isPressed())
        ifElseCodeBlock.operator = OPERATOR.AND;

        const codeBlock1: RegularCodeBlock = new RegularCodeBlock();
        codeBlock1.addBlock(buzzer.soundUp());
        codeBlock1.addBlock(mainState.callState());
        ifElseCodeBlock.addIfCodeBlock(codeBlock1);

        mainState.codeBlock.addBlock(ifElseCodeBlock);
        const codeBlock2: RegularCodeBlock = new RegularCodeBlock();
        codeBlock2.addBlock(buzzer.soundDown());
        codeBlock2.addBlock(mainState.callState());
        ifElseCodeBlock.addElseCodeBlock(codeBlock2);

        mainState.codeBlock.addBlock(ifElseCodeBlock)
        const app: Application = new Application([buzzer, button1, button2], [mainState], mainState)
        console.log(app.export())
         */
    })



});
