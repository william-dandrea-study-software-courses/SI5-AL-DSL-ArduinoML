import { Block } from "../block/block.class";

export class StateModel {
  private readonly _name: string;
  private readonly _block: Block[];

  constructor(name: string, block: Block[]) {
    this._name = name;
    this._block = block;
  }

  get name(): string {
    return `state_${this._name}`;
  }

  public addBlock(block: Block): void {
    this._block.push(block);
  }

  export(): string {
    let result = "";

    result += `void state_${this._name}() {` + `\n`;

    this._block.forEach(b => {
      result += b.export().replace(/^/gm, "\t") + `\n`;
    })

    result += `\n}`;
    return result;
  }
}
