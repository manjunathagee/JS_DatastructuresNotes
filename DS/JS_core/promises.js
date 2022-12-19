function printText(text, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (text === "admin") {
        resolve("Welcome Admin");
      } else {
        reject(new Error("Invalid user"));
      }
    }, delay);
  });
}

// printText('admin', 2000).then(res => console.log(res)).catch(err => console.log(err));

// Promise.race([printText('admin', 1000), Promise.resolve('Welcome')]).then((res) => console.log(res));

/**
 * Write a polyfill for Promise.all
 */
myAll = function (promises) {
  if (!Array.isArray(promises)) return;

  let result = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then((res) => result.push(res)).catch((err) => reject(err));
      if (index === promises.length) {
        resolve(result);
      }
    });
  });
};
// myAll([printText('admin', 1000), Promise.resolve('Welcome')]).then((res) => console.log(res));

// console.log('Start')

// Promise.resolve('testing').then(val => console.log(val));

// console.log('Finish')

console.log("Start");

let sub = new Promise((resolve, reject) => {
  setTimeout(() => {
    const bool = true;
    if (bool) resolve("Success");
    else reject(new Error("Faillure"));
  }, 0);
});

// sub
//     .then((valu) => console.log(valu))
//     .catch(err => console.error(err));

console.log("Finish");

console.clear();

console.log("Start");

function like(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Like ${video}!!`);
    }, 1000);
  });
}

function share(video) {
  return new Promise((resolve, reject) => {
    let flag = true;
    setTimeout(() => {
      if (flag) resolve(`Share ${video}!!`);
      else reject(new Error("Unable to share"));
    }, 1000);
  });
}

function subscribe(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Subscribe ${video}!!`);
    }, 500);
  });
}

/**
 * Pyramid of doom or callback hell, how do you resolve this with promise chaining.
 */
// like('Rodeside coder')
//     .then(val => {
//         console.log(val)
//         share('Rodeside coder')
//         .then(val => {
//             console.log(val);
//             subscribe('Rodeside coder')
//                 .then(val => console.log(val))
//         })
//     })
//     .catch(err => console.error(err));

console.log("Finish");

/**
 * Promise chaining
 */
// like('Rodeside coder')
//     .then(val => {
//         console.log(val);
//         return share('Rodeside coder');
//     })
//     .then(val => {
//         console.log(val);
//         return subscribe('Rodeside coder');
//     })
//     .then(val => console.log(val))
//     .catch(err => console.error(err));

/**
 * We have 4 promise combinators
 */

/**
 * Promise.all -> static method of Promise which takes an array of promises and returns a promise which resolve to list of values in the same order
 * If any one of the promise gets failed all promises will fail, with first rejected message
 * Executes all of them in parallel but waits untill all of them are resolved
 */

Promise.all([
  like("Rodeside coder"),
  share("Rodeside coder"),
  subscribe("Rodeside coder"),
])
  // .then(val => console.log(val))
  .catch((err) => console.error(err));

/**
 * Promise.race -> Returns the value of that promise which got executed first, it could be resolve or reject
 */
Promise.race([
  like("Rodeside coder"),
  share("Rodeside coder"),
  subscribe("Rodeside coder"),
])
  // .then(val => console.log(val))
  .catch((error) => console.error(error));

/**
 * Promsie.allSettled -> similar to Promise.all but retuns all resolved and rejected values
 */

Promise.allSettled([
  like("Rodeside coder"),
  share("Rodeside coder"),
  subscribe("Rodeside coder"),
])
  // .then(val => console.log(val))                  // Array of objects with status and value
  .catch((error) => console.error("Failed", error));

/**
 * Promise.any -> similar to Promise.race but returns first resolved value and ignores all rejected promises, if all failes then this will
 * get rejected
 */

Promise.any([
  like("Rodeside coder"),
  share("Rodeside coder"),
  subscribe("Rodeside coder"),
])
  // .then(val => console.log(val))
  .catch((err) => console.error(err));

/**
 * async await
 */

