/**
 * Hoisting, Scope, Callback, Arrow function
 *
 * First class functions - functions are treated as variables which can be passed around as args, assigned, re-assigned etc.
 *  
 */

function squareFn1() {
    // Function declaration
}

const squareFn2 = function() {
    // Function expression are assigned to a variable
};

// IIFE- Immediatly invoked function expression
// (function(msg) {console.log(msg)})('hello');

// What's the output of below functions
(function(x){
    return (function(y){
        // console.log(x); // 1
    })(2)
})(1);

for(let i=0;i<5;i++) {
    setTimeout(() => {
        // console.log(i); // let creates a block scope here so output will be 0,1,2,3,4
    }, i*1000);
}

for(var i=0;i<5;i++) {
    setTimeout(() => {
        // console.log(i); // var has global scope, so when it prints i value will be 5, so o/p will be 5 5's
    }, i*1000);
}

var x = 10;

// display();

let display = function() {
    console.log(x); // Reference Error, functions expressions are not hoisted, Temporal dead zone
}

var testing = function(){
    console.log(x); // undefined, x is looked inside this scope and if it's not available then only it goes to it's outer scope
    var x = 5;
}

// Params vs Arguments
testing = function(num) { // while receiving it's called parameters
    return num ** 2;
}

testing(5); // While invokig a function it's called arguments

/**
 * Spread vs rest operator
 * 
 * Can have max one rest operator as params, it should be the last one, it will be of type array
 * 
 * */ 

testing = function(a,b, ...rest) {
    console.log(a,b, rest); // 1,2, [3,4,5]
    console.log(Array.isArray(rest)); // true
}

// testing(1,2,3,4,5);

/**
 * 
 * callback func is a func which is passsed as an argument and which is invoked inside the outer function as part of some routine or action.
 * 
 * ex. map, filter, setTimeout, setInterval, document.addEventListener('click', ()=> {}); etc..
 * 
 * */

/**
 * Arrow functions available in ES6, it has clean syntax and this binding
 * diff b/w arrow and normal functions
 * 
 */

//1- syntax
let regFunction = function () {
    // 
}

let arrFunction = () => {
    //
}

//2- implicit return
regFunction = function(num) {
    return num ** 2;
}

arrFunction = (num) => num ** 2;

//3-Arguments
regFunction = function() {
    console.log(arguments); // arguments are available
}

regFunction(1,2,3);

arrFunction = () => {
    console.log(arguments); // arguments are not defined
}

// arrFunction(4,5,6);

//4-this reference

var employee = {
    empName: 'abc',
    fn1: () => {
        console.log('Welcome' +this.empName);
    },
    fn2: function () {
        console.log('Welcome' +this.empName);
    }
}

employee.fn1(); // arrow funciton this points to global obj here, to the outer scope
employee.fn2(); // able to access employee name