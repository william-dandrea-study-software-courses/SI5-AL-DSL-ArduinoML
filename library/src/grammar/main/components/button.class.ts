import {Component} from "./component.class";


export class Button extends Component {

    constructor(name: string, pin: number) {
        super(name, pin);
    }

    public isPressed(): void {}
    public isNotPressed(): void {}
}
