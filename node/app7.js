// Streams

// Read file

// const { writeFileSync } = require('fs');

// Array.from({ length: 10000 }, (_, i) => {
//     writeFileSync('./node/files/big.txt', `Hello world ${i}\n`, { flag: 'a' });
// });

// const {createReadStream} = require('fs');
// const stream = createReadStream('./node/files/big.txt');
// control the size of the buffer chunk using highWaterMark option
// const stream = createReadStream('./node/files/big.txt', {highWaterMark:90000, encoding:'utf-8'});
// stream.on('data', (res)=> console.log(res));
// stream.on('error', (err)=> console.log(err));


// http example
const http = require('http');
const fs = require('fs');

const server = http.createServer();
server.on('request', (req, res) => {
    // Send whole file at once
    // const text = fs.readFileSync('./node/files/big.txt', 'utf-8');
    // res.end(text);

    // send as stream
    const fileStream = fs.createReadStream('./node/files/big.txt', 'utf-8');
    fileStream.on('open', ()=>{
        fileStream.pipe(res)
    });

    fileStream.on('error', (err)=>{
        res.end(err)
    })

});
server.listen(5000);