import * as fs from 'fs';

import * as mocha from 'mocha';
import * as chai from 'chai';
import {Action, Actuator, Application, Sensor, Signal, State, Transition} from "../src";
import {Buzzer} from "../src/model/bricks/buzzer.class";
import {SignalAction} from "../src/model/actions/signal-action.class";
import {SignalState} from "../src/model/states/signal-state.class";
import {MelodyState} from "../src/model/states/melody-state.class";
import {DelayAction} from "../src/model/actions/delay-action.class";
import {BuzzerAction} from "../src/model/actions/buzzer-action.class";
import {StateTransition} from "../src/model/transitions/state-transition.class";
import {SensorTransition} from "../src/model/transitions/sensor-transition.class";


const expect = chai.expect;
describe('Model Library', () => {

    it('should be able to add things correctly' , () => {

        const button = new Sensor('BUTTON', 9);
        const led = new Actuator("LED", 12);

        const on = new SignalState("on", [new SignalAction(led, Signal.HIGH)])
        const off = new SignalState("off", [new SignalAction(led, Signal.LOW)])

        const switchOn: SensorTransition = new SensorTransition(button, Signal.HIGH, on);
        const switchOff: SensorTransition = new SensorTransition(button, Signal.HIGH, off);

        on.transition = switchOff;
        off.transition = switchOn;

        const app = new Application("Switch!", [button, led], [off, on])

        fs.writeFile('output.ino', app.export(), (err) => {
            if (err) {
                throw new Error(err.message);
            }
        })
    });


    it("Should create a tone melody", () => {
        const buzzer: Buzzer = new Buzzer('BUZZER', 12);

        const play1: MelodyState = new MelodyState("PLAY_SONG_1", [new BuzzerAction(buzzer, 2637, 200), new DelayAction(null, 400)])
        const play2: MelodyState = new MelodyState("PLAY_SONG_2", [new BuzzerAction(buzzer, 1975, 200), new DelayAction(null, 200)])

        const switchToNext: StateTransition = new StateTransition(play1, play2);
        play1.transition = switchToNext;

        const app = new Application("Switch!", [buzzer], [play1, play2])

        console.log(app.export())
    })

});

/**
 * tone(PIN_BUZZER, 2637, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 1975, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2093, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2349, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 2093, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 1975, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 1760, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 1760, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2093, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2637, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 2349, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2093, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 1975, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 1975, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2093, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2349, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 2637, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 2093, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 1760, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 1760, 200);
 *   delay(800);
 *   tone(PIN_BUZZER, 1760, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 2349, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2794, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 3520, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 3136, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2794, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2637, 200);
 *   delay(600);
 *   tone(PIN_BUZZER, 2093, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2637, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 2349, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2093, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 1975, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 1975, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2093, 200);
 *   delay(200);
 *   tone(PIN_BUZZER, 2349, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 2637, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 2093, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 1760, 200);
 *   delay(400);
 *   tone(PIN_BUZZER, 1760, 200);
 *   delay(800);
 */
