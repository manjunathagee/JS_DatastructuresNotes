// Merge Sort: It uses divide an conquer

// * It's a combination of two things - merging and sorting!
// * Exploits the fact that arrays of 0 or 1 element are always sorted
// * Works by decomposing an array into smaller arrays of 0 or 1 elements, then building up a newly sorted array

/**
* function to merge two sorted array and return one sorted array.
*
**/
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

    console.log(results);

    return results;
}

function mergeSort(arr) {
    if(arr.length === 1) return arr;

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

// Time complexity: O(n logn) - every level we need to split the array into two halves which takes log n time and each merge requires complete iteration which takes O(n)
// so it takes O(n logn)
// Best, worst and average time complexity is always O(n logn), i.e if array is nearly sorted, completly reversed it still takes n logN time
// Space complexity: O(N) it needs to store results so O(N) - if space is the issue then go with other sorting which takes O(1)
