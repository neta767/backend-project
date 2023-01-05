class DoublyLinkedListNode<K, V> {
    public key: K;
    public value: V;
    public next: DoublyLinkedListNode<K, V> | null = null;
    public prev: DoublyLinkedListNode<K, V> | null = null;
}


export class DoublyLinkedList<K, V> {
    public head: DoublyLinkedListNode<K, V>;
    public tail: DoublyLinkedListNode<K, V>;
    private size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public length(): number {
        return this.size;
    }

    public isEmpty(): boolean {
        return this.size <= 0;
    }

    public get(key: K): DoublyLinkedListNode<K, V> | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        let tmp = this.head;
        while (tmp != null) {
            if (tmp.key === key) {
                return tmp;
            }
            tmp = tmp.next;
        }
        return undefined;
    }

    public addFirst(value: any): void {
        if (this.isEmpty()) {
            let tmp = new DoublyLinkedListNode<K, V>();
            tmp.value = value;
            this.head = tmp;
            this.tail = tmp;
            this.size++;
        } else {
            let tmp = new DoublyLinkedListNode<K, V>();
            tmp.next = this.head;
            tmp.prev = null;
            tmp.value = value;

            this.head.prev = tmp;

            this.head = tmp;
            this.size++;
        }
    }

    public remove(key: any): boolean {
        if (this.isEmpty()) {
            return false;
        }
        let tmp = this.head;
        while (tmp != null) {
            if (tmp.key === key) {
                if (tmp.prev != null) {
                    tmp.prev.next = tmp.next;
                } else {
                    this.head = tmp.next;
                }
                if (tmp.next != null) {
                    tmp.next.prev = tmp.prev;
                } else {
                    this.tail = tmp.prev;
                }
                this.size--;
                return true;
            }

            tmp = tmp.next;
        }
        return false;
    }

    public removeFirst() {
        if (this.isEmpty()) {
            return;
        }
        if (this.size == 1) {
            this.head = null;
            this.tail = null;
            this.size--;

        } else {
            this.head = this.head.next;
            this.head.prev = null;
            this.size--;
        }
    }

    public removeLast() {
        if (this.isEmpty()) {
            return;
        }
        if (this.size == 1) {
            this.head = null;
            this.tail = null;
            this.size--;

        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            this.size--;
        }
    }
}