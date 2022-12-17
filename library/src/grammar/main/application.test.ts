import * as chai from "chai";
import {Button} from "./components/button.class";
import {Led} from "./components/led.class";
import {State} from "./state/state.class";
import {IfElseCodeBlock} from "./blocks/if-else-code-block.class";
import {Application} from "./application.class";
import {OPERATOR} from "../../model/utils/operator.enum";
import {Buzzer} from "./components/buzzer.class";
import {DelayStatementCodeBlock} from "./blocks/specific-functions/delay-statement-code-block.class";
import {RegularCodeBlock} from "./blocks/regular-code-block.class";


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

    it("Temporal transitions", () => {
        const button: Button = new Button("BUTTON", 10);
        const led: Led = new Led("LED", 13);

        const onState: State = new State("on")
        const offState: State = new State("off")

        onState.codeBlock.addBlock(led.lightOn());
        onState.codeBlock.addBlock(new DelayStatementCodeBlock(800));
        onState.codeBlock.addBlock(offState.callState());

        offState.codeBlock.addBlock(led.lightOff());
        const ifElseBlock: IfElseCodeBlock = new IfElseCodeBlock();
        ifElseBlock.addConditions(button.isPressed());
        ifElseBlock.ifCodeBlock = onState.callState();
        ifElseBlock.elseCodeBlock = offState.callState();
        offState.codeBlock.addBlock(ifElseBlock);

        const app: Application = new Application([button, led], [onState, offState], offState)
        console.log(app.export())
    });

    it("Multi-state alarm", () => {
        const led: Led = new Led("LED", 13);
        const button: Button = new Button("BUTTON", 10);
        const buzzer: Buzzer = new Buzzer("BUZZER", 12, 1000, null);

        const offState: State = new State("off");
        const noiseOnLedOffState: State = new State("noise_on_led_off");
        const noiseOffLedOnState: State = new State("noise_off_led_on");

        offState.codeBlock.addBlock(led.lightOff());
        offState.codeBlock.addBlock(buzzer.soundDown());
        const offStateIfElse: IfElseCodeBlock = new IfElseCodeBlock();
        offStateIfElse.addConditions(button.isPressed());
        offStateIfElse.ifCodeBlock = noiseOnLedOffState.callState();
        offStateIfElse.elseCodeBlock = offState.callState();
        offState.codeBlock.addBlock(offStateIfElse);


        noiseOnLedOffState.codeBlock.addBlock(buzzer.soundUp());
        noiseOnLedOffState.codeBlock.addBlock(led.lightOff());
        const noiseOnLedOffStateIfElse: IfElseCodeBlock = new IfElseCodeBlock();
        noiseOnLedOffStateIfElse.addConditions(button.isPressed());
        noiseOnLedOffStateIfElse.ifCodeBlock = noiseOffLedOnState.callState();
        noiseOnLedOffStateIfElse.elseCodeBlock = noiseOnLedOffState.callState();
        noiseOnLedOffState.codeBlock.addBlock(noiseOnLedOffStateIfElse);

        noiseOffLedOnState.codeBlock.addBlock(buzzer.soundDown());
        noiseOffLedOnState.codeBlock.addBlock(led.lightOn());
        const noiseOffLedOnStateIfElse: IfElseCodeBlock = new IfElseCodeBlock();
        noiseOffLedOnStateIfElse.addConditions(button.isPressed());
        noiseOffLedOnStateIfElse.ifCodeBlock = offState.callState();
        noiseOffLedOnStateIfElse.elseCodeBlock = noiseOnLedOffState.callState();
        noiseOffLedOnState.codeBlock.addBlock(noiseOnLedOffStateIfElse);

        const app: Application = new Application([button, led, buzzer], [noiseOnLedOffState, noiseOffLedOnState, offState], offState)
        console.log(app.export())
    });


    it("State-based alarm", () => {
        const led: Led = new Led("LED", 13);
        const button: Button = new Button("BUTTON", 11);

        const onState: State = new State("on");
        const offState: State = new State("off");

        onState.codeBlock.addBlock(led.lightOn());
        const ifElseBlockOnState: IfElseCodeBlock = new IfElseCodeBlock();
        ifElseBlockOnState.addConditions(button.isPressed());
        ifElseBlockOnState.ifCodeBlock = offState.callState();
        ifElseBlockOnState.elseCodeBlock = onState.callState();
        onState.codeBlock.addBlock(ifElseBlockOnState);

        offState.codeBlock.addBlock(led.lightOff())
        const ifElseBlockOffState: IfElseCodeBlock = new IfElseCodeBlock();
        ifElseBlockOffState.addConditions(button.isPressed());
        ifElseBlockOffState.ifCodeBlock = onState.callState();
        ifElseBlockOffState.elseCodeBlock = offState.callState();
        offState.codeBlock.addBlock(ifElseBlockOffState);

        const app: Application = new Application([button, led], [onState, offState], offState)
        console.log(app.export())
    });


    it ("Dual check alarm", () => {
        const buzzer: Buzzer = new Buzzer("BUZZER", 13, 1000, null);
        const button1: Button = new Button("BUTTON", 11);
        const button2: Button = new Button("BUTTON", 12);

        const mainState: State = new State("main");

        const ifElseCodeBlock: IfElseCodeBlock = new IfElseCodeBlock();
        ifElseCodeBlock.addConditions(button2.isPressed())
        ifElseCodeBlock.addConditions(button1.isPressed())

        const codeBlock1: RegularCodeBlock = new RegularCodeBlock();
        codeBlock1.addBlock(buzzer.soundUp());
        codeBlock1.addBlock(mainState.callState());
        ifElseCodeBlock.ifCodeBlock = codeBlock1;

        const codeBlock2: RegularCodeBlock = new RegularCodeBlock();
        codeBlock2.addBlock(buzzer.soundDown());
        codeBlock2.addBlock(mainState.callState());
        ifElseCodeBlock.elseCodeBlock = codeBlock2
        ifElseCodeBlock.operator = OPERATOR.AND;
        mainState.codeBlock.addBlock(ifElseCodeBlock);

        const app: Application = new Application([buzzer, button1, button2], [mainState], mainState)
        console.log(app.export())
    })

});
