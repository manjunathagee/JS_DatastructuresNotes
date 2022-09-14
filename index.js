// .......|        |........
//       cb 300ms cb

function debounce(cb, delay=1000) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            cb(...args);
        }, delay);
    }
}

function throttle(cb, delay=1000){
    let cbCalled = false;
    return (...args) => {
        if(!cbCalled) {
            cb(...args);
            cbCalled = true;
        }

        setTimeout(()=> {
            cbCalled = false;
        }, delay)
    }
}

var debouncedFn = debounce((textValue)=> {
    debounce.innerText = textValue;
}, 1000);

var throttleFn = throttle((textValue) => {
    throttleDiv.innerText = textValue;
}, 1000);

var defaultDiv = document.getElementById('default');
var debounce = document.getElementById('debounce');
var throttleDiv = document.getElementById('throttle');
var inputSearch = document.getElementById('searchInput');


inputSearch.addEventListener('input', (e) => {
    defaultDiv.innerText = e.target.value;
    debouncedFn(e.target.value);
    throttleFn(e.target.value);
});

//|.........|........|
//cb........cb.......cb