import {Utils} from "../utils/utils";


export class NamedElement {

    /***
     * @param {string} name: Name of the element
     */
    constructor(name) {
        if (!Utils.isString(name)) {
            throw new Error("The type of name have to be a string")
        }

        this._name = name;
    }


    /**
     * @return {string}
     */
    get name() {
        return this._name;
    }
}
