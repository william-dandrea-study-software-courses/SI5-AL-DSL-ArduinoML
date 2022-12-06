import * as fs from 'fs';
import * as chai from 'chai';
import {ButtonBrick} from "./bricks/implementations/button-brick.class";
import {LedBrick} from "./bricks/implementations/led-brick.class";
import {CommandBlock} from "./blocs/command-block.class";
import {BuzzerBrick} from "./bricks/implementations/buzzer-brick.class";
import {ConditionalBlock} from "./blocs/conditional-bloc.class";
import {State} from "./states/state.class";
import {Application} from "./application.class";


const expect = chai.expect;

describe('Model Library', () => {

    it("Should work", () => {

        const button: ButtonBrick = new ButtonBrick("BUTTON", 9);
        const led: LedBrick = new LedBrick("LED", 12);
        const buzzer: BuzzerBrick = new BuzzerBrick("BUZZER", 13, 2000, null);

        const upState: State = new State("UP")
        const downState: State = new State("DOWN")

        const upBlock: CommandBlock = new CommandBlock([led.toUp(), buzzer.toUp()]);
        const downBlock: CommandBlock = new CommandBlock([led.toDown(), buzzer.toDown()]);

        const upConditionBlock: ConditionalBlock = new ConditionalBlock([button.isActive()], null, new CommandBlock([upState.callState()]), new CommandBlock([downState.callState()]));
        const downConditionBlock: ConditionalBlock = new ConditionalBlock([button.isActive()], null, new CommandBlock([downState.callState()]), new CommandBlock([upState.callState()]));

        upState.addBlock(upBlock);
        upState.addBlock(downConditionBlock);

        downState.addBlock(downBlock);
        downState.addBlock(upConditionBlock);

        const application: Application = new Application([button, buzzer, led], [upState, downState], [downState.callState()])
        console.log(application.export())
    });




})
