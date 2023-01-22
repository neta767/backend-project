import { ICacheAlgo } from "inteface/ICacheAlgo";
import { AbstractCacheAlgo } from "../AbstractCacheAlgo";

export class CacheRandom<K,V> extends AbstractCacheAlgo<K,V> implements ICacheAlgo<K,V> {
    #cacheStorage = new Map<K,V>();
    #keysArray: Array<K> = [];
   
   

    isFull() {return this.#cacheStorage.size === this._capacity}

    getElement(key: K): V | undefined {
        return this.#cacheStorage.get(key);
    };


    removeElement (key: K): boolean {
        const idx: number = this.#keysArray.indexOf(key);
        if (idx > -1) {
            this.#keysArray.splice(idx, 1);
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
        } 

        if (!this.isFull()) {
            this.#cacheStorage.set(key, value);
            this.#keysArray.push(key);
            return
        };

        const randomIdxPick = Math.floor(Math.random()*this._capacity);
        const keypicked = this.#keysArray[randomIdxPick];
        this.removeElement(keypicked);
        this.setElement(key, value);
        return keypicked;
    };
    
};


