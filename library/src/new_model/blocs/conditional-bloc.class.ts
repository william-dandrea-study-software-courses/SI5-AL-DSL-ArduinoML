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
    private readonly _commandBlockIf: CommandBlock;
    private readonly _commandBlockElse: CommandBlock;

    constructor(conditions: Condition[], operator: Operator | null, commandBlockIf: CommandBlock, commandBlockElse: CommandBlock) {
        super();
        this._conditions = conditions;
        this._operator = operator;
        this._commandBlockIf = commandBlockIf;
        this._commandBlockElse = commandBlockElse;
    }

    export(): string {
        let result: string = "";

        result += `\nif (`
        this._conditions.forEach((condition, index, array) => {
            result += `${condition.value}`;

            if (index != array.length - 1 && this._operator != null) {        // If it not the last element, we add an opeartor
                result += `${this._operator}`;
            }
        })
        result += `) {\n`

        const blockCommandsIf: string = this._commandBlockIf.export();
        result += blockCommandsIf.replace(/^/gm, '\t');   // On ajoute une tabulation à chaque ligne
        result += `\n} else {\n`;

        // Else bloc
        const blockCommandsElse: string = this._commandBlockElse.export();
        result += blockCommandsElse.replace(/^/gm, '\t');   // On ajoute une tabulation à chaque ligne
        result += `\n}`;


        return result;
    }
}
