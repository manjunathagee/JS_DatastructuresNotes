
Trees: 
/*
    1. Should have a root, can have any number of children
    Trees are non-linear DS that contain a root and child nodes

    Binary Trees: it a valid tree and every node can have atmost two children

    Binary Search Tree: it's a valid binary tree, such that the right children is always greater than the root and the left children is always less
    than parent. BST is in a way sorted like left elements are less and right elements are greater than root

    Time complexity: Insert O(log N) searching O(log N) because if the number of nodes doubles, we only need to increase one more iterations because of the way we store the data.
    But if you have a suitation where only one side to the tree exists(similar to linked list), searching and insert will take O(N)

    Tree traversal: We have Breadth First search, Deapth first search. DFS internally has pre order, post order and in order traversal.

*/
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(value) {
        let node = new Node(value);

        if(this.root === null) {
            this.root = node;
            return this;
        } else {
            let current = this.root;
            while(true) {
                if(current.value == value) return undefined;
                if(value < current.value) {
                    if(current.left === null) {
                        current.left = node;
                        return this;
                    }
                    current = current.left;
                } else {
                    if(current.right === null) {
                        current.right = node;
                        return this;
                    }
                    current = current.right;
                }
            }
        }
    }

    search(value) {
        if(this.root === null) {
            return -1;
        }else {
            let current = this.root;
            while(true) {
                if(current.value === value) {
                    return current;
                }
                if(current.value > value) {
                    if(current.left === null) {
                        return -1;
                    } else {
                        current = current.left;
                    }
                }
                if(current.value < value) {
                    if(current.right === null) {
                        return -1;
                    } else {
                        current = current.right;
                    }
                }
            }
        }
    }

    contains(value) {
        if(this.root === null) return false;
        let found = false;
        let current = this.root;

        while(current && !found) {
            if(current.value === value) found = true;
            if(current.value > value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return found;
    }

    breadthFirstSearch() {
        if(this.root === null) return [];

        let node = null;
        let data = [];
        let queue = [];

        queue.push(this.root);

        while(queue.length) {
            node = queue.shift();
            data.push(node);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        return data;
    }

    DFSPreOder() {
        if(this.root === null) return ;

        let data = [];
        let current = this.root;

        function preOrder(node) {
            data.push(node.value);
            if(node.left) preOrder(node.left);
            if(node.right) preOrder(node.right);
        }

        preOrder(current);
        return data;
    }

    DFSPostOrder() {
        if(this.root === null) return ;

        let data = [];
        let current = this.root;

        function postOrder(node) {
            if(node.left) postOrder(node.left);
            if(node.right) postOrder(node.right);
            data.push(node.value);
        }
        
        postOrder(current);
        return data;
    }

    DFSInOrder() {
        if(this.root === null) return ;

        let data = [];
        let current = this.root;

        function inOrder(node) {
            if(node.left) inOrder(node.left);
            data.push(node.value);
            if(node.right) inOrder(node.right);
        }
        inOrder(current);
        return data;
    }
}

const bst = new BST();

bst.insert(10);
bst.insert(6);
bst.insert(3);
bst.insert(8);
bst.insert(15);
bst.insert(20);


console.log(bst.DFSInOrder().toString());


// BFS vs DFS: Time complexity is same, we visit all nodes once
// if the tree is wide then BFS will take more time to store all items in the queue and if the tree is depth, then DFS will take more time

// DFS: 
// Inorder on BST returns the sorted elements
// preOrder - will retain tree structures which can be used for cloning or store in a file - hidrate/rehidrate tree

// We can use BFS or DFS for tree traversal or searching

