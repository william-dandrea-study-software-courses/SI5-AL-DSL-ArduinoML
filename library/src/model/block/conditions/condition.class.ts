import { Block } from "../block.class";

export abstract class Condition extends Block {
  // composition of block (first level of composition)
  protected children: Block[] = [];

  // composition of conditions (second level of composition)
  protected parent: Condition | null;

  // relative to block composition
  public add(component: Block): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: Block): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }

  // domain related
  public abstract export(): string;
}
