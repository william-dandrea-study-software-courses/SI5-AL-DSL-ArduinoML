import {Block} from "./block.class";
import {Condition} from "../utils/condition.class";
import {Command} from "../utils/command.class";
import {CommandBlock} from "./command-block.class";

export enum Operator {
    AND = "&",
    OR = "|",
}

export class ConditionalBlock extends Block {

    private readonly _conditions: Condition[];
    private readonly _operator: Operator | null;
    private readonly _commandBlock: CommandBlock;

    constructor(conditions: Condition[], operator: Operator | null, commandBlock: CommandBlock) {
        super();
        this._conditions = conditions;
        this._operator = operator;
        this._commandBlock = commandBlock;
    }

    export(): string {
        let result: string = "";

        result += `if (`
        this._conditions.forEach((condition, index, array) => {
            result += `${condition.value}`;

            if (index != array.length - 1 && this._operator != null) {        // If it not the last element, we add an opeartor
                result += `${this._operator}`;
            }
        })
        result += `) {\n`

        const blockCommands: string = this._commandBlock.export();
        result += blockCommands.replace(/^/gm, '\t');   // On ajoute une tabulation à chaque ligne
        result += `}`;

        return result;
    }
}
