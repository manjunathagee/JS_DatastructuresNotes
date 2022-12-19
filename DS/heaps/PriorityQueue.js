class Node {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(value, priority) {
        let node = new Node(value, priority);
        this.values.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.values.length -1;
        let element = this.values[idx];

        while(idx > 0) {
            let parentIdx = Math.floor((idx-1)/2);
            let parent = this.values[parentIdx];

            if(element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    dequeue() {
        let first = this.values[0];
        let last = this.values.pop();

        if(this.values.length > 0) {
            this.values[0] = last;
            this.sinkDown();
        }

        return first;
    }

    sinkDown() {
        let element = this.values[0];
        let idx = 0;
        let length = this.values.length;
        

        while(true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let swap = null;
            let leftChild, rightChild;

            if(leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if(leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }

            if(rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if(
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority) 
                ) {
                    swap = rightChildIdx;
                }
            }

            if(swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }

    toString() {
        return this.values.map(element => `${element.value} - ${element.priority}`);
    }
}

let ER = new PriorityQueue();
ER.enqueue("common cold",5)
ER.enqueue("gunshot wound", 1)
ER.enqueue("high fever",4)
ER.enqueue("broken arm",2)
ER.enqueue("glass in foot",3)


//[41, 39, 55, 18, 27, 33] 55
// 0   1   2   3    4   5
