/**
 * Dynamic Programming: A method for solving a complex problem by breaking it down into a collection of simpler subproblems,
 * solving each of those subproblems just once, and storing their solutions.
 * 
 * Using past knowledge to make solving a future problem easier
 * 
 * IT only works on 
 * 1. overlapping subproblems: Soln of one subproblem can we reused, if soln's cannot be reused then it's not overlapping
 * 2. optimal substructures: if shortest distance from A -> E is A->B->C->D->E, then sortest path from A->C is via A->B->C if it is anything then it's not optimal substructure
 * 
 * Memoization recipe:
 * 1. Make it work
 *    1.1 Visualize the problem as a tree
 *    1.2 Implement the tree using recursion - leaf nodes are base case
 *    1.3 Test it
 * 
 * 2. Make it efficient
 *    2.1 Add a memo object
 *    2.2 Add a base case to return memo values
 *    2.3 Store return values into the memo
 */

/**
 * Recursive non dynamic varient of fibonacci
 * Time complexity: O(2^N) quadratic
 *  */ 
 function fib_non_memo(n){
    if(n <= 2) return 1;
    return fib(n-1) + fib(n-2);
  }

  /**
   * 
   * Memoization: Storing the results of expensive function calls and returning the cached result when the same inputs occur again
   * Time complexity: O(N)
   * We can either use array with indecies or objects with key-value for memoization
   */

  function fib_memo(n, memo = []) {
    if(memo[n] !== undefined) return memo[n];
    if(n <= 2) return 1;
    let result = fib(n-1, memo) + fib(n-2, memo);
    memo[n] = result;
    return result;
  }
/**
 * Tabulation: Storing the result of a previous result in a "table" (usually an array) Usually done using iteration 
 * Better space complexity can be achieved using tabulation when compared with memo, because it uses iteration(usually) over recursion and recursion can cause call stack overflow for
 * large value of n
 * 
 * Time complexity: O(N)
 */
  function fib_table(n) {
    if(n <=2 ) return 1;
    let fib_table = [0, 1, 1];
    for(let i=3;i<=n;i++) {
        fib_table[i] = fib_table[i-1] + fib_table[i-2];
    }
    return fib_table[n];
  }

  /**
   * 
   * Write a function called stairs which accepts n number of stairs.
   * Imagine that a person is standing at the bottom of the stairs and wants to reach the top and the person can climb either 1 stair or 2 stairs at a time.
   * Your function should return the number of ways the person can reach the top by only climbing 1 or 2 stairs at a time.
   * 
   */
  function stairs_naive() {
    if (n <= 0) return 0;
    if (n <= 2) return n;
    return stairs_naive(n - 1) + stairs_naive(n - 2);
  }

  // Time complexity: O(N)
  function stairs_memo(n, memo=[]) {
    if (n <= 0) return 0;
    if (n <= 2) return n;
    if (memo[n] > 0) return memo[n];
    memo[n] = stairs_memo(n - 1, memo) + stairs_memo(n - 2, memo);
    return memo[n];
  }

  /**
   * Storing the result of a previous result in a "table" (usually an array) 
   * Usually done using iteration 
   * Better space complexity can be achieved using tabulation
   * 
   * Time Complexity - O(N)
   * Space Complexity - O(1)
   * 
   */
   function stairs(n) {
    if(n < 3) return n;
    let store = [1,1];
    for(let i = 2; i <= n; i++) {
      let total = store[1] + store[0]
      store[0] = store[1]
      store[1] = total
    }
    return store[1];
  }

/**
 * Say thay you are a traveler on a 2D grid. you begin in the top-left corner and your goal is to travel
 * to the bottom-right corner. you may move down or right only
 * 
 * In how many ways can you travel to the goal on a grid with dimension m *n?
 * 
 * Time complexity: O(m*n) time, O(m + n) space 
 * 
 */

