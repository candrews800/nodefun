var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/test', function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(3000, function () {
    console.log('Example app listening at http://zipnode.app:3000');


});