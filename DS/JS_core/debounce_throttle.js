const searchInput = document.querySelector("#searchInput");
const defaultDiv = document.querySelector("#default");
const debounceDiv = document.querySelector("#debounce");
const throttleDiv = document.querySelector("#throttle");

/**
 * Debouce limits the no of times a function is called.
 * Debouncing is perfect for autocomplete but is also useful anywhere that you want to group multiple triggers into one trigger
 * Debouncing triggers function call if the differnece b/w two events is min of delay
 * e.g if the difference b/w two keystrokes is 300ms, then call the callback function
 * 
 * ---------|        |--------
 *          FC 300ms FC
 * 
 */
const debounce = (cb, delay = 1000) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            cb(...args);
        }, delay)
    }
}

const debouncedFn = debounce((text) => {
    debounceDiv.innerText = text;
});

/* ---------------Throttling-------------------- */

/**
 * Throttle limits the no of times a function is called.
 * Throttle will immediatly invoke the given callback function and it will ignore eventes untill the differnece b/w two function calls is min of delay
 * 
 * |-------|------|------|
 * FC      FC     FC     FC
 * 
 */

const throttle = (callback, delay = 1000) => {
    let flag = true;
    return (...args) => {
        if(flag) {
            callback(...args);
            flag = false;
        }

        setTimeout(()=>{
            flag = true;
        }, delay);
    }
}

const improvedThrottle = (callback, delay=1000) => {
    let shouldWait = false;
    let waitingArgs;

    const timeoutFunc = () => {
        if(waitingArgs === null) {
            shouldWait = false;
        } else {
            callback(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    }

    return (...args) => {
        if(shouldWait) {
            waitingArgs = args;
            return;
        }

        callback(...args);
        shouldWait = true;

        setTimeout(timeoutFunc, delay);
    }
}

// const expensiveFunction = (e, name = 'Manju') => {
//     console.log('Trigger Expensive Func...', name);
// }

// const betterExpensiveFunction = throttle(expensiveFunction, 1000);

// window.addEventListener('resize', betterExpensiveFunction);

/**
 * Drawback of below throttleFn is if user types fast within 1000ms, only the first char will be takes ignoring other chars which are typed within the delay
 */
const throttleFn = throttle((text) => {
    throttleDiv.innerText = text;
});

const improvedThrottleFn = improvedThrottle((text) => {
    throttleDiv.innerText = text;
})

searchInput.addEventListener('input', (e) => {
    defaultDiv.innerText = e.target.value;
    debouncedFn(e.target.value);
    improvedThrottleFn(e.target.value);
});

