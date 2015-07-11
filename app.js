var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/test', function(req, res) {
   res.send('Test page');
});

var server = app.listen(3000, function () {
    console.log('Example app listening at http://zipnode.app:3000');


});