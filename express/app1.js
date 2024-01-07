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


// HTTP Basics

const http = require('http');
const server = http.createServer((req, res)=>{
    res.writeHead(200, {"content-type":"text/html"});
    console.log('user hit the server');
    res.write('<h1>Home page</h1>');
    res.end();
});
server.listen(5000)