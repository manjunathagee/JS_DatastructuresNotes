/**
 * Closure is a combination of function bundled together with it's lexical environment.
 * It is a function that references variables in the outer scope from it's inner scope
 * 
 * A Lexical scope in JavaScript means that a variable defined outside a function can be accessible inside another function defined after the variable declaration.
 * 
 * Disadvantages
 * 1. Closures are not garbage collected, can slow down applicaitons and somtimes it can cause application crashes
 * 
 * Advantages
 * 1. Implement private variables and functions
 * 2. Can cache the result of expensive operation
 * 
 */

/**
 * Advantage of closures: Can simulate private scope for varibales
 * 
 * implementing factory function to immulate private variables
 */
 function createAnimal(name, job) {
    // "Private" variables here
    let _name = name;
    let _job = job;
  
    // Public variables here
    return {
      // Getter Methods
      getName() {
        return _name;
      },
      getJob() {
        return _job;
      },
      // Setter Methods
      setName(newName) {
        _name = newName;
      },
      setJob(newJob) {
        _job = newJob;
      }
    };
  }

const presto = createAnimal('Presto', 'Digger');

// These properties will be inaccessible
console.log(presto._name); // undefined
console.log(presto._job); // undefined

// Getter methods have access to the closure
console.log(presto.getName()); // 'Presto'
console.log(presto.getJob()); // 'Digger'

// Setter methods can mutate the variables in the closure
presto.setName('Quick');
presto.setJob('Bone Finder');

console.log(presto.getName()); // 'Quick'
console.log(presto.getJob()); // 'Bone Finder'

console.clear();
// o/p of below
let count = 0;
(function immediate() {
  if (count === 0) {
    let count = 1;
    console.log(count); // 1
  }
  console.log(count); // 0
})();

// 5.How do you optimise this= using closures?
function find(index) {
    let a = [];
  for (let i = 0; i < 1000000; i++) { a[i]= i*i }

  console.log(a[index])
}

// console.time("6");
// find(6); // this takes 37ms
// console.timeEnd("6");
// console.time("12");
// find(12); // this takes 135ms
// console.timeEnd("12");

function find() {
    let a = [];
    for (let i = 0; i < 1000000; i++) {
        a[i]= i*i
    }

    return function (index) {
        console.log(a[index])
    }
}

// const closure = find()
// console.time("6"); 
// closure(6); // this takes 0.25 ms
// console.timeEnd("6");
// console.time("12");
// closure(12) // this takes 0.025ms
// console.timeEnd("12");

// Create a private function
function createCounter() {
    let _counter = 0;

    function increment() {
        _counter++;
    }

    function decrement() {
        _counter --;
    }

    function print() {
        console.log(_counter);
    }

    return {
        increment,
        decrement,
        print
    }
}

let counter = createCounter();
console.clear();
counter.increment();
counter.increment();
counter.increment();
counter.print();
counter.decrement();
counter.print();
console.log('Access private variable: ', counter._counter); // undefined

/**
 * Rewrite the function in such a way the output gets printed once even though the function is called multiple times.
 * 
        let view
        function likeTheVideo(){
            view="Roadside Coder"
            console.log( "Subscribe to", view)
        }
        
        likeTheVideo(); // Subscribe to Roadside Coder
        likeTheVideo(); // Subscribe to Roadside Coder
        likeTheVideo(); // Subscribe to Roadside Coder
        likeTheVideo(); // Subscribe to Roadside Coder
 * 
 **/

let view;

function likeTheVideo() {
    view="Roadside Coder";
    let _alreadyCalled = false;

    return function() {
        if(_alreadyCalled) {
            console.log('Already subscribed...');
        } else {
            _alreadyCalled = true;
            console.log("Subscribed to ", view);
        }
    }
}

console.clear();
let subscribe = likeTheVideo();
subscribe();
subscribe();
subscribe();

/**
 * Write the polyfill for "_.once" method in lodash.
 * 
 */

 function once(func, context) {
    let ran;
    return function () {
      if (func) {
        ran = func.apply(context || this, arguments);
        func = null;
      }
  
      return ran;
    };
  }
  
  // Usage
  const hello = once(() => console.log("hello"));
  
  console.clear();
  hello();
  hello();
  
  /**
   * Write the polyfill for "_.memoize" method in lodash.
   */
function memoize(func) {
    let res = {};
  
    return function (...args) {
      const argsIndex = JSON.stringify(args);
      if (!res[argsIndex]) 
               res[argsIndex] = func(...args);
      return res[argsIndex];
    };
}
  
const clumsysquare = memoize((num) => {
  for (let i = 1; i <= 100000000; i++) {}
  return num * 2;
});

console.time("First call");
console.log(clumsysquare(9467));
console.timeEnd("First call");

// use the same value two times
console.time("Second call");
console.log(clumsysquare(9467));
console.timeEnd("Second call");
  

// Read more on pureFunctions.js