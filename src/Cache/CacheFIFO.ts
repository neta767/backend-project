import { ICacheAlgo } from "inteface/ICacheAlgo";
import { AbstractCacheAlgo } from "AbstractCacheAlgo";

// class CacheFIFO<K,V> extends AbstractCacheAlgo<K,V> implements ICacheAlgo<K,V> {
//     #cacheStorage = new Map<K,V>();
//     #keysQueueArray: [] = [];

//     // 50 just for now...
//     #capacity: number = 50;


//     getElement(key: K): V | undefined {
//         const result = this.#cacheStorage.get(key);
//         return result;
//     };

//     // not sure i need a key here
//     removeElement (key: K): boolean {
//         const KEY = this.#keysQueueArray[0];
//         if (KEY) {
//             this.#keysQueueArray.splice(0, 1);
//             this.#cacheStorage.delete(KEY);
//             return true;
//         }
//         return false;
//     };

//     setElement (key: K, value: V): K | undefined {
//         if (this.#keysQueueArray.length > this.#capacity)
//         return
//     };
    
// };


// const test = new Map()

// test.set('a', 1)
// test.set('b', 2)
// test.set('c', 3)
// test.set('d', 4)
// test.delete('d')

// console.log(test)

// const testArray = [1,2,3]
// const argument = testArray.splice(1,1)
// console.log(argument[0])