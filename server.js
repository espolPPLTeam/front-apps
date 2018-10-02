// const express = require('express');
// const ecstatic = require('ecstatic');
// const http = require('http');
 
// const app = express();
// console.log(`${__dirname}/login/dist`)
// app.use('/login', ecstatic({ root: `${__dirname}/login/dist`, showdir: false }))
 
// http.createServer(app).listen(8010)
 
// console.log('Listening on :8080')

var http = require('http')
var fs = require('fs')
var path = require('path')

const PORT = 8010

http.createServer(function (request, response) {
    let filePath = request.url
    let basePath = 'login'
    if (filePath === '/login') {
    	basePath = 'login'
    	filePath = '/'
    } else if (filePath === '/ppl/estudiantes') {
    	basePath = 'ppl/estudiantes'
    }
    const extname = path.extname(filePath)
    if (filePath == '/') {
        filePath = `./${basePath}/dist/index.html`
    } else {
    	filePath = filePath.split('/').slice(2).join('/')
    }
    let contentType = 'text/html'
    switch (extname) {
        case '.js':
            filePath = `./${basePath}/dist/` + filePath
            contentType = 'text/javascript'
            break
        case '.map':
            filePath = `./${basePath}/dist/` + filePath
            contentType = 'text/javascript'
            break
        case '.css':
            filePath = `./${basePath}/dist/` + filePath
            contentType = 'text/css'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.png':
            filePath = `./${basePath}/dist/` + filePath
            contentType = 'image/png'
            break;      
        case '.jpg':
            filePath = `./${basePath}/dist/` + filePath
            contentType = 'image/jpg'
            break
        case '.wav':
            contentType = 'audio/wav'
            break
    }
    let p = path.join(__dirname, filePath)
    if (p[p.length - 1] === '/') {
    	p = p.substring(0, p.length - 1)
    }
    fs.readFile(p, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType })
                    response.end(content, 'utf-8')
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n')
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType })
            response.end(content, 'utf-8')
        }
    });

}).listen(PORT)
console.log(`Server running at http://127.0.0.1:${PORT}/`)