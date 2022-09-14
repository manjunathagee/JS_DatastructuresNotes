// Insertion Sort: Builds up the sort by gradually creating a larger left half which is always sorted

// * Start by picking the second element in the array
// * Now compare the second element with the one before it and swap if necessary.
// * Continue to the next element and if it is in the incorrect order, iterate through the sorted portion (i.e. the left side) to place the element in the correct place.
// * Repeat until the array is sorted.

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

// Time complexity: O(n^2)
// Space complexity: O(1)

// If the array is almost sorted then it's good algorithm, but completly random elements then insertionSort has the  worst case of O(n^2) but 
// insertionSortis good if the elements keep coming in from network, we get new element and place it in right spot and proceed.

// Algorithm	Time Complexity (Best)	Time Complexity (Average)	Time Complexity (Worst)	Space Complexity
// Bubble Sort	                O(n)	O(n^2)	O(n^2)	O(1)
// Insertion Sort	            O(n)	O(n^2)	O(n^2)	O(1)
// Selection Sort	            O(n^2)	O(n^2)	O(^2n)	O(1)

// BubbleSort and insertionSort works best in array is almost sorted because of fewer comparasions and swaps