function gridTraveller_memo(m, n, memo = {}) {
  let key = m +'-'+ n;
  if(key in memo) return memo[key];
  if(m===1 && n ===1) return 1;
  if(m === 0 || n=== 0) return 0;

  return memo[key] = gridTraveller_memo(m-1, n, memo) + gridTraveller_memo(m, n-1, memo); 
}

/**
 * Write a function 'canSum(targetSum, numbers)' that takes in a targetSum and an array of numbers(non-negative) as arguments.
 * 
 * The function should returna a boolean indicating wheather or not it is possible to generate the targetSum using those numbers
 * 
 * You may use an element of the array as many times as needed.
 * 
 * canSum(7, [5,3,4,7]) -> true, 3+4, 7(two possible answers)
 * canSum(7, [2,3]) -> true
 *  
 */

/**
 * Time complexity: O(n^m) time(number of nodes to construct, we have m target sum and at each node we divide into n branches) and O(m) space
 * 
 * @param {*} targetSum 
 * @param {*} numbers 
 * @returns 
 */

function canSum_naive(targetSum, numbers) {
  if(targetSum === 0) return true;
  if(targetSum < 0) return false;

  for(let num of numbers) {
    let remainder = targetSum - num;
    if(canSum_naive(remainder, numbers) === true) {
      return true;
    }
  }

  return false;
}

/**
 * Time complexity: m - target sum, n - array length
 * O(m*n) time, O(m) space
 * 
 * @param {*} targetSum 
 * @param {*} numbers 
 * @returns 
 */
function canSum_memo(targetSum, numbers, memo = {}) {
  if(targetSum in memo) return memo[targetSum];
  if(targetSum === 0) return true;
  if(targetSum < 0) return false;

  for(let num of numbers) {
    let remainder = targetSum - num;
    if(canSum_naive(remainder, numbers, memo) === true) {
      memo[targetSum] = true;
      return true;
    }
  }
  memo[targetSum] = false;
  return false;
}

/**
 * Write a function 'howSum(targetSum, numbers)' that takes in a targetSum and an array.
 * The function should return an array containing any combination of elements that add upto exactly
 * the targetSum. Tf there is no combination that adds upto the targetSum, return null.
 * 
 * If there are multiple combinations possible, you may return any single one.
 * 
 * howSum(7, [2,3]); // [3,2,2]
 * howSum(7, [5,3,4,7]); // [4, 3]
 * howSum(7, [2, 4]); // null
 * howSum(8, [2, 3,5]); // [2,2,2,2]
 * howSum(300, [7,14]); // null
 * 
 * Time complexity: m targetSum, n numbers.length
 * Time - O((n^m)* m) - multiple of m is for constructing [...remainder, num]
 * Space - O(m) - depth of tree - if targetSum is 5 and worst case is reduce it by one in every level, space 
 * taken is O(m)
 * 
 */

function howSum(targetSum, numbers) {
  if(targetSum === 0) return [];
  if(targetSum < 0) return null;

  for(let num of numbers) {
    let remainder = targetSum - num;
    let remainderResult = howSum(remainder, numbers);
    if(remainderResult !== null) {
      return [...remainderResult, num];
    }
  }

  return null;
} 

/**
 * Time complexity: time: O(n*m^2)
 * Space: O(m^2)
 * @param {*} targetSum 
 * @param {*} numbers 
 * @param {*} memo 
 * @returns 
 */

function howSum_memo(targetSum, numbers, memo = {}) {
  if(targetSum in memo) return memo[targetSum];
  if(targetSum === 0) return [];
  if(targetSum < 0) return null;

  for(let num of numbers) {
    let remainder = targetSum - num;
    let remainderResult = howSum_memo(remainder, numbers, memo);
    if(remainderResult !== null) {
      memo[targetSum] = [...remainderResult, num];
      return memo[targetSum];
    }
  }

  memo[targetSum] = null;
  return null;
} 

