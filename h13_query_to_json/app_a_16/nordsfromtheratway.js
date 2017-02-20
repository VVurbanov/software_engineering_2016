const http = require('http');
const url = require('url');

function handleRequest(request, response) {
    var urldata = url.parse(request.url, true).query;
    response.writeHead(200, {
    'Content-Type': 'application/json'
    });
    response.end(JSON.stringify(urldata, null, 4));
}

http.createServer(handleRequest).listen(8116, '127.0.0.1');
