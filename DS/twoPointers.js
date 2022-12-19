/*

Multiple Pointers:
Creating pointers or values that correspond to an index or position and move towards the beginning, end or middle
based on a certain condition

Very efficient for solving problems with minimal space complexity as well - inorder changes.

Example 1: Works when sorted else tough
Write a function called sumZero which accepts a sorted array of integers.
The function should find the first pair where the sum is 0.
Return an array that includes both values that sum to zero or undefined if a pair does not exist

*/

sumZero([-3,-2,-1,0,1,2,3]) // [-3,3] 
sumZero([-2,0,1,3]) // undefined
sumZero([1,2,3]) // undefined

function sumZero(arr) {
    for(let i=0;i<arr.length;i++) {
        for(let j = i+1;j<arr.length;j++) {
            if(arr[i] + arr[j] === 0){
               return arr[i], arr[j];
            }
        }
    }
}

function sumZero(arr){
    let left = 0;
    let right = arr.length - 1;
    while(left < right){
        let sum = arr[left] + arr[right];
        if(sum === 0){
            return [arr[left], arr[right]];
        } else if(sum > 0){
            right--;
        } else {
            left++;
        }
    }
}

/*
Example 2: 
Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array.
There can be negative numbers in the array, but it will always be sorted.

*/

countUniqueValues([1,1,1,1,1,2]) // 2
countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) // 7
countUniqueValues([]) // 0
countUniqueValues([-2,-1,-1,0,1]) // 4

function countUniqueValues(arr) {
    if( arr.length) return 0;

    var i=0, j = i+1;
    let uniqueCount = 0;
    while(j<=arr.length) {
        if(arr[i] == arr[j]) j++;
        else {
            uniqueCount++;
            i = j;
            j++;
        }
    }
    return uniqueCount;
}

// this soln involves chaging input array
function countUniqueValues(arr) { 
    if(arr.length === 0) return 0;
    var i=0, j = i+1;
    for(var j=1;j<arr.length;j++) {
        if(arr[i] !== arr[j]) {
            i++;
            arr[i] = arr[j]
        }
    }
    return i+1;
}


// Multiple pointers: given sorted array return true if the avg exists in array else false
averagepair([1,2,3,6,7,8,9], 7);

function averagepair(arr, num) {
    let left = 0;
    let right = arr.length-1;

    while(right > left) {
        let avg = (arr[left] + arr[right]) / 2;

        if(avg === num) {
            return true;
        } else if(avg > num) {
            right --;
        } else {
            left ++;
        }
    }

    return false;
}

// isSubsequence:  which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. 
// In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing


isSubsequence('hello', 'hello world');

function isSubsequence(str1, str2) {
    let i = 0;
    let j = 0;

    if( !str1.length) return true;

    while(j<str2.length) {
        if(str1[i] === str2[j]) i++;

        if(i === str1.length) return true;

        j++;
    }

    return false;
}