let result = async () => {
  // Use async if u want await
  // Use try catch block to handle rejected case, anything after reject will be caught in catch block
  try {
    let msg1 = await like("Rodeside coder"); // use await on promise -> it will wait either resolve or reject
    console.log(msg1);
    let msg2 = await share("Rodeside coder");
    console.log(msg2);
    let msg3 = await subscribe("Rodeside coder");
    console.log(msg3);
  } catch (err) {
    console.error(err);
  }
};

setTimeout(() => {
  // console.clear();
  // result();
}, 1000);

/**
 * Whats' the output of below programs
 */

console.clear();
// console.log('start');

let sub1 = new Promise((resolve, reject) => {
  // console.log(1); // Body of promise will execute and retuns a new promise
  resolve(2); // if this line is commented out then the 'then' block will never gets called
});

// sub1.then(val => console.log(val)); // resolve or reject will always goes to event queue

// console.log('end');

// o/p start -> 1 -> end -> 2

/**
 * Whats' the output of below programs
 */

function job() {
  return new Promise((resolve, reject) => reject());
}

sub = job();

sub;
// .then(val => console.log("val"+ val))
// .then(val => console.log("val"+ val))
// .then(val => console.log("val"+ val))
// .catch(err=> console.error('Error'))
// .then(val => console.log("Final"));
// o/p -> Error Final -> we caught it then also 'Final' is getting printed here

/**
 * Whats' the output of below programs
 */

function job(status) {
  return new Promise((resolve, reject) => {
    if (status) {
      resolve("success");
    } else {
      reject("failure");
    }
  });
}

sub = job(true);

sub;
// .then(val => {
//     console.log(val);
//     return job(false);
// })
// .catch(err => {
//     console.log(err);
//     return "Failed case"; // Returning string is equivalent to resolve("Failed case");
// })
// .then(val => {
//     console.log(val);
//     return job(true);
// })
// .catch(err => console.log((err)))
// ouput: success error Failed case

let promise = job(true);

promise
  .then((val) => {
    console.log(val); // Success
    return job(true);
  })
  .then((val) => {
    if (val !== "victory") {
      throw "Defect"; // NOTE: thow causes reject, next then is skipped reject("Defect")
    }
    return job(true);
  })
  .then((val) => {
    console.log(val); // Will be skipped because of throw
  })
  .catch((val) => {
    console.log(val); // Defect
    return job(false);
  })
  .then((val) => {
    console.log(val); // Skipped since we are rejecting from previous chain
    return job(true);
  })
  .catch((val) => {
    console.log(val); // Failure
    return "Error Caught"; // it is equavalent to resolve("Error Caught")
  })
  .then((val) => {
    console.log(val); // Error Caught
    return new Error("Error caught again!"); // NOTE: it's similar to resolve
  })
  .then((val) => {
    console.log("Success: ", val); // Error caught again!
  })
  .catch((val) => {
    console.log("Error:", val); // Never gets called.
  });

/**
 * Create a promise which takes another promise as resolve and resolving it should print "First"
 *
 */

let firstPromise = new Promise((resolve, reject) => {
  resolve("First");
});

let secondPromise = new Promise((resolve, reject) => {
  resolve(firstPromise); // NOTE: we can resolve to another promise instance
});

secondPromise
  .then((promise) => promise)
  .then((value) => console.log("Resolved First primise:", value));

/**
 * Rewrite below function using async/await
 */

function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}

async function loadJsonWithAsyncAwait(url) {
  let response = await fetch(url);
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(response.status);
  }
}

loadJsonWithAsyncAwait("https://dummyjson.com/products/1")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

/**
 * NOTE: Anything returned from async function is a promise, if you throw then it's rejected value
 *
 */
async function test() {
  return "hello";
}
test(); // Returned is resolve("hello")

/**
 * Write a function which resolves promises recursively,args - array of promises
 */

function recursivePromises(promises) {
  let result = [];

  helper = (promiseArr) => {
    if (promiseArr.length) {
      promiseArr[0].then((val) => console.log(val));
      helper(promiseArr.slice(1));
    } else {
      return result;
    }
  };
  result = helper(promises);
  return result;
}

