/*
Modules
Node uses CommonJS, CommonJS modules are loaded synchronously (blocks the execution until loaded), while ES modules are loaded asynchronously.

Node JS module has exports object where we can store variables and functions.
*/

const names = require('./names.js');
const utils = require('./utils.js');
console.log(names.john);
console.log(names.peter);
console.log(utils.sayHi('Mani'));