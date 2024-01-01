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
