// Searching Algorithm:
// Binary searh will work only on sorted array
// Complexity: O(log n): binarySearch reduces size of array to half every iteration hence it's log n, every time we double the size
// of the array we are just adding one iteration

function binarySearch(arr, value) {
    let left = 0, right = arr.length -1;
    let mid = Math.floor((left + right) / 2 );

    while(arr[mid] !== value && left <= right) {
        if (value < arr[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        } 
        mid = Math.floor((left + right) /2);
    }

    return arr[mid] === value? mid : -1;
}


// String Searching Algo:
// Exercise: write a function to count the no of occurances of one string in another string

countOccurance('asfdashelloadfahelloadashello', 'hello');

function countOccurance(lognStr, str) {
    let j=0, count = 0;
    for(let i=0;i<lognStr.length;i++ ) {
        if(lognStr[i] === str[j]) {
            j++;
            if( j=== str.length) {
                j = 0;
                count++
            }
        } else {
            j = 0;
        }
    }
    return count;
}

