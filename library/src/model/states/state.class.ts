import {Block} from "../blocs/block.class";
import {Command} from "../commands/command.class";


export class State {
    private readonly _name: string;
    private _blocs: Block[] = [];

    constructor(name: string) {
        this._name = name;
    }

    public addBlock(block: Block): void {
        this._blocs.push(block);
    }

    public callState(): Command {
        return new Command(`state_${this._name}();`)
    }

    export(): string {
        let result = '';

        result += (`void state_${this._name}() {` + `\n`);

        this._blocs.forEach(block => {
            result += block.export().replace(/^/gm, '\t');
            // result += block.export().replace(/^/gm, '\t');
        })

        result += `\n}`
        return result;
    }
}
