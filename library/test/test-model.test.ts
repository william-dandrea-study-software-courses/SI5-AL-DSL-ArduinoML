import * as mocha from 'mocha';
import * as chai from 'chai';
import {Action, Actuator, Application, Sensor, Signal, State, Transition} from "../src";

const expect = chai.expect;
describe('Model Library', () => {

    it('should be able to add things correctly' , () => {

        const button = new Sensor('BUTTON', 9);
        const led = new Actuator("LED", 12);

        const on = new State("on", [new Action(Signal.HIGH, led)])
        const off = new State("off", [new Action(Signal.LOW, led)])

        const switchOn = new Transition(button, Signal.HIGH, on);
        const switchOff = new Transition(button, Signal.HIGH, off);

        on.transition = switchOff;
        off.transition = switchOn;

        const app = new Application("Switch!", [button, led], [off, on])

        console.log(app.export())
    });

});
