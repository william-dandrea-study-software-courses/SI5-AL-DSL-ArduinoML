import {Brick} from "../../../model/bricks/brick.class";


export abstract class Component {
    protected readonly _name: string;
    protected readonly _pin: number;

    protected constructor(name: string, pin: number) {
        this._name = name;
        this._pin = pin;
    }


    public abstract getContent(): Brick;
}