/**
 * Write a function 'bestSum(targetSu,numbers)' that takes in a targetSum and an array of numbers.
 * The function should return an array containing the shortest combinations of numbers that add upto 
 * exactly the targetSum.
 * 
 * If there is a tie, return one of the shortest combination.
 * 
 * Time complexity: branching factor(n) * height of tree (m) * length of combination (m) O(n^m * m)
 * Space: O(m^2) depth of tree * each recursive call will have a shortestCombination
 * 
 */

function bestSum(targetSum, numbers) {
  if(targetSum === 0) return [];
  if(targetSum < 0) return null;

  let shortestCombination = null;

  for(let num of numbers ) {
    let remainder = targetSum - num;
    let remainderCombination = bestSum(remainder, numbers);

    if(remainderCombination !== null) {
      let combination = [...remainderCombination, num];
      if(shortestCombination === null || combination.length < shortestCombination.length) {
        shortestCombination = combination;
      }
    }
  }

  return shortestCombination;
}

// console.log(bestSum(7, [5,3,4,7])); // [7]
// console.log(bestSum(8, [2,3,5])); // [3,5]
// console.log(bestSum(8, [1,4,5])); // [4,4]
// console.log(bestSum(100, [1,2,5,25]));

/**
 * Time complexity: O(m^2 * n) 
 * Space: O(m^2)
 * 
 * @param {*} targetSum 
 * @param {*} numbers 
 * @param {*} memo 
 * @returns 
 */
function bestSum_memo(targetSum, numbers, memo = {}) {
  if(targetSum in memo) return memo[targetSum];
  if(targetSum === 0) return [];
  if(targetSum < 0) return null;

  let shortestCombination = null;

  for(let num of numbers) {
    let remainder = targetSum - num;
    let remainderCombination = bestSum_memo(remainder, numbers, memo);
    if(remainderCombination !== null) {
      let combination = [...remainderCombination, num];
      if(shortestCombination === null || combination.length < shortestCombination.length) {
        memo[targetSum] = shortestCombination;
        shortestCombination = combination;
      }
    }
  }

  memo[targetSum] = shortestCombination;
  return shortestCombination;
}

// console.log(bestSum_memo(7, [25,4,3,2,1]));

// canSum -> can you do it or not - decision problem
// howSum -> How will you do it - combinatoric problem
// bestSum -> what is the best way to do this - Optimization problem

// NOTE: what will change will become the root, like targetSum

/**
 * Write a function 'canConstruct(target, wordBank)' that accepts a target string and an array of strings
 * The function should return a boolean indicating whether or not the 'target' can be constructed by concatenating elements of the 'wordBank'
 * 
 * You may reuse elements of 'wordBank' as many times as needed.
 * 
 * Complexity: m - target.length, n wordBank length
 * m - height of tree in worst case where single char is considered, n is the branching factor, each level
 * will branch n times and we have m level so there are n^m branches so, multiple of m for slicing
 * O(n^m * m) time complexity
 * 
 * Space: height of the tree-> no of recursive calls which is m, at each level we have to slice and each
 * recursive call has to store suffix of length m so 
 * Space complexity: O(m^2)
 * 
 */

function canConstruct(target, wordBank) {
  if(target === "") return true;

  for(let word of wordBank) {
    if(target.indexOf(word) === 0) {
      let suffix = target.slice(word.length);
      if(canConstruct(suffix, wordBank) === true) {
        return true;
      }
    }
  }
  return false;
}

// canConstruct("abcdef", ["ab","abc", "cd", "def", "abcd"]); // true
// canConstruct("abcdefsa", ["ab","abc", "cd", "def", "abcd"]); // false

/**
 * O(n*m^2) - Time
 * O(m^2) - Space
 * 
 * @param {*} target 
 * @param {*} wordBank 
 * @param {*} memo 
 */
