import {ICacheAlgo} from "inteface/ICacheAlgo";
import {AbstractCacheAlgo} from "AbstractCacheAlgo";

class CacheFIFO<K, V> extends AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V> {
    #cache = new Map<K, V>();
    //first is the oldest key
    #keysQueue: Array<K> = [];
    #oldestKey: number = 0;

    #isFull = () => this._capacity === this.#cache.size;

    _capacity = 4;

    getElement(key: K): V | undefined {
        return this.#cache.get(key);
    };

    removeElement(key: K): boolean {
        const idx: number = this.#keysQueue.indexOf(key);
        if (idx > -1) {
            this.#keysQueue.splice(idx, 1);
            this.#cache.delete(key);
            return true;
        }
        return false;
    }

    setElement(key: K, value: V): K | undefined {
        let returnValue = undefined;
        if (this.#cache.has(key)) {
            //todo - not sure if need to remove or just update
            returnValue = key;
        } else if (this.#isFull()) {
            if (this.#oldestKey === this._capacity) {
                this.#oldestKey = 0;
            }
            this.#keysQueue[this.#oldestKey] = key;
            this.#oldestKey += 1;
        }
        this.#cache.set(key, value);
        return returnValue;
    }

}


const test = new Map()

test.set('a', 1)
test.set('b', 2)
test.set('c', 3)
test.set('d', 4)
test.delete('d')

console.log(test)

const testArray = [1, 2, 3]
const argument = testArray.splice(1, 1)
console.log(argument[0])