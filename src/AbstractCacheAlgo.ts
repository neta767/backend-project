export abstract class AbstractCacheAlgo<K,V> {
    _capacity:number;
    constructor (capacity: number) {
        this._capacity = capacity
    }
}