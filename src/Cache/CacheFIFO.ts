import {ICacheAlgo} from "inteface/ICacheAlgo";
import {AbstractCacheAlgo} from "../AbstractCacheAlgo";

export class CacheFIFO<K, V> extends AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V> {

    private cache = new Map<K, V>();
    // //first is the oldest key
    private keysQueue: Array<K> = [];
    private oldestKey: number = 0;

    isFull = () => this._capacity === this.cache.size;


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