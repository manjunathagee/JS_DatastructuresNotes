// Greedy Algorithms:

// mergeIntervals([[1,3], [2,6], [8,10], [15,18]]);
// o/p: [[1,6], [8,10], [15, 18]]

// mergeIntervals([[1,4], [4,10]])
// o/p: [[1,10]]

function mergeIntervals(ar) {
    ar.sort((a, b) => a[0] - b[0]);
    let result = [ar[0]];

    
    for(let i=1;i<ar.length;i++) {
        let e1 = result[result.length -1][1];
        let s2 = ar[i][0];
        let e2 = ar[i][1];

        if(e1 >= s2) {
            result[result.length-1][1] = max(e1, e2);
        } else {
            result.push(ar[i]);
        }
    }

    return result;
}

function max(a, b) {
    return a > b ? a: b;
}