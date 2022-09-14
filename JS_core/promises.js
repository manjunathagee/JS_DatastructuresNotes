function printText(text, delay=1000) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            if(text === 'admin') {
                resolve('Welcome Admin');
            } else {
                reject(new Error('Invalid user'));
            }
        }, delay);
    });
}

// printText('admin', 2000).then(res => console.log(res)).catch(err => console.log(err));

// Promise.race([printText('admin', 1000), Promise.resolve('Welcome')]).then((res) => console.log(res));

/**
 * Write a polyfill for Promise.all
 */
myAll = function(promises) {
    if(!Array.isArray(promises)) return;

    let result = [];
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            promise.then((res) => result.push(res)).catch((err) => reject(err));
            if(index === promises.length) {
                resolve(result);
            }
        })
    })
}
// myAll([printText('admin', 1000), Promise.resolve('Welcome')]).then((res) => console.log(res));

console.log('Start')

Promise.resolve('testing').then(val => console.log(val));

console.log('Finish')
