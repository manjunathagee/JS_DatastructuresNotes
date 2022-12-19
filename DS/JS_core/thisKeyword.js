this.a = 5; // this points to window, window.a = 5;
console.log(a, this.a, window.a);// all are same

function print() {
    console.log(this.a);
}

print(); // this is similar to this.print(); so this inside print will be window so o/p will be 5

let user = {
    name: 'manju',
    print: function (){
        console.log(this.name)
    },
    address: {
        state: 'KAR',
        getDetails: function() {
            console.log(this.name + ' lives in '+ this.state);
        }
    }
};

user.print(); // print is called with user ref, so within print method this will point to user object
user.address.getDetails(); // undefined lives in KAR -> getDetails is called with address object which has state, but not name which is undefined


user = {
    name: 'manju',
    print: () => {
        // printNew here has it's outer scope this points to window,since it is a arrow function so o/p will be empty
        const printNew =() => console.log(this.name);
        printNew();
        console.log('Outer', this); // window -> it's parent scope which is window
    },
    printName: function() {
        // print here has it's outer scope this points to user, so this.name will be 'manju'
        const print =() => console.log(this.name);
        print();
    },
    address: {
        state: 'KAR',
        getDetails: () => {
            console.log("Inner", this); // window again -> this for arrow function comes from it's outer scope which is window
        }
    }
};

console.clear();
user.print();
user.address.getDetails();
user.printName();

// this behaviour inside class

class User {
    constructor(name, state, country) {
        this.name = name;
        this.state=state;
        this.country = country;
    }
    // within class this points to current object for regualr fn, function declaration and arrow function
    getName() {
        console.log(this.name);
    }

    getState = function() {
        console.log(this.state);
    }

    getCountry = () => {
        console.log(this.country);
    }

}
console.clear();
user = new User('abc', 'KAR', 'India');
user.getName(); 
user.getState();
user.getCountry();

// what is the result of accessing it's ref

function makeUser() {
    return {
        name: 'Manju',
        ref: this
    }
}

user = makeUser();
console.clear();
console.log(user.ref.name); // empty value -> makeUser is called without any object so "this" inside fn will be window, and window.name will return empty

// How to make above function to return inner object ref
function makeUser1() {
    return {
        name: 'Manju',
        ref() {
            return this
        }
    }
}

user = makeUser1();
console.clear();
console.log(user.ref().name);

// this with settimout
user = {
    name: 'manju',
    printName() {
        console.log(this.name);
    }
}

console.clear();
// setTimeout(user.printName, 1000); // empty - we are passign only the function ref, when settimeout invokes this func it will call with window ref which does not have name
// setTimeout(user.printName.bind(user), 1000); // manju
// setTimeout(()=> user.printName(), 1000); // manju

// Implement caculator
let calculator = {
    read() {
        this.num1 = Number.parseInt(prompt('Enter first number'))
        this.num2 = +prompt('Enter second number')
    },
    sum() {
        return this.num1 + this.num2;
    },
    mul() {
        return this.num1 * this.num2;
    }
};

// calculator.read();
// console.clear();
// console.log(calculator.sum());
// console.log(calculator.mul());

// NOTE: +"23" will become number 23

// What is the output of below function

var length = 5;

function callback() {
    console.log(this.length);
}

user1 = {
    length: 10,
    print(cb) {
        cb(); // even though print has "this" referencing to user1, cb() is called without any object ref hence it will print global value which is 5
    }
}

user1.print(callback);// 5

// How to fix above problem to print 10
user1 = {
    length: 10,
    print(cb) {
        cb.call(this); 
    }
}

user1.print(callback);// 5

user1 = {
    length: 10,
    print() {
        console.log(arguments)
        arguments[0](); // here arguments has it's own property called length which is geting printed which is 5
    }
}

console.clear();
user1.print(callback,2,3,4,5); // 5 

// Implement calc
const calc = {
    value: 0,
    add(val) {
        this.value +=val;
        return {
            ...this
        }
    },
    sub(val) {
        this.value -= val;
        return {
            ...this
        }
    },
    mul(val) {
        this.value *= val;
        return {
            ...this
        }
    }
};

const result = calc.add(10).sub(5).mul(5).add(10);
console.clear();
console.log('Result', result);