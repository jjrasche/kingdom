export { }; // this will make it module

declare global {
    interface Array<T> {
        groupBy(method: (item: T) => string): {[key: string]: T[]};
    }
}

Array.prototype.groupBy = function (method: (item: any) => any): {[key: string]: any[]} {
    return this.reduce(function(rv, x) {
        (rv[method(x)] = rv[method(x)] || []).push(x);
        return rv;
    }, {});
};
