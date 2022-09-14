/**
 * Objects are key value pair where key is a string or a symbol
 */

let user = {
    name: 'abc',
    age: 31
};

console.log(user.name); // access property
user.name = 'Manju'; // modify property
console.log(user);
delete user.age; // remove property
console.log(user);

// O/p of below program

const func = (function(a) {
    delete a;
    return a;
})(5);

console.log(func); //5 - delete is used to remove propert of an object not a variable so output will be 5

user = {
    "valid key now": true
}

console.log(user['valid key now']);

delete user['valid key now'];

// Adding value dynamically 
const fName = 'firstName';
const value = 'Manju';

user = {
    fName: value
};

console.clear();
console.log(user); // {fName: 'Manju'} but we wanted like {firstName: 'Manju'}

user = {
    [fName]: value // wrap key with [] to evaluate to it's value
}

console.log(user); // {firstName: 'Manju'} 

// Iterating over an object
user = {
    name: 'abc',
    age: 21
};

for(key in user) {
    console.log(key, user[key]);
}

// O/p based question

user = {
    a: 1,
    b: 2, 
    a: 4
};

console.log(user); // {a:4, b: 2} - duplicate key here, last value will override the key but it will still maintains it's position

let a = {};
let b = {key: 'a'};
let c = {key: 'c'};

a[b] = '123';
a[c] = '456';

console.log(a[b]); // 456 - keys are strings for JS objects and a[b] b.toString() is called which is '[object Object]'- so a[b] will be a['[object Object]'] = '123', 
// which will be overwritten with a[c]-> a['[object Object]']='456'

// JSON.stringify and parse

user = {
    name: 'abc',
    age: 31,
    getAge: function() {
        return this.age;
    }
}

let strObj = JSON.stringify(user);
console.clear()
console.log(strObj)
console.log(user);

let userObj = JSON.parse(strObj);
console.log(userObj);

// common usecase - used for storing objects in localStorage, if we directly store object in localStorage it will be converted to '[object Object]' so convert to string 
//and store it 

console.log(..."abc"); // a b c
console.log([...'abc']); // [a, b, c]

user = {
    name: 'abc',
    age: 31,
    designation: 'PSE',
    getAge: function() {
        return this.age;
    }
}

strObj = JSON.stringify(user, ["name", "age"]); // stringify only name and age which is passed as second arg
console.clear();
console.log(strObj);

let newUser = {...user, name: 'def'}; // use of spread operator on object
console.clear()
console.log(newUser);

user = {
    name: 'abc',
    age: 31,
    designation: 'PSE',
    getAge: function() {
        return this.age;
    },
    getName: () => this.name // this points to window object from witnin an arrow function
};

console.clear();
console.log(user.getAge(), user.getName()); // 31, '' -> this points to window object within arrow function

// Object destructuring 
user = {
    name: 'abc',
    age: 31,
    designation: 'PSE',
    address: {
        state: 'KAR',
        country: 'India'
    },
    getAge: function() {
        return this.age;
    },
    getName: () => this.name // this points to window object from witnin an arrow function
};

// name is read directly, age is read with an alias name, getAge and getName are func ref address is read from deep object reference
let {name, age: myAge, getAge, getName, address: {country}} = user; 

console.clear()
console.log(name, myAge, country);

// Only reference point to same memmory locations
console.clear();
console.log({a: 1} == {a: 1}); // false - objects are indepedent in memmory
console.log({a: 1} === {a: 1}); // false

let personList = [user];
// user = null;
console.log(personList); // [{user object}] assiging user to null as no effect here
user.name = null;
console.log(personList); // [{name: null}] assigning null to name will affect

let point = {num: 10};

let print = (x = {...point}) => console.log(x.num *= 2);
console.clear();
print(); //20 default value will be used, since we are using spread operator it clones the original object and does not modify original object
print(); // 20
print(point);// 20 but this time since we are passing point, it's value is getting modified
print(point); // 40

///-----------
function changeObj(person) {
    person.age= 10; // person points to person1, so person1.age will become 10 
    person = {      // person is assigned to entire new object and original person1 will be untouched
        name: 'abc',
        age: 31
    }
    return person;
}

let person1 = {
    name: 'ratna',
    age: 32
}

let person2 = changeObj(person1); 
console.log(person1); //{name: 'ratna', age: 10}
console.log(person2); //{name: 'abc', age: 31}


/**
 * Deep and shallow copy
 * 
 * shallow copy - copies the references only, if the original object is changed both referenes are affected
 * Deep copy - A new copy of object is created and disconnected from original object, changing the original
 * as no effect on cloned one
 * 
 * Both spread and Object.assign does copy at a first level, deep objects are shollow copied
 * Use JSON.parse and stringify for deep copy for nested level
 * 
 * Primitives are simple they are deep copy
 */

user = {
    name: 'abc',
    address: {
        state: 'KAR',
        country: 'India'
    }
};

let obj1 = Object.assign({}, user);
let obj2 = JSON.parse(JSON.stringify(user));
let obj3 = {...user};

console.clear();
console.log('Three ways to clone an object');
console.log(obj1, obj2, obj3);



user={
    name: 'Manju',
    address: {
        street: 'JP naga',
        state: 'KAR'
    }
}

let shallowClone = {...user};
user.address.state = 'MP';
console.clear();
console.log(user);
console.log(shallowClone);

let deepclone = JSON.parse(JSON.stringify(user));
user.address.state = 'AP';
console.clear();
console.log(user);
console.log(deepclone);