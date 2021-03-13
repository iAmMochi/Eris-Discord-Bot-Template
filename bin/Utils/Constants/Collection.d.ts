export declare class Collection<K, V> extends Map<K, V> {
    maxSize?: number;
    set(key: K, value: V): this;
    array(): V[];
    first(): V;
    last(): V;
    random(): V;
    find(callback: (value: V, key: K) => boolean): NonNullable<V> | undefined;
    filter(callback: (value: V, key: K) => boolean): Collection<K, V>;
    map<T>(callback: (value: V, key: K) => T): T[];
    some(callback: (value: V, key: K) => boolean): boolean;
    every(callback: (value: V, key: K) => boolean): boolean;
    reduce<T>(callback: (accumulator: T, value: V, key: K) => T, initialValue?: T): T;
}
