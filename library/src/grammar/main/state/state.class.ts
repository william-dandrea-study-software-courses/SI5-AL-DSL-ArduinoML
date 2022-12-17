import {CodeBlock} from "../blocks/code-block.class";
import {RegularCodeBlock} from "../blocks/regular-code-block.class";
import {StateModel} from "../../../model/states/state.class";
import {StatementCodeBlock} from "../blocks/statement-code-block.class";
import {SwitchStateStatement} from "../../../model/block/statements/switch-state-statement.class";


export class State {

    private readonly _name: string;
    private _codeBlock: RegularCodeBlock;

    private _modelState: StateModel;

    constructor(name: string) {
        this._name = name;
        this._codeBlock = new RegularCodeBlock();
        this._modelState = new StateModel(this._name, []);
    }


    get codeBlock(): RegularCodeBlock {
        return this._codeBlock;
    }

    public callState(): CodeBlock {
        return new StatementCodeBlock(new SwitchStateStatement(this._modelState));
    }


    public getContent(): StateModel {
        return new StateModel(this._name, this._codeBlock.getContent());
    }
}
