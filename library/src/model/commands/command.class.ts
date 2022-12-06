

export class Command {

    private readonly _value: string;


    constructor(value: string) {
        this._value = value;
    }


    public export(): string {
        return this._value;
    }
}
