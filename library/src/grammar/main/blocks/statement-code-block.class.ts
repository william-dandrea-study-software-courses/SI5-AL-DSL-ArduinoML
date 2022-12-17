import {CodeBlock} from "./code-block.class";
import {Statement} from "../../../model/block/statements/statement.class";
import {Block} from "../../../model/block/block.class";


export class StatementCodeBlock extends CodeBlock {

    private readonly _statement: Statement;

    constructor(statement: Statement) {
        super();
        this._statement = statement;
    }

    getContent(): Block {
        return this._statement;
    }




}
