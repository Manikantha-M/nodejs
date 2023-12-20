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
const filePath = path.join('/folder','subfolder', 'file.txt');
console.log(filePath);
const base = path.basename(filePath);
console.log(base);

const absolute = path.resolve(__dirname, 'folder', 'subfolder', 'file.txt');
console.log(absolute);