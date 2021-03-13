import { randomizer } from "./chooseRandom";

export class Collection<K, V> extends Map<K, V> {
    maxSize?: number;

    public set(key: K, value: V) {
        if ((this.maxSize || this.maxSize === 0) && this.size >= this.maxSize) {
            return this;
        }

        return super.set(key, value);
    }

    public array() {
        return [...this.values()];
    }

    public first(): V {
        return this.values().next().value();
    }

    public last(): V {
        return [...this.values()][this.size - 1];
    }

    public random() {
        return randomizer([...this.values()]);
    }

    public find(callback: (value: V, key: K) => boolean) {
        for (const key of this.keys()) {
            const value = this.get(key)!;
            if (callback(value, key)) return value;
        }

        return;
    }

    public filter(callback: (value: V, key: K) => boolean) {
        const relevant = new Collection<K, V>();
        this.forEach((value, key) => {
            if (callback(value,  key)) relevant.set(key, value);
        });

        return relevant;
    }

    public map<T>(callback: (value: V, key: K) => T) {
        const results = [];

        for (const key of this.keys()) {
            const value = this.get(key)!;
            results.push(callback(value, key));
        }

        return results;
    }

    public some(callback: (value: V, key: K) => boolean) {
        for (const key of this.keys()) {
            const value = this.get(key)!;
            if (callback(value, key)) return true;
        }

        return false;
    }

    public every(callback: (value: V, key: K) => boolean) {
        for (const key of this.keys()) {
            const value = this.get(key)!;
            if (!callback(value, key)) return false;
        }

        return true;
    }

    public reduce<T>(
        callback: (accumulator: T, value: V, key: K) => T,
        initialValue?: T
    ) {
        let accumulator: T = initialValue!;

        for (const key of this.keys()) {
            const value = this.get(key)!;
            accumulator = callback(accumulator, value, key);
        }

        return accumulator;
    }
}