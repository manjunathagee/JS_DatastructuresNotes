
/**
 * chunk([1, 2, 3, 4], 2) -> [[1, 2], [3, 4]]
 * chunk([1, 2, 3, 4, 5], 2) -> [[ 1, 2], [3, 4], [5]]
 * chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) -> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
 * chunk([1, 2, 3, 4, 5], 4) -> [[ 1, 2, 3, 4], [5]]
 * chunk([1, 2, 3, 4, 5], 10) -> [[ 1, 2, 3, 4, 5]]
 */

function chunk(arr, size) {
    let result = [];
    let index = 0;

    if(!Array.isArray(arr)) return;
    if(!arr.length || size === 0) return [];

    while(index < arr.length) {
        result.push(arr.slice(index, index+size));
        index +=size;
    }
    return result;
}

/**
 * nums1 = [4,9,5], nums2 = [9,4,9,8,4], intersect(nums1, nums2) -> [4,9]
 * nums1 = [1, 1, 1, -2, -2, 5, 8, 9], nums2 = [1, 1, -2, 9, 10], intersect(nums1, nums2) -> [1, 1, -2, 9]
 * nums1 = [2, 3, 4], nums2 = [5, 6, 7], intersect(nums1, nums2) -> []
 * 
 */

function intersect(arr1, arr2) {
    if(!Array.isArray(arr1) ||  !Array.isArray(arr2)) return ;

    let result = [];
    let freq = {};

    for(let num of arr1) {
        freq[num] = freq[num]? freq[num] + 1 : 1;
    }
    
    for(let num of arr2) {
        if(freq[num] !== undefined) {
            result.push(num);
        }
    }

    return result;
}

/**
 * @name isSorted
 * @description Given an array of numbers, return true or false, indicating whether the array is sorted.
 * 
 */
function isSorted(arr) {
    if(!Array.isArray(arr) || arr.lenght === 0) return ;

    let prevElement = arr[0];
    let isSorted = true;

    for(let i=1;i<arr.length;i++) {
        if(prevElement > arr[i]) {
            isSorted = false;
            break;
        } else {
            prevElement = arr[i];
        }
    }

    return isSorted;
}

/**
 * Spiral matrix
 */

// TODO:

/**
 * @name missing
 * @description Take an unsorted array of unique numbers from 1 to n.
 * Return the missing number in the sequence or undefined if there is no missing number
 * There are either no missing numbers or exactly one missing number.
 * Do it in O(N) time.
 * @example arr = [1, 4, 3, 5], missing(arr) -> 2
 * arr = [2, 3, 4, 1], missing(arr) -> undefined
 * arr = [], missing(arr) -> undefined
 * @param {number[]} array
 * @returns a missing number or undefined
 * //
 **/

function missing(arr) {
    if(!Array.isArray(arr) || arr.length === 0) return;

    let missingNum;
    let max = Math.max.apply(null, arr);
    let totalSum = (max*(max+1))/2;
    let sum = arr.reduce((acc, curr, i, arr) => {
        return acc + curr;
    });

    if(totalSum !== sum) {
        missingNum = totalSum - sum;
    }
    return missingNum;
}

/**
 * @name moveZeroes
 * @description Given an array of numbers, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
 * In-place operation
 * @example nums = [0,1,0,3,12], moveZeroes(nums) -> [1,3,12,0,0]
 * @param {number[]} nums An array of numbers
 * @return {undefined} Not return anything, modify nums in-place instead.
 * @solution The solution is straightforward, just iterating the array and if the element is 0, move it to the end of array.
 */

function moveZeroes(arr) {
    if(!Array.isArray(arr) || arr.length === 0) return;

    for(let i=0;i<arr.length;i++) {
        if(arr[i] === 0) {
            arr.push(0);
            arr.splice(i,1);
        }
    }
    return arr;
}

/**
 * @name removeDuplicates
 * @description Given a sorted array nums, remove the duplicates *in-place* such that each element appear only once and return the new length.
 * @example removeDuplicates([0,0,1,1,1,2,2,3,3,4]) -> [0, 1, 2, 3, 4] and length = 5.
 **/

