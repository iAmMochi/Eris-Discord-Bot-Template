export declare class Collection<K, V> extends Map<K, V> {
    maxSize?: number;
    set(key: K, value: V): this;
    array(): V[];
    first(): V;
    last(): V;
}
