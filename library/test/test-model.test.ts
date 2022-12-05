import * as fs from 'fs';
import * as chai from 'chai';
import {Actuator, Application, Sensor, Signal} from "../src";
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

        const frequencies: number[] = [2637, 1975, 2093, 2349, 2093, 1975, 1760, 1760, 2093, 2637, 2349, 2093, 1975, 1975, 2093, 2349, 2637, 2093, 1760, 1760, 1760, 2349, 2794, 3520, 3136, 2794, 2637, 2093, 2637, 2349, 2093, 1975, 1975, 2093, 2349, 2637, 2093, 1760, 1760]
        const delay: number[] = [400, 200, 200, 400, 200, 200, 400, 200, 200, 400, 200, 200, 400, 200, 200, 400, 400, 400, 400, 800, 400, 200, 200, 400, 200, 200, 600, 200, 400, 200, 200, 400, 200, 200, 400, 400, 400, 400, 800]


        const melodies: MelodyState[] = [];
        let lastMelody: MelodyState = new MelodyState("PLAY_SONG_0", [new BuzzerAction(buzzer, 2637, 200), new DelayAction(null, 400)])
        melodies.push(lastMelody);

        for (let i = 1; i < frequencies.length - 1; i++) {
            const currentMelody: MelodyState = new MelodyState(`PLAY_SONG_${i}`, [new BuzzerAction(buzzer, frequencies[i], 200), new DelayAction(null, delay[i])])
            lastMelody.transition = new StateTransition(lastMelody, currentMelody);
            melodies.push(currentMelody);
            lastMelody = currentMelody;
        }

        const app = new Application("Switch!", [buzzer], melodies)

        console.log(app.export())

        fs.writeFile('output_song.ino', app.export(), (err) => {
            if (err) {
                throw new Error(err.message);
            }
        })
    });

    /**
     * Pushing a button activates a LED and a buzzer. Releasing the button switches
     * the actuators off.
     */
    it("Very simple alarm", () => {


        const button = new Sensor('BUTTON', 9);
        const led = new Actuator("LED", 12);
        const buzzer = new Buzzer("buzzer", 13);

        const on = new SignalState("on", [new SignalAction(led, Signal.HIGH), new SignalAction(buzzer, Signal.HIGH)])
        const off = new SignalState("off", [new SignalAction(led, Signal.LOW), new SignalAction(buzzer, Signal.LOW)])

        const switchOn: SensorTransition = new SensorTransition(button, Signal.HIGH, on);
        const switchOff: SensorTransition = new SensorTransition(button, Signal.HIGH, off);

        on.transition = switchOff;
        off.transition = switchOn;

        const app = new Application("Switch!", [button, led, buzzer], [off, on])

        console.log(app.export())

    });

    /**
     * It will trigger a buzzer if and only if two buttons are pushed at the very same time. Releasing at least one of the button stop the sound.
     */
    it("Dual-check alarm", () => {

        const button1 = new Sensor('BUTTON', 9);
        const button2 = new Sensor('BUTTON', 10);

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
