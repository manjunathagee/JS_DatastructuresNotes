// var, let, const three ways of creating variable in JS

/**
 * var is function scope
 * let and const is block scope
 * 
 * var vs let vs const
 * 
 * 1. var - function scope, let and const - block scope
 * 2. redeclaring var is okay, but not let and const
 * 3. variable shadowing var to let is okay, but not reverse
 * 4. let and const are hoisted in TDZ
 * 5. const needs to be iniitalized with declaration
 * 
 */

function fnScope(){
    // function scope
}

{
    // block scope
}

var globalScope = 5;
console.log('Global Scope: ',globalScope);

{
    var a = 5;
}
console.log(a); // works as a is in global scope

{
    let a = 5;
}
console.log(a);// ReferencError: a is not defined -> let and const has block scope

// variable Shadowing - we can shadow var with let, but reverse will cause illegal shadowing - varible is already defined

function test() {
    var a = 5;
    let b = 6;
    if(true) {
        let a = 10; // legal shadowing var to let
        // var b = 10; illegal shadowing SyntaxError: Idendifier 'b' has already been declared

        console.log(a, b);
    }
    console.log(a, b);
}

// -----------------------
var a;
var a; // perfectly legal to redeclare var

let b;
//let b; // illegal let and const cannot be redeclared in side the same scope

const c = 5;
{
    const c = 10; // shadowing perfectly legal, it's block scoped
}

// ------------------------------ Hoisting -------------------------
console.log(count); // undefined
var count = 10;

/**
 * let and const are also hosted but in temporal dead zone
 * temporal dead zone is the time between the declaration and initialization of let and const variables
 * TDZ is the state where variables are in the scope but not yet initialized
 */
console.log(flag); // ReferenceError: cannot access 'flag' befor initialization
let flag = true;

function abc () {
    console.log(a); // undefined
    console.log(a,b,c); // b, c are hoisted in temporal dead zone

    var a = 10;
    let b = 5;
    const c = 10;
}