result = recursivePromises([
  Promise.resolve("hello"),
  Promise.resolve("world"),
]);
console.log("Recursive Promises:", result);

/**
 * @method racePolyFill Polyfill for Promise.race method
 * @param {*} promises
 * @returns
 */
Promise.racePolyFill = function (promises) {
  if (!Array.isArray(promises)) return;

  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve).catch(reject);
    });
  });
};

/**
 * Create a Polyfill for a promise
 */

function PromisePolyFill(executor) {
  let onResolve,
    onReject,
    fulfilled = false,
    rejected = false,
    called = false,
    value;

  function resolve(v) {
    fulfilled = true;
    value = v;

    if (typeof onResolve === "function") {
      // for async
      console.log("inside resolve");
      onResolve(value);
      called = true;
    }
  }

  function reject(reason) {
    rejected = true;
    value = reason;

    if (typeof onReject === "function") {
      onReject(value);
      called = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback;

    if (fulfilled && !called) {
      // for sync
      console.log("inside then");
      called = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;

    if (rejected && !called) {
      called = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

PromisePolyFill.resolve = (val) =>
  new PromisePolyFill(function executor(resolve, _reject) {
    resolve(val);
  });

PromisePolyFill.reject = (reason) =>
  new PromisePolyFill(function executor(resolve, reject) {
    reject(reason);
  });

const promise1 = new PromisePolyFill((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    resolve(2);
  }, 1000);
  console.log(3);
});

promise1.then((res) => {
  console.log(res);
});

const examplePolyfill = promisePolyfill((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello world");
  }, 1000);
});

examplePolyfill
  .then((val) => console.log(val))
  .catch((err) => console.error(err));

/**
 * Polyfills for combinators all, race, allSettled, any
 */

function printText(message, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(message);
    }, delay);
  });
}

function promiseAllPolyFill(promises) {
  if (!Array.isArray(promises) || promises.length === 0) return;

  const result = [],
    executedPromises = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((val) => {
          result.push(val);
          executedPromises.push(promise);

          if (executedPromises.length === promises.length) {
            resolve(result);
          }
        })
        .catch((error) => reject(error));
    });
  });
}

console.clear();
promiseAllPolyFill([
  printText("Hello world", 3000),
  printText("hi"),
  Promise.resolve("error occured!!"),
])
  .then((val) => console.log(val))
  .catch((err) => console.error(err));

function promiseRacePolyfill(promises) {
  if (!Array.isArray(promises) || promises.length === 0) return;

  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then((val) => resolve(val)).catch((err) => reject(err)); // resolve/reject outer promise, as and when any of the input promise resolves/rejects
    });
  });
}

/**
 * Above race polyfill as bug use below
 */
const race = function (promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      Promise.resolve(promise)
        .then(resolve, reject) // resolve, when any of the input promise resolves
        .catch(reject); // reject, when any of the input promise rejects
    });
  });
};

function promiseAllSettledPolyfill(promises) {
  if (!Array.isArray(promises) || promises.length === 0) return;

  let mappedPromises = promises.map((promise) => {
    return promise
      .then((val) => {
        return {
          status: "fulfilled",
          value: val,
        };
      })
      .catch((error) => {
        return {
          status: "rejected",
          reason: error,
        };
      });
  });
  return Promise.all(mappedPromises);
}

function promiseAny(promises) {
  if (!Array.isArray(promises) || promises.length === 0) return;

  let result = [],
    executedCount = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((val) => {
          resolve(val);
        })
        .catch((err) => {
          result.push(err);
          ++executedCount;
          if (executedCount === promises.length) {
            reject(result);
          }
        });
    });
  });
}

console.clear();
promiseRacePolyfill([
  printText("Hello world", 3000),
  printText("hi"),
  Promise.reject("Resolved without delay"),
])
  .then((val) => console.log(val))
  .catch((err) => console.error(err));
