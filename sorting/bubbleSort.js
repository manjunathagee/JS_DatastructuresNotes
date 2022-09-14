// Bubble Sort: A sorting algo where the largest value bubble up to the top one at a time.

// * Start looping from with a variable called i the end of the array towards the beginning
// * Start an inner loop with a variable called j from the beginning until i - 1
// * If arr[j] is greater than arr[j+1], swap those two values!
// * Return the sorted array

// ES5
function swap(arr, idx1, idx2) {
  var temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

// ES2015
const swap = (arr, idx1, idx2) => {
  [arr[idx1],arr[idx2]] = [arr[idx2],arr[idx1]];
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
        if(noSwaps) break; // break the loop it's already swapped
    }
    return arr;
}

// Bubble sort algorithm has a worst-case time complexity of O(n^2). 
// The bubble sort has a space complexity of O(1). 

bubbleSort([5,4,3,2,1]); 
// [5, 4, 3, 2, 1] 5 4
// [4, 5, 3, 2, 1] 5 3
// [4, 3, 5, 2, 1] 5 2
// [4, 3, 2, 5, 1] 5 1
// [4, 3, 2, 1, 5] 4 3
// [3, 4, 2, 1, 5] 4 2
// [3, 2, 4, 1, 5] 4 1
// [3, 2, 1, 4, 5] 3 2
// [2, 3, 1, 4, 5] 3 1
// [2, 1, 3, 4, 5] 2 1
// [1, 2, 3, 4, 5]