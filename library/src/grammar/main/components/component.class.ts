


export abstract class Component {
    protected readonly _name: string;
    private readonly _pin: number;

    protected constructor(name: string, pin: number) {
        this._name = name;
        this._pin = pin;
    }


    // public abstract getContent() {}
}
