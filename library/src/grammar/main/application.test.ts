import * as chai from "chai";
import {Button} from "./components/button.class";
import {Led} from "./components/led.class";
import {State} from "./state/state.class";
import {IfElseCodeBlock} from "./blocks/if-else-code-block.class";
import {Application} from "./application.class";
import {OPERATOR} from "../../model/utils/operator.enum";


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
});
