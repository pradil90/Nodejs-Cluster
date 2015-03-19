var http = require('http');
var fs = require('fs');
var url = require("url");

http.createServer(function (req, res) {

    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  if(pathname == "/") {
        html = fs.readFileSync("registration.html", "utf8");

        res.write(html);
    } else if (pathname == "/regKit_Library.js") {
        script = fs.readFileSync("regKit_Library.js", "utf8");
        res.write(script);
    }
  res.end('helo\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');




// http.createServer(function (request, response) {

//     var pathname = url.parse(request.url).pathname;
//     console.log("Request for " + pathname + " received.");

//     response.writeHead(200);

//     if(pathname == "/") {
//         html = fs.readFileSync("index.html", "utf8");
//         response.write(html);
//     } else if (pathname == "/script.js") {
//         script = fs.readFileSync("script.js", "utf8");
//         response.write(script);
//     }


//     response.end();
// }).listen(8888);

// console.log("Listening to server on 8888...");












// var port = 1357;

// var http = require('http'),
// path = require('path'),

// fs = require('fs');


// var app = http.createServer( function(req, res) {
                            
//                             if (req.url === '/test') {
//                             fs.readFile('views/index.html', function(err, page) {
//                                         res.writeHead(200, {'Content-Type': 'text/plain'});
//                                         res.end('Hello World\n');
//                                         res.end();
//                                         });
//                             }
                            
//                             else if (req.url === '/tester') {
//                             fs.readFile('views/registration.html', function(err, page) {
//                                         res.writeHead(200, {'Content-Type': 'text/html'});
//                                         res.write(page);
//                                         res.end();
//                                         });
//                             }
                            
//                             else {
//                             res.writeHead(301,
//                                           {Location: '/home'}
//                                           );
//                             res.end();
//                             }
//                             });

// app.listen(port);
// console.log('Server running at http://127.0.0.1:1337/');
// console.log('Server running on port: ' + port)

// var http = require('http');
// var fs = require('fs');
// var index = fs.readFileSync('registration.html');
// http.createServer(function (req,res)
// {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('page\n');

// }

//     ).listen(1337, '127.0.0.1');
// console.log('running');



