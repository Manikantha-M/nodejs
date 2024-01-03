/* 
Event Loop
The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.
*/


// Non Blocking code
// const {readFile} = require('fs');
// console.log('start first task');
// readFile('./node/files/first.txt', 'utf-8', (err, result)=>{
//     if(err) console.log(err);
//     else {
//         console.log(result);
//         console.log('Completed First task');
//     }
// });
// console.log('start second task');

// Blocking code

// const http = require('http');
// const server = http.createServer((req, res) => {
//     if(req.url == '/'){
//         res.end('Home Page');
//     }
//     else if(req.url == '/about'){
//         for(let i=0; i<1000; i++){
//             for (let j=0; j<1000; j++){
//                 console.log(`${i} ${j}`)
//             }
//         }
//         res.end('About Page');
//     }
//     else{
//         res.end('Error page');
//     }
// })

// server.listen(5000, ()=>console.log('server listening on port 5000'));


// Async Patterns

// const { readFile } = require('fs');

// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf-8', (err, data) => {
//             if (err) reject(err)
//             else resolve(data);

//         })
//     })
// }

// getText('./node/files/first.txt').then(result => console.log(result)).catch(err => console.log(err));
// const readText = async () => {
//     try{
//         const firstText = await getText('./node/files/first.txt');
//         console.log(firstText);
//     }catch(err){
//         console.log(err);
//     }
// }

// readText()

const {readFile, writeFile} = require('fs').promises;

const start = async () => {
    try {
        const first = await readFile('./node/files/first.txt', 'utf-8');
        console.log(first);
        await writeFile('./node/files/fspromise.text', 'Written using fs promises');
    }
    catch (err){
        console.log(err);
    }
}

start();