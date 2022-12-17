import { Block } from "../block.class";

export class Condition extends Block {
  // composition of block (first level of composition)
  protected children: Block[] = [];

  // composition of conditions (second level of composition)
  protected parent: Condition | null;

  // relative to block composition
  public addBlock(component: Block): void {
    this.children.push(component);
    component.setParent(this);
  }

  public removeBlock(component: Block): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }

  // domain related
  protected exportAll(cond: string): string {

    let result: string = '';
    // result += `` + `\n`;

    result += `if (${cond}) {` + `\n`;


    this.children.forEach(child => {
      result += `\t${child.export()}` + `\n`;
    })
    result += `}` + `\n`;


    return result;
  }

  export(): string {
    return "";
  }
}
