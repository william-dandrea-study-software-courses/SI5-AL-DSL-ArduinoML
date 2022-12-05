import * as fs from 'fs';
import * as chai from 'chai';
import {ButtonBrick} from "./bricks/implementations/button-brick.class";
import {LedBrick} from "./bricks/implementations/led-brick.class";
import {CommandBlock} from "./blocs/command-block.class";
import {BuzzerBrick} from "./bricks/implementations/buzzer-brick.class";
import {ConditionalBlock} from "./blocs/conditional-bloc.class";
import {State} from "./states/state.class";


const expect = chai.expect;

describe('Model Library', () => {

    it("Should work", () => {

        const button: ButtonBrick = new ButtonBrick("BUTTON", 10);
        const led: LedBrick = new LedBrick("LED", 11);
        const buzzer: BuzzerBrick = new BuzzerBrick("BUZZER", 11, 400, null);

        const upState: State = new State("UP")
        const downState: State = new State("DOWN")

        const upBlock: CommandBlock = new CommandBlock([led.toUp(), buzzer.toUp()]);
        const downBlock: CommandBlock = new CommandBlock([led.toDown(), buzzer.toDown()]);

        const upConditionBlock: ConditionalBlock = new ConditionalBlock([button.isActive()], null, new CommandBlock([upState.callState()]));
        const downConditionBlock: ConditionalBlock = new ConditionalBlock([button.isInactive()], null, new CommandBlock([downState.callState()]));

        upState.addBlock(upBlock);
        upState.addBlock(downConditionBlock);

        downState.addBlock(downBlock);
        downState.addBlock(upConditionBlock);

        console.log(upState.export())



    });
})
