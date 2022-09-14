


function swap(arr, idx1, idx2) {
    var temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  }


function bubbleSort(arr) {
    let noSwaps;
    for(let i=arr.length;i>0;i--) {
        noSwaps = true;
        for(let j=0;j<i-1;j++) {
            console.log(arr, arr[j], arr[j+1]);
            if(arr[j] > arr[j+1]) {
                swap(arr, j, j+1);
                noSwaps = false;
            }
        }
        if(noSwaps) break;
    }
    return arr;
}

function selectionSort(arr) {
    for(let i=0;i<arr.length;i++) {
        let lowest = i;
        for(let j=i+1;j<arr.length;j++) {
            if(arr[j] < arr[lowest]) {
                lowest = j;
            }
        }
        if( i !== lowest) swap(arr, i, lowest);
    }
    return arr;
}

function insertionSort(arr){
	var currentVal;
    for(var i = 1; i < arr.length; i++){
        currentVal = arr[i];
        for(var j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
            arr[j+1] = arr[j]
        }
        arr[j+1] = currentVal;
    }
    return arr;
}

insertionSort([2,1,9,76,4]);

// Merge sort
[1,3,5,6] [2,4,7];
function merge(arr1, arr2) {
    let i =0, j=0;
    let results = [];

    while(i< arr1.length && j< arr2.length) {
        if(arr1[i] > arr2[j]) {
            results.push(arr2[j]);
            j++;
        } else {
            results.push(arr1[i]);
            i++;
        }
    }

    while(i<arr1.length) {
        results.push(arr1[i]);
        i++;
    }

    while(j<arr2.length) {
        results.push(arr2[j]);
        j++;
    }

    return results;
}

function mergeSort(arr) {
    if(arr.length === 1) return arr;

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

// Quick sort

function pivot(arr, start=0, end =arr.length-1) {
    let pivot = arr[start];
    let swapIndx = start;

    for(let i=start;i<=end;i++) {
        if(pivot > arr[i]) {
            swapIndx++;
            swap(arr, swapIndx, i);
        }
    }
    swap(arr, swapIndx, start);
    return swapIndx;
}

function quickSort(arr, left = 0, right = arr.length-1) {
    if(left < right) {
        let pivotIndex = pivot(arr, left, right);
        
        quickSort(arr, left, pivotIndex-1);

        quickSort(arr, pivotIndex+1, right);
    }

    return arr;
}

// Radix Sort:
/**
 * 
 * @param {} num 
 * @param {*} i 
 * @returns returns digit at the given index
 */
function getDigit(num, i) {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

// digitCount(num) - returns the number of digits in num
function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// mostDigits(nums) - Given an array of numbers, returns the number of digits in the largest numbers in the list
function mostDigits(nums) {
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
      maxDigits = Math.max(maxDigits, digitCount(nums[i]));
    }
    return maxDigits;
}

function radixSort(nums) {
    let maxDigitsCount = mostDigits(nums);
    for(let k=0;k<maxDigitsCount;k++) {
        let digitBucket = Array.from({length: 10}, () => []);
        for(let i=0;i<nums.length;i++) {
            digitBucket[getDigit(nums[i], k)].push(nums[i]);
        }
        nums = [].concat(...digitBucket);
    }
    return nums;
}