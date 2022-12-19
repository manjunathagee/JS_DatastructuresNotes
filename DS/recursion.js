
// Recursion: Function which calls itself.
// it should have two components
// 1. base case when the recursion should end
// 2. Call the same function with different inputs


function factorial(num) {
    if(num === 1) return 1; // Base case
    return num * factorial(num-1); // call itself with different inputs
}

// Helper method Recursion: pattern with recursion where we have a outer function which is not recursive but calls an inner function which is
// recursive.


function collectAllOddNumbers(arr) {
    const result = [];

    function isOdd(arrInput) {
        if(arrInput.length === 0) return;

        if(arrInput[0] % 2 !== 0) {
            result.push(arrInput[0]);
        }

        isOdd(arrInput.slice(1));
    }

    isOdd(arr);

    return result;
}

// Soln without helper function:

function isOdd(arr) {
    let result = [];

    if(arr.length === 0) {
        return result;
    }

    if(arr[0] %2 !== 0) {
        result.push(arr[0]);
    }

    result = result.concat(isOdd(arr.slice(1)));

    return result;
}

// Note: For arrays use methods lice slice, spread operator, concat that makes copies of arrays so that you do not mutate them
// remember strings are immutable so you will need to use methods like slice, substr or substring to make copies of strings.
// with objects use methods like Object.assign or the spread operator.

Exercise:

power(2, 0); // 1
power(2, 2); // 4
power(2, 4); // 16
function power(base, exponent) {
    if(exponent === 0) return 1;

    return base * power(base, exponent - 1);
}

// Reverse string:

// Recursion with helper function
function reverse(st){
  // add whatever parameters you deem necessary - good luck!
  var s = '';
    function helper(str) {
        if(str.length === 0) return '';

        s = str.charAt(str.length-1) + helper(str.substr(0, str.length -1));
        return s;
    }
    helper(st);
    return s;
}

// Pure recursion soln
function reverse(str) {
    if(str.length === 1) return str;

    return str[str.length-1] + reverse(str.substr(0, str.length -1));
}

Palindrome:
isPalindrom('ab5a');

function isPalindrom(strInput) {
    let ispalindromStr = true;

    function innerHelper(str) {
        if(str.length <= 1) return true;

        if(ispalindromStr && str.charAt(0) === str.charAt(str.length-1)) {
            ispalindromStr = innerHelper(str.substr(1, str.length-2));
            return ispalindromStr;
        } else {
            return false;
        }
    }

    ispalindromStr =  innerHelper(strInput);
    return ispalindromStr;
}

// Flatten: w.a.f to flatten out an nested arrays

flattenArr([[1,2,3,[4,5], {10: [1,2,3]}]]);

function flattenArr(arrInput) {
    if(arrInput.length === 0) return [];

    let result = [];

    function helper(arr) {

        arr.forEach(ele => {
            if(Array.isArray(ele)) {
                helper(ele);
             } else if(typeof ele === 'object' && ele.constructor === Object){
                let values  =  Object.values(ele);
                helper(values);
             } else {
                result.push(ele);
             }
        })
    }

    helper(arrInput);
    return result;
}

// Exercise: capitalizeFirst
// Given array of strings capitalize first word of each string

capitalizeFirst(['hello', 'world', 'data', 'structures']);

function capitalizeFirst(arr) {
    if(arr.length === 0) return;

    let result = [];

    function helper(arrInput) {
        if(arrInput.length === 0) return;

        result.push(arrInput[0].charAt(0).toUpperCase() + arrInput[0].substr(1));

        helper(arrInput.slice(1));

        return result;
    }

    result = helper(arr);
    return result;
}

Note: let ar = [1,2,3,4];
ar.slice(1); // [2,3,4]
ar.slice(0, -1) // [1,2,3]

// Example: nestedEvenSum 
// Should return sum of all even numbers from nested object

let obj = {
    a: {
        b: {
            c: 3,
            d: 4,
            e: 6
        }, 
        c: {
            str: 'hello',
            ar: [1,2,3]
        }
    }
}

function nestedEvenSum(obj) {
    // function to return sum of all even numbers

    let evenSum = 0;

    function helper(obj) {

        if(typeof obj === 'object' && obj.constructor === Object) {
            let values = Object.values(obj);
            return helper(values);
        } else if( Array.isArray(obj) ) {
            obj.forEach(ele => {
                if(typeof ele === 'number' && ele %2 ===0) {
                    evenSum += ele;
                } else if(typeof ele === 'object' && ele.constructor === Object) {
                    let values = Object.values(ele);
                    return helper(values);
                }
            });
        }

        return evenSum;
    }

    evenSum = helper(obj);
    return evenSum;
}
