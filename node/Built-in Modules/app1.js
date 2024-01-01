/* OS Module */

const os = require('os');
const user = os.userInfo();
console.log(user);
console.log(os.uptime());

console.log(
    os.type(),
    os.release(),
    os.totalmem(),
    os.freemem()
)

/* PATH */

const path = require('path');
console.log(path.sep);
const filePath = path.join('/folder', 'subfolder', 'file.txt');
console.log(filePath);
const base = path.basename(filePath);
console.log(base);

const absolute = path.resolve(__dirname, 'folder', 'subfolder', 'file.txt');
console.log(absolute);


/* FS */

// synchronous
const { readFileSync, writeFileSync } = require('fs');

const first = readFileSync('../files/first.txt', 'utf-8');
console.log(first);

writeFileSync('../files/new.txt', 'written using node js');

writeFileSync('../files/new.txt', ' & this line is appended using flag a', { flag: 'a' });

const readNewFile = readFileSync('../files/new.txt', 'utf-8');
console.log(readNewFile);

// asynchronous

const { readFile, writeFile } = require('fs');

readFile('../files/first.txt', 'utf-8', (err, result) => {
    if (err) console.log(err);
    else console.log(result);
})

writeFile('../files/new-async.txt', 'New file created using fs async', (err) => {
    if (err) console.log(err);
});


readFile('../files/new-async.txt', 'utf-8', (err, result) => {
    if (err) console.log(err);
    else console.log(result);
})


/* HTTP */

// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.write('Welcome to http server');
//     res.end();
// });

// server.listen(5000);

const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url == '/'){
       res.end('Welcome to our home page')
    }
    else if(req.url == '/about'){
        res.end('Here is our short history');
    }
    else{
        res.end(`
    <h1>Oops! Page not found</h1>
    <a href="/">Back home</a>
    `);
    } 
});

server.listen(5000);