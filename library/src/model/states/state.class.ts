import { Block } from "../block/block.class";

export class State {
  private readonly _name: string;
  private readonly _block: Block;

  constructor(name: string, block: Block) {
    this._name = name;
    this._block = block;
  }

  get name(): string {
    return `state_${this._name}`;
  }

  export(): string {
    let result = "";

    result += `void state_${this._name}() {` + `\n`;

    result += this._block.export().replace(/^/gm, "\t");

    result += `\n}`;
    return result;
  }
}
