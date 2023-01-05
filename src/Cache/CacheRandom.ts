import { ICacheAlgo } from "inteface/ICacheAlgo";
import { AbstractCacheAlgo } from "AbstractCacheAlgo";

class CacheRandom<K,V> extends AbstractCacheAlgo<K,V> implements ICacheAlgo<K,V> {
    #cacheStorage = new Map<K,V>();
    #keysQueueArray: [] = [];

    // 50 just for now...
    #capacity: number = 50;

    isFull() {return this.#cacheStorage.size === this.#capacity}

    getElement(key: K): V | undefined {
        const result = this.#cacheStorage.get(key);
        return result;
    };


    removeElement (key: K): boolean {
        const idx: number = this.#keysQueueArray.indexOf(key);
        if (idx > -1) {
            this.#keysQueueArray.splice(idx, 1);
            this.#cacheStorage.delete(key);
            return true;
        }
        return false;
    };

    setElement (key: K, value: V): K | undefined {
        if (this.#cacheStorage.has(key)) {
            this.removeElement(key);
            this.setElement(key, value);
            return key
        };

        if (!this.isFull()) {
            this.#cacheStorage.set(key, value);
            this.#keysQueueArray.push(key);
        };

        const randomIdxPick = Math.floor(Math.random()*this.#capacity);
        const keypicked = this.#keysQueueArray[randomIdxPick];
        this.removeElement(keypicked);

        this.setElement(key, value);
    };
    
};