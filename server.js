var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    pg = require('pg');

http.createServer(function (req, res) {
    var url = req.url;

    // Test if request is for file
    var extension = path.extname(url);
    var extensionList = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon'
    };

    if(extensionList[extension]){
        console.log(url);

        try{
            sendFile(url, extensionList[extension], res);
        } catch(err){
            notFound(res);
        }
    } else{ // Request is not for a valid file

        // Routing
        var route = path.dirname(url) + path.basename(url);
        console.log(route);

        if(req.method == 'GET' && route == '/'){
            sendHtml('index', res);
        } else{
            notFound(res);
        }
    }
}).listen(1337);

console.log('Server running at http://127.0.0.1:1337/');

function notFound(res, msg){
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/plain');

    msg = msg || 'Not Found';
    res.end(msg);
}

function sendFile(filename, contentType, res){
    var data = fs.readFileSync(__dirname + '/site' + filename); // Will throw err if invalid file

    // Valid File
    res.statusCode = 200;
    res.setHeader('Content-type', contentType);
    res.end(data);
}

function sendHtml(filename, res){
    try{
        sendFile('/' + filename + '.html', 'text/html', res);
    } catch(err){
        notFound(res, 'No View was found for filename')
    }
}