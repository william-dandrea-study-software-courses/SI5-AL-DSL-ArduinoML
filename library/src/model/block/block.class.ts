export abstract class Block {
  protected parent: Block | null;

  public abstract export(): string;

  public setParent(parent: Block | null) {
    this.parent = parent;
  }
}
