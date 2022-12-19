
/**
 * Generator function is identified with a astrisk after function keyword or before function name
 * Calling generator function returns a generator object with next method which returns a value
 * yield is a special kind of return keyword
 * generatorObj.next(); returns an object with two property value(returned from yield) and boolean indicating wheather function is done 
 * executing or not
 */
function *simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const generatorObj = simpleGenerator();
// console.log(generatorObj.next()); //{value: 1, done: false}
// console.log(generatorObj.next()); //{value: 2, done: false}
// console.log(generatorObj.next()); //{value: 3, done: false}
// console.log(generatorObj.next()); //{value: undefined, done: true}


/**
 * We can write infite loops inside generators since it never runs to completion at once, which is useful to generate id's
 * We can have multiple instance of generator which never conflict with each other's state as they are completly isolated
 */
function* getId(){
    let id = 1;
    while(true) {
        yield id;
        id++;
    }
}

let idGenerator = getId();
// console.log(idGenerator.next().value);
// console.log(idGenerator.next().value);
// console.log(idGenerator.next().value);
// console.log(idGenerator.next().value);

/**
 * We can use generator to create iterators which returns elements of an array everytime we call it
 */

function* iterator(arr) {
    for(let i=0;i<arr.length;i++) {
        yield arr[i];
    }
}

let arrIterator = iterator([1,2,3]);
let item = arrIterator.next();
do {
    // console.log(item.value);
    item = arrIterator.next();
} while(item.done !==true);

arrIterator = iterator([1,2,3]);
// console.log(arrIterator.next().value); // Everytime you call next get next element in array, and it remembers prev value and gives next one
// console.log(arrIterator.next().value); 
// console.log(arrIterator.next().value); 

function* generateId() {
    let id = 0;
    while(true) {
        let incrementVal = yield id;
        if(incrementVal) {
            id += incrementVal;
        } else {
            id++;
        }
    }
}

idGenerator = generateId();
console.log(idGenerator.next().value); // we cannot pass next(value) for the first time because it as not yielded before
console.log(idGenerator.next(5).value); // pass value to yield and use it for next value generation
console.log(idGenerator.next().value);
// console.log(idGenerator.throw(new Error('Generic error...'))); // throw error existing generator
console.log(idGenerator.return(10).value); // return 10 and exit generator
console.log(idGenerator.next()); // {value: undefined, done: true}