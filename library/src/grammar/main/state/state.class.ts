import {CodeBlock} from "../blocks/code-block.class";
import {RegularCodeBlock} from "../blocks/regular-code-block.class";
import {StateModel} from "../../../model/states/state.class";


export class State {

    private readonly _name: string;
    private _codeBlock: RegularCodeBlock;

    constructor(name: string) {
        this._name = name;
        this._codeBlock = new RegularCodeBlock();
    }


    get codeBlock(): RegularCodeBlock {
        return this._codeBlock;
    }


    public getContent(): StateModel {
        const state: StateModel = new StateModel(this._name, this._codeBlock.getContent());
        return state;
    }
}
