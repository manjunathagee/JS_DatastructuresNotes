/**
 * Async and Defer is used to load external scripts into our applications efficiently
 * 
 * <script src="./testing.js"></script>
 *  |-------------------|                           |----------------------|
 *       HTML parsing   |--------------|------------| HTML parsing continues
 *                      script download  script exec
 *  here scripts are blocking the rendering of the HTML.
 * 
 * 
 * <script async src="./testing.js"></script>
 * 
 * |------------------------------|              |------------------------|
 *      HTML parsing                               HTML parsing continues
 *          |---------------------|--------------|
 *              script downloading  script exec
 * 
 * Scripts are downloaded asynchronously along with parsing of HTML, once the scripts are available HTML parsing will be
 * blocked to execute script and after that HTML parsing will continue
 * 
 * <script defer src="./testing.js"></script>
 * 
 * It will download scripts asynchronously along with parsing of HTML, and scripts are executed only when HTML parsing is completed.
 * 
 *                             HTML parsing 
 * |-----------------------------------------------------------|
 *      |------------------|                      |----------------|
 *                      script download                             script exec
 * 
 * When to use what?
 *  async does not guarantee order of execution of scripts, but defer maintains the order of execution of the scripts.
 * 
 * Applications scipts are often dependent on each other and given this scenario defer makes sense because it maintain the order of exection of scripts
 * using async here might break the applicaion.
 * 
 * If you're using external scripts like Google analytics which are quite modular and does not affect the running application, in this scenario use
 * async
 * 
 */
