// https://www.toptal.com/javascript/interview-questions

/**
 * Difference b/w Object.freeze vs const
 *
 * const applies to bindings ("variables"). It creates an immutable binding, i.e. you cannot assign a new value to the binding.
 * Object.freeze works on values, and more specifically, object values. It makes an object immutable, i.e. you cannot change its properties.
 */

const person = {
  name: "Leonardo",
};
let animal = {
  species: "snake",
};
person = animal; // ERROR "person" is read-only

person = {
  name: "Leonardo",
};
Object.freeze(person);
person.name = "Lima"; //TypeError: Cannot assign to read only property 'name' of object
console.log(person);

/**
 * Difference b/w undefined and not defined
 */
console.log(x); // undefined
var x = 10;

console.log(y); // Output: ReferenceError: y is not defined

/**
 * Differnece b/w function declaration and function expression
 */

foo();

function foo() {
  console.log("Fucntion declaration are hoisted..");
}

bar();
var bar = function () {
  console.log("Function expressions are not hoisted.."); // TypeError: foo is not a function
};

/**
 * How do you check if a number is integer or not
 */
function isInt(num) {
  return num % 1 === 0;
}

function isInt1(num) {
  return Math.round(num) === num;
}
console.log(isInt(1.1)); // false
console.log(isInt(1)); // true

/**
 * O/p based questions
 */
let counter = (function () {
  let k = 0;
  return () => k++;
})();

console.clear();
console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2

function createBadArray() {
  let badArr = [];

  for (var i = 0; i < 5; i++) {
    badArr[i] = function () {
      return "n=" + i;
    };
  }
  return badArr;
}

var badArr = createBadArray();
for (let val of badArr) {
  console.log(val()); // n=5 for 5 times
}

// Fix
function createBadArray() {
  let badArr = [];

  for (var i = 0; i < 5; i++) {
    badArr[i] = (function (i) {
      return "n=" + i;
    })(i);
  }
  return badArr;
}

/**
 * Difference b/w __proto__ and prototype
 * 
 * All constructor functions have prototype property and all objects have __proto__
 * Both are used to share data and functions without duplicating them
 * 
 * __proto__ is used for lookup chain
 * prototype is used for sharing code
 * 
 * prototype is a property of a class
 * __proto__ is a property of an object
 * 
 * prototype is part of ES6, __proto__ is part of ES5
 */

/**
 * Difference b/w async/await and promises
 * 
 * promise
 * async/await
 * 
 * Some operation which will complete in future
 * Syntatic sugar for promises which makes them synchronous structure by wrapping in a async function
 * 
 * Error handling is done with catch
 * Error handling is done with try/catch
 * 
 * It has three states - resolve, rejected, pending
 * It does not have that states
 * 
 */

/**
 * Assuming below will cause stack overflow, how will you fix it?
 */
 var list = readHugeList();

 var nextListItem = function() {
     var item = list.pop();
 
     if (item) {
         // process the list item...
         nextListItem();
        //  setTimeout( nextListItem, 0); // Fix - The stack overflow is eliminated because the event loop handles the recursion, not the call stack.
     }
 };

 /**
  * NOTE: map only iterates through actual values and not the empty slots
  */

  var b = [undefined];
  b[2] = 1;
  console.log(b);             // (3) [undefined, empty × 1, 1]
  console.log(b.map(e => 7)); // (3) [7,         empty × 1, 7]

  /**
   * NaN === NaN is false!!
   */
   console.log(typeof NaN); // number
   console.log(NaN === NaN); // false
   console.log(a++); // NaN, a is not defined so undefined++ is NaN
   var a;