import {Component} from "./component.class";


export class Led extends Component {

    constructor(name: string, pin: number) {
        super(name, pin);
    }

    public lightOn(): void {}

    public lightOf(): void {}
}
