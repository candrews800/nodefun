/*
    Schema:

    Users:
        id - int PRIMARY KEY
        name - string
        email - string unique
        password - size of hash
        remember_token - size of hash
        created_at - timestamp

    Password Resets:
        email - string
        token - string
        created_at - timestamp

    Zipcodes:
        id - int PRIMARY KEY
        zipcode - integer
        lat - float, 8,6
        lon - float 8,6
        city - string
        state - char(2)

    API Key:
        id - int PRIMARY KEY
        user_id - integer -> foreign key
        api_key - string
        created_at - timestamp

*/

var pg = require('pg');

var conString = "postgres://homestead:secret@localhost/zipcode_api";


// Set Up Zipcode Table
var client = new pg.Client(conString);
client.connect(function(err) {
    if(err) {
        return console.error('Could not connect to postgres', err);
    }
    console.log('Connected to DB ...');

    var table = 'zipcodes';
    var cols = [
        'id SERIAL PRIMARY KEY',
        'zipcode integer UNIQUE',
        'lat double precision',
        'lon double precision',
        'city varchar(30)',
        'state varchar(2)'
    ];
    var col_string = cols.join();

    // Drop Zipcode Table
    var query = 'DROP TABLE IF EXISTS '+table;
    client.query(query, function(err, result) {
        if(err) {
            return console.error('error running query: '+query+' - ', err);
        }
        console.log('Dropped '+table+' Table ...');

        // Create Zipcode Table
        client.query('CREATE TABLE IF NOT EXISTS '+table+ ' ('+col_string+')', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            console.log('Created table '+table+' ...');
            client.end();
        });
    });
});