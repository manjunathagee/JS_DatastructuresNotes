/**
 * 
 * ES5 feature. Defines that JavaScript code should be executed in "strict mode".
 * 
 * The "use strict" directive is only recognized at the beginning of a script or a function.
 * 
 */
"use strict";
x = 3.14;       // This will cause an error because x is not declared

myFunction();

function myFunction() {
  y = 3.14;   // This will also cause an error because y is not declared
}

x = 3.14;       // This will not cause an error.
myFunction();

function myFunction() {
  "use strict";
  y = 3.14;   // This will cause an error
}

// Using an object, without declaring it, is not allowed:
x = {p1:10, p2:20}; 

/**
 * Deleting a variable (or object) is not allowed.
 * Deleting a function is not allowed.
 * Duplicating a parameter name is not allowed.
 * Writing to a read-only property is not allowed.
 * Writing to a get-only property is not allowed.
 * Deleting an undeletable property is not allowed.
 * 
 *  */ 

let xx = 3.14;
delete xx; 

function fn(p1, p2) {};
delete fn; 

function x(p1, p1) {};

const obj = {};
Object.defineProperty(obj, "x", {value:0, writable:false});

obj.x = 3.14;            // This will cause an error

const obj = {get x() {return 0} };

obj.x = 3.14; 

delete Object.prototype; // This will cause an error

/**
 * We cannot use eval, arguments as variable names, and also all the future keywords cannot be used like let, const etc..
 * In strict mode, eval() can not declare a variable using the var and let keyword:
 */
let eval = 3.14;         // This will cause an error 
let arguments = 3.14;    // This will cause an error

eval ("var x = 2");
alert (x);    // This will cause an error

/**
 * "use strict"; can be used at script level(applicable to all script) or a function level (when declared inside a fucntion)
 * 
 * it should be declared at the top for global level or when used inside a function it should be the first statement
 */

 function myFunction() {
    alert(this); // will alert "undefined", when used in non strict mode, this will be window object
  }
  myFunction();