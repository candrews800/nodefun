var express = require('express');
var app = express();
var db = require('./db.js');

app.use(express.static('public'));

app.get('/test', function (req, res) {
    res.send('Hello World!');
});

app.get('/create', function (req, res) {
    var qry = 'INSERT INTO zipcodes (zipcode) VALUES (33328)';
    var results = db.query(qry);
    res.send(results);
});

app.get('/get', function (req, res) {
    var qry = 'SELECT * FROM zipcodes';
    db.query(qry).then(function(data){
        res.send(data);
    }, function(err){
        res.send(err);
    });
});

var server = app.listen(3000, function () {
    console.log('Example app listening at http://zipnode.app:3000');


});