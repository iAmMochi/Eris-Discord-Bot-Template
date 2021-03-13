"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
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
}
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map