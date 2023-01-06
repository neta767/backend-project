export class DoublyLinkedListNode<K, V> {
    public key: K;
    public value: V;
    public next: DoublyLinkedListNode<K, V> | null = null;
    public prev: DoublyLinkedListNode<K, V> | null = null;

    constructor(key: K, value: V, next: DoublyLinkedListNode<K, V> = null, prev: DoublyLinkedListNode<K, V> = null) {
        this.key = key;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}


export class DoublyLinkedList<K, V> {
    public head: DoublyLinkedListNode<K, V>;
    public tail: DoublyLinkedListNode<K, V>;
    public size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        //not sure if needed-
        this.size = 0;
    }

    public addFirst(key: K, value: V): void {
        if (!this.head) {
            this.head = this.tail = new DoublyLinkedListNode<K, V>(key, value);
        } else {
            const node = new DoublyLinkedListNode(key, value, this.head);
            this.head.prev = node;
            this.head = node;
        }
        this.size += 1;
    }

    public remove(existingNode: DoublyLinkedListNode<K, V>): void {
        if (!existingNode.prev !== null) {
            existingNode.prev.next = existingNode.next;
        } else {
            this.head = existingNode.next;
        }
        if (existingNode.next !== null) {
            existingNode.next.prev = existingNode.prev;
        } else {
            this.tail = existingNode.prev;
        }
        this.size -= 1;
    }

    public removeLast() {
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.size -= 1;
    }
}