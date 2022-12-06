import {Command} from "./command.class";


export class DelayCommand extends Command {

    private readonly _delayInMs: number;

    constructor(delayInMs: number) {
        super(`delay(${delayInMs});`);
        this._delayInMs = delayInMs;
    }

    export(): string {
        return `delay(${this._delayInMs});`;
    }
}
