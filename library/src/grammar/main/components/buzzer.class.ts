import {Component} from "./component.class";


export class Buzzer extends Component {


    private readonly _frequency: number;
    private readonly _duration: number | null;


    constructor(name: string, pin: number, frequency: number, duration: number | null) {
        super(name, pin);
        this._frequency = frequency;
        this._duration = duration;
    }

    public soundUp(): void {}
    public soundDown(): void {}
}
