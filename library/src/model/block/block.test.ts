import * as chai from "chai";
import {BinaryExpressionCondition} from "./conditions/binary-expression-condition.class";
import {OPERATOR} from "../utils/operator.enum";
import {SIGNAL} from "../utils/signal.enum";
import {DigitalAtomicCondition} from "./conditions/digital-atomic-condition.class";
import {DelayStatement} from "./statements/delay-statement.class";
import {DigitalAssignmentStatement} from "./statements/digital-assignment-statement.class";
import {ButtonSensor} from "../bricks/implementations/button-sensor.class";
import {LedActuator} from "../bricks/implementations/led-actuator.class";
import {ConditionBlockDestination} from "./conditions/model-condition.class";


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

        console.log(binaryExpression.export())
        // expect(binaryExpression.export()).to.equal("digitalRead(BUTTON1) == HIGH && digitalRead(BUTTON2) == HIGH")
    })

    it("statement", () => {

        const led1: LedActuator = new LedActuator("LED1", 10);

        const statement1: DelayStatement = new DelayStatement(500);
        const statement2: DigitalAssignmentStatement = new DigitalAssignmentStatement(led1, SIGNAL.HIGH);
        // const statement3: SwitchStateStatement = new SwitchStateStatement()

        console.log(statement1.export());
        console.log(statement2.export());

        expect(statement1.export()).to.equal("delay(500);")
        expect(statement2.export()).to.equal("digitalWrite(LED1, HIGH);")


        const button1: ButtonSensor = new ButtonSensor("BUTTON1", 12);

        const digitalCondition: DigitalAtomicCondition = new DigitalAtomicCondition(button1, OPERATOR.EQUAL, SIGNAL.HIGH);
        digitalCondition.addBlock(statement1, ConditionBlockDestination.IF);
        digitalCondition.addBlock(statement2, ConditionBlockDestination.IF);

        console.log(digitalCondition.export());
    })


});


/**
 * if (digitalRead(BUTTON1) == HIGH && digitalRead(BUTTON2) == HIGH) {
 *     // statements ...
 * }
 */
