

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class Queue {
    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    enqueue(value) {
        let node = new Node(value);

        if(this.size === 0) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.size ++;
    }

    dequeue() {
        if(this.size ===  0) return;

        let current = this.head;

        if(this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }
        this.size --;
        return current.value;
    }

    printQueue() {
        let current = this.head;
        let str = '';
        while(current) {
            str += current.value+" ";
            current = current.next;
        }
        console.log(str);
    }
}

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);

console.log(queue.dequeue())
console.log(queue.dequeue())

queue.printQueue();


// Time complexity: O(1) for enqueue and dequeue Searching and accessing takes O(N)
