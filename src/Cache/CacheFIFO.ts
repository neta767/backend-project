import {ICacheAlgo} from "inteface/ICacheAlgo";
import {AbstractCacheAlgo} from "../AbstractCacheAlgo";
import {expect} from "chai";

export class CacheFIFO<K, V> extends AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V> {

    public cache = new Map<K, V>();
    // //first is the oldest key
    public keysQueue: Array<K> = [];
    public oldestKeyIndex: number = 0;

    isFull = () => this._capacity === this.keysQueue.length;


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
            this.keysQueue.push(key)
            this.oldestKeyIndex -= 1;
            if (this.oldestKeyIndex === this._capacity) {
                this.oldestKeyIndex = 0;
            }
        } else if (this.isFull()) {
            returnValue = this.keysQueue[this.oldestKeyIndex];
            this.cache.set(key, value);
            this.keysQueue[this.oldestKeyIndex] = key;
            this.cache.delete(returnValue)
            this.oldestKeyIndex += 1;
            if (this.oldestKeyIndex === this._capacity) {
                this.oldestKeyIndex = 0;
            }
        } else {
            this.keysQueue.push(key)
        }
        this.cache.set(key, value);
        return returnValue;
    }
}

// todo not working
const cache = new CacheFIFO(3)
console.log(cache.setElement('k1', 1))
// Cache.setElement('k2', 2)
// Cache.setElement('k3', 3)
// console.log('>>>>>', Cache.setElement('k4', 4))
// console.log(Cache.Cache, Cache.keysQueue)
// console.log(Cache.setElement('k6', 6))
// console.log(Cache.Cache, Cache.keysQueue)
// console.log(Cache.setElement('k6', 7))
// console.log(Cache.Cache, Cache.keysQueue)
// console.log(Cache.setElement('k7', 7))
// console.log(Cache.Cache, Cache.keysQueue)