"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const chooseRandom_1 = require("./chooseRandom");
class Collection extends Map {
    set(key, value) {
        if ((this.maxSize || this.maxSize === 0) && this.size >= this.maxSize) {
            return this;
        }
        return super.set(key, value);
    }
    array() {
        return [...this.values()];
    }
    first() {
        return this.values().next().value();
    }
    last() {
        return [...this.values()][this.size - 1];
    }
    random() {
        return chooseRandom_1.randomizer([...this.values()]);
    }
    find(callback) {
        for (const key of this.keys()) {
            const value = this.get(key);
            if (callback(value, key))
                return value;
        }
        return;
    }
    filter(callback) {
        const relevant = new Collection();
        this.forEach((value, key) => {
            if (callback(value, key))
                relevant.set(key, value);
        });
        return relevant;
    }
    map(callback) {
        const results = [];
        for (const key of this.keys()) {
            const value = this.get(key);
            results.push(callback(value, key));
        }
        return results;
    }
    some(callback) {
        for (const key of this.keys()) {
            const value = this.get(key);
            if (callback(value, key))
                return true;
        }
        return false;
    }
    every(callback) {
        for (const key of this.keys()) {
            const value = this.get(key);
            if (!callback(value, key))
                return false;
        }
        return true;
    }
    reduce(callback, initialValue) {
        let accumulator = initialValue;
        for (const key of this.keys()) {
            const value = this.get(key);
            accumulator = callback(accumulator, value, key);
        }
        return accumulator;
    }
}
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map