


export class Utils {


    static isString = (obj) => {
        const toString = Object.prototype.toString;
        return toString.call(obj) === '[object String]';
    }
}
