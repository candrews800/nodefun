var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('zipcodes', {
        id: { type: 'serial', primaryKey: true },
        zipcode: { type: 'int', unique: true },
        lat: { type: 'float', precision: true },
        lon: { type: 'float', precision: true },
        city: 'varchar(30)',
        state: 'varchar(2)'
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('zipcodes', callback);
};
