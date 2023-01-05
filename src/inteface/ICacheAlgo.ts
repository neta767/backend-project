export interface ICacheAlgo<K,V> {
    /**
     * Returns the value to which the specified key is mapped or undefined
     * if this cache contains no mapping for the key
     * @param key
     */
    getElement:(key:K)=>V|undefined;
    /**
     * Associates the specified value with the specified key in this cache.
     * @param key
     * @param value
     */
    setElement:(key:K,value: V)=>K|undefined;
    /**
     * Removes the mapping for the specified key from this cache if present.
     * If it was present - return true, otherwise false.
     * @param key
     */
    removeElement:(key :K)=>boolean;
}