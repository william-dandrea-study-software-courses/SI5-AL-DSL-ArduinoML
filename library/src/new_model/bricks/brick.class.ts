

export abstract class Brick {

    protected readonly _name: string;
    protected readonly _pin: number;

    protected constructor(name: string, pin: number) {
        this._name = name;
        this._pin = pin;
    }

    abstract declare(): string;
    abstract setup(): string;
}
