
 /** 
  * Frequency Counters:
    This patterns uses objects or sets to collect values/frequencies of values
    This can often avoid the need for nested loops or O(n^2) operations with arrays/strings
**/


// Example 01
// e.g Write a functions which takes two arrays. The fn should return true if every value in the array has it's corresponding
// value squared in the second array. The Frequency of values must be the Same.
function same(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    }
    let frequencyCounter1 = {}
    let frequencyCounter2 = {}
    for(let val of arr1){
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
    }
    for(let val of arr2){
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1        
    }
    for(let key in frequencyCounter1){
        if(!(key ** 2 in frequencyCounter2)){
            return false
        }
        if(frequencyCounter2[key ** 2] !== frequencyCounter1[key]){
            return false
        }
    }
    return true
}

// same([1,2,3], [9,1,4]); // true;
// same([1,2,3], [1,9]); // false
// same([1,2,1], [4,4,1]); // false (must be same frequency)

// Example 02
function validAnagram(str1, str2) {
    if(str1.length !== str2.length) {
        return false;
    }

    var freqCounter1 = {};
    var freqCounter2 = {};

    str1.split('').forEach(ch => {
        freqCounter1[ch] = (freqCounter1[ch] || 0) +1;
    });

    str2.split('').forEach(ch => {
        freqCounter2[ch] = (freqCounter2[ch] || 0) +1;
    });

    for(let key in freqCounter1) {
        if(!(freqCounter2[key] && freqCounter1[key] === freqCounter2[key])) {
            return false;
        }
    }

    return true;
}

function validAnagram(first, second) {
    if(first.length !== second.length) return false;

    const lookup = {};

    for(let i=0;i<first.length;i++) {
        let letter = first[i];
        lookup[letter]? lookup[letter] += 1: lookup[letter] = 1;
    }

    for(let i=0;i< second.length; i++) {
        let letter = second[i];

        if(!lookup[letter]) return false;
        else 
            lookup[letter] -= 1;
    }

    return true;
}

// validAnagram('', '') // true
// validAnagram('aaz', 'zza') // false
// validAnagram('anagram', 'nagaram') // true
// validAnagram("rat","car") // false) // false
// validAnagram('awesome', 'awesom') // false
// validAnagram('qwerty', 'qeywrt') // true
// validAnagram('texttwisttime', 'timetwisttext') // true

function sameFrequency(num1, num2){
    let strNum1 = num1.toString();
    let strNum2 = num2.toString();
    if(strNum1.length !== strNum2.length) return false;
    
    let countNum1 = {};
    let countNum2 = {};
    
    for(let i = 0; i < strNum1.length; i++){
      countNum1[strNum1[i]] = (countNum1[strNum1[i]] || 0) + 1
    }
    
    for(let j = 0; j < strNum1.length; j++){
      countNum2[strNum2[j]] = (countNum2[strNum2[j]] || 0) + 1
    }
    
    for(let key in countNum1){
      if(countNum1[key] !== countNum2[key]) return false;
    }
   
    return true;
  }