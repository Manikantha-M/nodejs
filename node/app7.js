// Streams

// Read file

const { writeFileSync } = require('fs');

// Array.from({ length: 10000 }, (_, i) => {
//     writeFileSync('./node/files/big.txt', `Hello world ${i}\n`, { flag: 'a' });
// });

const {createReadStream} = require('fs');
const stream = createReadStream('./node/files/big.txt');
stream.on('data', (res)=> console.log(res))