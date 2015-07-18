var db = require('../db.js');
var fs = require('fs');
var csv = require('fast-csv');

var stream = fs.createReadStream(__dirname + "/zipcode.csv");

var csvStream = csv()
    .on("data", function(data){
        if(data[0] != "zip"){  // ignore first line headers
            var zipcode = data[0];
            var city = data[1];
            var state = data[2];
            var lat = data[3];
            var lon = data[4];

            var sql = "INSERT INTO zipcodes (zipcode, lat, lon, city, state) VALUES (";
            sql += zipcode + ",";
            sql += lat + ",";
            sql += lon + ",'";
            sql += city + "','";
            sql += state + "')";

            //console.log(sql);
            db.query(sql);
        }
    })
    .on("end", function(){
        console.log("done");
    });

stream.pipe(csvStream);