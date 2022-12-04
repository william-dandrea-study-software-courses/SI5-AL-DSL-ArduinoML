

export class NamedElement {

    protected readonly _name: string;

    /**
     * @param {string} name: Name of the element
     */
    public constructor(name: string) {
        this._name = name;
    }


    /**
     * @return {string}
     */
    get name(): string {
        return this._name;
    }
}
