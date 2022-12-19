/*
WHAT IS A BINARY HEAP?
Very similar to a binary search tree, but with some different rules!

In a MaxBinaryHeap, parent nodes are always larger than child nodes.
In a MinBinaryHeap, parent nodes are always smaller than child nodes

MAX BINARY HEAP
* Each parent has at most two child nodes
* The value of each parent node is always greater than its child nodes
* In a max Binary Heap the parent is greater than the children, but there are no guarantees between sibling nodes.
* A binary heap is as compact as possible. 
All the children of each node are as full as they can be and left children are filled out first

Usage:
Binary Heaps are used to implement Priority Queues, which are very commonly used data structures
They are also used quite a bit, with graph traversal algorithms

For any index of an array n, The left child is stored at 2n+1 and the right child is at 2n+2
For any child node at index n, It's parent is at index Math.floor((n-1)/2)

https://cs.slides.com/colt_steele/heaps#/16

MaxBinaryHeap Steps: Add to the end and then bubble up untill it finds it's right spot 
Insert pseudocode;
* Push the value into the values property on the heap
* Bubble Up:
    * Create a variable called index which is the length of the values property - 1
    * Create a variable called parentIndex which is the floor of (index-1)/2
    * Keep looping as long as the values element at the parentIndex is less than the values element at the child index
    * Swap the value of the values element at the parentIndex with the value of the element property at the child index
    * Set the index to be the parentIndex, and start over!
    
Extract root:
* Swap the first value in the values property with the last one
* Pop from the values property, so you can return the value at the end.
* Have the new root "sink down" to the correct spot...​
    * Your parent index starts at 0 (the root)
    * Find the index of the left child: 2 * index + 1 (make sure its not out of bounds)
    * Find the index of the right child: 2*index + 2 (make sure its not out of bounds)
    * If the left or right child is greater than the element...swap. If both left and right children are larger, swap with the largest child.
    * The child index you swapped to now becomes the new parent index.  
    * Keep looping and swapping until neither child is larger than the element.
    * Return the old root!
    * 
Time Complexity: insert O(log N), removal O(log N), Search O(N)
advantage over BST - BST can grow to only one side which leads to O(N) for insert/removal but heaps(min and Max) can never grow to one side, we always fill left and right and it 
grows sideways, but since there is no order b/w siblings like BST search will be O(n)
*/

class BinaryMaxHeap {
    
    constructor() {
        this.values = [];
    }
    
    insert(element) {
        this.values.push(element);
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.values.length -1;
        const element = this.values[idx];

        while(idx > 0) {
            let parentIdx = Math.floor((idx-1)/2);
            let parent = this.values[parentIdx];
    
            if(element<=parent) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    getValues() {
        return this.values;
    }

    extractMax() {
        const first = this.values[0];
        const last = this.values.pop();

        if(this.values.length > 0) {
            this.values[0] = last;
            this.sinkDown();
        }        

        return first;
    }

    sinkDown() {
        let idx = 0;
        let length = this.values.length;
        let element = this.values[0];

        while(true) {
            let leftChildIndx = 2 * idx +1;
            let rightChildIndx = 2 * idx +2;
            let leftChild, rightChild;
            let swap = null;

            if(leftChildIndx < length) {
                leftChild = this.values[leftChildIndx];
                if(leftChild > element) {
                    swap = leftChildIndx;
                }
            }

            if(rightChildIndx < length) {
                rightChild = this.values[rightChildIndx];
                if(
                    (swap === null && rightChild > element) ||
                    (swap !== null && rightChild > leftChild)) {
                        swap = rightChildIndx;
                }
            }
            if(swap === null) break;

            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

let binaryHeap = new BinaryMaxHeap();
binaryHeap.insert(41);
binaryHeap.insert(39);
binaryHeap.insert(33);
binaryHeap.insert(18);
binaryHeap.insert(27);
binaryHeap.insert(12);
binaryHeap.insert(55);

console.log(binaryHeap.getValues());