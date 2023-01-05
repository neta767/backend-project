import {AbstractCacheAlgo} from "../AbstractCacheAlgo";
import {ICacheAlgo} from "../inteface/ICacheAlgo";
import {DoublyLinkedList} from "../LinkedList";

export class CacheLRU<K, V> extends AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V> {
    #cache = new DoublyLinkedList<K, V>();

    isNotFull = () => this._capacity != this.#cache.length();

    getElement(key: K): V | undefined {
        let current = this.#cache.get(key);
        if (current) {
            current.prev.next = current.next;
            current.next.prev = current.prev;
            this.#cache.tail.prev.next = current; // insert it after last element. Element before tail
            current.prev = this.#cache.tail.prev; // update current.prev and next pointer
            current.next = this.#cache.tail;
            this.#cache.tail.prev = current; // update last element as tail
            return current.value;
        } else {
            return undefined;
        }
    }

    removeElement(key: K): boolean {
        return this.#cache.remove(key)
    }

    setElement(key: K, value: V): K | undefined {
        if (this.#cache.get(key)) {
            // if key does not exist, update last element value
            this.#cache.tail.prev.value = value;
        } else {
            // check if #cache size is at capacity
            if (this.isNotFull) {
                //delete item both from #cache and DLL
                this.#cache.head.next = this.#cache.head.next.next;
                this.#cache.head.next.prev = this.#cache.head;
                this.#cache.removeFirst(); // delete first element of list
            }
            this.#cache.addFirst(value); // add current node to #cache
        }
    }
}