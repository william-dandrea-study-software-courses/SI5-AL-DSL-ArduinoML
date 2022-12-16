import * as chai from "chai";
import { ButtonBrick } from "./bricks/implementations/button.class";
import { LedBrick } from "./bricks/implementations/led.class";
import { CommandBlock } from "./block/command-block.class";
import { BuzzerBrick } from "./bricks/implementations/buzzer.class";
import { ConditionalBlock, Operator } from "./block/conditional-bloc.class";
import { State } from "./states/state.class";
import { Application } from "./application.class";
import { Condition } from "./utils/condition.class";
import { Command } from "./commands/command.class";
import { DelayCommand } from "./commands/delay-command.class";

const expect = chai.expect;

describe("Model Library", () => {
  /**
   * Pushing a button activates a LED and a buzzer. Releasing the button switches
   * the actuators off.
   */
  it("Very Simple Alarm", () => {
    const button: ButtonBrick = new ButtonBrick("BUTTON", 9);
    const led: LedBrick = new LedBrick("LED", 12);
    const buzzer: BuzzerBrick = new BuzzerBrick("BUZZER", 13, 2000, null);

    const upState: State = new State("UP");
    const downState: State = new State("DOWN");

    const upBlock: CommandBlock = new CommandBlock([led.toUp(), buzzer.toUp()]);
    const downBlock: CommandBlock = new CommandBlock([
      led.toDown(),
      buzzer.toDown(),
    ]);

    const upConditionBlock: ConditionalBlock = new ConditionalBlock(
      [button.isActive()],
      null,
      new CommandBlock([upState.callState()]),
      new CommandBlock([downState.callState()])
    );
    const downConditionBlock: ConditionalBlock = new ConditionalBlock(
      [button.isActive()],
      null,
      new CommandBlock([downState.callState()]),
      new CommandBlock([upState.callState()])
    );

    upState.addBlock(upBlock);
    upState.addBlock(downConditionBlock);

    downState.addBlock(downBlock);
    downState.addBlock(upConditionBlock);

    const application: Application = new Application(
      [button, buzzer, led],
      [upState, downState],
      [downState.callState()]
    );
    console.log(application.export());
  });

  /**
   * It will trigger a buzzer if and only if two buttons are pushed at the very same time. Releasing at least one
   * of the button stop the sound.
   */
  it("Dual-check alarm", () => {
    const buzzer: BuzzerBrick = new BuzzerBrick("BUZZER", 13, 1000, null);
    const button1: ButtonBrick = new ButtonBrick("BUTTON1", 11);
    const button2: ButtonBrick = new ButtonBrick("BUTTON2", 12);

    const mainState: State = new State("main");

    const noSoundBloc: CommandBlock = new CommandBlock([
      buzzer.toDown(),
      mainState.callState(),
    ]);
    const withSoundBloc: CommandBlock = new CommandBlock([
      buzzer.toUp(),
      mainState.callState(),
    ]);

    const switchToWithSound: ConditionalBlock = new ConditionalBlock(
      [button1.isActive(), button2.isActive()],
      Operator.AND,
      withSoundBloc,
      noSoundBloc
    );

    mainState.addBlock(switchToWithSound);

    const application: Application = new Application(
      [buzzer, button1, button2],
      [mainState],
      [mainState.callState()]
    );
    console.log(application.export());
  });

  /**
   * State-based alarm: Pushing the button once switch the system in a mode where the LED is switched on. Pushing it
   * again switches it off.
   */

  it("State-based alarm", () => {
    const led: LedBrick = new LedBrick("LED", 13);
    const button: ButtonBrick = new ButtonBrick("BUTTON", 11);

    const onState: State = new State("on");
    const offState: State = new State("off");

    const lightUpBlock: CommandBlock = new CommandBlock([led.toUp()]);
    const lightDownBlock: CommandBlock = new CommandBlock([led.toDown()]);

    const onConditionBlock: ConditionalBlock = new ConditionalBlock(
      [button.isActive()],
      null,
      new CommandBlock([offState.callState()]),
      new CommandBlock([onState.callState()])
    );
    const offCondition: ConditionalBlock = new ConditionalBlock(
      [button.isActive()],
      null,
      new CommandBlock([onState.callState()]),
      new CommandBlock([offState.callState()])
    );

    onState.addBlock(lightUpBlock);
    onState.addBlock(onConditionBlock);
    offState.addBlock(lightDownBlock);
    offState.addBlock(offCondition);

    const application: Application = new Application(
      [led, button],
      [onState, offState],
      [offState.callState()]
    );
    console.log(application.export());
  });

  /**
   * Pushing the button starts the buzz noise. Pushing it again stop the buzzer and switch the LED on. Pushing it
   * again switch the LED off, and makes the system ready to make noise again after one push, and so on.
   */
  it("Multi-state alarm", () => {
    const led: LedBrick = new LedBrick("LED", 13);
    const buzzer: BuzzerBrick = new BuzzerBrick("BUZZER", 12, 1000, null);
    const button: ButtonBrick = new ButtonBrick("BUTTON", 10);

    const offState: State = new State("off");
    const noiseOnLedOffState: State = new State("noise_on_led_off");
    const noiseOffLedOnState: State = new State("noise_off_led_on");

    const offCommandBlock: CommandBlock = new CommandBlock([
      led.toDown(),
      buzzer.toDown(),
    ]);
    const noiseOnLedOffCommandBlock: CommandBlock = new CommandBlock([
      buzzer.toUp(),
      led.toDown(),
    ]);
    const noiseOffLedOnCommandBlock: CommandBlock = new CommandBlock([
      buzzer.toDown(),
      led.toUp(),
    ]);

    const from_off_to_noiseOnLedOff: ConditionalBlock = new ConditionalBlock(
      [button.isActive()],
      null,
      new CommandBlock([noiseOnLedOffState.callState()]),
      new CommandBlock([offState.callState()])
    );

    const from_noiseOnLedOff_to_noiseOffLedOn: ConditionalBlock =
      new ConditionalBlock(
        [button.isActive()],
        null,
        new CommandBlock([noiseOffLedOnState.callState()]),
        new CommandBlock([noiseOnLedOffState.callState()])
      );

    const from_noiseOffLedOn_to_off: ConditionalBlock = new ConditionalBlock(
      [button.isActive()],
      null,
      new CommandBlock([offState.callState()]),
      new CommandBlock([noiseOffLedOnState.callState()])
    );

    offState.addBlock(offCommandBlock);
    offState.addBlock(from_off_to_noiseOnLedOff);
    noiseOnLedOffState.addBlock(noiseOnLedOffCommandBlock);
    noiseOnLedOffState.addBlock(from_noiseOnLedOff_to_noiseOffLedOn);
    noiseOffLedOnState.addBlock(noiseOffLedOnCommandBlock);
    noiseOffLedOnState.addBlock(from_noiseOffLedOn_to_off);

    const application: Application = new Application(
      [led, button, buzzer],
      [offState, noiseOnLedOffState, noiseOffLedOnState],
      [offState.callState()]
    );
    console.log(application.export());
  });

  /**
   * Alan wants to define a state machine where LED1 is switched on after a push on button B1 and switched off 800ms
   * after, waiting again for a new push on B1
   */
  it("Temporal transitions", () => {
    const button: ButtonBrick = new ButtonBrick("BUTTON", 10);
    const led: LedBrick = new LedBrick("LED", 13);

    const onState: State = new State("on");
    const offState: State = new State("off");

    const onCommandBlock: CommandBlock = new CommandBlock([
      led.toUp(),
      new DelayCommand(800),
      offState.callState(),
    ]);
    const offCommandBlock: CommandBlock = new CommandBlock([led.toDown()]);

    const conditionToGoUp: ConditionalBlock = new ConditionalBlock(
      [button.isActive()],
      null,
      new CommandBlock([onState.callState()]),
      new CommandBlock([offState.callState()])
    );

    onState.addBlock(onCommandBlock);
    offState.addBlock(offCommandBlock);
    offState.addBlock(conditionToGoUp);

    const application: Application = new Application(
      [button, led],
      [onState, offState],
      [offState.callState()]
    );
    console.log(application.export());
  });
});