function removeDuplicates(arr) {
    if(!Array.isArray(arr) || arr.length === 0) return;
    let freq = {};
    let num;

    for(let num of arr) {
        freq[num] = (freq[num] || 0 ) + 1;
    }

    for(let i=0;i<arr.length;i++) {
        num = arr[i];
        if(freq[num]>1){
            arr.splice(i,1);
        }
    }

    return arr.length;
}

/**
 * @name rotateArray
 * @description Given an array, rotate the array to the right by k steps, where k is non-negative.
 * @example  [1, 2, 3, 4, 5, 6, 7], k = 3 -> [5, 6, 7, 1, 2, 3, 4]
 * The 1st rotate: [7, 1, 2, 3, 4, 5, 6](The last number 7 is moved to the top of the array)
 * The 2nd rotate: [6, 7, 1, 2, 3, 4, 5](Then, the last number 6 is moved to the top of the array)
 * The 3rd rotate: [5, 6, 7, 1, 2, 3, 4].
 **/

function revNums(arr, start, end ) {
    while(start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start ++;
        end --;
    }
}

function rotate(nums, k) {
    k = k % nums.length;

    nums.reverse();
    revNums(nums, 0, k-1);
    revNums(nums, k, nums.length -1);

    return nums;
}

/**
 * @name sockMerchant
 * @description Given an array of integers representing the color of each sock,
 * determine how many pairs of socks with matching colors there are.
 * @example There are n = 7 socks with colors arr=[1,2,1,2,1,1,3,2].
 * There is one pair of color 1 and one of color 2.
 * There are three odd socks left, one of each color. So the number of pairs is 2.
 * @param {number[]} arr
 * @returns {number} The pairs of matched socks
 * @solution Iterate through the array and find out each pair.
 */
function sockMerchant(arr) {
    if(!Array.isArray(arr) || arr.length === 0) return;
    let noOfPairs = 0;
    let freq = {};
    for(let color of arr) {
        freq[color] = (freq[color] || 0) + 1;
    }

    for (let key in freq) {
        noOfPairs += Math.floor(freq[key] / 2);
    }

    return noOfPairs;
}

/**
 * @name twoSum
 * @description Given an array of integers, return indices of the two numbers such that they add up to a specific target.
 * Assume each input would have excactly one solution and you cannot use the same element twice.
 * @example Given nums = [2, 7, 11, 15], target = 9
 * 
 */

function twoSum(nums, target) {
    if(!Array.isArray(nums) || nums.length === 0 || target < 0) return;

    let indexMap = {};
    for(let i=0;i<nums.length;i++) {
        indexMap[nums[i]] = i;
    }

    let remainder;
    for(let i=0;i<nums.length;i++) {
        remainder = target - nums[i];
        if(indexMap[remainder] && i!= indexMap[remainder]) {
            return [i, indexMap[remainder]];
        }
    }
}

/**
 * captalize the first word of sentance
 */
let captalize = (str) => str.split(" ").map(word =>word.charAt(0).toUpperCase()+word.slice(1)).join(" ");

/**
 * Determine if str has all unique chars
 */
function uniqueChars(str) {
    let freqMap = {};
    for(let char of str) {
        freqMap[char] = (freqMap[char] || 0) + 1;
        if(freqMap[char] > 1) return false;
    }
    return true;
}

/**
 * Valid expression or not
 * @name validateExpression
 * @param expression
 * @return true if expression is valid else false.
 */
let expression = "[(a+b){{a-b}]";
function validateExpression(s) {
    const stack = [];
  
  for (let i = 0; i < s.length; i += 1) {
    const top = stack[stack.length - 1];
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      stack.push(s[i]);
    } else if (s[i] === ')' && top === '(' && stack.length !== 0) {
      stack.pop();
    } else if (s[i] === ']' && top === '[' && stack.length !== 0) {
      stack.pop();
    } else if (s[i] === '}' && top === '{' && stack.length !== 0) {
      stack.pop();
    } else {
      return false;
    }
  }
  
  return stack.length === 0;
}

