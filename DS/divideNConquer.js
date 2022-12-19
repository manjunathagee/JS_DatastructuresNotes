/*
Divide and Conquer:
This pattern involves dividing a data set into smaller chunks and then repeating a parocess with a subset of data.
e.g Binary search etc..

*/
areThereDuplicates(2,3,4,4); // true
areThereDuplicates('ab', 'a', 'abc'); // fasle

// areThereDuplicates Solution (Frequency Counter):

function areThereDuplicates() {
    let ar = Array.from(arguments); // NOTE
    if(ar.length ===0) return true;

    let freqCounter = {};

    for(let i=0;i< ar.length; i++) {
        freqCounter[ar[i]] = (freqCounter[ar[i]] || 0) + 1;

        if(freqCounter[ar[i]] > 1) {
            return true;
        }
    }

    return false;
}

// areThereDuplicates One Liner Solution:

function areThereDuplicates() {
    let ar = Array.from(arguments);
    if(ar.length ===0) return true;

    return new Set(arguments).size !== arguments.length;
}