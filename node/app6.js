/*
Events
*/

const EventEmitter = require('events');

const customEmitter = new EventEmitter();
customEmitter.on('testevent', (argOne, argTwo)=>{
    console.log('test event', argOne, argTwo);
})

customEmitter.emit('testevent', 'a', 'b');

// http example
const http = require('http');
const server = http.createServer();
server.on('request', (req, res)=>{
    res.end('welcome');
})

server.listen(5000)