/**
 * Enumeration of signal values.
 */
export class SIGNAL {
    static LOW = new SIGNAL("LOW");
    static HIGH = new SIGNAL("HIGH");

    /**
     * @param {string} value: LOW / HIGH
     */
    constructor(value) {
        this._value = value;
    }


    /**
     * @return {string}
     */
    get value() {
        return this._value;
    }
}
