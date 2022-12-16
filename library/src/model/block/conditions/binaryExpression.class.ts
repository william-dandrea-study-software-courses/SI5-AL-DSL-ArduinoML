import { OPERATOR } from "../../utils/operator.enum";
import { Condition } from "./condition.class";

export class BinaryExpression extends Condition {
  // composition of condition (second level of composition)
  protected children: Condition[] = [];

  // domain relative
  protected readonly _operator: OPERATOR;

  protected constructor(operator: OPERATOR) {
    super();
    this._operator = operator;
  }

  public add(component: Condition): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: Condition): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }

  public export(): string {
    let result: string = '';
    for (let i = 0; i < this.children.length; i++) {
      result += this.children[i].export();
      if (i != this.children.length - 1) {
        result += ` ${this._operator} `
      }
    }
    return result;
  }
}
