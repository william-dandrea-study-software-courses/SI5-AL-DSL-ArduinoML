import { OPERATOR } from "../../utils/operator.enum";
import {DigitalAtomicCondition} from "./digital-atomic-condition.class";
import {ModelCondition} from "./model-condition.class";

export class BinaryExpressionCondition extends ModelCondition {
  // composition of condition (second level of composition)
  protected childrenConditions: ModelCondition[] = [];

  // domain relative
  protected readonly _operator: OPERATOR;

  constructor(operator: OPERATOR) {
    super();
    this._operator = operator;
  }

  public addCondition(component: ModelCondition): void {
    this.childrenConditions.push(component);
    component.setParent(this);
  }

  public removeCondition(component: ModelCondition): void {
    const componentIndex = this.childrenConditions.indexOf(component);
    this.childrenConditions.splice(componentIndex, 1);

    component.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }

  public export(): string {
    let result: string = '';
    for (let i = 0; i < this.childrenConditions.length; i++) {

      const condition: ModelCondition = this.childrenConditions[i];
      if (condition instanceof DigitalAtomicCondition) {
        result += `${condition.exportCondition()}`;
      }

      if (i != this.childrenConditions.length - 1) {
        result += ` ${this._operator} `
      }
    }

    return this.exportAll(result);
  }

}
