const _ = require('lodash');

const items = [1,[2,[3,[4]]]];
const flatArr = _.flattenDeep(items);
console.log(flatArr);

console.log('nodemon listening');