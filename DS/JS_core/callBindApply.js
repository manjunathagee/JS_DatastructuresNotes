/**
 * call bind and apply is used for explicit object binding
 * call, bind, apply are not applicable for Arrow functions
 * this inside arrow functions are derived from outer scope
 * Math.max.apply(null, array);
 */

let user = {name: 'Abc'};

function printDetails(age) {
    console.log(`Welcome ${this.name} ${age}`);
}

printDetails.call(user, 32);
printDetails.apply(user, [21]);

/** 
 * call, apply and bind are available to all the functions
 * Both call and apply will immediatly invoke the method w.r.t the given object
 * Difference b/w call and apply is, call expects comma separated arguments and apply expects array as second argument
 * 
 * apply(array of arguments) to remember
 * 
 * bind will return a new function and it does not invoke the method immediatly like call and apply methods
 * 
*/

let arrFn = () => {
    console.log('Welcome ', this.name); // empty o/p since window.name is not available
    console.log(this); // it will be window
}

let newFn = arrFn.bind(user); // call, bind and apply not available for arrow functions
newFn(); // Welcome '' this inside newFn is still window
 

user = {name: 'Manju'};

function printDetails(age) {
    console.log(`Welcome ${this.name} ${age}`);
}

let bindFn = printDetails.bind(user, 31);
bindFn(21); // Welcome Manju 31 and not with age 21, since it's already bind with 31 age

bindFn = printDetails.bind(user);
bindFn(22); // Welcome Manju 22

// O/P of below program

var status = 'Morning';

let hello ='hi'; // NOTE: let does not add to window object

setTimeout(() => {
    let status = 'Afternoon';

    let data = {
        status: 'Evening',
        getStatus(){
            console.log(this.status);
        }
    }

    // console.clear();
    // data.getStatus(); // getStatus is invoked with data object, so Evening
    // data.getStatus.call(this); // this inside an arrow function points to it's outer scope and settimeout has window as outer scope hence Morning 
}, 0);

// Implement printAnaimals such that it prints all animals in object

const animals = [
    {species: 'lion', name: 'King'},
    {species: 'Whale', name: 'Queen'},
];

function printAnaimals(i) {
    this.print = function() {
        console.log(`# ${i} ${this.species} : ${this.name}`);
    }
    this.print();
}

console.clear();
for (let index = 0; index < animals.length; index++) {
    const element = animals[index];
    printAnaimals.call(element, index);
}

// Append an array to another array
let arr1 = [1,2,3];
let arr2 = [4,5,6];

// NOTE: concat returns new array
// soln 1
arr1 = [...arr1, ...arr2];
console.clear();
console.log(arr1);

arr1 = [1,2,3];
arr2 = [4,5,6];

arr1.push.apply(arr1, arr2);

console.clear()
console.log(arr1);
console.clear()

console.log(Math.max.apply(null, arr1)); // apply expects second arg as array and we do not need to pass a context this

// NOTE: When we bind the context to null, it will be window object
function cb() {
    console.log(this);
}

let obj = {
    g: cb.bind(null) /// binding to null, so it can never be overriden from window to other context
}

obj.g();// window

// Bind chaining
function f() {
    console.log(this.name);
}

f = f.bind({name: 'abc'}).bind({name: 'def'});
console.clear();
f(); // 'abc' -> bind chaining does not exists once it's bind to an object it will never change

// Fix the function to make the code work properly

function checkPassword(success, failure){
    let password = prompt('Password?', '');
    if(password == 'abc') 
        success();
    else 
        failure();
}

user = {
    name: 'manju',
    success() {
        console.log(`${this.name} logged in`);
    },
    failure() {
        console.log(`${this.name} failed to log in`);
    }
}

// this.name is undefined, we are only passing the function refrence and when we are calling it we are not passing the reference for succes() and filure() hence it wil be looked in the window scope
// checkPassword(user.success, user.failure); 

// fix is to bind to user context
// checkPassword(user.success.bind(user), user.failure.bind(user));

user = {
    name: 'Manju',
    login(result) {
        console.log(this.name + " " + (result? 'Logged in success': 'Loggin in failure'));
    }
}

// checkPassword(?, ?); fix this to call with single function call
// checkPassword(user.login.bind(user, true), user.login.bind(user, false)); bind to login and we can pass additional args as well.

// Call, apply bind with arrow functions.
// NOTE: We cannot manipuluate arrow function context with call, bind and apply, it's context is derived from it's parent scope

// Polyfills for call, bind and apply.

function buyCar(currency, price) {
    console.log(
        `I have purchaged ${this.color} - ${this.company} car for ${currency} ${price}`
    )
}

let carDetails={
    color: 'Black',
    company: 'Thar'
};

console.clear();

Function.prototype.myCall = function (context={}, ...args) {

    if(typeof this !== 'function') {
        throw new Error(this +" is not callable");
    }
    context.fn = this;
    context.fn(...args);
}
buyCar.myCall(carDetails, 'INR', '200K');

console.clear();

Function.prototype.myApply = function (context={}, argsArr = []) {

    if(typeof this !== 'function') {
        throw new Error(this +" is not callable");
    }
    if(!Array.isArray(argsArr)) {
        throw new Error(argsArr + ' should be an array')
    }
    context.fn = this;
    context.fn(...argsArr);
}
buyCar.myApply(carDetails, ['USD', '200K']);

let person  = {
    name: 'Manju'
};

let printName = function(state, country) {
    console.log(`Welcome ${this.name} ${state} ${country}`);
}

let printMyName = printName.bind(person, 'karnataka');
printMyName('India');

Function.prototype.myBind = function(...args) {
    let thisRef = this; // here this points to the printName reference, ...args will contain array of arguments

    return function() {
        thisRef.call(args[0]); // that's why we invoke thisRef with args[0] - person object
    }
}

let printMyNameCustom = printName.myBind(person);
// printMyNameCustom();

// Above implementation will fail for below call
// printMyNameCustom = printName.myBind(person, 'Karnataka'); // Welcome Manju undefined

Function.prototype.myBind = function(...args) {
    let thisRef = this,
        params = args.slice(1);
    return function() {
        thisRef.apply(args[0], params);
    }
}

printMyNameCustom = printName.myBind(person, 'Karnataka'); // Welcome Manju undefined
// printMyNameCustom();

//Above implementat6ion will fail for below call
// printMyNameCustom('India');

Function.prototype.myBind = function(...args) {

    if(typeof this !== 'function') {
        throw new Error(this +" is not callable");
    }

    let thisRef = this,
        params = args.slice(1);

    return function(...args2) {
        thisRef.apply(args[0], [...params, ... args2]);
    }
}

printMyNameCustom = printName.myBind(person, 'Karnataka'); 
printMyNameCustom('India');
