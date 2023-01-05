import {AbstractCacheAlgo} from "../AbstractCacheAlgo";
import {ICacheAlgo} from "../inteface/ICacheAlgo";
import {DoublyLinkedList, DoublyLinkedListNode} from "../LinkedList";

export class CacheLRU<K, V> extends AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V> {
    #linkedList = new DoublyLinkedList<K, V>();
    #cacheMap = new Map<K, DoublyLinkedListNode<K, V>>();
    isNotFull = () => this._capacity != this.#cacheMap.size;

    getElement(key: K): V | undefined {
        const existingNode = this.#cacheMap.get(key);
        if (existingNode) {
            const value = existingNode.value;
            // Make the node as new Head of LinkedList if not already
            if (this.#linkedList.head !== existingNode) {
                this.#linkedList.remove(existingNode);
                this.#linkedList.addFirst(key, value);
            }
            return value;
        } else {
            return undefined;
        }
    }

    removeElement(key: K): boolean {
        const existingNode = this.#cacheMap.get(key);
        if (existingNode) {
            this.#linkedList.remove(existingNode);
        }
        return this.#cacheMap.delete(key);
    }

    //If during the setElement function some key was removed - the removed
    // key will be returned, otherwise undefined????
    setElement(key: K, value: V): K | undefined {
        const existingNode = this.#cacheMap.get(key);
        if (existingNode) {
            this.#linkedList.remove(existingNode);
        } else if (!this.isNotFull()) {
            this.#cacheMap.delete(this.#linkedList.tail.key);
            this.#linkedList.removeLast();
        }
        this.#linkedList.addFirst(key, value)
        this.#cacheMap.set(key, this.#linkedList.head);
        return key;
    }
}