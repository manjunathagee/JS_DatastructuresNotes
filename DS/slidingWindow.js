/*
Sliding Window: We are keeping a subset of data in a larger set of data
This pattern involves creating a window which can either be an array or number from one position to another
Depending on a certain condition, the window either increases or closes (and a new window is created)
Very useful for keeping track of a subset of data in an array/string etc.

*/

/*
Example:
Write a function called maxSubarraySum which accepts an array of integers and a number called n.
The function should calculate the maximum sum of n consecutive elements in the array.
*/
maxSubarraySum([1,2,5,2,8,1,5],2) // 10
maxSubarraySum([1,2,5,2,8,1,5],4) // 17
maxSubarraySum([4,2,1,6],1) // 6
maxSubarraySum([4,2,1,6,2],4) // 13
maxSubarraySum([],4) // null

function maxSubarraySum(arr, num) {
    var maxSum = -Infinity;
    if(arr.length === 0) return null;

    for(let i=0;i< arr.length-num+1; i++ ) {
        var temp = 0;
        for(let j=0;j<num; j++) {
            temp += arr[i+j];
        }
        if(temp> maxSum) {
            maxSum = temp;
        }
    }

    return maxSum;
}

// Best soln:
function maxSubarraySum(arr, num) {
    if(arr.length === 0) return null;
    
    let maxSum = 0;
    let temp = 0;
    
    for (let i = 0; i < num; i++) {
        maxSum += arr[i];
    }
    
    temp = maxSum;

    for(let i=num;i<arr.length;i++) {
        temp = temp - arr[i-num] + arr[i];
        maxSum = Math.max(maxSum, temp);
    }

    return maxSum;
}

// longestSubstring('aaa'); //1
// longestSubstring('aaa'); //1
// longestSubstring('pwwkew'); // 3 for wke

function longestSubstring(str){
    let lookUp = {};
    let max = 0;
    let s = 0;

    for(let i=0;i<str.length;i++) {
        lookUp[str[i]] = (lookUp[str[i]] || 0) + 1;
        
        while(lookUp[str[i]] > 1) {
            if(lookUp[str[s]] > 1) {
                lookUp[str[s]] --;
            } else {
                delete lookUp[str[s]];
            }
            s++;
        }
        max = Math.max(max, (i-s) +1);
    }
    return max;
}

console.log(longestSubstring('pwwkew'));