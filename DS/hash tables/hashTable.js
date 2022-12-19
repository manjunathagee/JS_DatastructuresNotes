/**
 * Hashtable - JS is sort of hashtable and so is array where keys are indices
 * Hash tables are used to store key-value pairs. They are like arrays, but the keys are not ordered. 
 * Unlike arrays, hash tables are fast for all of the following operations: finding values, adding new values, and removing values!
 * 
 * We use Hash function which converts the keys into valid array indices.
 * Good hash function 
 * 1. Fast (i.e. constant time)
 * 2. Doesn't cluster outputs at specific indices, but distributes uniformly
 * 3. Deterministic (same input yields same output)
 * 
 * The prime number in the hash is helpful in spreading out the keys more uniformly.
 * It's also helpful if the array that you're putting values into has a prime length.
 * 
 * Dealing with collisions: Two ways of handling collisions
 * 1. Separate chaining : At each index in our array we store values using a more sophisticated data structure (e.g. an array or a linked list).
 *      This allows us to store multiple key-value pairs at the same index.
 * 2. Linear Probing: When we find a collision, we search through the array to find the next empty slot. 
 *      Unlike with separate chaining, this allows us to store a single key-value at each index.
 * 
 * Time complexity: average and best case insert, delete, access -> O(1), it depends on hash function
 */

class HashTable {
    // Prime number for array size
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }

    _hash(key) {
        let total = 0;
        let RAMDON_PRIME = 31;
        for(let i=0;i< Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96; // 96 is the charCode for char 'a', so value for a will be 1, for 'b' will be 2 and so on...
            total = (total * RAMDON_PRIME + value) % this.keyMap.length; 
        }
        return total;
    }

    set(key, value) {
        let index = this._hash(key);
        if(!this.keyMap[index]){
            this.keyMap[index] = [];
        }
        this.keyMap[index].push([key, value]);
    }

    get(key) {
        let index = this._hash(key);

        if(this.keyMap[index]) {
            for(let i=0;i<this.keyMap[index].length;i++) {
                if(this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1];
                }
            }
        }

        return null;
    }

    values() {
        let valueArr = [];
        for(let i=0;i<this.keyMap.length;i++) {
            if(this.keyMap[i]) {
                for(let j=0;j<this.keyMap[i].length;j++) {
                    if(!valueArr.includes(this.keyMap[i][j][1])) {
                        valueArr.push(this.keyMap[i][j][1]);
                    }
                }
            }
        }
        return valueArr;
    }

    keys() {
        let keysArr = [];
        for(let i=0;i<this.keyMap.length;i++) {
            if(this.keyMap[i]) {
                for(let j=0;j<this.keyMap[i].length;j++) {
                    if(!keysArr.includes(this.keyMap[i][j][0])) {
                        keysArr.push(this.keyMap[i][j][0]);
                    }
                }
            }
        }
        return keysArr;
    }
}

let ht = new HashTable(17);
ht.set("maroon","#800000")
ht.set("yellow","#FFFF00")
ht.set("olive","#808000")
ht.set("salmon","#FA8072")
ht.set("lightcoral","#F08080")
ht.set("mediumvioletred","#C71585")
ht.set("plum","#DDA0DD")
ht.set("purple","#DDA0DD")
ht.set("violet","#DDA0DD");

console.log(ht.values());
console.log(ht.keys());

ht.keys().forEach(key => console.log(ht.get(key)));