import {AbstractCacheAlgo} from "../../AbstractCacheAlgo";
import {ICacheAlgo} from "../../inteface/ICacheAlgo";
import {DoublyLinkedList, DoublyLinkedListNode} from "./LinkedList";

export class CacheLRU<K, V> extends AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V> {
    //todo remove this!
    public linkedList = new DoublyLinkedList<K, V>();
    // private linkedList = new DoublyLinkedList<K, V>();
    public cacheMap = new Map<K, DoublyLinkedListNode<K, V>>();
    // private cacheMap = new Map<K, DoublyLinkedListNode<K, V>>();
    _capacity = 3;
    isFull = () => this._capacity === this.cacheMap.size;

    getElement(key: K): V | undefined {
        const existingNode = this.cacheMap.get(key);
        if (existingNode) {
            const value = existingNode.value;
            // Make the node as new Head of LinkedList if not already
            if (this.linkedList.head !== existingNode) {
                this.linkedList.remove(existingNode);
                this.linkedList.addFirst(key, value);
            }
            return value;
        } else {
            return undefined;
        }
    }

    removeElement(key: K): boolean {
        const existingNode = this.cacheMap.get(key);
        if (existingNode) {
            this.linkedList.remove(existingNode);
        }
        return this.cacheMap.delete(key);
    }

    //If during the setElement function some key was removed - the removed
    // key will be returned, otherwise undefined????
    setElement(key: K, value: V): K | undefined {
        const existingNode = this.cacheMap.get(key);
        if (existingNode) {
            this.removeElement(key);
        } else if (this.isFull()) {
            this.cacheMap.delete(this.linkedList.tail.key);
            this.linkedList.removeLast();
        }
        this.linkedList.addFirst(key, value);
        this.cacheMap.set(key, this.linkedList.head);
        return key;
    }
}

const t = new CacheLRU();
t.setElement(1, 1);
t.setElement(2, 2);
t.setElement(3, 3);
t.setElement(4, 4);
console.log(t.cacheMap);
console.log(t.linkedList);