import {StatementCodeBlock} from "../statement-code-block.class";
import {DelayStatement} from "../../../../model/block/statements/delay-statement.class";


export class DelayStatementCodeBlock extends StatementCodeBlock{

    private readonly _delay: number;

    constructor(delay: number) {
        super(new DelayStatement(delay));
        this._delay = delay;
    }
}
