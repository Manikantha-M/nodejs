/* 
Event Loop
The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.
*/


// Non Blocking code
const {readFile} = require('fs');
console.log('start first task');
readFile('./node/files/first.txt', 'utf-8', (err, result)=>{
    if(err) console.log(err);
    else {
        console.log(result);
        console.log('Completed First task');
    }
});
console.log('start second task');

// Blocking code

const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url == '/'){
        res.end('Home Page');
    }
    else if(req.url == '/about'){
        for(let i=0; i<1000; i++){
            for (let j=0; j<1000; j++){
                console.log(`${i} ${j}`)
            }
        }
        res.end('About Page');
    }
    else{
        res.end('Error page');
    }
})

server.listen(5000, ()=>console.log('server listening on port 5000'));