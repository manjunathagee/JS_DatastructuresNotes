/**
 * Pure function: 
 * 1. should not depend anything apart from arguments(no external dependencies).
 * 2. should not mutate arguments.
 * 3. should not have side effects.
 * 4. should return same value as long as function is called with same arguments.
 * 
 */

// NOt a pure function, breaks all the above rules
let arr = [1,2,3];

function addElementToArrar(element) {
    arr.push(element);
}
addElementToArrar( 4);
// console.log(arr);

// Converting to a pure functions

function addElement(array, value) {
    return [...array, value];
}


/**
 * Function currying f(a,b)-> f(a)(b); normal function to curried function
 * 
 */

function fun(a) {
    return (b) => {
        console.log(a, b);
    }
}

// let func = fun(3)(4);
// console.log(func);

/**
 * Implement sum(1)(2)(3)
 */

function sum(a) {
    return (b) => {
        return (c)=> {
            return a+b+c;
        }
    }
}

// console.log('Sum of sum(1)(2)(3):', sum(1)(2)(3));

/**
 * Implement below function
 * evaluate("sum")(1)(2);
 * evaluate("subtract")(1)(2);
 * evaluate("multiply")(1)(2);
 * evaluate("divide")(1)(2);
 */

function evaluate(operation) {
    return (a) => {
        return (b) => {
            switch(operation) {
                case "sum":
                    return a+b;
                case "subtract":
                    return a - b;
                case "multiply":
                    return a * b;
                case "divide":
                    return a / b;
            }
        }
    }
}

evaluate("sum")(1)(2);
evaluate("subtract")(1)(2);
evaluate("multiply")(1)(2);
evaluate("divide")(1)(2);

/**
 * Infinite currying function
 * infiniteSum(1)(2)...
 * infiniteSum(1)(2)(3)()...
 */

function infiniteSum(a){
    return function(b) {
        if(b) {
            return infiniteSum(a+b);
        } else {
            return a;
        }
    }
}

const oneLiner = a => b => b ? oneLiner(a+b): a;

/**
 * function currying and partial application
 * sum(a, b, c) => sumCurry(a)(b)(c); this is function currying i.e if number of arguments is 3 we have three function declarations
 * sum(a, b, c) => sumPartialApplication(a)(b, c); this is partial application i.e function currying expects above condition
 */

const sumCurry = (a) => {
    return (b) => {
        return (c) => {
            return a + b + c;
        }
    }
}

const sumPartialApplication = (a) => {
    return (b, c) => {
        return a + b + c;
    }
}

/**
 * Write a utility function which takes a functions and returns a curried version of the same
 */

function curry(func) {
    // args takes arguments in the form of array eg - [a, b, c]
    return function curriedFunc(...args) {
      //check if current args passed equals the number of args function expects 
      if(args.length >= func.length) {
        // if yes, we spread args elements to pass into func (spread). This is our base case.
        return func(...args)
      } else {
        /* if not, we return a function that collects the next arguments passed in next and 
        we recursively call curriedFunc, accumulating and spreading the values of args first and then
        the values of next. next will take into consideration a variable amount of next arguments
        e.g (1, 2) (1) (1,2,3) */
        return function(...next) {
          return curriedFunc(...args,...next);
        }
      }
    }
}
  
const join = (a, b, c) => {
    return `${a}_${b}_${c}`
}
const curriedJoin = curry(join)

// curriedJoin(1, 2, 3) // '1_2_3'

// curriedJoin(1)(2, 3) // '1_2_3'

curriedJoin(1, 2)(3) // '1_2_3'
  
  