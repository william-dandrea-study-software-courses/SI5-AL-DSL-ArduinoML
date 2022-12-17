export abstract class Brick {
  protected readonly _name: string;
  protected readonly _pin: number;

  protected constructor(name: string, pin: number) {
    this._name = name;
    this._pin = pin;
  }

  declare(): string {
    return `int ${this._name} = ${this._pin};`;
  }

  abstract setup(): string;

  get pin(): number {
    return this._pin;
  }

  get name(): string {
    return this._name;
  }
}
