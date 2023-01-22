
import {ICacheAlgo} from "inteface/ICacheAlgo";
import {AbstractCacheAlgo} from "../AbstractCacheAlgo";

class CacheRandom<K, V> extends AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V> {
    #cacheStorage = new Map<K, V>();
    #keysArray: Array<K> = [];

    // 50 just for now...
    //_capacity = 50;

    isFull() {
        return this.#cacheStorage.size === this._capacity
    }


    getElement(key: K): V | undefined {
        return this.#cacheStorage.get(key);
    };


    removeElement(key: K): boolean {

        const idx: number = this.#keysArray.indexOf(key);
        if (idx > -1) {
            this.#keysArray.splice(idx, 1);
            this.#cacheStorage.delete(key);
            return true;
        }
        return false;
    };

    setElement(key: K, value: V): K | undefined {
        let returnValue = undefined;
        if (this.#cacheStorage.has(key)) {
            this.removeElement(key);

            returnValue = key;
        } else if (this.isFull()) {
            const randomIdxPick = Math.floor(Math.random() * this._capacity);
            const keyPicked = this.#keysArray[randomIdxPick];
            this.removeElement(keyPicked);
            returnValue = keyPicked;
        }
        this.#cacheStorage.set(key, value);
        this.#keysArray.push(key);
        return returnValue;
    }
}