/**
 * /**
 * @name makeAnagrams
 * @description Given two strings, str1 and str2, determine the minimum number of characters deletions
 * required to make str1 and str2 anagrams. The strings str1 and str2 consist of lowercase English letters [a-z].
 * @example makeAnagrams('abcd','dcefg') -> 5
 * delete a, b from 'abcd' and delete e,f,g from 'dcefg' to make 'cd' and 'dc', which are anagrams. That is 5 deletions.
 * 
 */
function makeAnagrams(str1, str2) {
    if(str1 === "" || str2 === "") return ;

    const letters = "abcdefghijklmnopqrstuvwxyz";
    let noOfDeletion = 0;
    let freqStr1 = {};
    let freqStr2 = {};

    for(let char of str1) {
        freqStr1[char] = (freqStr1[char] || 0) + 1;
    }

    for(let char of str2) {
        freqStr2[char] = (freqStr2[char] || 0) + 1;
    }

    for (let l of letters) {
        noOfDeletion += Math.abs((freqStr1[l] || 0) - (freqStr2[l] || 0));
    }

    return noOfDeletion;
}

/**
 * /**
 * @name oneAway
 * @description Assume there are three types of edits that can be performed on a string:
 * insert a character, remove a character or replace a character.
 * Given two strings, check if they are one edit(or zero edit) away to the other string.
 * @example pale, ple -> true(remove a character)
 * pale, pales -> true(add a character)
 * pale, bale -> true(replace a character)
 * pale, bake -> false
 * 
 * Soln: similar to above problem, if difference is more than 1, return false
 */

function oneAway(str1, str2) {
    let diff = Math.abs(str1.length - str2.length);
    if(diff > 1) return false;

    let freqStr1 = {};
    let freqStr2 = {};

    for(let char of str1) {
        freqStr1[char] = (freqStr1[char] || 0) + 1;
    }

    for(let char of str2) {
        freqStr2[char] = (freqStr2[char] || 0) + 1;
    }
    
    diff = 0;
    for(let key in freqStr1) {
        diff += Math.abs((freqStr1[key] || 0) - (freqStr2[key] || 0));
        if(diff > 1) return false;
    }
    return true;
}

/**
 * Write a function to check if a string is panagram or not
 * Panagram - sentence or word which contains all alpahabets from a-z
 * 
 * isPanagram('hello world'); // false
 * isPanagram('The quick brown fox jumps over the lazy dog is a pangram') // true
 */

function isPanagram(str) {
    if(!str) return false;

    let allChars="abcdefghijklmnopqrstuvwxyz";
    let charPos={};

    for(let i=0;i<str.length;i++) {
        charPos[str[i]] = i;
    }

    let isPanagramStr = true;

    allChars.split("").forEach(char => {
        if(charPos[char] === undefined) {
            isPanagramStr = false;
        }
    });

    return isPanagramStr;
}

/**
 * Convert 12hrs to 24hrs format
 */

function convert12HrTo24Hr(timeStr) {
    let [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    if(hours === "12") hours = "00";

    if(modifier === "PM") hours = parseInt(hours) + 12;

    return `${hours}:${minutes}`;
}



  /**
   * 
   * if(arr[i] === '(' || arr[i] === '{' || arr[i] === '[') {
  stackArr.push(arr[i]); 
} else if(arr[i] === ')' && stackArr[stackArr.length - 1] === '(') {
       stackArr.pop();
   } else if(arr[i] === '}' && stackArr[stackArr.length - 1] === '{') {
       stackArr.pop();
   } else if(arr[i] === ']' && stackArr[stackArr.length - 1] === '[') {
       stackArr.pop();
   } else {
       return false;
   }
}
   */

/**
 * Implement LRU cache - Least Recently Use cache
 * https://www.youtube.com/watch?v=q-ylRxSxGcY&t=2068s
 * If size is 5, 
 *  1. If u access any element it goes to the top of the list
 *  2. If u push 6, least used or the element at the bottom will be replaced and only 5 elements will be present
 *   Can be implemented using DLL, try with min/max heap
 */


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