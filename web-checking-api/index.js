/**
 * Primary file for the api
 */
// Dependencies
const http = require('http');
const { parse } = require('path');
const { StringDecoder } = require('string_decoder');
const url = require('url');
const config = require('./config');

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
    /* Get the payload, assuming that the payload is coming as a stream, thus we want to know the whole payload at the end of the stream hence we created a buffer variable which will be appended as * data comes in
    */
    const decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', (data)=>{
        buffer +=decoder.write(data);
    });
    req.on('end', ()=>{
        buffer +=decoder.end();
        // Choose the handler where the request has to go to
        const chosenHandler = typeof(router[trimmedPath])!=='undefined'? router[trimmedPath]:handlers.notFound;
        // Data object to send to the handler
        const data = {
            'trimmedPath':trimmedPath,
            'queryStringObject':queryStringObject,
            'method':method,
            'headers':headers,
            'payload':buffer
        }
        //Route the request to the handler specied in the router
        chosenHandler(data, (statusCode, payload)=>{
            // Use the status code called back by the handler, default
            statusCode= typeof(statusCode) == 'number'?statusCode:200;
            // Use the payload called back by the handler or default to an empty object
            payload= typeof(payload) == 'object'?payload:{}
            //convert it to string
            const payloadString = JSON.stringify(payload);
            // Return the response
            res.setHeader('Content-Type','application/json')
            res.writeHead(statusCode);
            res.end(payloadString);

                    // Log the request path
            console.log('Returning this response', statusCode, payloadString);
        });

    })    
});

// Start the server and have it listen to port defined in the configuration file
server.listen(config.port, ()=>{
    console.log(`Server listening at port ${config.port} in ${config.envName} mode`);
});
// Defining handlers
const handlers = {};
handlers.sample = (data, callback)=>{
    callback(406, {'name': 'sample handler', data:data});
};
handlers.notFound=(data,callback)=>{
    // Callback an http status object and a payload
    callback(404);
};
// Defining a request router
const router = {
    'sample':handlers.sample
}