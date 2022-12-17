import { Block } from "../block.class";

export abstract class Statement extends Block {
  public abstract export(): string;

  public isComposite(): boolean {
    return false;
  }
}
