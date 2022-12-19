// Quick Sort: Works by calculting position of pivot element, where all the elements on the left of pivot are less than pivot and all elements on the right are greater than pivot
// and repeat this process untill the array is fully sorted.


function pivot(arr, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  // We are assuming the pivot is always the first element
  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  // Swap the pivot from the start the swapPoint
  swap(arr, start, swapIdx);
  return swapIdx;
}


function quickSort(arr, left = 0, right = arr.length -1){
    if(left < right){
        let pivotIndex = pivot(arr, left, right) //3
        //left
        quickSort(arr,left,pivotIndex-1);
        //right
        quickSort(arr,pivotIndex+1,right);
      }
     return arr;
} 
           
quickSort([100,-3,2,4,6,9,1,2,5,3,23]);

// Time complexity:
// Best and average O(n logN) - log n decomposition and n comparasions
// Worst case: O(N^2) - If the array is already sorted then there is nothing to pivot and it requires n decomposition and n comparasions hence O(N^2)
// Space complexity: O(logN)
