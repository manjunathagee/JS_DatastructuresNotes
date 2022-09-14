class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class SingleLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(element) {
        var node = new Node(element);
        var current;
        
        if(this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while(current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    insert(element, index) {
        if(index < 0 || index > this.size) return ;

        var current = this.head;
        var iteration = 0;
        var node = new Node(element);

        if (index === 0){
            this.head = node;
        } else {
            var current = this.head;
            var prev;
            while(iteration < index)  {
                prev = current;
                current = current.next;
                iteration++;
            }
            prev.next = node;
            node.next = current;
        }
        this.size ++;
    }

    removeAt(index) {
        if(index < 0 || index > this.size) return;

        var current, prev, it;
        current = this.head;
        it = 0;

        if(index === 0) {
            this.head = this.head.next;
        } else {
            while(it < index) {
                prev = current;
                current = current.next;
                it++;
            }
            prev.next = current.next;
        }
        this.size --;
        return current.element;
    }

    removeElement(element) {
        var current = this.head;
        var prev = null;

        while(current) {
            if(current.element === element) {
                if(prev === null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this.size--;
                return current.element;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }

    indexOf(element){
        var index = 0;
        var current = this.head;
        while(current) {
            if(current.element === element) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    isEmpty(){
        return this.size === 0;
    }

    sizeOf() {
        return this.size;
    }

    printList() {
        var current = this.head;
        var str = "";
        while(current) {
            str += current.element + " ";
            current = current.next;
        }
        console.log("List: ", str);
    }
}

let list = new SingleLinkedList();
list.add('1');
list.add('2');
list.add('4');

list.printList();

list.insert('3', 2);

list.printList();

// console.log('Remove item at intex 1:', list.removeAt(1));
// list.printList();

// console.log('Remove 4:', list.removeElement('4'));

// list.printList();

console.log('Index of element 2:', list.indexOf('3'));

// Complexity: 
// access: O(N)
// Searching: O(N)
// insert: O(1)
// Remove: O(1) or O(N)