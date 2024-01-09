/*
HTTP Request Response cycle

Request:
URL, Method, Headers, Body
Request header:
A request header is an HTTP header that can be used in an HTTP request to provide information about the request context, so that the server can tailor the response. For example, the Accept-* headers indicate the allowed and preferred formats of the response. Other headers can be used to supply authentication credentials (e.g. Authorization), to control caching, or to get information about the user agent or referrer, etc.

Response:
Status text, Status code, Headers, Body
Response header:
A response header is an HTTP header that can be used in an HTTP response and that doesn't relate to the content of the message. Response headers, like Age, Location or Server are used to give a more detailed context of the response.

Not all headers appearing in a request/response are categorized as request/response headers by the specification.
For example, the Content-Type header is a representation header indicating the original type of data in the body of the response message.

*/


// HTTP Basics & serve an application using http module

const http = require('http');
const {readFileSync} = require('fs');
// get the files
const homePage = readFileSync('./express/navbar-app/index.html');
const styles = readFileSync('./express/navbar-app/styles.css');
const logo = readFileSync('./express/navbar-app/logo.svg');
const jsfile = readFileSync('./express/navbar-app/browser-app.js');

const server = http.createServer((req, res)=>{
    if(req.url == '/'){
        // headers
        res.writeHead(200, {"content-type":"text/html"});
        res.write(homePage);
        res.end();
    }
    else if(req.url == '/styles.css'){
        res.writeHead(200, {"content-type":"text/css"});
        res.write(styles);
        res.end();
    }
    else if(req.url == '/logo.svg'){
        res.writeHead(200, {"content-type":"image/svg+xml"});
        res.write(logo);
        res.end();
    }
    else if(req.url == '/browser-app.js'){
        res.writeHead(200, {"content-type":"text/javascript"});
        res.write(jsfile);
        res.end();
    }
   else {
        res.writeHead(404, {"content-type":"text/html"});
        res.write('<h1>Page not found</h1>');
        res.end();
   }
});
server.listen(5000)