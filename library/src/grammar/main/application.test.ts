import * as chai from "chai";
import {Button} from "./components/button.class";
import {Led} from "./components/led.class";
import {State} from "./state/state.class";
import {IfElseCodeBlock} from "./blocks/if-else-code-block.class";
import {Application} from "./application.class";
import {OPERATOR} from "../../model/utils/operator.enum";
import {Buzzer} from "./components/buzzer.class";
import {SwitchStateStatement} from "../../model/block/statements/switch-state-statement.class";
import {StatementCodeBlock} from "./blocks/statement-code-block.class";


const expect = chai.expect;

describe("TEST", () => {

    it("1", () => {

        // Instanciation des composants
        const button1: Button = new Button("button1", 12)
        const button2: Button = new Button("button2", 13)
        const led1: Led = new Led("Led1", 10)

        // Instanciation des états
        const state1: State = new State("state1");
        const state2: State = new State("state2");

        const ifElseCodeBlock: IfElseCodeBlock = new IfElseCodeBlock();
        ifElseCodeBlock.ifCodeBlock = led1.lightOn();
        ifElseCodeBlock.elseCodeBlock = led1.lightOff();
        ifElseCodeBlock.addConditions(button1.isPressed());
        ifElseCodeBlock.addConditions(button2.isPressed());
        ifElseCodeBlock.operator = OPERATOR.AND;

        state1.codeBlock.addBlock(ifElseCodeBlock);

        const app: Application = new Application([button1, button2, led1], [state1, state2], state1)
        console.log(app.export());
    })


    it("Very Simple Alarm", () => {
        const button: Button = new Button("BUTTON", 9);
        const led: Led = new Led("LED", 12);
        const buzzer: Buzzer = new Buzzer("BUZZER", 13, 2000, null);

        const upState: State = new State("UP");
        const downState: State = new State("DOWN");


        upState.codeBlock.addBlock(led.lightOn());
        upState.codeBlock.addBlock(buzzer.soundUp());
        const state1IfElseCodeBlock: IfElseCodeBlock = new IfElseCodeBlock();
        state1IfElseCodeBlock.addConditions(button.isPressed());
        state1IfElseCodeBlock.ifCodeBlock = downState.callState();
        state1IfElseCodeBlock.elseCodeBlock = upState.callState();
        upState.codeBlock.addBlock(state1IfElseCodeBlock)

        downState.codeBlock.addBlock(led.lightOff());
        downState.codeBlock.addBlock(buzzer.soundDown());
        const state2IfElseCodeBlock: IfElseCodeBlock = new IfElseCodeBlock();
        state2IfElseCodeBlock.addConditions(button.isPressed());
        state2IfElseCodeBlock.ifCodeBlock = upState.callState();
        state2IfElseCodeBlock.elseCodeBlock = downState.callState();
        downState.codeBlock.addBlock(state2IfElseCodeBlock)


        const app: Application = new Application([button, led, buzzer], [upState, downState], downState)
        // app.export()
        console.log(app.export())
    });
});
