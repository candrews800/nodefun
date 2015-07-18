var pg = require('pg');
var Promise = require('promise');
var conString = "postgres://homestead:secret@localhost/zipcode_api";


module.exports = {
    query: function(sql){
        return new Promise(function (fulfill, reject){
            pg.connect(conString, function(err, client, done) {
                if(err) {
                    console.log('Could not connect to db...');
                    reject(err);
                } else{
                    client.query(sql, function(err, result) {
                        done();

                        if(err) {
                            console.log('Error in query: ' + err);
                            reject(err);
                        } else{
                            fulfill(result.rows);
                        }
                    });
                }
            });
        });
    }
};