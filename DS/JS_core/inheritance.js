/**
 * Polyfills for bind method
 *
 * Polyfills are browser fallback if it does not have that function defined
 *  
 */

let person  = {
    name: 'Manju'
};

let printName = function(state, country) {
    console.log(`Welcome ${this.name} ${state} ${country}`);
}

let printMyName = printName.bind(person, 'karnataka');
printMyName('Inida');

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

