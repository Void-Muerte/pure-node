/**
 * Primary file for the api
 */
// Dependencies
const http = require('http');
const { parse } = require('path');
const url = require('url');

// The server should respond to all requests with a string
const server = http.createServer((req, res)=>{
    // Get the URL and parse it
    const parseUrl = url.parse(req.url, true)
    // Get the path from url
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    // Get the query String
    const queryStringObject = parseUrl.query;
    // Get the http method
    const method = req.method.toLowerCase();
    // Get the headers
    const headers = req.headers;
    // Send the response
    res.end("Hello, World\n");
    // Log the request path
    console.log('The request receuved with headers: '+ JSON.stringify(headers));
    
});

// Start the server and have it listen to port 3000
server.listen(3000, ()=>{
    console.log("Server listening at port 3000");
})