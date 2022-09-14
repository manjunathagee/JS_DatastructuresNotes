/**
 * Map, Filter and Reduce methods
 *
 *  Map and filters both accepts a callback which will be invoked on each element of the array and return the new array.
 *  Map: returned element from callback will be included in the returned array
 *  Filter: callback returns boolean, if true current element will be included in returned array else no
 *  
 *  Reduce: it reduces the array elements to a single value
 *  const sum = [1,2,3].reduce((accumilator, currentValue, index, array) =>{return  accumilator + currentValue}, 0)
 */

var arr = [1,2,3,4,5];

var squaredArr = arr.map((ele, i, arr) => ele ** 2);

var filteredArr = arr.filter((ele, i, arr) => ele > 2);

var initialValue = 0; // if initial value is not provided, then first acc will be first element i.e '1' and curr will be second elemen i.e '2'
                      // if initial value is provided, then acc will be initial value provided and curr will be first element
var sum = arr.reduce((acc, curr, i, arr) => {
    return acc + curr;
}, initialValue);

// console.log(arr, squaredArr, filteredArr, sum);

/**
 * Polyfills for map, filter and reduce functions.
 */

Array.prototype.myMap = function (cb) {
    const result = [];
    for(let i=0;i<this.length;i++) {
        result.push(cb(this[i], i, this));
    }
    return result;
}

var arr = [1,2,3,4,5];

var doubleArr = arr.myMap((ele, i, arr) => ele * 2);
console.clear();
// console.log(doubleArr);

Array.prototype.myFilter = function(cb) {
    const result = [];
    for(let i=0;i<this.length;i++) {
        if( cb(this[i],i, arr) === true) {
                result.push(this[i])
        }
    }
    return result;
}

var filteredArr = arr.myFilter((ele, i, arr) => ele > 2);
console.clear();
// console.log(filteredArr);

Array.prototype.myReducer = function(cb, initialValue) {
    var accumulator = initialValue;

    for(let i=0;i<this.length;i++) {
        accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
    }

    return accumulator;
}

var arr = [1,2,3,4,5];
var initialValue = 0; 
var sum = arr.myReducer((acc, curr, i, arr) => {
    return acc + curr;
}, initialValue);

console.clear();
// console.log('My Reducer output: ', sum);

/**
 * Map vs forEach
 * 
 * Both are used to iterate over array elements
 * 
 * Map will return new array, by invoking callback over each element
 * forEach will return undefined (does not return anything)
 * 
 * since map returns a new array, we can chain other methods 
 * 
 *  */ 

var arr = [1,2,3,4,5];

var mappedArr = arr.map(arr => arr ** 2).filter(ele => ele > 5);

var forEachArr = arr.forEach(arr => arr ** 2);
// console.log(mappedArr, forEachArr);

/**
 * Output based questions
 * 
 */

let students = [
    {name: 'abc', rollNum: 1, marks: 80},
    {name: 'def', rollNum: 2, marks: 60},
    {name: 'fhi', rollNum: 3, marks: 50},
    {name: 'adh', rollNum: 4, marks: 30},
    {name: 'fac', rollNum: 5, marks: 84}
];

// return array of names with captalizing each name

const studentName = students.map(student => student.name.toUpperCase());
// console.log(studentName);

// Sum of marks of all students
let totalMarks = students.reduce((acc, curr) => {
    return acc + curr.marks;
}, 0);

// console.log('Total marks: ', totalMarks);

// Return only names of students who scored more than 50
const gradeStudents = students.filter(student => student.marks > 50).map(student => student.name);
// console.log(gradeStudents);

// Return total marks for students with grades greateer than 60 after adding 20 marks have been added to
// those who scored less than 50

totalMarks = students
    .map(student => {
        if(student.marks < 50) {
            student.marks += 20;
        }
        return student;
    })
    .filter(student => student.marks > 60)
    .reduce((acc, curr) => acc + curr.marks, 0);

console.log(totalMarks);