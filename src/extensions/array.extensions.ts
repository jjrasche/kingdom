import { randomBetween } from "../helpers/number";

export { }; // this will make it module

declare global {
    interface Array<T> {
        groupBy(method: (item: T) => string): {[key: string]: T[]};
        random(): T;
    }
}

Array.prototype.groupBy = function (method: (item: any) => any): {[key: string]: any[]} {
    return this.reduce(function(rv, x) {
        (rv[method(x)] = rv[method(x)] || []).push(x);
        return rv;
    }, {});
};

Array.prototype.random = function (): any {
    return this[randomBetween(0, this.length -1)];
};