function canConstruct_memo(target, wordBank, memo={}) {
  if(target in memo) return memo[target];
  if(target === "") return true;

  for(let word of wordBank) {
    if(target.indexOf(word) === 0) {
      let suffix = target.slice(word.length);
      if(canConstruct_memo(suffix, wordBank, memo) === true) {
        memo[target] = true;
        return true;
      }
    }
  }
  memo[target] = false;
  return false;
}

// canConstruct_memo("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", 
// ["e", "ee", "eee", "eeef"]);


/**
 *  Write a function 'countConstruct(target, wordBank)' that accepts a target string and an array of strings
 * The function should return a total no of ways the 'target' can be constructed by concatenating elements of the 'wordBank'
 * 
 * You may reuse elements of 'wordBank' as many times as needed.
 * 
 * Complexity: m - target.length, n wordBank length
 *  Complexity: O(n^m * m)
 *  space: O(m ^2)
 */
function countConstruct(target, wordBank) {
  if(target === "") return 1;

  let totalNoWays = 0;

  for(let word of wordBank) {
    if(target.indexOf(word) === 0) {
      let noOfWays = countConstruct(target.slice(word.length), wordBank);
      totalNoWays += noOfWays;
    }
  }

  return totalNoWays;
}

// console.log(countConstruct("abcdef", ["ab","abc", "cd", "def", "abcd"]));
// console.log(countConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee']));

/**
 * Complexity: m - target.length, n wordBank length
 * Complexity: O(n * m^2) time
 * space: O(m ^2)
 * @param {*} target 
 * @param {*} wordBank 
 * @param {*} memo 
 */
function countConstruct_memo(target, wordBank, memo={}) {
  if(target in memo) return memo[target];
  if(target === "") return 1;

  let totalNoWays = 0;

  for(let word of wordBank) {
    if(target.indexOf(word) === 0) {
      let noOfWays = countConstruct(target.slice(word.length), wordBank, memo);
      totalNoWays += noOfWays;
      memo[target] = totalNoWays;
    }
  }
  memo[target] = totalNoWays;
  return totalNoWays;
}

function countConstruct_memo_1(target, strs, memo = {}) {
  if (target in memo) return memo[target];
  if (target === "") {
    return 1;
  }
  let totalCount = 0;
  for (let s of strs) {
    if (target.indexOf(s) === 0) {
      const countForRest = countConstruct_memo_1(target.slice(s.length), strs, memo);
      totalCount += countForRest;
    }
  }
  memo[target] = totalCount;
  return totalCount;
}

// console.log(countConstruct_memo('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee']));

/**
 * *  Write a function 'allConstruct(target, wordBank)' that accepts a target string and an array of strings
 * The function should return a 2D array of all possible ways the 'target' can be constructed by concatenating elements of the 'wordBank'
 * 
 * You may reuse elements of 'wordBank' as many times as needed.
 * 
 * Time: O(n ^m) time we have m level of tree and at each level we have n branches so we have n^m nodes in the tree
 * space O(m)
 * 
 */

function allConstruct(target, wordBank) {
  if(target === "") return [[]];
  const result = [];
  for(let word of wordBank) {
    if(target.indexOf(word) === 0) {
      const suffix = target.slice(word.length);
      const suffixWays = allConstruct(suffix, wordBank);
      const totalWays = suffixWays.map(way => [word, ...way]);
      result.push(...totalWays);
    }
  }
  return result;
}

console.log(allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl']));

function allConstruct_memo(target, wordBank, memo ={}) {
  if(target in memo) return target[memo];
  if(target === "") return [[]];

  let result = [];

  for(let word of wordBank) {
    if(target.indexOf(word) === 0) {
      let suffix = target.slice(word.length);
      let suffixWays = allConstruct_memo(suffix, wordBank, memo);
      let totalWays = suffixWays.map(way => [word, ...way]);
      result.push(totalWays);
    }
  }

  memo[target] = result;
  return result;
}