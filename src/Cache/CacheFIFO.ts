import {ICacheAlgo} from "inteface/ICacheAlgo";
import {AbstractCacheAlgo} from "../AbstractCacheAlgo";

class CacheFIFO<K, V> extends AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V> {

    //todo remove this-
    public cache = new Map<K, V>();
    // //first is the oldest key
    public keysQueue: Array<K> = [];
    public oldestKey: number = 0;
    // cache = new Map<K, V>();
    // //first is the oldest key
    // keysQueue: Array<K> = [];
    // oldestKey: number = 0;

    isFull = () => this._capacity === this.cache.size;

    _capacity = 4;

    getElement(key: K): V | undefined {
        return this.cache.get(key);
    };

    removeElement(key: K): boolean {
        const idx: number = this.keysQueue.indexOf(key);
        if (idx > -1) {
            this.keysQueue.splice(idx, 1);
            this.cache.delete(key);
            return true;
        }
        return false;
    }

    setElement(key: K, value: V): K | undefined {
        let returnValue = undefined;
        if (this.cache.has(key)) {
            //todo - not sure if need to remove or just update
            this.removeElement(key);
            returnValue = key;
        } else if (this.isFull() && this.oldestKey === this._capacity) {
            this.oldestKey = 0;
        }
        this.keysQueue[this.oldestKey] = key;
        this.oldestKey += 1;
        this.cache.set(key, value);
        return returnValue;
    }

}

const t = new CacheFIFO();
t.setElement(1, 1);
console.log(t.cache, t.oldestKey, t.keysQueue);